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
    const { name, billboardId } = body;

    if (!userId) {
      // Changed to return NextResponse
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!name) {
      // Changed to return NextResponse
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!billboardId) {
      // Changed to return NextResponse
      return new NextResponse("Billboard Id is required", { status: 400 });
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

    const category = await prismadb.category.create({
      data: {
        name,
        storeId: params.storeId,
        billboardId,
      },
    });

    // Changed to return NextResponse
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_POST]", error);
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

        const category = await prismadb.category.findMany({
            where: {
                storeId: params.storeId,
            },
            include: {
                billboard: true
            }
        });


        return NextResponse.json(category)

    } catch (error) {
        console.log('[CATEGORY_GET]', error);
        return new NextResponse("Internal error", { status: 500 });

    }
}
