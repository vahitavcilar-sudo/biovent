import {asset} from '@/lib/paths';
import type { CopyKey } from '@/lib/i18n';
export interface Document {id:'smart'|'portfolio';title:CopyKey;description:CopyKey;cover:string;url:string;pages:number;bytes:number;language:'English'}
export const documents:readonly Document[]=[{id:'smart',title:'biosmartCatalog',description:'biosmartCatalogCopy',cover:'/images/editorial/smart-cover.webp',url:asset('/documents/biosmart-catalog.pdf'),pages:24,bytes:2150289,language:'English'},{id:'portfolio',title:'bioventCatalog',description:'bioventCatalogCopy',cover:'/images/editorial/biovent-cover.webp',url:asset('/documents/biovent-catalog.pdf'),pages:18,bytes:32312202,language:'English'}];
export function getDocument(id:Document['id']){return documents.find(d=>d.id===id)!}
