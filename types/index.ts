export interface Agent {
  name: string;
  phone: string;
  email: string;
  image: string;
}

export type ListingPurpose = 'buy' | 'rent' | 'projects';

export interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  gallery: string[];
  description: string;
  amenities: string[];
  agent: Agent;
  featured: boolean;
  purpose?: ListingPurpose;
  demo?: boolean;
}

export interface FilterOptions {
  location: string;
  minPrice: number;
  maxPrice: number;
  type: string;
  bedrooms?: number;
  bathrooms?: number;
}

export type SortOption = 'price-asc' | 'price-desc' | 'newest' | 'area-desc' | 'bedrooms-desc';
