#!/usr/bin/env python3
"""AUREA automated audit — WCAG contrast, responsive overflow, tap targets, tiny fonts.
Re-runnable each iteration:  python audit/audit.py
Outputs: audit/report.json, audit/REPORT.md, audit/shots/<page>_<vw>.png
"""
import os, json, sys
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = "file:///" + ROOT.replace("\\", "/") + "/"
OUT = os.path.join(ROOT, "audit")
SHOTS = os.path.join(OUT, "shots")
os.makedirs(SHOTS, exist_ok=True)

PAGES = [f for f in ["index.html", "longevity.html", "varianten.html", "variante-b.html",
                     "longevity-b.html", "datenschutz-b.html", "impressum-b.html"]
         if os.path.exists(os.path.join(ROOT, f))]
VIEWPORTS = [("mobile-sm", 360, 640), ("mobile", 390, 844), ("tablet", 768, 1024),
             ("desktop", 1440, 900), ("wide", 1920, 1080)]

JS_AUDIT = r"""
() => {
  const parse = c => { const m = c && c.match(/rgba?\(([^)]+)\)/); if(!m) return null;
    const p = m[1].split(',').map(s=>parseFloat(s.trim())); return [p[0],p[1],p[2], p.length>3?p[3]:1]; };
  const lin = v => { v/=255; return v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055,2.4); };
  const lum = c => 0.2126*lin(c[0])+0.7152*lin(c[1])+0.0722*lin(c[2]);
  const comp = (f,b) => { const a=f[3]; return [f[0]*a+b[0]*(1-a), f[1]*a+b[1]*(1-a), f[2]*a+b[2]*(1-a), 1]; };
  const ratio = (a,b) => { const L1=lum(a),L2=lum(b),hi=Math.max(L1,L2),lo=Math.min(L1,L2); return (hi+0.05)/(lo+0.05); };
  const clsOf = el => (el.className && el.className.toString ? el.className.toString() : '').slice(0,46);
  const vis = el => { const s=getComputedStyle(el); if(s.display==='none'||s.visibility==='hidden'||+s.opacity===0) return false;
    const r=el.getBoundingClientRect(); return r.width>=1 && r.height>=1; };
  const directText = el => { let t=''; for(const n of el.childNodes) if(n.nodeType===3) t+=n.nodeValue; return t.trim(); };
  const resolveBg = el => { let overImage=false, layers=[], node=el;
    while(node && node.nodeType===1){ const s=getComputedStyle(node);
      if(s.backgroundImage && s.backgroundImage!=='none' && s.backgroundImage.indexOf('gradient')===-1) overImage=true;
      const bg=parse(s.backgroundColor); if(bg && bg[3]>0){ layers.push(bg); if(bg[3]>=0.999) break; }
      node=node.parentElement; }
    let base=[255,255,255,1]; for(let i=layers.length-1;i>=0;i--) base=comp(layers[i], base);
    return {bg:base, overImage}; };

  const all = document.body.querySelectorAll('*');
  const fails=[], overImg=[], tiny=[];
  for(const el of all){
    const txt = directText(el); if(txt.length<1 || !vis(el)) continue;
    if(el.closest('.hero')){ overImg.push({t:txt.slice(0,40), tag:el.tagName.toLowerCase(), cls:clsOf(el)}); continue; }
    const s = getComputedStyle(el); const fg = parse(s.color); if(!fg) continue;
    const size = parseFloat(s.fontSize), weight = parseInt(s.fontWeight)||400;
    if(size < 11) tiny.push({t:txt.slice(0,32), size:Math.round(size*10)/10, cls:clsOf(el)});
    const {bg, overImage} = resolveBg(el);
    if(overImage){ overImg.push({t:txt.slice(0,40), tag:el.tagName.toLowerCase(), cls:clsOf(el)}); continue; }
    const large = size>=24 || (size>=18.66 && weight>=700);
    const need = large ? 3.0 : 4.5;
    let fgC = fg[3]<1 ? comp(fg,bg) : fg;
    const cr = ratio(fgC,bg);
    if(cr < need) fails.push({t:txt.slice(0,52), tag:el.tagName.toLowerCase(), cls:clsOf(el),
      ratio:Math.round(cr*100)/100, need, size:Math.round(size*10)/10, weight,
      color:s.color, bg:`rgb(${Math.round(bg[0])},${Math.round(bg[1])},${Math.round(bg[2])})`});
  }
  const de = document.documentElement;
  const vw = de.clientWidth;  // NICHT innerWidth: Mobile-Emulation bläht innerWidth auf Content-Breite auf
  const overflowX = Math.max(de.scrollWidth, document.body.scrollWidth) - vw;
  const offenders=[];
  for(const el of all){ const r=el.getBoundingClientRect();
    if(r.width>0 && r.right>vw+2 && getComputedStyle(el).position!=='fixed')
      offenders.push({tag:el.tagName.toLowerCase(), cls:clsOf(el), right:Math.round(r.right)}); }
  offenders.sort((a,b)=>b.right-a.right);
  const controls=[...document.querySelectorAll('a,button,input,select,textarea,[role=button],.choice')];
  const small=[];
  for(const el of controls){ if(!vis(el)) continue;
    if(el.tagName==='INPUT' && /radio|checkbox/i.test(el.type)) continue;
    const r=el.getBoundingClientRect();
    if(r.width<44 || r.height<44){ const tag=el.tagName.toLowerCase();
      const isControl = /^(button|input|select|textarea)$/.test(tag) || el.classList.contains('btn') || el.classList.contains('choice');
      small.push({tag, cls:clsOf(el), w:Math.round(r.width), h:Math.round(r.height), control:isControl, t:(el.textContent||'').trim().slice(0,22)}); } }
  return {fails, overImg, overflowX, offenders:offenders.slice(0,20), small, tiny};
}
"""

