import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Utensils, Film, Pizza, Tv, TreePine, ChefHat, Gamepad2, Gift, 
  Music, PartyPopper, Beer, Ticket, Map, Tent, Camera, Heart, Coffee, 
  Moon, Star, Palmtree, Ghost, Brush, Mic2, Settings2, X, Save, RotateCcw,
  ChevronDown, ChevronUp
} from 'lucide-react';

interface RouletteOption {
  id: number;
  text: string;
  icon: any;
  color: string;
}

interface Theme {
  id: string;
  name: string;
  options: RouletteOption[];
}

const THEMES: Theme[] = [
  {
    id: 'default',
    name: 'Clássico',
    options: [
      { id: 1, text: 'Jantar Fora', icon: Utensils, color: '#f43f5e' },
      { id: 2, text: 'Cinema', icon: Film, color: '#a855f7' },
      { id: 3, text: 'Pedir Lanche', icon: Pizza, color: '#f59e0b' },
      { id: 4, text: 'Série em Casa', icon: Tv, color: '#3b82f6' },
      { id: 5, text: 'Passeio no Parque', icon: TreePine, color: '#10b981' },
      { id: 6, text: 'Cozinhar Juntos', icon: ChefHat, color: '#f97316' },
      { id: 7, text: 'Noite de Jogos', icon: Gamepad2, color: '#6366f1' },
      { id: 8, text: 'Surpresa!', icon: Gift, color: '#ec4899' },
    ]
  },
  {
    id: 'rolezeiro',
    name: 'Casal Rolezeiro',
    options: [
      { id: 1, text: 'Show / Concerto', icon: Music, color: '#f43f5e' },
      { id: 2, text: 'Balada / Festa', icon: PartyPopper, color: '#a855f7' },
      { id: 3, text: 'Barzinho', icon: Beer, color: '#f59e0b' },
      { id: 4, text: 'Festival', icon: Ticket, color: '#3b82f6' },
      { id: 5, text: 'Bate-Volta', icon: Map, color: '#10b981' },
      { id: 6, text: 'Parque Diversão', icon: Palmtree, color: '#f97316' },
      { id: 7, text: 'Boliche', icon: Star, color: '#6366f1' },
      { id: 8, text: 'Karaokê', icon: Mic2, color: '#ec4899' },
    ]
  },
  {
    id: 'descobertas',
    name: 'Dia de Descobertas',
    options: [
      { id: 1, text: 'Museu Novo', icon: Brush, color: '#f43f5e' },
      { id: 2, text: 'Rest. Exótico', icon: Utensils, color: '#a855f7' },
      { id: 3, text: 'Workshop', icon: Brush, color: '#f59e0b' },
      { id: 4, text: 'Aula de Dança', icon: Music, color: '#3b82f6' },
      { id: 5, text: 'Trilha Nova', icon: Map, color: '#10b981' },
      { id: 6, text: 'Piquenique', icon: TreePine, color: '#f97316' },
      { id: 7, text: 'Planetário', icon: Moon, color: '#6366f1' },
      { id: 8, text: 'Livraria Café', icon: Coffee, color: '#ec4899' },
    ]
  },
  {
    id: 'indecisos',
    name: 'Indecisos (Comida)',
    options: [
      { id: 1, text: 'Pizza', icon: Pizza, color: '#f43f5e' },
      { id: 2, text: 'Hambúrguer', icon: Pizza, color: '#a855f7' },
      { id: 3, text: 'Sushi', icon: Utensils, color: '#f59e0b' },
      { id: 4, text: 'Comida Caseira', icon: ChefHat, color: '#3b82f6' },
      { id: 5, text: 'Massa / Italiano', icon: Utensils, color: '#10b981' },
      { id: 6, text: 'Árabe', icon: Utensils, color: '#f97316' },
      { id: 7, text: 'Mexicano', icon: Utensils, color: '#6366f1' },
      { id: 8, text: 'Pastel / Feira', icon: Pizza, color: '#ec4899' },
    ]
  },
  {
    id: 'romantico',
    name: 'Mais Romântico',
    options: [
      { id: 1, text: 'Jantar à Luz Velas', icon: Heart, color: '#f43f5e' },
      { id: 2, text: 'Banho de Espuma', icon: Sparkles, color: '#a855f7' },
      { id: 3, text: 'Pôr do Sol', icon: Moon, color: '#f59e0b' },
      { id: 4, text: 'Massagem', icon: Sparkles, color: '#3b82f6' },
      { id: 5, text: 'Noite de Vinhos', icon: Beer, color: '#10b981' },
      { id: 6, text: 'Piquenique Noite', icon: Moon, color: '#f97316' },
      { id: 7, text: 'Carta de Amor', icon: Heart, color: '#6366f1' },
      { id: 8, text: 'Café na Cama', icon: Coffee, color: '#ec4899' },
    ]
  },
  {
    id: 'valentine',
    name: 'Valentine\'s Day',
    options: [
      { id: 1, text: 'Spa Day', icon: Sparkles, color: '#f43f5e' },
      { id: 2, text: 'Jantar de Gala', icon: Utensils, color: '#a855f7' },
      { id: 3, text: 'Ensaio Foto', icon: Camera, color: '#f59e0b' },
      { id: 4, text: 'Noite em Hotel', icon: Moon, color: '#3b82f6' },
      { id: 5, text: 'Presente Especial', icon: Gift, color: '#10b981' },
      { id: 6, text: 'Fondue', icon: Utensils, color: '#f97316' },
      { id: 7, text: 'Cinema VIP', icon: Film, color: '#6366f1' },
      { id: 8, text: 'Estrelas', icon: Star, color: '#ec4899' },
    ]
  },
  {
    id: 'aventura_casa',
    name: 'Aventura em Casa',
    options: [
      { id: 1, text: 'Acampar Sala', icon: Tent, color: '#f43f5e' },
      { id: 2, text: 'Guerra Travesseiro', icon: Ghost, color: '#a855f7' },
      { id: 3, text: 'Maratona Terror', icon: Ghost, color: '#f59e0b' },
      { id: 4, text: 'Cozinhar Novo', icon: ChefHat, color: '#3b82f6' },
      { id: 5, text: 'Fondue Caseiro', icon: Utensils, color: '#10b981' },
      { id: 6, text: 'Spa Caseiro', icon: Sparkles, color: '#f97316' },
      { id: 7, text: 'Pintar Quadro', icon: Brush, color: '#6366f1' },
      { id: 8, text: 'Karaokê YouTube', icon: Mic2, color: '#ec4899' },
    ]
  }
];

