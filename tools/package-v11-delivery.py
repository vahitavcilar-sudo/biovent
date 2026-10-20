"""Archive the exact validated V11 build. Does not publish or deploy anything."""
from pathlib import Path
import hashlib
import json
import shutil
import subprocess
import zipfile

repo = Path(__file__).resolve().parents[1]
art = repo / 'artifacts/v11'
package = Path('/tmp/biovent-v11-local-test')
build = (repo / '.next/BUILD_ID').read_text().strip()
reports = {}
for name in [
    'browser-results', 'showroom-results', 'showroom-lifecycle',
    'choreography-results', 'motion-results', 'accessibility-results',
    'showroom-accessibility', 'product-data-tests', 'configuration-browser',
    'viewer-results', 'viewer-a11y', 'professional-service',
    'professional-browser', 'professional-accessibility', 'resources-results',
    'launcher-http', 'deep-links', 'subfolder-tests',
]:
    data = json.loads((art / (name + '.json')).read_text())
    assert data['passed'], name
    if 'buildId' in data:
        assert data['buildId'] == build, name
    reports[name] = data

records = json.loads((art / 'video-records.json').read_text())
assert len(records['records']) == 14
assert all(row['buildId'] == build for row in records['records'])
reports['video-records'] = records
perf = json.loads((art / 'lighthouse/summary.json').read_text())
assert len(perf) == 5 and all(row['buildId'] == build for row in perf)
assert all(row['scores']['accessibility'] >= 90 for row in perf)
frames = json.loads((art / 'frame-and-transfer.json').read_text())
assert frames['buildId'] == build and frames['publicVideoFiles'] == 0
reports.update(buildId=build, lighthouse=perf, frameAndTransfer=frames,
               windowsExecuted=False, livePublished=False,
               realFormDeliveryTested=False, newPromxOriginalImported=False)
package.mkdir(exist_ok=True)
(package / 'TEST-SONUCLARI.json').write_text(json.dumps(reports, indent=2, ensure_ascii=False))
for source, target in [('V11_QA_REPORT.md', 'TEST-ACIKLAMASI.md'),
                       ('V11_CHANGELOG.md', 'V11-DEGISIKLIKLER.md'),
                       ('V11_LOCAL_RUNNING.md', 'KAYNAK-KODU-CALISTIRMA.md')]:
    shutil.copy2(repo / source, package / target)
video = package / 'HAREKET-VIDEOLARI'
video.mkdir(exist_ok=True)
clips = sorted((art / 'videos').glob('*.webm'))
assert len(clips) == 14
for clip in clips:
    shutil.copy2(clip, video / clip.name)
(video / 'VIDEOLARI-AC.html').write_text(
    '<!doctype html><html lang="tr"><meta charset="utf-8">'
    '<title>BioVent V11 tarayıcı kayıtları</title><style>body{font:18px sans-serif;'
    'background:#101214;color:white;max-width:1100px;margin:40px auto;padding:20px}'
    'video{width:100%;max-height:700px}section{margin:40px 0}</style>'
    '<h1>BioVent V11 — tarayıcı kayıtları</h1>'
    '<p>Siteyi gezmek için ana klasördeki SITEYI-AC.bat dosyasını açın. '
    'Bu kayıtlar ürün filmi değil, gerçek tarayıcı kullanım kaydıdır.</p>'
    + ''.join(f'<section><h2>{clip.stem}</h2><video controls preload="metadata" '
              f'src="{clip.name}"></video></section>' for clip in clips), encoding='utf-8')
subprocess.run(['python', str(repo / 'tools/local-preview/package-windows-v11.py')],
               cwd=repo, check=True)


def archive(destination, files, prefix=''):
    names = [name for _, name in files]
    assert len(set(names)) == len(names), 'Duplicate archive entries'
    assert 'SHA256-MANIFEST.json' not in names
    manifest = {name: hashlib.sha256(path.read_bytes()).hexdigest() for path, name in files}
    with zipfile.ZipFile(destination, 'w', zipfile.ZIP_DEFLATED, compresslevel=6) as output:
        for path, name in files:
            output.write(path, prefix + name)
        output.writestr(prefix + 'SHA256-MANIFEST.json', json.dumps(manifest, indent=2))
    with zipfile.ZipFile(destination) as output:
        assert output.testzip() is None
        for name, digest in manifest.items():
            assert hashlib.sha256(output.read(prefix + name)).hexdigest() == digest, name
    assert destination.stat().st_size < 100_000_000, 'GitHub file size budget exceeded'
    return {'path': str(destination), 'bytes': destination.stat().st_size,
            'files': len(manifest) + 1,
            'sha256': hashlib.sha256(destination.read_bytes()).hexdigest()}


skip = {'.git', 'node_modules', '.next', '.next-export', 'out', 'artifacts',
        'media-source', '__pycache__', 'coverage'}
files = []
for path in sorted(repo.rglob('*')):
    if not path.is_file():
        continue
    relative = path.relative_to(repo)
    if any(part in skip for part in relative.parts):
        continue
    if (path.name.startswith('.env') and path.name != '.env.example') or path.name.endswith('.tsbuildinfo'):
        continue
    if relative.parts[:2] == ('deployment', 'wordpress-hosting') and len(relative.parts) > 2:
        if relative.parts[2] in {'public_html', 'draft-public_html', 'draft-subfolder'}:
            continue
    files.append((path, relative.as_posix()))
files.extend((path, 'preview/' + path.name) for path in sorted(art.glob('*-screen.png')))
files.extend((path, 'qa/' + path.name) for path in sorted(art.glob('*.json'))
             if path.name not in {'delivery-archives.json', 'github-download-verification.json'})
files.append((art / 'lighthouse/summary.json', 'qa/lighthouse-summary.json'))
results = [archive(Path('/workspace/biovent-v11-source.zip'), files, 'biovent-v11/')]
host = repo / 'deployment/wordpress-hosting/public_html'
assert (host / '.htaccess').is_file()
assert not list(host.rglob('*.mp4')) and not list(host.rglob('*.webm'))
assert not list(host.rglob('*.php'))
results.append(archive(Path('/workspace/biovent-v11-static-hosting.zip'),
                       [(path, path.relative_to(host).as_posix())
                        for path in sorted(host.rglob('*')) if path.is_file()]))
windows = Path('/workspace/biovent-v11-windows-test.zip')
assert windows.stat().st_size < 100_000_000
results.append({'path': str(windows), 'bytes': windows.stat().st_size,
                'sha256': hashlib.sha256(windows.read_bytes()).hexdigest()})
(art / 'delivery-archives.json').write_text(json.dumps({
    'buildId': build, 'archives': results, 'originalVideoMastersIncluded': False,
    'newPromxOriginalImported': False, 'windowsExecuted': False, 'livePublished': False,
}, indent=2))
print(json.dumps(results, indent=2))
