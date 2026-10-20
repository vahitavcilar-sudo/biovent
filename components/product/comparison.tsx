'use client';
import {useId,useState} from 'react';
import Link from 'next/link';
import {products,type Product,type ProductId} from '@/data/products';
import {getDocument} from '@/data/documents';
import {getProductKnowledge} from '@/data/product-knowledge';
import type {Copy,Locale} from '@/lib/i18n';
import {StaticImage} from '@/components/ui/static-image';
import {getShowroomCopy} from '@/lib/showroom';
import {getV11ResourceCopy} from '@/lib/v11-resource-copy';
import {Arrow} from '@/components/ui/primitives';
export function Comparison({locale,copy:c}:{locale:Locale;copy:Copy}){
 const t=getShowroomCopy(locale),v=getV11ResourceCopy(locale),id=useId();
 const [selected,setSelected]=useState<ProductId[]>(products.map(p=>p.id)),[focused,setFocused]=useState(false);
 const canFocus=selected.length>=2&&selected.length<=3;
 const visible=focused?products.filter(p=>selected.includes(p.id)):products;
 const toggle=(productId:ProductId)=>setSelected(old=>old.includes(productId)?old.filter(p=>p!==productId):[...old,productId]);
 const overview=()=>{setFocused(false);setSelected(products.map(p=>p.id))};
 const rows:{label:string;numeric?:boolean;note?:(p:Product)=>string;value:(p:Product)=>string}[]=[
  {label:c.design,value:p=>c[p.design]},
  {label:c.connection,value:p=>c[p.connection]+(p.id==='promx'?' · 2.42 mm':'')},
  {label:c.diameter,numeric:true,value:p=>p.diameters.join(' / ')+' mm'},
  {label:c.length,numeric:true,value:p=>p.lengths.length?p.lengths.join(' / ')+' mm':v.unknown},
  {label:v.surface,value:p=>getProductKnowledge(p.id).surface?.label||v.unknown},
  {label:v.prosthetics,value:p=>{const entries=getProductKnowledge(p.id).prosthetics;return entries.length?`${entries.length} ${v.componentListings}`:v.unknown},note:p=>getProductKnowledge(p.id).prosthetics.length?v.familyScope:''},
 ];
 return <section className="comparison-section section-pad v8-comparison v11-comparison" data-focused={focused} id="comparison"><div className="container"><div className="v11-compare-intro"><div><p className="eyebrow">BIOVENT / {c.collection}</p><h2>{c.compare}</h2></div><p>{v.focusHelp}</p></div>
 <div className="v8-compare-controls v11-compare-controls" role="group" aria-label={t.compare}>{products.map(p=><button type="button" key={p.id} data-compare-system={p.id} aria-pressed={selected.includes(p.id)} disabled={selected.includes(p.id)?selected.length===(focused?2:1):focused&&selected.length===3} onClick={()=>toggle(p.id)}>{p.id.toUpperCase()}<span aria-hidden="true">{selected.includes(p.id)?'−':'+'}</span></button>)}<button type="button" onClick={overview}>{t.all}</button></div>
 <div className="v11-compare-mode"><p id={`${id}-help`}>{focused?v.focusedHint:v.selectionLimit}</p><button type="button" disabled={!focused&&!canFocus} aria-describedby={`${id}-help`} data-compare-focus={focused} onClick={()=>{if(focused)setFocused(false);else if(canFocus)setFocused(true)}}>{focused?v.overview:v.focusAction}</button></div>
 <p className="v11-compare-status" role="status" aria-live="polite" aria-atomic="true">{focused?v.focused:v.overview} · {v.selection}: <bdi>{selected.length}</bdi></p>
 <div className="table-scroll" tabIndex={0} role="region" aria-label={c.compare}><table className="comparison-table v8-compare-table v11-compare-table"><caption>{v.dimensionsNote} {c.contentNote}</caption><thead><tr><th scope="col">{c.system}</th>{visible.map(p=><th scope="col" key={p.id} data-selected={selected.includes(p.id)}><div className={`compare-preview compare-${p.id}`}><StaticImage src={p.image} alt="" width={p.imageWidth} height={p.imageHeight} sizes="110px"/></div><Link href={`/${locale}/products/${p.id}/`}>{p.name}<Arrow/></Link><small>{p.catalogueName}</small></th>)}</tr></thead><tbody>{rows.map(row=><tr key={row.label}><th scope="row">{row.label}</th>{visible.map(p=><td key={p.id} data-selected={selected.includes(p.id)} dir={row.numeric?'ltr':undefined}>{row.value(p)}{row.note?.(p)&&<span className="v11-source-value">{row.note(p)}</span>}</td>)}</tr>)}<tr><th scope="row">{v.catalogue}</th>{visible.map(p=><td key={p.id} data-selected={selected.includes(p.id)}><a href={`${getDocument(p.catalogue).url}#page=${p.page}`} target="_blank" rel="noopener" className="v11-catalogue-link">{v.viewCatalog}<Arrow/></a><span className="v11-source-value">{p.catalogueName} / PDF <bdi>{p.page}</bdi></span></td>)}</tr><tr><th scope="row">{c.technicalInfo}</th>{visible.map(p=><td key={p.id} data-selected={selected.includes(p.id)}><Link className="text-link" href={`/${locale}/products/${p.id}/#product-technical`}>{c.viewSystem}<Arrow/></Link></td>)}</tr></tbody></table></div>
 </div></section>;
}
