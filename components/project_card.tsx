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

interface ProjectProps {
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  category: string;
  year: string;
  status: string;
  github: string;
  demo: string;
  featured: boolean;
  stats: {
    stars: number;
    views: string | number;
  };
  highlights: string[];
  challenges: string;
  role: string;
  onCardClick?: () => void;
  index?: number;
  isVisible?: boolean;
}
export function ThreeDCardDemo({
  title,
  description,
  longDescription,
  image,
  tags,
  category,
  year,
  status,
  github,
  demo,
  featured,
  stats,
  highlights,
  challenges,
  role,
  onCardClick,
  index = 0,
  isVisible = true,
}: ProjectProps) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <>
      <div
        key={title}
        onMouseEnter={() => setHoveredProject(title)}
        onMouseLeave={() => setHoveredProject(null)}
        onClick={onCardClick}
        className={`transition-all duration-700  ${isVisible ? `animate-scale-in animation-delay-${(index + 1) * 150}` : "opacity-0"
          }`}
      >
        <CardContainer className="inter-var">
          <CardBody className={`bg-card/50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-[#3768F0] border-2 border-border/50 dark:hover:border-[#3768F0] dark:border-white/[0.2] border-blue/[0.1] w-auto sm:w-[25rem] h-auto rounded-xl p-5 border cursor-pointer ${featured ? 'ring-1 ring-primary/20' : ''
            }`}>

            {/* Featured & Status Badges */}


            <CardItem translateZ="100" className="w-full">
              <img
                src={image}
                height="1000"
                width="1000"
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt={title}
              />
            </CardItem>
            <CardContent className="p-4 space-y-3">
              {/* Project header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300 truncate">
                    {title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {year}
                    </span>
                    <span>•</span>
                    <span>{category}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {stats.stars}
                  </span>
                </div>
              </div>

              {/* Description - limited to 2 lines */}
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {description}
              </p>

              {/* Tech Stack - limited tags */}
              <div className="flex flex-wrap gap-1.5">
                {tags.slice(0, 4).map((tag: string) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs font-medium"
                  >
                    {tag}
                  </Badge>
                ))}
                {tags.length > 4 && (
                  <Badge variant="secondary" className="text-xs font-medium">
                    +{tags.length - 4}
                  </Badge>
                )}
              </div>
            </CardContent>
          </CardBody>
        </CardContainer>
      </div>
    </>
  );
}