
import React from 'react';
import { X, BookOpen } from 'lucide-react';
import { ElementId, ElementCategory } from '../types';
import { ALL_ELEMENTS } from '../constants';
import ElementIcon from './ElementIcon';

interface DiscoveriesGalleryProps {
  discoveredIds: ElementId[];
  onClose: () => void;
}

const DiscoveriesGallery: React.FC<DiscoveriesGalleryProps> = ({ discoveredIds, onClose }) => {
  const categories: ElementCategory[] = ['natureza', 'agua', 'clima', 'vida', 'humano', 'sagrado'];
  
  const grouped = categories.reduce((acc, cat) => {
    const items = discoveredIds.filter(id => ALL_ELEMENTS[id].category === cat);
    if (items.length > 0) acc[cat] = items;
    return acc;
  }, {} as Record<string, ElementId[]>);

  const categoryNames: Record<string, string> = {
    natureza: '🌱 Natureza',
    agua: '💧 Águas',
    clima: '☁️ Céus e Clima',
    vida: '🐾 Seres Vivos',
    humano: '👨‍👩‍👧 Humanidade',
    sagrado: '✨ Fé e Igreja'
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300 gpu-layer">
      <div className="bg-[#FFFBF5] w-full max-w-5xl h-full max-h-[92vh] rounded-[50px] overflow-hidden flex flex-col shadow-2xl border-4 border-amber-200 animate-in zoom-in-95 duration-500">
        
        <div className="p-8 bg-amber-500 text-white flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-6">
            <div className="bg-white/20 p-3 rounded-3xl">
              <BookOpen size={40} />
            </div>
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter">Livro da Criação</h2>
              <p className="text-sm font-black opacity-80 uppercase tracking-widest">{discoveredIds.length} Segredos Descobertos</p>
            </div>
          </div>
          <button onClick={onClose} className="p-4 bg-white/10 hover:bg-white/20 rounded-full transition-all active:scale-90">
            <X size={32} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-12 scrollbar-hide">
          {categories.map(cat => {
            const items = grouped[cat];
            if (!items) return null;
            return (
              <div key={cat} className="space-y-6">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-black text-amber-900 uppercase tracking-widest">{categoryNames[cat]}</h3>
                  <div className="flex-1 h-0.5 bg-amber-100 rounded-full" />
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4">
                  {items.map(id => (
                    <div key={id} className="group bg-white p-4 rounded-[32px] flex flex-col items-center gap-3 shadow-sm border-2 border-transparent hover:border-amber-400 transition-all hover:-translate-y-1">
                      <div className="w-12 h-12 flex items-center justify-center transition-transform group-hover:scale-110" style={{ color: ALL_ELEMENTS[id].color }}>
                        <ElementIcon element={ALL_ELEMENTS[id]} size={40} />
                      </div>
                      <span className="text-[10px] font-black uppercase text-gray-400 text-center tracking-tighter line-clamp-1">{ALL_ELEMENTS[id].name}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DiscoveriesGallery;
