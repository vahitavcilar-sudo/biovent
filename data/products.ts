import {getVariants,type KnowledgeProductId} from './product-knowledge';
import refs from './references.json';
import smartMaster from './smart-asset.json';
import promxMaster from './promx-asset.json';
import type { CopyKey } from '@/lib/i18n';
export type ProductId=KnowledgeProductId;
export type Reference=readonly [number,string];
function referenceRows(rows:readonly (string|number)[][]):Reference[]{return rows.map(row=>{if(row.length!==2||typeof row[0]!=='number'||typeof row[1]!=='string')throw new Error('Invalid source reference');return [row[0],row[1]] as const})}
function catalogueDimensions(id:ProductId){const variants=getVariants(id);return {diameters:[...new Set(variants.map(v=>v.diameter))].sort((a,b)=>a-b),lengths:[...new Set(variants.map(v=>v.length))].sort((a,b)=>a-b)}}
const promxReferences=Object.fromEntries(Object.entries(refs.promx).map(([diameter,rows])=>[diameter,referenceRows(rows)]));
export interface Product {id:ProductId;name:string;catalogueName:string;description:CopyKey;tag:CopyKey;specCopy:CopyKey;image:string;imageWidth:number;imageHeight:number;catalogue:'smart'|'portfolio';page:number;design:'twoPiece'|'onePiece'|'seeCatalog';connection:'conical'|'internalHex'|'seeCatalog';diameters:readonly number[];lengths:readonly number[];references?:Record<string,readonly Reference[]>;features:readonly CopyKey[];}
export const products:readonly Product[]=[
{id:'smart',name:'Smart Implant',catalogueName:'BIOSmart',description:'smartDesc',tag:'smartTag',specCopy:'smartSpecs',image:smartMaster.image||'',imageWidth:smartMaster.width||1320,imageHeight:smartMaster.height||1153,catalogue:'smart',page:3,design:'twoPiece',connection:'conical',...catalogueDimensions('smart'),features:['featureConnection','featureBody','thread','featureComponents']},
{id:'promx',name:'Promx Implant',catalogueName:'VTX Two Piece',description:'promxDesc',tag:'promxTag',specCopy:'promxSpecs',image:promxMaster.ready?promxMaster.image:'/images/products/promx/implant.webp',imageWidth:promxMaster.ready?promxMaster.width:547,imageHeight:promxMaster.ready?promxMaster.height:1070,catalogue:'portfolio',page:4,design:'twoPiece',connection:'internalHex',...catalogueDimensions('promx'),references:promxReferences,features:['connection','surface','included']},
{id:'monoblock',name:'Monoblock Implant',catalogueName:'Compressive',description:'monoblockDesc',tag:'monoblockTag',specCopy:'monoblockSpecs',image:'/images/products/monoblock/implant.webp',imageWidth:1280,imageHeight:1280,catalogue:'portfolio',page:5,design:'onePiece',connection:'seeCatalog',...catalogueDimensions('monoblock'),features:['onePiece','sizes']},
{id:'zygoma',name:'Zygoma Implant',catalogueName:'Zygomatic',description:'zygomaDesc',tag:'zygomaTag',specCopy:'zygomaSpecs',image:'/images/products/zygoma/implant.webp',imageWidth:1000,imageHeight:2000,catalogue:'portfolio',page:7,design:'seeCatalog',connection:'seeCatalog',...catalogueDimensions('zygoma'),references:{'4.2':referenceRows(refs.zygoma)},features:['diameter','length']}
];
export function findProduct(id:string){return products.find(p=>p.id===id)}
export const productIds=products.map(p=>p.id);
// Existing public diameter/length fields remain aggregate catalog values; only the allowlist validates pairs.
for(const p of products){for(const v of getVariants(p)){if(!p.diameters.includes(v.diameter)||!p.lengths.includes(v.length))throw new Error(`Variant outside product catalogue range: ${p.id}`)}}
