#!/usr/bin/env python3
"""Build people.json for the American Revolution topic.

Each commander named in events.json is resolved to an exact Wikipedia page using
the wikilinks in the battle infoboxes (so "John Campbell" or "William Campbell"
cannot be confused). Birth/death dates come from Wikidata; the summary and image
come from the Wikipedia REST API.

Output: frontend/src/topics/usrevolution/people.json
Run:    python3 scripts/topics/build_usrevolution_people.py
"""
import json, re, sys, time, urllib.error, urllib.parse, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
EVENTS = ROOT / "frontend/src/topics/usrevolution/events.json"
OUT = ROOT / "frontend/src/topics/usrevolution/people.json"
API = "https://en.wikipedia.org/w/api.php"
UA = {"User-Agent": "historifically-topic-builder/1.0 (educational project)"}

# Commanders whose infobox link was not found; page titles checked by hand
MANUAL_TITLES = {
    "John Dooly": "John Dooly",
    "Elijah Clarke": "Elijah Clarke",
    "Andrew Pickens": "Andrew Pickens (congressman)",
    "Henry Johnson": "Sir Henry Johnson, 1st Baronet",
}
# Name variants used in events.json that point to the same person
ALIASES = {
    "Sir William Howe": "William Howe",
    "Sir Henry Clinton": "Henry Clinton",
    "Lord Cornwallis": "Charles Cornwallis",
    "Lord Rawdon": "Francis Rawdon-Hastings",
}


CACHE = Path(__file__).resolve().parent / ".cache_people"
CACHE.mkdir(exist_ok=True)


def get_json(url):
    """GET with an on-disk cache, throttling and backoff on 429."""
    import hashlib
    f = CACHE / (hashlib.sha1(url.encode()).hexdigest() + ".json")
    if f.exists():
        return json.loads(f.read_text())
    delay = 2.0
    for attempt in range(8):
        try:
            time.sleep(0.5)
            data = json.load(urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30))
            f.write_text(json.dumps(data))
            return data
        except urllib.error.HTTPError as e:
            if e.code == 429 or e.code >= 500:
                wait = float(e.headers.get("Retry-After") or delay)
                time.sleep(min(wait, 60))
                delay *= 2
                continue
            raise
        except Exception:
            time.sleep(delay)
            delay *= 2
    raise RuntimeError("giving up on " + url)


def api(params):
    return get_json(API + "?" + urllib.parse.urlencode({**params, "format": "json", "redirects": 1}))


def infobox_links(title):
    """Map displayed commander name -> wiki page title, from the infobox commander fields."""
    data = api({"action": "query", "prop": "revisions", "rvprop": "content", "rvslots": "main", "titles": title})
    page = next(iter(data["query"]["pages"].values()))
    text = page["revisions"][0]["slots"]["main"]["*"]
    out = {}
    for field in re.finditer(r"^\|\s*commander[12]\s*=\s*(.*?)(?=^\|\s*[a-z_0-9]+\s*=|^\}\})", text, flags=re.S | re.M):
        for m in re.finditer(r"\[\[([^\]|#]+)(?:\|([^\]]*))?\]\]", field.group(1)):
            target, shown = m.group(1).strip(), (m.group(2) or m.group(1)).strip()
            out.setdefault(shown, target)
    return out


def wikidata_dates(title):
    data = api({"action": "query", "prop": "pageprops", "ppprop": "wikibase_item", "titles": title})
    page = next(iter(data["query"]["pages"].values()))
    qid = page.get("pageprops", {}).get("wikibase_item")
    if not qid:
        return None, None
    ent = get_json(f"https://www.wikidata.org/wiki/Special:EntityData/{qid}.json")["entities"][qid]["claims"]

    def date(prop):
        try:
            snak = ent[prop][0]["mainsnak"]["datavalue"]["value"]
            if snak["precision"] < 9:  # coarser than a year
                return None
            t = snak["time"].lstrip("+")
            y, mo, d = t[:10].split("-")
            if snak["precision"] == 9 or mo == "00" or d == "00":
                return y  # year only
            return f"{y}-{mo}-{d}"
        except (KeyError, IndexError):
            return None

    return date("P569"), date("P570")


def summary(title):
    url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + urllib.parse.quote(title.replace(" ", "_"), safe="")
    return get_json(url)


def first_sentences(text, n=2):
    text = re.sub(r"\([^)]*\)", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    parts = re.split(r"(?<=[.!?])\s+(?=[A-Z])", text)
    return " ".join(parts[:n])


def main():
    events = json.load(open(EVENTS))
    names = []  # (name, side) in first-seen order
    for e in events:
        for key in ("union", "confederate"):
            for n in (e.get("commanders") or {}).get(key, []):
                if all(n != x[0] for x in names):
                    names.append((n, key))

    # name -> wiki title, using each event's infobox links
    links = {}
    for e in events:
        title = e["wikipedia_url"].rsplit("/", 1)[-1]
        try:
            for shown, target in infobox_links(urllib.parse.unquote(title)).items():
                links.setdefault(shown, target)
        except Exception as ex:
            print("infobox failed:", title, ex, file=sys.stderr)

    people, by_title, problems = [], {}, []
    for name, key in names:
        canonical = ALIASES.get(name, name)
        title = MANUAL_TITLES.get(canonical) or links.get(canonical) or links.get(name)
        if not title:
            problems.append(f"no page for {name}")
            continue
        if title in by_title:
            by_title[title]["aliases"] = sorted(set(by_title[title].get("aliases", []) + ([name] if name != by_title[title]["name"] else [])))
            continue
        try:
            s = summary(title)
        except Exception as ex:
            problems.append(f"summary failed for {name} ({title}): {ex}")
            continue
        if s.get("type") == "disambiguation":
            problems.append(f"{name} -> {title} is a disambiguation page")
            continue
        birth, death = wikidata_dates(s["title"])
        # Wikidata uses Jan 1 as a placeholder for some year-only dates; Anthony Wayne's is genuine
        genuine_jan1 = {"Anthony Wayne"}
        if birth and birth.endswith("-01-01") and canonical not in genuine_jan1:
            birth = birth[:4]
        if death and death.endswith("-01-01") and canonical not in genuine_jan1:
            death = death[:4]
        person = {
            "id": len(people) + 1,
            "name": canonical,
            "birth_date": birth,
            "death_date": death,
            "side": None,
            "rank": re.sub(r"\s*\((?:c\. )?\d{4}\s*[–-]\s*(?:c\. )?\d{4}\)", "", s.get("description") or "")[:80] or None,
            "highest_rank": None,
            "biography": first_sentences(s.get("extract", ""), 3) or None,
            "image_url": (s.get("thumbnail") or {}).get("source"),
            "wikipedia_url": s["content_urls"]["desktop"]["page"],
            "wiki_title": s["title"],
            "party": "american" if key == "union" else "british",
            "aliases": [name] if name != canonical else [],
        }
        people.append(person)
        by_title[title] = person
        print(f"{person['id']:3} {name:28} -> {s['title']:36} {birth} {death}")

    OUT.write_text(json.dumps(people, indent=1, ensure_ascii=False) + "\n")
    print(f"\nwrote {len(people)} people to {OUT}")
    for p in problems:
        print("PROBLEM:", p)


if __name__ == "__main__":
    main()
