"""Validate the shared local launcher against every final exported asset."""
from pathlib import Path
import gzip
import hashlib
import json
import os
from urllib.error import HTTPError
from urllib.parse import quote
from urllib.request import Request, urlopen

repo = Path(__file__).resolve().parents[1]
root = repo / 'deployment/wordpress-hosting/draft-public_html'
base = os.environ.get('BIOVENT_LAUNCHER_URL', 'http://127.0.0.1:3116')
files = 0
for path in sorted(root.rglob('*')):
    if not path.is_file() or path.name.startswith('.'):
        continue
    name = path.relative_to(root).as_posix()
    with urlopen(base + '/' + quote(name)) as response:
        assert response.status == 200, name
        assert hashlib.sha256(response.read()).digest() == hashlib.sha256(path.read_bytes()).digest(), name
    files += 1
assert json.load(urlopen(base + '/__preview/status'))['localOnly']
assert urlopen(base + '/').url.endswith('/tr/')
for locale in ['en', 'de', 'tr', 'ar']:
    with urlopen(Request(base + '/' + locale + '/', headers={'Accept-Encoding': 'gzip'})) as response:
        assert response.headers.get('Content-Encoding') == 'gzip'
        data = gzip.decompress(response.read())
        assert data == (root / locale / 'index.html').read_bytes()
        if locale == 'ar':
            assert b'dir="rtl"' in data
    with urlopen(Request(base + '/' + locale + '/', headers={'Accept-Encoding': 'gzip;q=0'})) as response:
        assert response.headers.get('Content-Encoding') is None
    with urlopen(Request(base + '/' + locale + '/', method='HEAD')) as response:
        assert response.status == 200 and response.read() == b''
pdf = next(root.rglob('*.pdf'))
name = pdf.relative_to(root).as_posix()
with urlopen(Request(base + '/' + quote(name), headers={'Range': 'bytes=0-127', 'Accept-Encoding': 'gzip'})) as response:
    assert response.status == 206
    assert response.read() == pdf.read_bytes()[:128]
    assert response.headers.get('Content-Encoding') is None
for path, method, expected in [('/missing-v11/', 'GET', 404), ('/.htaccess', 'GET', 404), ('/tr/', 'POST', 405)]:
    try:
        urlopen(Request(base + path, method=method))
        raise AssertionError(path)
    except HTTPError as error:
        assert error.code == expected
report = {'passed': True, 'buildId': (repo / '.next/BUILD_ID').read_text().strip(),
          'exactExportFilesChecked': files, 'fourLanguagesAndRTL': True,
          'gzipQualityAndHead': True, 'pdfRange206': True,
          'loopbackOnly': True, 'sharedLauncherExecutedOn': 'Linux',
          'windowsExecuted': False}
(repo / ('artifacts/v'+json.loads((repo/'package.json').read_text())['version'].split('.')[0]+'/launcher-http.json')).write_text(json.dumps(report, indent=2))
print(json.dumps(report, indent=2))
