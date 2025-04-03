import { auth } from "@/auth";
import {db as prismadb} from "@/lib/prismadb";

import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: {  categoryId: string } }
) {
  try {

    if (!params.categoryId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }


    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
      include: {
        billboard: true
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}



export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string, categoryId: string } }
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
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!name) {
      // Changed to return NextResponse
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!billboardId) {
      // Changed to return NextResponse
      return new NextResponse("Billboard Id is required", { status: 400 });
    }
    if (!params.categoryId) {
      // Changed to return NextResponse
      return new NextResponse("Category Id is required", { status: 400 });
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

    const category = await prismadb.category.updateMany({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });

    if (category.count === 0) {
      // Changed to return NextResponse
      return new NextResponse("No store found or updated", { status: 404 });
    }

    // Changed to return NextResponse
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES_PATCH]", error);
    // Changed to return NextResponse
    return new NextResponse("Internal error", { status: 500 });
  }
}




export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string, categoryId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      // Changed to return NextResponse
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const userId = session.user.id;

    if (!userId) {
      // Changed to return NextResponse
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.categoryId) {
      // Changed to return NextResponse
      return new NextResponse("Category id is required", { status: 400 });
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

    const category = await prismadb.category.deleteMany({
      where: {
        id: params.categoryId,
      },
    });

    // Changed to return NextResponse
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    // Changed to return NextResponse
    return new NextResponse("Internal error", { status: 500 });
  }
}

