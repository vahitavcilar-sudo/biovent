import type {Locale} from './i18n';
export const getResourceCategoryNames=(locale:Locale)=>({
 en:{'implant-catalogue':'Implant catalogues','prosthetic-catalogue':'Prosthetic catalogues','surgical-protocol':'Surgical protocols',ifu:'Instructions for use','cad-library':'CAD libraries','quality-document':'Quality documents','technical-guide':'Technical guides','product-video':'Product videos'},
 de:{'implant-catalogue':'Implantatkataloge','prosthetic-catalogue':'Prothetikkataloge','surgical-protocol':'Chirurgische Protokolle',ifu:'Gebrauchsanweisungen','cad-library':'CAD-Bibliotheken','quality-document':'Qualitätsunterlagen','technical-guide':'Technische Leitfäden','product-video':'Produktvideos'},
 tr:{'implant-catalogue':'İmplant katalogları','prosthetic-catalogue':'Protetik kataloglar','surgical-protocol':'Cerrahi protokoller',ifu:'Kullanım talimatları','cad-library':'CAD kütüphaneleri','quality-document':'Kalite dokümanları','technical-guide':'Teknik kılavuzlar','product-video':'Ürün videoları'},
 ar:{'implant-catalogue':'كتالوجات الغرسات','prosthetic-catalogue':'كتالوجات التعويضات','surgical-protocol':'البروتوكولات الجراحية',ifu:'تعليمات الاستخدام','cad-library':'مكتبات CAD','quality-document':'وثائق الجودة','technical-guide':'الأدلة التقنية','product-video':'فيديوهات المنتجات'},
})[locale];
