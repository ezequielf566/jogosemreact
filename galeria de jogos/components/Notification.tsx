
import React, { useEffect } from 'react';
import { Sparkles, Sun } from 'lucide-react';
import { GameElement } from '../types';
import ElementIcon from './ElementIcon';

interface NotificationProps {
  element: GameElement;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ element, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 6000);
    return () => clearTimeout(timer);
  }, [onClose]);

  // Cria um estilo de fundo dinâmico baseado na cor do elemento
  const dynamicBackground = {
    background: `linear-gradient(135deg, ${element.color}cc 0%, ${element.color} 100%)`,
  };

  const glowStyle = {
    boxShadow: `0 0 100px ${element.color}66`,
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-[200] p-4 transition-all duration-700 animate-in fade-in zoom-in"
      style={dynamicBackground}
    >
      {/* Brilhos e partículas de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(24)].map((_, i) => (
          <div 
            key={i} 
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: 0.2 + Math.random() * 0.3
            }}
          >
            <Sparkles size={Math.random() * 30 + 10} className="text-white" />
          </div>
        ))}
      </div>

      <div 
        className="relative bg-white/20 backdrop-blur-3xl border-4 border-white/50 rounded-[60px] p-10 flex flex-col items-center gap-8 max-w-sm text-center transform scale-100 animate-in slide-in-from-bottom-20 duration-700 shadow-2xl"
        style={glowStyle}
      >
        <div className="relative">
          {/* Aura de luz atrás do ícone */}
          <div className="absolute -inset-10 bg-white/40 rounded-full blur-[40px] animate-pulse"></div>
          
          <div 
            className="w-40 h-40 rounded-[50px] flex items-center justify-center shadow-2xl border-4 border-white relative z-10"
            style={{ backgroundColor: element.color }}
          >
            <div className="text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]">
              <ElementIcon element={element} size={100} />
            </div>
          </div>
          
          <div className="absolute -top-6 -right-6 bg-white p-4 rounded-full shadow-2xl animate-bounce">
            <Sparkles className="w-10 h-10 text-yellow-500" />
          </div>
        </div>

        <div className="text-white space-y-2">
          <p className="text-xs font-black tracking-[0.3em] uppercase opacity-80">Nova Descoberta</p>
          <h2 className="text-5xl font-black tracking-tight drop-shadow-md uppercase">
            {element.name}
          </h2>
          <div className="h-1.5 w-16 bg-white/40 mx-auto rounded-full mt-4" />
        </div>

        <button 
          onClick={onClose}
          className="group relative px-12 py-5 bg-white text-gray-900 text-2xl font-black rounded-[32px] transition-all hover:scale-105 active:scale-95 shadow-[0_10px_0_rgba(0,0,0,0.1)] hover:shadow-[0_5px_0_rgba(0,0,0,0.1)] hover:translate-y-1"
        >
          GLÓRIA!
        </button>
      </div>
    </div>
  );
};

export default Notification;
