"use client"

import { useState, useEffect } from "react"
import { Menu, X, Home, User, Briefcase, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Projects", href: "#projects", icon: Briefcase },
  { name: "Contact", href: "#contact", icon: Mail },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.slice(1))
      const scrollPosition = window.scrollY + 100

      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }

      const currentScrollY = window.scrollY
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
        setIsOpen(false)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const handleClick = (href: string) => {
    const element = document.getElementById(href.slice(1))
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({ top: offsetTop, behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-background/50 backdrop-blur-sm z-50">
        <div 
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav
        className={`fixed top-1 left-0 right-0 z-40 transition-all duration-500 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between rounded-2xl border border-border/50 bg-background/80 px-6 py-4 shadow-lg backdrop-blur-md">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold text-lg">
                I
              </div>
              <span className="text-xl font-bold text-foreground">Imad</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.name}
                    onClick={() => handleClick(item.href)}
                    className={`group relative flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      activeSection === item.href.slice(1)
                        ? "bg-primary/10 text-primary shadow-sm"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                    {activeSection === item.href.slice(1) && (
                      <div className="absolute -bottom-1 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-accent" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="h-9 w-9 rounded-xl transition-all duration-300 hover:scale-105 md:hidden"
              >
                <Menu className={`h-4 w-4 transition-all duration-300 ${isOpen ? "rotate-90 scale-0" : "rotate-0 scale-100"}`} />
                <X className={`absolute h-4 w-4 transition-all duration-300 ${isOpen ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`} />
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`mt-2 overflow-hidden rounded-2xl border border-border/50 bg-background/95 backdrop-blur-md transition-all duration-500 md:hidden ${
              isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-4 space-y-2">
              {navItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.name}
                    onClick={() => handleClick(item.href)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-300 hover:scale-[0.98] ${
                      activeSection === item.href.slice(1)
                        ? "bg-primary/10 text-primary shadow-sm"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    } ${isOpen ? `animate-fade-in-up animation-delay-${index * 100}` : ""}`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}