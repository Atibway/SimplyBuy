import {db as prismadb} from "@/lib/prismadb";
import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";


// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Change "*" to specific origin if needed for security, like "http://localhost:3001"
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
    const { productIds, userId } = await req.json();

    if (!productIds || !userId || productIds.length === 0) {
      return new NextResponse("Product ids are required", {
        status: 400,
        headers: corsHeaders,
      });
    }

    const products = await prismadb.product.findMany({
      where: { id: { in: productIds } },
    });

    const line_items = products.map((product) => ({
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: { name: product.name },
        unit_amount: product.price.toNumber() * 100,
      },
    }));

    const order = await prismadb.order.create({
      data: {
        storeId: params.storeId,
        isPaid: false,
        userId,
        orderItems: {
          create: productIds.map((id:string) => ({
            product: { connect: { id } },
          })),
        },
      },
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: { enabled: true },
      success_url: `https://atidu-stores.vercel.app/frontend/cart?success=1`,
      cancel_url: `https://atidu-stores.vercel.app/frontend/cart?canceled=1`,
      metadata: { orderId: order.id },
    });

    return NextResponse.json({ url: session.url }, { headers: corsHeaders });
  } catch (error) {
    console.error("Error in Checkout:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

