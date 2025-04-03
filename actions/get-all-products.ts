"use server"
import { db } from '@/lib/prismadb'; // Adjust this import path based on your project structure
import { Product2 } from '@/types';

export  async function AllProducts(): Promise<Product2[]> {
 
    const products = await db.product.findMany({
      select: {
        id: true,
        name: true,
        storeId: true,
        categoryId: true,
        description: true,
        countInStock: true,
        price: true, // Fetch `price` as Decimal
        priceDiscount: true,
        isFeatured: true,
        isArchived: true,
        sizeId: true,
        colorId: true,
        images: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Convert `price` to number and return the data
    const productsWithPriceAsNumber = products.map((product) => ({
      id: product.id,
      name: product.name,
      storeId: product.storeId,
      categoryId: product.categoryId,
      description: product.description,
      countInStock: product.countInStock,
      priceDiscount: product.priceDiscount,
      isFeatured: product.isFeatured,
      isArchived: product.isArchived,
      sizeId: product.sizeId,
      colorId: product.colorId,
      images: product.images,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      price: product.price.toNumber(), // Convert Decimal to number
    }));

    return productsWithPriceAsNumber
 
}
