// Receipt acceptance is distinct from downstream email delivery. Keys exist only in this tab's memory.
export type ReceiptResult={kind:'preview'}|{kind:'accepted';reference:string}|{kind:'error';reason?:'rate'|'configuration'|'network'};
const attempts=new Map<string,string>();
function attemptKey(body:string){let key=attempts.get(body);if(!key){key=globalThis.crypto?.randomUUID?.()||'10000000-1000-4000-8000-100000000000'.replace(/[018]/g,c=>(Number(c)^Math.random()*16>>Number(c)/4).toString(16));if(attempts.size>=8)attempts.delete(attempts.keys().next().value!);attempts.set(body,key)}return key}
export async function submitReceipt(endpoint:string,payload:unknown):Promise<ReceiptResult>{
 if(!endpoint)return {kind:'preview'};
 const body=JSON.stringify(payload),key=attemptKey(body);
 try{const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json','Idempotency-Key':key},body,credentials:'omit',signal:AbortSignal.timeout(15000)});if(!response.ok)return {kind:'error',reason:response.status===429?'rate':response.status===503?'configuration':'network'};const data:unknown=await response.json();if(!data||typeof data!=='object'||!('accepted'in data)||data.accepted!==true||!('reference'in data)||typeof data.reference!=='string'||!/^[A-Za-z0-9][A-Za-z0-9._-]{3,119}$/.test(data.reference))return {kind:'error'};return {kind:'accepted',reference:data.reference}}catch{return {kind:'error',reason:'network'}}
}
