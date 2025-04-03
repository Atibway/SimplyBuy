
import { Product } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartStore {
    items: Product[];
    addItem: (data:Product) => void;
    removeItem: (id:string)=> void;
    removeAll: ()=> void;
    updateQuantity: (qty:number, id:string)=> void;
}

export const useCart = create(
    persist<CartStore>((set, get)=> ({
   items: [],
   addItem: (data: Product)=> {
const currentItems = get().items;
const existingItem = currentItems.find((item)=> item.id === data.id);

if(existingItem){
    return toast("Item already in cart")
}

const cartItem = {
...data,
countInStock:1
}

set({items: [...get().items, cartItem]});
toast.success("Item added to cart")
   },

   removeItem: (id: string)=> {
set({items: [...get().items.filter((item)=> item.id !== id)]});

toast.success("Item removed from  cart")
   },
   updateQuantity: (qty: number, id: string) => {
    const currentItems = get().items;
    const itemToUpdate = currentItems.find((item) => item.id === id);

    if (itemToUpdate) {
      const updatedItems = currentItems.map((item) =>
        item.id === id ? { ...item, countInStock: qty } : item
      );
      set({ items: updatedItems });
    } else {
      toast.error("Item not found in cart");
    }
  },
   removeAll: () => set({items: []})
    }),{
        name: "cart-storage",
        storage: createJSONStorage(()=> localStorage)
    })
)
