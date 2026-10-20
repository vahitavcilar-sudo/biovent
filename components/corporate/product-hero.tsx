import Link from 'next/link';
import type {Product} from '@/data/products';
import {getDocument} from '@/data/documents';
import type {Copy,Locale} from '@/lib/i18n';
import {getV11Copy} from '@/lib/v11-copy';
import {getV12Copy} from '@/lib/v12-copy';
import {ProductVisual} from '@/components/product/product-visual';
import {Label,Arrow,Button} from '@/components/ui/primitives';
export function ProductHero({product:p,locale,copy:c}:{product:Product;locale:Locale;copy:Copy}){const t=getV12Copy(locale),v=getV11Copy(locale),doc=getDocument(p.catalogue);return <section id="product-overview" className={`product-hero product-hero-${p.id}`}><div className="container"><Link className="breadcrumb" href={`/${locale}/products/`}><span aria-hidden="true">←</span> {c.backProducts}</Link><div className="product-hero-grid"><div className="product-hero-copy"><div className="product-hero-heading"><Label>{c[p.tag]}</Label><h1>{p.name}</h1><span className="catalogue-name">{p.catalogueName}</span></div><p className="lead">{c[p.description]}</p><div className="hero-actions"><Button href={`/${locale}/inquiry/?product=${p.id}`}>{v.inquiry}</Button><a className="text-link" href={`${doc.url}#page=${p.page}`} target="_blank" rel="noopener">{t.heroCatalogue}<Arrow/></a></div><div className="product-fact-strip"><span>{c.design}<strong>{c[p.design]}</strong></span><span>{c.connection}<strong>{c[p.connection]}</strong></span></div></div><ProductVisual product={p} large priority/></div></div></section>}
