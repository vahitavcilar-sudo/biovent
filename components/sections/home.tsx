import {getV11Copy} from '@/lib/v11-copy';
import {ProfessionalConversion} from './professional-conversion';
import {TechnicalPathways,DocumentationIntegrity} from './technical-pathways';
import {ProductShowroom} from '@/components/motion/product-showroom';
import {SignatureScene} from '@/components/motion/signature-scene';
import type {Copy,Locale} from '@/lib/i18n';
import {getV4Copy} from '@/lib/v4-copy';
import {SmartStory} from '@/components/product/smart-story';
import {DocumentCenter} from './document-center';
import {Workflow,DistributorBanner} from './shared';
import {Label,Lines,Rule,Arrow} from '@/components/ui/primitives';
import {Comparison} from '@/components/product/comparison';
export function Home({locale,copy:c}:{locale:Locale;copy:Copy}){const v=getV4Copy(locale),t=getV11Copy(locale);return <><ProductShowroom locale={locale} copy={c}/><section className="v8-statement" id="showroom-statement"><div className="container"><Rule number="02" label={c.engineering}/><div><h2><Lines text={t.identity}/></h2><p>{t.identityCopy}</p><a className="text-link" href="#smart-engineering">BIOSmart / {c.engineering}<Arrow down/></a></div></div></section><SmartStory locale={locale} copy={c}/><SignatureScene locale={locale} copy={c}/><Comparison locale={locale} copy={c}/><TechnicalPathways locale={locale}/><Workflow copy={c} locale={locale}/><DocumentationIntegrity locale={locale}/><section className="container section-pad v4-library"><Rule number="07" label={c.resourceEyebrow}/><div className="section-heading"><div><Label>{c.technical}</Label><h2><Lines text={v.library}/></h2></div><p>{c.resourceIntro}</p></div><DocumentCenter copy={c} filters={false} locale={locale}/></section><ProfessionalConversion locale={locale}/></>}
