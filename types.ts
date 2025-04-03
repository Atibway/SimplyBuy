
export interface Billboard {
    id: string;
    label: string;
    imageUrl: string
}

export interface Category {
    id: string;
    name: string;
    billboard: Billboard;
}

export interface Product {
    id: string;
    category: Category;
    name: string;
    price: number;
    priceDiscount?: number,
    isFeatured: boolean;
    size: Size;
    countInStock?: number,
    description?: string
    color: Color;
    isArchived: boolean
    images: Image[]
}

export interface Image  {
    id: string;
    url: string;
}
export  interface Size {
    id: string;
    name: string;
    value: string;
}
export  interface Color {
    id: string;
    name: string;
    value: string;
}

// Define a type for the Product object after price conversion
export type Product2 = {
    id: string;
    name: string;
    storeId: string;
    categoryId: string;
    description: string;
    countInStock: number;
    price: number;  // price is now a number instead of Decimal
    priceDiscount: number;
    isFeatured: boolean;
    isArchived: boolean;
    sizeId: string;
    colorId: string;
    images: Image[];  // Assuming images is an array of URLs (adjust if different)
    createdAt: Date;
    updatedAt: Date;
  };
  
  