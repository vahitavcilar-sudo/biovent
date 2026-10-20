"""Real FFmpeg pipeline checks in an isolated temporary root; never production fixtures."""
import importlib.util,tempfile,json,subprocess
from pathlib import Path
spec=importlib.util.spec_from_file_location('pipeline',Path(__file__).resolve().parents[1]/'scripts/process-product-media.py');module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
with tempfile.TemporaryDirectory(prefix='biovent-v9-pipeline-',dir='/tmp') as tmp:
 module.ROOT=Path(tmp);source=Path(tmp)/'synthetic-QA-only.mp4'
 subprocess.run(['ffmpeg','-y','-v','error','-f','lavfi','-i','color=c=gray:s=320x180:r=24','-t','8','-an','-c:v','libx264',str(source)],check=True)
 digest=module.sha(source);module.inspect(source,'monoblock');master=Path(tmp)/'media-source/monoblock'/source.name;assert module.sha(master)==digest
 recipe={'product':'monoblock','source':str(master.relative_to(module.ROOT)),'sourceSha256':digest,'reviewed':False,'logoAndTextReviewed':True,'clips':[{'name':'qa-hero','role':'hero','start':.5,'duration':6,'width':320,'posterTime':1.5,'maxBytes':100000,'approved':True}]};file=Path(tmp)/'recipe.json';file.write_text(json.dumps(recipe))
 try:module.process(file);raise AssertionError('Unreviewed source accepted')
 except ValueError:pass
 recipe['reviewed']=True;file.write_text(json.dumps(recipe));module.process(file);assert module.sha(master)==digest
 output=Path(tmp)/'public/media/products/monoblock/qa-hero.v9.mp4';info=module.probe(output);assert not any(s['codec_type']=='audio' for s in info['streams']);assert 5.9<float(info['format']['duration'])<6.1
 assert not list((Path(tmp)/'public').rglob('*.json'))
 index=json.loads((Path(tmp)/'artifacts/v9/encoding/monoblock.json').read_text());assert index[0]['start']==.5 and index[0]['sourceSha256']==digest and index[0]['qualityReviewed']==False
 recipe['sourceSha256']='incorrect';file.write_text(json.dumps(recipe))
 try:module.process(file);raise AssertionError('Wrong master SHA accepted')
 except ValueError:pass
 print('Pipeline: original integrity, unreviewed/SHA rejection, actual encoding/poster, audio stripping, budget and private provenance checks passed; isolated QA root deleted')
