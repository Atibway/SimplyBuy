

import { Product } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface BookmarkStore {
    items: Product[];
    addItem: (data:Product) => void;
    removeItem: (id:string)=> void;
    removeAll: ()=> void;
}


export const useBookmark = create(
    persist<BookmarkStore>((set, get)=> ({
   items: [],
   addItem: (data: Product)=> {
const currentItems = get().items;
const existingItem = currentItems.find((item)=> item.id === data.id);

if(existingItem ){
    set({items: [...get().items.filter((item)=> item.id !== existingItem?.id)]});
    toast.success("Item removed from  Bookmark")
}else{
    set({items: [...get().items, data]});
    toast.success("Item added to Bookmark")
}

   },

   removeItem: (id: string)=> {
set({items: [...get().items.filter((item)=> item.id !== id)]});

toast.success("Item removed from  Bookmark")
   },
   
   removeAll: () => set({items: []})
    }),{
        name: "Bookmark-storage",
        storage: createJSONStorage(()=> localStorage)
    })
)
