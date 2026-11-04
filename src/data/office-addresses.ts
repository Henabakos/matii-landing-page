export type OfficeId = "et" | "us" | "uk" | "pl";
export type OfficeAddress = {
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
};

// Add only owner-confirmed street addresses and their verified map coordinates.
// City centres must never be presented as office pins.
export const officeAddresses: Partial<Record<OfficeId, OfficeAddress>> = {
  // Coordinates: North Indian Creek Drive (OpenStreetMap has no house number 751).
  us: {
    address: "751 N Indian Creek Dr\nClarkston, GA 30021\nUnited States",
    phone: "+1 612 476 7866",
    latitude: 33.80554,
    longitude: -84.2397,
  },
  // Coordinates: LS9 6RH postcode centroid.
  uk: {
    address: "Leeds LS9 6RH\nUnited Kingdom",
    phone: "+44 7763 823269",
    latitude: 53.80991,
    longitude: -1.48744,
  },
  // Coordinates: building at Zwierzyniecka 14.
  pl: {
    address: "Zwierzyniecka 14/503\n15-333 Białystok\nPoland",
    phone: "+48 579 371 859",
    latitude: 53.11939,
    longitude: 23.15292,
  },
};
