import type {Locale} from './i18n';

const copy={
 en:{playing:'Automatic change every 5 seconds',paused:'Automatic progression paused',reduced:'Changes every 5 seconds · reduced motion',motion:'Page motion is paused',data:'Changes every 5 seconds · data saving',ready:'Four systems · automatic 5-second changes'},
 de:{playing:'Automatischer Wechsel alle 5 Sekunden',paused:'Automatischer Wechsel pausiert',reduced:'Wechsel alle 5 Sekunden · reduzierte Bewegung',motion:'Seitenbewegung ist pausiert',data:'Wechsel alle 5 Sekunden · Datensparmodus',ready:'Vier Systeme · Wechsel alle 5 Sekunden'},
 tr:{playing:'Her 5 saniyede otomatik geçiş',paused:'Otomatik geçiş duraklatıldı',reduced:'5 saniyede değişir · hareket azaltma açık',motion:'Sayfa hareketleri duraklatıldı',data:'5 saniyede değişir · veri tasarrufu açık',ready:'Dört sistem · 5 saniyede otomatik geçiş'},
 ar:{playing:'تنقل تلقائي كل 5 ثوانٍ',paused:'التنقل التلقائي متوقف مؤقتًا',reduced:'تغيير كل 5 ثوانٍ · تقليل الحركة',motion:'حركة الصفحة متوقفة مؤقتًا',data:'تغيير كل 5 ثوانٍ · توفير البيانات',ready:'أربعة أنظمة · تغيير تلقائي كل 5 ثوانٍ'},
};
export const getShowroomPlaybackCopy=(locale:Locale)=>copy[locale];
