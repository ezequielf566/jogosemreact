import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BOOK_PAGES, PAGE_FLIP_AUDIO } from '../constants';
import { ArrowLeft, ArrowRight, Sparkles, Loader2 } from 'lucide-react';

// Subcomponente para tratar o carregamento da imagem
const BookImage = ({ src }: { src: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-[85%] shadow-lg -rotate-1 p-2 bg-white border border-gray-100 transform-gpu transition-transform duration-500 hover:rotate-0">
      
      {/* Loader State: Mostra enquanto a imagem não carrega */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-amber-50 z-10 transition-opacity duration-300">
           <Loader2 className="w-8 h-8 text-amber-400 animate-spin mb-2" />
           <span className="text-xs text-amber-900/40 font-serif">Carregando memória...</span>
        </div>
      )}

      {/* A imagem real */}
      <img 
        src={src} 
        alt="Movie Scene" 
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`} 
      />
      
      {/* Corner Tape Effect - Sempre visível para manter a estrutura visual */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-amber-100/50 rotate-2 backdrop-blur-sm shadow-sm z-20" />
    </div>
  );
};

const SectionBook: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isDesktop, setIsDesktop] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const itemsPerPage = isDesktop ? 2 : 1;
  const totalViews = Math.ceil(BOOK_PAGES.length / itemsPerPage);

  useEffect(() => {
    audioRef.current = new Audio(PAGE_FLIP_AUDIO);
    audioRef.current.volume = 0.4;
  }, []);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  const nextPage = () => {
    if (currentIndex < totalViews - 1) {
      setDirection(1);
      playSound();
      setCurrentIndex(curr => curr + 1);
    }
  };

  const prevPage = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      playSound();
      setCurrentIndex(curr => curr - 1);
    }
  };

  const currentPages = BOOK_PAGES.slice(
      currentIndex * itemsPerPage, 
      (currentIndex * itemsPerPage) + itemsPerPage
  );

  const variants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.95,
      z: -50,
    }),
    center: {
      zIndex: 1,
      rotateY: 0,
      opacity: 1,
      scale: 1,
      z: 0,
      transition: {
        duration: 0.6,
        ease: "circOut",
      },
    },
    exit: (direction: number) => ({
      zIndex: 0,
      rotateY: direction > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.95,
      z: -50,
      transition: {
        duration: 0.4,
        ease: "easeIn",
      },
    }),
  };

  return (
    <section className="min-h-screen w-full bg-[#fdfbf7] flex flex-col items-center justify-center py-20 px-4 overflow-hidden transform-gpu">
      
      {/* Removido motion.div de entrada para evitar lag no scroll */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-serif text-amber-900 mb-2">Nosso Desenho Animado</h2>
        <p className="text-amber-900/40 text-sm">Cenas da nossa história favorita</p>
      </div>

      {/* Container do Livro */}
      <div className="relative w-full max-w-5xl aspect-[3/4] md:aspect-[3/2] flex items-center justify-center perspective-1000">
        
        <div 
            className="relative w-full h-full bg-[#fdfbf7] shadow-2xl rounded-sm border border-amber-900/10 flex overflow-hidden backface-hidden"
            style={{ perspective: '2000px' }}
        >
            
            <AnimatePresence mode='popLayout' custom={direction} initial={false}>
                <motion.div 
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 w-full h-full flex flex-col md:flex-row bg-[#fffefc] origin-center shadow-md transform-gpu"
                >
                    {/* Spine Effect Center (Desktop only) */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-12 bg-gradient-to-r from-black/5 via-black/10 to-black/5 z-20 -translate-x-1/2 blur-sm pointer-events-none" />

                    {currentPages.map((page) => {
                        const isText = page.content.type === 'text';
                        let movieTitle = '';
                        let bodyText = page.content.value;
                        
                        if (isText && page.content.value.includes('\n\n')) {
                            const parts = page.content.value.split('\n\n');
                            movieTitle = parts[0];
                            bodyText = parts.slice(1).join('\n\n');
                        }

                        return (
                        <div key={page.id} className="flex-1 relative h-full p-6 md:p-12 flex flex-col items-center justify-center border-r border-amber-900/5 last:border-0 overflow-hidden bg-[#fffefc]">
                            {/* Textura de Papel */}
                            <div className="absolute inset-0 bg-amber-50/30 pointer-events-none" />
                            
                            {/* Sombra Interna */}
                            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />

                            {page.content.type === 'image' ? (
                                <BookImage src={page.content.value} />
                            ) : (
                                <div className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center">
                                    <Sparkles className="w-6 h-6 text-amber-500 mb-6 opacity-50" />
                                    
                                    {movieTitle && (
                                        <h3 className="font-sans text-amber-900/50 text-xs font-bold uppercase tracking-[0.2em] mb-6 border-b border-amber-900/10 pb-2">
                                            {movieTitle}
                                        </h3>
                                    )}

                                    <div className="font-serif text-amber-950 italic leading-relaxed whitespace-pre-wrap">
                                        {bodyText.split('\n').map((line, idx) => {
                                            if (line.includes(':')) {
                                                const [name, speech] = line.split(':');
                                                return (
                                                    <p key={idx} className="mb-4 text-xl md:text-2xl">
                                                        <span className="font-bold not-italic text-amber-900/70 text-base md:text-lg block mb-1">{name}:</span>
                                                        "{speech.replace(/"/g, '')}"
                                                    </p>
                                                )
                                            }
                                            if (line.trim().startsWith('(')) {
                                                return <p key={idx} className="text-base md:text-lg text-amber-900/60 mt-4 not-italic">{line}</p>
                                            }
                                            return <p key={idx} className="mb-4 text-xl md:text-2xl">{line}</p>
                                        })}
                                    </div>
                                    
                                    <div className="mt-6 text-amber-900/20 text-xl">~</div>
                                </div>
                            )}
                            
                            <div className="absolute bottom-4 text-[10px] text-amber-900/20 font-serif">
                                {page.id}
                            </div>
                        </div>
                    )})}
                    
                    {isDesktop && currentPages.length === 1 && (
                         <div className="flex-1 h-full bg-[#fffefc] relative">
                             <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />
                         </div>
                    )}

                </motion.div>
            </AnimatePresence>

        </div>

        <button 
            onClick={prevPage}
            disabled={currentIndex === 0}
            className={`absolute z-30 left-2 md:-left-16 p-4 rounded-full bg-amber-50 shadow-xl text-amber-900 transition-all border border-amber-900/10 active:scale-95 ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110 opacity-100 hover:bg-white'}`}
        >
            <ArrowLeft size={24} />
        </button>

        <button 
            onClick={nextPage}
            disabled={currentIndex === totalViews - 1}
            className={`absolute z-30 right-2 md:-right-16 p-4 rounded-full bg-amber-50 shadow-xl text-amber-900 transition-all border border-amber-900/10 active:scale-95 ${currentIndex === totalViews - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110 opacity-100 hover:bg-white'}`}
        >
            <ArrowRight size={24} />
        </button>
      </div>

    </section>
  );
};

export default SectionBook;