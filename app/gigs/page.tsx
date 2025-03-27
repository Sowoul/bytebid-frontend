"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, Filter } from "lucide-react"
import { toast } from "sonner"

export default function GigsPage() {
    const { user, loading } = useAuth()
    const router = useRouter()

    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<string>("")
    const [budgetRange, setBudgetRange] = useState<[number, number]>([0, 5000])
    const [gigs, setGigs] = useState([])
    const [filteredGigs, setFilteredGigs] = useState([])

    useEffect(() => {
      const fetchGigs = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/gigs/get_gigs`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          })
          if (!response.ok) throw new Error("Failed to fetch gigs")
          const data = await response.json()
          setGigs(data)
          setFilteredGigs(data)
        } catch (error) {
          console.error("Error fetching gigs:", error)
        }
      }

      if (user) fetchGigs()
    }, [user])

    useEffect(() => {
      const filtered = gigs.filter((gig) => {
        const matchesSearch =
          searchQuery === "" ||
          gig.gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          gig.gig.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          gig.gig.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

        const matchesCategory = selectedCategory === "" || gig.gig.tags.includes(selectedCategory)

        const matchesBudget = gig.gig.budget >= budgetRange[0] && gig.gig.budget <= budgetRange[1]

        return matchesSearch && matchesCategory && matchesBudget
      })

      setFilteredGigs(filtered)
    }, [searchQuery, selectedCategory, budgetRange, gigs])
  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Browse Gigs</h1>
          <p className="text-muted-foreground">Find opportunities that match your skills and interests</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters sidebar */}
        <Card className="md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Filter className="mr-2 h-4 w-4" /> Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="tech">Tech</SelectItem>
                  <SelectItem value="beauty">Beauty</SelectItem>
                  <SelectItem value="fitness">Fitness</SelectItem>
                  <SelectItem value="gaming">Gaming</SelectItem>
                  <SelectItem value="fashion">Fashion</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Budget Range</Label>
                <span className="text-sm text-muted-foreground">
                  ${budgetRange[0]} - ${budgetRange[1]}
                </span>
              </div>
              <Slider
                defaultValue={[0, 5000]}
                max={5000}
                step={100}
                value={budgetRange}
                onValueChange={(value) => setBudgetRange(value as [number, number])}
              />
            </div>

            <div className="space-y-2">
              <Label>Platform</Label>
              <div className="grid grid-cols-2 gap-2">
                {["YouTube", "Instagram", "TikTok", "Twitter"].map((platform) => (
                  <Button key={platform} variant="outline" className="justify-start" size="sm">
                    {platform}
                  </Button>
                ))}
              </div>
            </div>

            <Button className="w-full" variant="outline">
              Reset Filters
            </Button>
          </CardContent>
        </Card>

        {/* Gigs list */}
        <div className="md:col-span-3 space-y-6">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search gigs..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="budget-high">Budget: High to Low</SelectItem>
                <SelectItem value="budget-low">Budget: Low to High</SelectItem>
                <SelectItem value="relevance">Relevance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredGigs.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <p className="text-muted-foreground mb-4">No gigs found matching your criteria</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("")
                    setBudgetRange([0, 5000])
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredGigs.map((gig) => (
              <Card key={gig.gig._id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{gig.gig.title}</CardTitle>
                    <div className="text-lg font-bold text-primary">${gig.gig.budget}</div>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    By {gig.brand.username}
                    {gig.brand.verified && (
                      <Badge variant="outline" className="ml-1 text-xs">
                        Verified
                      </Badge>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{gig.gig.description}</p>
                  <div className="flex flex-wrap gap-2">
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between bg-muted/30 py-3">
                  <span className="text-sm text-muted-foreground">
                    Posted {new Date(gig.gig.created_at).toLocaleDateString()}
                  </span>
                  <Button onClick={
                    async () => {
                      try {
                        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/gigs/apply`, {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                          },
                          body: JSON.stringify({
                            gigId: gig.gig._id
                          })
                        })
                        if (!response.ok) throw new Error("Failed to apply")
                        toast.success("Applied to gig successfully")
                      } catch (error) {
                        console.error("Error applying to gig:", error)
                      }
                    }
                  }>Apply</Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-sm font-medium leading-none mb-2">{children}</div>
}
