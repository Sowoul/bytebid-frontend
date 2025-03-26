import type React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col md:flex-row">
        <DashboardSidebar className="hidden md:block w-64 shrink-0 border-r" />
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
      <Footer />
    </div>
  )
}

