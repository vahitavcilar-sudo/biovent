'use client';
import {useEffect,useId,useRef,useState,type CSSProperties,type ReactNode,type KeyboardEvent,type PointerEvent} from 'react';
import type {Product} from '@/data/products';
import type {Locale} from '@/lib/i18n';
import {StaticImage} from '@/components/ui/static-image';
import type {getViewerControls} from '@/lib/viewer-controls';
import {Arrow} from '@/components/ui/primitives';
import {clamp} from '@/lib/motion';
import type {getV13Copy} from '@/lib/v13-copy';
import {DeferredMedia} from '@/components/media/deferred-media';
import {MotionToggle} from '@/components/media/motion-toggle';

export interface ViewerFeature {id:string;title:string;explanation:string;visible?:string;sourceUrl:string;sourceLabel:string;origin:readonly [number,number];zoom:number;hotspot?:readonly [number,number]}
export function TechnicalViewer({product,locale,features,labels,controls}:{product:Product;locale:Locale;features:readonly ViewerFeature[];labels:ReturnType<typeof getV13Copy>['viewer'];controls:ReturnType<typeof getViewerControls>}){
 const t=controls,id=useId(),viewport=useRef<HTMLDivElement>(null),drag=useRef<{x:number;y:number;panX:number;panY:number}|null>(null);
 const [selected,setSelected]=useState(0),[zoom,setZoom]=useState(1),[pan,setPan]=useState({x:0,y:0}),[size,setSize]=useState({width:0,height:0}),[ready,setReady]=useState(false),[origin,setOrigin]=useState<readonly [number,number]>([50,50]),[camera,setCamera]=useState('full');
 const feature=features[selected]||features[0];
 useEffect(()=>{const el=viewport.current;if(!el)return;const update=()=>{const ratio=product.imageWidth/product.imageHeight,w=Math.min(el.clientWidth,el.clientHeight*ratio);setSize({width:w,height:w/ratio});setPan({x:0,y:0});setReady(true)};update();const observer=new ResizeObserver(update);observer.observe(el);return()=>observer.disconnect()},[product.imageWidth,product.imageHeight]);
 const reset=()=>{setZoom(1);setPan({x:0,y:0});setOrigin([50,50]);setCamera('full')};
 const changeZoom=(value:number)=>{setZoom(clamp(value,1,2.4));setPan({x:0,y:0})};
 const choose=(index:number)=>{const f=features[index];setSelected(index);setOrigin(f.origin);setCamera(f.id);setZoom(f.zoom);setPan({x:clamp((50-f.origin[0])*size.width/100,-size.width*(f.zoom-1)*.5,size.width*(f.zoom-1)*.5),y:clamp(((['connection','collar','platform'].includes(f.id)?30:f.id==='apex'?40:50)-f.origin[1])*size.height/100,-size.height*(f.zoom-1)*.5,size.height*(f.zoom-1)*.5)})};
 const move=(x:number,y:number)=>{const limitX=size.width*(zoom-1)*.5,limitY=size.height*(zoom-1)*.5;setPan(old=>({x:clamp(old.x+x,-limitX,limitX),y:clamp(old.y+y,-limitY,limitY)}))};
 const key=(event:KeyboardEvent<HTMLDivElement>)=>{if(event.target!==event.currentTarget)return;if(event.key==='+'||event.key==='='){event.preventDefault();changeZoom(zoom+.2)}else if(event.key==='-'){event.preventDefault();changeZoom(zoom-.2)}else if(event.key==='0'||event.key==='Escape'){event.preventDefault();reset()}else if(zoom>1&&['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)){event.preventDefault();move(event.key==='ArrowLeft'?24:event.key==='ArrowRight'?-24:0,event.key==='ArrowUp'?24:event.key==='ArrowDown'?-24:0)}};
 const pointerDown=(event:PointerEvent<HTMLDivElement>)=>{if(zoom<=1||event.pointerType!=='mouse'||event.button!==0||(event.target as HTMLElement).closest('button,a'))return;drag.current={x:event.clientX,y:event.clientY,panX:pan.x,panY:pan.y};event.currentTarget.setPointerCapture(event.pointerId)};
 const pointerMove=(event:PointerEvent<HTMLDivElement>)=>{const d=drag.current;if(!d)return;const limitX=size.width*(zoom-1)*.5,limitY=size.height*(zoom-1)*.5;setPan({x:clamp(d.panX+event.clientX-d.x,-limitX,limitX),y:clamp(d.panY+event.clientY-d.y,-limitY,limitY)})};
 const imageView=(view:'full'|'body'|'apex')=>{if(view==='full'){reset();return}const o:readonly [number,number]=view==='body'?[50,product.id==='zygoma'?59:55]:[product.id==='smart'?62:50,product.id==='monoblock'?84:93];const z=view==='body'?1.7:2.4;setOrigin(o);setCamera(view);setZoom(z);setPan({x:(50-o[0])*size.width/100,y:clamp(((view==='apex'?40:50)-o[1])*size.height/100,-size.height*(z-1)*.5,size.height*(z-1)*.5)})};
 return <div className={`technical-viewer technical-viewer-${product.id}`} data-viewer-product={product.id} data-camera-view={camera}>
  <div className="technical-viewer-stage">
   <div className="technical-viewer-viewport" ref={viewport} tabIndex={0} role="group" aria-label={`${product.name} · ${t.imageViewer}`} aria-describedby={`${id}-help`} data-zoomed={zoom>1} onKeyDown={key} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={()=>{drag.current=null}} onPointerCancel={()=>{drag.current=null}} onLostPointerCapture={()=>{drag.current=null}}>
    <div className="technical-viewer-grid" aria-hidden="true"/>
    <div className="technical-viewer-canvas" style={{width:size.width||'100%',height:size.height||'100%','--viewer-zoom':zoom,'--viewer-pan-x':`${pan.x}px`,'--viewer-pan-y':`${pan.y}px`,'--viewer-origin':`${origin[0]}% ${origin[1]}%`} as CSSProperties}>
     <div className="technical-viewer-transform"><DeferredMedia><StaticImage src={product.image} width={product.imageWidth} height={product.imageHeight} alt={product.name} sizes="(max-width:768px) 180vw,90vw" draggable={false} className="technical-viewer-image"/></DeferredMedia>
      {ready&&features.map((f,index)=>f.hotspot&&<button key={f.id} className="viewer-hotspot" tabIndex={zoom===1?0:-1} aria-label={`${String(index+1).padStart(2,'0')} ${t.inspect}: ${f.title}`} aria-pressed={selected===index} aria-controls={`${id}-feature`} style={{left:`${f.hotspot[0]}%`,top:`${f.hotspot[1]}%`}} onClick={()=>choose(index)}><span aria-hidden="true">{String(index+1).padStart(2,'0')}</span></button>)}
     </div>
    </div>
    {product.id==='smart'&&feature?.id==='surface'&&<figure className="surface-sample"><StaticImage src="/images/editorial/surface-detail.png" width={168} height={168} alt={labels.surfaceCaption}/><figcaption>{labels.surfaceCaption}</figcaption></figure>}
    <span className="technical-viewer-scale" aria-hidden="true">{Math.round(zoom*100)}%</span>
   </div>
   <div className="technical-image-views" role="group" aria-label={labels.views}>{(['full','body','apex'] as const).map(view=><button key={view} type="button" data-image-view={view} aria-pressed={camera===view} onClick={()=>imageView(view)}>{labels[view]}</button>)}</div><div className="technical-viewer-toolbar" role="group" aria-label={t.viewControls}>
    <button type="button" aria-label={t.zoomOut} disabled={zoom<=1} onClick={()=>changeZoom(zoom-.2)}>−</button>
    <output aria-label={t.zoomLevel}>{Math.round(zoom*100)}%</output>
    <button type="button" aria-label={t.zoomIn} disabled={zoom>=2.4} onClick={()=>changeZoom(zoom+.2)}>+</button>
    <button type="button" className="viewer-reset" onClick={reset}>{t.reset}</button>
   </div>
   <p className="technical-viewer-help" id={`${id}-help`}>{t.controlsHelp}</p><MotionToggle locale={locale}/>
  </div>
  <div className="technical-viewer-inspector">
   <p className="eyebrow">{t.featureNavigation}</p>
   <div className="technical-feature-list" role="group" aria-label={t.featureNavigation}>{features.map((f,index)=><button key={f.id} type="button" data-feature-id={f.id} aria-pressed={selected===index} aria-controls={`${id}-feature`} onClick={()=>choose(index)}><span aria-hidden="true">{String(index+1).padStart(2,'0')}</span><span>{f.title}</span><Arrow/></button>)}</div>
   <div id={`${id}-feature`} aria-live="polite" aria-atomic="true">{features.map((f,index)=><div className="technical-feature-detail" key={f.id} hidden={index!==selected}><p className="technical-feature-index">{String(index+1).padStart(2,'0')} / {String(features.length).padStart(2,'0')}</p><h3>{f.title}</h3><p>{f.explanation}</p><div className="feature-visual-context"><span>{labels.visible}</span><p>{f.visible}</p></div><details><summary>{t.sourceDetail}</summary><p>{t.sourceContext}</p><a className="text-link" href={f.sourceUrl} target="_blank" rel="noopener">{f.sourceLabel}<Arrow/></a></details></div>)}</div>
   <p className="technical-viewer-authentic">{labels.imageNote}</p>
  </div>
 </div>
}

export function ConfigurationLink({children,className='text-link'}:{children:ReactNode;className?:string}){return <a className={className} href="#product-technical" onClick={()=>document.dispatchEvent(new CustomEvent('biovent:product-tab',{detail:1}))}>{children}<span aria-hidden="true">↓</span></a>}
