import { auth } from "@/auth";

import {db as prismadb} from "@/lib/prismadb";

import { NextResponse } from "next/server";


export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
  ) {
    try {
      const session = await auth();
  
      if (!session?.user) {
        // Changed to return NextResponse
        return new NextResponse("Unauthenticated", { status: 401 });
      }
  
      const userId = session.user.id;
      const body = await req.json();
      const { label, imageUrl } = body;
  
      if (!userId) {
        // Changed to return NextResponse
        return new NextResponse("Unauthorized", { status: 401 });
      }
      if (!label) {
        // Changed to return NextResponse
        return new NextResponse("Label is required", { status: 400 });
      }
      if (!imageUrl) {
        // Changed to return NextResponse
        return new NextResponse("Image URL is required", { status: 400 });
      }
      if (!params.storeId) {
        // Changed to return NextResponse
        return new NextResponse("Store Id is required", { status: 400 });
      }
  
      const storeByUserId = await prismadb.store.findFirst({
        where: {
          id: params.storeId,
          userId,
        },
      });
  
      if (!storeByUserId) {
        // Changed to return NextResponse
        return new NextResponse("Unauthorized", { status: 403 });
      }
  
      const billboard = await prismadb.billboard.create({
        data: {
          label,
          storeId: params.storeId,
          imageUrl,
        },
      });
  
      // Changed to return NextResponse
      return NextResponse.json(billboard);
    } catch (error) {
      console.log("[BILLBOARDS_POST]", error);
      // Changed to return NextResponse
      return new NextResponse("Internal error", { status: 500 });
    }
  }
export async function GET(
    req: Request,
{params}: {params: {storeId: string}}
) {
    try {

        if (!params.storeId) {
            return new NextResponse("Store Id is required", {status: 400})
        }

        const billboard = await prismadb.billboard.findMany({
            where: {
                storeId: params.storeId,
            }
        });

        return NextResponse.json(billboard)

    } catch (error) {
        console.log('[BILLBOARDS_GET]', error);
        return new NextResponse("Internal error", { status: 500 });

    }
}
