"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Instagram, Twitter, Youtube } from "lucide-react"

export default function ProfilePage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  // Social media states
  const [youtubeTag, setYoutubeTag] = useState("")
  const [instaTag, setInstaTag] = useState("")
  const [twitterTag, setTwitterTag] = useState("")

  const handleConnectSocial = async (platform: string) => {
    setError("")
    setSuccess("")
    setLoading(true)

    let tag = ""
    if (platform === "youtube") tag = youtubeTag
    if (platform === "instagram") tag = instaTag
    if (platform === "twitter") tag = twitterTag

    if (!tag) {
      setError(`Please enter your ${platform} username`)
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
      const response = await fetch('process.env.NEXT_PUBLIC_API_BASE_URL/api/users/oauth/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ platform, tag }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        setError(errorData.message || `Failed to connect ${platform} account`)
        setLoading(false)
        return
      }

      const data = await response.json()
      setSuccess(data.message)
    } catch (err) {
      setError(`Failed to connect ${platform} account`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
        <p className="text-muted-foreground">Manage your profile and connected accounts</p>
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

      <Tabs defaultValue="social">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="account">Account Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>YouTube</CardTitle>
              <CardDescription>Connect your YouTube channel to showcase your content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Youtube className="h-8 w-8 text-red-600" />
                <div className="flex-1">
                  <Label htmlFor="youtube">YouTube Username</Label>
                  <Input
                    id="youtube"
                    placeholder="@yourchannel"
                    value={youtubeTag}
                    onChange={(e) => setYoutubeTag(e.target.value)}
                  />
                </div>
                <Button onClick={() => handleConnectSocial("youtube")} disabled={loading}>
                  Connect
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Instagram</CardTitle>
              <CardDescription>Connect your Instagram profile to showcase your content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Instagram className="h-8 w-8 text-pink-600" />
                <div className="flex-1">
                  <Label htmlFor="instagram">Instagram Username</Label>
                  <Input
                    id="instagram"
                    placeholder="@yourusername"
                    value={instaTag}
                    onChange={(e) => setInstaTag(e.target.value)}
                  />
                </div>
                <Button onClick={() => handleConnectSocial("instagram")} disabled={loading}>
                  Connect
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Twitter</CardTitle>
              <CardDescription>Connect your Twitter profile to showcase your content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Twitter className="h-8 w-8 text-blue-500" />
                <div className="flex-1">
                  <Label htmlFor="twitter">Twitter Username</Label>
                  <Input
                    id="twitter"
                    placeholder="@yourusername"
                    value={twitterTag}
                    onChange={(e) => setTwitterTag(e.target.value)}
                  />
                </div>
                <Button onClick={() => handleConnectSocial("twitter")} disabled={loading}>
                  Connect
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Update your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value="user@example.com" disabled />
                <p className="text-xs text-muted-foreground">Your email address is verified and cannot be changed</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="flex gap-2">
                  <Input id="password" type="password" value="********" disabled />
                  <Button variant="outline">Change</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

