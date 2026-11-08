#!/usr/bin/env python3
"""
Build frontend/src/topics/usrevolution/events.json from Wikipedia.

For each curated battle: coordinates, intro text and wikipedia_url come from
the MediaWiki API; start date, result and commanders are parsed from the
infobox. The curated expectations below are an independent check - any
mismatch is printed so a human can look at it.

Usage: python3 scripts/topics/build_usrevolution.py
"""
import json, re, sys, time, urllib.parse, urllib.request, pathlib

OUT = pathlib.Path(__file__).resolve().parents[2] / "frontend/src/topics/usrevolution/events.json"
API = "https://en.wikipedia.org/w/api.php"
UA = {"User-Agent": "historifically-topic-builder/1.0 (https://github.com/MartyIce/uscivilwar)"}

# title, type, expected start, expected end (or None), expected result, theater, state, significance 1-5, location type
# Result: A = American (allied), B = British, I = inconclusive
CURATED = [
 ("Battles of Lexington and Concord","battle","1775-04-19",None,"A","Northern","Massachusetts",5,"battlefield"),
 ("Capture of Fort Ticonderoga","raid","1775-05-10",None,"A","Northern","New York",3,"fort"),
 ("Battle of Bunker Hill","battle","1775-06-17",None,"B","Northern","Massachusetts",5,"battlefield"),
 ("Siege of Boston","siege","1775-04-19","1776-03-17","A","Northern","Massachusetts",4,"city"),
 ("Battle of Quebec (1775)","battle","1775-12-31",None,"B","Northern","Quebec",3,"city"),
 ("Battle of Moore's Creek Bridge","battle","1776-02-27",None,"A","Southern","North Carolina",2,"battlefield"),
 ("Battle of Sullivan's Island","battle","1776-06-28",None,"A","Southern","South Carolina",3,"fort"),
 ("Battle of Long Island","battle","1776-08-27","1776-08-30","B","Middle","New York",4,"battlefield"),
 ("Battle of Harlem Heights","battle","1776-09-16",None,"A","Middle","New York",2,"battlefield"),
 ("Battle of Valcour Island","battle","1776-10-11",None,"B","Northern","New York",2,"battlefield"),
 ("Battle of White Plains","battle","1776-10-28",None,"B","Middle","New York",2,"battlefield"),
 ("Battle of Fort Washington","battle","1776-11-16",None,"B","Middle","New York",3,"fort"),
 ("Battle of Trenton","battle","1776-12-26",None,"A","Middle","New Jersey",5,"battlefield"),
 ("Second Battle of Trenton","battle","1777-01-02",None,"A","Middle","New Jersey",2,"battlefield"),
 ("Battle of Princeton","battle","1777-01-03",None,"A","Middle","New Jersey",4,"battlefield"),
 ("Battle of Oriskany","battle","1777-08-06",None,"B","Northern","New York",2,"battlefield"),
 ("Battle of Bennington","battle","1777-08-16",None,"A","Northern","New York",3,"battlefield"),
 ("Battle of Brandywine","battle","1777-09-11",None,"B","Middle","Pennsylvania",4,"battlefield"),
 ("Battles of Saratoga","battle","1777-09-19","1777-10-07","A","Northern","New York",5,"battlefield"),
 ("Battle of Germantown","battle","1777-10-04",None,"B","Middle","Pennsylvania",3,"battlefield"),
 ("Battle of Monmouth","battle","1778-06-28",None,"I","Middle","New Jersey",4,"battlefield"),
 ("Battle of Rhode Island","battle","1778-08-29",None,"I","Northern","Rhode Island",2,"battlefield"),
 ("Battle of Kettle Creek","battle","1779-02-14",None,"A","Southern","Georgia",2,"battlefield"),
 ("Battle of Stony Point","battle","1779-07-16",None,"A","Middle","New York",3,"fort"),
 ("Siege of Savannah","siege","1779-09-16","1779-10-18","B","Southern","Georgia",3,"city"),
 ("Siege of Charleston","siege","1780-03-29","1780-05-12","B","Southern","South Carolina",4,"city"),
 ("Battle of Camden","battle","1780-08-16",None,"B","Southern","South Carolina",4,"battlefield"),
 ("Battle of Kings Mountain","battle","1780-10-07",None,"A","Southern","South Carolina",4,"battlefield"),
 ("Battle of Cowpens","battle","1781-01-17",None,"A","Southern","South Carolina",4,"battlefield"),
 ("Battle of Guilford Court House","battle","1781-03-15",None,"B","Southern","North Carolina",4,"battlefield"),
 ("Battle of Hobkirk's Hill","battle","1781-04-25",None,"B","Southern","South Carolina",2,"battlefield"),
 ("Battle of Eutaw Springs","battle","1781-09-08",None,"I","Southern","South Carolina",3,"battlefield"),
 ("Battle of the Chesapeake","battle","1781-09-05",None,"A","Southern","Virginia",4,"battlefield"),
 ("Siege of Yorktown","siege","1781-09-28","1781-10-19","A","Southern","Virginia",5,"city"),
]

