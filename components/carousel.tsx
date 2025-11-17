'use client'
import React from 'react';
// @ts-ignore - package "exports" prevent TS from resolving bundled types; suppress this import error
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/dist/css/splide.min.css";
import { scale } from 'framer-motion';
import { bg } from 'date-fns/locale';

// Define the style for the images in the carousel
const imageStyle = {
    width: '48px',
    height: '48px',
};

interface Technology {
  name: string;
  icon: string;
  color: string;
}

function CarouselGames() {
    const technologies: Technology[] = [
    { name: 'React', icon: '/icons/reactjs.svg', color: 'from-cyan-500 to-blue-500' },
    { name: 'Next.js', icon: '/icons/nextjs.svg', color: 'from-gray-800 to-gray-900' },
    { name: 'TypeScript', icon: '/icons/typescript.svg', color: 'from-blue-600 to-blue-700' },
    { name: 'MongoDB', icon: '/icons/mongodb.svg', color: 'from-green-500 to-green-600' },
    { name: 'PostgreSQL', icon: '/icons/postgresql.svg', color: 'from-blue-500 to-blue-600' },
    { name: 'AWS', icon: '/icons/aws.svg', color: 'from-orange-500 to-orange-600' },
    { name: 'Azure', icon: '/icons/azure.svg', color: 'from-blue-400 to-blue-600' },
    { name: 'Tailwind', icon: '/icons/tailwindcss.svg', color: 'from-cyan-400 to-blue-500' },
    // { name: 'GitHub', icon: '/icons/github-dark.svg', color: 'from-gray-700 to-gray-900' },
    { name: 'Postman', icon: '/icons/postman.svg', color: 'from-orange-500 to-orange-600' },
    { name: 'Vite', icon: '/icons/vitejs.svg', color: 'from-purple-500 to-yellow-500' },
    { name: 'Notion', icon: '/icons/notion.svg', color: 'from-gray-600 to-gray-800' },
    { name: 'C', icon: '/icons/c.svg', color: 'from-blue-500 to-blue-700' },
    { name: 'CSS3', icon: '/icons/css3.svg', color: 'from-blue-400 to-blue-600' },
  ];
    return (
        <div className="relative flex  bg-transparent">
            <div className="container max-w-screen-xl mx-auto relative z-20 overflow-x-hidden">
                <Splide
                    options={{
                        type: "loop", // Loop back to the beginning when reaching the end
                        autoScroll: {
                            pauseOnHover: false, // Do not pause scrolling when hovering over the carousel
                            pauseOnFocus: false, // Do not pause scrolling when the carousel is focused
                            rewind: true, // Rewind to start when the end is reached
                            speed: 1 // Scrolling speed
                        },
                        arrows: false, // Hide navigation arrows
                        pagination: false, // Hide pagination dots
                        fixedWidth: '44px', // Fixed width for each slide
                        gap: '40px', // Gap between slides
                    }}
                    extensions={{ AutoScroll }} // Use the AutoScroll extension
                >
                    {technologies.map((icon) =>{
                    return <SplideSlide>
                        <img src={icon.icon} alt={icon.name} className='wi-48 h-30
                        hover:scale-120 duration-300
                        
                        ' />
                    </SplideSlide>
                    })}
                </Splide>
            </div>
        </div>
    );
}

export default CarouselGames;