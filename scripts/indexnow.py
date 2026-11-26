"""Notify IndexNow only for new, changed or removed public pages."""
import hashlib
import json
from pathlib import Path
from urllib.error import HTTPError
from urllib.parse import urlsplit
from urllib.request import Request, urlopen
from xml.etree import ElementTree as ET

HOST = "techmintai.com"
BASE = "https://" + HOST
KEY = "aaf6159605594a25a4a30ccdd9909a93"
KEY_URL = f"{BASE}/{KEY}.txt"
SITEMAP = BASE + "/sitemap-index.xml"
STATE = Path(".indexnow-state/pages.json")
NS = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
HEADERS = {"User-Agent": "TechMintAI-IndexNow/1.0"}


def owned(url):
    p = urlsplit(url)
    return p.scheme == "https" and p.netloc == HOST and not p.fragment


def read(url):
    if not owned(url):
        raise ValueError("Unexpected non-site URL: " + url)
    with urlopen(Request(url, headers=HEADERS), timeout=20) as response:
        if not owned(response.geturl()) or response.status != 200:
            raise RuntimeError("Unexpected response for " + url)
        return response.read()


def sitemap_urls(url, seen):
    if url in seen:
        return set()
    seen.add(url)
    root = ET.fromstring(read(url))
    if root.tag == NS + "sitemapindex":
        out = set()
        for node in root.findall(NS + "sitemap"):
            loc = node.findtext(NS + "loc")
            if loc and owned(loc):
                out.update(sitemap_urls(loc, seen))
        return out
    if root.tag != NS + "urlset":
        raise ValueError("Unexpected sitemap format")
    return {loc for node in root.findall(NS + "url")
            if (loc := node.findtext(NS + "loc")) and owned(loc)}


def main():
    if read(KEY_URL).decode("utf-8").strip() != KEY:
        raise RuntimeError("IndexNow verification file is not live or does not match.")
    urls = sitemap_urls(SITEMAP, set())
    if not urls:
        raise RuntimeError("Empty sitemap; refusing to submit removals.")
    if len(urls) > 1000:
        raise RuntimeError("Sitemap exceeds this site's configured scan limit.")
    previous = json.loads(STATE.read_text()) if STATE.exists() else {}
    current = {url: hashlib.sha256(read(url)).hexdigest() for url in sorted(urls)}
    changed = sorted({url for url, digest in current.items()
                      if previous.get(url) != digest}
                     | {url for url in previous if owned(url) and url not in current})
    if changed:
        payload = json.dumps({"host": HOST, "key": KEY, "keyLocation": KEY_URL,
                              "urlList": changed}).encode("utf-8")
        req = Request("https://api.indexnow.org/indexnow", data=payload,
                      headers={"Content-Type": "application/json; charset=utf-8",
                               **HEADERS}, method="POST")
        try:
            with urlopen(req, timeout=30) as response:
                if response.status not in (200, 202):
                    raise RuntimeError(f"Unexpected IndexNow status {response.status}")
                print(f"IndexNow accepted {len(changed)} URLs: HTTP {response.status}.")
        except HTTPError as exc:
            raise RuntimeError(f"IndexNow request failed: HTTP {exc.code}") from exc
    else:
        print("No new, changed or removed sitemap URLs.")
    STATE.parent.mkdir(parents=True, exist_ok=True)
    STATE.write_text(json.dumps(current, sort_keys=True))


if __name__ == "__main__":
    main()
