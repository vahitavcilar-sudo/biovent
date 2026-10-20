import {asset} from '@/lib/paths';
import type {Product} from '@/data/products';
import {getProductKnowledge} from '@/data/product-knowledge';
import {getDocument} from '@/data/documents';
import type {Copy,Locale} from '@/lib/i18n';
import {getV11ProductCopy} from '@/lib/v11-product-copy';
import {Arrow,Button,Label} from '@/components/ui/primitives';
import {TechnicalViewer,ConfigurationLink,type ViewerFeature} from './technical-viewer';
const smartAnchors:Readonly<Record<string,readonly [number,number]>>={connection:[640/1320*100,112/1153*100],collar:[790/1320*100,245/1153*100],body:[700/1320*100,550/1153*100],thread:[890/1320*100,665/1153*100],surface:[780/1320*100,890/1153*100]};
export function ProductDossier({product:p,locale,copy:c}:{product:Product;locale:Locale;copy:Copy}){
 const t=getV11ProductCopy(locale),knowledge=getProductKnowledge(p),doc=getDocument(p.catalogue),summary=t.summaries[p.id] as Record<string,string>;
 const features:ViewerFeature[]=knowledge.features.map(feature=>({id:feature.id,title:t.labels[feature.id],explanation:summary[feature.id]||t.sourceContext,sourceUrl:`${getDocument(feature.source.documentId).url}#page=${feature.source.page}`,sourceLabel:`${getDocument(feature.source.documentId).id==='smart'?'BIOSmart':'BioVent'} · ${t.page} ${feature.source.page}`,origin:feature.visual.origin,zoom:feature.visual.zoom,hotspot:p.id==='smart'?smartAnchors[feature.id]:undefined}));
 return <section className={`v11-product-dossier dossier-${p.id}`} id="product-engineering">
  <div className="container">
   <div className="dossier-heading"><div><Label>{t.eyebrow}</Label><h2>{t.title}</h2></div><p>{t.intro}</p></div>
   <TechnicalViewer product={p} locale={locale} features={features}/>
   <div className="dossier-profile"><div><Label>{t.specification}</Label><h3>{p.catalogueName}</h3><p>{t.availability}</p></div><dl><div><dt>{c.design}</dt><dd>{c[p.design]}</dd></div><div><dt>{c.connection}</dt><dd>{c[p.connection]}</dd></div><div><dt>{c.diameter}</dt><dd dir="ltr">{p.diameters.join(' / ')} mm</dd></div><div><dt>{c.length}</dt><dd dir="ltr">{p.lengths.join(' / ')} mm</dd></div>{knowledge.surface&&<div><dt>{c.surface}</dt><dd>{knowledge.surface.label}</dd></div>}</dl></div>
   <div className="dossier-documentation" id="product-components">
    <div className="dossier-component-context"><Label>{t.prostheticTitle}</Label><h3>{t.documentReview}</h3><p>{t.prostheticIntro}</p>{knowledge.prosthetics.length>0?<ul className="dossier-components">{knowledge.prosthetics.map(component=><li key={component.id}><a href={`${getDocument(component.source.documentId).url}#page=${component.source.page}`} target="_blank" rel="noopener"><span>{t.components[component.id as keyof typeof t.components]||t.prostheticTitle}{component.reference&&<code dir="ltr">{component.reference}</code>}</span><small>{t.page} {component.source.page}<Arrow/></small></a></li>)}</ul>:<p className="dossier-compatibility-note">{t.unknownCompatibility}</p>}</div>
    <div className="dossier-source-rail"><Label>{t.catalogueEvidence}</Label><p className="dossier-document-language">{c.catalogLanguage} · PDF</p><h3>{t.workflowTitle}</h3><p>{t.workflowCopy}</p><div className="dossier-page-links" role="group" aria-label={t.technicalPages}>{knowledge.resources.map(resource=><a key={`${resource.documentId}-${resource.page}`} href={`${getDocument(resource.documentId).url}#page=${resource.page}`} target="_blank" rel="noopener"><span>{t.page}</span><strong>{String(resource.page).padStart(2,'0')}</strong><Arrow/></a>)}</div><a className="text-link" href={`${doc.url}#page=${p.page}`} target="_blank" rel="noopener">{t.openCatalogue}<Arrow/></a></div>
   </div>
   <div className="dossier-actions"><ConfigurationLink>{t.configuration}</ConfigurationLink><Button href={`/${locale}/inquiry/?product=${p.id}`}>{t.requestInformation}</Button><a className="text-link" href={asset(`/${locale}/inquiry/?product=${p.id}&purpose=quotation`)}>{t.quote}<Arrow/></a></div>
  </div>
 </section>
}
