import Link from 'next/link';
import type {Copy,Locale} from '@/lib/i18n';
import {getV12Copy} from '@/lib/v12-copy';
import {ProductShowroom} from '@/components/motion/product-showroom';
import {Portfolio} from '@/components/corporate/portfolio';
import {Engineering} from '@/components/corporate/engineering';
import {Comparison} from '@/components/product/comparison';
import {TechnicalPathways,DocumentationIntegrity} from './technical-pathways';
import {ProfessionalConversion} from './professional-conversion';
import {DocumentCenter} from './document-center';
import {Label,Arrow} from '@/components/ui/primitives';
export function Home({locale,copy:c}:{locale:Locale;copy:Copy}){const t=getV12Copy(locale);return <><ProductShowroom locale={locale} copy={c}/><section className="manufacturer-intro section-pad" id="showroom-statement"><div className="container manufacturer-grid"><div><Label>{t.introLabel}</Label><h2>{t.introTitle}</h2></div><div><p className="lead">{t.introCopy}</p><Link className="text-link" href={`/${locale}/about/`}>{t.introLink}<Arrow/></Link><nav className="manufacturer-links" aria-label={c.collection}><Link href={`/${locale}/products/`}>{t.productRange}<Arrow/></Link><Link href={`/${locale}/resources/`}>{t.technicalEvidence}<Arrow/></Link><Link href={`/${locale}/distributors/`}>{t.partnership}<Arrow/></Link></nav></div></div></section><Portfolio locale={locale} copy={c}/><Engineering locale={locale} copy={c}/><Comparison locale={locale} copy={c}/><TechnicalPathways locale={locale}/><section className="resource-showcase section-pad"><div className="container"><div className="section-heading"><div><Label>{c.resourceEyebrow}</Label><h2>{c.documentCenter}</h2></div><div><p>{c.resourceIntro}</p><Link className="text-link" href={`/${locale}/resources/`}>{t.sourceLink}<Arrow/></Link></div></div><DocumentCenter locale={locale} copy={c} filters={false}/></div></section><DocumentationIntegrity locale={locale}/><ProfessionalConversion locale={locale}/></>}
