import type {Locale} from './i18n';
import {getV11ProductCopy} from './v11-product-copy';
export function getViewerControls(locale:Locale){const t=getV11ProductCopy(locale);return {imageViewer:t.imageViewer,viewControls:t.viewControls,zoomIn:t.zoomIn,zoomOut:t.zoomOut,zoomLevel:t.zoomLevel,reset:t.reset,inspect:t.inspect,featureNavigation:t.featureNavigation,controlsHelp:t.controlsHelp,sourceDetail:t.sourceDetail,sourceContext:t.sourceContext}}
