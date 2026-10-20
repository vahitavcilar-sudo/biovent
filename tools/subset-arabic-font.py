"""Optional reproducible font reduction. Requires fonttools[woff] and brotli; not needed for npm builds."""
from pathlib import Path
from fontTools.subset import main
from fontTools.ttLib import TTFont
source=Path('assets/fonts/noto-sans-arabic-original.woff2')
target=Path('public/fonts/noto-sans-arabic-variable.woff2')
main([str(source),'--unicodes=U+0020-007E,U+0600-06FF,U+0750-077F,U+08A0-08FF,U+200C-200F,U+202A-202E,U+FB50-FDFF,U+FE70-FEFF','--layout-features=*','--flavor=woff2',f'--output-file={target}'])
font=TTFont(target)
text=''.join(Path(p).read_text() for p in ['content/locales/ar.json','lib/i18n.ts','lib/v4-copy.ts'])
chars={ord(c) for c in text if '\u0600'<=c<='\u06ff' or '\u08a0'<=c<='\u08ff'}
assert not(chars-set(font.getBestCmap()))
assert 'GSUB' in font and 'GPOS' in font and 'fvar' in font
print('Arabic coverage and shaping retained:',target.stat().st_size,'bytes')
