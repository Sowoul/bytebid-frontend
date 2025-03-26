import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Connect Creators with Brands
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                SponSphere makes it easy for influencers to find sponsorship opportunities and for brands to discover
                the perfect content creators.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full">
                  Get Started
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="w-full">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full blur-3xl opacity-20"></div>
              <div className="relative h-full w-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-grid-white/10"></div>
                <div className="flex h-full items-center justify-center">
                  <span className="text-3xl font-bold text-white">SponSphere</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

