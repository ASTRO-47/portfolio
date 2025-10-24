import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { SplashScreen } from "@/components/splash-screen"
import "./globals.css"

export const metadata: Metadata = {
  title: "Imad Ez-Zaghba",
  description: "full-stack Developer specializing in nodejs, React, Next.js, and modern web technologies. Creating beautiful, responsive web experiences.",
  generator: "v0.app",
  keywords: ["Frontend Developer", "imad zaghba"," full statck", "React", "Next.js", "TypeScript", "Web Development", "Portfolio"],
  authors: [{ name: "Imad Ez-Zaghba" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <SplashScreen />
          <Suspense fallback={null}>
            {children}
            <Analytics />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
