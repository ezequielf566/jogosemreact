
import React from 'react';
import { X, Sparkles, HelpCircle, Search } from 'lucide-react';
import { ElementId } from '../types';
import { ALL_ELEMENTS } from '../constants';
import ElementIcon from './ElementIcon';

interface HintOverlayProps {
  input1: ElementId;
  input2: ElementId;
  onClose: () => void;
}

const HintOverlay: React.FC<HintOverlayProps> = ({ input1, input2, onClose }) => {
  const el1 = ALL_ELEMENTS[input1];
  const el2 = ALL_ELEMENTS[input2];

  const getRiddle = () => {
    const cat = el2.category;
    if (cat === 'agua') return "algo que flui e refresca...";
    // Fix: Corrected category comparison from 'fogo' to 'clima' as 'fogo' is not a valid ElementCategory
    if (cat === 'clima') return "algo que vem dos céus ou do ar...";
    if (cat === 'vida') return "algo que tem o sopro da vida...";
    // Fix: Corrected category comparison from 'cosmico' to 'sagrado'
    if (cat === 'sagrado') return "algo que brilha com a luz divina...";
    // Fix: Corrected category comparison from 'civilizacao' to 'humano'
    if (cat === 'humano') return "algo que nasce da alma ou do trabalho humano...";
    return "um segredo oculto na natureza...";
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-indigo-950/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative bg-[#FFFBF0] w-full max-w-md rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 border-yellow-300 transform animate-in zoom-in-95 duration-500">
        
        <div className="bg-gradient-to-r from-yellow-200 to-amber-100 p-6 flex items-center justify-between border-b-2 border-yellow-200/50">
          <div className="flex items-center gap-3 text-amber-800">
            <div className="bg-white p-2 rounded-full shadow-inner">
              <Sparkles className="w-6 h-6 animate-pulse text-yellow-500" />
            </div>
            <h3 className="text-2xl font-black tracking-tight">Dica Divina</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/50 rounded-full text-amber-900 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 flex flex-col items-center text-center gap-8">
          <div className="bg-white/80 p-5 rounded-3xl border-2 border-dashed border-amber-200 shadow-inner">
            <p className="text-lg font-bold text-amber-900 leading-relaxed">
              "Para esta criação, combine <span className="text-indigo-600 font-black underline decoration-indigo-200 decoration-4 underline-offset-4">2 ELEMENTOS</span>: pegue a <span className="text-indigo-600">{el1.name}</span> e junte com..."
            </p>
            <p className="mt-2 text-indigo-700 font-medium italic">
              "...{getRiddle()}"
            </p>
          </div>

          <div className="flex items-center justify-center gap-6 w-full py-4">
            <div className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 rounded-[32px] flex items-center justify-center shadow-xl border-4 border-white" style={{ backgroundColor: el1.color }}>
                <div className="text-white drop-shadow-md">
                  <ElementIcon element={el1} size={56} />
                </div>
              </div>
              <span className="text-sm font-black text-amber-800 uppercase tracking-widest">{el1.name}</span>
            </div>

            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
              <span className="text-2xl font-black">+</span>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="relative w-24 h-24 bg-gray-800 rounded-[32px] flex items-center justify-center shadow-2xl border-4 border-gray-700 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite]"></div>
                <HelpCircle className="w-12 h-12 text-gray-500 animate-pulse" />
              </div>
              <span className="text-sm font-black text-gray-400 uppercase tracking-widest">Mistério</span>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-5 bg-gradient-to-b from-yellow-400 to-amber-500 text-amber-950 font-black text-xl rounded-3xl transition-all shadow-[0_8px_0_rgb(180,130,0)] active:translate-y-[4px] active:shadow-none flex items-center justify-center gap-3"
          >
            <Search className="w-6 h-6" />
            ENTENDI!
          </button>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `@keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }`}} />
      </div>
    </div>
  );
};

export default HintOverlay;
