"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, TrendingUp, Users } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const [visibleSections, setVisibleSections] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".reveal");
      const updatedVisibility = {};

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          updatedVisibility[index] = true;
        }
      });

      setVisibleSections((prev) => ({ ...prev, ...updatedVisibility }));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-black to-primary/90 px-4 py-20 md:py-32">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                Connect Brands with <span className="text-primary-foreground">Creators</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                The marketplace where brands find the perfect creators for their campaigns, and creators discover
                exciting opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-white">
                  <Link href="/signup?type=brand">I'm a Brand</Link>
                </Button>
                <Button
                  size="lg"
                  asChild
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                >
                  <Link href="/signup?type=creator">I'm a Creator</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block relative h-[400px]">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Creators and brands connecting"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our platform makes it easy to connect brands with the perfect creators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
                title: "Create Your Profile",
                description: "Sign up and build your profile as a brand or creator with your expertise and interests",
                icon: <Users className="h-10 w-10 text-primary" />,
              },
              {
                title: "Post or Browse Gigs",
                description: "Brands post gigs with requirements, creators browse opportunities that match their skills",
                icon: <TrendingUp className="h-10 w-10 text-primary" />,
              },
              {
                title: "Connect & Collaborate",
                description: "Find the perfect match, communicate directly, and create amazing content together",
                icon: <CheckCircle className="h-10 w-10 text-primary" />,
              }].map((item, i) => (
              <motion.div
                key={i}
                className="bg-card rounded-lg p-8 shadow-sm border border-border hover:shadow-md transition-shadow reveal"
                initial={{ opacity: 0, y: 30 }}
                animate={visibleSections[i] ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
