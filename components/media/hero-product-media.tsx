import type {Product} from '@/data/products';
import {mediaAssets,mediaReady,type MediaKey,type MediaAsset} from '@/data/media';
import type {Locale} from '@/lib/i18n';
import {StaticImage} from '@/components/ui/static-image';
import {MediaStage} from './media-stage';
export function HeroProductMedia({product,mediaKey,locale,enabled,priority=false}:{product:Product;mediaKey:MediaKey;locale:Locale;enabled:boolean;priority?:boolean}){
 const media:MediaAsset=mediaAssets[mediaKey];
 if(!mediaReady(media))return <StaticImage src={product.image} alt={product.name} width={product.imageWidth} height={product.imageHeight} priority={priority} sizes="(max-width:768px) 88vw,46vw" className="showroom-implant"/>;
 const source=media.desktop[0]||media.mobile[0];
 return <MediaStage mediaKey={mediaKey} locale={locale} enabled={enabled}><StaticImage src={media.poster} alt={product.name} width={source.width} height={source.height} sizes="(max-width:768px) 88vw,46vw" className="showroom-implant"/></MediaStage>;
}
