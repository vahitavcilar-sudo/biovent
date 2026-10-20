import Link from 'next/link';
import {notFound} from 'next/navigation';
import {products,findProduct} from '@/data/products';
import {getVariants} from '@/data/product-knowledge';
import {getCopy} from '@/lib/i18n';
import {resolveLocale} from '@/lib/locale';
import {metadata,siteUrl} from '@/lib/seo';
import {basePath,asset} from '@/lib/paths';
import {getV12Copy} from '@/lib/v12-copy';
import {ProductHero} from '@/components/corporate/product-hero';
import {ProductDossier,ProductDocumentation} from '@/components/product/product-dossier';
import {ProductChapters} from '@/components/product/product-chapters';
import {ProductTabs} from '@/components/product/product-tabs';
import {ProductVisual} from '@/components/product/product-visual';
import {ProfessionalConversion} from '@/components/sections/professional-conversion';
import {Label,Arrow} from '@/components/ui/primitives';
export const dynamicParams=false;
export function generateStaticParams(){return products.map(p=>({slug:p.id}))}
export async function generateMetadata({params}:{params:Promise<{locale:string;slug:string}>}){const args=await params,l=await resolveLocale(params),p=findProduct(args.slug);if(!p)notFound();return metadata(l,`/products/${p.id}`,p.name,getCopy(l)[p.description])}
export default async function Page({params}:{params:Promise<{locale:string;slug:string}>}){const {slug}=await params,locale=await resolveLocale(params),p=findProduct(slug);if(!p)notFound();const c=getCopy(locale),t=getV12Copy(locale);return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'Product',name:p.name,description:c[p.description],image:`${siteUrl}${asset(p.image)}`,brand:{'@type':'Brand',name:'Biovent'},url:`${siteUrl}${basePath}/${locale}/products/${p.id}/`}).replace(/</g,'\\u003c')}}/><ProductChapters locale={locale} copy={c} smart={p.id==='smart'} references={getVariants(p).some(v=>!!v.reference)}/><ProductHero product={p} locale={locale} copy={c}/><ProductDossier product={p} locale={locale} copy={c}/><section id="product-technical" className="product-information-section section-pad"><div className="container"><div className="section-heading"><div><Label>{c.technical}</Label><h2>{t.dimensionsTitle}</h2></div><p>{c.productSource}</p></div><ProductTabs product={p} copy={c} locale={locale}/></div></section><ProductDocumentation product={p} locale={locale} copy={c}/><section className="related-products section-pad"><div className="container"><Label>{c.collection}</Label><h2>{t.relatedTitle}</h2><div className="related-grid">{products.filter(x=>x.id!==p.id).map(x=><Link href={`/${locale}/products/${x.id}/`} key={x.id}><ProductVisual product={x}/><span>{x.name}<Arrow/></span><small>{c[x.tag]}</small></Link>)}</div></div></section><ProfessionalConversion locale={locale} product={p}/></>}
