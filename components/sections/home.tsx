import {getResourceCategoryNames} from '@/lib/resource-category-copy';
import {getComparisonData} from '@/lib/comparison-data';
import {getV13Copy} from '@/lib/v13-copy';
import {company} from '@/data/company';
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
export function Home({locale,copy:c}:{locale:Locale;copy:Copy}){const t=getV12Copy(locale);return <><ProductShowroom locale={locale} copy={c} presentation={getV13Copy(locale).hero}/><section className="manufacturer-intro section-pad" id="showroom-statement"><div className="container manufacturer-grid"><div><Label>{t.introLabel}</Label><h2>{getV13Copy(locale).editorial.introTitle}</h2></div><div><p className="lead">{getV13Copy(locale).editorial.introCopy}</p><Link className="text-link" href={`/${locale}/about/`}>{t.introLink}<Arrow/></Link><p className="manufacturer-signature">{company.legalName} · Neuss, {getV13Copy(locale).company.germany}</p><nav className="manufacturer-links" aria-label={c.collection}><Link href={`/${locale}/products/`}>{t.productRange}<Arrow/></Link><Link href={`/${locale}/resources/`}>{t.technicalEvidence}<Arrow/></Link><Link href={`/${locale}/distributors/`}>{t.partnership}<Arrow/></Link></nav></div></div></section><Portfolio locale={locale} copy={c}/><Engineering locale={locale} copy={c}/><Comparison locale={locale} copy={c} details={getComparisonData(locale)} labels={getV13Copy(locale).compare}/><TechnicalPathways locale={locale}/><section className="resource-showcase section-pad"><div className="container"><div className="section-heading"><div><Label>{c.resourceEyebrow}</Label><h2>{c.documentCenter}</h2></div><div><p>{c.resourceIntro}</p><Link className="text-link" href={`/${locale}/resources/`}>{t.sourceLink}<Arrow/></Link></div></div><DocumentCenter categoryNames={getResourceCategoryNames(locale)} locale={locale} copy={c} filters={false}/></div></section><DocumentationIntegrity locale={locale}/><ProfessionalConversion locale={locale}/></>}
