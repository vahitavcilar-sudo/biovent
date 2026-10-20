'use client';
import {useLayoutEffect,useRef,type ReactNode} from 'react';
import {motion,reducedMotion} from '@/lib/motion';
export function AnimatedSwap({children,token,className='',direction=0}:{children:ReactNode;token:string|number;className?:string;direction?:number}){
 const ref=useRef<HTMLDivElement>(null);const previous=useRef(token);
 useLayoutEffect(()=>{const changed=previous.current!==token;previous.current=token;if(!changed||reducedMotion()||['native','keyboard'].includes(document.documentElement.dataset.formTransition||'')||!ref.current||ref.current.querySelector(':focus-visible'))return;const sign=document.documentElement.dir==='rtl'?-1:1;const a=ref.current.animate([{opacity:.15,transform:direction?`translateX(${direction*sign*18}px)`:'translateY(6px)'},{opacity:1,transform:'none'}],{duration:motion.ui,easing:motion.enter,fill:'backwards'});return()=>a.cancel();},[token,direction]);
 return <div ref={ref} className={className}>{children}</div>;
}
