import os
from playwright.sync_api import sync_playwright

BASE = "file:///E:/Freelance/aurea-mockup/"
OUT = r"E:/Freelance/aurea-mockup/screenshots"
os.makedirs(OUT, exist_ok=True)

PREP = """
() => {
  document.querySelectorAll('.reveal').forEach(e => e.classList.add('in'));
  var cb = document.getElementById('conceptBar'); if (cb) cb.style.display='none';
  window.scrollTo(0,0);
}
"""

def settle(page):
    page.wait_for_load_state('networkidle')
    try:
        page.evaluate("async () => { await document.fonts.ready; }")
    except Exception:
        pass
    # ensure every <img> finished (or errored)
    page.evaluate("""async () => {
      const imgs = Array.from(document.images);
      await Promise.all(imgs.map(i => i.complete ? 0 : new Promise(r => { i.onload=i.onerror=r; })));
    }""")
    page.wait_for_timeout(1200)
    page.evaluate(PREP)
    page.wait_for_timeout(500)

with sync_playwright() as p:
    b = p.chromium.launch()

    # ---- Desktop ----
    ctx = b.new_context(viewport={'width':1440,'height':900}, device_scale_factor=2)
    pg = ctx.new_page()

    pg.goto(BASE + "index.html"); settle(pg)
    pg.screenshot(path=f"{OUT}/01_index_hero.png")
    pg.screenshot(path=f"{OUT}/02_index_full.png", full_page=True)
    print("index desktop done")

    pg.goto(BASE + "longevity.html"); settle(pg)
    pg.screenshot(path=f"{OUT}/03_longevity_hero.png")
    pg.screenshot(path=f"{OUT}/04_longevity_full.png", full_page=True)
    print("longevity desktop done")
    ctx.close()

    # ---- Mobile ----
    mctx = b.new_context(viewport={'width':402,'height':874}, device_scale_factor=2, is_mobile=True)
    mpg = mctx.new_page()
    mpg.goto(BASE + "index.html"); settle(mpg)
    mpg.screenshot(path=f"{OUT}/05_index_mobile_full.png", full_page=True)
    mpg.goto(BASE + "longevity.html"); settle(mpg)
    mpg.screenshot(path=f"{OUT}/06_longevity_mobile_full.png", full_page=True)
    print("mobile done")
    mctx.close()

    b.close()
print("ALL SCREENSHOTS DONE ->", OUT)
