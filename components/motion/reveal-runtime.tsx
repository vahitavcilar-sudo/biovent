'use client';
import {useEffect} from 'react';
import {usePathname} from 'next/navigation';
import {clamp, enter, motion, subscribeScroll} from '@/lib/motion';
export function RevealRuntime({benchmark = false}: {benchmark?: boolean}) {
  const pathname = usePathname();
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let firstCollect = true;
    const observed = new WeakSet<Element>(); const animations = new Set<Animation>();
    const play = (element: HTMLElement, initial=false) => {
      if (element.dataset.revealed) return;
      element.dataset.revealed = 'true'; element.classList.remove('motion-pending');
      if (preference.matches || initial&&!document.documentElement.dataset.routeArrival) return;
      const lines = element.querySelectorAll<HTMLElement>('.line-inner');
      if (element.dataset.reveal === 'headline' && lines.length) lines.forEach((line, i) => { const a = enter(line,'line',i*motion.stagger); if (a) {animations.add(a);a.finished.catch(()=>{}).finally(()=>animations.delete(a));} });
      else { const a = enter(element, element.dataset.reveal, Number(element.dataset.delay || 0)); if (a) { animations.add(a); a.finished.catch(()=>{}).finally(()=>animations.delete(a)); } }
    };
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { play(entry.target as HTMLElement); observer.unobserve(entry.target); } }), {threshold: motion.threshold});
    const collect = () => {
      if (!benchmark) {
        const grammar: [string,string,number][] = [
          ['.product-hero-copy>.eyebrow','label',80],
          ['.product-hero-copy h1','headline',150],
          ['.product-hero-copy>.lead,.product-hero-copy>.catalogue-name,.product-fact-strip','content',220],
          ['.product-hero-copy .hero-actions','content',300],
          ['.page-intro h1,.section-heading h2,.v4-statement h2,.workflow-copy h2,.about-brand-grid h2,.distributor-banner h2,.surface-grid h2,.related-products>h2','headline',0],
          ['.v4-statement>div>p,.section-heading>p,.workflow-copy>p:not(.eyebrow),.v4-system-copy>p:not(.eyebrow),.product-editorial>div>p:not(.eyebrow)','content',100],
          ['.v4-system-copy>.eyebrow,.section-rule,.v4-system-copy>h3,.v4-portfolio-heading>.eyebrow','label',0],
          ['.v4-system-visual .product-image-motion,.product-editorial .product-image-motion','product',0],
          ['.v4-system-copy dl>div,.editorial-specs>div,.about-pillars>div,.partnership-steps>div','content',170],
          ['.v4-system-copy>.text-link,.product-editorial .button','content',260],
          ['.workflow-image,.document-cover img','image',0],
          ['.footer-top>div,.v4-footer-brand-strip>.container','content',0],
        ];
        grammar.forEach(([selector,kind,delay])=>document.querySelectorAll<HTMLElement>(selector).forEach((el,i)=>{if(el.closest('.legal-copy')||el.dataset.reveal)return;if(selector.startsWith('.product-hero-copy')&&!document.documentElement.dataset.routeArrival)return;el.dataset.reveal=kind;el.dataset.delay=String(delay+(kind==='content'?i%3*motion.stagger:0));}));
      }
      const scope = benchmark ? '[data-benchmark] [data-reveal], [data-benchmark][data-reveal]' : '[data-reveal]';
      document.querySelectorAll<HTMLElement>(scope).forEach(element => { if (observed.has(element) || element.dataset.revealed) return; observed.add(element); if (preference.matches || element.getBoundingClientRect().top < innerHeight*.86) play(element,firstCollect); else { element.classList.add('motion-pending'); observer.observe(element); } });
      firstCollect = false;
    };
    const mutation = new MutationObserver(collect); mutation.observe(document.getElementById('main')!, {childList:true,subtree:true});
    const focus = (event: FocusEvent) => { const node = event.target as HTMLElement; node.closest<HTMLElement>('[data-reveal]')?.classList.remove('motion-pending'); };
    const reset = () => { animations.forEach(a=>a.cancel()); animations.clear(); document.querySelectorAll('.motion-pending').forEach(e=>e.classList.remove('motion-pending')); collect(); };
    const stopScroll = subscribeScroll(()=>{ if (benchmark || preference.matches || !matchMedia('(min-width: 769px)').matches) return; document.querySelectorAll<HTMLElement>('.v4-system-visual,.product-editorial>.product-stage').forEach(node=>{const r=node.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;node.style.setProperty('--row-shift',`${((clamp((innerHeight*.5-r.top)/Math.max(innerHeight,1),-1,1))*24).toFixed(2)}px`);}); });
    let pointerFrame=0;const pointer=(event:PointerEvent)=>{if(benchmark||preference.matches||event.pointerType!=='mouse'||!matchMedia('(hover:hover) and (pointer:fine)').matches)return;const scene=(event.target as Element).closest<HTMLElement>('.v4-system-visual,.product-editorial>.product-stage');if(!scene)return;cancelAnimationFrame(pointerFrame);pointerFrame=requestAnimationFrame(()=>{const r=scene.getBoundingClientRect();scene.style.setProperty('--product-pointer-x',`${clamp((event.clientX-r.left)/r.width*8-4,-4,4)}px`);scene.style.setProperty('--product-pointer-y',`${clamp((event.clientY-r.top)/r.height*8-4,-4,4)}px`);});};
    const leave=(event:PointerEvent)=>{const scene=(event.target as Element).closest<HTMLElement>('.v4-system-visual,.product-editorial>.product-stage');if(scene&&!scene.contains(event.relatedTarget as Node|null)){scene.style.setProperty('--product-pointer-x','0px');scene.style.setProperty('--product-pointer-y','0px');}};
    document.addEventListener('pointermove',pointer,{passive:true});document.addEventListener('pointerout',leave);
    collect(); document.addEventListener('biovent:motion-changed',reset);preference.addEventListener('change',reset); document.addEventListener('focusin',focus);
    return () => { document.removeEventListener('biovent:motion-changed',reset);stopScroll(); cancelAnimationFrame(pointerFrame);document.removeEventListener('pointermove',pointer);document.removeEventListener('pointerout',leave);observer.disconnect(); mutation.disconnect(); animations.forEach(a=>a.cancel()); document.querySelectorAll('.motion-pending').forEach(e=>e.classList.remove('motion-pending')); preference.removeEventListener('change',reset); document.removeEventListener('focusin',focus); };
  }, [pathname, benchmark]);
  return null;
}
