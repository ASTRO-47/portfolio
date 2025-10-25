'use client'
import React from 'react';

interface Technology {
  name: string;
  icon: string;
  color: string;
}

const FullStackSlider: React.FC = () => {
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

  // Double the array for seamless loop
  const multipliedTechs: Technology[] = [...technologies, ...technologies];

  return (
    <div className="bg-transparent flex items-center justify-center py-0">
      <div className="w-full max-w-6xl">
        <div className="relative overflow-hidden">
          <div className="flex py-6">
            <div className="flex animate-scroll">
              {multipliedTechs.map((tech, index) => (
                <div
                  key={`${tech.name}-${index}`}
                  className="flex-shrink-0 mx-4 group"
                >
                  <div className="relative transform transition-all duration-300 hover:scale-110 select-none">
                    <img 
                      src={tech.icon} 
                      alt={`${tech.name} logo`}
                      className="w-12 h-12 mb-3"
                      draggable={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-scroll {
            animation: scroll 5s linear infinite;
            will-change: transform;
          }
        `}</style>
      </div>
    </div>
  );
};

export default FullStackSlider;``