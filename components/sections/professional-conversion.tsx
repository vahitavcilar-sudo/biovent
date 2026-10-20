import Link from 'next/link';
import type {Locale} from '@/lib/i18n';
import {getV11Copy} from '@/lib/v11-copy';
import {Arrow,Label,Lines} from '@/components/ui/primitives';
import type {Product} from '@/data/products';
export function ProfessionalConversion({locale,product}:{locale:Locale;product?:Product}){const t=getV11Copy(locale);return <section className="v11-conversion section-pad"><div className="container v11-conversion-grid"><div className="v11-professional-path"><Label>{t.professional}</Label><h2><Lines text={product?product.name+'\n'+t.inquiry:t.professionalTitle}/></h2><p>{t.professionalCopy}</p><div className="v11-conversion-actions"><Link className="button" href={`/${locale}/inquiry/${product?'?product='+product.id:''}`}>{t.inquiry}<Arrow/></Link><Link className="text-link" href={`/${locale}/inquiry/?purpose=quotation${product?'&product='+product.id:''}`}>{t.quotation}<Arrow/></Link></div></div><div className="v11-distributor-path"><Label>{t.distribution}</Label><p>{t.partnerCopy}</p><Link className="text-link" href={`/${locale}/distributors/`}>{t.apply}<Arrow/></Link></div></div></section>}
