
import React from 'react';
import { X, Play, BookOpen, Volume2, VolumeX, RotateCcw, Home } from 'lucide-react';

interface GameMenuProps {
  muted: boolean;
  onToggleMute: () => void;
  onClose: () => void;
  onOpenGallery: () => void;
  onReset: () => void;
  onQuit: () => void;
}

const GameMenu: React.FC<GameMenuProps> = ({ 
  muted, onToggleMute, onClose, onOpenGallery, onReset, onQuit 
}) => {
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-indigo-950/80 backdrop-blur-md animate-in fade-in duration-300 gpu-layer">
      <div className="bg-white w-full max-w-sm rounded-[48px] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        <div className="p-8 space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-black text-indigo-900 tracking-tight">Menu</h2>
            <button onClick={onClose} className="p-2 bg-gray-100 rounded-full text-gray-500 hover:text-gray-900 transition-colors">
              <X size={24} />
            </button>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-4 bg-indigo-600 text-white rounded-3xl font-black text-xl flex items-center justify-center gap-3 shadow-[0_6px_0_rgb(49,46,129)] active:translate-y-1 active:shadow-none transition-all"
          >
            <Play size={24} fill="currentColor" />
            CONTINUAR
          </button>

          <button 
            onClick={onOpenGallery}
            className="w-full py-4 bg-yellow-400 text-yellow-950 rounded-3xl font-black text-xl flex items-center justify-center gap-3 shadow-[0_6px_0_rgb(180,130,0)] active:translate-y-1 active:shadow-none transition-all"
          >
            <BookOpen size={24} />
            LIVRO DE SEGREDOS
          </button>

          <button 
            onClick={onToggleMute}
            className="w-full py-4 bg-indigo-50 text-indigo-600 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-indigo-100 transition-colors"
          >
            {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            {muted ? "SOM DESATIVADO" : "SOM ATIVADO"}
          </button>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <button 
              onClick={onReset}
              className="py-4 bg-rose-50 text-rose-600 rounded-2xl font-bold flex flex-col items-center gap-1 hover:bg-rose-100 transition-colors active:scale-95 transition-transform"
            >
              <RotateCcw size={24} />
              REINICIAR TUDO
            </button>
            <button 
              onClick={onQuit}
              className="py-4 bg-gray-50 text-gray-600 rounded-2xl font-bold flex flex-col items-center gap-1 hover:bg-gray-100 transition-colors"
            >
              <Home size={24} />
              SAIR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameMenu;
