import type { Location } from '../types';

export const mockLocations: Location[] = [
  {
    id: 1,
    name: "Fort Sumter",
    type: "fort",
    coordinates: { lat: 32.7522, lng: -79.8745 },
    state: "South Carolina",
    description: "A sea fort in Charleston Harbor where the first shots of the Civil War were fired."
  },
  {
    id: 2,
    name: "Manassas",
    type: "battlefield",
    coordinates: { lat: 38.8128, lng: -77.5214 },
    state: "Virginia",
    description: "Site of two major battles, also known as Bull Run."
  },
  {
    id: 3,
    name: "Pittsburg Landing",
    type: "battlefield",
    coordinates: { lat: 35.1475, lng: -88.3303 },
    state: "Tennessee",
    description: "Site of the Battle of Shiloh, a major engagement in the Western Theater."
  },
  {
    id: 4,
    name: "Sharpsburg",
    type: "battlefield",
    coordinates: { lat: 39.4747, lng: -77.7447 },
    state: "Maryland",
    description: "Site of the Battle of Antietam, the bloodiest single-day battle in American history."
  },
  {
    id: 5,
    name: "Fredericksburg",
    type: "city",
    coordinates: { lat: 38.3032, lng: -77.4605 },
    state: "Virginia",
    description: "Strategic crossing point on the Rappahannock River."
  },
  {
    id: 6,
    name: "Chancellorsville",
    type: "battlefield",
    coordinates: { lat: 38.3119, lng: -77.6411 },
    state: "Virginia",
    description: "Site of Lee's greatest victory and Jackson's mortal wounding."
  },
  {
    id: 7,
    name: "Gettysburg",
    type: "battlefield",
    coordinates: { lat: 39.8309, lng: -77.2311 },
    state: "Pennsylvania",
    description: "Site of the war's turning point and Lincoln's famous address."
  },
  {
    id: 8,
    name: "Vicksburg",
    type: "city",
    coordinates: { lat: 32.3526, lng: -90.8779 },
    state: "Mississippi",
    description: "Key fortress on the Mississippi River, captured after a lengthy siege."
  },
  {
    id: 9,
    name: "Chickamauga",
    type: "battlefield",
    coordinates: { lat: 34.9167, lng: -85.2617 },
    state: "Georgia",
    description: "Site of the bloodiest battle in the Western Theater."
  },
  {
    id: 10,
    name: "The Wilderness",
    type: "battlefield",
    coordinates: { lat: 38.3150, lng: -77.7300 },
    state: "Virginia",
    description: "Dense forest that was the site of brutal fighting in 1864."
  },
  {
    id: 11,
    name: "Spotsylvania Court House",
    type: "battlefield",
    coordinates: { lat: 38.2000, lng: -77.5914 },
    state: "Virginia",
    description: "Site of intense fighting including the 'Bloody Angle'."
  },
  {
    id: 12,
    name: "Atlanta",
    type: "city",
    coordinates: { lat: 33.7490, lng: -84.3880 },
    state: "Georgia",
    description: "Major Confederate industrial and railroad hub captured by Sherman."
  },
  {
    id: 13,
    name: "Petersburg",
    type: "city",
    coordinates: { lat: 37.2279, lng: -77.4019 },
    state: "Virginia",
    description: "Site of a nine-month siege protecting Richmond."
  },
  {
    id: 14,
    name: "Richmond",
    type: "capital",
    coordinates: { lat: 37.5407, lng: -77.4360 },
    state: "Virginia",
    description: "Capital of the Confederate States of America."
  },
  {
    id: 15,
    name: "Appomattox Court House",
    type: "landmark",
    coordinates: { lat: 37.3765, lng: -78.7969 },
    state: "Virginia",
    description: "Site of Lee's surrender to Grant, effectively ending the Civil War."
  },
  {
    id: 16,
    name: "Washington D.C.",
    type: "capital",
    coordinates: { lat: 38.9072, lng: -77.0369 },
    state: null,
    description: "Capital of the United States and seat of the Union government."
  },
  {
    id: 17,
    name: "Charleston",
    type: "city",
    coordinates: { lat: 32.7765, lng: -79.9311 },
    state: "South Carolina",
    description: "Major Southern port and site of Fort Sumter."
  },
  {
    id: 18,
    name: "New Orleans",
    type: "city",
    coordinates: { lat: 29.9511, lng: -90.0715 },
    state: "Louisiana",
    description: "Largest Confederate city, captured by Union forces in 1862."
  },
  {
    id: 19,
    name: "Savannah",
    type: "city",
    coordinates: { lat: 32.0809, lng: -81.0912 },
    state: "Georgia",
    description: "End point of Sherman's March to the Sea."
  },
  {
    id: 20,
    name: "Nashville",
    type: "city",
    coordinates: { lat: 36.1627, lng: -86.7816 },
    state: "Tennessee",
    description: "Important Union supply base in the Western Theater."
  }
];

/**
 * Get location by ID
 */
export function getLocationById(id: number): Location | undefined {
  return mockLocations.find(l => l.id === id);
}

/**
 * Get locations by state
 */
export function getLocationsByState(state: string): Location[] {
  return mockLocations.filter(l => l.state === state);
}

/**
 * Get locations by type
 */
export function getLocationsByType(type: string): Location[] {
  return mockLocations.filter(l => l.type === type);
}
