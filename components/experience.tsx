"use client"

import { Briefcase, Calendar, MapPin, GraduationCap } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    role: "Freelance Developer",
    company: "Remote — USA",
    period: "2024",
    location: "Remote",
    achievements: [
      "Built an automated pipeline to collect publicly available profile information from platforms like Facebook and X (Twitter)",
      "Developed a lightweight REST API to deliver the collected data in clean, structured JSON format",
      "Implemented robust error handling and rate limiting for API stability"
    ]
    ,
    technologies: ["Node.js", "TypeScript", "Express", "Puppeteer", "Postgres"]
  },
  {
    role: "Junior Web Developer",
    company: "Freelance — Quebec, Canada",
    period: "2023 - 2024",
    location: "Remote",
    achievements: [
      "Built a corporate transportation website using WordPress with custom responsive layouts",
      "Integrated service pages and validated contact forms with email forwarding",
      "Optimized website performance and ensured cross-browser compatibility"
    ]
    ,
    technologies: ["WordPress", "PHP", "HTML", "CSS", "Tailwind"]
  }
]

const education = [
  {
    degree: "Computer Science",
    school: "1337 Coding School – UM6P",
    period: "2023 – October 2025",
    description: "Peer-to-peer learning methodology, advanced programming projects, and problem-solving"
  },
  {
    degree: "Computer Engineering (MIP-Génie informatique)",
    school: "Sidi Mohamed Ben Abdlah University",
    period: "2021 – 2023",
    description: "Foundation in computer engineering principles, algorithms, and software development"
  }
  ,
  {
    degree: "High School Diploma — Sciences (Mathematics)",
    school: "Almansour Dahbi High School",
    period: "2018 – 2021",
    description: "Focused on mathematics and sciences coursework with strong performance in STEM subjects."
  }
]

export function Experience() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Work Experience Section */}
      <section id="experience" ref={sectionRef} className="py-8 md:py-12 relative">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl transition-all duration-700 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}>
              Work <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Experience</span>
            </h2>
            <div className={`mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-700 delay-100 ${
              isVisible ? "animate-fade-in" : "opacity-0"
            }`} />
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0 hidden md:block md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div
                  key={`exp-${index}`}
                  className={`relative transition-all duration-700 ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${(index + 1) * 150}ms` }}
                >
                  <div className={`flex flex-col md:flex-row gap-8 items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="flex-1 md:w-[calc(50%-2rem)]">
                      <div className="group relative rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                          <div className={`absolute -top-3 ${index % 2 === 0 ? 'md:left-auto md:-right-6' : 'md:-left-6'} left-3 flex h-12 w-12 items-center justify-center rounded-lg border-4 border-background bg-primary`}>
                            <Briefcase className="h-5 w-5 text-primary-foreground" />
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        <div className="relative pt-4">
                          <div className="mb-3">
                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{exp.role}</h3>
                            <p className="mt-1 text-base font-medium text-muted-foreground">{exp.company}</p>
                          </div>

                          <div className="mb-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-4 w-4 text-primary" />
                              <span>{exp.period}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="h-4 w-4 text-primary" />
                              <span>{exp.location}</span>
                            </div>
                          </div>

                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Technologies */}
                          {exp.technologies && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {exp.technologies.map((tech) => (
                                <Badge key={tech} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:block flex-1 md:w-[calc(50%-2rem)]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section (timeline) */}
      <section id="education" className="py-8 md:py-12 relative">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl transition-all duration-700 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Education</span>
            </h2>
            <div className={`mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-700 delay-100 ${
              isVisible ? "animate-fade-in" : "opacity-0"
            }`} />
          </div>

          <div className="relative">
            {/* Vertical center line for timeline (desktop) */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0 hidden md:block md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-12">
              {education.slice().reverse().map((edu, index) => (
                <div
                  key={`edu-${index}`}
                  className={`relative transition-all duration-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${(index + 1) * 150}ms` }}
                >
                  <div className={`flex flex-col md:flex-row gap-8 items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="flex-1 md:w-[calc(50%-2rem)]">
                      <div className="group relative  rounded-xl border border-border/50 bg-[card/50] p-6 backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                        <div className={`absolute -top-3 ${index % 2 === 0 ? 'md:left-auto md:-right-6' : 'md:-left-6'} left-3 flex h-12 w-12 items-center justify-center rounded-lg border-4 border-background bg-[#10B77F]`}>
                          <GraduationCap className="h-5 w-5 text-accent-foreground" />
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        <div className="relative pt-4">
                          <div className="mb-3">
                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{edu.degree}</h3>
                            <p className="mt-1 text-base font-medium text-muted-foreground">{edu.school}</p>
                          </div>

                          <div className="mb-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-4 w-4 text-accent" />
                              <span>{edu.period}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{edu.description}</p>
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:block flex-1 md:w-[calc(50%-2rem)]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
