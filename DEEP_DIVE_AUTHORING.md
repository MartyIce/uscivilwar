# Authoring a deep dive ("lite" format)

A deep dive is one JSON file: `frontend/src/data/battles/lite/<slug>.json`.

- `<slug>` is the slug of the event name in the app. "Battle of Shiloh" -> `shiloh`, "First Battle of Bull Run" -> `first_bull_run`. Slug rules are in `frontend/src/utils/slugs.ts`. The file name and the `id` field must match.
- The TypeScript type is `LiteBattleData` in `frontend/src/data/battles/types.ts`. That file is the source of truth for field names and allowed values.
- A hand-built full example is `frontend/src/data/battles/gettysburg-deep.ts`. Match its tone and level of detail, but NOT its regiment-level order of battle. Lite files list only the units that appear on the map (corps/division level).
- Validate with `cd frontend && npm run validate:battles -- <slug>`. The file must pass with 0 errors.

## Accuracy rules (most important)

1. Use sources. Read the Wikipedia article for the battle, plus one more source (NPS, American Battlefield Trust, or CWSAC battle summary). Put every URL you used in `sources`.
2. Do not invent facts. If a commander, strength, casualty figure, time or place is not in your sources, leave the item out. Fewer correct items are better than many guessed ones.
3. Coordinates: use real coordinates for named places (Wikipedia pages for places and battlefields show coordinates). A unit's position must be near the landmark or area the sources say it held. Do not place units at random.
4. Times: use only times the sources support. When sources give a range, use its start. Snapshots must go in time order.
5. Set `"review": "unreviewed"`. A human changes it to `"reviewed"` after checking the map.

## Shape (all fields required unless marked optional)

```jsonc
{
  "id": "shiloh",                       // = file name
  "name": "Battle of Shiloh",
  "description": "2-4 sentences.",
  "startDate": "1862-04-06",            // ISO date
  "endDate": "1862-04-07",
  "location": {
    "lat": 35.15, "lng": -88.33,        // battlefield center
    "bounds": { "north": 35.20, "south": 35.10, "east": -88.25, "west": -88.40 }  // tight box (< 0.6 degrees each way)
  },
  "result": "union_victory",            // union_victory | confederate_victory | inconclusive
  "significance": "1-2 sentences on why it mattered.",
  "forces": {
    "union": {
      "commander": "Ulysses S. Grant", "commanderRank": "Major General",
      "armyName": "Army of the Tennessee", "totalStrength": 65000,
      "casualties": { "killed": 1754, "wounded": 8408, "captured": 2885, "missing": 0, "total": 13047 },
      "units": [
        { "id": "union-sherman-5th", "name": "5th Division", "commander": "William T. Sherman", "strength": 8000, "type": "division" }
      ]
    },
    "confederate": { /* same shape */ }
  },
  "landmarks": [                        // 8+ items
    { "id": "pittsburg-landing", "name": "Pittsburg Landing", "type": "town", "lat": 35.1475, "lng": -88.3303, "description": "optional" }
    // type: hill ridge road town farm creek woods field river church bridge fort ford other
  ],
  "timeline": [                         // 6-14 snapshots, in time order
    {
      "id": "day1-0600",
      "datetime": "1862-04-06T06:00:00",   // inside startDate..endDate
      "label": "April 6, 6:00 AM",
      "title": "Short title",
      "description": "What is happening at this moment.",
      "positions": [                    // where the main units are at this moment
        { "unitId": "union-sherman-5th", "unitType": "division", "side": "union",
          "lat": 35.17, "lng": -88.32, "status": "defending" }
        // status: advancing defending retreating routing reserve arriving
        // optional: "movementTo": { "lat": ..., "lng": ... } for advancing/retreating units
      ],
      "events": [                       // may be empty
        { "id": "first-contact", "time": "1862-04-06T05:15:00", "title": "...", "description": "...",
          "type": "combat",            // combat movement command casualty terrain
          "importance": "major",       // critical major minor
          "location": { "lat": 35.16, "lng": -88.35 },   // optional
          "relatedUnits": ["union-sherman-5th"] }          // optional, must be unit ids
      ]
    }
  ],
  "sources": ["https://en.wikipedia.org/wiki/Battle_of_Shiloh"],
  "review": "unreviewed"
}
```

## Consistency rules the validator enforces

- Every `positions[].unitId` and `relatedUnits` entry is a unit `id` from `forces.*.units`. The position's `side` matches the unit's side.
- A unit appears at most once per snapshot. Unit ids, landmark ids, snapshot ids and event ids are unique across the file.
- All positions, landmarks and event locations are inside `location.bounds`.
- `location` is within 25 km of the battle's location in the app (`frontend/src/mocks/data/events-expanded.ts`).
- `casualties.total` should equal killed + wounded + captured + missing (warning only).
- Aim for: 6+ snapshots, 8+ landmarks, 4+ units per side.
