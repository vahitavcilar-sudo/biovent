import type {Copy,Locale} from './i18n';
import {getV4Copy} from './v4-copy';
export function smartInspectionSteps(locale:Locale,c:Copy){const v=getV4Copy(locale);return [{title:c.featureConnection,copy:c.featureConnectionCopy},{title:v.platform,copy:v.platformCopy},{title:c.featureBody,copy:c.featureBodyCopy},{title:c.thread,copy:c.threadCopy},{title:v.surface,copy:v.surfaceCopy}];}
