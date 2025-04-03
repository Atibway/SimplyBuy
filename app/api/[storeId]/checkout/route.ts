import { db as prismadb } from "@/lib/prismadb";
import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// Handle POST request
export async function POST(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const { items, userId } = await req.json(); // Expecting 'items' array with id and countInStock


    if (!items || !userId || items.length === 0) {
      return new NextResponse("Items and userId are required", {
        status: 400,
        headers: corsHeaders,
      });
    }

    const productIds = items.map((item: { id: string }) => item.id);

    // Fetch product details from the database
    const products = await prismadb.product.findMany({
      where: { id: { in: productIds } },
    });
console.log(products);

    // Prepare line items for Stripe checkout
    const line_items = products.map((product) => {
      const cartItem = items.find((item: { id: string }) => item.id === product.id);
      const quantity = cartItem?.countInStock || 1; // Default to 1 if not provided

      return {
        quantity,
        price_data: {
          currency: "USD",
          product_data: { name: product.name },
          unit_amount: product.price.toNumber() * 100, 
        },
      };
    });

    // Create an order in the database
    const order = await prismadb.order.create({
      data: {
        storeId: params.storeId,
        isPaid: false,
        userId,
        orderItems: {
          create: items.map((item: { id: string; countInStock: number; name: string; price: number; priceDiscount: number; rating?: number }) => ({
            product: { connect: { id: item.id } },
            quantity: item.countInStock,
            name: item.name,
            price: item.price,
            priceDiscount: item.priceDiscount,
            rating: item.rating ?? 0, // Default to 0 if not provided
          })),
        },
      },
    });
    

 
    

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: { enabled: true },
      success_url: `https://simplybuy-dusky.vercel.app/frontend/cart?success=1`,
      cancel_url: `https://simplybuy-dusky.vercel.app/frontend/cart?canceled=1`,
      metadata: { orderId: order.id },
    });

    return NextResponse.json({ url: session.url }, { headers: corsHeaders });
  } catch (error) {
    console.error("Error in Checkout:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
