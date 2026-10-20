import {findProduct,type ProductId} from '@/data/products';
import {getVariants,resolveVariant} from '@/data/product-knowledge';
import {isLocale,type Locale} from '@/lib/i18n';
export type ProfessionalPurpose='information'|'quotation';
export interface ProfessionalDraft{contactName:string;company:string;country:string;email:string;phone:string;product:ProductId|'';diameter:string;length:string;quantity:string;message:string;purpose:ProfessionalPurpose;consent:boolean;honeypot:string}
export interface ProfessionalPayload{kind:'professional';purpose:ProfessionalPurpose;contactName:string;company:string;country:string;email:string;phone:string;product:ProductId;diameter:number|null;length:number|null;reference:string|null;quantity:number|null;message:string;consent:true;honeypot:string;locale:Locale}
export type ProfessionalErrors=Partial<Record<keyof ProfessionalDraft,'required'|'email'|'quantity'|'configuration'|'consent'>>;
export type ProfessionalResult={kind:'preview'}|{kind:'accepted';reference?:string}|{kind:'error'};
export const professionalEndpoint=process.env.NEXT_PUBLIC_PROFESSIONAL_ENQUIRY_ENDPOINT||'';
export const professionalStorageKey='biovent-professional-enquiry-v11';
export const initialProfessionalDraft:ProfessionalDraft={contactName:'',company:'',country:'',email:'',phone:'',product:'',diameter:'',length:'',quantity:'',message:'',purpose:'information',consent:false,honeypot:''};
export function restoreProfessionalDraft(value:unknown):ProfessionalDraft{
 const draft={...initialProfessionalDraft};if(!value||typeof value!=='object')return draft;const source=value as Record<string,unknown>;
 for(const key of ['contactName','company','country','email','phone','diameter','length','quantity','message','honeypot'] as const){if(typeof source[key]==='string')draft[key]=source[key].slice(0,key==='message'?2000:key==='email'?254:160)}
 if(typeof source.product==='string'&&findProduct(source.product))draft.product=source.product as ProductId;
 draft.purpose=source.purpose==='quotation'?'quotation':'information';draft.consent=source.consent===true;
 if(!draft.product||!resolveVariant(draft.product,draft.diameter,draft.length)){draft.diameter='';draft.length=''}return draft;
}
export function applyProfessionalIntent(query:URLSearchParams,draft:ProfessionalDraft):{draft:ProfessionalDraft;invalid:boolean}{
 const next={...draft};let invalid=false;const product=query.get('product');
 if(product!==null){if(findProduct(product)){next.product=product as ProductId;if(product!==draft.product){next.diameter='';next.length=''}}else{invalid=true;next.product='';next.diameter='';next.length=''}}
 if(query.has('purpose'))next.purpose=query.get('purpose')==='quotation'?'quotation':'information';
 if(query.has('diameter')||query.has('length')){const variant=next.product?resolveVariant(next.product,query.get('diameter')||'',query.get('length')||''):undefined;if(variant){next.diameter=String(variant.diameter);next.length=String(variant.length)}else{next.diameter='';next.length='';invalid=true}}
 // A URL reference/SKU is deliberately ignored. The catalogue is the only authority.
 return {draft:next,invalid};
}
export function validateProfessionalDraft(draft:ProfessionalDraft):ProfessionalErrors{
 const errors:ProfessionalErrors={};for(const key of ['contactName','company','country','email'] as const)if(!draft[key].trim())errors[key]='required';
 if(draft.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim()))errors.email='email';
 if(!draft.product||!findProduct(draft.product))errors.product='required';
 if((draft.diameter||draft.length)&&(!draft.product||!resolveVariant(draft.product,draft.diameter,draft.length)))errors.diameter='configuration';
 if(draft.quantity&&(!/^\d+$/.test(draft.quantity)||Number(draft.quantity)<1||Number(draft.quantity)>100000))errors.quantity='quantity';
 if(!draft.consent)errors.consent='consent';return errors;
}
export function professionalPayload(draft:ProfessionalDraft,locale:Locale):ProfessionalPayload|undefined{
 if(Object.keys(validateProfessionalDraft(draft)).length||!draft.product)return undefined;
 const variant=resolveVariant(draft.product,draft.diameter,draft.length);
 return {kind:'professional',purpose:draft.purpose,contactName:draft.contactName.trim(),company:draft.company.trim(),country:draft.country.trim(),email:draft.email.trim(),phone:draft.phone.trim(),product:draft.product,diameter:variant?.diameter??null,length:variant?.length??null,reference:variant?.reference??null,quantity:draft.quantity?Number(draft.quantity):null,message:draft.message.trim(),consent:true,honeypot:draft.honeypot,locale};
}
export function validProfessionalPayload(value:unknown):value is ProfessionalPayload{
 if(!value||typeof value!=='object')return false;const p=value as Record<string,unknown>;
 if(p.kind!=='professional'||p.consent!==true||p.honeypot!==''||typeof p.product!=='string'||!findProduct(p.product)||typeof p.locale!=='string'||!isLocale(p.locale)||!['information','quotation'].includes(String(p.purpose)))return false;
 for(const key of ['contactName','company','country','email','phone'] as const){const field=p[key];if(typeof field!=='string'||field.length>(key==='email'?254:160)||/[\r\n\0]/.test(field)||key!=='phone'&&!field.trim())return false}
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email as string)||typeof p.message!=='string'||p.message.length>2000||p.message.includes('\0'))return false;
 if(p.quantity!==null&&(typeof p.quantity!=='number'||!Number.isInteger(p.quantity)||p.quantity<1||p.quantity>100000))return false;
 if((p.diameter===null)!==(p.length===null))return false;
 if(p.reference!==null&&(typeof p.reference!=='string'||p.reference.length>120))return false;
 if(p.diameter===null)return p.length===null&&p.reference===null;
 if(typeof p.diameter!=='number'||typeof p.length!=='number')return false;const variant=resolveVariant(p.product,p.diameter,p.length);return !!variant&&(p.reference??null)===(variant.reference??null);
}
export async function submitProfessionalEnquiry(payload:ProfessionalPayload):Promise<ProfessionalResult>{
 if(!validProfessionalPayload(payload))return {kind:'error'};
 if(!professionalEndpoint)return {kind:'preview'};
 try{const response=await fetch(professionalEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),credentials:'omit',signal:AbortSignal.timeout(15000)});if(!response.ok)return {kind:'error'};const body:unknown=await response.json();if(!body||typeof body!=='object'||!('accepted'in body)||body.accepted!==true)return {kind:'error'};return {kind:'accepted',reference:'reference'in body&&typeof body.reference==='string'?body.reference.slice(0,120):undefined}}catch{return {kind:'error'}}
}
export function professionalDiameters(product:ProductId){return [...new Set(getVariants(product).map(v=>v.diameter))]}
