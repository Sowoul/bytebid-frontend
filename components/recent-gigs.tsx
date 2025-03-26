import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function RecentGigs() {
  const gigs = [
    {
      id: "1",
      title: "Lifestyle Product Review",
      budget: "$500",
      status: "open",
      tags: ["lifestyle", "review", "product"],
      date: "2 days ago",
    },
    {
      id: "2",
      title: "Fashion Instagram Post",
      budget: "$300",
      status: "open",
      tags: ["fashion", "instagram", "photography"],
      date: "3 days ago",
    },
    {
      id: "3",
      title: "Tech Unboxing Video",
      budget: "$750",
      status: "open",
      tags: ["tech", "youtube", "unboxing"],
      date: "5 days ago",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Gigs</CardTitle>
        <CardDescription>Browse the latest gigs matching your interests</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {gigs.map((gig) => (
            <div key={gig.id} className="flex flex-col space-y-2 rounded-lg border p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{gig.title}</h3>
                  <p className="text-sm text-muted-foreground">Budget: {gig.budget}</p>
                </div>
                <Badge variant={gig.status === "open" ? "default" : "secondary"}>{gig.status}</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {gig.tags.map((tag) => (
                  <div key={tag} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">
                    #{tag}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{gig.date}</span>
                <Link href={`/dashboard/gigs/${gig.id}`}>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
          <div className="flex justify-center">
            <Link href="/dashboard/gigs">
              <Button variant="outline">View All Gigs</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

