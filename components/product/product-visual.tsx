import {DeferredMedia} from '@/components/media/deferred-media';
import {MediaStage} from '@/components/media/media-stage';
import type {MediaKey} from '@/data/media';
import type {Locale} from '@/lib/i18n';
import {StaticImage as Image} from '@/components/ui/static-image';
import type {Product} from '@/data/products';
export function ProductVisual({product,priority=false,large=false,mediaKey,locale}:{product:Product;priority?:boolean;large?:boolean;mediaKey?:MediaKey;locale?:Locale}){return <div className={`product-stage product-stage-${product.id} ${large?'stage-large':''}`}><div className="precision-grid" aria-hidden="true"/><div className="product-orbit" aria-hidden="true"/>{mediaKey&&<MediaStage mediaKey={mediaKey} locale={locale}><span className="sr-only">{product.name}</span></MediaStage>}{product.image?<div className="product-image-motion"><div className="product-image-position"><div className="product-image-ambient"><DeferredMediaSwitch priority={priority}><Image src={product.image} alt={product.name} width={product.imageWidth} height={product.imageHeight} preload={priority} sizes={large?'(max-width: 768px) 80vw, 40vw':'(max-width: 768px) 65vw, 28vw'} className="implant-image"/></DeferredMediaSwitch></div></div></div>:<div className="master-awaiting" data-master-missing="true"><span>BIOSmart</span><strong>Smart Implant</strong></div>}<span className="stage-source">{product.catalogueName}</span><span className="stage-corner" aria-hidden="true">+</span></div>}

function DeferredMediaSwitch({priority,children}:{priority:boolean;children:import('react').ReactNode}){return priority?<>{children}</>:<DeferredMedia>{children}</DeferredMedia>}
