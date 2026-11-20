#!/usr/bin/env python3
"""Build movements.json for the American Revolution topic (pilot: Washington, Cornwallis).

Each commander has a dated itinerary. A row is (date, kind, ref, label):
  kind "ev": ref is an event id in events.json; the position is that event's location (a battle waypoint)
  kind "pl": ref is a Wikipedia article title; the position is that article's coordinates
Positions between rows are straight-line interpolated by the app, so add a row wherever the
route bends (river crossings, winter quarters, ...). Dates come from the sources listed per row.

Output: frontend/src/topics/usrevolution/movements.json
Run:    python3 scripts/topics/build_usrevolution_movements.py
"""
import datetime, json, time, urllib.error, urllib.parse, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
EVENTS = ROOT / "frontend/src/topics/usrevolution/events.json"
OUT = ROOT / "frontend/src/topics/usrevolution/movements.json"
UA = {"User-Agent": "historifically-topic-builder/1.0 (educational project)"}
API = "https://en.wikipedia.org/w/api.php"

# Peak approximate strength of the force the commander led (used for the "Troop #" view)
COMMANDERS = [
    {
        "id": "washington",
        "commander": "George Washington",
        "name": "Continental Army",
        "side": "union",  # placeholder side key: American (see events.json)
        "color": "#1d4ed8",
        "troop_strength": 19000,
        "itinerary": [
            # (date, kind, ref, label)
            ("1775-06-15", "pl", "Philadelphia", "Philadelphia (appointed commander-in-chief)"),
            ("1775-07-03", "pl", "Cambridge, Massachusetts", "Cambridge (takes command)"),
            ("1776-04-13", "pl", "New York City", "New York"),
            ("1776-08-27", "ev", 8, "Battle of Long Island"),
            ("1776-09-16", "ev", 9, "Battle of Harlem Heights"),
            ("1776-10-28", "ev", 11, "Battle of White Plains"),
            ("1776-11-16", "pl", "Fort Lee, New Jersey", "Fort Lee"),
            ("1776-11-20", "pl", "Hackensack, New Jersey", "Hackensack"),
            ("1776-11-23", "pl", "Newark, New Jersey", "Newark"),
            ("1776-11-29", "pl", "New Brunswick, New Jersey", "New Brunswick"),
            ("1776-12-03", "pl", "Trenton, New Jersey", "Trenton"),
            ("1776-12-08", "pl", "Washington Crossing, Pennsylvania", "Across the Delaware"),
            ("1776-12-26", "ev", 13, "Battle of Trenton"),
            ("1777-01-03", "ev", 15, "Battle of Princeton"),
            ("1777-01-06", "pl", "Morristown, New Jersey", "Morristown (winter quarters)"),
            ("1777-05-28", "pl", "Bound Brook, New Jersey", "Middlebrook camp"),
            ("1777-09-11", "ev", 18, "Battle of Brandywine"),
            ("1777-10-04", "ev", 20, "Battle of Germantown"),
            ("1777-12-19", "pl", "Valley Forge National Historical Park", "Valley Forge (winter quarters)"),
            ("1778-06-28", "ev", 21, "Battle of Monmouth"),
            ("1778-07-20", "pl", "White Plains, New York", "White Plains"),
            ("1779-12-01", "pl", "Morristown, New Jersey", "Morristown (winter quarters)"),
            ("1780-09-22", "pl", "Hartford, Connecticut", "Hartford (conference with Rochambeau)"),
            ("1780-09-25", "pl", "West Point, New York", "West Point (Arnold's treason)"),
            ("1781-08-31", "pl", "Philadelphia", "Philadelphia (marching to Yorktown)"),
            ("1781-09-09", "pl", "Mount Vernon", "Mount Vernon"),
            ("1781-09-14", "pl", "Williamsburg, Virginia", "Williamsburg"),
            ("1781-09-28", "ev", 34, "Siege of Yorktown begins"),
            ("1781-10-19", "ev", 34, "Cornwallis surrenders at Yorktown"),
            ("1782-04-01", "pl", "Newburgh, New York", "Newburgh (headquarters)"),
            ("1783-11-25", "pl", "New York City", "New York (British evacuate)"),
            ("1783-12-23", "pl", "Annapolis, Maryland", "Annapolis (resigns commission)"),
            ("1783-12-24", "pl", "Mount Vernon", "Mount Vernon (returns home)"),
        ],
    },
    {
        "id": "cornwallis",
        "commander": "Charles Cornwallis",
        "name": "British Army (corps and southern army)",
        "side": "confederate",  # placeholder side key: British (see events.json)
        "color": "#b91c1c",
        "troop_strength": 7800,
        "itinerary": [
            ("1776-08-27", "ev", 8, "Battle of Long Island"),
            ("1776-11-20", "pl", "Fort Lee, New Jersey", "Fort Lee"),
            ("1776-12-01", "pl", "New Brunswick, New Jersey", "New Brunswick"),
            ("1776-12-08", "pl", "Trenton, New Jersey", "Trenton"),
            ("1777-01-02", "ev", 14, "Second Battle of Trenton"),
            ("1777-01-03", "pl", "Princeton, New Jersey", "Princeton"),
            ("1777-09-11", "ev", 18, "Battle of Brandywine"),
            ("1777-09-26", "pl", "Philadelphia", "Philadelphia (enters the city)"),
            ("1778-06-28", "ev", 21, "Battle of Monmouth"),
            # Month-level: Cornwallis sailed to England in Nov 1778 and returned in July 1779; the marker waits in New York
            ("1778-11-15", "pl", "New York City", "New York (leaves for England, Nov 1778)"),
            ("1779-07-15", "pl", "New York City", "New York (back from England, July 1779)"),
            ("1779-12-26", "pl", "New York City", "New York (fleet sails for Charleston)"),
            ("1780-02-11", "pl", "Charleston, South Carolina", "Near Charleston (British land)"),
            ("1780-05-12", "ev", 26, "Siege of Charleston"),
            ("1780-08-16", "ev", 27, "Battle of Camden"),
            ("1780-09-26", "pl", "Charlotte, North Carolina", "Charlotte"),
            ("1781-01-25", "pl", "Lincolnton, North Carolina", "Ramsour's Mill"),
            ("1781-03-15", "ev", 30, "Battle of Guilford Court House"),
            ("1781-04-07", "pl", "Wilmington, North Carolina", "Wilmington"),
            ("1781-05-20", "pl", "Petersburg, Virginia", "Petersburg"),
            ("1781-06-25", "pl", "Williamsburg, Virginia", "Williamsburg"),
            ("1781-08-02", "pl", "Yorktown, Virginia", "Yorktown (fortifies the town)"),
            ("1781-10-19", "ev", 34, "Surrender at Yorktown"),
        ],
    },
]


