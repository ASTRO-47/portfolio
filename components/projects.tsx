"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Star, Calendar, Eye } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const projects = [
  {
    title: "Ft_transcendence",
    description: "A comprehensive real-time gaming platform featuring multiplayer Pong, chat system, and user management. Built with modern web technologies and WebSocket integration.",
    image: "/trans.png",
    tags: ["Next.js", "TypeScript", "WebSocket", "PostgreSQL", "Docker"],
    category: "Full Stack",
    year: "2024",
    status: "Completed",
    github: "https://github.com/ASTRO-47",
    demo: "#",
    featured: true,
    stats: { stars: 42, views: "2.1k" }
  },
  {
    title: "Task Management Dashboard",
    description: "Advanced project management tool with real-time collaboration, Kanban boards, time tracking, and analytics dashboard.",
    image: "/task-management-dashboard.png",
    tags: ["React", "Firebase", "Tailwind", "Framer Motion", "TypeScript"],
    category: "Frontend",
    year: "2024",
    status: "In Progress",
    github: "https://github.com/ASTRO-47",
    demo: "#",
    featured: true,
    stats: { stars: 28, views: "1.8k" }
  },
  {
    title: "Weather Intelligence Hub",
    description: "AI-powered weather application with predictive analytics, satellite imagery, and personalized climate insights.",
    image: "/weather-app-interface.png",
    tags: ["Next.js", "OpenAI", "Charts.js", "Mapbox", "API"],
    category: "Full Stack",
    year: "2023",
    status: "Completed",
    github: "https://github.com/ASTRO-47",
    demo: "#",
    featured: false,
    stats: { stars: 35, views: "3.2k" }
  },
  {
    title: "Portfolio Creator Studio",
    description: "No-code portfolio builder with drag-and-drop interface, theme customization, and one-click deployment.",
    image: "/portfolio-website-builder.png",
    tags: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
    category: "SaaS",
    year: "2023",
    status: "Completed",
    github: "https://github.com/ASTRO-47",
    demo: "#",
    featured: false,
    stats: { stars: 67, views: "4.5k" }
  },
]

export function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [filter, setFilter] = useState("All")
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const categories = ["All", "Full Stack", "Frontend", "SaaS"]
  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(project => project.category === filter)

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
    <section id="projects" ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/30 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_hsl(var(--primary))_0%,_transparent_50%)] opacity-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_hsl(var(--accent))_0%,_transparent_50%)] opacity-10" />
      
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
            My <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">Projects</span>
          </h2>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A collection of projects showcasing my expertise in modern web development, 
            from concept to deployment.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={`flex flex-wrap justify-center gap-2 mb-12 transition-all duration-700 delay-200 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                filter === category
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <Card
              key={project.title}
              className={`group relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm transition-all duration-700 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-3 ${
                isVisible ? `animate-scale-in animation-delay-${(index + 1) * 150}` : "opacity-0"
              } ${project.featured ? 'ring-1 ring-primary/20' : ''}`}
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

        {/* Call to Action */}
        <div className={`text-center mt-16 transition-all duration-700 delay-500 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-card/50 backdrop-blur-sm border border-border">
            <span className="text-muted-foreground">Want to see more?</span>
            <Button variant="outline" size="sm" asChild>
              <a href="https://github.com/ASTRO-47" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                View All Projects
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
