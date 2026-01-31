
import React, { useState, useEffect, useRef } from 'react';
import { ALL_ELEMENTS, COMBINATIONS, INITIAL_ELEMENTS } from './constants';
import { WorkspaceElement, ElementId, GameElement } from './types';
import Workspace from './components/Workspace';
import Library from './components/Library';
import Header from './components/Header';
import Notification from './components/Notification';
import HintOverlay from './components/HintOverlay';
import MainMenu from './components/MainMenu';
import DiscoveriesGallery from './components/DiscoveriesGallery';
import GameMenu from './components/GameMenu';
import Tutorial from './components/Tutorial';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<'menu' | 'playing'>('menu');
  const [showGallery, setShowGallery] = useState(false);
  const [showGameMenu, setShowGameMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hasMerged, setHasMerged] = useState(() => {
    return localStorage.getItem('game_tutorial_done') === 'true';
  });

  const [discovered, setDiscovered] = useState<ElementId[]>(() => {
    try {
      const saved = localStorage.getItem('discovered_elements');
      if (saved && saved !== "undefined") {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return Array.from(new Set([...INITIAL_ELEMENTS, ...parsed]));
        }
      }
    } catch (e) { console.error(e); }
    return INITIAL_ELEMENTS;
  });
  
  const [workspaceElements, setWorkspaceElements] = useState<WorkspaceElement[]>([]);
  const [muted, setMuted] = useState(false);
  const [lastDiscovered, setLastDiscovered] = useState<GameElement | null>(null);
  const [activeHint, setActiveHint] = useState<{ input1: ElementId, input2: ElementId } | null>(null);
  const [combiningIds, setCombiningIds] = useState<string[]>([]);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('discovered_elements', JSON.stringify(discovered));
  }, [discovered]);

  const playSound = (type: 'pop' | 'merge' | 'discovery' | 'remove') => {
    if (muted) return;
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      const now = ctx.currentTime;

      if (type === 'pop') {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
        g.gain.setValueAtTime(0.05, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.connect(g); g.connect(ctx.destination);
        osc.start(); osc.stop(now + 0.1);
      } else if (type === 'merge') {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);
        g.gain.setValueAtTime(0.1, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(g); g.connect(ctx.destination);
        osc.start(); osc.stop(now + 0.3);
      } else if (type === 'discovery') {
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.frequency.setValueAtTime(freq, now + i * 0.1);
          g.gain.setValueAtTime(0.1, now + i * 0.1);
          g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.6);
          osc.connect(g); g.connect(ctx.destination);
          osc.start(now + i * 0.1); osc.stop(now + 1);
        });
      } else if (type === 'remove') {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.15);
        g.gain.setValueAtTime(0.05, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.connect(g); g.connect(ctx.destination);
        osc.start(); osc.stop(now + 0.2);
      }
    } catch (e) {}
  };

  const addToWorkspace = (elementId: ElementId) => {
    if (!workspaceRef.current) return;
    const rect = workspaceRef.current.getBoundingClientRect();
    const x = rect.width / 2 + (Math.random() * 60 - 30);
    const y = rect.height / 2 + (Math.random() * 60 - 30);
    const instanceId = `inst-${Date.now()}-${Math.random()}`;

    setWorkspaceElements(prev => [...prev, { instanceId, elementId, x, y }]);
    playSound('pop');
  };

  const handleCombine = (id1: string, id2: string, x: number, y: number) => {
    const el1 = workspaceElements.find(e => e.instanceId === id1);
    const el2 = workspaceElements.find(e => e.instanceId === id2);
    if (!el1 || !el2) return;
    
    const recipe = COMBINATIONS.find(c => 
      (c.inputs[0] === el1.elementId && c.inputs[1] === el2.elementId) ||
      (c.inputs[1] === el1.elementId && c.inputs[0] === el2.elementId)
    );

    if (recipe) {
      const outputId = recipe.output;
      setCombiningIds([id1, id2]);
      
      const isActuallyNew = !discovered.includes(outputId);
      playSound(isActuallyNew ? 'discovery' : 'merge');
      
      if (!hasMerged) {
        setHasMerged(true);
        localStorage.setItem('game_tutorial_done', 'true');
      }

      setTimeout(() => {
        setWorkspaceElements(prev => prev.filter(e => e.instanceId !== id1 && e.instanceId !== id2));
        
        setDiscovered(prev => {
          if (prev.includes(outputId)) return prev;
          setLastDiscovered(ALL_ELEMENTS[outputId]);
          return [...prev, outputId];
        });
        
        setWorkspaceElements(prev => [...prev, {
          instanceId: `inst-new-${Date.now()}`,
          elementId: outputId,
          x,
          y
        }]);
        setCombiningIds([]);
      }, 500);
    }
  };

  const clearWorkspace = () => {
    setWorkspaceElements([]);
    playSound('remove');
  };

  const handleFullReset = () => {
    localStorage.removeItem('discovered_elements');
    localStorage.removeItem('game_tutorial_done');
    setDiscovered([...INITIAL_ELEMENTS]);
    setWorkspaceElements([]);
    setHasMerged(false);
    setShowGameMenu(false);
    playSound('remove');
  };

  return (
    <div className={`flex flex-col h-screen w-screen overflow-hidden select-none transition-colors duration-1000 ${isDarkMode ? 'bg-indigo-950 text-white' : 'bg-[#FDFCF9] text-gray-900'}`}>
      {gameState === 'playing' && (
        <>
          <Header 
            count={discovered.length} total={Object.keys(ALL_ELEMENTS).length}
            isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            onOpenMenu={() => setShowGameMenu(true)}
            onClearWorkspace={clearWorkspace}
            onShowHint={() => {
              const possible = COMBINATIONS.filter(c => discovered.includes(c.inputs[0]) && discovered.includes(c.inputs[1]) && !discovered.includes(c.output));
              if (possible.length > 0) {
                const hint = possible[Math.floor(Math.random() * possible.length)];
                setActiveHint({ input1: hint.inputs[0], input2: hint.inputs[1] });
              }
            }}
          />
          <main className="flex-1 relative" ref={workspaceRef}>
            <Workspace 
              elements={workspaceElements} 
              isDarkMode={isDarkMode}
              combiningIds={combiningIds}
              onElementsUpdate={setWorkspaceElements}
              onCombine={handleCombine}
              onRemove={(id) => {
                setWorkspaceElements(prev => prev.filter(el => el.instanceId !== id));
                playSound('remove');
              }}
            />
            {!hasMerged && (
              <Tutorial 
                isDarkMode={isDarkMode} 
                workspaceElements={workspaceElements}
              />
            )}
          </main>
          <Library 
            discoveredIds={discovered} isDarkMode={isDarkMode}
            onElementClick={addToWorkspace} 
          />
        </>
      )}

      {gameState === 'menu' && (
        <MainMenu 
          onStart={() => setGameState('playing')} 
          onOpenGallery={() => setShowGallery(true)}
          discoveredCount={discovered.length} totalCount={Object.keys(ALL_ELEMENTS).length} 
        />
      )}

      {showGameMenu && (
        <GameMenu 
          muted={muted} onToggleMute={() => setMuted(!muted)}
          onClose={() => setShowGameMenu(false)} onOpenGallery={() => setShowGallery(true)}
          onReset={handleFullReset}
          onQuit={() => setGameState('menu')}
        />
      )}

      {showGallery && <DiscoveriesGallery discoveredIds={discovered} onClose={() => setShowGallery(false)} />}
      {lastDiscovered && <Notification element={lastDiscovered} onClose={() => setLastDiscovered(null)} />}
      {activeHint && <HintOverlay input1={activeHint.input1} input2={activeHint.input2} onClose={() => setActiveHint(null)} />}
    </div>
  );
};

export default App;
