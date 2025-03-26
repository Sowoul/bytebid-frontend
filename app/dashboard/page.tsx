import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentGigs } from "@/components/recent-gigs"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your activity.</p>
        </div>
        <div className="flex justify-end">
          <Link href="/dashboard/gigs/create">
            <Button>Create New Gig</Button>
          </Link>
        </div>
      </div>

      <DashboardStats />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Profile</CardTitle>
            <CardDescription>Connect your social media accounts to improve your matches</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Profile Completion</span>
                <span className="font-medium">60%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[60%] rounded-full bg-primary"></div>
              </div>
              <Link href="/dashboard/profile">
                <Button variant="outline" className="w-full">
                  Update Profile
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Update Your Tags</CardTitle>
            <CardDescription>Add up to 5 interest tags to find better gig matches</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">#marketing</div>
              <div className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">#fashion</div>
              <div className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">#lifestyle</div>
            </div>
            <Link href="/dashboard/tags">
              <Button variant="outline" className="w-full">
                Manage Tags
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Verification Status</CardTitle>
            <CardDescription>Your account verification status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-green-600 dark:text-green-500 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span className="font-medium">Email Verified</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Your account is fully verified and ready to use all features of SponSphere.
            </div>
          </CardContent>
        </Card>
      </div>

      <RecentGigs />
    </div>
  )
}

