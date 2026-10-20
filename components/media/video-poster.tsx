import type {MediaAsset} from '@/data/media';
import {asset} from '@/lib/paths';
export function VideoPoster({media,informational}:{media:MediaAsset;informational:boolean}){return <div className={`video-poster ${media.mobile.length&&media.mobilePoster?'':'no-mobile'}`} aria-hidden={informational?undefined:true}><picture>{media.mobilePoster&&<source media="(max-width: 768px)" srcSet={asset(media.mobilePoster)}/>}<img src={asset(media.poster)} alt="" width={media.desktop[0]?.width||1320} height={media.desktop[0]?.height||1153} loading="lazy" decoding="async"/></picture></div>}