# Itineraries researched from sources live in usrevolution_itineraries/<id>.json (one file per commander,
# each row carrying its source URL and a short quote). They are added after the inline ones above.
ITINERARY_DIR = Path(__file__).resolve().parent / "usrevolution_itineraries"
EXTRA_STYLE = {  # id -> (placeholder side key, map colour)
    "greene": ("union", "#0891b2"),
    "howe": ("confederate", "#ef4444"),
    "clinton": ("confederate", "#f97316"),
    "burgoyne": ("confederate", "#be123c"),
}


def load_extra_commanders():
    out = []
    for f in sorted(ITINERARY_DIR.glob("*.json")):
        d = json.loads(f.read_text())
        side, color = EXTRA_STYLE[d["id"]]
        out.append({
            "id": d["id"], "commander": d["commander"], "name": d["name"], "side": side, "color": color,
            "troop_strength": d["troop_strength"],
            "itinerary": [(r["date"], r["kind"], r["ref"], r["label"]) for r in d["rows"]],
        })
    return out


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


def wiki_coordinates(titles):
    out = {}
    titles = sorted(titles)
    for i in range(0, len(titles), 40):
        chunk = titles[i:i + 40]
        data = get_json(API + "?" + urllib.parse.urlencode({
            "action": "query", "prop": "coordinates", "titles": "|".join(chunk),
            "format": "json", "redirects": 1, "colimit": "max"}))
        redirects = {r["from"]: r["to"] for r in data["query"].get("redirects", [])}
        norm = {r["from"]: r["to"] for r in data["query"].get("normalized", [])}
        coords = {p["title"]: p["coordinates"][0] for p in data["query"]["pages"].values() if p.get("coordinates")}
        for t in chunk:
            final = redirects.get(norm.get(t, t), norm.get(t, t))
            if final in coords:
                out[t] = {"lat": round(coords[final]["lat"], 4), "lng": round(coords[final]["lon"], 4)}
    return out


def main():
    events = {e["id"]: e for e in json.load(open(EVENTS))}
    COMMANDERS.extend(load_extra_commanders())
    titles = {r[2] for c in COMMANDERS for r in c["itinerary"] if r[1] == "pl"}
    coords = wiki_coordinates(titles)
    missing = titles - set(coords)
    if missing:
        raise SystemExit(f"no coordinates for: {sorted(missing)}")

    out = []
    for c in COMMANDERS:
        waypoints, last = [], ""
        for date, kind, ref, label in c["itinerary"]:
            assert date >= last, f"{c['commander']}: dates out of order at {date}"
            last = date
            if kind == "ev":
                ev = events[ref]
                waypoints.append({
                    "date": date, "coordinates": ev["location"]["coordinates"],
                    "location_name": label, "is_battle": True, "event_id": ref,
                })
            else:
                waypoints.append({"date": date, "coordinates": coords[ref], "location_name": label})
        # The marker stays 30 days after the last sourced waypoint, then disappears
        last_dt = datetime.date.fromisoformat(waypoints[-1]["date"]) + datetime.timedelta(days=30)
        out.append({k: v for k, v in c.items() if k != "itinerary"} | {"active_until": last_dt.isoformat(), "waypoints": waypoints})
        print(f"{c['commander']}: {len(waypoints)} waypoints, {waypoints[0]['date']} to {waypoints[-1]['date']}")

    OUT.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n")
    print("wrote", OUT)


if __name__ == "__main__":
    main()
