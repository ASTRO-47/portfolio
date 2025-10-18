"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Briefcase, Home, Mail, Menu, Moon, Sun, User, X } from "lucide-react"
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
  const { theme, setTheme } = useTheme()
  const tickingRef = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) return
      tickingRef.current = true
      requestAnimationFrame(() => {
        const sections = navItems.map((item) => item.href.slice(1))
        const scrollPosition = window.scrollY + 100

        const totalHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0
        setScrollProgress(progress)

        for (const section of sections) {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            const offsetTop = rect.top + window.pageYOffset
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + rect.height) {
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
        tickingRef.current = false
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [lastScrollY])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.getElementById(href.slice(1))
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({ top: offsetTop, behavior: "smooth" })
    }
    setIsOpen(false)
    history.replaceState(null, "", href)
  }

  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow-lg focus:ring-2 focus:ring-primary"
      >
        Skip to content
      </a>

      <div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 z-50"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(scrollProgress)}
      >
        <div
          className="h-full bg-gradient-to-r from-primary via-accent to-primary shadow-lg shadow-primary/50 transition-[width] duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
        }`}
        role="navigation"
        aria-label="Primary"
      >
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 rounded-full blur-xl opacity-60" />
          
          <div className="relative flex items-center gap-1 px-2 py-2 rounded-full border border-border/50 bg-background/80 backdrop-blur-xl shadow-2xl">
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.href.slice(1)
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                    aria-current={isActive ? "page" : undefined}
                    title={item.name}
                    className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className={isActive ? "inline" : "hidden xl:inline"}>{item.name}</span>
                    
                    {isActive && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse opacity-50" />
                    )}
                  </a>
                )
              })}
            </div>

            <div className="hidden md:block h-8 w-px bg-border/50 mx-1" />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-10 w-10 rounded-full hover:bg-muted/50 transition-all"
              aria-label="Toggle theme"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden h-10 w-10 rounded-full hover:bg-muted/50 transition-all"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
            >
              <Menu className={`h-5 w-5 transition-all duration-300 ${isOpen ? "rotate-90 scale-0" : "rotate-0 scale-100"}`} />
              <X className={`absolute h-5 w-5 transition-all duration-300 ${isOpen ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`} />
            </Button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`md:hidden mt-4 overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 rounded-2xl blur-xl opacity-60" />
            
            <div className="relative p-3 rounded-2xl border border-border/50 bg-background/90 backdrop-blur-xl shadow-2xl">
              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.href.slice(1)
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleClick(e, item.href)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-primary to-accent text-white shadow-md"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="flex-1">{item.name}</span>
                      {isActive && (
                        <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                      )}
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
