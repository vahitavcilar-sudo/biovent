"""Inspect immutable masters, then encode only explicitly reviewed timestamp recipes.
No inferred cuts, AI frames, logo removal, source overwrites or public master copying.
"""
import argparse, hashlib, json, math, shutil, subprocess
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def sha(path):
 h=hashlib.sha256()
 with open(path,'rb') as f:
  for block in iter(lambda:f.read(1024*1024),b''):h.update(block)
 return h.hexdigest()
def probe(path):
 return json.loads(subprocess.check_output(['ffprobe','-v','error','-show_format','-show_streams','-of','json',str(path)],text=True))
def run(command):subprocess.run(command,check=True)
def inspect(source,product):
 source=Path(source).resolve(); original=ROOT/'media-source'/product/source.name;original.parent.mkdir(parents=True,exist_ok=True)
 digest=sha(source)
 if original.exists() and sha(original)!=digest:raise ValueError('Existing original differs; never overwrite a master')
 if source!=original and not original.exists():shutil.copy2(source,original)
 info=probe(original);video=next(s for s in info['streams'] if s['codec_type']=='video');duration=float(info['format']['duration'])
 audit=ROOT/'artifacts/v9/intake'/product;audit.mkdir(parents=True,exist_ok=True)
 record={'original':str(original.relative_to(ROOT)),'filename':source.name,'sha256':digest,'bytes':original.stat().st_size,'probe':info,'reviewed':False,'contactTimestamps':[]}
 for t in range(0,math.ceil(duration),5):
  if t>=duration:break
  out=audit/f'{t:03d}s.jpg';run(['ffmpeg','-y','-v','error','-i',str(original),'-ss',str(t),'-frames:v','1','-vf','scale=960:-2','-q:v','2',str(out)]);record['contactTimestamps'].append({'seconds':t,'frame':out.name})
 (audit/'index.html').write_text('<!doctype html><meta charset="utf-8"><title>Source review</title><style>body{background:#16191c;color:white;font:16px sans-serif}figure{display:inline-block;width:45%;margin:1%}img{width:100%}</style>'+''.join(f'<figure><figcaption>{x["seconds"]:03d}s — {source.name}</figcaption><img src="{x["frame"]}"></figure>' for x in record['contactTimestamps']))
 (audit/'source.json').write_text(json.dumps(record,indent=2));print(json.dumps({k:record[k] for k in ['original','sha256','bytes','reviewed']}))
def process(recipe_file):
 recipe=json.loads(Path(recipe_file).read_text());product=recipe['product'];assert product in ['monoblock','zygoma']
 source=(ROOT/recipe['source']).resolve()
 if not recipe.get('reviewed') or not recipe.get('logoAndTextReviewed'):raise ValueError('Review source frames/audio/logo before encoding')
 if sha(source)!=recipe['sourceSha256']:raise ValueError('Source SHA mismatch')
 info=probe(source);stream=next(s for s in info['streams'] if s['codec_type']=='video');total=float(info['format']['duration']);outdir=ROOT/'public/media/products'/product;outdir.mkdir(parents=True,exist_ok=True);records=[];audit=ROOT/'artifacts/v9/encoding';audit.mkdir(parents=True,exist_ok=True)
 for clip in recipe['clips']:
  if not clip.get('approved'):raise ValueError('Every selected clip requires explicit curation approval')
  name=clip['name'];assert name.replace('-','').isalnum();start=float(clip['start']);duration=float(clip['duration']);assert start>=0 and duration>0 and start+duration<=total+.02
  if clip['role']=='hero' and not 6<=duration<=10:raise ValueError('Hero must be6–10s')
  if clip.get('crop') and not clip.get('cropReviewed'):raise ValueError('Crop must be checked for complete product, source labels and logo')
  width=min(int(clip['width']),int(stream['width']));width-=width%2
  filters=([f"crop={clip['crop']}"] if clip.get('crop') else [])+[f'scale={width}:-2','setsar=1']
  output=outdir/(name+'.v9.mp4');command=['ffmpeg','-y','-v','error','-i',str(source),'-ss',str(start),'-t',str(duration),'-vf',','.join(filters),'-r','24','-c:v','libx264','-preset','slow','-crf',str(clip.get('crf',21)),'-maxrate',clip.get('maxrate','3M'),'-bufsize','6M','-pix_fmt','yuv420p','-movflags','+faststart']
  if clip.get('audio','strip')=='strip':command+=['-an']
  else:
   if clip['role']=='hero' or not recipe.get('audioReviewed'):raise ValueError('No hero audio; full-film audio must be reviewed')
   command+=['-c:a','aac','-b:a','112k']
  command+=[str(output)];run(command)
  if output.stat().st_size>clip['maxBytes']:output.unlink();raise ValueError('Encoded copy exceeds budget; revise bitrate/CRF based on quality review')
  encoded=probe(output);assert not(clip['role']=='hero' and any(s['codec_type']=='audio' for s in encoded['streams']))
  poster_time=float(clip['posterTime']);assert start<=poster_time<=start+duration
  poster=outdir/(name+'-poster.v9.webp');poster_command=['ffmpeg','-y','-v','error','-i',str(source),'-ss',str(poster_time),'-frames:v','1','-vf',','.join(filters),'-c:v','libwebp','-quality','90',str(poster)];run(poster_command)
  records.append({'file':'/'+str(output.relative_to(ROOT/'public')),'poster':'/'+str(poster.relative_to(ROOT/'public')),'sha256':sha(output),'posterSha256':sha(poster),'bytes':output.stat().st_size,'role':clip['role'],'sourceSha256':recipe['sourceSha256'],'start':start,'duration':duration,'crop':clip.get('crop'),'loop':clip.get('loop',False),'probe':encoded,'command':command,'posterCommand':poster_command,'qualityReviewed':False})
  (audit/(product+'.json')).write_text(json.dumps(records,indent=2))
 # Internal index outside public prevents provenance/tool commands becoming frontend payload.
 assert sha(source)==recipe['sourceSha256']
def main():
 parser=argparse.ArgumentParser();parser.add_argument('--inspect');parser.add_argument('--product',choices=['monoblock','zygoma']);parser.add_argument('--recipe');args=parser.parse_args()
 if args.inspect:
  if not args.product:parser.error('--product required')
  inspect(args.inspect,args.product)
 elif args.recipe:process(args.recipe)
 else:parser.error('Use --inspect master.mp4 --product monoblock, then --recipe reviewed.json')

if __name__=='__main__':main()
