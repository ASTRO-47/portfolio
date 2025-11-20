"use client"

import { Button } from "@/components/ui/button"
import { Mail, Github, Linkedin } from "lucide-react"
import { useEffect, useRef, useState } from "react"

// Custom X (Twitter) icon component
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const socialLinks = [
  {
    name: "Email",
    icon: Mail,
    href: "mailto:your.email@example.com",
    label: "Ezzaghba38@gmail.com",
  },
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/astro-47",
    label: "Astro-47",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/imad-ez-zaghba-8581342ab/",
    label: "Imad Ez-Zaghba",
  },
  {
    name: "X",
    icon: XIcon,
    href: "https://twitter.com/yourusername",
    label: "Imad Ez-Zaghba",
  },
]

export function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    return () => observer.disconnect()
  }, [])
  return (
    <section id="contact" ref={sectionRef} className="py-8 md:py-12 relative">
      {/* Subtle section divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="container mx-auto max-w-7xl px-4">
        <div
          className={`mb-12 text-center transition-all duration-700 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">Get In Touch</h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-primary" />
          <p className="mt-4 text-lg text-muted-foreground">Let's work together on your next project</p>
        </div>

        <div className="mx-auto max-w-2xl">
          <div
            className={`mb-12 text-center transition-all duration-700 ${isVisible ? "animate-fade-in-up animation-delay-100" : "opacity-0"}`}
          >
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              Feel free to reach out through any of the channels below.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {socialLinks.map((link, index) => {
              const Icon = link.icon
              const isXIcon = link.name === "X (Twitter)"
              return (
                <Button
                  key={link.name}
                  variant="outline"
                  size="lg"
                  className={`group h-auto justify-start gap-4 border-border bg-card p-6 transition-all duration-700 hover:scale-105 hover:border-primary/50 hover:bg-card ${
                    isVisible ? `animate-scale-in animation-delay-${(index + 2) * 100}` : "opacity-0"
                  }`}
                  asChild
                >
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    <div className="rounded-lg bg-primary/10 p-3 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                      {isXIcon ? <Icon /> : <Icon className="h-6 w-6" />}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-foreground">{link.name}</div>
                      <div className="text-sm text-muted-foreground">{link.label}</div>
                    </div>
                  </a>
                </Button>
              )
            })}
          </div>

          <div
            className={`mt-12 text-center transition-all duration-700 ${isVisible ? "animate-fade-in animation-delay-600" : "opacity-0"}`}
          >
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
