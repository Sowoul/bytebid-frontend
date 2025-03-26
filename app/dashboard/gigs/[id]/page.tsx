"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Calendar, DollarSign, MessageSquare, User } from "lucide-react"
import Link from "next/link"

export default function GigDetailsPage({ params }: { params: { id: string } }) {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [gigs, setGigs] = useState<any[]>([])

  // Mock gig data - in a real app, you would fetch this from your API
  const gig = {
    id: params.id,
    title: "Lifestyle Product Review",
    description:
      "We are looking for a lifestyle influencer to review our new eco-friendly home products. The influencer should have at least 10,000 followers across their social media platforms and have experience creating product review content. The review should highlight the sustainable aspects of our products and how they can be incorporated into daily life. We will provide the products free of charge, and the content should be delivered within 2 weeks of receiving the products.",
    budget: "$500",
    status: "open",
    tags: ["lifestyle", "review", "product", "eco-friendly", "sustainability"],
    date: "2023-06-15",
    creator: {
      name: "EcoHome Essentials",
      email: "partnerships@ecohome.example",
    },
    matchScore: 95,
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    if (!message.trim()) {
      setError("Please enter a message")
      setLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would call your API here
      // const response = await fetch(`/api/gigs/${params.id}/messages`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ message }),
      // })

      setSuccess("Message sent successfully!")
      setMessage("")
    } catch (err) {
      setError("Failed to send message")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchGigs = async () => {
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
        const response = await fetch('process.env.NEXT_PUBLIC_API_BASE_URL/api/gigs/', {
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

    fetchGigs()
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/gigs">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">Gig Details</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{gig.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-2">
                    <Calendar className="h-4 w-4" />
                    <span>Posted on {new Date(gig.date).toLocaleDateString()}</span>
                  </CardDescription>
                </div>
                <Badge variant={gig.status === "open" ? "default" : "secondary"}>{gig.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground whitespace-pre-line">{gig.description}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Budget</h3>
                <div className="flex items-center gap-2 text-lg">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span>{gig.budget}</span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {gig.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Brand</CardTitle>
              <CardDescription>Send a message to express your interest in this gig</CardDescription>
            </CardHeader>
            <CardContent>
              {success && (
                <Alert className="mb-4 bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSendMessage} className="space-y-4">
                <Textarea
                  placeholder="Write your message here..."
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Match Score</CardTitle>
              <CardDescription>How well this gig matches your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center p-4">
                <div className="relative h-32 w-32">
                  <div className="absolute inset-0 rounded-full border-8 border-muted"></div>
                  <div
                    className="absolute inset-0 rounded-full border-8 border-primary"
                    style={{
                      clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 ${100 - gig.matchScore}%)`,
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">{gig.matchScore}%</span>
                  </div>
                </div>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  This gig is a great match for your profile based on your tags and interests.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Brand Information</CardTitle>
              <CardDescription>Details about the gig creator</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{gig.creator.name}</p>
                    <p className="text-sm text-muted-foreground">{gig.creator.email}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold tracking-tight">Matching Gigs</h2>
        <p className="text-muted-foreground">Gigs that match your profile tags</p>
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

