
import React, { useState, useRef, useEffect } from 'react';
import { WorkspaceElement, ElementId } from '../types';
import { ALL_ELEMENTS } from '../constants';
import ElementIcon from './ElementIcon';
import { Star } from 'lucide-react';

interface Particle {
  id: string;
  x: number;
  y: number;
  color: string;
  size: number;
  type: 'star' | 'circle';
}

interface WorkspaceProps {
  elements: WorkspaceElement[];
  isDarkMode: boolean;
  combiningIds: string[];
  onElementsUpdate: (elements: WorkspaceElement[]) => void;
  onCombine: (id1: string, id2: string, x: number, y: number) => void;
  onRemove: (instanceId: string) => void;
}

const Workspace: React.FC<WorkspaceProps> = ({ 
  elements, isDarkMode, combiningIds, onElementsUpdate, onCombine, onRemove 
}) => {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [potentialTarget, setPotentialTarget] = useState<string | null>(null);
  const [landingRing, setLandingRing] = useState<{ x: number, y: number, color: string } | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    instanceId: string;
    startX: number;
    startY: number;
    elementX: number;
    elementY: number;
    domNode: HTMLDivElement | null;
  } | null>(null);

  const COMBINE_THRESHOLD = 90;

  const startDragging = (instanceId: string, e: React.PointerEvent) => {
    const el = elements.find(item => item.instanceId === instanceId);
    if (!el || !containerRef.current) return;

    // Capturar o elemento DOM diretamente para manipulação rápida
    const domNode = e.currentTarget.parentElement as HTMLDivElement;
    
    dragRef.current = {
      instanceId,
      startX: e.clientX,
      startY: e.clientY,
      elementX: el.x,
      elementY: el.y,
      domNode
    };

    setDraggingId(instanceId);
    domNode.style.zIndex = "100";
    domNode.style.willChange = "transform";
    
    // Captura o ponteiro para garantir que o movimento continue mesmo fora do elemento
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current || !dragRef.current.domNode) return;

    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    
    const newX = dragRef.current.elementX + dx;
    const newY = dragRef.current.elementY + dy;

    // Atualização direta de CSS (GPU) - Ignora o ciclo do React para máxima velocidade
    dragRef.current.domNode.style.transform = `translate3d(${newX - 40}px, ${newY - 40}px, 0) scale(1.1)`;

    // Verificação de colisão mais leve (apenas a cada movimento detectado pelo navegador)
    const other = elements.find(el => 
      el.instanceId !== dragRef.current?.instanceId &&
      !combiningIds.includes(el.instanceId) &&
      Math.abs(el.x - newX) < COMBINE_THRESHOLD &&
      Math.abs(el.y - newY) < COMBINE_THRESHOLD
    );

    if (other?.instanceId !== potentialTarget) {
      setPotentialTarget(other ? other.instanceId : null);
    }

    // Partículas ocasionais para economia de bateria
    if (Math.random() > 0.85) {
      const draggedEl = elements.find(el => el.instanceId === dragRef.current?.instanceId);
      if (draggedEl) {
        const newParticle: Particle = {
          id: Math.random().toString(),
          x: newX,
          y: newY,
          color: ALL_ELEMENTS[draggedEl.elementId].color,
          size: 8 + Math.random() * 8,
          type: Math.random() > 0.5 ? 'star' : 'circle'
        };
        setParticles(prev => [...prev.slice(-8), newParticle]);
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragRef.current) return;

    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    const finalX = dragRef.current.elementX + dx;
    const finalY = dragRef.current.elementY + dy;

    if (dragRef.current.domNode) {
      dragRef.current.domNode.style.willChange = "auto";
    }

    // Sincroniza com o React apenas no final do arraste
    const updatedElements = elements.map(el => 
      el.instanceId === dragRef.current?.instanceId ? { ...el, x: finalX, y: finalY } : el
    );
    
    onElementsUpdate(updatedElements);

    if (potentialTarget) {
      const targetEl = elements.find(e => e.instanceId === potentialTarget);
      if (targetEl) {
        onCombine(dragRef.current.instanceId, targetEl.instanceId, (finalX + targetEl.x) / 2, (finalY + targetEl.y) / 2);
      }
    } else {
      setLandingRing({ x: finalX, y: finalY, color: ALL_ELEMENTS[elements.find(el => el.instanceId === dragRef.current?.instanceId)!.elementId].color });
      setTimeout(() => setLandingRing(null), 500);
    }

    setDraggingId(null);
    setPotentialTarget(null);
    dragRef.current = null;
  };

  useEffect(() => {
    if (particles.length > 0) {
      const timer = setTimeout(() => {
        setParticles(prev => prev.slice(1));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [particles]);

  return (
    <div 
      ref={containerRef}
      className={`w-full h-full relative overflow-hidden touch-none
      ${isDarkMode ? 'bg-indigo-950 bg-[radial-gradient(#ffffff05_1px,transparent_1px)]' : 'bg-[#FDFCF9] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)]'} [background-size:60px_60px]`}
    >
      {landingRing && (
        <div 
          className="absolute animate-landing rounded-full border-4 pointer-events-none z-0"
          style={{ 
            left: landingRing.x - 40, top: landingRing.y - 40, 
            width: 80, height: 80, borderColor: landingRing.color 
          }}
        />
      )}

      {particles.map(p => (
        <div
          key={p.id}
          className="absolute pointer-events-none animate-particle z-10"
          style={{ 
            left: p.x - p.size/2, 
            top: p.y - p.size/2,
            color: p.color,
          }}
        >
          {p.type === 'star' ? <Star size={p.size} fill="currentColor" /> : <div className="rounded-full bg-current" style={{ width: p.size, height: p.size }} />}
        </div>
      ))}

      {elements.map((item) => {
        const element = ALL_ELEMENTS[item.elementId];
        const isDragging = draggingId === item.instanceId;
        const isTarget = potentialTarget === item.instanceId;
        const isCombining = combiningIds.includes(item.instanceId);
        
        return (
          <div
            key={item.instanceId}
            className="absolute transition-transform duration-300 ease-out"
            style={{ 
              transform: `translate3d(${item.x - 40}px, ${item.y - 40}px, 0)`,
              zIndex: isDragging ? 100 : 20,
              // Importante: Não usamos animação de transição enquanto arrastamos
              transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div 
              onPointerDown={(e) => startDragging(item.instanceId, e)}
              onPointerMove={isDragging ? handlePointerMove : undefined}
              onPointerUp={isDragging ? handlePointerUp : undefined}
              onDoubleClick={() => onRemove(item.instanceId)}
              className={`flex flex-col items-center gap-1 cursor-grab active:cursor-grabbing
              ${isDragging ? 'scale-110 drop-shadow-2xl' : 'scale-100 animate-float'} 
              ${isTarget ? 'animate-jiggle' : ''}
              ${isCombining ? 'animate-merge' : 'animate-element-pop'}`}
            >
              <div 
                className={`w-20 h-20 rounded-[32px] flex items-center justify-center border-4 border-white shadow-lg relative overflow-hidden transition-all
                  ${isTarget ? 'border-yellow-400 scale-110' : 'border-white'}`}
                style={{ backgroundColor: element.color }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-white/20 to-white/0 opacity-60"></div>
                <div className="text-white drop-shadow-lg relative z-10">
                  <ElementIcon element={element} size={44} />
                </div>
              </div>
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] mt-2 px-3 py-1 rounded-full shadow-md border transition-all pointer-events-none
                ${isTarget ? 'bg-yellow-400 text-yellow-900 border-yellow-200' : 
                  isDarkMode ? 'bg-indigo-900 text-white border-white/10' : 'bg-white text-gray-700 border-gray-100'}`}>
                {element.name}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Workspace;
