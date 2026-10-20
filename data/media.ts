import smart from './smart-asset.json';
import promx from './promx-asset.json';
export type MediaSource={src:string;type:'video/mp4'|'video/webm';bytes:number;width:number;height:number;duration:number;bitrate:number};
export type AngleFrame={src:string;width:number;height:number};
export type MediaAsset={id:string;kind:'decorative'|'informational'|'scrub';approved:boolean;provenance:string;poster:string;mobilePoster?:string;desktop:readonly MediaSource[];mobile:readonly MediaSource[];captions?:Partial<Record<'en'|'de'|'tr'|'ar',string>>;transcript?:Partial<Record<'en'|'de'|'tr'|'ar',string>>;frames?:readonly AngleFrame[];chapterTimes?:readonly number[];hotspotAnchors?:readonly (readonly [number,number])[];priority:number;playOnce?:boolean;requiresCaptions?:boolean};
const missing=(id:string,poster:string,kind:MediaAsset['kind']='decorative',priority=10):MediaAsset=>({id,poster,kind,priority,approved:false,provenance:'Approved still available; manufacturer video not supplied',desktop:[],mobile:[]});
export const mediaAssets={
 smartHero:missing('smart-hero',smart.image,'decorative',80),
 smartInspection:missing('smart-inspection',smart.image,'scrub',90),
 smartConnection:missing('smart-connection',smart.image,'decorative',40),
 smartThread:missing('smart-thread',smart.image,'decorative',40),
 smartSurface:missing('smart-surface','/images/editorial/surface-detail.png','decorative',30),
 promxHero:missing('promx-hero',promx.ready?promx.image:'/images/products/promx/implant.webp'),
 monoblockHero:{...missing('monoblock-hero','/images/products/monoblock/implant.webp'),provenance:'User supplied manufacturer ZIP; original transfer blocked by32MiB limit, derivatives pending review'},
 monoblockTechnical:missing('monoblock-technical','/images/products/monoblock/implant.webp','informational',100),
 zygomaHero:{...missing('zygoma-hero','/images/products/zygoma/implant.webp'),provenance:'User supplied manufacturer ZIP; original transfer blocked by32MiB limit, derivatives pending review'},
 zygomaTechnical:missing('zygoma-technical','/images/products/zygoma/implant.webp','informational',100),
 workflow:missing('digital-workflow','/images/editorial/digital-workflow.webp','decorative',20),
 brandFilm:missing('biovent-brand-film',smart.image,'informational',100),
} satisfies Record<string,MediaAsset>;
export type MediaKey=keyof typeof mediaAssets;
export const mediaBudgets={desktopHeroBytes:6_000_000,mobileHeroBytes:3_000_000,belowFoldBytes:4_000_000,maxActiveDecoders:1,seekInterval:100,seekEpsilon:.06,nearMargin:160,visibilityThreshold:.15} as const;
export function mediaReady(media:MediaAsset){return media.approved&&(media.desktop.length>0||media.mobile.length>0);}
