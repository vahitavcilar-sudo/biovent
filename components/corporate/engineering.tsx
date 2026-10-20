import Link from 'next/link';
import {products} from '@/data/products';
import type {Copy,Locale} from '@/lib/i18n';
import {getV12Copy} from '@/lib/v12-copy';
import {getViewerFeatures} from '@/components/product/product-dossier';
import {TechnicalViewer} from '@/components/product/technical-viewer';
import {Label,Lines,Arrow} from '@/components/ui/primitives';
export function Engineering({locale,copy:c}:{locale:Locale;copy:Copy}){const t=getV12Copy(locale),p=products[0];return <section className="engineering-section section-pad" id="smart-engineering"><div className="container"><div className="section-heading"><div><Label>BIOSmart / {c.engineering}</Label><h2><Lines text={t.engineeringTitle}/></h2></div><div><p>{t.engineeringCopy}</p><Link className="text-link" href={`/${locale}/products/smart/#product-engineering`}>{t.engineeringLink}<Arrow/></Link></div></div><TechnicalViewer product={p} locale={locale} features={getViewerFeatures(p,locale)}/></div></section>}
