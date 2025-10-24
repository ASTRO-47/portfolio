import React, { useRef, useState, useEffect } from 'react';

interface Technology {
  name: string;
  icon: string;
  color: string;
}

const FullStackSlider: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(true);

  const technologies: Technology[] = [
    { name: 'React', icon: '/icons/reactjs.svg', color: 'from-cyan-500 to-blue-500' },
    { name: 'Next.js', icon: '/icons/nextjs.svg', color: 'from-gray-800 to-gray-900' },
    { name: 'TypeScript', icon: '/icons/typescript.svg', color: 'from-blue-600 to-blue-700' },
    { name: 'MongoDB', icon: '/icons/mongodb.svg', color: 'from-green-500 to-green-600' },
    { name: 'PostgreSQL', icon: '/icons/postgresql.svg', color: 'from-blue-500 to-blue-600' },
    { name: 'AWS', icon: '/icons/aws.svg', color: 'from-orange-500 to-orange-600' },
    { name: 'Azure', icon: '/icons/azure.svg', color: 'from-blue-400 to-blue-600' },
    { name: 'Tailwind', icon: '/icons/tailwindcss.svg', color: 'from-cyan-400 to-blue-500' },
    { name: 'GitHub', icon: '/icons/github-dark.svg', color: 'from-gray-700 to-gray-900' },
    { name: 'Postman', icon: '/icons/postman.svg', color: 'from-orange-500 to-orange-600' },
    { name: 'Vite', icon: '/icons/vitejs.svg', color: 'from-purple-500 to-yellow-500' },
    { name: 'Notion', icon: '/icons/notion.svg', color: 'from-gray-600 to-gray-800' },
    { name: 'C', icon: '/icons/c.svg', color: 'from-blue-500 to-blue-700' },
    { name: 'CSS3', icon: '/icons/css3.svg', color: 'from-blue-400 to-blue-600' },
  ];

  // Triple for seamless loop
  const multipliedTechs: Technology[] = [...technologies, ...technologies, ...technologies];

  // Auto-scroll effect
  useEffect(() => {
    if (!isAutoScrolling || !scrollRef.current) return;

    const scrollContainer = scrollRef.current;
    let animationId: number;
    const scrollSpeed = 1; // pixels per frame
    
    const autoScroll = (): void => {
      if (!scrollContainer) return;
      
      const maxScroll = scrollContainer.scrollWidth;
      const sectionWidth = maxScroll / 3;
      
      // Smoothly scroll
      scrollContainer.scrollLeft += scrollSpeed;
      
      // Reset position when reaching the end of the second section
      // This creates the infinite loop effect
      if (scrollContainer.scrollLeft >= sectionWidth * 2) {
        scrollContainer.scrollLeft = sectionWidth;
      }

      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isAutoScrolling]);

  // Initialize scroll position to middle section
  useEffect(() => {
    if (scrollRef.current) {
      const sectionWidth = scrollRef.current.scrollWidth / 3;
      scrollRef.current.scrollLeft = sectionWidth;
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setIsAutoScrolling(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseUp = (): void => {
    setIsDragging(false);
    setTimeout(() => setIsAutoScrolling(true), 2000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleWheel = (): void => {
    setIsAutoScrolling(false);
    setTimeout(() => setIsAutoScrolling(true), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-8">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Full Stack Technologies</h1>
          <p className="text-gray-400 text-lg">Modern tools for building scalable applications</p>
        </div>

        <div className="relative">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onWheel={handleWheel}
          >
            {multipliedTechs.map((tech, index) => (
              <div
                key={`${tech.name}-${index}`}
                className="flex-shrink-0 mx-4 group"
              >
                <div className={`
                  relative w-40 h-40 rounded-2xl bg-gradient-to-br ${tech.color}
                  flex flex-col items-center justify-center
                  shadow-xl hover:shadow-2xl
                  transform transition-all duration-300
                  hover:scale-110 hover:-translate-y-2
                  select-none
                `}>
                  <img 
                    src={tech.icon} 
                    alt={`${tech.name} logo`}
                    className="w-16 h-16 mb-3 object-contain group-hover:scale-125 transition-transform duration-300"
                  />
                  <div className="text-white font-semibold text-lg">
                    {tech.name}
                  </div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }

          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </div>
  );
};

export default FullStackSlider;