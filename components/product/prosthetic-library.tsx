import {products,type ProductId} from '@/data/products';
import {getProductKnowledge} from '@/data/product-knowledge';
import {getDocument} from '@/data/documents';
import {getV11ProductCopy} from '@/lib/v11-product-copy';
import {getV13Copy} from '@/lib/v13-copy';
import type {Locale} from '@/lib/i18n';
import {ProstheticExplorer} from './prosthetic-explorer';
export function ProstheticLibrary({locale,initialFamily='smart'}:{locale:Locale;initialFamily?:ProductId}){const t=getV13Copy(locale).prosthetic,v=getV11ProductCopy(locale);const families=products.map(p=>({id:p.id,name:p.name,catalogue:p.catalogueName,items:getProductKnowledge(p).prosthetics.map(entry=>({id:entry.id,label:v.components[entry.id as keyof typeof v.components],description:t.descriptions[entry.id as keyof typeof t.descriptions],reference:entry.reference,sourceUrl:`${getDocument(entry.source.documentId).url}#page=${entry.source.page}`,sourceLabel:`${getDocument(entry.source.documentId).id==='smart'?'BIOSmart':'BioVent'} · ${v.page} ${entry.source.page}`}))}));return <ProstheticExplorer families={families} locale={locale} labels={t} initialFamily={initialFamily}/>}
