import {ProstheticLibrary} from './prosthetic-library';
import {getViewerControls} from '@/lib/viewer-controls';
import {getEngineeringCopy} from '@/lib/engineering-copy';
import {getV13Copy} from '@/lib/v13-copy';
import {asset} from '@/lib/paths';
import type {Product} from '@/data/products';
import {getProductKnowledge} from '@/data/product-knowledge';
import {getDocument} from '@/data/documents';
import type {Copy,Locale} from '@/lib/i18n';
import {getV11ProductCopy} from '@/lib/v11-product-copy';
import {Arrow,Button,Label} from '@/components/ui/primitives';
import {TechnicalViewer,ConfigurationLink,type ViewerFeature} from './technical-viewer';
const smartAnchors:Readonly<Record<string,readonly [number,number]>>={connection:[640/1320*100,112/1153*100],collar:[790/1320*100,245/1153*100],body:[700/1320*100,550/1153*100],thread:[890/1320*100,665/1153*100],surface:[780/1320*100,890/1153*100]};
export function getViewerFeatures(p:Product,locale:Locale):ViewerFeature[]{
 const t=getV11ProductCopy(locale),knowledge=getProductKnowledge(p);
 const records=[...knowledge.features,...(p.id==='smart'?[{id:'platform',source:{documentId:'smart' as const,page:3},visual:{origin:[58,20] as const,zoom:1.85}},{id:'apex',source:{documentId:'smart' as const,page:3},visual:{origin:[62,91] as const,zoom:2.1}}]:[])];
 const order=['connection','platform','collar','body','thread','apex','surface'];if(p.id==='smart')records.sort((a,b)=>order.indexOf(a.id)-order.indexOf(b.id));
 return records.map(f=>{const text=getEngineeringCopy(locale,p.id,f.id),anchor=p.id==='smart'?(smartAnchors[f.id]||f.visual.origin):f.visual.origin;return {id:f.id,title:text[0],visible:text[1],explanation:text[2],sourceUrl:`${getDocument(f.source.documentId).url}#page=${f.source.page}`,sourceLabel:`${f.source.documentId==='smart'?'BIOSmart':'BioVent'} · ${t.page} ${f.source.page}`,origin:anchor,zoom:p.id==='smart'?(({connection:2.1,platform:1.85,collar:1.85,body:1.5,thread:2,apex:2.1,surface:1} as Record<string,number>)[f.id]||f.visual.zoom):f.id==='connection'?2.1:f.visual.zoom,hotspot:p.id==='smart'&&!['platform','surface'].includes(f.id)?anchor:undefined}});
}

export function ProductDossier({product:p,locale,copy:c}:{product:Product;locale:Locale;copy:Copy}){
 const t=getV11ProductCopy(locale),knowledge=getProductKnowledge(p),doc=getDocument(p.catalogue),summary=t.summaries[p.id] as Record<string,string>;
 const features=getViewerFeatures(p,locale);
 return <section className={`v11-product-dossier dossier-${p.id}`} id="product-engineering">
  <div className="container">
   <div className="dossier-heading"><div><Label>{t.eyebrow}</Label><h2>{t.title}</h2></div><p>{t.intro}</p></div>
   <TechnicalViewer product={p} locale={locale} features={features} labels={getV13Copy(locale).viewer} controls={getViewerControls(locale)}/>
   <div className="dossier-profile"><div><Label>{t.specification}</Label><h3>{p.catalogueName}</h3><p>{t.availability}</p></div><dl><div><dt>{c.design}</dt><dd>{c[p.design]}</dd></div><div><dt>{c.connection}</dt><dd>{c[p.connection]}</dd></div><div><dt>{c.diameter}</dt><dd dir="ltr">{p.diameters.join(' / ')} mm</dd></div><div><dt>{c.length}</dt><dd dir="ltr">{p.lengths.join(' / ')} mm</dd></div>{knowledge.surface&&<div><dt>{c.surface}</dt><dd>{knowledge.surface.label}</dd></div>}</dl></div>
  </div>
 </section>
}
export function ProductDocumentation({product:p,locale,copy:c}:{product:Product;locale:Locale;copy:Copy}){const t=getV11ProductCopy(locale),knowledge=getProductKnowledge(p),doc=getDocument(p.catalogue);return <section className="product-documentation-section section-pad"><div className="container">
   <div id="product-components"><div className="section-heading"><div><Label>{t.prostheticTitle}</Label><h2>{getV13Copy(locale).prosthetic.title}</h2></div><p>{getV13Copy(locale).prosthetic.intro}</p></div><ProstheticLibrary locale={locale} initialFamily={p.id}/></div>
   <div className="prosthetic-documentation">    <div className="dossier-source-rail"><Label>{t.catalogueEvidence}</Label><p className="dossier-document-language">{c.catalogLanguage} · PDF</p><h3>{t.workflowTitle}</h3><p>{t.workflowCopy}</p><div className="dossier-page-links" role="group" aria-label={t.technicalPages}>{knowledge.resources.map(resource=><a key={`${resource.documentId}-${resource.page}`} href={`${getDocument(resource.documentId).url}#page=${resource.page}`} target="_blank" rel="noopener"><span>{t.page}</span><strong>{String(resource.page).padStart(2,'0')}</strong><Arrow/></a>)}</div><a className="text-link" href={`${doc.url}#page=${p.page}`} target="_blank" rel="noopener">{t.openCatalogue}<Arrow/></a></div>
   </div>
   <div className="dossier-actions"><ConfigurationLink>{t.configuration}</ConfigurationLink><Button href={`/${locale}/inquiry/?product=${p.id}`}>{t.requestInformation}</Button><a className="text-link" href={asset(`/${locale}/inquiry/?product=${p.id}&purpose=quotation`)}>{t.quote}<Arrow/></a></div></div></section>}
