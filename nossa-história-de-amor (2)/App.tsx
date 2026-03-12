import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionMusic from './components/SectionMusic';
import SectionTour from './components/SectionTour';
import SectionStories from './components/SectionStories';
import SectionCounter from './components/SectionCounter';
import SectionRoulette from './components/SectionRoulette';
import SectionOfficialStart from './components/SectionOfficialStart';
import { MUSIC_URL } from './constants';
import { Volume2, VolumeX, Heart, Mail, Sparkles } from 'lucide-react';

// Floating Hearts Component
const FloatingHearts = () => {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 100 + Math.random() * 20,
      size: 10 + Math.random() * 25,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 transform-gpu">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '110%', x: `${heart.x}%`, opacity: 0 }}
          animate={{ y: '-10%', opacity: [0, 0.3, 0.3, 0] }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear"
          }}
          className="absolute text-rose-500/20 will-change-transform"
          style={{ fontSize: heart.size }}
        >
          <Heart fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
};

// Starry Background Component
const StarryBackground = () => {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      duration: 3 + Math.random() * 4,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 transform-gpu">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bg-white rounded-full will-change-opacity"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            boxShadow: '0 0 5px white'
          }}
        />
      ))}
    </div>
  );
};

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("User interaction required", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleUnlock = () => {
    setIsOpening(true);
    // Start music automatically on unlock if possible
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log("Music auto-play blocked", e));
    }
    setTimeout(() => {
      setIsUnlocked(true);
    }, 1500);
  };

  // Ensure audio loops and is persistent
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }
  }, []);

  return (
    <main className="w-full relative bg-zinc-950 text-white overflow-hidden">
      {/* Hidden Global Audio */}
      <audio ref={audioRef} src={MUSIC_URL} />

      {/* Global Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-950/40 via-purple-950/20 to-zinc-950 z-0 pointer-events-none" />
      <StarryBackground />
      <FloatingHearts />

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="envelope-gate"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[1000] bg-zinc-950 flex items-center justify-center p-6 overflow-hidden"
          >
            {/* Background Stars/Hearts for the gate */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-900/20 via-zinc-950 to-zinc-950" />
            
            <motion.div
              animate={{ 
                y: isOpening ? -1000 : [0, -10, 0],
                rotate: isOpening ? 10 : 0,
                scale: isOpening ? 0.8 : 1
              }}
              transition={{ 
                y: { duration: isOpening ? 1 : 3, repeat: isOpening ? 0 : Infinity, ease: "easeInOut" },
                default: { duration: 0.5 }
              }}
              className="relative cursor-pointer group"
              onClick={handleUnlock}
            >
              {/* Glow Effect */}
              <div className="absolute -inset-8 bg-rose-500/20 blur-3xl rounded-full group-hover:bg-rose-500/30 transition-colors" />
              
              {/* Envelope Body */}
              <div className="relative w-72 h-48 md:w-96 md:h-64 bg-[#fdfbf7] rounded-lg shadow-2xl flex items-center justify-center border-2 border-rose-100 overflow-hidden">
                {/* Envelope Flap (SVG) */}
                <svg 
                  className="absolute top-0 left-0 w-full h-full pointer-events-none" 
                  viewBox="0 0 100 100" 
                  preserveAspectRatio="none"
                >
                  <path 
                    d="M 0 0 L 50 50 L 100 0 Z" 
                    fill="#f9f7f0" 
                    stroke="#ffe4e6" 
                    strokeWidth="0.5"
                  />
                </svg>
                
                <div className="z-10 flex flex-col items-center gap-4">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Mail size={64} className="text-rose-500 md:w-20 md:h-20" />
                  </motion.div>
                  <div className="text-center">
                    <p className="text-zinc-800 font-serif text-xl md:text-2xl italic">Uma surpresa para você...</p>
                    <p className="text-rose-400 font-bold text-xs uppercase tracking-widest mt-2 animate-pulse">Toque para abrir</p>
                  </div>
                </div>

                {/* Decorative Hearts */}
                <Heart className="absolute top-4 left-4 text-rose-200" size={24} />
                <Heart className="absolute bottom-4 right-4 text-rose-200" size={24} />
                <Sparkles className="absolute top-4 right-4 text-rose-200" size={24} />
              </div>
            </motion.div>

            {/* Floating particles */}
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 100 }}
                animate={{ 
                  opacity: [0, 0.5, 0],
                  y: -500,
                  x: Math.random() * 400 - 200
                }}
                transition={{ 
                  duration: 4 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
                className="absolute bottom-0 text-rose-500/30"
              >
                <Heart size={16 + Math.random() * 20} fill="currentColor" />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="main-app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full"
          >
            {/* Persistent Floating Volume Control */}
            <div className="fixed top-6 right-6 z-50 mix-blend-difference">
               <button onClick={togglePlay} className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors">
                  {isPlaying ? <Volume2 className="text-white w-5 h-5" /> : <VolumeX className="text-white w-5 h-5" />}
               </button>
            </div>

            {/* Sections */}
            <div className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth no-scrollbar overscroll-y-contain">
                
                <div className="snap-start snap-always h-[100dvh] w-full">
                  <SectionMusic isPlaying={isPlaying} togglePlay={togglePlay} audioRef={audioRef} />
                </div>
                
                <div className="snap-start snap-always h-[100dvh] w-full">
                  <SectionTour />
                </div>
                
                <div className="snap-start snap-always h-[100dvh] w-full">
                  <SectionStories />
                </div>

                <div className="snap-start snap-always h-[100dvh] w-full">
                  <SectionCounter />
                </div>

                <div className="snap-start snap-always h-[100dvh] w-full">
                  <SectionRoulette />
                </div>

                <div className="snap-start snap-always h-[100dvh] w-full">
                  <SectionOfficialStart />
                </div>

                {/* Footer */}
                <div className="snap-end snap-always bg-slate-950 py-8 text-center text-rose-900/30 text-xs">
                  <p>Feito com amor ❤️</p>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;