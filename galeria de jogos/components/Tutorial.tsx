
import React from 'react';
import { Sparkles, MousePointer2, ArrowDown } from 'lucide-react';
import { WorkspaceElement } from '../types';
import { ALL_ELEMENTS } from '../constants';
import ElementIcon from './ElementIcon';

interface TutorialProps {
  isDarkMode: boolean;
  workspaceElements: WorkspaceElement[];
}

const Tutorial: React.FC<TutorialProps> = ({ isDarkMode, workspaceElements }) => {
  const hasTerra = workspaceElements.some(el => el.elementId === 'terra');
  const hasAgua = workspaceElements.some(el => el.elementId === 'agua');

  let step: 1 | 2 | 3 = 1;
  if (!hasTerra) step = 1;
  else if (!hasAgua) step = 2;
  else step = 3;

  const renderTargetIcon = (id: string) => {
    const el = ALL_ELEMENTS[id];
    return (
      <div 
        className="w-16 h-16 rounded-2xl flex items-center justify-center border-4 border-white shadow-lg mx-auto mb-4 animate-pulse"
        style={{ backgroundColor: el.color }}
      >
        <div className="text-white">
          <ElementIcon element={el} size={32} />
        </div>
      </div>
    );
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
      <div className={`relative p-8 rounded-[40px] max-w-sm text-center shadow-2xl animate-in fade-in zoom-in duration-500 border-4 ${
        isDarkMode 
          ? 'bg-indigo-900/95 text-indigo-50 border-indigo-700' 
          : 'bg-white/95 text-gray-800 border-amber-200 shadow-amber-200/20'
      }`}>
        {step === 1 && (
          <>
            {renderTargetIcon('terra')}
            <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">Vamos Criar!</h3>
            <p className="text-lg font-medium leading-tight opacity-90">
              Deus criou o mundo! Vamos começar?<br/>
              Clique na <span className="text-amber-600 font-black">TERRA</span> lá embaixo para trazê-la para cá.
            </p>
            <div className="mt-6 flex flex-col items-center">
              <ArrowDown className="w-8 h-8 text-amber-500 animate-bounce" />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            {renderTargetIcon('agua')}
            <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">Muito Bem!</h3>
            <p className="text-lg font-medium leading-tight opacity-90">
              Agora precisamos de frescor!<br/>
              Clique na <span className="text-blue-500 font-black">ÁGUA</span> lá embaixo.
            </p>
            <div className="mt-6 flex flex-col items-center">
              <ArrowDown className="w-8 h-8 text-blue-500 animate-bounce" />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-600 flex items-center justify-center shadow-md">
                <ElementIcon element={ALL_ELEMENTS['terra']} size={24} />
              </div>
              <span className="text-xl font-black">+</span>
              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center shadow-md">
                <ElementIcon element={ALL_ELEMENTS['agua']} size={24} />
              </div>
            </div>
            <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">Mágica da Fé!</h3>
            <p className="text-lg font-medium leading-tight opacity-90">
              Agora, arraste a Água sobre a Terra para criar o <span className="text-amber-800 font-black">BARRO</span>!
            </p>
            <div className="relative mt-8 h-20">
              <div className="absolute left-1/2 -translate-x-1/2 animate-[drag-demo_2s_infinite]">
                <MousePointer2 className={`w-10 h-10 rotate-[-15deg] ${isDarkMode ? 'text-white' : 'text-indigo-600'}`} />
              </div>
            </div>
          </>
        )}

        {/* Efeito de brilho de fundo para o balão */}
        <div className="absolute -z-10 -inset-4 bg-amber-400/20 blur-2xl rounded-full animate-pulse" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes drag-demo {
          0% { transform: translate(-50%, 0px) scale(1); opacity: 0; }
          20% { opacity: 1; }
          80% { transform: translate(-50%, -40px) scale(0.9); opacity: 1; }
          100% { transform: translate(-50%, -50px) scale(0.8); opacity: 0; }
        }
      `}} />
    </div>
  );
};

export default Tutorial;