const SectionRoulette: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedOption, setSelectedOption] = useState<RouletteOption | null>(null);
  const [currentThemeId, setCurrentThemeId] = useState('default');
  const [customThemes, setCustomThemes] = useState<Record<string, RouletteOption[]>>({});
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editingOptions, setEditingOptions] = useState<RouletteOption[]>([]);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const tickBufferRef = useRef<AudioBuffer | null>(null);
  const lastTickRef = useRef<number>(0);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;
        
        // Pre-render tick sound (short noise burst)
        const sampleRate = ctx.sampleRate;
        const duration = 0.05;
        const buffer = ctx.createBuffer(1, sampleRate * duration, sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < buffer.length; i++) {
          const noise = Math.random() * 2 - 1;
          const envelope = Math.exp(-i / (sampleRate * 0.01));
          data[i] = noise * envelope * 0.5;
        }
        tickBufferRef.current = buffer;
      }
    }
    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playTick = () => {
    if (!audioCtxRef.current || !tickBufferRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const source = ctx.createBufferSource();
      source.buffer = tickBufferRef.current;
      source.connect(ctx.destination);
      source.start(ctx.currentTime);
    } catch (e) {
      // Ignore audio errors
    }
  };

  const playWin = () => {
    if (!audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      [440, 554.37, 659.25].forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'triangle';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 2);
      });
    } catch (e) {
      // Ignore audio errors
    }
  };

  // Load from localStorage
  useEffect(() => {
    const savedCustom = localStorage.getItem('roulette_custom_themes');
    const savedTheme = localStorage.getItem('roulette_current_theme');
    if (savedCustom) {
      try {
        setCustomThemes(JSON.parse(savedCustom));
      } catch (e) {
        console.error("Failed to parse custom themes", e);
      }
    }
    if (savedTheme) {
      setCurrentThemeId(savedTheme);
    }
  }, []);

  // Current options based on theme and custom overrides
  const currentOptions = useMemo(() => {
    const baseTheme = THEMES.find(t => t.id === currentThemeId) || THEMES[0];
    return customThemes[currentThemeId] || baseTheme.options;
  }, [currentThemeId, customThemes]);

  const spinRoulette = () => {
    if (isSpinning) return;
    
    initAudio();
    setIsSpinning(true);
    setSelectedOption(null);

    const spins = Math.floor(Math.random() * 5) + 5;
    const randomDegree = Math.floor(Math.random() * 360);
    const totalRotation = rotation + (spins * 360) + randomDegree;

    lastTickRef.current = Math.floor(rotation / 22.5);
    setRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const normalizedRotation = totalRotation % 360;
      const sliceIndex = Math.floor(((360 - normalizedRotation + 22.5) % 360) / 45);
      setSelectedOption(currentOptions[sliceIndex]);
      playWin();
    }, 4000);
  };

  const handleThemeChange = (id: string) => {
    setCurrentThemeId(id);
    localStorage.setItem('roulette_current_theme', id);
    setSelectedOption(null);
  };

  const openSettings = () => {
    setEditingOptions([...currentOptions]);
    setIsSettingsOpen(true);
  };

  const saveSettings = () => {
    const newCustom = { ...customThemes, [currentThemeId]: editingOptions };
    setCustomThemes(newCustom);
    localStorage.setItem('roulette_custom_themes', JSON.stringify(newCustom));
    setIsSettingsOpen(false);
  };

  const resetTheme = () => {
    const newCustom = { ...customThemes };
    delete newCustom[currentThemeId];
    setCustomThemes(newCustom);
    localStorage.setItem('roulette_custom_themes', JSON.stringify(newCustom));
    setEditingOptions([...(THEMES.find(t => t.id === currentThemeId)?.options || THEMES[0].options)]);
  };

  return (
    <section className="min-h-screen w-full bg-zinc-950 flex flex-col items-center justify-start md:justify-center py-8 md:py-20 px-4 overflow-hidden relative">
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-900/20 via-zinc-950 to-zinc-950" />
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="z-10 text-center mb-4 md:mb-8"
      >
        <h2 className="text-3xl md:text-5xl font-serif text-white mb-2 md:mb-4 flex items-center justify-center gap-3">
          <Sparkles className="text-rose-400 w-5 h-5 md:w-8 md:h-8" />
          Roleta do Casal
          <Sparkles className="text-rose-400 w-5 h-5 md:w-8 md:h-8" />
        </h2>
        <p className="text-zinc-400 text-sm md:text-lg">Não sabem o que fazer hoje? Deixe a sorte decidir!</p>
      </motion.div>

      {/* Theme Selector */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="z-20 mb-6 md:mb-10 flex flex-wrap justify-center gap-1.5 md:gap-2 max-w-2xl"
      >
        {THEMES.map(theme => (
          <button
            key={theme.id}
            onClick={() => handleThemeChange(theme.id)}
            className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[10px] md:text-xs font-bold transition-all ${
              currentThemeId === theme.id 
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' 
                : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
            }`}
          >
            {theme.name}
          </button>
        ))}
        <button
          onClick={openSettings}
          className="px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[10px] md:text-xs font-bold bg-zinc-800 text-zinc-300 hover:bg-zinc-700 flex items-center gap-1.5 md:gap-2"
        >
          <Settings2 size={12} className="md:w-[14px] md:h-[14px]" />
          Personalizar
        </button>
      </motion.div>

      {/* Roulette Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.8, delay: 0.2 }}
        className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] mb-8 md:mb-12 z-10"
      >
        
        {/* Pointer */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 w-0 h-0 border-l-[12px] md:border-l-[15px] border-l-transparent border-r-[12px] md:border-r-[15px] border-r-transparent border-t-[24px] md:border-t-[30px] border-t-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />

        {/* Wheel */}
        <motion.div 
          className="w-full h-full rounded-full border-4 border-zinc-800 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden"
          style={{ willChange: "transform" }}
          animate={{ rotate: rotation }}
          transition={{ duration: 4, ease: [0.2, 0.8, 0.2, 1] }}
          onUpdate={(latest) => {
            if (isSpinning && typeof latest.rotate === 'number') {
              const currentTick = Math.floor(latest.rotate / 22.5);
              if (currentTick > lastTickRef.current) {
                playTick();
                lastTickRef.current = currentTick;
              }
            }
          }}
        >
          {/* Slices Background using conic-gradient */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(from -22.5deg, ${currentOptions.map((opt, i) => `${opt.color} ${i * 45}deg ${(i + 1) * 45}deg`).join(', ')})`
            }}
          />

          {/* Slices Content */}
          {currentOptions.map((option, index) => {
            const rotationAngle = index * 45;
            const Icon = option.icon;
            return (
              <div 
                key={option.id}
                className="absolute top-0 left-1/2 w-14 md:w-16 h-1/2 -translate-x-1/2 origin-bottom flex flex-col items-center justify-start pt-3 md:pt-8 text-white"
                style={{ transform: `translateX(-50%) rotate(${rotationAngle}deg)` }}
              >
                <Icon size={20} className="md:w-6 md:h-6 mb-1 md:mb-2 opacity-90 drop-shadow-md" />
                <span className="text-[8px] md:text-xs font-bold uppercase tracking-wider text-center leading-tight drop-shadow-md px-1">
                  {option.text}
                </span>
              </div>
            );
          })}
          
          {/* Center Hub */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-zinc-900 rounded-full border-4 border-zinc-700 z-20 shadow-inner flex items-center justify-center">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-zinc-600 rounded-full" />
          </div>
        </motion.div>
      </motion.div>

      {/* Spin Button */}
      <motion.button 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        onClick={spinRoulette}
        disabled={isSpinning}
        className={`z-10 px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg tracking-wide transition-all duration-300 shadow-lg ${
          isSpinning 
            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
            : 'bg-gradient-to-r from-rose-500 to-purple-600 text-white hover:scale-105 hover:shadow-rose-500/25 active:scale-95'
        }`}
      >
        {isSpinning ? 'GIRANDO...' : 'GIRAR A ROLETA'}
      </motion.button>

      {/* Result Display */}
      <div className="h-20 md:h-24 mt-4 md:mt-8 z-10 flex items-center justify-center w-full">
        {selectedOption && !isSpinning && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="text-center bg-zinc-900/80 backdrop-blur-sm px-6 py-3 md:px-8 md:py-4 rounded-2xl border border-zinc-800"
          >
            <p className="text-zinc-400 text-[10px] md:text-sm mb-1 md:mb-2 uppercase tracking-widest">O destino escolheu:</p>
            <h3 className="text-xl md:text-3xl font-serif text-white flex items-center justify-center gap-2 md:gap-3">
              <selectedOption.icon className="text-rose-400 w-6 h-6 md:w-7 md:h-7" />
              {selectedOption.text}
            </h3>
          </motion.div>
        )}
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-zinc-900 rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
                <h3 className="text-xl font-serif text-white flex items-center gap-2">
                  <Settings2 className="text-rose-500" />
                  Personalizar: {THEMES.find(t => t.id === currentThemeId)?.name}
                </h3>
                <button onClick={() => setIsSettingsOpen(false)} className="text-zinc-500 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 max-h-[60vh] overflow-y-auto no-scrollbar">
                <div className="space-y-4">
                  {editingOptions.map((opt, idx) => (
                    <div key={opt.id} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white/50 border border-zinc-800">
                        {idx + 1}
                      </div>
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                        style={{ backgroundColor: opt.color }}
                      >
                        <opt.icon size={20} />
                      </div>
                      <input 
                        type="text"
                        value={opt.text}
                        onChange={(e) => {
                          const newOpts = [...editingOptions];
                          newOpts[idx].text = e.target.value;
                          setEditingOptions(newOpts);
                        }}
                        className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-rose-500 transition-colors"
                        placeholder={`Opção ${idx + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t border-zinc-800 bg-zinc-950/50 flex gap-3">
                <button 
                  onClick={resetTheme}
                  className="flex-1 px-4 py-3 rounded-xl bg-zinc-800 text-zinc-300 font-bold flex items-center justify-center gap-2 hover:bg-zinc-700 transition-colors"
                >
                  <RotateCcw size={18} />
                  Resetar
                </button>
                <button 
                  onClick={saveSettings}
                  className="flex-[2] px-4 py-3 rounded-xl bg-rose-500 text-white font-bold flex items-center justify-center gap-2 hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/20"
                >
                  <Save size={18} />
                  Salvar Mudanças
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default SectionRoulette;
