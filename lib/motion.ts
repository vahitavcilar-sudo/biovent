// One motion vocabulary. Values are milliseconds; animation touches transforms/opacity.
export const motion = {
  fast: 180, ui: 280, medium: 480, slow: 750, cinematic: 1100,
  enter: 'cubic-bezier(.16,1,.3,1)', standard: 'cubic-bezier(.22,1,.36,1)',
  exit: 'cubic-bezier(.4,0,1,1)', stagger: 65, threshold: .14,
  routeCover: 210, routeClear: 330, routeTimeout: 1800,
} as const;
export const reducedMotion = () => typeof window !== 'undefined' && (window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.motionPaused==='true');
export const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));
const scenes = new Set<() => void>();
let frame = 0;
function update() { frame = 0; scenes.forEach(scene => scene()); }
function schedule() { if (!frame) frame = requestAnimationFrame(update); }
export function subscribeScroll(scene: () => void) {
  if (!scenes.size) { window.addEventListener('scroll', schedule, {passive: true}); window.addEventListener('resize', schedule, {passive: true}); }
  scenes.add(scene); schedule();
  return () => { scenes.delete(scene); if (!scenes.size) { window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); cancelAnimationFrame(frame); frame = 0; } };
}
export function enter(element: HTMLElement, kind = 'content', delay = 0) {
  if (reducedMotion()) return;
  const baseline = getComputedStyle(element).transform;
  const frames: Keyframe[] = kind === 'image' ? [{opacity: 0, transform: 'translateY(15px) scale(.985)', clipPath: 'inset(0 0 100% 0)'}, {opacity: 1, transform: baseline, clipPath: 'inset(0)'}]
    : kind === 'product' ? [{opacity: .15, transform: 'translateY(28px) rotate(.4deg) scale(.985)'}, {opacity: 1, transform: baseline}]
    : kind === 'line' ? [{transform: 'translateY(105%)'}, {transform: baseline}]
    : [{opacity: 0, transform: `translateY(${kind === 'label' ? 8 : 24}px)`}, {opacity: 1, transform: baseline}];
  const animation = element.animate(frames, {duration: kind === 'line' || kind === 'product' ? motion.slow : motion.medium, delay, easing: motion.enter, fill: 'backwards'});
  return animation;
}
// CSS receives the same tokens from the server-rendered locale layout.
export const motionTokens = {
 '--motion-fast': `${motion.fast}ms`, '--motion-ui': `${motion.ui}ms`,
 '--motion-medium': `${motion.medium}ms`, '--motion-slow': `${motion.slow}ms`,
 '--motion-cinematic': `${motion.cinematic}ms`, '--ease-standard': motion.standard,
 '--ease-enter': motion.enter, '--ease-exit': motion.exit,
} as const;
