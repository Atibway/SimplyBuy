"use client";

import { Product } from "@/types";
import React from "react";
import Currency from "./ui/Currency";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Preview } from "./preview";
import { ShareButton } from "@/app/frontend/(routes)/favorites/_components/ShareButton";

interface InfoProps {
  preview?: boolean;
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data, preview = true }) => {
  const cart = useCart();

  const onClick = () => {
    cart.addItem(data);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{data.name}</h1>
        <p className="text-2xl font-semibold text-gray-700">
          <Currency value={data?.price} />
        </p>
      </div>

      <hr className="my-4" />

      {/* Description Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700">Description:</h2>
        <Preview value={data.description as string} />
      </div>

      <hr className="my-4" />

      {/* Details Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-x-2">
          <h3 className="font-semibold text-gray-700">Size:</h3>
          <p>{data?.size?.name || "Not Specified"}</p>
        </div>
        <div className="flex items-center gap-x-2">
          <h3 className="font-semibold text-gray-700">Color:</h3>
          <div
            className="h-6 w-6 rounded-full border border-gray-400"
            style={{ backgroundColor: data?.color?.value }}
          />
        </div>
        {preview && (
          <div className="flex items-center gap-x-2">
            {data.countInStock === 0 ? (
              <span className="px-2 py-1 text-sm font-bold text-red-600 bg-red-100 rounded-full">
                Out of Stock
              </span>
            ) : (
              <p>
                <span className="font-semibold">In Stock:</span> {data?.countInStock}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Actions Section */}
      <div className="flex flex-wrap gap-4">
        <Button
          disabled={data.countInStock === 0}
          onClick={onClick}
          className="flex items-center gap-x-2 px-4 py-2 "
        >
          <ShoppingCart />
          Add to Cart
        </Button>
        <ShareButton
          url={`/frontend/product/${data?.id}`}
          title={data.name}
          text={"Check out this product!"}
        />
      </div>
    </div>
  );
};

export default Info;