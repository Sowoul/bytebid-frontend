"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export default function TagsPage() {
  const [tag, setTag] = useState("")
  const [tags, setTags] = useState<string[]>(["marketing", "fashion", "lifestyle"])
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
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

  const handleSaveTags = async () => {
    setError("")
    setSuccess("")
    setLoading(true)

    if (tags.length === 0) {
      setError("Please add at least one tag")
      setLoading(false)
      return
    }

    const token = localStorage.getItem('jwtToken')

    if (!token) {
      setError("No token found, please log in")
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/tags`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ tags }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        setError(errorData.message || "Failed to update tags")
        setLoading(false)
        return
      }

      setSuccess("Tags updated successfully!")
    } catch (err) {
      setError("Failed to update tags")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Tags</h2>
        <p className="text-muted-foreground">Manage your interest tags for better gig matching</p>
      </div>

      {success && (
        <Alert className="bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Interest Tags</CardTitle>
          <CardDescription>Add up to 5 tags that represent your content niche and interests</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="tag">Add Tag</Label>
            <div className="flex gap-2">
              <Input id="tag" placeholder="E.g., fashion" value={tag} onChange={(e) => setTag(e.target.value)} />
              <Button onClick={handleAddTag} variant="outline">
                Add
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Current Tags ({tags.length}/5)</Label>
            {tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <Badge key={t} variant="secondary" className="flex items-center gap-1 text-sm py-1.5">
                    #{t}
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
            ) : (
              <p className="text-sm text-muted-foreground">No tags added yet</p>
            )}
          </div>

          <Button onClick={handleSaveTags} disabled={loading} className="w-full">
            {loading ? "Saving..." : "Save Tags"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