def settle(page):
    page.wait_for_load_state('networkidle')
    try: page.evaluate("async () => { await document.fonts.ready; }")
    except Exception: pass
    page.evaluate("""async () => { const i=Array.from(document.images);
      await Promise.all(i.map(x=>x.complete?0:new Promise(r=>{x.onload=x.onerror=r;}))); }""")
    page.evaluate("() => document.querySelectorAll('.reveal,.b-reveal').forEach(e=>e.classList.add('in'))")
    page.wait_for_timeout(400)

def key(f):  # unique contrast-fail key (color-driven, viewport-independent)
    return (f['tag'], f['cls'], f['color'], f['bg'])

results = {}
with sync_playwright() as p:
    b = p.chromium.launch()
    for page_name in PAGES:
        pdata = {'viewports': {}, 'contrast': {}, 'overImg': {}, 'tiny': {}}
        for vname, vw, vh in VIEWPORTS:
            ctx = b.new_context(viewport={'width':vw,'height':vh}, device_scale_factor=1,
                                is_mobile=(vw<=414))
            pg = ctx.new_page()
            pg.goto(BASE + page_name); settle(pg)
            r = pg.evaluate(JS_AUDIT)
            pg.screenshot(path=os.path.join(SHOTS, f"{page_name.replace('.html','')}_{vname}.png"), full_page=True)
            pdata['viewports'][vname] = {'overflowX': r['overflowX'],
                'offenders': r['offenders'], 'small': r['small']}
            for f in r['fails']:   pdata['contrast'].setdefault(key(f), f)
            for o in r['overImg']: pdata['overImg'].setdefault((o['tag'],o['cls'],o['t']), o)
            for t in r['tiny']:    pdata['tiny'].setdefault((t['cls'],t['t']), t)
            ctx.close()
        pdata['contrast'] = list(pdata['contrast'].values())
        pdata['overImg']  = list(pdata['overImg'].values())
        pdata['tiny']     = list(pdata['tiny'].values())
        results[page_name] = pdata
    b.close()

json.dump(results, open(os.path.join(OUT,'report.json'),'w',encoding='utf-8'), ensure_ascii=False, indent=2)

# ---- Markdown report ----
L = ["# AUREA — Automatischer Audit (WCAG + Responsive)", ""]
tot_contrast = tot_overflow = tot_ctrl = 0
for pn, d in results.items():
    L.append(f"## {pn}\n")
    cf = sorted(d['contrast'], key=lambda x:x['ratio'])
    tot_contrast += len(cf)
    L.append(f"### Kontrast (WCAG AA)  —  {len(cf)} Verstoss(e)")
    if not cf: L.append("✅ Keine messbaren Kontrastverstösse (Text auf Bildern separat geprüft).")
    for f in cf:
        L.append(f"- ❌ **{f['ratio']}:1** (Soll {f['need']}:1) · `{f['tag']}.{f['cls']}` · {f['size']}px/{f['weight']} · {f['color']} auf {f['bg']} · „{f['t']}\"")
    L.append("")
    if d['overImg']:
        L.append(f"### Text auf Bild (manuelle Sichtprüfung) — {len(d['overImg'])}")
        for o in d['overImg'][:12]: L.append(f"- 👁 `{o['tag']}.{o['cls']}` · „{o['t']}\"")
        L.append("")
    if d['tiny']:
        L.append(f"### Schrift < 12px — {len(d['tiny'])}")
        for t in d['tiny'][:12]: L.append(f"- ⚠ {t['size']}px · `{t['cls']}` · „{t['t']}\"")
        L.append("")
    L.append("### Responsive je Viewport")
    for vname, vw, vh in VIEWPORTS:
        v = d['viewports'][vname]
        ov = v['overflowX']; ctrl = [s for s in v['small'] if s['control']]
        tot_overflow += 1 if ov>1 else 0; tot_ctrl += len(ctrl)
        flag = "✅" if ov<=1 else f"❌ +{ov}px"
        L.append(f"- **{vname}** ({vw}×{vh}): H-Overflow {flag} · Tap-Targets <44px: {len(ctrl)} Controls, {len(v['small'])-len(ctrl)} Links")
        if ov>1 and v['offenders']:
            for o in v['offenders'][:5]: L.append(f"    - ⤷ `{o['tag']}.{o['cls']}` right={o['right']}px")
        for s in ctrl[:6]:
            L.append(f"    - 🔘 {s['w']}×{s['h']}px `{s['tag']}.{s['cls']}` „{s['t']}\"")
    L.append("")
L.insert(1, f"\n**Summe:** {tot_contrast} Kontrastverstösse · {tot_overflow} Viewport(s) mit Overflow · {tot_ctrl} zu kleine Controls (über alle Seiten/Viewports)\n")
open(os.path.join(OUT,'REPORT.md'),'w',encoding='utf-8').write("\n".join(L))
print(f"AUDIT DONE: {tot_contrast} contrast, {tot_overflow} overflow-viewports, {tot_ctrl} small-controls")
print("->", os.path.join(OUT,'REPORT.md'))
