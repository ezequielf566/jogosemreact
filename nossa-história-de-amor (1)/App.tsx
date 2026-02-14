import React, { useState, useRef, useEffect } from 'react';
import SectionMusic from './components/SectionMusic';
import SectionTour from './components/SectionTour';
import SectionStories from './components/SectionStories';
import SectionCounter from './components/SectionCounter';
import SectionBook from './components/SectionBook';
import SectionOfficialStart from './components/SectionOfficialStart';
import { MUSIC_URL } from './constants';
import { Volume2, VolumeX } from 'lucide-react';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("User interaction required", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Ensure audio loops and is persistent
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }
  }, []);

  return (
    <main className="w-full relative bg-black text-white">
      {/* Hidden Global Audio */}
      <audio ref={audioRef} src={MUSIC_URL} />

      {/* Persistent Floating Volume Control (Visible after first section) */}
      <div className="fixed top-6 right-6 z-50 mix-blend-difference">
         <button onClick={togglePlay} className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors">
            {isPlaying ? <Volume2 className="text-white w-5 h-5" /> : <VolumeX className="text-white w-5 h-5" />}
         </button>
      </div>

      {/* Sections */}
      <div className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth no-scrollbar overscroll-y-contain">
          
          <div className="snap-start snap-always h-screen w-full">
            <SectionMusic isPlaying={isPlaying} togglePlay={togglePlay} audioRef={audioRef} />
          </div>
          
          <div className="snap-start snap-always min-h-screen w-full">
            <SectionTour />
          </div>
          
          <div className="snap-start snap-always min-h-screen w-full">
            <SectionStories />
          </div>

          <div className="snap-start snap-always min-h-screen w-full">
            <SectionCounter />
          </div>

          <div className="snap-start snap-always min-h-screen w-full">
            <SectionBook />
          </div>

          <div className="snap-start snap-always min-h-screen w-full">
            <SectionOfficialStart />
          </div>

          {/* Footer */}
          <div className="snap-end snap-always bg-slate-950 py-8 text-center text-rose-900/30 text-xs">
            <p>Feito com amor ❤️</p>
          </div>
      </div>
    </main>
  );
}

export default App;