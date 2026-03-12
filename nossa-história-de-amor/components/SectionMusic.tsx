import React, { useEffect, useState } from 'react';
import { Play, Pause, Heart, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { SONG_DETAILS } from '../constants';

interface Props {
  isPlaying: boolean;
  togglePlay: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const SectionMusic: React.FC<Props> = ({ isPlaying, togglePlay, audioRef }) => {
  const [progress, setProgress] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    
    // Listeners para estado de carregamento
    const handleWaiting = () => setIsBuffering(true);
    const handlePlaying = () => setIsBuffering(false);
    const handleCanPlay = () => setIsBuffering(false);
    
    if (audio) {
      audio.addEventListener('waiting', handleWaiting);
      audio.addEventListener('playing', handlePlaying);
      audio.addEventListener('canplay', handleCanPlay);
    }

    const updateProgress = () => {
      if (audio) {
        const current = audio.currentTime;
        const duration = audio.duration || 100;
        setProgress((current / duration) * 100);
      }
    };

    const interval = setInterval(updateProgress, 1000);
    
    return () => {
      clearInterval(interval);
      if (audio) {
        audio.removeEventListener('waiting', handleWaiting);
        audio.removeEventListener('playing', handlePlaying);
        audio.removeEventListener('canplay', handleCanPlay);
      }
    };
  }, [audioRef]);

  // Determina o texto de status
  const getStatusText = () => {
    if (!isPlaying) return "Pausado";
    return isBuffering ? "Carregando música..." : "Tocando...";
  };

  return (
    <section className="h-screen w-full relative flex flex-col justify-end pb-12 px-6 overflow-hidden bg-gradient-to-b from-rose-900/40 to-black">
      {/* Background Ambience */}
      <div className="absolute inset-0 -z-10">
         <img 
            src={SONG_DETAILS.cover} 
            alt="Blur BG" 
            className="w-full h-full object-cover opacity-30 blur-3xl scale-125"
         />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-md mx-auto"
      >
        {/* Album Art - Clean, no overlay button */}
        <div className="w-full aspect-square bg-zinc-800 rounded-lg shadow-2xl mb-8 overflow-hidden relative group border border-white/10">
          <img 
            src={SONG_DETAILS.cover} 
            alt="Album Cover" 
            className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105' : 'scale-100'}`} 
          />
        </div>

        {/* Title & Info - Restored Original Layout */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1 tracking-wider">{SONG_DETAILS.title}</h1>
            <p className="text-zinc-400 text-sm">{SONG_DETAILS.artist}</p>
          </div>
          <Heart className="text-green-500 w-6 h-6 fill-green-500 animate-pulse" />
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-zinc-600 rounded-full mb-2 overflow-hidden">
          <motion.div 
            className="h-full bg-white rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Status Line */}
        <div className="flex justify-between text-xs text-zinc-400 mb-6">
          <span className="animate-pulse">{getStatusText()}</span>
          <span>∞</span>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-8 mb-8">
           <Share2 className="text-zinc-400 w-6 h-6" />
           <button 
             onClick={togglePlay}
             className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
           >
             {isPlaying ? (
               <Pause className="text-black w-8 h-8 fill-black" />
             ) : (
               <Play className="text-black w-8 h-8 fill-black ml-1" />
             )}
           </button>
           <div className="w-6" /> {/* Spacer for symmetry */}
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="text-center text-rose-100 italic text-lg md:text-xl font-serif leading-relaxed drop-shadow-md px-2"
        >
          “Deus foi muito bom quando cruzou o meu caminho com o seu.”
        </motion.p>
        
        <div className="absolute bottom-2 left-0 w-full flex justify-center opacity-50 animate-bounce">
            <span className="text-xs">Role para ver mais</span>
        </div>
      </motion.div>
    </section>
  );
};

export default SectionMusic;