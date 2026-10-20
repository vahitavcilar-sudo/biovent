import {clamp} from './motion';
export const sceneTimelines={hero:{exit:[.04,.28],focus:[.22,.68],handoff:[.68,1]},collection:{enter:[0,.3],hold:[.3,.7],exit:[.7,1]},inspection:{scale:[1,1.34],surface:[.8,1],activeViewport:.48},video:{entryAnchor:.75,exitBuffer:.5},navigation:{activeViewport:.35}} as const;
export function interval(progress:number,range:readonly [number,number]){return clamp((progress-range[0])/(range[1]-range[0]));}
export const inspectionFrames=[{x:0,y:0,scale:1,origin:'50% 50%'},{x:-12,y:20,scale:1.22,origin:'49% 18%'},{x:8,y:7,scale:1.12,origin:'55% 30%'},{x:-8,y:-4,scale:1.17,origin:'53% 52%'},{x:8,y:-12,scale:1.34,origin:'63% 59%'},{x:0,y:-4,scale:1.08,origin:'55% 72%'}] as const;
