"use client"

import { useState, useEffect } from "react"
import { Menu, X, Home, User, Briefcase, Mail, Sun, Moon, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

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
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
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
      {/* Enhanced Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-background/20 backdrop-blur-sm z-50">
        <div 
          className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-500 shadow-sm"
          style={{ 
            width: `${scrollProgress}%`,
            boxShadow: `0 0 10px hsl(var(--primary) / 0.5)`
          }}
        />
      </div>

      <nav
        className={`fixed top-2 left-0 right-0 z-40 transition-all duration-700 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="container mx-auto max-w-6xl px-4">
          {/* Enhanced Main Navigation */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl">
            {/* Animated background gradient */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 opacity-50 transition-all duration-1000"
              style={{
                transform: `translateX(${mousePosition.x * 0.01}px) translateY(${mousePosition.y * 0.01}px)`
              }}
            />
            
            {/* Glass reflection effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-30" />
            
            <div className="relative flex items-center justify-between px-8 py-5">
              {/* Enhanced Logo */}
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-primary to-accent text-white font-bold text-xl shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                    <span className="relative z-10">A</span>
                    <Sparkles className="absolute inset-0 h-3 w-3 text-white/50 animate-pulse" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    Astro
                  </span>
                  <span className="text-xs text-muted-foreground group-hover:text-accent transition-colors duration-300">
                    Frontend Dev
                  </span>
                </div>
              </div>

              {/* Enhanced Desktop Navigation */}
              <div className="hidden items-center gap-2 md:flex">
                {navItems.map((item, index) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.href.slice(1)
                  
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleClick(item.href)}
                      className={`group relative flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium transition-all duration-500 hover:scale-105 transform-gpu ${
                        isActive
                          ? "bg-gradient-to-r from-primary/20 to-accent/20 text-primary shadow-lg backdrop-blur-sm border border-primary/30"
                          : "text-muted-foreground hover:bg-white/10 hover:text-foreground hover:shadow-lg hover:backdrop-blur-sm"
                      }`}
                      style={{
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      {/* Magnetic hover effect background */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <Icon className={`h-4 w-4 transition-all duration-300 ${isActive ? 'text-primary' : 'group-hover:text-primary'}`} />
                      <span className="relative z-10">{item.name}</span>
                      
                      {/* Enhanced active indicator */}
                      {isActive && (
                        <>
                          <div className="absolute -bottom-1 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse" />
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 animate-pulse" />
                        </>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Enhanced Right Side Controls */}
              <div className="flex items-center gap-3">
                {/* Theme Toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="h-10 w-10 rounded-2xl transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:shadow-lg backdrop-blur-sm"
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>

                {/* Enhanced Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(!isOpen)}
                  className="h-10 w-10 rounded-2xl transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:shadow-lg backdrop-blur-sm md:hidden"
                >
                  <Menu className={`h-5 w-5 transition-all duration-500 ${isOpen ? "rotate-180 scale-0" : "rotate-0 scale-100"}`} />
                  <X className={`absolute h-5 w-5 transition-all duration-500 ${isOpen ? "rotate-0 scale-100" : "rotate-180 scale-0"}`} />
                </Button>
              </div>
            </div>
          </div>

          {/* Enhanced Mobile Navigation */}
          <div
            className={`mt-3 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl transition-all duration-700 ease-out md:hidden ${
              isOpen ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-4"
            }`}
          >
            <div className="p-6 space-y-3">
              {navItems.map((item, index) => {
                const Icon = item.icon
                const isActive = activeSection === item.href.slice(1)
                
                return (
                  <button
                    key={item.name}
                    onClick={() => handleClick(item.href)}
                    className={`flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left text-sm font-medium transition-all duration-500 hover:scale-[0.98] transform-gpu ${
                      isActive
                        ? "bg-gradient-to-r from-primary/20 to-accent/20 text-primary shadow-lg border border-primary/30"
                        : "text-muted-foreground hover:bg-white/10 hover:text-foreground hover:shadow-lg"
                    } ${isOpen ? `animate-fade-in-up animation-delay-${(index + 1) * 100}` : ""}`}
                  >
                    <Icon className={`h-5 w-5 transition-colors duration-300 ${isActive ? 'text-primary' : ''}`} />
                    <span className="flex-1">{item.name}</span>
                    {isActive && (
                      <div className="h-2 w-2 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse" />
                    )}
                  </button>
                )
              })}
              
              {/* Mobile CTA */}
              <div className="pt-4 border-t border-white/10">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-3">Let's work together</p>
                  <Button
                    size="sm"
                    onClick={() => handleClick("#contact")}
                    className="w-full bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg transition-all duration-300"
                  >
                    Get In Touch
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}