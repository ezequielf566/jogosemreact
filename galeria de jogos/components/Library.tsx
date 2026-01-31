
import React from 'react';
import { ElementId } from '../types';
import { ALL_ELEMENTS } from '../constants';
import ElementIcon from './ElementIcon';

interface LibraryProps {
  discoveredIds: ElementId[];
  isDarkMode: boolean;
  onElementClick: (id: ElementId) => void;
}

const Library: React.FC<LibraryProps> = ({ discoveredIds, isDarkMode, onElementClick }) => {
  // Garantia de unicidade e ordenação
  // Explicitly typing variables to avoid 'unknown' type errors during indexing
  const uniqueIds: ElementId[] = Array.from(new Set(discoveredIds));
  const sortedIds: ElementId[] = [...uniqueIds].sort((a: ElementId, b: ElementId) => {
    // Fix: Explicitly typed 'a' and 'b' as ElementId (string) to allow indexing ALL_ELEMENTS
    return ALL_ELEMENTS[a].name.localeCompare(ALL_ELEMENTS[b].name);
  });

  return (
    <section className={`transition-colors duration-700 px-2 pt-4 pb-12 sm:pb-6 z-40 border-t ${isDarkMode ? 'bg-indigo-950 border-indigo-800 shadow-[0_-15px_40px_rgba(0,0,0,0.5)]' : 'bg-white border-gray-100 shadow-[0_-15px_40px_rgba(0,0,0,0.08)]'}`}>
      <div className="flex gap-4 overflow-x-auto pb-4 pt-1 px-4 scrollbar-hide snap-x scroll-smooth">
        {sortedIds.map((id: ElementId) => {
          // Fix: Explicitly typed 'id' as ElementId (string) to allow indexing ALL_ELEMENTS
          const element = ALL_ELEMENTS[id];
          return (
            <button
              key={id}
              onClick={() => onElementClick(id)}
              className="flex-shrink-0 flex flex-col items-center gap-2 group snap-center active:scale-90 transition-all touch-manipulation"
            >
              <div 
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-[28px] flex items-center justify-center shadow-lg transition-all border-4 group-hover:animate-jiggle
                  ${isDarkMode ? 'border-indigo-800 bg-indigo-900/50' : 'border-gray-50 bg-gray-50'}`}
                style={{ 
                  backgroundColor: isDarkMode ? `${element.color}30` : `${element.color}20`,
                  borderColor: `${element.color}50`
                }}
              >
                <div style={{ color: element.color }} className="drop-shadow-md group-hover:scale-110 transition-transform">
                  <ElementIcon element={element} size={40} />
                </div>
              </div>
              <span className={`text-[10px] sm:text-[11px] font-black uppercase tracking-widest ${isDarkMode ? 'text-indigo-200' : 'text-gray-600'}`}>
                {element.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default Library;
