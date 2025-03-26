"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Search } from "lucide-react"

export default function MatchingGigsPage() {
  const [gigs, setGigs] = useState<any[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMatchingGigs = async () => {
      setError("")
      setLoading(true)

      const token = localStorage.getItem('jwtToken') // Retrieve the token from localStorage

      if (!token) {
        setError("No token found, please log in")
        setLoading(false)
        return
      }

      try {
        // Make an actual API call
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/gigs/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Use the token from localStorage
          },
        })

        if (!response.ok) {
          const errorData = await response.json()
          setError(errorData.message || "Failed to fetch gigs")
          setLoading(false)
          return
        }

        const data = await response.json()
        setGigs(data)
      } catch (err) {
        setError("An error occurred while fetching gigs")
      } finally {
        setLoading(false)
      }
    }

    fetchMatchingGigs()
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Matching Gigs</h2>
          <p className="text-muted-foreground">Gigs that match your profile tags</p>
        </div>
        <Link href="/dashboard/gigs/create">
          <Button>Create New Gig</Button>
        </Link>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        gigs.map((gig) => (
          <Card key={gig.gig._id} className="mb-4">
            <CardHeader>
              <CardTitle>{gig.gig.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{gig.gig.description}</p>
              <p>Budget: {gig.gig.budget}</p>
              <p>Matching Tags: {gig.matching_tags}</p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
