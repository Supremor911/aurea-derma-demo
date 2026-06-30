#!/usr/bin/env python3
"""Gemini image generation helper for the AUREA mockup.
Reads key from E:/Freelance/.env.
Usage:
  python gemini.py list
  python gemini.py gen "<prompt>" <outfile> [model] [aspect]
  python gemini.py batch <spec.json> <outdir>
"""
import sys, json, base64, urllib.request, urllib.error, re, os
from concurrent.futures import ThreadPoolExecutor, as_completed

ENV = r"E:/Freelance/.env"
BASE = "https://generativelanguage.googleapis.com/v1beta"

def get_key():
    txt = open(ENV, "r", encoding="utf-8").read()
    return re.search(r"=\s*(\S+)", txt).group(1).strip()

KEY = get_key()

def http(url, body=None, method="GET", timeout=240):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method,
                                 headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.status, json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        try:
            return e.code, json.loads(e.read().decode())
        except Exception:
            return e.code, {"raw": str(e)}

def list_models():
    st, j = http(f"{BASE}/models?key={KEY}&pageSize=200")
    for m in j.get("models", []):
        methods = m.get("supportedGenerationMethods", [])
        name = m.get("name", "")
        if "image" in name.lower() or "imagen" in name.lower():
            print(f"{name:48s}  {','.join(methods)}")

def _save_first_image(j, outfile):
    try:
        parts = j["candidates"][0]["content"]["parts"]
    except Exception:
        return None
    for p in parts:
        inline = p.get("inlineData") or p.get("inline_data")
        if inline and inline.get("data"):
            raw = base64.b64decode(inline["data"])
            with open(outfile, "wb") as f:
                f.write(raw)
            return len(raw)
    return None

def gen(prompt, outfile, model="gemini-2.5-flash-image", aspect=None):
    url = f"{BASE}/models/{model}:generateContent?key={KEY}"
    gcfg = {"responseModalities": ["IMAGE"]}
    if aspect:
        gcfg["imageConfig"] = {"aspectRatio": aspect}
    body = {"contents": [{"parts": [{"text": prompt}]}], "generationConfig": gcfg}
    st, j = http(url, body, "POST")
    if st != 200:
        return False, f"HTTP {st}: {json.dumps(j)[:300]}"
    n = _save_first_image(j, outfile)
    if n:
        return True, f"{n} bytes"
    return False, f"no image part: {json.dumps(j)[:300]}"

def one(item, outdir, default_model):
    out = os.path.join(outdir, item["filename"])
    model = item.get("model", default_model)
    ok, msg = gen(item["prompt"], out, model, item.get("aspect"))
    return item["slot"], ok, msg, model

def batch(specfile, outdir, default_model="gemini-3-pro-image", workers=3):
    spec = json.load(open(specfile, encoding="utf-8"))
    items = spec["images"] if isinstance(spec, dict) else spec
    os.makedirs(outdir, exist_ok=True)
    results = []
    with ThreadPoolExecutor(max_workers=workers) as ex:
        futs = {ex.submit(one, it, outdir, default_model): it for it in items}
        for f in as_completed(futs):
            slot, ok, msg, model = f.result()
            tag = "OK " if ok else "FAIL"
            print(f"{tag} {slot:22s} [{model}] {msg}", flush=True)
            results.append((slot, ok))
    okc = sum(1 for _, ok in results if ok)
    print(f"\n== {okc}/{len(items)} images generated ==")

if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "list"
    if cmd == "list":
        list_models()
    elif cmd == "gen":
        prompt, outfile = sys.argv[2], sys.argv[3]
        model = sys.argv[4] if len(sys.argv) > 4 else "gemini-2.5-flash-image"
        aspect = sys.argv[5] if len(sys.argv) > 5 else None
        ok, msg = gen(prompt, outfile, model, aspect)
        print(("OK " if ok else "FAIL ") + msg)
        sys.exit(0 if ok else 1)
    elif cmd == "batch":
        specfile, outdir = sys.argv[2], sys.argv[3]
        model = sys.argv[4] if len(sys.argv) > 4 else "gemini-3-pro-image"
        batch(specfile, outdir, model)