# Pages whose own article has no coordinates: use the coordinates of this nearby place's page instead
COORD_FALLBACK = {
 "Battle of Germantown": "Germantown, Philadelphia",
 "Battle of Rhode Island": "Portsmouth, Rhode Island",
 "Siege of Savannah": "Savannah, Georgia",
 "Battle of Eutaw Springs": "Eutawville, South Carolina",
}

# The infobox is missing or unparseable for these; values checked by hand against the article
MANUAL_COMMANDERS = {
 "Battle of Kettle Creek": (["Andrew Pickens", "John Dooly", "Elijah Clarke"], ["John Boyd"]),
}

# Won by the allied (French and American) side
FRANCO_AMERICAN = {"Battle of the Chesapeake", "Siege of Yorktown"}

MONTHS = {m: i+1 for i, m in enumerate("January February March April May June July August September October November December".split())}

def get(params):
    url = API + "?" + urllib.parse.urlencode({**params, "format": "json", "redirects": 1})
    for attempt in range(3):
        try:
            return json.load(urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30))
        except Exception as e:
            if attempt == 2: raise
            time.sleep(1.5)

def clean(text):
    text = re.sub(r"<ref[^>]*>.*?</ref>|<ref[^>]*/>", "", text, flags=re.S)
    text = re.sub(r"\{\{[^{}]*\}\}", "", text)
    text = re.sub(r"\[\[(?:[^\]|]*\|)?([^\]]*)\]\]", r"\1", text)
    text = re.sub(r"<[^>]+>", " ", text)
    return re.sub(r"\s+", " ", text).strip(" ,;|")

def infobox_fields(wikitext):
    fields = {}
    for m in re.finditer(r"^\|\s*([a-z_0-9]+)\s*=\s*(.*?)(?=^\|\s*[a-z_0-9]+\s*=|^\}\})", wikitext, flags=re.S | re.M):
        fields[m.group(1).strip()] = m.group(2).strip()
    return fields

def parse_start_date(raw):
    m = re.search(r"\{\{\s*(?:start|end)?[ -]?date[^|}]*\|(\d{4})\|(\d{1,2})\|(\d{1,2})", raw, flags=re.I)
    if m: return f"{m.group(1)}-{int(m.group(2)):02d}-{int(m.group(3)):02d}"
    t = clean(raw)
    m = re.search(r"([A-Z][a-z]+) (\d{1,2})(?:\s*[–-]\s*\d{1,2})?,? (\d{4})", t)
    if m and m.group(1) in MONTHS: return f"{m.group(3)}-{MONTHS[m.group(1)]:02d}-{int(m.group(2)):02d}"
    m = re.search(r"(\d{1,2}) ([A-Z][a-z]+),? (\d{4})", t)
    if m and m.group(2) in MONTHS: return f"{m.group(3)}-{MONTHS[m.group(2)]:02d}-{int(m.group(1)):02d}"
    return None

def parse_result(raw):
    t = clean(raw).lower()
    if "inconclusive" in t or "stalemate" in t or "draw" in t: return "I"
    if "american" in t or "patriot" in t or "continental" in t or "franco-american" in t: return "A"
    if "british" in t or "loyalist" in t: return "B"
    if "french" in t: return "A"
    return None

def parse_commanders(raw):
    names = []
    for m in re.finditer(r"\[\[([^\]|]+)(?:\|([^\]]*))?\]\]", raw):
        name = (m.group(2) or m.group(1)).strip()
        low = name.lower()
        if any(w in low for w in ("army","militia","navy","flag","corps","regiment","brigade","division","colony","province","kingdom","states","empire")): continue
        if not re.match(r"^[A-Z][\w.'’ -]+$", name) or len(name.split()) < 2: continue
        if name not in names: names.append(name)
    return names[:3]

def first_sentences(text, n=2):
    text = re.sub(r"\([^)]*\)", "", text)  # drop parentheticals (pronunciations, dates)
    text = re.sub(r"\s+", " ", text).strip()
    parts = re.split(r"(?<=[.!?])\s+(?=[A-Z])", text)
    return " ".join(parts[:n])

