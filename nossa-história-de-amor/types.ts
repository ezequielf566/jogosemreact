export interface Story {
  id: number;
  date: string;
  image: string;
  caption: string;
  type?: 'image' | 'video';
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}