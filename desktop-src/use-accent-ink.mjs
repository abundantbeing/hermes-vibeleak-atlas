import {useLayoutEffect} from 'react';
import {useTheme} from '@hermes/plugin-sdk';
import {pickAccentInk} from './workbench.mjs';
export function useAccentInk(){
  const theme=useTheme();
  useLayoutEffect(()=>{const canvas=document.createElement('canvas');canvas.width=canvas.height=1;const context=canvas.getContext('2d',{willReadFrequently:true}),style=getComputedStyle(document.documentElement),accent=style.getPropertyValue('--ui-accent').trim();if(!context||!accent)return;const sample=value=>{context.clearRect(0,0,1,1);context.fillStyle=accent;context.fillRect(0,0,1,1);context.fillStyle=value;context.fillRect(0,0,1,1);return [...context.getImageData(0,0,1,1).data].slice(0,3)};const candidates=Object.fromEntries(['--ui-text-primary','--ui-bg-sidebar','--ui-bg-editor','--ui-bg-chrome'].filter(name=>style.getPropertyValue(name).trim()).map(name=>[name,sample(style.getPropertyValue(name).trim())]));const ink=pickAccentInk(sample(accent),candidates);document.documentElement.style.setProperty('--wba-accent-ink',`var(${ink})`)},[theme]);
}
