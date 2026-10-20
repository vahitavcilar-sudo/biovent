"""Create a portable preview archive without Git metadata or local secrets."""
import argparse
import hashlib
import json
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parent.parent
parser = argparse.ArgumentParser()
parser.add_argument('--output', type=Path, default=root.parent / 'biovent-site-v2.zip')
args = parser.parse_args()
files = [root / name for name in ['index.html', 'style.css', 'content.js', 'app.js', 'README.md', 'VALIDATION.md', 'ONCE-BUNU-OKU.txt']]
files += [p for p in (root / 'assets').iterdir() if p.is_file() and p.suffix.lower() in {'.pdf', '.svg', '.png', '.jpg', '.webp'}]
files += [p for p in (root / 'tools').iterdir() if p.is_file() and p.suffix in {'.cjs', '.py'}]
manifest = {str(p.relative_to(root)): hashlib.sha256(p.read_bytes()).hexdigest() for p in files}
with ZipFile(args.output, 'w', ZIP_DEFLATED, compresslevel=9) as archive:
    for p in sorted(files):
        archive.write(p, Path('biovent-site-v2') / p.relative_to(root))
    archive.writestr('biovent-site-v2/manifest.json', json.dumps(manifest, indent=2))
with ZipFile(args.output) as archive:
    assert archive.testzip() is None, 'Archive integrity check failed'
    for name, digest in manifest.items():
        assert hashlib.sha256(archive.read('biovent-site-v2/' + name)).hexdigest() == digest
print(f'Archive verified: {len(manifest)} files, {args.output.stat().st_size:,} bytes')
