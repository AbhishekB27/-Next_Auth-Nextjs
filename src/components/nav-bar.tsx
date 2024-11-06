"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signIn, signOut, useSession } from "next-auth/react"

export function NavBarComponent() {
  const [isOpen, setIsOpen] = React.useState(false)
  const { data: session } = useSession()
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-background shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">Logo</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                <Link href="/about" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">About</Link>
                <Link href="/services" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Services</Link>
                <Link href="/contact" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">{
            session && session.user ? <><p>{session.user?.email}</p> <Button onClick={() => {
              signOut()
            }}>Logout</Button></> : <> <Button className="font-semibold" variant='ghost' onClick={() => {
              signIn()
            }}>SignIn</Button>  <Link href='/signup'><Button className="font-semibold">SignUp</Button></Link></>}


          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link href="/about" className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium">About</Link>
            <Link href="/services" className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Services</Link>
            <Link href="/contact" className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="px-2 space-y-1">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/profile">Profile</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/settings">Settings</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}