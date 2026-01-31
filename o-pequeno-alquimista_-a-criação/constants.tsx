
import React from 'react';
import { GameElement, Combination } from './types';

export const INITIAL_ELEMENTS: string[] = ['terra', 'agua', 'ar', 'luz'];

export const ALL_ELEMENTS: Record<string, GameElement> = {
  // --- INICIAIS (DIAS DA CRIAÇÃO) ---
  terra: { 
    id: 'terra', name: 'Terra', color: '#8D6E63', category: 'natureza', isInitial: true, 
    icon: <g>
      <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" fill="currentColor"/>
      <path d="M12 22v-10l8-5" fill="black" opacity="0.15"/>
      <circle cx="8" cy="15" r="1.5" fill="white" opacity="0.3"/>
      <path d="M10 5l2 1-1 2" stroke="white" strokeWidth="0.5" opacity="0.4" fill="none"/>
    </g> 
  },
  agua: { 
    id: 'agua', name: 'Água', color: '#29B6F6', category: 'agua', isInitial: true, 
    icon: <g>
      <path d="M12 2.5C12 2.5 5 9 5 14.5a7 7 0 0014 0C19 9 12 2.5 12 2.5z" fill="currentColor"/>
      <path d="M10 14c0-1.5 1-3 2-3.5" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" fill="none"/>
      <circle cx="15" cy="16" r="1" fill="white" opacity="0.4"/>
    </g> 
  },
  ar: { 
    id: 'ar', name: 'Ar', color: '#B3E5FC', category: 'clima', isInitial: true, 
    icon: <g>
      <path d="M4 8h12a3 3 0 000-6M2 14h15a3 3 0 010 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <circle cx="18" cy="10" r="2" fill="currentColor" opacity="0.6"/>
      <path d="M7 11h4" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
    </g> 
  },
  luz: { 
    id: 'luz', name: 'Luz', color: '#FFF176', category: 'sagrado', isInitial: true, 
    icon: <g>
      <circle cx="12" cy="12" r="6" fill="currentColor"/>
      <circle cx="12" cy="12" r="3" fill="white" opacity="0.4"/>
      <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/>
        <line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/>
        <line x1="4.9" y1="4.9" x2="6.3" y2="6.3"/><line x1="17.7" y1="17.7" x2="19.1" y2="19.1"/>
      </g>
    </g> 
  },

  // --- NATUREZA BÁSICA ---
  fogo: { 
    id: 'fogo', name: 'Calor', color: '#FF7043', category: 'natureza', 
    icon: <g>
      <path d="M12 2c0 0-5 6-5 10a5 5 0 0010 0c0-4-5-10-5-10z" fill="currentColor"/>
      <path d="M12 7c0 0-2 3-2 5a2 2 0 004 0c0-2-2-5-2-5z" fill="#FFE082"/>
      <circle cx="12" cy="15" r="1.5" fill="white" opacity="0.5"/>
    </g> 
  },
  lama: { 
    id: 'lama', name: 'Barro', color: '#6D4C41', category: 'natureza', 
    icon: <g>
      <circle cx="12" cy="12" r="9" fill="currentColor"/>
      <circle cx="9" cy="9" r="2.5" fill="black" opacity="0.15"/>
      <circle cx="15" cy="14" r="2" fill="black" opacity="0.1"/>
      <path d="M7 14c1 1 3 1 4 0" stroke="white" strokeWidth="1" opacity="0.2" fill="none"/>
    </g> 
  },
  pedra: { 
    id: 'pedra', name: 'Pedra', color: '#78909C', category: 'natureza', 
    icon: <g>
      <path d="M12 3l-8 6 2 11h12l2-11-8-6z" fill="currentColor"/>
      <path d="M12 3l-8 6 1 4 7-2V3z" fill="white" opacity="0.3"/>
      <path d="M15 16l2 2M11 18l1 1" stroke="black" strokeWidth="1" opacity="0.1"/>
    </g> 
  },
  areia: { 
    id: 'areia', name: 'Areia', color: '#FFE082', category: 'natureza', 
    icon: <g>
      <path d="M12 5L4 19h16L12 5z" fill="currentColor"/>
      <circle cx="12" cy="13" r="1" fill="#795548" opacity="0.2"/>
      <circle cx="10" cy="16" r="0.8" fill="#795548" opacity="0.2"/>
      <circle cx="14" cy="16" r="0.8" fill="#795548" opacity="0.2"/>
      <path d="M12 5l-4 7 4-2z" fill="white" opacity="0.4"/>
    </g> 
  },
  vapor: { 
    id: 'vapor', name: 'Vapor', color: '#ECEFF1', category: 'clima', 
    icon: <g>
      <path d="M8 20c0-4 4-4 4-8s-4-4-4-8M14 20c0-4 4-4 4-8s-4-4-4-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <circle cx="10" cy="10" r="1.5" fill="currentColor" opacity="0.5"/>
      <circle cx="16" cy="16" r="1.5" fill="currentColor" opacity="0.5"/>
    </g> 
  },
  gelo: { 
    id: 'gelo', name: 'Gelo', color: '#E1F5FE', category: 'agua', 
    icon: <g>
      <rect x="4" y="4" width="16" height="16" rx="5" fill="currentColor"/>
      <path d="M7 7l4 4M13 7l4 4M7 13l4 4" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
      <rect x="6" y="6" width="12" height="12" rx="2" stroke="white" strokeWidth="0.5" opacity="0.2" fill="none"/>
    </g> 
  },
  vento: { 
    id: 'vento', name: 'Vento', color: '#CFD8DC', category: 'clima', 
    icon: <g>
      <path d="M2 8h14a2 2 0 10-2-2M2 12h18a2 2 0 11-2 2M2 16h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M5 8h4M8 12h6" stroke="white" strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
    </g> 
  },
  poeira: { 
    id: 'poeira', name: 'Poeira', color: '#D7CCC8', category: 'clima', 
    icon: <g>
      <circle cx="6" cy="10" r="2" fill="currentColor"/>
      <circle cx="12" cy="7" r="1.5" fill="currentColor"/>
      <circle cx="18" cy="12" r="2" fill="currentColor"/>
      <circle cx="10" cy="16" r="1.5" fill="currentColor"/>
      <path d="M4 14l2 1M16 8l2 1" stroke="currentColor" strokeWidth="0.5" opacity="0.5"/>
    </g> 
  },

  // --- GEOGRAFIA E ASTROS ---
  montanha: { 
    id: 'montanha', name: 'Montanha', color: '#795548', category: 'natureza', 
    icon: <g>
      <path d="M12 4L2 20h20L12 4z" fill="currentColor"/>
      <path d="M12 4l-4 6 4 3 4-3-4-6z" fill="white" opacity="0.5"/>
      <path d="M6 16l2-2 3 2" stroke="black" strokeWidth="1" opacity="0.1" fill="none"/>
    </g> 
  },
  oceano: { 
    id: 'oceano', name: 'Mar', color: '#0277BD', category: 'agua', 
    icon: <g>
      <path d="M0 12c3-3 6 3 9 0s6-3 9 0 6 3 9 0v12H0z" fill="currentColor"/>
      <path d="M0 15c3-3 6 3 9 0s6-3 9 0" stroke="white" strokeWidth="2" opacity="0.4" fill="none"/>
      <circle cx="4" cy="18" r="1" fill="white" opacity="0.3"/>
      <circle cx="18" cy="20" r="1.5" fill="white" opacity="0.2"/>
    </g> 
  },
  sol: { 
    id: 'sol', name: 'Sol', color: '#FBC02D', category: 'clima', 
    icon: <g>
      <circle cx="12" cy="12" r="7" fill="currentColor"/>
      <circle cx="10" cy="10" r="2" fill="white" opacity="0.3"/>
      {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
        <rect key={deg} x="11" y="1" width="2" height="5" rx="1" fill="currentColor" transform={`rotate(${deg} 12 12)`}/>
      ))}
    </g> 
  },
  lua: { 
    id: 'lua', name: 'Lua', color: '#CFD8DC', category: 'clima', 
    icon: <g>
      <path d="M12 3a9 9 0 100 18 7 7 0 010-14z" fill="currentColor"/>
      <circle cx="10" cy="12" r="1.2" fill="black" opacity="0.1"/>
      <circle cx="14" cy="15" r="0.8" fill="black" opacity="0.1"/>
      <path d="M15 8l1-1" stroke="white" strokeWidth="0.5" opacity="0.4"/>
    </g> 
  },
  estrelas: { 
    id: 'estrelas', name: 'Estrelas', color: '#FFF59D', category: 'clima', 
    icon: <g>
      <path d="M12 2l1.5 4.5H18l-3.5 3 1.5 5-4-3-4 3 1.5-5-3.5-3h4.5z" fill="currentColor"/>
      <circle cx="4" cy="6" r="1.5" fill="currentColor" opacity="0.7"/>
      <circle cx="20" cy="16" r="1.2" fill="currentColor" opacity="0.5"/>
      <circle cx="6" cy="18" r="0.8" fill="white" opacity="0.4"/>
    </g> 
  },
  nuvem: { 
    id: 'nuvem', name: 'Nuvem', color: '#FFFFFF', category: 'clima', 
    icon: <g>
      <circle cx="8" cy="14" r="5" fill="currentColor"/>
      <circle cx="13" cy="14" r="5" fill="currentColor"/>
      <circle cx="11" cy="9" r="5" fill="currentColor"/>
      <path d="M9 12c1-1 2-1 3 0" stroke="black" strokeWidth="0.5" opacity="0.1" fill="none"/>
    </g> 
  },
  chuva: { 
    id: 'chuva', name: 'Chuva', color: '#4FC3F7', category: 'agua', 
    icon: <g>
      <path d="M13 14l-1 5M17 14l-1 5M9 14l-1 5" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <path d="M8 12c0-3 2-4 4-4s4 1 4 4" stroke="currentColor" strokeWidth="2.5" opacity="0.4" fill="none"/>
      <circle cx="12" cy="11" r="1" fill="white" opacity="0.3"/>
    </g> 
  },
  arcoiris: { 
    id: 'arcoiris', name: 'Aliança', color: '#FF5252', category: 'sagrado', 
    icon: <g>
      <path d="M4 18a8 8 0 0116 0" stroke="#FF5252" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M6 18a6 6 0 0112 0" stroke="#FFD740" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M8 18a4 4 0 018 0" stroke="#4FC3F7" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <circle cx="12" cy="11" r="1" fill="white" opacity="0.5" />
    </g> 
  },
  dia: { 
    id: 'dia', name: 'Dia', color: '#FFF9C4', category: 'clima', 
    icon: <g>
      <rect width="24" height="24" rx="6" fill="currentColor"/>
      <circle cx="12" cy="12" r="5.5" fill="#FBC02D"/>
      <circle cx="10" cy="10" r="1.5" fill="white" opacity="0.4"/>
    </g> 
  },
  noite: { 
    id: 'noite', name: 'Noite', color: '#1A237E', category: 'clima', 
    icon: <g>
      <rect width="24" height="24" rx="6" fill="currentColor"/>
      <circle cx="17" cy="7" r="2" fill="white"/>
      <circle cx="8" cy="16" r="1.2" fill="white" opacity="0.6"/>
      <circle cx="14" cy="18" r="0.8" fill="white" opacity="0.4"/>
      <path d="M6 6c1 1 2 0 3 1" stroke="white" strokeWidth="0.5" opacity="0.3"/>
    </g> 
  },

  // --- VIDA ---
  planta: { 
    id: 'planta', name: 'Planta', color: '#66BB6A', category: 'natureza', 
    icon: <g>
      <path d="M12 22V12" stroke="#5D4037" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M12 12c4-4 4-9 0-9s-4 5 0 9z" fill="currentColor"/>
      <path d="M12 16c-4-2-8 0-8 4s4 3 8 0z" fill="currentColor" opacity="0.8"/>
      <circle cx="12" cy="7" r="1" fill="white" opacity="0.3"/>
    </g> 
  },
  arvore: { 
    id: 'arvore', name: 'Árvore', color: '#2E7D32', category: 'natureza', 
    icon: <g>
      <rect x="11" y="14" width="2.5" height="8" rx="1" fill="#5D4037"/>
      <circle cx="12" cy="10" r="7.5" fill="currentColor"/>
      <circle cx="9" cy="8" r="2.5" fill="white" opacity="0.25"/>
      <circle cx="15" cy="11" r="1.5" fill="black" opacity="0.1"/>
    </g> 
  },
  flor: { 
    id: 'flor', name: 'Flor', color: '#EC407A', category: 'natureza', 
    icon: <g>
      <path d="M12 22V16" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round"/>
      {[0, 72, 144, 216, 288].map(deg => (
        <circle key={deg} cx="12" cy="9" r="4.5" fill="currentColor" transform={`rotate(${deg} 12 12)`}/>
      ))}
      <circle cx="12" cy="12" r="3.5" fill="#FFEB3B"/>
      <circle cx="11" cy="11" r="1" fill="white" opacity="0.4"/>
    </g> 
  },
  fruta: { 
    id: 'fruta', name: 'Fruto', color: '#F44336', category: 'vida', 
    icon: <g>
      <circle cx="12" cy="14" r="7.5" fill="currentColor"/>
      <path d="M12 7.5V4" stroke="#5D4037" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M12 7.5c2.5 0 4-2.5 4-2.5" stroke="#4CAF50" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle cx="15" cy="11" r="1.5" fill="white" opacity="0.3"/>
    </g> 
  },
  semente: { 
    id: 'semente', name: 'Semente', color: '#8D6E63', category: 'vida', 
    icon: <g>
      <ellipse cx="12" cy="16" rx="3.5" ry="6" fill="currentColor" transform="rotate(-20 12 16)"/>
      <path d="M12 11c0 2.5 1 3.5 1 3.5" stroke="white" strokeWidth="1.2" opacity="0.4" fill="none"/>
      <circle cx="11" cy="17" r="0.5" fill="black" opacity="0.2"/>
    </g> 
  },
  vida: { 
    id: 'vida', name: 'Vida', color: '#FF4081', category: 'sagrado', 
    icon: <g>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
      <path d="M7 7c1-1 2-1 3 0" stroke="white" strokeWidth="2" opacity="0.4" fill="none" strokeLinecap="round"/>
      <circle cx="17" cy="8" r="2.5" fill="white" opacity="0.3"/>
    </g> 
  },
  peixe: { 
    id: 'peixe', name: 'Peixe', color: '#00BCD4', category: 'vida', 
    icon: <g>
      <path d="M2 12c3-6 14-6 17 0s-14 6-17 0z" fill="currentColor"/>
      <path d="M18 12l5-4v8l-5-4z" fill="currentColor"/>
      <circle cx="6" cy="11" r="1.5" fill="white"/>
      <path d="M10 12h3" stroke="white" strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
    </g> 
  },
  passaro: { 
    id: 'passaro', name: 'Pássaro', color: '#42A5F5', category: 'vida', 
    icon: <g>
      <path d="M4 12c4-5 9-5 13 0" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      <path d="M8 14.5c2.5-2.5 5-2.5 7.5 0" stroke="currentColor" strokeWidth="2.5" opacity="0.5" fill="none" strokeLinecap="round"/>
      <circle cx="12" cy="10" r="2.5" fill="currentColor"/>
      <path d="M12 8l1-1" stroke="white" strokeWidth="1" opacity="0.5"/>
    </g> 
  },
  ovelha: { 
    id: 'ovelha', name: 'Ovelha', color: '#F5F5F5', category: 'vida', 
    icon: <g>
      <circle cx="10" cy="12" r="7" fill="currentColor"/>
      <circle cx="15" cy="12" r="6" fill="currentColor"/>
      <rect x="17" y="10" width="5.5" height="4.5" rx="2.5" fill="#E0E0E0"/>
      <rect x="9" y="18" width="2" height="4.5" fill="#9E9E9E"/>
      <rect x="15" y="18" width="2" height="4.5" fill="#9E9E9E"/>
      <circle cx="19" cy="12" r="0.8" fill="black" opacity="0.3"/>
    </g> 
  },
  animal: { 
    id: 'animal', name: 'Criação', color: '#A1887F', category: 'vida', 
    icon: <g>
      <rect x="4" y="10" width="13" height="9" rx="4" fill="currentColor"/>
      <circle cx="17" cy="11" r="4.5" fill="currentColor"/>
      <circle cx="18.5" cy="10" r="1.2" fill="white"/>
      <rect x="6" y="18" width="2.5" height="5" fill="currentColor" opacity="0.8"/>
      <rect x="13" y="18" width="2.5" height="5" fill="currentColor" opacity="0.8"/>
      <path d="M18 14v1" stroke="black" strokeWidth="1" opacity="0.2"/>
    </g> 
  },

  // --- HUMANIDADE E FÉ ---
  humano: { 
    id: 'humano', name: 'Humano', color: '#FFCCBC', category: 'humano', 
    icon: <g>
      <circle cx="12" cy="8" r="6" fill="currentColor"/>
      <path d="M4 22v-2a6 6 0 016-6h4a6 6 0 016 6v2" fill="currentColor"/>
      <path d="M10 7c0.5-0.5 1.5-0.5 2 0" stroke="black" strokeWidth="0.5" opacity="0.1" fill="none"/>
      <circle cx="10.5" cy="8" r="0.8" fill="black" opacity="0.2"/>
      <circle cx="13.5" cy="8" r="0.8" fill="black" opacity="0.2"/>
    </g> 
  },
  amor: { 
    id: 'amor', name: 'Amor', color: '#F06292', category: 'humano', 
    icon: <g>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
      <circle cx="8" cy="8" r="2" fill="white" opacity="0.3"/>
    </g> 
  },
  familia: { 
    id: 'familia', name: 'Família', color: '#FF8A65', category: 'humano', 
    icon: <g>
      <circle cx="8" cy="10" r="3.5" fill="currentColor"/>
      <circle cx="16" cy="10" r="3.5" fill="currentColor"/>
      <circle cx="12" cy="16" r="3" fill="currentColor" opacity="0.8"/>
      <path d="M8 14v2M16 14v2" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
    </g> 
  },
  oracao: { 
    id: 'oracao', name: 'Oração', color: '#FFF176', category: 'sagrado', 
    icon: <g>
      <path d="M12 3l-5 14h10l-5-14z" fill="currentColor" opacity="0.3"/>
      <path d="M10 20c0-3 1-5 2-5s2 2 2 5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <circle cx="12" cy="6" r="2.5" fill="currentColor"/>
      <path d="M12 4v2" stroke="white" strokeWidth="1" opacity="0.5"/>
    </g> 
  },
  biblia: { 
    id: 'biblia', name: 'Bíblia', color: '#5D4037', category: 'sagrado', 
    icon: <g>
      <rect x="4" y="3" width="16" height="18" rx="3" fill="currentColor"/>
      <rect x="6" y="5" width="12" height="14" rx="1.5" fill="white" opacity="0.15"/>
      <path d="M12 8v7M10 11h4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <path d="M6 18h12" stroke="white" strokeWidth="0.5" opacity="0.3"/>
    </g> 
  },
  fe: { 
    id: 'fe', name: 'Fé', color: '#FFD54F', category: 'sagrado', 
    icon: <g>
      <circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M12 5.5v13M8 9.5h8" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="2" fill="white" opacity="0.4"/>
    </g> 
  },
  igreja: { 
    id: 'igreja', name: 'Igreja', color: '#90A4AE', category: 'sagrado', 
    icon: <g>
      <path d="M12 2L3 11v11h18V11l-9-9z" fill="currentColor"/>
      <rect x="10" y="16" width="4.5" height="6" fill="white" opacity="0.4"/>
      <path d="M12 5v4M10 7h4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="17" cy="14" r="1.5" fill="white" opacity="0.2"/>
    </g> 
  },
  louvor: { 
    id: 'louvor', name: 'Louvor', color: '#BA68C8', category: 'sagrado', 
    icon: <g>
      <path d="M9 18V4l11 2v14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <circle cx="6.5" cy="18" r="2.5" fill="currentColor"/>
      <circle cx="17.5" cy="20" r="2.5" fill="currentColor"/>
      <path d="M10 8h8" stroke="white" strokeWidth="1" opacity="0.4"/>
    </g> 
  },
  paz: { 
    id: 'paz', name: 'Paz', color: '#B3E5FC', category: 'humano', 
    icon: <g>
      <circle cx="12" cy="12" r="10.5" fill="currentColor" opacity="0.25"/>
      <path d="M12 6c-2.5 3.5-2.5 8.5 0 12 2.5-3.5 2.5-8.5 0-12z" fill="currentColor"/>
      <path d="M6 12c3.5 2.5 8.5 2.5 12 0-3.5-2.5-8.5-2.5-12 0z" fill="currentColor"/>
      <circle cx="12" cy="12" r="1.5" fill="white" opacity="0.6"/>
    </g> 
  },
  pomba: { 
    id: 'pomba', name: 'Pomba', color: '#FFFFFF', category: 'vida', 
    icon: <g>
      <path d="M3 12c3-3 8-3 11 0s8 3 11 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M12 12c0 5 4 7 4 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle cx="10" cy="9.5" r="2" fill="currentColor"/>
      <path d="M14 11h2" stroke="#4CAF50" strokeWidth="1.5" opacity="0.6" strokeLinecap="round"/>
    </g> 
  },
  pao: { 
    id: 'pao', name: 'Pão', color: '#FFB74D', category: 'humano', 
    icon: <g>
      <ellipse cx="12" cy="14" rx="9.5" ry="6.5" fill="currentColor"/>
      <path d="M7 12c1.5 1.5 3 1.5 4.5 0M12.5 12c1.5 1.5 3 1.5 4.5 0" stroke="white" strokeWidth="2" opacity="0.5" strokeLinecap="round" fill="none"/>
      <circle cx="15" cy="16" r="1" fill="black" opacity="0.05"/>
    </g> 
  },
  vinho: { 
    id: 'vinho', name: 'Vinho', color: '#880E4F', category: 'humano', 
    icon: <g>
      <path d="M7 3h10l-5 10v6h5M6 21h12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M8 6h8" stroke="white" strokeWidth="1.5" opacity="0.35" strokeLinecap="round"/>
      <circle cx="12" cy="8" r="1.5" fill="white" opacity="0.2"/>
    </g> 
  },
  ceia: { 
    id: 'ceia', name: 'Comunhão', color: '#F06292', category: 'sagrado', 
    icon: <g>
      <circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <circle cx="12" cy="12" r="5" fill="currentColor" opacity="0.6"/>
      <path d="M12 9v6M9 12h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    </g> 
  },
  madeira: { 
    id: 'madeira', name: 'Madeira', color: '#5D4037', category: 'natureza', 
    icon: <g>
      <rect x="3" y="10" width="18" height="6" rx="2.5" fill="currentColor"/>
      <path d="M6 13h4M14 13h4" stroke="white" strokeWidth="1.5" opacity="0.25" strokeLinecap="round"/>
      <circle cx="12" cy="13" r="1" fill="black" opacity="0.2"/>
    </g> 
  },
  ferramenta: { 
    id: 'ferramenta', name: 'Trabalho', color: '#757575', category: 'humano', 
    icon: <g>
      <path d="M17 3l-11 11M5 15l-3 7h7l3-3" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      <circle cx="17" cy="3" r="2.5" fill="currentColor"/>
      <path d="M7 13l2 2" stroke="white" strokeWidth="1" opacity="0.4"/>
    </g> 
  },
  arca: { 
    id: 'arca', name: 'Arca', color: '#795548', category: 'natureza', 
    icon: <g>
      <path d="M2 12c0 0 2.5 9 10 9s10-9 10-9H2z" fill="currentColor"/>
      <rect x="7" y="7" width="10" height="6" rx="1.5" fill="#5D4037"/>
      <path d="M10 9h4" stroke="white" strokeWidth="1" opacity="0.3"/>
      <path d="M4 14h16" stroke="black" strokeWidth="0.5" opacity="0.1"/>
    </g> 
  },
  jardim: { 
    id: 'jardim', name: 'Jardim', color: '#4CAF50', category: 'natureza', 
    icon: <g>
      <circle cx="8" cy="8" r="6" fill="currentColor"/>
      <circle cx="16" cy="16" r="6" fill="currentColor"/>
      <circle cx="17" cy="6" r="3.5" fill="#EC407A" opacity="0.7"/>
      <circle cx="7" cy="17" r="2.5" fill="#FFEB3B" opacity="0.6"/>
      <path d="M11 11l2 2" stroke="white" strokeWidth="1" opacity="0.3"/>
    </g> 
  },
  pastor: { 
    id: 'pastor', name: 'Pastor', color: '#8D6E63', category: 'sagrado', 
    icon: <g>
      <path d="M12 22V7" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <path d="M12 7c0-4 4-5 5-2.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <circle cx="12" cy="4.5" r="3.5" fill="currentColor" opacity="0.45"/>
      <path d="M12 12h2" stroke="white" strokeWidth="1" opacity="0.3"/>
    </g> 
  },
  cruz: { 
    id: 'cruz', name: 'Cruz', color: '#FFFFFF', category: 'sagrado', 
    icon: <g>
      <rect x="10" y="1" width="4" height="22" rx="1.5" fill="currentColor"/>
      <rect x="4" y="6" width="16" height="4" rx="1.5" fill="currentColor"/>
      <circle cx="12" cy="8" r="1.5" fill="black" opacity="0.05"/>
    </g> 
  },
  amizade: { 
    id: 'amizade', name: 'Amizade', color: '#03A9F4', category: 'humano', 
    icon: <g>
      <path d="M5 12c4 0 4-5 7-5s3 5 7 5" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
      <circle cx="5" cy="12" r="2.5" fill="currentColor"/>
      <circle cx="19" cy="12" r="2.5" fill="currentColor"/>
      <path d="M11 7c1-1 2-1 3 0" stroke="white" strokeWidth="1" opacity="0.4" fill="none"/>
    </g> 
  },
  luz_mundo: { 
    id: 'luz_mundo', name: 'Luz do Mundo', color: '#FFF176', category: 'sagrado', 
    icon: <g>
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="12" r="6" fill="currentColor"/>
      <path d="M12 12l5-11M12 12l-5-11" stroke="currentColor" strokeWidth="1.2" opacity="0.6"/>
      <circle cx="12" cy="12" r="3" fill="white" opacity="0.4"/>
    </g> 
  },
};

