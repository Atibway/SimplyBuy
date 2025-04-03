import { auth } from "@/auth";
import {db as prismadb} from "@/lib/prismadb";
import {NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: {  sizeId: string } }
) {
  try {

    if (!params.sizeId) {
      return new NextResponse("size id is required", { status: 400 });
    }


    const size = await prismadb.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string, sizeId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json(null);
    const userId = session.user.id;
    const body = await req.json();
    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }
    if (!value) {
      return new NextResponse("Image URL is required", { status: 400 });
    }
    if (!params.sizeId) {
      return new NextResponse("Size Id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    const size = await prismadb.size.updateMany({
      where: {
        id: params.sizeId,
      },
      data: {
        name,
        value,
      },
    });

    if (size.count === 0) {
      return new NextResponse("No store found or updated", { status: 404 });
    }

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZEs_PATCH]", error);
    return new NextResponse("Internal error", { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string, sizeId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) return NextResponse.json(null);

    const userId = session.user.id;
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    const size = await prismadb.size.deleteMany({
      where: {
        id: params.sizeId,
      },
    });

    if (size.count === 0) {
      return new NextResponse("No store found or deleted", { status: 404 });
    }

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZEs_DELETE]", error);
    return new NextResponse("Internal error", { status: 400 });
  }
}

