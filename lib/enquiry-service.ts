import {submitReceipt,type ReceiptResult} from './submission';
import type {ProductId} from '@/data/products';
export interface EnquiryPayload{company:string;contactName:string;email:string;website:string;country:string;phone:string;experience:string;products:ProductId[];locale:string;consent:boolean;honeypot:string}
export type SubmissionResult=ReceiptResult;
export const enquiryEndpoint=process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT||'';
export function validDistributorPayload(p:EnquiryPayload){
 if(p.honeypot!==''||!p.consent||!['en','de','tr','ar'].includes(p.locale)||!Array.isArray(p.products)||!p.products.length||p.products.length>4||new Set(p.products).size!==p.products.length||p.products.some(id=>!['smart','promx','monoblock','zygoma'].includes(id)))return false;
 for(const k of ['company','contactName','email','country','phone','website'] as const){if(typeof p[k]!=='string'||p[k].length>(k==='email'||k==='website'?254:160)||/[\r\n\0]/.test(p[k])||!['phone','website'].includes(k)&&!p[k].trim())return false}
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)||typeof p.experience!=='string'||p.experience.length>2000||p.experience.includes('\0'))return false;
 if(p.website){try{if(!['http:','https:'].includes(new URL(p.website).protocol))return false}catch{return false}}return true;
}
export async function submitDistributorEnquiry(payload:EnquiryPayload):Promise<SubmissionResult>{if(payload.honeypot)return {kind:'error'};if(!enquiryEndpoint)return {kind:'preview'};if(!validDistributorPayload(payload))return {kind:'error'};return submitReceipt(enquiryEndpoint,payload)}
