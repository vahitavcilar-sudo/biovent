'use client';
import {setMediaSuspended} from '@/lib/media-controller';
import {useEffect,useRef} from 'react';
import {usePathname,useRouter} from 'next/navigation';
import {basePath} from '@/lib/paths';
import {motion,reducedMotion} from '@/lib/motion';
export function PageTransition(){
 const pathname=usePathname();const router=useRouter();const layer=useRef<HTMLDivElement>(null);const pending=useRef(false);const destination=useRef<string|null>(null);const timer=useRef<ReturnType<typeof setTimeout>|null>(null);const watchdog=useRef<ReturnType<typeof setTimeout>|null>(null);const animation=useRef<Animation|null>(null);
 const ghost=useRef<HTMLImageElement|null>(null);const ghostAnimation=useRef<Animation|null>(null);
 const clear=()=>{ghostAnimation.current?.cancel();ghost.current?.remove();ghost.current=null;setMediaSuspended('route',false);if(timer.current)clearTimeout(timer.current);if(watchdog.current)clearTimeout(watchdog.current);animation.current?.cancel();animation.current=null;pending.current=false;delete document.documentElement.dataset.routeState;delete document.documentElement.dataset.routeArrival;if(layer.current)layer.current.style.visibility='hidden';};
 useEffect(()=>{
  const navigate=(href:string,link?:HTMLAnchorElement)=>{
   const target=new URL(href,location.href);if(target.origin!==location.origin)return;
   const local=basePath&&target.pathname.startsWith(basePath+'/')?target.pathname.slice(basePath.length):target.pathname;
   const route=local+target.search+target.hash;
   if(target.pathname===location.pathname&&target.search===location.search){clear();router.push(route);return;}
   clear();if(reducedMotion()){router.push(route);return;}
   const source=(link||document.activeElement)?.closest('.product-editorial,.v4-system-row,.v4-hero-copy,.showroom-scene,.product-hero');
   const productRoute=/\/products\/(smart|promx|monoblock|zygoma)\/$/.test(target.pathname);
   const image=productRoute?source?.querySelector<HTMLImageElement>('.showroom-implant,.implant-image'):null;
   if(image&&image.complete&&image.naturalWidth){const bounds=image.getBoundingClientRect();if(bounds.width&&bounds.height){const clone=document.createElement('img');clone.src=image.currentSrc;clone.alt='';clone.setAttribute('aria-hidden','true');clone.className='route-product-ghost';Object.assign(clone.style,{left:`${bounds.left}px`,top:`${bounds.top}px`,width:`${bounds.width}px`,height:`${bounds.height}px`});document.body.append(clone);ghost.current=clone;ghostAnimation.current=clone.animate([{transform:'scale(1)'},{transform:'scale(1.04)'}],{duration:motion.routeCover,easing:motion.enter,fill:'forwards'});}}
   setMediaSuspended('route',true);destination.current=route;pending.current=true;document.documentElement.dataset.routeState='leaving';const el=layer.current;
   if(el){el.style.visibility='visible';animation.current=el.animate([{opacity:0},{opacity:.97}],{duration:motion.routeCover,easing:motion.standard,fill:'forwards'});}
   timer.current=setTimeout(()=>router.push(route),motion.routeCover-30);watchdog.current=setTimeout(clear,motion.routeTimeout);
  };
  const click=(event:MouseEvent)=>{if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;const link=(event.target as Element)?.closest<HTMLAnchorElement>('a[href]');if(!link||link.hasAttribute('download')||link.target&&link.target!=='_self')return;const target=new URL(link.href,location.href);if(target.origin!==location.origin||!target.pathname.startsWith(basePath+'/')||/\.[a-z0-9]+$/i.test(target.pathname))return;if(target.pathname===location.pathname&&target.search===location.search)return;event.preventDefault();event.stopPropagation();navigate(link.href,link);};
  const custom=(event:Event)=>navigate((event as CustomEvent<string>).detail);
  const preference=matchMedia('(prefers-reduced-motion: reduce)');const changed=()=>{if(reducedMotion()){const target=pending.current?destination.current:null;clear();if(target)router.push(target);}};
  document.addEventListener('click',click,true);document.addEventListener('biovent:navigate',custom);preference.addEventListener('change',changed);document.addEventListener('biovent:motion-changed',changed);document.documentElement.dataset.routeMotion='ready';
  return()=>{document.removeEventListener('click',click,true);document.removeEventListener('biovent:navigate',custom);preference.removeEventListener('change',changed);document.removeEventListener('biovent:motion-changed',changed);delete document.documentElement.dataset.routeMotion;clear();};
 },[router]);
 useEffect(()=>{if(!pending.current)return;const el=layer.current;if(!el){clear();return;}if(timer.current)clearTimeout(timer.current);if(watchdog.current)clearTimeout(watchdog.current);animation.current?.cancel();document.documentElement.dataset.routeArrival='true';delete document.documentElement.dataset.routeState;const targetImage=document.querySelector<HTMLImageElement>('.product-hero .implant-image,.v7-shared-inspection .implant-image');const clone=ghost.current;
 if(clone&&targetImage){const from=clone.getBoundingClientRect(),to=targetImage.getBoundingClientRect();if(to.width&&to.height){ghostAnimation.current?.cancel();ghostAnimation.current=clone.animate([{transform:'scale(1.04)',opacity:1},{transform:`translate(${to.left-from.left}px,${to.top-from.top}px) scale(${Math.min(to.width/from.width,to.height/from.height)})`,opacity:0}],{duration:motion.routeClear,easing:motion.enter,fill:'forwards'});}}
 animation.current=el.animate([{opacity:.97},{opacity:0}],{duration:motion.routeClear,easing:motion.enter,fill:'forwards'});const current=animation.current;current.finished.then(()=>{if(animation.current===current){clear();document.getElementById('main')?.focus({preventScroll:true});}}).catch(()=>{});watchdog.current=setTimeout(clear,motion.routeTimeout);},[pathname]);
 return <div ref={layer} className="route-transition-layer" aria-hidden="true"><span/></div>;
}
