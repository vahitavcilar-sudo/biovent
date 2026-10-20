'use client';
import {useEffect,useRef,useState} from 'react';
import type {Product} from '@/data/products';
import {mediaAssets,mediaReady,type MediaKey,type MediaAsset} from '@/data/media';
import type {Copy,Locale} from '@/lib/i18n';
import {MediaStage} from './media-stage';
import {StaticImage} from '@/components/ui/static-image';
import {getDocument} from '@/data/documents';
import {Arrow,Label} from '@/components/ui/primitives';
const translations={en:{title:'Technical animation',open:'Open animation player',close:'Close animation player',note:'Original manufacturer animation. English visual labels.',source:'Catalogue'},de:{title:'Technische Animation',open:'Animationsplayer öffnen',close:'Animationsplayer schließen',note:'Originalanimation des Herstellers. Englische Bildbeschriftungen.',source:'Katalog'},tr:{title:'Teknik animasyon',open:'Animasyon oynatıcısını aç',close:'Animasyon oynatıcısını kapat',note:'Üreticinin özgün animasyonu. Görsel etiketler İngilizcedir.',source:'Katalog'},ar:{title:'رسوم متحركة تقنية',open:'فتح مشغّل الرسوم المتحركة',close:'إغلاق مشغّل الرسوم المتحركة',note:'رسوم متحركة أصلية من الشركة المصنّعة. التسميات المرئية بالإنجليزية.',source:'الكتالوج'}};
export function TechnicalFilmSection({product,mediaKey,locale,copy:c}:{product:Product;mediaKey:MediaKey;locale:Locale;copy:Copy}){
 const media:MediaAsset=mediaAssets[mediaKey],t=translations[locale];const [opened,setOpened]=useState(false);const open=useRef<HTMLButtonElement>(null);const captionReady=media.requiresCaptions===false?!!media.transcript?.[locale]:!!media.captions?.[locale]&&!!media.transcript?.[locale];
 useEffect(()=>{if(!opened)return;const key=(event:KeyboardEvent)=>{if(event.key==='Escape'&&!document.fullscreenElement){setOpened(false);open.current?.focus()}};document.addEventListener('keydown',key);return()=>document.removeEventListener('keydown',key)},[opened]);
 // Until source/audio/caption review is complete, no empty or misleading film section ships.
 if(!mediaReady(media)||!captionReady)return null;
 const catalogue=getDocument(product.catalogue);return <section className="technical-film-section section-pad container" id={`film-${product.id}`}><div className="technical-film-heading"><Label>{product.catalogueName} / {t.title}</Label><h2>{t.title}</h2><p>{c[product.description]}</p></div><div className="technical-film-player"><MediaStage mediaKey={mediaKey} locale={locale} enabled={opened}><StaticImage src={media.poster} alt={`${product.name} — ${t.title}`} width={media.desktop[0]?.width||1920} height={media.desktop[0]?.height||1080} sizes="(max-width:768px) 90vw,80vw"/></MediaStage>{!opened&&<button ref={open} className="technical-film-open" onClick={()=>setOpened(true)} aria-controls={`film-${product.id}-controls`}>{t.open}<span aria-hidden="true">▷</span></button>}</div><div className="technical-film-controls" id={`film-${product.id}-controls`}>{opened&&<button onClick={()=>{setOpened(false);requestAnimationFrame(()=>open.current?.focus())}}>{t.close}</button>}<p>{t.note}</p><a className="text-link" href={`${catalogue.url}#page=${product.page}`} target="_blank" rel="noopener">{t.source}<Arrow/></a></div></section>
}
