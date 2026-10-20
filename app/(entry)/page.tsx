import type {Metadata} from 'next';import {asset,deployedUrl} from '@/lib/paths';
export const metadata:Metadata={title:'Biovent Dental Implant Systems',robots:{index:false,follow:true},alternates:{canonical:deployedUrl('/en/')}};
// Apache/LiteSpeed .htaccess performs the primary HTTP redirect. Static fallback works without JavaScript.
export default function Page(){return <><meta httpEquiv="refresh" content={`0;url=${asset('/en/')}`}/><main><h1>Biovent Dental Implant Systems</h1><a href={asset('/en/')}>English</a></main></>}
