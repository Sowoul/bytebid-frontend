"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Briefcase, User, Settings, Tag } from "lucide-react"

interface DashboardSidebarProps {
  className?: string
}

export function DashboardSidebar({ className }: DashboardSidebarProps) {
  const pathname = usePathname()

  const links = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      href: "/dashboard/gigs",
      label: "Gigs",
      icon: Briefcase,
      exact: false,
    },
    {
      href: "/dashboard/profile",
      label: "Profile",
      icon: User,
      exact: false,
    },
    {
      href: "/dashboard/tags",
      label: "My Tags",
      icon: Tag,
      exact: false,
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: Settings,
      exact: false,
    },
  ]

  return (
    <aside className={cn("py-6", className)}>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard</h2>
        <div className="space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary", {
                "bg-primary/10 text-primary": link.exact ? pathname === link.href : pathname.startsWith(link.href),
                "text-muted-foreground": link.exact ? pathname !== link.href : !pathname.startsWith(link.href),
              })}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}

