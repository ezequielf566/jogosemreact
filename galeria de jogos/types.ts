
import React from 'react';

export type ElementId = string;
export type ElementCategory = 'natureza' | 'agua' | 'vida' | 'humano' | 'sagrado' | 'clima';

export interface GameElement {
  id: ElementId;
  name: string;
  icon: React.ReactNode;
  color: string;
  category: ElementCategory;
  isInitial?: boolean;
}

export interface Combination {
  inputs: [ElementId, ElementId];
  output: ElementId;
}

export interface WorkspaceElement {
  instanceId: string;
  elementId: ElementId;
  x: number;
  y: number;
}
