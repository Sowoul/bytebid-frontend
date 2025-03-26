import { Users, Tag, DollarSign, Search, Shield, Zap } from "lucide-react"

export function FeatureSection() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              SponSphere provides all the tools creators and brands need to form successful partnerships.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Creator Profiles</h3>
            <p className="text-center text-muted-foreground">
              Showcase your social media presence and connect all your platforms in one place.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Tag className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Interest Matching</h3>
            <p className="text-center text-muted-foreground">
              Our smart algorithm matches creators with brands based on interests and content niches.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Transparent Budgets</h3>
            <p className="text-center text-muted-foreground">
              Clear budget information for every gig so creators know what to expect.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Search className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Discover Opportunities</h3>
            <p className="text-center text-muted-foreground">
              Browse through available gigs or let our system recommend the best matches for you.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Secure Platform</h3>
            <p className="text-center text-muted-foreground">
              Email verification and secure authentication to protect your account and information.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Quick Setup</h3>
            <p className="text-center text-muted-foreground">
              Get started in minutes with our streamlined onboarding process.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

