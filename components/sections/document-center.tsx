'use client';
import {useId,useState} from 'react';
import {StaticImage as Image} from '@/components/ui/static-image';
import type {Copy,Locale} from '@/lib/i18n';
import {documents} from '@/data/documents';
import {products,type ProductId} from '@/data/products';
import {Arrow,Label} from '@/components/ui/primitives';
import {getV11ResourceCopy} from '@/lib/v11-resource-copy';
export function DocumentCenter({copy:c,filters=true,locale='en'}:{copy:Copy;filters?:boolean;locale?:Locale}){
 const t=getV11ResourceCopy(locale),id=useId();
 const [filter,setFilter]=useState('all'),[query,setQuery]=useState(''),[family,setFamily]=useState<ProductId|'all'>('all'),[category,setCategory]=useState('all');
 const reset=()=>{setFilter('all');setQuery('');setFamily('all');setCategory('all')};
 const needle=query.trim().toLocaleLowerCase(locale);
 const shown=documents.filter(d=>{
  const families=products.filter(p=>p.catalogue===d.id);
  return (filter==='all'||d.id===filter)&&(family==='all'||families.some(p=>p.id===family))&&(category==='all'||category==='implant-catalogue')&&(!needle||[c[d.title],c[d.description],t.implantCatalogues,t.english,...families.flatMap(p=>[p.id,p.name,p.catalogueName])].join(' ').toLocaleLowerCase(locale).includes(needle));
 });
 return <div className="document-center v11-document-center">
 {filters&&<><div className="v11-resource-toolbar"><div className="v11-resource-search"><label htmlFor={`${id}-search`}>{t.search}</label><input id={`${id}-search`} type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder={t.searchHint}/></div><div><label htmlFor={`${id}-family`}>{t.family}</label><select id={`${id}-family`} value={family} onChange={e=>setFamily(e.target.value as ProductId|'all')}><option value="all">{t.allFamilies}</option>{products.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select></div><div><label htmlFor={`${id}-category`}>{t.category}</label><select id={`${id}-category`} value={category} onChange={e=>setCategory(e.target.value)}><option value="all">{t.allCategories}</option><option value="implant-catalogue">{t.implantCatalogues}</option></select></div></div><div className="v11-resource-filter-row"><div className="document-filters" role="group" aria-label={c.documentCenter}>{[['all',c.filterAll],['smart',c.filterSmart],['portfolio',c.filterPortfolio]].map(([key,label])=><button type="button" key={key} data-filter={key} aria-pressed={filter===key} onClick={()=>setFilter(key)}>{label}</button>)}</div><button type="button" className="v11-resource-reset" onClick={reset}>{t.reset}<span aria-hidden="true">↺</span></button></div><p className="v11-resource-count" role="status" aria-live="polite" aria-atomic="true"><bdi>{shown.length}</bdi> {t.results} · {t.catalogueSource}</p></>}
 <div className="document-grid">{shown.map(d=><article key={d.id} data-document={d.id} className="document-card"><div className="document-cover"><span>PDF / {d.pages} {c.pages}</span><Image src={d.cover} alt={c[d.title]} width={400} height={350} sizes="(max-width:760px) 65px,(max-width:1000px) 70px,90px"/></div><div className="document-copy"><Label>{t.implantCatalogues}</Label><h3>{c[d.title]}</h3><p>{c[d.description]}</p><dl className="document-data"><div><dt>{t.fileLanguage}</dt><dd>{t.english}</dd></div><div><dt>PDF</dt><dd><bdi>{(d.bytes/1000000).toFixed(1)} MB</bdi> · {d.pages} {c.pages}</dd></div><div><dt>{t.family}</dt><dd>{products.filter(p=>p.catalogue===d.id).map(p=>p.name).join(' / ')}</dd></div></dl><div className="document-actions"><a href={d.url} target="_blank" rel="noopener" className="text-link">{c.download}<Arrow/></a><a href={d.url} download className="download-link">{c.documentDownload}<Arrow down/></a></div></div></article>)}</div>
 {!shown.length&&<div className="v11-resource-empty"><h3>{t.noResults}</h3><p>{t.noResultsCopy}</p><button type="button" className="text-link" onClick={reset}>{t.reset}<Arrow/></button></div>}
 </div>;
}
