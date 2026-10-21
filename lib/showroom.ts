import type {Locale} from './i18n';
import type {MediaKey} from '@/data/media';
import type {ProductId} from '@/data/products';
const interval=Number(process.env.NEXT_PUBLIC_SHOWROOM_INTERVAL_MS||5000);
if(!Number.isInteger(interval)||interval<5000||interval>15000)throw new Error('Showroom interval must be 5000–15000 ms.');
export const showroomMotion={videoStart:600,ambient:9000,entry:760,exit:420,textDelay:180,background:820,autoplay:interval,swipe:52,pointer:6,settle:960} as const;
export const heroPresentation:readonly {id:ProductId;media:MediaKey;theme:string;entryX:number;entryY:number;angle:number;frame:readonly [string,string,string,string];mobileFrame:readonly [string,string,string,string]}[]=[
 {id:'smart',media:'smartHero',theme:'graphite',entryX:28,entryY:45,angle:1.4,frame:['5%','4%','7%','49%'],mobileFrame:['2%','0%','45%','0%']},
 {id:'promx',media:'promxHero',theme:'technical',entryX:-36,entryY:65,angle:-1,frame:['4%','53%','4%','8%'],mobileFrame:['2%','10%','45%','10%']},
 {id:'monoblock',media:'monoblockHero',theme:'titanium',entryX:0,entryY:45,angle:0,frame:['2%','0%','0%','48%'],mobileFrame:['2%','-7%','45%','-7%']},
 {id:'zygoma',media:'zygomaHero',theme:'axis',entryX:12,entryY:85,angle:.5,frame:['1%','5%','0%','51%'],mobileFrame:['0%','0%','43%','0%']},
];
const copy={
 en:{headlines:['Precision.\nAcross four systems.','Two-piece.\nClear configuration.','One piece.\nDistinct architecture.','Long form.\nSpecialized system.'],headline:'Precision.\nAcross four systems.',explore:'Explore',showroom:'Explore the implant portfolio',pause:'Pause automatic progression',resume:'Resume automatic progression',previous:'Previous system',next:'Next system',signature:'Four systems.\nOne portfolio.',compare:'Choose systems to compare',all:'Show all systems',workflow:['Planning','Component selection','Prosthetic workflow'],workflowCopy:['Review the documented system and restorative pathway.','Explore the components illustrated in the BIOSmart catalogue.','Review the catalogue workflow and technical documentation.'],partners:'For dental professionals and distribution partners',inquiry:'Discuss this system',scroll:'Scroll to explore'},
 de:{headlines:['Präzision.\nIn vier Systemen.','Zweiteilig.\nKlar konfiguriert.','Einteilig.\nEigenständig.','Lange Form.\nSpezialisiertes System.'],headline:'Präzision.\nIn vier Systemen.',explore:'Entdecken',showroom:'Das Implantatportfolio entdecken',pause:'Automatischen Wechsel pausieren',resume:'Automatischen Wechsel fortsetzen',previous:'Vorheriges System',next:'Nächstes System',signature:'Vier Systeme.\nEin Portfolio.',compare:'Systeme für den Vergleich wählen',all:'Alle Systeme anzeigen',workflow:['Planung','Komponentenauswahl','Prothetischer Workflow'],workflowCopy:['Dokumentiertes System und prothetischen Ablauf prüfen.','Komponenten im BIOSmart-Katalog entdecken.','Workflow und technische Dokumentation im Katalog prüfen.'],partners:'Für zahnmedizinisches Fachpersonal und Vertriebspartner',inquiry:'Dieses System besprechen',scroll:'Scrollen und entdecken'},
 tr:{headlines:['Hassasiyet.\nDört sistemde.','İki parça.\nNet konfigürasyon.','Tek parça.\nFarklı mimari.','Uzun form.\nÖzel sistem.'],headline:'Hassasiyet.\nDört sistemde.',explore:'İncele',showroom:'İmplant portföyünü keşfedin',pause:'Otomatik geçişi duraklat',resume:'Otomatik geçişi sürdür',previous:'Önceki sistem',next:'Sonraki sistem',signature:'Dört sistem.\nTek portföy.',compare:'Karşılaştırılacak sistemleri seçin',all:'Tüm sistemleri göster',workflow:['Planlama','Bileşen seçimi','Protetik iş akışı'],workflowCopy:['Dokümante edilen sistemi ve protetik yaklaşımı inceleyin.','BIOSmart kataloğunda gösterilen bileşenleri keşfedin.','Katalogdaki iş akışını ve teknik dokümanları inceleyin.'],partners:'Diş hekimleri ve distribütör ortakları için',inquiry:'Bu sistemi görüşelim',scroll:'Keşfetmek için kaydırın'},
 ar:{headlines:['الدقة.\nعبر أربعة أنظمة.','تصميم من جزأين.\nخيارات واضحة.','قطعة واحدة.\nتصميم مميّز.','شكل طويل.\nنظام متخصّص.'],headline:'الدقة.\nعبر أربعة أنظمة.',explore:'استكشف',showroom:'استكشف مجموعة أنظمة الغرسات',pause:'إيقاف التنقل التلقائي',resume:'استئناف التنقل التلقائي',previous:'النظام السابق',next:'النظام التالي',signature:'أربعة أنظمة.\nمجموعة واحدة.',compare:'اختر الأنظمة للمقارنة',all:'عرض جميع الأنظمة',workflow:['التخطيط','اختيار المكونات','سير العمل التعويضي'],workflowCopy:['راجع النظام الموثّق والمسار التعويضي.','استكشف المكونات الموضّحة في كتالوج BIOSmart.','راجع سير العمل والوثائق التقنية في الكتالوج.'],partners:'لأخصائيي طب الأسنان وشركاء التوزيع',inquiry:'ناقش هذا النظام',scroll:'مرّر للاستكشاف'},
};
export const getShowroomCopy=(locale:Locale)=>copy[locale];


// Image geometry remains authentic. These are whole-object stage poses, never physical dimensions.
export type StagePose={x:number;y:number;scale:number;angle:number};
export const productChoreography:Record<ProductId,{enter:StagePose;exit:StagePose;wordX:number;wordY:number;reveal:boolean}>={
 smart:{enter:{x:18,y:76,scale:.90,angle:1.2},exit:{x:-20,y:-70,scale:.90,angle:-1.5},wordX:0,wordY:-25,reveal:false},
 promx:{enter:{x:30,y:90,scale:.90,angle:1.5},exit:{x:-72,y:12,scale:.89,angle:-.6},wordX:-32,wordY:0,reveal:false},
 monoblock:{enter:{x:0,y:58,scale:.95,angle:0},exit:{x:0,y:62,scale:.91,angle:0},wordX:0,wordY:22,reveal:false},
 zygoma:{enter:{x:0,y:96,scale:.96,angle:.3},exit:{x:0,y:-85,scale:.91,angle:0},wordX:0,wordY:-32,reveal:true},
};
export const choreographyTransform=(pose:StagePose,direction=1,intensity=1)=>`translate(${pose.x*direction*intensity}px,${pose.y*intensity}px) rotate(${pose.angle*direction*intensity}deg) scale(${1+(pose.scale-1)*intensity})`;
export const experienceMotion={indicator:360,technicalDelay:340,ctaDelay:310,smallScreenIntensity:.45,tabletIntensity:.7,heroScroll:{copy:.55,product:.86},signature:{duration:1.35,stagger:.17,entry:.28},collection:{smart:48,promx:25,monoblock:16,zygoma:62}} as const;
