'use client';
import {useEffect,useState} from 'react';
import type {Locale} from '@/lib/i18n';
import {getV7Copy} from '@/lib/v7-copy';
import {setMediaSuspended} from '@/lib/media-controller';
export function MotionToggle({locale}:{locale:Locale}){const [paused,setPaused]=useState(false);const v=getV7Copy(locale);useEffect(()=>{const sync=()=>setPaused(document.documentElement.dataset.motionPaused==='true');sync();document.addEventListener('biovent:motion-changed',sync);return()=>document.removeEventListener('biovent:motion-changed',sync)},[]);return <button className="motion-toggle" aria-pressed={paused} onClick={()=>{const next=!paused;document.documentElement.dataset.motionPaused=String(next);setMediaSuspended('user',next);document.dispatchEvent(new Event('biovent:motion-changed'))}}>{paused?v.resumeMotion:v.pauseMotion}</button>}
