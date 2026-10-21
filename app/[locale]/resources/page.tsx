import {getResourceCategoryNames} from '@/lib/resource-category-copy';
import {ProstheticLibrary} from '@/components/product/prosthetic-library';
import {getV13Copy} from '@/lib/v13-copy';
import {getV4Copy} from '@/lib/v4-copy';
import {getCopy} from '@/lib/i18n';import {resolveLocale} from '@/lib/locale';import {pageMetadata} from '@/lib/seo';import {DocumentCenter} from '@/components/sections/document-center';import {PageIntro,DistributorBanner} from '@/components/sections/shared';
export async function generateMetadata({params}:{params:Promise<{locale:string}>}){return pageMetadata(await resolveLocale(params),'resources')}
export default async function Page({params}:{params:Promise<{locale:string}>}){const locale=await resolveLocale(params),c=getCopy(locale);return <><PageIntro eyebrow={c.technical} title={getV4Copy(locale).library} copy={c.resourcesIntro}/><section className="container documents-page"><h2 className="sr-only">{c.documentCenter}</h2><DocumentCenter categoryNames={getResourceCategoryNames(locale)} copy={c} locale={locale}/><p className="technical-note">{c.resourceNote}</p><div className="resource-components"><h2>{getV13Copy(locale).prosthetic.title}</h2><p>{getV13Copy(locale).prosthetic.intro}</p><ProstheticLibrary locale={locale}/></div></section><DistributorBanner locale={locale} copy={c}/></>}
