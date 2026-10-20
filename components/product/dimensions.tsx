'use client';
import {useEffect,useId,useState} from 'react';
import Link from 'next/link';
import type {Product} from '@/data/products';
import {getVariants} from '@/data/product-knowledge';
import type {Copy,Locale} from '@/lib/i18n';
import {getV11Copy} from '@/lib/v11-copy';
import {AnimatedSwap} from '@/components/motion/animated-swap';
import {ProductVisual} from './product-visual';
import {Arrow} from '@/components/ui/primitives';
import {getDocument} from '@/data/documents';
export function Dimensions({product:p,copy:c,locale='en'}:{product:Product;copy:Copy;locale?:Locale}){
 const id=useId(),v=getV11Copy(locale),variants=getVariants(p.id);
 const initial=variants.find(row=>row.diameter===4.2)||variants[0];
 const [diameter,setDiameter]=useState(initial?.diameter||p.diameters[0]);const [length,setLength]=useState(initial?.length||0);
 useEffect(()=>{const query=new URLSearchParams(location.search),d=Number(query.get('diameter')),l=Number(query.get('length'));const selected=variants.find(row=>row.diameter===d&&row.length===l);if(selected){setDiameter(d);setLength(l)}},[p.id]);
 const rows=variants.filter(row=>row.diameter===diameter),selected=rows.find(row=>row.length===length)||rows[0];
 if(!selected)return <div className="dimensions-source"><p>{c[p.specCopy]}</p><p>{c.noReferences}</p></div>;
 const change=(d:number,l:number)=>{setDiameter(d);setLength(l);const query=new URLSearchParams(location.search);query.set('diameter',String(d));query.set('length',String(l));history.replaceState(history.state,'',location.pathname+'?'+query.toString()+location.hash)};
 const enquiry=`/${locale}/inquiry/?product=${p.id}&diameter=${selected.diameter}&length=${selected.length}`;
 return <section id={id} className={`dimension-explorer v11-dimension-explorer ${p.id==='promx'?'v7-dimension-explorer':''}`} aria-label={c.dimensions} data-product-configuration={p.id}>
 {p.id==='promx'&&<div className="dimension-visual"><ProductVisual product={p}/><p>{v.catalogueListed} / {p.catalogueName}</p><strong dir="ltr">Ø {diameter} × {selected.length} mm</strong></div>}
 <div className="dimension-controls"><div className="dimension-title"><span>{p.catalogueName}</span><h3>{v.dimensions}</h3><p>{v.allDimensions}</p></div>
 <fieldset className="dimension-fieldset"><legend>{c.diameter}</legend><div className="dimension-chips">{Array.from(new Set(variants.map(row=>row.diameter))).map(d=><label className="dimension-chip" key={d}><input type="radio" name={`${id}-diameter`} value={d} checked={diameter===d} onChange={()=>{const options=variants.filter(row=>row.diameter===d);change(d,options.some(row=>row.length===selected.length)?selected.length:options[0].length)}}/><span><bdi>{d.toFixed(d%1===0?1:d===3.75?2:1)}</bdi><small>mm</small></span></label>)}</div></fieldset>
 <fieldset className="dimension-fieldset"><legend>{c.selectLength}</legend><AnimatedSwap token={diameter} className="dimension-chips lengths">{rows.map(row=><label className="dimension-chip" key={row.length}><input type="radio" name={`${id}-length`} value={row.length} checked={row.length===selected.length} onChange={()=>change(diameter,row.length)}/><span><bdi>{row.length}</bdi><small>mm</small></span></label>)}</AnimatedSwap></fieldset>
 <AnimatedSwap token={`${diameter}-${selected.length}`} className="reference-panel" aria-live="polite"><div><span>{c.selected}</span><strong dir="ltr">Ø {selected.diameter} × {selected.length} mm</strong></div><div><span>{c.reference}</span>{selected.reference?<code data-testid="reference-output">{selected.reference}</code>:<p data-testid="reference-unavailable">{v.noSku}</p>}</div></AnimatedSwap>
 <div className="v11-configuration-actions"><Link href={enquiry} className="button" data-configuration-inquiry>{v.addInquiry}<Arrow/></Link><Link href={enquiry+'&purpose=quotation'} className="text-link">{v.quotation}<Arrow/></Link></div>
 <details className="reference-fallback" id="product-references"><summary>{c.showTable}</summary><div className="table-scroll"><table><caption>{p.catalogueName} · {v.catalogueListed}</caption><thead><tr><th scope="col">{c.length}</th><th scope="col">{c.reference}</th></tr></thead><tbody>{rows.map(row=><tr key={row.length}><td dir="ltr">{row.length} mm</td><td>{row.reference?<code>{row.reference}</code>:v.noSku}</td></tr>)}</tbody></table></div></details>
 <a className="v11-config-source text-link" href={`${getDocument(selected.source.documentId).url}#page=${selected.source.page}`} target="_blank" rel="noopener">{v.source} / {p.catalogueName}<Arrow/></a>
 </div></section>;
}
