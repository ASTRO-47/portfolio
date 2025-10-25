"use client";

import { Button } from "@/components/ui/button";
import { Download, ArrowDown, Code, Sparkles } from "lucide-react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useEffect, useState } from "react";
import FullStackSlider from "./skills_slider";
import CarouselGames from "./carousel";

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleViewWork = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      const offsetTop =
        projectsSection.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <div>

    <section
      id="home"
      className="mt-[95px] sm:mt-0 relative flex items-center justify-center overflow-hidden  pb-8"
      >
      <div className=" mt-25 container mx-auto flex max-w-7xl flex-col-reverse items-center gap-12 px-6 py-0 md:py-0 lg:flex-row lg:gap-24 relative z-10">
        {/* Text Content */}
        <div
          className={`flex-1 text-center lg:text-left transition-all duration-1000 ${
            isLoaded ? "animate-fade-in-up" : "opacity-0"
            }`}
            >
          <h1 className="mb-4 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Hi, I&apos;m{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-primary via-primary to-primary bg-clip-text text-transparent dark:from-primary dark:via-primary/80 dark:to-accent">
                Imad Ez-Zaghba
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 blur opacity-30 group-hover:opacity-50 transition duration-1000" />
            </span>
          </h1>

          <div className="mb-6 overflow-hidden">
            <h2 className="text-2xl font-semibold text-muted-foreground sm:text-3xl animate-slide-in-left animation-delay-200">
              <span className="inline-flex items-center gap-2">
                <Code className="h-6 w-6 text-primary" />
                Full Stack Developer
              </span>
            </h2>
          </div>

          <p className="mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground lg:leading-loose animate-fade-in animation-delay-400">
            I craft beautiful, responsive web experiences with modern
            technologies. Passionate about clean code, intuitive design, and
            creating digital solutions that make a difference.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start animate-fade-in-up animation-delay-600">
            <Button
              size="lg"
              onClick={handleViewWork}
              className="group relative overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group relative border-2 border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/25 dark:border-border/30 dark:bg-background/30 dark:hover:bg-primary/20"
              asChild
              >
              <a
                href="/imad-zaghba.pdf"
                download="Ez-Zaghba_fullstack.pdf"
                target="_blank"
                rel="noopener noreferrer"
                >
                <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                Download CV
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 lg:justify-start animate-fade-in-up animation-delay-700">
            {[
              { number: "20+", label: "Projects" },
              { number: "2+", label: "Years Experience" },
              { number: "15+", label: "Technologies" },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portrait */}
        <div
          className={`relative flex-shrink-0 transition-all duration-1000 delay-300 ${
            isLoaded ? "animate-scale-in" : "opacity-0"
            }`}
            >
          <div className="relative group">
            {/* Outer glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />

            {/* Main image container - Sharp Rectangle */}
            <div className="relative h-[400px] w-[320px] lg:h-[480px] lg:w-[384px] overflow-hidden border-4 border-primary/20 shadow-2xl">
              <Image
                src="/suit_pic.png"
                alt="Imad Ez-Zaghba"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
                />
              
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Corner accents */}
            <div className="absolute -top-2 -right-2 h-4 w-4 border-t-2 border-r-2 border-primary" />
            <div className="absolute -bottom-2 -left-2 h-4 w-4 border-b-2 border-l-2 border-accent" />
          </div>
        </div>
      </div>
    </section>
    <CarouselGames />
  </div>
  );
}
