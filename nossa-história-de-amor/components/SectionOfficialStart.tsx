import React, { useEffect, useState } from 'react';
import { OFFICIAL_START_DATE } from '../constants';
import { motion } from 'framer-motion';
import { Heart, Clock } from 'lucide-react';

interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const SectionOfficialStart: React.FC = () => {
  const [timeElapsed, setTimeElapsed] = useState<TimeElapsed>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(OFFICIAL_START_DATE).getTime();
      const now = new Date().getTime();
      const diff = now - start;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeElapsed({ days, hours, minutes, seconds });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-3 md:mx-8 group cursor-default">
      <motion.div 
        key={value}
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl md:text-8xl font-thin text-rose-100 font-serif drop-shadow-[0_0_15px_rgba(251,113,133,0.3)]"
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <span className="text-[10px] md:text-sm uppercase tracking-[0.3em] text-rose-300/60 mt-4 font-sans">{label}</span>
    </div>
  );

  return (
    <section className="min-h-screen w-full relative flex flex-col items-center justify-center py-20 px-6 overflow-hidden bg-gradient-to-br from-slate-950 via-rose-950 to-slate-950">
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-rose-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center z-10 relative"
      >
        <div className="flex justify-center mb-6">
            <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <Heart className="w-8 h-8 md:w-12 md:h-12 text-rose-500 fill-rose-500 drop-shadow-lg" />
            </motion.div>
        </div>

        <h2 className="text-xl md:text-3xl font-serif text-white/90 mb-2 tracking-wide">
          Nossa História Oficial
        </h2>
        
        <div className="flex items-center justify-center gap-2 text-rose-200/50 mb-16 text-xs md:text-sm uppercase tracking-widest">
            <Clock className="w-3 h-3 md:w-4 md:h-4" />
            <span>Desde 5 de Março</span>
        </div>

        <div className="flex justify-center items-start flex-wrap">
          <TimeUnit value={timeElapsed.days} label="Dias" />
          <div className="h-16 md:h-24 w-px bg-rose-500/20 mx-2 self-center hidden md:block" />
          <TimeUnit value={timeElapsed.hours} label="Horas" />
          <div className="h-16 md:h-24 w-px bg-rose-500/20 mx-2 self-center hidden md:block" />
          <TimeUnit value={timeElapsed.minutes} label="Minutos" />
          <div className="h-16 md:h-24 w-px bg-rose-500/20 mx-2 self-center hidden md:block" />
          <TimeUnit value={timeElapsed.seconds} label="Segundos" />
        </div>

        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.5 }}
            className="mt-20 max-w-lg mx-auto px-4"
        >
            <p className="text-rose-100/60 font-serif italic text-base md:text-lg leading-relaxed">
            "Não contaria os segundos se cada um deles não valesse uma vida inteira ao seu lado."
            </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SectionOfficialStart;