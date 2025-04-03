"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui1/separator"
import { Facebook, Twitter, Instagram, Youtube} from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

export function Footer() {
  const [email, setEmail] = useState('')

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post("https://www.mailminted.com/api/subscribe", {
        apiKey:process.env.NEXT_PUBLIC_API_KEY,
        email: email
      }).then((res)=> {
        console.log(res);
        setEmail("")
      })
      toast.success("Subscribed successfully")
      setEmail("")
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
      setEmail("")
    }
  }
  
  return (
    <footer className="bg-gray-100 pt-16 pb-12 text-gray-600">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/#" className="hover:text-gray-900">All Products</Link></li>
              <li><Link href="/#" className="hover:text-gray-900">Categories</Link></li>
              <li><Link href="/#" className="hover:text-gray-900">Deals</Link></li>
              <li><Link href="/#" className="hover:text-gray-900">New Arrivals</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/#" className="hover:text-gray-900">Contact Us</Link></li>
              <li><Link href="/#" className="hover:text-gray-900">FAQ</Link></li>
              <li><Link href="/#" className="hover:text-gray-900">Shipping & Returns</Link></li>
              <li><Link href="/#" className="hover:text-gray-900">Warranty</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About Us</h3>
            <ul className="space-y-2">
              <li><Link href="/#" className="hover:text-gray-900">Our Story</Link></li>
              <li><Link href="/#" className="hover:text-gray-900">Blog</Link></li>
              <li><Link href="/#" className="hover:text-gray-900">Careers</Link></li>
              <li><Link href="/#" className="hover:text-gray-900">Press</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="w-full">Subscribe</Button>
            </form>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex space-x-4">
            <Link href="/#" className="text-gray-400 hover:text-gray-600">
              <span className="sr-only">Facebook</span>
              <Facebook size={24} />
            </Link>
            <Link href="#/" className="text-gray-400 hover:text-gray-600">
              <span className="sr-only">Twitter</span>
              <Twitter size={24} />
            </Link>
            <Link href="/#" className="text-gray-400 hover:text-gray-600">
              <span className="sr-only">Instagram</span>
              <Instagram size={24} />
            </Link>
            <Link href="/#" className="text-gray-400 hover:text-gray-600">
              <span className="sr-only">YouTube</span>
              <Youtube size={24} />
            </Link>
          </div>
          <div className="text-sm">
            © {new Date().getFullYear()} Your PK-Store. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

