"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { useEffect, useRef, useState } from "react"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  ExternalLink,
  Github,
  Star,
  Calendar,
  Eye,
  ChevronDown,
  X,
  Code2,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const projects = [
  {
    title: "Ft_transcendence",
    description: "A comprehensive real-time gaming platform featuring multiplayer Pong, chat system, and user management. Built with modern web technologies and WebSocket integration.",
    longDescription: "Ft_transcendence is a full-stack web application that combines real-time gaming, social features, and modern authentication. The project showcases advanced concepts like WebSocket communication, real-time data synchronization, and secure user management with OAuth integration.",
    image: "/pong.jpg",
    tags: ["Next.js", "TypeScript", "WebSocket", "PostgreSQL", "Docker"],
    category: "Full Stack",
    year: "2024",
    status: "In Progress",
    github: "https://github.com/ASTRO-47/ft_transcendence",
    demo: "#",
    featured: true,
    stats: { stars: 2, views: "207" },
    highlights: [
      "Real-time multiplayer Pong game with smooth animations",
      "Live chat system with channels and direct messaging",
      "OAuth 2.0 authentication (42 Network integration)",
      "User profiles with achievements and match history",
      "Docker containerization for easy deployment"
    ],
    challenges: "Implementing real-time game state synchronization across multiple clients while maintaining low latency and ensuring fair gameplay.",
    role: "Full Stack Developer"
  },
  {
    title: "Inception",
    description: "A Docker-based system that deploys a complete web infrastructure with NGINX, WordPress, MariaDB, and Redis. Emphasis on DevOps practices and container orchestration.",
    longDescription: "Inception demonstrates deep understanding of containerization and infrastructure as code. The project involves setting up a complete web stack using Docker containers, each serving a specific purpose while communicating through a custom network.",
    image: "/docker.png",
    tags: ["Docker", "NGINX", "WordPress", "MariaDB", "Redis", "Shell"],
    category: "DevOps",
    year: "2024",
    status: "Completed",
    github: "https://github.com/ASTRO-47/inception",
    demo: "#",
    featured: true,
    stats: { stars: 3, views: "180" },
    highlights: [
      "Multi-container Docker architecture with docker-compose",
      "NGINX configured as reverse proxy with SSL/TLS",
      "WordPress with PHP-FPM for optimal performance",
      "MariaDB database with persistent volumes",
      "Redis caching layer for improved response times"
    ],
    challenges: "Configuring secure inter-container communication and implementing proper volume mounting for data persistence.",
    role: "DevOps Engineer"
  },
  {
    title: "IRC",
    description: "An Internet Relay Chat server built from scratch in C++ handling multiple clients with channels, nicknames, private messaging, and operator privileges.",
    longDescription: "A complete IRC server implementation following the RFC specifications, handling concurrent client connections using socket programming and implementing the full IRC protocol.",
    image: "/irc.webp",
    tags: ["C++", "Sockets", "Networking", "Concurrency"],
    category: "Systems",
    year: "2023",
    status: "Completed",
    github: "https://github.com/ASTRO-47/ft_irc",
    demo: "#",
    featured: false,
    stats: { stars: 4, views: "210" },
    highlights: [
      "Non-blocking I/O with poll() for handling multiple clients",
      "Complete IRC command set (JOIN, PART, PRIVMSG, KICK, etc.)",
      "Channel management with operator privileges",
      "Nickname registration and authentication",
      "Compatible with standard IRC clients"
    ],
    challenges: "Managing multiple concurrent connections efficiently while maintaining protocol compliance and handling edge cases.",
    role: "Systems Programmer"
  },
  {
    title: "NetPractice",
    description: "A set of network configuration exercises focusing on understanding IP addresses, subnetting, and routing logic in computer networks.",
    longDescription: "NetPractice provides hands-on experience with network fundamentals through practical exercises involving IP addressing, subnet masks, and routing tables.",
    image: "/net-practic.webp",
    tags: ["Networking", "IP", "Subnetting"],
    category: "Networks",
    year: "2023",
    status: "Completed",
    github: "https://github.com/ASTRO-47/NET_PRACTICE",
    demo: "#",
    featured: false,
    stats: { stars: 2, views: "130" },
    highlights: [
      "Understanding of TCP/IP networking stack",
      "Subnet mask calculations and CIDR notation",
      "Routing table configuration",
      "Network troubleshooting scenarios",
      "IP address planning and allocation"
    ],
    challenges: "Mastering complex subnetting scenarios and understanding routing decisions in multi-hop networks.",
    role: "Network Engineer"
  },
  {
    title: "Cub3D",
    description: "A 3D game engine inspired by Wolfenstein 3D, built using raycasting. Demonstrates graphics programming, math skills, and low-level C development.",
    longDescription: "Cub3D is a raycasting engine that renders a 3D perspective from a 2D map, implementing the same technique used in classic games like Wolfenstein 3D.",
    image: "/cub.png",
    tags: ["C", "Raycasting", "Graphics", "MiniLibX"],
    category: "Graphics",
    year: "2023",
    status: "Completed",
    github: "https://github.com/ASTRO-47/cub_3d",
    demo: "#",
    featured: false,
    stats: { stars: 4, views: "220" },
    highlights: [
      "Raycasting algorithm for 3D rendering",
      "Texture mapping on walls",
      "Player movement and collision detection",
      "Minimap and field of view visualization",
      "Optimized rendering performance"
    ],
    challenges: "Implementing efficient raycasting algorithm and handling trigonometric calculations for accurate perspective rendering.",
    role: "Graphics Programmer"
  },
  {
    title: "Minishell",
    description: "A simplified shell implementation that mimics bash behavior with built-in commands, piping, redirections, and process management.",
    longDescription: "Minishell is a Unix shell implementation that handles command parsing, execution, and process management, providing a deep understanding of operating system concepts.",
    image: "/minishell.jpeg",
    tags: ["C", "System Programming", "Shell"],
    category: "Systems",
    year: "2023",
    status: "Completed",
    github: "https://github.com/ASTRO-47/minishell",
    demo: "#",
    featured: true,
    stats: { stars: 5, views: "340" },
    highlights: [
      "Command parsing and lexical analysis",
      "Built-in commands (cd, echo, env, export, etc.)",
      "Pipes and redirections (>, <, >>)",
      "Environment variable expansion",
      "Signal handling (Ctrl+C, Ctrl+D, Ctrl+\\)"
    ],
    challenges: "Proper process management and handling complex pipe chains while maintaining correct file descriptor management.",
    role: "Systems Programmer"
  },
  {
    title: "Book Library",
    description: "A personal project made while learning web development. A simple app to add and manage book cards with a clean UI and responsive design.",
    longDescription: "Book Library is a learning project that demonstrates fundamental web development skills including DOM manipulation, local storage, and responsive design.",
    image: "/books-lib.png",
    tags: ["HTML", "CSS", "JavaScript"],
    category: "Frontend",
    year: "2022",
    status: "Completed",
    github: "https://github.com/ASTRO-47/book-lib",
    demo: "#",
    featured: false,
    stats: { stars: 1, views: "95" },
    highlights: [
      "Dynamic book card creation",
      "Local storage for data persistence",
      "Responsive grid layout",
      "Form validation",
      "Clean and modern UI design"
    ],
    challenges: "Learning JavaScript DOM manipulation and implementing proper data persistence with local storage.",
    role: "Frontend Developer"
  },
  {
    title: "WordPress Logistics Website",
    description: "Freelance project: A complete WordPress website for a logistics company, including custom themes, responsive UI, and SEO optimization.",
    longDescription: "A professional WordPress website built for a Canadian logistics company, featuring custom theme development, SEO optimization, and mobile-responsive design.",
    image: "/logistic.png",
    tags: ["WordPress", "PHP", "CSS", "Freelance"],
    category: "Freelance",
    year: "2023",
    status: "Completed",
    github: "https://github.com/ASTRO-47/logistique-company-website",
    demo: "https://fb-bslogistique.ca",
    featured: true,
    stats: { stars: 0, views: "150" },
    highlights: [
      "Custom WordPress theme development",
      "SEO optimization and Google Analytics integration",
      "Mobile-first responsive design",
      "Contact forms and email integration",
      "Performance optimization (lazy loading, caching)"
    ],
    challenges: "Meeting client requirements while ensuring fast load times and maintaining SEO best practices.",
    role: "Freelance Web Developer"
  },
  {
    title: "Twitter Profile Scraper",
    description: "Freelance tool that scrapes Twitter profiles to extract bios, followers, following, and tweets using Python and API integration.",
    longDescription: "A Python automation tool developed for a client to extract and analyze Twitter profile data, including follower statistics, tweets, and engagement metrics.",
    image: "/twitter_scraper.svg",
    tags: ["Python", "API", "Automation", "Freelance"],
    category: "Freelance",
    year: "2023",
    status: "Completed",
    github: "https://github.com/astro-47/twitter_scraper",
    demo: "#",
    featured: true,
    stats: { stars: 0, views: "175" },
    highlights: [
      "Twitter API integration",
      "Data extraction and parsing",
      "CSV export functionality",
      "Rate limiting handling",
      "Error handling and logging"
    ],
    challenges: "Working with Twitter API rate limits and handling various edge cases in profile data formats.",
    role: "Python Developer"
  }
];

