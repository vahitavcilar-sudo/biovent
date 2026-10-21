import {getV11ResourceCopy} from '@/lib/v11-resource-copy';
import {getV11Copy} from '@/lib/v11-copy';
import Link from 'next/link';
import {company} from '@/data/company';
import {products} from '@/data/products';
import {getDocument} from '@/data/documents';
import type {Locale} from '@/lib/i18n';
import {getV13Copy} from '@/lib/v13-copy';
import {Arrow,Button,Label,Lines} from '@/components/ui/primitives';
export function ManufacturerProfile({locale}:{locale:Locale}){const t=getV13Copy(locale).company;return <>
 <section className="company-identity section-pad"><div className="container company-identity-grid"><div><Label>{t.identity}</Label><h2>{company.legalName}</h2><address>{company.address}<br/>{t.germany}</address></div><div><Label>{t.location}</Label><p className="company-location">Neuss<span>{t.germany}</span></p><p>{t.profileCopy}</p></div></div></section>
 <section className="company-engineering section-pad"><div className="container"><div className="section-heading"><div><Label>BIOVENT / {getV13Copy(locale).hero.technical}</Label><h2>{t.engineering}</h2></div><p>{t.engineeringCopy}</p></div><div className="company-system-index">{products.map((p,i)=><Link key={p.id} href={`/${locale}/products/${p.id}/`}><span>0{i+1}</span><div><h3>{p.name}</h3><p>{p.catalogueName}</p></div><Arrow/></Link>)}</div></div></section>
 <section className="company-evidence section-pad"><div className="container company-evidence-grid"><div><Label>{t.source}</Label><h2>{t.quality}</h2><p>{t.qualityCopy}</p><Button href={`/${locale}/inquiry/`}>{t.qualityAction}</Button></div><div><h3>{t.source}</h3><p>{t.sourceCopy}</p>{(['smart','portfolio'] as const).map(id=><a key={id} href={getDocument(id).url} target="_blank" rel="noopener"><span>{id==='smart'?'BIOSmart':'BioVent'}<small>PDF · {getV11ResourceCopy(locale).english} · {getDocument(id).pages}</small></span><Arrow/></a>)}</div></div></section>
 <section className="company-partnership section-pad"><div className="container company-partnership-grid"><div><Label>BIOVENT / {t.partnershipAction}</Label><h2>{t.partnership}</h2><p>{t.partnershipCopy}</p><Button href={`/${locale}/distributors/`}>{t.partnershipAction}</Button></div><div className="company-contact-note"><h3>{t.contact}</h3><p>{t.contactCopy}</p><Link className="text-link" href={`/${locale}/inquiry/`}>{getV11Copy(locale).inquiry}<Arrow/></Link></div></div></section>
 </>}
