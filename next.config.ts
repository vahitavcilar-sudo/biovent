import type {NextConfig} from 'next';
const isExport=process.env.BIOVENT_STATIC_EXPORT==='1';const basePath=process.env.NEXT_PUBLIC_BASE_PATH||'';
if(basePath&&!/^\/[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*$/.test(basePath))throw new Error('NEXT_PUBLIC_BASE_PATH must be a clean subdirectory without trailing slash.');
const config:NextConfig={basePath,trailingSlash:true,output:isExport?'export':undefined,images:{unoptimized:isExport,formats:['image/avif','image/webp']},poweredByHeader:false,experimental:{cpus:4}};
export default config;
