"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isLoggedIn = pathname.startsWith("/dashboard")

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
              SponSphere
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"}`}
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/gigs"
                className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/dashboard/gigs" ? "text-primary" : "text-muted-foreground"}`}
              >
                Gigs
              </Link>
              <Link
                href="/dashboard/profile"
                className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/dashboard/profile" ? "text-primary" : "text-muted-foreground"}`}
              >
                Profile
              </Link>
              <Link href="/auth/logout">
                <Button variant="outline">Logout</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
          <ModeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 flex flex-col gap-4">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="text-sm font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </Link>
                <Link href="/dashboard/gigs" className="text-sm font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                  Gigs
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="text-sm font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link href="/auth/logout" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Logout
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

