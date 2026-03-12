import React, { useEffect, useState } from 'react';
import { CountdownTime } from '../types';
import { SPECIAL_DATE, BACKGROUND_VIDEO } from '../constants';
import { motion } from 'framer-motion';

const SectionCounter: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isFuture, setIsFuture] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(SPECIAL_DATE).getTime();
      const now = new Date().getTime();
      
      // Determine if we are counting down to a future date or counting up from a past date
      let diff = target - now;
      let future = true;

      if (diff < 0) {
        diff = now - target;
        future = false;
      }
      
      setIsFuture(future);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-2 md:mx-6 z-10">
      <motion.div 
        key={value}
        initial={{ y: -5, opacity: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl md:text-7xl font-light text-white font-serif drop-shadow-lg"
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <span className="text-xs md:text-sm uppercase tracking-widest text-white/90 mt-2 drop-shadow-md font-semibold">{label}</span>
    </div>
  );

  // Formatting the date for display
  const dateObj = new Date(SPECIAL_DATE);
  const formattedDate = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).format(dateObj);

  return (
    <section className="min-h-screen w-full relative flex flex-col items-center justify-center py-20 px-6 overflow-hidden">
      
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video 
          className="w-full h-full object-cover"
          src={BACKGROUND_VIDEO}
          autoPlay 
          loop 
          muted 
          playsInline
        />
        {/* Subtle Overlay to make text readable but keep video highlighted */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Optional: Gradient at the bottom to make bottom text clearer */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center max-w-lg z-10 relative"
      >
        <h2 className="text-2xl md:text-4xl font-serif text-white mb-2 drop-shadow-md">
          {isFuture ? "Esperando por..." : "Nosso maior presente chegou..."}
        </h2>
        <p className="text-white/80 mb-12 text-sm md:text-base font-medium drop-shadow-md uppercase tracking-wide">
          {formattedDate}
        </p>

        <div className="flex justify-center items-center flex-wrap mb-20">
          <TimeUnit value={timeLeft.days} label="Dias" />
          <span className="text-3xl text-white/50 font-serif mt-[-2rem]">:</span>
          <TimeUnit value={timeLeft.hours} label="Horas" />
          <span className="text-3xl text-white/50 font-serif mt-[-2rem]">:</span>
          <TimeUnit value={timeLeft.minutes} label="Min" />
          <span className="text-3xl text-white/50 font-serif mt-[-2rem]">:</span>
          <TimeUnit value={timeLeft.seconds} label="Seg" />
        </div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative p-6 md:p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 mx-4"
        >
            <p className="text-white font-serif italic text-lg md:text-xl leading-relaxed drop-shadow-sm">
            “O amor ganhou forma, nome e um sorriso que ilumina nossos dias.”
            </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SectionCounter;