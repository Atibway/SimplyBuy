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
    const { name, value } = body;

    if (!userId) {
      // Changed to return NextResponse
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!name) {
      // Changed to return NextResponse
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!value) {
      // Changed to return NextResponse
      return new NextResponse("Value is required", { status: 400 });
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

    const color = await prismadb.color.create({
      data: {
        name,
        storeId: params.storeId,
        value,
      },
    });

    // Changed to return NextResponse
    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_POST]", error);
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

        const color = await prismadb.color.findMany({
            where: {
                storeId: params.storeId,
            }
        });

        return NextResponse.json(color)

    } catch (error) {
        console.log('[COLORS_GET]', error);
        return new NextResponse("Internal error", { status: 500 });

    }
}
