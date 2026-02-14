export interface Story {
  id: number;
  date: string;
  image: string;
  caption: string;
  type?: 'image' | 'video';
}

export interface BookPage {
  id: number;
  content: {
    type: 'image' | 'text';
    value: string;
  };
  side: 'left' | 'right';
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}