export const COMBINATIONS: Combination[] = [
  // --- CICLO DA NATUREZA ---
  { inputs: ['luz', 'ar'], output: 'fogo' },
  { inputs: ['terra', 'agua'], output: 'lama' },
  { inputs: ['terra', 'ar'], output: 'poeira' },
  { inputs: ['fogo', 'ar'], output: 'vento' },
  { inputs: ['agua', 'fogo'], output: 'vapor' },
  { inputs: ['agua', 'ar'], output: 'gelo' },
  { inputs: ['lama', 'luz'], output: 'planta' },
  { inputs: ['terra', 'terra'], output: 'montanha' },
  { inputs: ['agua', 'agua'], output: 'oceano' },
  { inputs: ['ar', 'luz'], output: 'dia' },
  { inputs: ['dia', 'poeira'], output: 'noite' },
  { inputs: ['noite', 'luz'], output: 'estrelas' },
  { inputs: ['dia', 'luz'], output: 'sol' },
  { inputs: ['noite', 'pedra'], output: 'lua' },
  { inputs: ['nuvem', 'agua'], output: 'chuva' },
  { inputs: ['chuva', 'luz'], output: 'arcoiris' },

  // --- VIDA E HUMANIDADE ---
  { inputs: ['lama', 'ar'], output: 'vida' },
  { inputs: ['vida', 'terra'], output: 'humano' },
  { inputs: ['humano', 'humano'], output: 'amor' },
  { inputs: ['amor', 'humano'], output: 'familia' },
  { inputs: ['planta', 'terra'], output: 'arvore' },
  { inputs: ['arvore', 'luz'], output: 'fruta' },
  { inputs: ['planta', 'agua'], output: 'flor' },
  { inputs: ['flor', 'flor'], output: 'jardim' },
  { inputs: ['vida', 'agua'], output: 'peixe' },
  { inputs: ['vida', 'ar'], output: 'passaro' },
  { inputs: ['vida', 'terra'], output: 'animal' },

  // --- FÉ E IGREJA ---
  { inputs: ['humano', 'luz'], output: 'oracao' },
  { inputs: ['oracao', 'luz'], output: 'biblia' },
  { inputs: ['biblia', 'humano'], output: 'fe' },
  { inputs: ['fe', 'pedra'], output: 'igreja' },
  { inputs: ['igreja', 'humano'], output: 'pastor' },
  { inputs: ['pastor', 'animal'], output: 'ovelha' },
  { inputs: ['humano', 'ar'], output: 'louvor' },
  { inputs: ['amor', 'oracao'], output: 'paz' },
  { inputs: ['paz', 'passaro'], output: 'pomba' },
  { inputs: ['arvore', 'fogo'], output: 'madeira' },
  { inputs: ['madeira', 'pedra'], output: 'ferramenta' },
  { inputs: ['madeira', 'agua'], output: 'arca' },
  { inputs: ['planta', 'fogo'], output: 'pao' },
  { inputs: ['fruta', 'agua'], output: 'vinho' },
  { inputs: ['pao', 'vinho'], output: 'ceia' },
  { inputs: ['madeira', 'amor'], output: 'cruz' },
  { inputs: ['humano', 'amor'], output: 'amizade' },
  { inputs: ['igreja', 'luz'], output: 'luz_mundo' },
];