export function ThreeDCardDemo() {
  const [isVisible, setIsVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const sortedProjects = [...projects].sort((a, b) => {
    // First priority: Featured projects come first
    if (a.featured !== b.featured) {
      return b.featured ? 1 : -1;
    }
    // Second priority: Within featured/non-featured groups, sort by year (most recent first)
    return parseInt(b.year) - parseInt(a.year);
  });
  
  const displayedProjects = showAll ? sortedProjects : sortedProjects.slice(0, 6);
  const hasMoreProjects = sortedProjects.length > 6;
  
  return (
    <>
      {displayedProjects.map((project, index) => (
        <div
          key={project.title}
          onMouseEnter={() => setHoveredProject(project.title)}
          onMouseLeave={() => setHoveredProject(null)}
          onClick={() => setSelectedProject(project)}
        >
          <CardContainer className="inter-var">
            <CardBody className="bg-blue-950 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                {project.title}
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <img
                  src={project.image}
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>
              <CardContent className="p-4 space-y-3">
                {/* Project header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300 truncate">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {project.year}
                      </span>
                      <span>•</span>
                      <span>{project.category}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {project.stats.stars}
                    </span>
                  </div>
                </div>

                {/* Description - limited to 2 lines */}
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack - limited tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 4).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs font-medium"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 4 && (
                    <Badge variant="secondary" className="text-xs font-medium">
                      +{project.tags.length - 4}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </CardBody>
          </CardContainer>

           <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
                    {selectedProject && (
                      <div className="relative">
                        {/* Hero Image */}
                        <div className="relative h-64 md:h-80 overflow-hidden">
                          {/* <Image
                            src={selectedProject.image || "/placeholder.svg"}
                            alt={selectedProject.title}
                            fill
                            className="object-cover"
                            /> */}
                          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                          
                          {/* Featured & Status Badges */}
                          <div className="absolute top-4 left-4 flex gap-2">
                            {selectedProject.featured && (
                              <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
                                <Star className="h-3 w-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                            <Badge 
                              variant={selectedProject.status === "Completed" ? "default" : "secondary"}
                              className="backdrop-blur-sm"
                              >
                              {selectedProject.status}
                            </Badge>
                          </div>
                        </div>
          
                        {/* Content */}
                        <div className="p-6 md:p-8 space-y-6">
                          {/* Header */}
                          <div>
                            <DialogHeader>
                              <DialogTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
                                {selectedProject.title}
                              </DialogTitle>
                              <DialogDescription className="flex items-center gap-4 text-base mt-2">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {selectedProject.year}
                                </span>
                                <span>•</span>
                                <span>{selectedProject.category}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Star className="h-4 w-4 text-primary" />
                                  {selectedProject.stats.stars}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Eye className="h-4 w-4" />
                                  {selectedProject.stats.views}
                                </span>
                              </DialogDescription>
                            </DialogHeader>
                          </div>
          
                          {/* Role Badge */}
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium text-muted-foreground">
                              Role: <span className="text-foreground">{selectedProject.role}</span>
                            </span>
                          </div>
          
                          {/* Description */}
                          <div className="space-y-3">
                            <h3 className="text-xl font-semibold flex items-center gap-2">
                              <Code2 className="h-5 w-5 text-primary" />
                              About the Project
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                              {selectedProject.longDescription}
                            </p>
                          </div>
          
                          {/* Key Highlights */}
                          <div className="space-y-3">
                            <h3 className="text-xl font-semibold flex items-center gap-2">
                              <CheckCircle2 className="h-5 w-5 text-primary" />
                              Key Highlights
                            </h3>
                            <ul className="space-y-2">
                              {selectedProject.highlights.map((highlight, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
          
                          {/* Challenges */}
                          <div className="space-y-3">
                            <h3 className="text-xl font-semibold flex items-center gap-2">
                              <Sparkles className="h-5 w-5 text-primary" />
                              Technical Challenges
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                              {selectedProject.challenges}
                            </p>
                          </div>
          
                          {/* Tech Stack */}
                          <div className="space-y-3">
                            <h3 className="text-xl font-semibold">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                              {selectedProject.tags.map((tag) => (
                                <Badge
                                key={tag}
                                variant="secondary"
                                className="text-sm font-medium"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
          
                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-4 pt-4 border-t">
                            <Button asChild className="flex-1 min-w-[200px]">
                              <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4 mr-2" />
                                View on GitHub
                              </a>
                            </Button>
                            {selectedProject.demo !== "#" && (
                              <Button asChild variant="outline" className="flex-1 min-w-[200px]">
                                <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Live Demo
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
        </div>
      ))}
    </>
  );
}