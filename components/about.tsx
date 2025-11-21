"use client"

import { Code2, Database, Globe, Server, Box, GitBranch } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"

const skillCategories = [
  {
    icon: Code2,
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript", "HTML/CSS"]
  },
  {
    icon: Server,
    title: "Backend",
    skills: ["Node.js", "Express", "REST APIs", "Django", "Flask"]
  },
  {
    icon: Database,
    title: "Database",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis"]
  },
  {
    icon: Box,
    title: "DevOps & Tools",
    skills: ["Docker", "Git", "Linux", "Nginx", "GitHub Actions"]
  }
]

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [activeTab, setActiveTab] = useState<"about" | "tech">("about")

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
    <section id="about" ref={sectionRef} className="py-8 md:py-12 relative">
      <div className="container mx-auto max-w-7xl px-6">
        <div
          className={`mb-8 text-center transition-all duration-700 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            About <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent" />
        </div>

        <div className="mx-auto max-w-4xl">
          <div className={`rounded-xl border border-blue-500 bg-card/50 p-4 md:p-6 shadow-sm transform transition-all duration-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'} hover:shadow-lg hover:scale-[1.01]`}>
            {/* Tabs */}
            <div className="mb-4 flex items-center justify-start gap-6">
              <button
                onClick={() => setActiveTab("about")}
                className={`px-3 pb-2 text-sm font-medium transition-colors ${activeTab === "about" ? "text-primary border-b-2 border-primary" : "text-foreground hover:text-primary hover:border-b-2 hover:border-primary"}`}
                aria-pressed={activeTab === "about"}
              >
                About Me
              </button>
              <button
                onClick={() => setActiveTab("tech")}
                className={`px-3 pb-2 text-sm font-medium transition-colors ${activeTab === "tech" ? "text-primary border-b-2 border-primary" : "text-foreground hover:text-primary hover:border-b-2 hover:border-primary"}`}
                aria-pressed={activeTab === "tech"}
              >
                Technologies
              </button>
            </div>

            <div className="mt-4">
              {/* About Tab Content (render only when active to avoid layout gaps) */}
              {activeTab === "about" && (
                <div className="text-center text-lg leading-relaxed text-muted-foreground transition-all duration-300 opacity-100 translate-y-0">
                  <p>
                    I'm a full-stack developer with a passion for building modern web applications. From crafting intuitive user interfaces
                    to architecting robust backend systems, I bring ideas to life through clean, efficient code. My experience spans across
                    freelance projects, automation systems, and full-scale web applications.
                  </p>
                  <p className="mt-6">
                    Educated at 1337 Coding School and trained in modern development practices, I'm constantly exploring new technologies
                    and contributing to innovative projects. I believe in writing code that's not just functional, but maintainable and scalable.
                  </p>
                </div>
              )}

              {/* Technologies Tab Content (render only when active) */}
              {activeTab === "tech" && (
                <div className="transition-all duration-300 opacity-100 translate-y-0">
                  <h3 className="mb-8 text-center text-2xl font-bold text-foreground">
                    Skills & <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Technologies</span>
                  </h3>

                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {skillCategories.map((category, index) => (
                      <div
                        key={category.title}
                        className={`group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-500 transform will-change-transform hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1`}
                        style={{ animationDelay: `${(index + 4) * 100}ms` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        <div className="relative">
                          <div className="mb-4 flex items-center gap-3">
                            <div className="rounded-lg bg-primary/10 p-2 transition-colors group-hover:bg-primary/20">
                              <category.icon className="h-5 w-5 text-primary" />
                            </div>
                            <h4 className="text-lg font-semibold text-foreground">{category.title}</h4>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill) => (
                              <Badge 
                                key={skill}
                                variant="secondary"
                                className="bg-background/80 text-foreground hover:bg-primary/10 hover:text-primary transition-colors transform hover:scale-105"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
