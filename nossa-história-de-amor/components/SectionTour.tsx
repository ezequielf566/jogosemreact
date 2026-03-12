import React from 'react';
import { motion } from 'framer-motion';

const SectionTour: React.FC = () => {
  return (
    <section className="min-h-screen w-full bg-black relative overflow-hidden flex flex-col items-center justify-center py-20">
      
      {/* Background Lights / Stage Effect */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-rose-500/50 to-transparent blur-sm transform -rotate-12" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/50 to-transparent blur-sm transform rotate-12" />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-80" />

      {/* Floating Particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full blur-[1px]"
          initial={{ y: "100vh", opacity: 0, x: Math.random() * 100 }}
          animate={{ y: "-10vh", opacity: [0, 1, 0] }}
          transition={{ 
            duration: 5 + Math.random() * 5, 
            repeat: Infinity, 
            delay: Math.random() * 5,
            ease: "linear"
          }}
          style={{ left: `${Math.random() * 100}%` }}
        />
      ))}

      <div className="z-10 text-center px-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <h2 className="text-4xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-white mb-8 tracking-wide">
            NOSSA TURNÊ
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed mb-12"
        >
          Cada momento foi um <span className="text-rose-400 font-serif italic">show inesquecível</span>.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-zinc-400 font-light"
        >
          Cada dia, uma nova canção escrita a dois.
          <br/>
          E a plateia somos nós mesmos, aplaudindo nossa felicidade.
        </motion.p>
      </div>

    </section>
  );
};

export default SectionTour;
