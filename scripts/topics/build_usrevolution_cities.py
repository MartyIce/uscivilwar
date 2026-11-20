#!/usr/bin/env python3
"""Build cities.json for the American Revolution topic.

Coordinates, description and image come from Wikipedia (one batched coordinates
call plus the REST summary per city). The wartime role, key events and 1790
census populations are written by hand below from well-known facts; each key
event is a dated, widely documented episode.

Output: frontend/src/topics/usrevolution/cities.json
Run:    python3 scripts/topics/build_usrevolution_cities.py
"""
import json, re, time, urllib.error, urllib.parse, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "frontend/src/topics/usrevolution/cities.json"
UA = {"User-Agent": "historifically-topic-builder/1.0 (educational project)"}
API = "https://en.wikipedia.org/w/api.php"

# name, wikipedia title, state label, 1790 census population (None when not in the first census as a city),
# wartime role, key events
CITIES = [
    ("Boston", "Boston", "Massachusetts", 18320,
     "Center of colonial resistance and the first major theater of the war. The British garrison was besieged here from April 1775 until it evacuated.",
     ["Boston Tea Party (December 1773)", "Siege of Boston (April 1775 to March 1776)", "British evacuation (March 17, 1776)"]),
    ("New York", "New York City", "New York", 33131,
     "The largest port in the colonies. The British army held it from September 1776 to November 1783 and used it as their main base in North America.",
     ["Battle of Long Island (August 1776)", "British occupation begins (September 1776)", "British evacuation (November 25, 1783)"]),
    ("Philadelphia", "Philadelphia", "Pennsylvania", 28522,
     "Seat of the Continental Congress and the largest city in the colonies. The British occupied it for nine months during the winter of 1777 to 1778.",
     ["Declaration of Independence adopted (July 4, 1776)", "British occupation (September 1777 to June 1778)", "Continental Army winter at nearby Valley Forge (1777 to 1778)"]),
    ("Charleston", "Charleston, South Carolina", "South Carolina", 16359,
     "The main port of the southern colonies. Its fall in 1780 was one of the largest American defeats of the war.",
     ["Battle of Sullivan's Island (June 1776)", "Siege of Charleston (March to May 1780)", "British evacuation (December 1782)"]),
    ("Savannah", "Savannah, Georgia", "Georgia", None,
     "Georgia's capital and port. The British captured it in 1778 and held it until 1782.",
     ["British capture (December 29, 1778)", "Franco-American siege fails (October 1779)", "British evacuation (July 1782)"]),
    ("Yorktown", "Yorktown, Virginia", "Virginia", None,
     "A small tobacco port on the York River. General Cornwallis's army was trapped here, and its surrender effectively ended major fighting.",
     ["Siege of Yorktown (September 28 to October 19, 1781)", "Cornwallis surrenders (October 19, 1781)"]),
    ("Williamsburg", "Williamsburg, Virginia", "Virginia", None,
     "Capital of colonial and revolutionary Virginia until the government moved to Richmond in 1780.",
     ["Gunpowder Incident (April 1775)", "Virginia Convention instructs for independence (May 1776)", "Capital moves to Richmond (1780)"]),
    ("Trenton", "Trenton, New Jersey", "New Jersey", None,
     "Site of Washington's surprise attack on the Hessian garrison after his army crossed the Delaware River.",
     ["Washington crosses the Delaware (December 25 to 26, 1776)", "Battle of Trenton (December 26, 1776)", "Second Battle of Trenton (January 2, 1777)"]),
    ("Newport", "Newport, Rhode Island", "Rhode Island", 6716,
     "A major port. The British occupied it from late 1776 to 1779, and a French army landed here in 1780.",
     ["British occupation (December 1776 to October 1779)", "Battle of Rhode Island (August 1778)", "French army under Rochambeau arrives (July 1780)"]),
    ("Albany", "Albany, New York", "New York", None,
     "The northern base for the Saratoga campaign and the gateway to the Hudson River valley.",
     ["Staging area for the Saratoga campaign (1777)", "Burgoyne's army surrenders nearby at Saratoga (October 17, 1777)"]),
    ("Baltimore", "Baltimore", "Maryland", 13503,
     "A growing port. Congress met here for several months after leaving Philadelphia.",
     ["Continental Congress meets in Baltimore (December 1776 to March 1777)"]),
    ("Annapolis", "Annapolis, Maryland", "Maryland", None,
     "Maryland's capital, where the Continental Congress met when the war ended.",
     ["Washington resigns his commission (December 23, 1783)", "Congress ratifies the Treaty of Paris here (January 14, 1784)"]),
    ("Quebec", "Quebec City", "Canada", None,
     "The capital of British Canada. An American attack here ended in defeat.",
     ["Montgomery and Arnold attack the city (December 31, 1775)", "Richard Montgomery killed in the assault"]),
    ("Montreal", "Montreal", "Canada", None,
     "An American army captured the city in 1775 and left in 1776 when the invasion of Canada failed.",
     ["Captured by Montgomery (November 1775)", "American withdrawal (June 1776)"]),
    ("Camden", "Camden, South Carolina", "South Carolina", None,
     "A British inland post and supply base in the southern campaign.",
     ["Battle of Camden (August 16, 1780)", "Battle of Hobkirk's Hill (April 25, 1781)"]),
    ("Wilmington", "Wilmington, North Carolina", "North Carolina", None,
     "A North Carolina port. Cornwallis's army rested here after the Battle of Guilford Court House.",
     ["British occupation (January 1781 to November 1781)"]),
]


def get_json(url):
    for attempt in range(8):
        try:
            time.sleep(0.5)
            return json.load(urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30))
        except urllib.error.HTTPError as e:
            if e.code == 429 or e.code >= 500:
                time.sleep(min(float(e.headers.get("Retry-After") or 3 * (attempt + 1)), 60))
                continue
            raise
        except Exception:
            time.sleep(2 * (attempt + 1))
    raise RuntimeError("giving up on " + url)


def first_sentences(text, n=2):
    text = re.sub(r"\([^)]*\)", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return " ".join(re.split(r"(?<=[.!?])\s+(?=[A-Z])", text)[:n])


def main():
    titles = "|".join(c[1] for c in CITIES)
    data = get_json(API + "?" + urllib.parse.urlencode({
        "action": "query", "prop": "coordinates", "titles": titles, "format": "json", "redirects": 1, "colimit": "max"}))
    redirects = {r["from"]: r["to"] for r in data["query"].get("redirects", [])}
    coords = {p["title"]: p["coordinates"][0] for p in data["query"]["pages"].values() if p.get("coordinates")}

    out = []
    for i, (name, title, state, pop, role, events) in enumerate(CITIES, 1):
        c = coords.get(redirects.get(title, title))
        if not c:
            print("NO COORDINATES:", name)
            continue
        s = get_json("https://en.wikipedia.org/api/rest_v1/page/summary/" + urllib.parse.quote(title.replace(" ", "_"), safe=""))
        out.append({
            "id": i, "name": name, "state": state,
            "coordinates": {"lat": round(c["lat"], 4), "lng": round(c["lon"], 4)},
            "side": None,
            "population": pop, "population_year": 1790 if pop else None,
            "population_1860": None,
            "description": first_sentences(s.get("extract", ""), 2),
            "wartime_role": role, "key_events": events,
            "image_url": (s.get("thumbnail") or {}).get("source"),
        })
        print(f"{i:2} {name:12} {c['lat']:.3f},{c['lon']:.3f}  pop={pop}")
    OUT.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n")
    print(f"wrote {len(out)} cities to {OUT}")


if __name__ == "__main__":
    main()
