"""Preserve Arabic core/variable shaping; load extended coverage only when needed.
Requires fonttools and brotli. Original font remains in assets/fonts.
"""
from pathlib import Path
import hashlib,json,shutil
from fontTools import subset
from fontTools.ttLib import TTFont
root=Path(__file__).resolve().parents[1]
source=root/'assets/fonts/noto-sans-arabic-original.woff2'
font=TTFont(source)
options=subset.Options();options.flavor='woff2';options.layout_features=['*'];options.name_IDs=['*'];options.name_languages=['*'];options.name_legacy=True
points=set(range(0x600,0x700))|set(range(0x20,0x100))|{0x200c,0x200d,0x2014,0x2026}
s=subset.Subsetter(options=options);s.populate(unicodes=points);s.subset(font);font.flavor='woff2'
for table in ['GSUB','GPOS','fvar','gvar']:assert table in font,table
axis=next(x for x in font['fvar'].axes if x.axisTag=='wght');assert axis.minValue==100 and axis.maxValue==900
# Source copy spans all languages; Arabic characters in any UI copy must remain.
text=''.join(p.read_text() for folder in ['content','lib'] for p in (root/folder).rglob('*') if p.is_file() and p.suffix in ['.ts','.json'])
arabic={ord(x) for x in text if 0x600<=ord(x)<=0x6ff};assert arabic<=font.getBestCmap().keys()
dest=root/'public/fonts/noto-sans-arabic-variable.woff2';font.save(dest)
shutil.copy2(source,root/'public/fonts/noto-sans-arabic-extended.woff2')
(root/'data/arabic-font.json').write_text(json.dumps({'originalSHA256':hashlib.sha256(source.read_bytes()).hexdigest(),'coreBytes':dest.stat().st_size,'originalBytes':source.stat().st_size,'verifiedArabicCodepoints':len(arabic),'weightRange':[100,900],'shapingTablesPreserved':True,'extendedFace':'lazy unicode-range fallback'},indent=2))
print(dest.stat().st_size)
