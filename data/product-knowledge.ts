/** Catalogue facts only. These records describe source listings, never stock, clinical suitability or universal compatibility. */
import rawVariants from './product-variants.json';
import smartMaster from './smart-asset.json';
import promxMaster from './promx-asset.json';
export type KnowledgeProductId='smart'|'promx'|'monoblock'|'zygoma';
export type SourceProof={documentId:'smart'|'portfolio';page:number};
export interface ImplantVariant {productId:KnowledgeProductId;diameter:number;length:number;reference?:string;source:SourceProof;verification:'catalogue-listed';kind:'standard'|'short'}
export type TechnicalFeatureId='connection'|'collar'|'body'|'thread'|'surface'|'one-piece'|'dimensions';
export interface TechnicalFeature {id:TechnicalFeatureId;title:string;explanation:string;source:SourceProof;verification:'catalogue-confirmed';visual:{image:string;origin:readonly [number,number];zoom:number}}
export interface ProstheticRelationship {id:string;label:string;source:SourceProof;reference?:string;scope:'catalogue-family-only'}
export interface ProductResource {documentId:'smart'|'portfolio';page:number;type:'implant-catalogue';language:'English'}
export interface ProductKnowledge {productId:KnowledgeProductId;features:readonly TechnicalFeature[];surface?:{label:string;source:SourceProof};prosthetics:readonly ProstheticRelationship[];resources:readonly ProductResource[];verification:'catalogue-reviewed';missing:readonly string[]}
const ids:readonly KnowledgeProductId[]=['smart','promx','monoblock','zygoma'];
function isProductId(id:string):id is KnowledgeProductId{return ids.some(value=>value===id)}
const variants=rawVariants as Record<KnowledgeProductId,readonly ImplantVariant[]>;
// Fail closed if the committed allowlist becomes malformed or duplicates a physical configuration.
for(const id of ids){const seen=new Set<string>();for(const v of variants[id]){const key=`${v.diameter}/${v.length}`;if(v.productId!==id||!Number.isFinite(v.diameter)||!Number.isFinite(v.length)||v.diameter<=0||v.length<=0||seen.has(key)||!['smart','portfolio'].includes(v.source.documentId)||!Number.isInteger(v.source.page)||v.source.page<1||v.verification!=='catalogue-listed')throw new Error(`Invalid catalogue configuration ${id}/${key}`);seen.add(key)}}
export function getVariants(product:KnowledgeProductId|{id:KnowledgeProductId}):readonly ImplantVariant[]{return variants[typeof product==='string'?product:product.id]||[]}
export function resolveVariant(productId:string,diameter:number|string,length:number|string):ImplantVariant|undefined{if(!isProductId(productId))return;const d=typeof diameter==='number'?diameter:diameter.trim()?Number(diameter):NaN;const l=typeof length==='number'?length:length.trim()?Number(length):NaN;if(!Number.isFinite(d)||!Number.isFinite(l))return;return variants[productId].find(v=>v.diameter===d&&v.length===l)}
export const configurationReviewHolds=[{productId:'smart',diameter:5.5,length:15,reason:'Shown in BIOSmart PDF 7 but omitted from the newer V11 supplied size list; not selectable until manufacturer confirmation.',source:{documentId:'smart',page:7}}] as const;
const smartImage=smartMaster.image;const promxImage=promxMaster.ready?promxMaster.image:'/images/products/promx/implant.webp';
const feature=(id:TechnicalFeatureId,title:string,explanation:string,documentId:'smart'|'portfolio',page:number,image:string,origin:readonly [number,number],zoom:number):TechnicalFeature=>({id,title,explanation,source:{documentId,page},verification:'catalogue-confirmed',visual:{image,origin,zoom}});
const knowledge:Record<KnowledgeProductId,ProductKnowledge>={
 smart:{productId:'smart',verification:'catalogue-reviewed',features:[
  feature('connection','Internal conical connection','The BIOSmart engineering diagram identifies an internal conical connection and platform switching. Numeric taper angles and universal component compatibility are not specified here.','smart',3,smartImage,[49,18],1.35),
  feature('collar','Wide, flat collar','The engineering diagram identifies the wide, flat collar. Inspect the genuine image and the source diagram for its geometry.','smart',3,smartImage,[55,28],1.3),
  feature('body','Tapered implant body','The BIOSmart catalogue illustrates a tapered implant body and a rounded apex. This is a description of geometry, not an outcome claim.','smart',3,smartImage,[53,52],1.16),
  feature('thread','Self-tapping thread design','The catalogue labels a self-tapping thread design. The viewer uses the original product image without altering thread geometry.','smart',3,smartImage,[63,59],1.34),
  feature('surface','SLA surface','The BIOSmart engineering page identifies an SLA surface and shows a separate surface-detail image. No clinical outcome or image magnification is assigned here.','smart',3,smartImage,[55,72],1.12),
 ],surface:{label:'SLA',source:{documentId:'smart',page:3}},prosthetics:[
 {id:'healing-abutment',label:'Healing abutments',source:{documentId:'smart',page:10},scope:'catalogue-family-only'},
 {id:'temporary-abutment',label:'Temporary abutments',source:{documentId:'smart',page:10},scope:'catalogue-family-only'},
 {id:'cemented-abutment',label:'Cemented abutments',source:{documentId:'smart',page:11},scope:'catalogue-family-only'},
 {id:'angled-abutment',label:'Angled abutments',source:{documentId:'smart',page:11},scope:'catalogue-family-only'},
 {id:'multi-unit',label:'Multi-unit abutments',source:{documentId:'smart',page:13},scope:'catalogue-family-only'},
 ],resources:[{documentId:'smart',page:3,type:'implant-catalogue',language:'English'},{documentId:'smart',page:4,type:'implant-catalogue',language:'English'},{documentId:'smart',page:8,type:'implant-catalogue',language:'English'},{documentId:'smart',page:10,type:'implant-catalogue',language:'English'}],missing:['Implant SKU list','Manufacturer confirmation for Ø5.5 × 15 mm','Unambiguous approved taper angle','Approved CAD / exploded assembly','Standalone surgical manual / IFU','Per-variant prosthetic compatibility matrix']},
 promx:{productId:'promx',verification:'catalogue-reviewed',features:[
 feature('connection','2.42 mm internal hex','The VTX Two Piece entry identifies a screw-type implant with a 2.42 mm internal hex connection. Smart connection specifications are not applied to ProMX.','portfolio',4,promxImage,[50,10],1.3),
 feature('surface','SLA surface treatment','The VTX Two Piece entry specifies SLA surface treatment and lists a cover screw and implant carrier.','portfolio',4,promxImage,[50,55],1.12),
 feature('dimensions','Reference-based configurations','Published diameter and length combinations follow the individual reference cells in the VTX Two Piece table. Ø3.3 × 6 mm is not listed.','portfolio',4,promxImage,[50,50],1),
 ],surface:{label:'SLA',source:{documentId:'portfolio',page:4}},prosthetics:[],resources:[{documentId:'portfolio',page:4,type:'implant-catalogue',language:'English'}],missing:['New user-supplied Promx PNG original','Model-specific prosthetic compatibility matrix','Approved CAD / section views','Standalone surgical manual / IFU']},
 monoblock:{productId:'monoblock',verification:'catalogue-reviewed',features:[
 feature('one-piece','One-piece platform','The Compressive entry identifies a one-piece platform. Its implant analog and transfer are explicitly listed on the same page.','portfolio',5,'/images/products/monoblock/implant.webp',[50,20],1.15),
 feature('dimensions','Documented size table','The Compressive table lists two Ø3.3 reference rows. Listed dimensions remain selectable; ambiguous Ø3.3 implant reference codes are withheld.','portfolio',5,'/images/products/monoblock/implant.webp',[50,55],1),
 ],prosthetics:[{id:'one-piece-analog',label:'One-piece implant analog',reference:'CAGM-215',source:{documentId:'portfolio',page:5},scope:'catalogue-family-only'},{id:'one-piece-transfer',label:'Transfer for one-piece implant',reference:'CAGM-306',source:{documentId:'portfolio',page:5},scope:'catalogue-family-only'}],resources:[{documentId:'portfolio',page:5,type:'implant-catalogue',language:'English'}],missing:['Variant names separating the two Ø3.3 reference rows','Approved material / surface specification for this family','Standalone surgical manual / IFU','Approved CAD / assembly geometry']},
 zygoma:{productId:'zygoma',verification:'catalogue-reviewed',features:[
 feature('dimensions','Long-form reference range','The Zygomatic entry lists a 4.2 mm diameter with lengths from 35 to 55 mm in 2.5 mm increments. Each published option retains its exact original reference.','portfolio',7,'/images/products/zygoma/implant.webp',[50,50],1),
 ],prosthetics:[],resources:[{documentId:'portfolio',page:7,type:'implant-catalogue',language:'English'}],missing:['Approved connection / surface / material specification for this family','Model-specific prosthetic compatibility matrix','Clinically reviewed anatomical orientation','Standalone surgical manual / IFU','Approved CAD / multiple camera angles']},
};
export function getProductKnowledge(product:KnowledgeProductId|{id:KnowledgeProductId}):ProductKnowledge{return knowledge[typeof product==='string'?product:product.id]}
