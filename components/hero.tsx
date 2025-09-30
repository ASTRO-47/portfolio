"use client"

import { Button } from "@/components/ui/button"
import { Download, ArrowDown } from "lucide-react"
import Image from "next/image"

export function Hero() {
  const handleViewWork = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      const offsetTop =
        projectsSection.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({ top: offsetTop, behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background"
    >
      <div className="container mx-auto flex max-w-7xl flex-col-reverse items-center gap-12 px-6 py-20 lg:flex-row lg:gap-24">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <span className="mb-6 inline-block rounded-full bg-primary/10 px-5 py-2 text-sm font-medium text-primary shadow-sm">
            Welcome to my portfolio
          </span>

          <h1 className="mb-4 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Imad Ez-Zaghba
            </span>
          </h1>

          <h2 className="mb-6 text-2xl font-semibold text-muted-foreground sm:text-3xl">
            Frontend Developer
          </h2>

          <p className="mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground lg:leading-loose">
            I craft beautiful, responsive web experiences with modern
            technologies. Passionate about clean code, intuitive design, and
            creating digital solutions that make a difference.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Button
              size="lg"
              onClick={handleViewWork}
              className="group shadow-md transition-transform hover:scale-105"
            >
              View My Work
              <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="shadow-sm transition-colors hover:border-primary hover:text-primary"
            >
              <a href="#" download aria-label="Download my resume as PDF">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </div>
        </div>

        {/* Profile Image */}
        <div className="flex-1">
          <div className="relative mx-auto aspect-square max-w-sm overflow-hidden rounded-3xl border-4 border-primary/20 shadow-xl shadow-primary/10 transition-all duration-500 hover:scale-105 hover:shadow-primary/20 lg:max-w-md">
            <Image
              src="/port_image.jpeg"
              alt="Profile photo of Ez-Zaghba Imad"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
