"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Star, Calendar, Eye, ChevronDown } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const projects = [
  {
    title: "Ft_transcendence",
    description: "A comprehensive real-time gaming platform featuring multiplayer Pong, chat system, and user management. Built with modern web technologies and WebSocket integration.",
    image: "/pong.jpg",
    tags: ["Next.js", "TypeScript", "WebSocket", "PostgreSQL", "Docker"],
    category: "Full Stack",
    year: "2024",
    status: "In Progress",
    github: "https://github.com/ASTRO-47/ft_transcendence",
    demo: "#",
    featured: true,
    stats: { stars: 2, views: "207" }
  },
  {
    title: "Inception",
    description: "A Docker-based system that deploys a complete web infrastructure with NGINX, WordPress, MariaDB, and Redis. Emphasis on DevOps practices and container orchestration.",
    image: "/docker.png",
    tags: ["Docker", "NGINX", "WordPress", "MariaDB", "Redis", "Shell"],
    category: "DevOps",
    year: "2024",
    status: "Completed",
    github: "https://github.com/ASTRO-47/inception",
    demo: "#",
    featured: true,
    stats: { stars: 3, views: "180" }
  },
  {
    title: "IRC",
    description: "An Internet Relay Chat server built from scratch in C++ handling multiple clients with channels, nicknames, private messaging, and operator privileges.",
    image: "/irc.webp",
    tags: ["C++", "Sockets", "Networking", "Concurrency"],
    category: "Systems",
    year: "2023",
    status: "Completed",
    github: "https://github.com/ASTRO-47/ft_irc",
    demo: "#",
    featured: false,
    stats: { stars: 4, views: "210" }
  },
  {
    title: "NetPractice",
    description: "A set of network configuration exercises focusing on understanding IP addresses, subnetting, and routing logic in computer networks.",
    image: "/net-practic.webp",
    tags: ["Networking", "IP", "Subnetting"],
    category: "Networks",
    year: "2023",
    status: "Completed",
    github: "https://github.com/ASTRO-47/NET_PRACTICE",
    demo: "#",
    featured: false,
    stats: { stars: 2, views: "130" }
  },
  {
    title: "Cub3D",
    description: "A 3D game engine inspired by Wolfenstein 3D, built using raycasting. Demonstrates graphics programming, math skills, and low-level C development.",
    image: "/cub.png",
    tags: ["C", "Raycasting", "Graphics", "MiniLibX"],
    category: "Graphics",
    year: "2023",
    status: "Completed",
    github: "https://github.com/ASTRO-47/cub_3d",
    demo: "#",
    featured: false,
    stats: { stars: 4, views: "220" }
  },
  {
    title: "Minishell",
    description: "A simplified shell implementation that mimics bash behavior with built-in commands, piping, redirections, and process management.",
    image: "/minishell.jpeg",
    tags: ["C", "System Programming", "Shell"],
    category: "Systems",
    year: "2023",
    status: "Completed",
    github: "https://github.com/ASTRO-47/minishell",
    demo: "#",
    featured: true,
    stats: { stars: 5, views: "340" }
  },
  {
    title: "Book Library",
    description: "A personal project made while learning web development. A simple app to add and manage book cards with a clean UI and responsive design.",
    image: "/books-lib.png",
    tags: ["HTML", "CSS", "JavaScript"],
    category: "Frontend",
    year: "2022",
    status: "Completed",
    github: "https://github.com/ASTRO-47/book-lib",
    demo: "#",
    featured: false,
    stats: { stars: 1, views: "95" }
  },
  {
    title: "WordPress Logistics Website",
    description: "Freelance project: A complete WordPress website for a logistics company, including custom themes, responsive UI, and SEO optimization.",
    image: "/logistic.png",
    tags: ["WordPress", "PHP", "CSS", "Freelance"],
    category: "Freelance",
    year: "2023",
    status: "Completed",
    github: "https://github.com/ASTRO-47/logistique-company-website",
    demo: "https://fb-bslogistique.ca",
    featured: true,
    stats: { stars: 0, views: "150" }
  },
  {
    title: "Twitter Profile Scraper",
    description: "Freelance tool that scrapes Twitter profiles to extract bios, followers, following, and tweets using Python and API integration.",
    image: "/twitter_scraper.svg",
    tags: ["Python", "API", "Automation", "Freelance"],
    category: "Freelance",
    year: "2023",
    status: "Completed",
    github: "https://github.com/astro-47/twitter_scraper",
    demo: "#",
    featured: true,
    stats: { stars: 0, views: "175" }
  }
]

