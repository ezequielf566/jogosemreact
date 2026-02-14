import { Story, BookPage } from './types';

// --- CONFIGURAÇÃO DA MÚSICA ---
// DICA: Para usar sua própria música, faça upload no Dropbox, pegue o link e troque 'dl=0' por 'raw=1' no final.
export const MUSIC_URL = "https://bancodedados-five.vercel.app/luan-santana-deus-e-muito-bom-luan-city-20-letra-filtr-music-brasil-youtu_XYRaJQXL.mp3"; 

export const SONG_DETAILS = {
  title: "DEUS É MUITO BOM", // Título em maiúsculo
  artist: "Luan Santana", // Nome do artista
  cover: "https://bancodedados-five.vercel.app/hq720.jpg" // Capa do álbum (quadrada)
};

// Link direto do vídeo hospedado (MP4 carrega instantaneamente sem tela preta)
export const BACKGROUND_VIDEO = "https://bancodedados-rzj1.vercel.app/VID-20251210-WA0054.mp4";

export const PAGE_FLIP_AUDIO = "https://cdn.pixabay.com/download/audio/2024/09/20/audio_3327117e0b.mp3?filename=turning-pages-book-244247.mp3"; 

// Data oficial do início da história
export const OFFICIAL_START_DATE = "2024-03-05T00:00:00";

export const STORIES: Story[] = [
  // 1. O GRANDE SIM
  {
    id: 1,
    date: "O Grande Sim",
    image: "https://bancodedados-five.vercel.app/IMG-20260214-WA0022.jpg",
    caption: "O momento que marcou o início da nossa eternidade.",
    type: 'image'
  },

  // 2. NOSSO 1° NATAL
  {
    id: 2,
    date: "Nosso 1° Natal",
    image: "https://bancodedados-five.vercel.app/IMG-20260214-WA0008.jpg",
    caption: "Celebrando a luz do Natal e o brilho do nosso amor.",
    type: 'image'
  },

  // 3. TUDO É MELHOR COM VOCÊ (1 VÍDEO + 2 FOTOS)
  {
    id: 3,
    date: "Tudo é melhor com você",
    image: "https://bancodedados-five.vercel.app/VID-20260214-WA0040.mp4",
    caption: "Cada momento ao seu lado se torna inesquecível.",
    type: 'video'
  },
  {
    id: 4,
    date: "Tudo é melhor com você",
    image: "https://bancodedados-five.vercel.app/IMG-20260214-WA0037.jpg",
    caption: "A felicidade mora nos detalhes que compartilhamos.",
    type: 'image'
  },
  {
    id: 5,
    date: "Tudo é melhor com você",
    image: "https://bancodedados-five.vercel.app/IMG-20260214-WA0012.jpg",
    caption: "Sorrisos que iluminam meus dias e aquecem meu coração.",
    type: 'image'
  },

  // 4. QUANDO NOS TORNAMOS 3 (3 FOTOS)
  {
    id: 6,
    date: "Quando nos tornamos 3",
    image: "https://bancodedados-five.vercel.app/IMG-20251210-WA0142.jpg",
    caption: "O fruto do nosso amor chegou para completar nossa vida.",
    type: 'image'
  },
  {
    id: 7,
    date: "Quando nos tornamos 3",
    image: "https://bancodedados-five.vercel.app/IMG-20251210-WA0132.jpg",
    caption: "Um novo capítulo, o mais lindo da nossa história.",
    type: 'image'
  },
  {
    id: 8,
    date: "Quando nos tornamos 3",
    image: "https://bancodedados-five.vercel.app/20251210_230902.jpg",
    caption: "Amor que não cabe no peito, transborda em família.",
    type: 'image'
  },
];

export const BOOK_PAGES: BookPage[] = [
  // --- Spread 1: Hotel Transilvânia (O Tchan) ---
  { 
    id: 1, 
    side: 'left', 
    content: { 
      type: 'image', 
      // Cena 1
      value: 'https://bancodedados-five.vercel.app/1771050247373.png' 
    } 
  },
  { 
    id: 2, 
    side: 'right', 
    content: { 
      type: 'text', 
      value: 'HOTEL TRANSILVÂNIA\n\nDrácula:\n"O Tchan é algo que acontece uma vez na vida. Você olha nos olhos de alguém e sente..."\n\n(Foi assim quando te vi)' 
    } 
  },

  // --- Spread 2: Rio (Voando Juntos) ---
  { 
    id: 3, 
    side: 'left', 
    content: { 
      type: 'image', 
      // Cena 2
      value: 'https://bancodedados-five.vercel.app/1771050438215.png' 
    } 
  },
  { 
    id: 4, 
    side: 'right', 
    content: { 
      type: 'text', 
      value: 'RIO\n\nJade:\n"Nós somos pássaros de penas diferentes..."\n\nBlu:\n"...mas voamos melhor juntos."' 
    } 
  },

  // --- Spread 3: Enrolados (Lanternas) ---
  { 
    id: 5, 
    side: 'left', 
    content: { 
      type: 'image', 
      // Cena 3
      value: 'https://bancodedados-five.vercel.app/1771050555489.png' 
    } 
  },
  { 
    id: 6, 
    side: 'right', 
    content: { 
      type: 'text', 
      value: 'ENROLADOS\n\nFlynn:\n"Você era o meu sonho novo."\n\nRapunzel:\n"E você o meu."' 
    } 
  },

  // --- Spread 4: Shrek (Cena da Flor) ---
  { 
    id: 7, 
    side: 'left', 
    content: { 
      type: 'image', 
      // Cena 4
      value: 'https://bancodedados-five.vercel.app/1771051560369.png' 
    } 
  },
  { 
    id: 8, 
    side: 'right', 
    content: { 
      type: 'text', 
      value: 'SHREK\n\nShrek:\n"Vi essa flor e pensei em você, porque ela é bonita... e, bem, eu realmente não gosto dela, mas pensei que você ia gostar."\n\n(Você é o meu final feliz)' 
    } 
  },

  // --- Spread 5: A Dama e o Vagabundo ---
  { 
    id: 9, 
    side: 'left', 
    content: { 
      type: 'image', 
      // Cena 5
      value: 'https://bancodedados-five.vercel.app/e4a600242c97dfd83e20a6ada2fb80a7.jpg' 
    } 
  },
  { 
    id: 10, 
    side: 'right', 
    content: { 
      type: 'text', 
      value: 'A DAMA E O VAGABUNDO\n\nCanção:\n"Lado a lado com o seu amor...\nEsta noite o amor chegou."' 
    } 
  },
];

// Data provided in prompt: 10/12/2025 (DD/MM/YYYY format implied by language)
export const SPECIAL_DATE = "2025-12-10T00:00:00";