def main():
    events, problems = [], []
    for title, etype, exp_start, exp_end, exp_res, theater, state, sig, loc_type in CURATED:
        q = get({"action": "query", "titles": title, "prop": "coordinates|extracts|info", "exintro": 1, "explaintext": 1, "inprop": "url", "colimit": 1})
        page = next(iter(q["query"]["pages"].values()))
        if "missing" in page:
            problems.append(f"{title}: page not found"); continue
        wt = get({"action": "parse", "page": title, "prop": "wikitext", "section": 0})["parse"]["wikitext"]["*"]
        f = infobox_fields(wt)

        coords = (page.get("coordinates") or [None])[0]
        if not coords and title in COORD_FALLBACK:
            fb = get({"action": "query", "titles": COORD_FALLBACK[title], "prop": "coordinates", "colimit": 1})
            fb_page = next(iter(fb["query"]["pages"].values()))
            coords = (fb_page.get("coordinates") or [None])[0]
            if coords: problems.append(f"{title}: coordinates are from the page '{COORD_FALLBACK[title]}' (nearby place, not the exact field)")
        if not coords: problems.append(f"{title}: no coordinates on the page - needs a manual location"); continue

        parsed_start = parse_start_date(f.get("date", ""))
        if parsed_start and parsed_start != exp_start:
            problems.append(f"{title}: infobox start date {parsed_start} != expected {exp_start} (using expected)")
        elif not parsed_start:
            problems.append(f"{title}: could not parse infobox date; using curated {exp_start}")
        parsed_res = parse_result(f.get("result", ""))
        if parsed_res and parsed_res != exp_res:
            problems.append(f"{title}: infobox result '{clean(f.get('result',''))[:60]}' reads as {parsed_res}, expected {exp_res} (using expected)")
        elif not parsed_res:
            problems.append(f"{title}: could not parse infobox result '{clean(f.get('result',''))[:60]}'; using curated {exp_res}")

        # Infoboxes list belligerents in varying order, so decide which commander list
        # is British from the belligerent field text, not from its position
        c1, c2 = parse_commanders(f.get("commander1", "")), parse_commanders(f.get("commander2", ""))
        side1 = clean(f.get("combatant1", "") + " " + f.get("belligerent1", "")).lower()
        side2 = clean(f.get("combatant2", "") + " " + f.get("belligerent2", "")).lower()
        BRIT = ("britain", "british", "hesse", "hessian", "loyalist", "royal", "kingdom of great")
        side1_british, side2_british = any(k in side1 for k in BRIT), any(k in side2 for k in BRIT)
        AMER = ("united colonies", "united states", "continental", "thirteen colonies", "patriot")
        side1_american, side2_american = any(k in side1 for k in AMER), any(k in side2 for k in AMER)
        if side1_british and not side2_british: british, american = c1, c2
        elif side2_british and not side1_british: american, british = c1, c2
        elif side2_american and not side1_american: american, british = c2, c1
        elif side1_american and not side2_american: american, british = c1, c2
        else:
            american, british = c1, c2
            problems.append(f"{title}: could not tell which side is British (side1='{side1[:40]}', side2='{side2[:40]}'); check commanders")
        if title in MANUAL_COMMANDERS:
            american, british = MANUAL_COMMANDERS[title]
        elif not american or not british:
            problems.append(f"{title}: commanders parsed as american={american} british={british}")

        result = {"A": "American victory", "B": "British victory", "I": "Inconclusive"}[exp_res]
        if title in FRANCO_AMERICAN: result = "Franco-American victory"
        events.append({
            "name": title.replace(" (1775)", ""),
            "type": etype,
            "date_start": exp_start,
            "date_end": exp_end or exp_start,
            "description": first_sentences(page.get("extract", "")),
            "campaign": None,
            "theater": theater,
            "result": result,
            "significance": sig,
            "cwsac_id": None,
            "wikipedia_url": page["fullurl"],
            "image_url": None,
            "location": {"name": title, "type": loc_type, "coordinates": {"lat": round(coords["lat"], 5), "lng": round(coords["lon"], 5)}, "state": state},
            # Placeholder side keys (union = American, confederate = British) until sides are made configurable
            "commanders": {"union": american, "confederate": british},
        })
        time.sleep(0.2)

    events.sort(key=lambda e: (e["date_start"], e["name"]))
    for i, e in enumerate(events, 1):
        e["id"] = i
        e["location"]["id"] = i
        e["location"]["name"] = e["location"]["name"].replace("Battles of ", "").replace("Battle of ", "").replace("Siege of ", "").replace("Capture of ", "").replace(" (1775)", "").replace("Second ", "")
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(events, indent=2, ensure_ascii=False) + "\n")
    print(f"wrote {len(events)} events to {OUT}")
    print("\nFor review:" if problems else "\nNo problems.")
    for p in problems: print("  -", p)

main()
