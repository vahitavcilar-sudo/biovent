'use client';
import {useEffect, useRef, type ReactNode} from 'react';
import {inspectionFrames,interval,sceneTimelines} from '@/lib/scene-timelines';
import {clamp, reducedMotion, subscribeScroll} from '@/lib/motion';
export function CinematicHero({children,continuation}: {children: ReactNode;continuation?:ReactNode}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const node = ref.current; if (!node) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    let frame = 0, targetX = 0, targetY = 0, x = 0, y = 0;
    const draw = () => { frame = 0; x += (targetX - x) * .16; y += (targetY - y) * .16; node.style.setProperty('--pointer-x', `${x.toFixed(2)}px`); node.style.setProperty('--pointer-y', `${y.toFixed(2)}px`); if (Math.abs(targetX-x)+Math.abs(targetY-y) > .08) frame = requestAnimationFrame(draw); };
    const pointer = (event: PointerEvent) => { if (reducedMotion() || !fine.matches || event.pointerType !== 'mouse') return; const r = node.getBoundingClientRect(); targetX = clamp((event.clientX-r.left)/r.width,0,1)*12-6; targetY = clamp((event.clientY-r.top)/r.height,0,1)*12-6; if (!frame) frame = requestAnimationFrame(draw); };
    const reset = () => { targetX = targetY = 0; if (!frame) frame = requestAnimationFrame(draw); };
    const clear = () => { cancelAnimationFrame(frame); frame = 0; x = y = targetX = targetY = 0; node.style.setProperty('--pointer-x','0px'); node.style.setProperty('--pointer-y','0px'); node.style.setProperty('--hero-exit','0'); };
    const inspect=(event:Event)=>{const detail=(event as CustomEvent<{scope:string;chapter:number}>).detail;if(detail.scope!=='hero')return;const pose=inspectionFrames[Math.max(0,Math.min(5,detail.chapter))];node.dataset.heroFocus=String(detail.chapter);node.style.setProperty('--hero-inspection-scale',String(preference.matches?1:pose.scale));node.style.setProperty('--hero-inspection-origin',pose.origin);node.style.setProperty('--hero-inspection-x',`${preference.matches?0:pose.x}px`);node.style.setProperty('--hero-inspection-y',`${preference.matches?0:pose.y}px`);};document.addEventListener('biovent:inspect',inspect);
    preference.addEventListener('change', clear);document.addEventListener('biovent:motion-changed',clear); fine.addEventListener('change', reset);
    node.addEventListener('pointermove', pointer, {passive:true}); node.addEventListener('pointerleave', reset);
    const unsubscribe = subscribeScroll(() => { if (reducedMotion()) return; const r = node.getBoundingClientRect(); if (r.bottom < 0) return; const progress=clamp(-r.top / Math.max(r.height-innerHeight*.5,1));node.style.setProperty('--hero-exit',String(progress));node.style.setProperty('--scene-focus',String(interval(progress,sceneTimelines.hero.focus)));node.style.setProperty('--scene-handoff',String(interval(progress,sceneTimelines.hero.handoff))); });
    return () => { document.removeEventListener('biovent:inspect',inspect);unsubscribe(); cancelAnimationFrame(frame); preference.removeEventListener('change', clear);document.removeEventListener('biovent:motion-changed',clear); fine.removeEventListener('change', reset); node.removeEventListener('pointermove', pointer); node.removeEventListener('pointerleave', reset); };
  }, []);
  return <section ref={ref} data-media-scroll-scope className="v4-hero v5-hero v6-hero v7-hero"><div className="v5-depth-grid" aria-hidden="true"/><div className="v5-precision-axis" aria-hidden="true"><span>01 / BIOSMART</span></div>{children}{continuation&&<div className="v6-continuation container">{continuation}</div>}</section>;
}
