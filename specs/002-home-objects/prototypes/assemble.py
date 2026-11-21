import re
def split_css(css):
    # returns list of (prelude, body) top-level blocks
    out=[]; i=0; n=len(css)
    while i<n:
        j=css.find('{',i)
        if j<0: break
        pre=css[i:j].strip(); depth=0; k=j
        while k<n:
            if css[k]=='{': depth+=1
            elif css[k]=='}':
                depth-=1
                if depth==0: break
            k+=1
        out.append((pre, css[j+1:k])); i=k+1
    return out
def strip_comments(css): return re.sub(r'/\*.*?\*/','',css,flags=re.S)
def split_sel(sel):
    parts=[]; depth=0; cur=''
    for ch in sel:
        if ch in '([': depth+=1
        if ch in ')]': depth-=1
        if ch==',' and depth==0: parts.append(cur); cur=''
        else: cur+=ch
    parts.append(cur); return [p.strip() for p in parts if p.strip()]
def scope(css, sid):
    res=[]
    for pre, body in split_css(strip_comments(css)):
        if pre.startswith('@keyframes') or pre.startswith('@font-face'):
            res.append(pre+'{'+body+'}')
        elif pre.startswith('@'):
            res.append(pre+'{'+scope(body,sid)+'}')
        else:
            sels=[]
            for s in split_sel(pre):
                if s.startswith(':root'): sels.append(sid+s[5:])
                elif s in ('html','body'): sels.append(sid)
                elif s.startswith('html ') or s.startswith('body '): sels.append(sid+' '+s.split(' ',1)[1])
                else: sels.append(sid+' '+s)
            res.append(', '.join(sels)+'{'+body+'}')
    return '\n'.join(res)
def load(path, sid, name):
    s=open(path).read()
    links=re.findall(r'<link rel="stylesheet"[^>]+>', s)
    a=s.index('<style>'); b=s.index('</style>')
    css=s[a+7:b]; pre=s[:a]; post=s[b+8:]
    content=re.findall(r'<script>.*?</script>', pre, flags=re.S)
    js_and_markup=post
    blob='\n'.join(content)+'\n'+js_and_markup
    blob=re.sub(r'\bCONTENT\b', name, blob)
    return links, scope(css, '#'+sid), blob
parts=[('work-passport.html','sec-passport','CONTENT_PASSPORT'),('project-wallet.html','sec-wallet','CONTENT_WALLET'),('tip-terminal.html','sec-close','CONTENT_CLOSE'),('learning-slot.html','sec-learning','CONTENT_LEARNING'),('hero-galaxy.html','sec-hero','CONTENT_HERO')]
links=set(); styles=[]; bodies=[]
for f,sid,name in parts:
    l,c,bl=load(f,sid,name); links.update(l); styles.append(c)
    if sid=='sec-passport':
        bl=bl.replace('document.querySelectorAll("h2")','document.querySelectorAll("#sec-passport h2")').replace('document.querySelectorAll(".sub")','document.querySelectorAll("#sec-passport .sub")')
    bodies.append(f'<div id="{sid}" class="sec">\n{bl}\n</div>')
still=lambda src,alt: f'<section class="still"><img src="{src}" alt="{alt}"></section>'
html=f'''<meta charset="utf-8">
<title>noeosorio.com Home</title>
<meta name="claude:viewport-fit-sides" content="cover">
{chr(10).join(sorted(links))}
<style>
  :root {{ color-scheme: dark; }}
  html, body {{ background: #0E0D0B; color: #F4EEE4; }}
  body {{ margin: 0; }}
  .still {{ padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }}
  .still img {{ display: block; width: 100%; max-width: 1440px; height: auto; margin: 0 auto; }}
  .sec {{ position: relative; }}
{chr(10).join(styles)}
</style>
{bodies[4]}
{bodies[1]}
{bodies[0]}
{bodies[3]}
{bodies[2]}

'''
open('home/index.html','w').write(html)
print(len(html))
