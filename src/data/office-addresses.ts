export type OfficeId = "et" | "us" | "uk" | "pl";
export type OfficeAddress = {
  address: string;
  latitude: number;
  longitude: number;
};

// Add only owner-confirmed street addresses and their verified map coordinates.
// City centres must never be presented as office pins.
export const officeAddresses: Partial<Record<OfficeId, OfficeAddress>> = {};
