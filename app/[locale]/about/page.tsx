import {company} from '@/data/company';
import {siteUrl} from '@/lib/seo';
import {resolveLocale} from '@/lib/locale';
import {getV13Copy} from '@/lib/v13-copy';
import {metadata} from '@/lib/seo';
import {PageIntro} from '@/components/sections/shared';
import {ManufacturerProfile} from '@/components/corporate/manufacturer-profile';
export async function generateMetadata({params}:{params:Promise<{locale:string}>}){const locale=await resolveLocale(params),t=getV13Copy(locale).company;return metadata(locale,'/about',t.title,t.intro)}
export default async function Page({params}:{params:Promise<{locale:string}>}){const locale=await resolveLocale(params),t=getV13Copy(locale).company;return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"Organization",name:company.name,legalName:company.legalName,url:siteUrl,address:{"@type":"PostalAddress",streetAddress:"Am Hagelkreuz 23",postalCode:"41469",addressLocality:"Neuss",addressCountry:"DE"}}).replace(/</g,'\\u003c')}}/><PageIntro eyebrow={t.eyebrow} title={t.title} copy={t.intro}/><ManufacturerProfile locale={locale}/></>}
