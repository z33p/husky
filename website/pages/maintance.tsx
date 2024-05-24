import React, { useEffect, useRef, useState } from 'react';

export default function Maintenance() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-10 bg-white rounded shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">We will be back soon!</h1>
        <p className="text-gray-600 mb-4">Sorry for the inconvenience but we are performing some maintenance at the moment.</p>
        <div className="flex items-center justify-center mt-6">
          <Eye />
        </div>
      </div>
    </div>
  );
};

const Eye: React.FC = () => {
  const eyeRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (eyeRef.current) {
        const rect = eyeRef.current.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;
        const angle = Math.atan2(event.clientY - eyeY, event.clientX - eyeX);
        const newX = Math.cos(angle) * 5;
        const newY = Math.sin(angle) * 5;
        setPosition({ x: newX, y: newY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="">
      <div className="relative w-32 h-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full border-8 border-gray-800 flex items-center justify-center shadow-lg hover:scale-0 hover:shadow-2xl transition-all">
        <div className="absolute w-24 h-24 bg-gradient-to-r from-white to-gray-100 rounded-full border-4 border-gray-800 flex items-center justify-center shadow-md">
          <div
            ref={eyeRef}
            className="absolute bg-gray-800 w-10 h-10 rounded-full hover:scale-105 hover:shadow-2xl transition-all duration-100 ease-in-out"
            style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
