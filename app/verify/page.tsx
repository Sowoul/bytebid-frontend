"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/components/ui/use-toast"

export default function VerifyPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const type = (searchParams.get("type") as "creator" | "brand") || "creator"

  const [verificationCode, setVerificationCode] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { verifyEmail } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (!email) {
      toast({
        title: "Error",
        description: "Email is required for verification",
        variant: "destructive",
      })
    }
  }, [email, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!verificationCode) {
      toast({
        title: "Error",
        description: "Please enter the verification code",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await verifyEmail(email, verificationCode, type)
    } catch (error) {
      // Error is handled in the auth provider
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container flex items-center justify-center py-10 md:py-20">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Verify your email</CardTitle>
          <CardDescription>Enter the verification code sent to {email || "your email"}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Verifying..." : "Verify Email"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center">
            Didn&apos;t receive a code?{" "}
            <Button variant="link" className="p-0 h-auto">
              Resend code
            </Button>
          </div>
          <div className="text-sm text-center">
            <Link href="/login" className="text-primary hover:underline">
              Back to login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

