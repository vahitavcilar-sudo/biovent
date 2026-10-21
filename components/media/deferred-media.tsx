'use client';
import {useEffect,useRef,useState,type ReactNode} from 'react';
// Native image lazy-loading can fetch several screens ahead. Keep noncritical media near its actual viewport.
export function DeferredMedia({children}:{children:ReactNode}){const root=useRef<HTMLDivElement>(null),[visible,setVisible]=useState(false);useEffect(()=>{if(!('IntersectionObserver'in window)){setVisible(true);return}const io=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){setVisible(true);io.disconnect()}},{rootMargin:'220px'});if(root.current)io.observe(root.current);return()=>io.disconnect()},[]);return <div className="deferred-media" ref={root} data-media-visible={visible}>{visible?children:<noscript>{children}</noscript>}</div>}
