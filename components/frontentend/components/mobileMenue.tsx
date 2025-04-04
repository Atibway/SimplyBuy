"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import { Category } from "@/types"
import { useCurrentUser } from "@/hooks/use-current-user"

export default function Menu({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false)
  const params = useParams()
  const user = useCurrentUser()

  return (
    <div className="block md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle mobile sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-full py-4">
            <nav className="space-y-1">
              {categories.map((route) => (
                <Link key={route.id} href={`/frontend/category/${route.id}`} onClick={() => setOpen(false)}>
                  <Button className="w-full my-2 justify-start">{route.name}</Button>
                </Link>
              ))}
              
              {user?.role === "ADMIN" && (
                <Link href={`/`} onClick={() => setOpen(false)}>
                  <Button className="w-full justify-start">Dashboard</Button>
                </Link>
              )}
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  )
}
