import type {Locale} from './i18n';

const copy={
 en:{playing:'Automatic progression on',paused:'Automatic progression paused',manual:'Manual selection · press play to continue',interaction:'Paused while inspecting · press play to continue',reduced:'Reduced motion is enabled on your device',motion:'Page motion is paused',data:'Automatic progression off for data saving',ready:'Explore with the arrows or press play'},
 de:{playing:'Automatischer Wechsel aktiv',paused:'Automatischer Wechsel pausiert',manual:'Manuelle Auswahl · zum Fortsetzen abspielen',interaction:'Beim Betrachten pausiert · zum Fortsetzen abspielen',reduced:'Auf Ihrem Gerät ist reduzierte Bewegung aktiviert',motion:'Seitenbewegung ist pausiert',data:'Automatischer Wechsel im Datensparmodus deaktiviert',ready:'Mit den Pfeilen erkunden oder abspielen'},
 tr:{playing:'Otomatik geçiş açık',paused:'Otomatik geçiş duraklatıldı',manual:'Manuel seçim · devam etmek için oynatın',interaction:'İnceleme için duraklatıldı · devam etmek için oynatın',reduced:'Cihazınızda hareket azaltma açık',motion:'Sayfa hareketleri duraklatıldı',data:'Veri tasarrufunda otomatik geçiş kapalı',ready:'Oklarla inceleyin veya oynatın'},
 ar:{playing:'التنقل التلقائي مفعّل',paused:'التنقل التلقائي متوقف مؤقتًا',manual:'اختيار يدوي · اضغط التشغيل للمتابعة',interaction:'متوقف أثناء الفحص · اضغط التشغيل للمتابعة',reduced:'تقليل الحركة مفعّل على جهازك',motion:'حركة الصفحة متوقفة مؤقتًا',data:'التنقل التلقائي متوقف لتوفير البيانات',ready:'استكشف بالأسهم أو اضغط التشغيل'},
};
export const getShowroomPlaybackCopy=(locale:Locale)=>copy[locale];
