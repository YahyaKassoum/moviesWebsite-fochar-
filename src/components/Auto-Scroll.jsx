import React, { useEffect, useRef, useState } from "react";
import useFetchMovies from "../hooks/useFetchMovies";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Card from "./Card";

const AutoScrollSection = ({ title, endpoint }) => {
  const { data: items, loading } = useFetchMovies(endpoint);
  const scrollContainerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || items.length === 0) return;

    let animationFrameId;
    let scrollPosition = 0;
    const scrollSpeed = 1; // Adjust for smoother scrolling
    const containerWidth = scrollContainer.offsetWidth;
    const scrollWidth = scrollContainer.scrollWidth;

    const autoScroll = () => {
      if (!isPaused) {
        scrollPosition += scrollSpeed;
        
        // Reset or bounce back logic
        if (scrollPosition >= scrollWidth - containerWidth) {
          scrollPosition = 0;
        }
        
        scrollContainer.scrollLeft = scrollPosition;
      }
      
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [items, isPaused]);

  const scroll = (direction) => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollLeft += direction === 'left' 
        ? -scrollContainer.offsetWidth / 2 
        : scrollContainer.offsetWidth / 2;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">{title}</h2>
      
      {/* Scroll Navigation */}
      <button 
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 
        bg-black/50 hover:bg-black/70 rounded-full p-2 
        opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <ChevronLeft className="text-white" />
      </button>
      
      <button 
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 
        bg-black/50 hover:bg-black/70 rounded-full p-2 
        opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <ChevronRight className="text-white" />
      </button>

      {/* Scroll Container */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-4 px-8 py-4 
        scroll-smooth scrollbar-hide"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex space-x-4">
          {items.map((item) => (
            <div 
              key={item.id} 
              className=" flex-shrink-0 transform transition-transform duration-300 
              hover:scale-105 hover:z-10"
            >
              <Card isScroll={true} item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutoScrollSection;