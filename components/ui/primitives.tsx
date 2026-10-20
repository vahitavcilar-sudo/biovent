import Link from 'next/link';
import type {ReactNode} from 'react';
export function Arrow({down=false}:{down?:boolean}){return <svg className={down?undefined:'directional-arrow'} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d={down?'M12 4v16m-6-6 6 6 6-6':'M5 19 19 5M5 5h14v14'}/></svg>}
export function Button({href,children,secondary=false}:{href:string;children:ReactNode;secondary?:boolean}){return <Link href={href} className={`button ${secondary?'button-secondary':''}`}>{children}<Arrow/></Link>}
export function Lines({text}:{text:string}){return <>{text.split(/<br\s*\/?>|\n/).map((line,i)=><span className="text-line" key={i}><span className="line-inner">{line}</span></span>)}</>}
export function Label({children}:{children:ReactNode}){return <p className="eyebrow"><span aria-hidden="true"/>{children}</p>}
export function Rule({number,label}:{number:string;label:string}){return <div className="section-rule"><span>{number} / {label}</span><span aria-hidden="true">BIOVENT — DENTAL IMPLANT SYSTEMS</span></div>}
