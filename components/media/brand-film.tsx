import {MediaStage} from './media-stage';
import {ProductVisual} from '@/components/product/product-visual';
import {products} from '@/data/products';
import {getV7Copy} from '@/lib/v7-copy';
import type {Locale,Copy} from '@/lib/i18n';
import {Label,Lines,Button} from '@/components/ui/primitives';
export function BrandFilm({locale,copy:c}:{locale:Locale;copy:Copy}){const v=getV7Copy(locale);return <section className="v7-brand-section section-pad"><div className="container v7-brand-grid"><div><Label>07 / BIOVENT</Label><h2><Lines text={v.brand}/></h2><p>{v.brandCopy}</p><Button href={`/${locale}/about/`} secondary>{c.navAbout}</Button></div><MediaStage mediaKey="brandFilm" locale={locale} className="v7-brand-media"><div className="brand-still"><ProductVisual product={products[0]} large/><div className="brand-system-list">{products.map(p=><span key={p.id}>{p.name}</span>)}</div></div></MediaStage></div></section>}
