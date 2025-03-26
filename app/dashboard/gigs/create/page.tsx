"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export default function CreateGigPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [budget, setBudget] = useState("")
  const [tag, setTag] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleAddTag = () => {
    if (!tag.trim()) return
    if (tags.includes(tag.trim())) {
      setError("Tag already exists")
      return
    }
    if (tags.length >= 5) {
      setError("Maximum 5 tags allowed")
      return
    }
    setTags([...tags, tag.trim()])
    setTag("")
    setError("")
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Validate form
    if (!title || !description || !budget || tags.length === 0) {
      setError("All fields are required and at least one tag must be added")
      setLoading(false)
      return
    }

    const token = localStorage.getItem('jwtToken') // Retrieve the token from localStorage

    if (!token) {
      setError("No token found, please log in")
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/gigs/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Use the token from localStorage
        },
        body: JSON.stringify({ title, description, budget, tags }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        setError(errorData.message || "An error occurred while creating the gig")
        setLoading(false)
        return
      }

      router.push("/dashboard/gigs")
    } catch (err) {
      setError("An error occurred while creating the gig")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Create New Gig</h2>
        <p className="text-muted-foreground">Post a new gig for creators to discover</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gig Details</CardTitle>
          <CardDescription>Fill in the details of your gig to attract the right creators</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="E.g., Fashion Instagram Post"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what you're looking for in detail..."
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Input
                id="budget"
                placeholder="E.g., $500"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (Max 5)</Label>
              <div className="flex gap-2">
                <Input id="tags" placeholder="E.g., fashion" value={tag} onChange={(e) => setTag(e.target.value)} />
                <Button type="button" onClick={handleAddTag} variant="outline">
                  Add
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((t) => (
                    <Badge key={t} variant="secondary" className="flex items-center gap-1">
                      {t}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(t)}
                        className="ml-1 rounded-full hover:bg-muted"
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {t} tag</span>
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Create Gig"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
