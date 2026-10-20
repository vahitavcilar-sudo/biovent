import {Suspense} from 'react';
import Link from 'next/link';
import {resolveLocale} from '@/lib/locale';
import {metadata} from '@/lib/seo';
import {getInquiryCopy} from '@/lib/v11-inquiry-copy';
import {ProfessionalForm} from '@/components/forms/professional-form';
import {Arrow,Label,Lines} from '@/components/ui/primitives';
export async function generateMetadata({params}:{params:Promise<{locale:string}>}){const locale=await resolveLocale(params);const c=getInquiryCopy(locale);return metadata(locale,'/inquiry',c.formTitle,c.intro)}
export default async function Page({params}:{params:Promise<{locale:string}>}){const locale=await resolveLocale(params),c=getInquiryCopy(locale);return <><section className="professional-hero"><div className="container"><Label>{c.eyebrow}</Label><h1><Lines text={c.title}/></h1><p>{c.intro}</p></div></section><section className="professional-layout container"><aside className="professional-aside"><Label>{c.formTitle}</Label><p>{c.saveNote}</p><div className="professional-distributor"><h2>{c.distributorTitle}</h2><p>{c.distributorCopy}</p><Link className="text-link" href={`/${locale}/distributors/`}>{c.distributorLink}<Arrow/></Link></div></aside><Suspense fallback={<p>{c.formTitle}</p>}><ProfessionalForm locale={locale}/></Suspense></section></>}
