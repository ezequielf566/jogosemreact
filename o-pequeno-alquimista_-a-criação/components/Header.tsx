
import React from 'react';
import { Sun, Moon, Menu, Lightbulb, Trash2 } from 'lucide-react';

interface HeaderProps {
  count: number;
  total: number;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenMenu: () => void;
  onShowHint: () => void;
  onClearWorkspace: () => void;
}

const Header: React.FC<HeaderProps> = ({ count, total, isDarkMode, onToggleDarkMode, onOpenMenu, onShowHint, onClearWorkspace }) => {
  return (
    <header className={`px-4 py-3 grid grid-cols-3 items-center z-40 border-b transition-colors duration-700 gpu-layer ${isDarkMode ? 'bg-indigo-900/40 border-indigo-800' : 'bg-white/80 border-gray-100'}`}>
      {/* Coluna Esquerda */}
      <div className="flex justify-start items-center gap-2">
        <button 
          onClick={onToggleDarkMode}
          className={`p-2 rounded-2xl transition-all active:scale-90 shadow-sm ${isDarkMode ? 'bg-indigo-800 text-yellow-300' : 'bg-yellow-50 text-yellow-600'}`}
        >
          {isDarkMode ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
        </button>
        <button 
          onClick={onClearWorkspace}
          title="Limpar mesa"
          className={`p-2 rounded-2xl transition-all active:scale-90 ${isDarkMode ? 'text-indigo-300 hover:bg-indigo-800' : 'text-gray-400 hover:bg-gray-100'}`}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Coluna Central - Título Centralizado */}
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className={`text-sm sm:text-lg font-black leading-tight tracking-tighter whitespace-nowrap ${isDarkMode ? 'text-indigo-100' : 'text-gray-800'}`}>
          A CRIAÇÃO
        </h1>
        <div className="flex items-center gap-2 mt-0.5 w-full justify-center">
          <div className="h-1.5 w-12 sm:w-20 bg-gray-200/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-400 transition-all duration-700" 
              style={{ width: `${(count/total)*100}%` }}
            />
          </div>
          <p className={`text-[9px] font-black tracking-widest ${isDarkMode ? 'text-indigo-400' : 'text-gray-400'}`}>
            {count}/{total}
          </p>
        </div>
      </div>

      {/* Coluna Direita */}
      <div className="flex items-center justify-end gap-1">
        <button 
          onClick={onShowHint}
          className={`p-2 rounded-2xl transition-all active:scale-90 ${isDarkMode ? 'text-yellow-400 hover:bg-indigo-800' : 'text-amber-500 hover:bg-amber-50'}`}
        >
          <Lightbulb className="w-6 h-6" />
        </button>
        <button 
          onClick={onOpenMenu}
          className={`p-2 rounded-2xl transition-all active:scale-90 ${isDarkMode ? 'text-indigo-100 hover:bg-indigo-800' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