export function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  // Sort projects by power/impact: Featured first, then by year (most recent first)
  const sortedProjects = [...projects].sort((a, b) => {
    // First priority: Featured projects come first
    if (a.featured !== b.featured) {
      return b.featured ? 1 : -1
    }
    // Second priority: Within featured/non-featured groups, sort by year (most recent first)
    return parseInt(b.year) - parseInt(a.year)
  })

  // Show first 4 projects initially, then all when expanded
  const displayedProjects = showAll ? sortedProjects : sortedProjects.slice(0, 4)
  const hasMoreProjects = sortedProjects.length > 4

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
    <section id="projects" ref={sectionRef} className="relative py-24">
      {/* Subtle section divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        {/* Header Section */}
        <div
          className={`mb-16 text-center transition-all duration-700 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Star className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Featured Work</span>
          </div>
          
          <h2 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
            Featured <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">Projects</span>
          </h2>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            My most impactful projects showcasing expertise in modern development and innovative solutions.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {displayedProjects.map((project, index) => (
            <Card
              key={project.title}
              className={`group relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm transition-all duration-700 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-3 ${
                isVisible ? `animate-scale-in animation-delay-${(index + 1) * 150}` : "opacity-0"
              } ${project.featured ? 'ring-1 ring-primary/20' : ''} ${
                index >= 4 && showAll ? 'animate-fade-in-up' : ''
              }`}
              onMouseEnter={() => setHoveredProject(project.title)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 left-4 z-20">
                  <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                </div>
              )}

              {/* Status Badge */}
              <div className="absolute top-4 right-4 z-20">
                <Badge 
                  variant={project.status === "Completed" ? "default" : "secondary"}
                  className="backdrop-blur-sm"
                >
                  {project.status}
                </Badge>
              </div>

              <CardHeader className="p-0 relative">
                <div className="relative aspect-video overflow-hidden rounded-t-lg">
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                  />
                  
                  {/* Hover overlay with actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Button 
                      size="sm" 
                      variant="secondary"
                      className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border-white/20"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button 
                      size="sm"
                      className="bg-primary/80 backdrop-blur-md hover:bg-primary text-white"
                      asChild
                    >
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-4">
                {/* Project header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {project.year}
                      </span>
                      <span>•</span>
                      <span>{project.category}</span>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {project.stats.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {project.stats.views}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className={`text-xs font-medium transition-all duration-300 hover:scale-105 ${
                        hoveredProject === project.title 
                          ? `animation-delay-${tagIndex * 50} animate-fade-in-up` 
                          : ''
                      }`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
          </div>

          {/* Show More Button */}
          {hasMoreProjects && (
            <div className={`text-center mt-16 transition-all duration-700 delay-500 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowAll(!showAll)}
                className="group px-8 py-4 rounded-full text-base font-medium hover:scale-105 transition-all duration-300"
              >
                {showAll ? (
                  <>
                    Show Less Projects
                    <ChevronDown className="ml-2 h-5 w-5 rotate-180 transition-transform duration-300" />
                  </>
                ) : (
                  <>
                    Show More Projects ({sortedProjects.length - 4} more)
                  <ChevronDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
                </>
              )}
            </Button>
          </div>
        )}

        {/* GitHub Link */}
        <div className={`text-center mt-8 transition-all duration-700 delay-700 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-card/50 backdrop-blur-sm border border-border">
            <span className="text-muted-foreground">Explore more on GitHub</span>
            <Button variant="ghost" size="sm" asChild>
              <a href="https://github.com/ASTRO-47" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                View All Repositories
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
