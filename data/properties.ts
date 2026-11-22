import property1 from '../assets/properties/property1.jpg';
import property2 from '../assets/properties/property2.jpg';
import property3 from '../assets/properties/property3.jpg';
import property4 from '../assets/properties/property4.jpg';
import property5 from '../assets/properties/property5.jpg';
import property6 from '../assets/properties/property6.jpg';
import property7 from '../assets/properties/property7.jpg';
import property8 from '../assets/properties/property8.jpg';
import property9 from '../assets/properties/property9.jpg';
import sourceData from './properties.json';
import type { Property, Agent, ListingPurpose } from '@/types';

export const propertyImages = {
  property1,
  property2,
  property3,
  property4,
  property5,
  property6,
  property7,
  property8,
  property9,
};

const imageBySourcePath: Record<string, string> = {
  '/src/assets/properties/property1.jpg': property1,
  '/src/assets/properties/property2.jpg': property2,
  '/src/assets/properties/property3.jpg': property3,
  '/src/assets/properties/property4.jpg': property4,
  '/src/assets/properties/property5.jpg': property5,
  '/src/assets/properties/property6.jpg': property6,
  '/src/assets/properties/property7.jpg': property7,
  '/src/assets/properties/property8.jpg': property8,
  '/src/assets/properties/property9.jpg': property9,
};

const resolveImage = (sourcePath: string): string => {
  const image = imageBySourcePath[sourcePath];

  if (!image) {
    throw new Error(`No imported property image matches "${sourcePath}".`);
  }

  return image;
};

export const propertiesData = {
  properties: (sourceData.properties as Omit<Property, 'image' | 'gallery'>[]).map((property) => ({
    ...property,
    image: resolveImage((property as unknown as { image: string }).image),
    gallery: (property as unknown as { gallery: string[] }).gallery.map(resolveImage),
  })) as Property[],
};

// Sample inventory gives the new search modes something to browse locally.
const sampleListings = [
  { sourceId: 4, id: 101, purpose: 'rent', price: 4200 },
  { sourceId: 9, id: 102, purpose: 'rent', price: 2400 },
  { sourceId: 6, id: 103, purpose: 'projects', price: 3500000 },
] as const;

for (const { sourceId, id, purpose, price } of sampleListings) {
  const source = propertiesData.properties.find((property) => property.id === sourceId);
  if (!source) continue;
  propertiesData.properties.push({
    ...source,
    id,
    purpose,
    price,
    demo: true,
    featured: false,
    amenities: [],
    description: 'Example listing for previewing the portal. The price and availability are illustrative.',
  });
}

export const listingMarkets = {
  buy: { label: 'Buy', title: 'Properties for sale', path: '/listings', min: 0, max: 6000000, step: 100000 },
  rent: { label: 'Rent', title: 'Properties for rent', path: '/rent', min: 0, max: 10000, step: 100 },
  projects: { label: 'New projects', title: 'New property projects', path: '/projects', min: 0, max: 6000000, step: 100000 },
} satisfies Record<ListingPurpose, { label: string; title: string; path: string; min: number; max: number; step: number }>;

export function listingsFor(purpose: ListingPurpose) {
  return propertiesData.properties.filter((property) => (property.purpose ?? 'buy') === purpose);
}

// Derived utilities to fully utilize all dataset entities
export interface AgentWithProperty extends Agent {
  propertyId: number;
  propertyTitle: string;
  propertyLocation: string;
}

export const allAgents: AgentWithProperty[] = listingsFor('buy').map((p) => ({
  ...p.agent,
  propertyId: p.id,
  propertyTitle: p.title,
  propertyLocation: p.location,
}));

export const allLocations: string[] = [
  ...new Set(propertiesData.properties.map((p) => p.location)),
];

export const allPropertyTypes: string[] = [
  ...new Set(propertiesData.properties.map((p) => p.type)),
];

export const allAmenities: string[] = [
  ...new Set(propertiesData.properties.flatMap((p) => p.amenities)),
].sort();

export const portfolioStats = {
  totalProperties: propertiesData.properties.length,
  featuredCount: propertiesData.properties.filter((p) => p.featured).length,
  locationsCount: allLocations.length,
  agentsCount: allAgents.length,
  minPrice: Math.min(...propertiesData.properties.map((p) => p.price)),
  maxPrice: Math.max(...propertiesData.properties.map((p) => p.price)),
};
