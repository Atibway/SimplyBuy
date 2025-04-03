"use client";

import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import Currency from "@/components/frontentend/components/ui/Currency";
import { useEffect, useState } from "react";
import { Trash2Icon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui1/table";
import { Button } from "@/components/ui/button";
import Summary from "./Summary";
import { Product2 } from "@/types";

interface CartItemProps {
  products: Product2[];
}

export const CartItem: React.FC<CartItemProps> = ({ products }) => {
  const cart = useCart();
  const [qty, setQty] = useState<number | undefined>();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onRemove = (productId: string) => {
    cart.removeItem(productId);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead className="w-[10rem]">Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.items.map((data) => {
            const productInCartFromDb = products.find((product) => product.id === data.id);

            const totalPrice = productInCartFromDb
              ? Number(data.price) * (data.countInStock || 1)
              : 0;

            const isOutOfStock =
              productInCartFromDb?.isArchived || productInCartFromDb?.countInStock === 0;

            return (
              <TableRow key={data.id}>
                <TableCell className="flex items-center space-x-3">
                  <div className="relative h-20 w-20">
                    <Image
                      src={data.images?.[0]?.url || "/placeholder-image.png"} // Fallback image
                      alt={data.name}
                      height={100}
                      width={100}
                      className="rounded object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>
                  <Currency value={Number(data.price)} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {isOutOfStock ? (
                      <p className="text-red-500">Out of Stock</p>
                    ) : (
                      <select
                        value={qty || data.countInStock || 1}
                        onChange={(e) => {
                          const quantity = Number(e.target.value);
                          setQty(quantity);
                          cart.updateQuantity(quantity, data.id);
                        }}
                        className="p-2 w-[4rem] border border-slate-800 rounded-lg text-black"
                      >
                        {Array.from(
                          { length: productInCartFromDb?.countInStock || 1 },
                          (_, i) => i + 1
                        ).map((x) => (
                          <option key={x} value={x}>
                            {x}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {isOutOfStock ? (
                    <p className="text-red-500">Out of Stock</p>
                  ) : (
                    <Currency value={totalPrice} />
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    className="bg-white"
                    onClick={() => onRemove(data.id)}
                  >
                    <Trash2Icon className="h-4 w-4 text-red-500" />
                    <span className="sr-only">Remove Item</span>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Summary />
    </>
  );
};
