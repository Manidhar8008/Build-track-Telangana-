export type ProjectStatus = 'Permit Issued' | 'In Progress' | 'Finishing' | 'Completed';

export interface ConstructionProject {
  id: string;
  title: string;
  location: string;
  district: string;
  type: 'Residential' | 'Commercial' | 'Industrial' | 'Public';
  status: ProjectStatus;
  permitDate: string;
  estimatedCompletion: string;
  contractor?: string;
  sqft: number;
  coordinates: [number, number]; // [lat, lng]
}

export interface ServiceProvider {
  id: string;
  name: string;
  category: 'Architect' | 'Contractor' | 'Material Supplier' | 'Electrician' | 'Plumber' | 'Interior Designer';
  rating: number;
  reviews: number;
  location: string;
  specialization: string[];
  image: string;
}

export interface ConstructionTrend {
  month: string;
  residential: number;
  commercial: number;
  industrial: number;
}
