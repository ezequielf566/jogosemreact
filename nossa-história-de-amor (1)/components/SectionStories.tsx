import React, { useRef, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { STORIES } from '../constants';

// Subcomponente para gerenciar o vídeo de forma robusta
const StoryVideo = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Força o mudo para garantir o autoplay
      videoRef.current.muted = true;
      videoRef.current.play().catch(error => {
        console.log("Autoplay preventivo acionado ou falhou:", error);
      });
    }
  }, [src]);

  return (
    <video 
      ref={videoRef}
      src={src} 
      className="absolute inset-0 w-full h-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      webkit-playsinline="true"
      preload="auto"
    />
  );
};

const SectionStories: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });
  
  return (
    <section className="min-h-screen bg-zinc-950 py-16 flex flex-col justify-center">
      <div className="px-6 mb-8">
        <h3 className="text-2xl font-serif text-white mb-2">Memórias</h3>
        <p className="text-zinc-400 text-sm">Arraste para relembrar →</p>
      </div>

      {/* Progress Indicator for the Carousel */}
      <div className="px-6 mb-6">
         <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
             <motion.div 
               className="h-full bg-rose-500" 
               style={{ scaleX: scrollXProgress, transformOrigin: "0%" }}
             />
         </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-8 no-scrollbar touch-pan-x"
        style={{ scrollBehavior: 'smooth' }}
      >
        {STORIES.map((story) => (
          <div 
            key={story.id} 
            className="flex-shrink-0 w-[85vw] md:w-[350px] snap-center snap-always relative rounded-xl overflow-hidden aspect-[9/16] shadow-xl border border-zinc-800 bg-zinc-900"
          >
            {story.type === 'video' ? (
              <StoryVideo src={story.image} />
            ) : (
              <img 
                src={story.image} 
                alt={story.date} 
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
            
            {/* Top Date Indicator */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                <span className="text-xs font-bold text-white/90 bg-black/30 px-2 py-1 rounded-full backdrop-blur-md">
                    {story.date}
                </span>
            </div>

            {/* Bottom Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <p className="text-white text-lg font-medium leading-snug drop-shadow-md">
                {story.caption}
              </p>
            </div>
          </div>
        ))}
        
        {/* End Spacer */}
        <div className="flex-shrink-0 w-4" />
      </div>
    </section>
  );
};

export default SectionStories;