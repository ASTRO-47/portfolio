"use client"

import { useEffect, useRef, useState } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const mousePosRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY }
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener("resize", resize)

    const colors = {
      light: [
        { r: 99, g: 102, b: 241 },   // indigo
        { r: 139, g: 92, b: 246 },   // purple
        { r: 59, g: 130, b: 246 },   // blue
        { r: 236, g: 72, b: 153 },   // pink
      ],
      dark: [
        { r: 99, g: 102, b: 241 },   // indigo
        { r: 139, g: 92, b: 246 },   // purple
        { r: 59, g: 130, b: 246 },   // blue
        { r: 236, g: 72, b: 153 },   // pink
      ]
    }

    const isDark = () => document.documentElement.classList.contains("dark")

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: { r: number; g: number; b: number }
      alpha: number

      constructor(canvas: HTMLCanvasElement) {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        const colorSet = isDark() ? colors.dark : colors.light
        this.color = colorSet[Math.floor(Math.random() * colorSet.length)]
        this.alpha = Math.random() * 0.5 + 0.2
      }

      update(canvas: HTMLCanvasElement) {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha})`
        ctx.fill()
      }
    }

    class Wave {
      amplitude: number
      frequency: number
      phase: number
      speed: number
      color: { r: number; g: number; b: number }
      yOffset: number

      constructor(canvas: HTMLCanvasElement, index: number) {
        this.amplitude = Math.random() * 50 + 30
        this.frequency = Math.random() * 0.01 + 0.005
        this.phase = Math.random() * Math.PI * 2
        this.speed = Math.random() * 0.02 + 0.01
        const colorSet = isDark() ? colors.dark : colors.light
        this.color = colorSet[index % colorSet.length]
        this.yOffset = (canvas.height / 4) * (index + 1)
      }

      update() {
        this.phase += this.speed
      }

      draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        ctx.beginPath()
        ctx.moveTo(0, canvas.height)

        for (let x = 0; x < canvas.width; x++) {
          const y = this.yOffset + Math.sin(x * this.frequency + this.phase) * this.amplitude
          ctx.lineTo(x, y)
        }

        ctx.lineTo(canvas.width, canvas.height)
        ctx.closePath()

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`)
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${isDark() ? 0.08 : 0.05})`)
        
        ctx.fillStyle = gradient
        ctx.fill()
      }
    }

    class GradientOrb {
      x: number
      y: number
      targetX: number
      targetY: number
      radius: number
      color: { r: number; g: number; b: number }
      pulsePhase: number
      pulseSpeed: number

      constructor(canvas: HTMLCanvasElement) {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.targetX = this.x
        this.targetY = this.y
        this.radius = Math.random() * 200 + 150
        const colorSet = isDark() ? colors.dark : colors.light
        this.color = colorSet[Math.floor(Math.random() * colorSet.length)]
        this.pulsePhase = Math.random() * Math.PI * 2
        this.pulseSpeed = Math.random() * 0.02 + 0.01
      }

      update(mouseX: number, mouseY: number) {
        // Autonomous movement - very slow
        this.x += Math.sin(Date.now() * 0.001) * 0.001
        this.y += Math.cos(Date.now() * 0.001) * 0.001

        // Almost imperceptible mouse interaction
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance > 0 && distance < 600) {
          const force = (1 - distance / 600) * 0.00002
          this.x += dx * force
          this.y += dy * force
        }

        this.pulsePhase += this.pulseSpeed
      }

      draw(ctx: CanvasRenderingContext2D) {
        const pulse = Math.sin(this.pulsePhase) * 30 + 30
        const currentRadius = this.radius + pulse

        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, currentRadius
        )

        const alpha = isDark() ? 0.15 : 0.1
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha})`)
        gradient.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha * 0.5})`)
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`)

        ctx.fillStyle = gradient
        ctx.fillRect(this.x - currentRadius, this.y - currentRadius, currentRadius * 2, currentRadius * 2)
      }
    }

    // Create particles
    const particles: Particle[] = []
    for (let i = 0; i < 80; i++) {
      particles.push(new Particle(canvas))
    }

    // Create waves
    const waves: Wave[] = []
    for (let i = 0; i < 3; i++) {
      waves.push(new Wave(canvas, i))
    }

    // Create gradient orbs
    const orbs: GradientOrb[] = []
    for (let i = 0; i < 5; i++) {
      orbs.push(new GradientOrb(canvas))
    }

    const animate = () => {
      time += 0.01

      // Clear with background color
      const bgColor = isDark() ? "#0a0e1a" : "#ffffff"
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw gradient orbs
      orbs.forEach((orb) => {
        orb.update(mousePosRef.current.x, mousePosRef.current.y)
        orb.draw(ctx)
      })

      // Draw waves
      waves.forEach((wave) => {
        wave.update()
        wave.draw(ctx, canvas)
      })

      // Draw particles
      particles.forEach((particle) => {
        particle.update(canvas)
        particle.draw(ctx)
      })

      // Draw connections between nearby particles
      ctx.strokeStyle = isDark() ? "rgba(99, 102, 241, 0.1)" : "rgba(99, 102, 241, 0.06)"
      ctx.lineWidth = 0.5
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{ width: "100vw", height: "100vh" }}
      />
      
      {/* Additional glow overlay - ultra slow and subtle */}
      <div className="fixed inset-0 -z-[9] pointer-events-none">
        <div 
          className="absolute w-[300px] h-[300px] rounded-full opacity-5 blur-3xl transition-all duration-[5000ms] ease-out"
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)",
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </>
  )
}
