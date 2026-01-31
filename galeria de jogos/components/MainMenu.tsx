
import React from 'react';
import { Play, Sparkles, BookOpen } from 'lucide-react';
import { INITIAL_ELEMENTS } from '../constants';

interface MainMenuProps {
  onStart: () => void;
  onOpenGallery: () => void;
  discoveredCount: number;
  totalCount: number;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStart, onOpenGallery, discoveredCount, totalCount }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      {/* Background Decorativo */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-10 left-10 animate-bounce delay-100"><Sparkles size={48} color="white" /></div>
        <div className="absolute bottom-20 right-20 animate-bounce delay-700"><Sparkles size={64} color="white" /></div>
        <div className="absolute top-1/2 left-1/4 animate-pulse"><div className="w-20 h-20 bg-white/20 rounded-full" /></div>
        <div className="absolute bottom-1/3 right-1/4 animate-pulse delay-500"><div className="w-32 h-32 bg-yellow-200/20 rounded-full" /></div>
      </div>

      <div className="relative w-full max-w-lg p-8 flex flex-col items-center text-center animate-in fade-in zoom-in duration-700">
        <div className="bg-white/10 backdrop-blur-xl border-4 border-white/30 rounded-[60px] p-10 shadow-2xl flex flex-col items-center gap-8 w-full">
          
          <div className="relative">
            <div className="absolute -inset-4 bg-yellow-400/30 blur-2xl animate-pulse rounded-full" />
            <div className="relative bg-white p-6 rounded-full shadow-xl">
              <Sparkles className="w-16 h-16 text-yellow-500 animate-spin-slow" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl font-black text-white tracking-tighter drop-shadow-lg leading-none">
              O PEQUENO<br />ALQUIMISTA
            </h1>
            <p className="text-white/80 text-lg font-medium italic">
              "Combine os segredos da natureza"
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <button 
              onClick={onStart}
              className="group relative px-12 py-5 bg-yellow-400 hover:bg-yellow-300 text-yellow-950 font-black text-2xl rounded-[32px] transition-all shadow-[0_10px_0_rgb(180,130,0)] hover:shadow-[0_6px_0_rgb(180,130,0)] hover:translate-y-[4px] active:translate-y-[8px] active:shadow-none flex items-center justify-center gap-4"
            >
              <Play size={28} fill="currentColor" />
              {discoveredCount > INITIAL_ELEMENTS.length ? "CONTINUAR" : "INICIAR"}
            </button>

            <button 
              onClick={onOpenGallery}
              className="px-8 py-4 bg-white/20 hover:bg-white/30 text-white font-bold text-lg rounded-[28px] transition-all border border-white/30 flex items-center justify-center gap-3"
            >
              <BookOpen size={24} />
              LIVRO DE SEGREDOS
            </button>
          </div>

          <div className="text-white/50 text-xs font-bold uppercase tracking-widest">
            {discoveredCount} / {totalCount} DESCOBERTAS
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}} />
    </div>
  );
};

export default MainMenu;
