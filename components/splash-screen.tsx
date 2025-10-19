"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [step, setStep] = useState(0)

  // Memoize particles to prevent regeneration on every render
  const particles = useState(() => 
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 2 + 2,
    }))
  )[0]

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = sessionStorage.getItem("hasVisited")
    
    if (hasVisited) {
      setIsLoading(false)
      return
    }

    // Calculated timing: 21 chars × 60ms = 1260ms typing
    // Timeline: Name(0.4s) -> Title appears(1.6s) -> Typing starts(1.75s) -> Typing ends(3.01s) -> Exit(3.2s)
    const timers = [
      setTimeout(() => setStep(1), 400),   // Show name at 0.4s
      setTimeout(() => setStep(2), 1400),  // Show title at 1.4s
      setTimeout(() => setStep(3), 2800),  // Show particles at 2.8s
      setTimeout(() => {
        setIsLoading(false)
        sessionStorage.setItem("hasVisited", "true")
      }, 3200) // Exit at 3.2s - right after typing completes
    ]

    return () => timers.forEach(timer => clearTimeout(timer))
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 0.96,
            filter: "blur(8px)"
          }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
        >
          {/* Animated mesh gradient background */}
          <div className="absolute inset-0">
            <motion.div
              animate={{
                background: [
                  "radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
                  "radial-gradient(circle at 50% 80%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            />
          </div>

          {/* Floating particles */}
          {step >= 3 && particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, particle.scale, 0],
                y: [0, -100],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              className="absolute w-1 h-1 rounded-full bg-primary"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
            />
          ))}

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center gap-6 px-4">
            {/* Glitch-style reveal for first name */}
            <div className="relative h-24 md:h-32 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={step >= 1 ? { opacity: 1 } : {}}
                className="relative"
              >
                {/* Main text */}
                <motion.h1
                  initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
                  animate={step >= 1 ? { 
                    opacity: 1, 
                    y: 0,
                    filter: "blur(0px)"
                  } : {}}
                  transition={{ 
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="text-4xl md:text-6xl font-bold"
                >
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    IMAD
                  </span>
                  <motion.span
                    initial={{ opacity: 0, x: -30 }}
                    animate={step >= 1 ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="ml-4 bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent"
                  >
                    EZ-ZAGHBA
                  </motion.span>
                </motion.h1>

                {/* Glitch layers */}
                {step >= 1 && (
                  <>
                    <motion.h1
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: [0, 0.7, 0],
                        x: [-2, 2, -2],
                      }}
                      transition={{
                        duration: 0.3,
                        times: [0, 0.5, 1],
                        delay: 0.2
                      }}
                      className="absolute inset-0 text-4xl md:text-6xl font-bold text-primary mix-blend-screen"
                      style={{ clipPath: "inset(0 0 50% 0)" }}
                    >
                      IMAD EZ-ZAGHBA
                    </motion.h1>
                    <motion.h1
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: [0, 0.7, 0],
                        x: [2, -2, 2],
                      }}
                      transition={{
                        duration: 0.3,
                        times: [0, 0.5, 1],
                        delay: 0.2
                      }}
                      className="absolute inset-0 text-4xl md:text-6xl font-bold text-accent mix-blend-screen"
                      style={{ clipPath: "inset(50% 0 0 0)" }}
                    >
                      IMAD EZ-ZAGHBA
                    </motion.h1>
                  </>
                )}
              </motion.div>
            </div>

            {/* Typewriter effect for title */}
            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="h-px w-8 bg-gradient-to-r from-transparent to-primary origin-left"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <TypeWriter text="FULL STACK DEVELOPER" delay={0.15} />
                  </motion.div>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="h-px w-8 bg-gradient-to-l from-transparent to-accent origin-right"
                  />
                </div>
              </motion.div>
            )}

            {/* Expanding circle reveal */}
            {step >= 3 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="mt-6"
              >
                <div className="relative w-16 h-16">
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "linear",
                      repeatType: "loop"
                    }}
                    className="absolute inset-0 rounded-full border-2 border-primary/30 will-change-transform"
                  />
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: -360 }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "linear",
                      repeatType: "loop"
                    }}
                    className="absolute inset-2 rounded-full border-2 border-accent/30 border-dashed will-change-transform"
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-4 rounded-full bg-gradient-to-r from-primary to-accent will-change-transform"
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Code-style corner decorations */}
          {step >= 1 && (
            <>
              <motion.div
                initial={{ opacity: 0, x: -30, y: -30 }}
                animate={{ opacity: 0.3, x: 0, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-8 left-8 text-primary/50 font-mono text-sm"
              >
                {"</>"}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30, y: 30 }}
                animate={{ opacity: 0.3, x: 0, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-8 right-8 text-accent/50 font-mono text-sm"
              >
                {"{ }"}
              </motion.div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Typewriter component - fast and snappy
function TypeWriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (started && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 60) // 60ms per character = 21 chars in 1260ms (readable, smooth)
      
      return () => clearTimeout(timeout)
    }
  }, [started, currentIndex, text])

  return (
    <span className="text-foreground text-lg md:text-xl">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-0.5 h-5 ml-1 bg-primary"
      />
    </span>
  )
}
