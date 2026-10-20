export const basePath=process.env.NEXT_PUBLIC_BASE_PATH||'';
export function asset(path:string):string{return path.startsWith('/')&&!path.startsWith('//')?`${basePath}${path}`:path}
export function deployedUrl(path:string):string{return `${(process.env.SITE_URL||'https://biovent-implant.com').replace(/\/$/,'')}${asset(path)}`}
