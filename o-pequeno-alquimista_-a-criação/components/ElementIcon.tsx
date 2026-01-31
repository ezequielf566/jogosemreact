
import React from 'react';
import { GameElement } from '../types';

interface ElementIconProps {
  element: GameElement;
  size?: number;
}

const ElementIcon: React.FC<ElementIconProps> = ({ element, size = 24 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ 
        filter: 'drop-shadow(0 3px 2px rgba(0,0,0,0.3)) drop-shadow(0 0 1px rgba(0,0,0,0.1))' 
      }}
      className="overflow-visible"
    >
      <g stroke="rgba(0,0,0,0.15)" strokeWidth="0.5">
        {element.icon}
      </g>
    </svg>
  );
};

export default ElementIcon;
