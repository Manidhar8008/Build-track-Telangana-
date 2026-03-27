import { ConstructionProject, ServiceProvider, ConstructionTrend } from './types';

export const MOCK_PROJECTS: ConstructionProject[] = [
  {
    id: 'TS-WGL-2026-001',
    title: 'Hanamkonda Residential Complex',
    location: 'Hanamkonda, Warangal',
    district: 'Warangal',
    type: 'Residential',
    status: 'In Progress',
    permitDate: '2025-10-15',
    estimatedCompletion: '2026-12-20',
    contractor: 'Telangana Builders Ltd.',
    sqft: 12500,
    coordinates: [18.0142, 79.5684],
  },
  {
    id: 'TS-HYD-2026-042',
    title: 'Warangal IT Park Phase II',
    location: 'Madikonda, Warangal',
    district: 'Warangal',
    type: 'Commercial',
    status: 'Permit Issued',
    permitDate: '2026-01-10',
    estimatedCompletion: '2028-06-15',
    contractor: 'Global Infra Solutions',
    sqft: 45000,
    coordinates: [17.9867, 79.4823],
  },
  {
    id: 'TS-HYD-2026-105',
    title: 'Gachibowli Luxury Apartments',
    location: 'Gachibowli, Hyderabad',
    district: 'Hyderabad',
    type: 'Residential',
    status: 'Finishing',
    permitDate: '2024-05-20',
    estimatedCompletion: '2026-05-30',
    contractor: 'Elite Homes',
    sqft: 85000,
    coordinates: [17.4401, 78.3489],
  },
  {
    id: 'TS-KMM-2026-012',
    title: 'Khammam Industrial Hub',
    location: 'Khammam Rural',
    district: 'Khammam',
    type: 'Industrial',
    status: 'In Progress',
    permitDate: '2025-08-12',
    estimatedCompletion: '2027-03-10',
    contractor: 'Khammam Steel Works',
    sqft: 120000,
    coordinates: [17.2473, 80.1514],
  },
  {
    id: 'TS-NZM-2026-008',
    title: 'Nizamabad Shopping Mall',
    location: 'Nizamabad City',
    district: 'Nizamabad',
    type: 'Commercial',
    status: 'In Progress',
    permitDate: '2025-11-05',
    estimatedCompletion: '2026-11-15',
    contractor: 'Urban Retailers',
    sqft: 25000,
    coordinates: [18.6725, 78.0941],
  },
];

export const MOCK_SERVICES: ServiceProvider[] = [
  {
    id: 's1',
    name: 'Vishwa Architects',
    category: 'Architect',
    rating: 4.8,
    reviews: 124,
    location: 'Warangal',
    specialization: ['Sustainable Design', 'Modern Residential'],
    image: 'https://picsum.photos/seed/arch1/400/300',
  },
  {
    id: 's2',
    name: 'Telangana Cement & Steel',
    category: 'Material Supplier',
    rating: 4.5,
    reviews: 89,
    location: 'Hyderabad',
    specialization: ['Bulk Cement', 'TMT Bars'],
    image: 'https://picsum.photos/seed/material1/400/300',
  },
  {
    id: 's3',
    name: 'Reddy Interior Designers',
    category: 'Interior Designer',
    rating: 4.9,
    reviews: 56,
    location: 'Warangal',
    specialization: ['Modular Kitchens', 'Luxury Living'],
    image: 'https://picsum.photos/seed/interior1/400/300',
  },
  {
    id: 's4',
    name: 'Swift Electricians',
    category: 'Electrician',
    rating: 4.7,
    reviews: 210,
    location: 'Nizamabad',
    specialization: ['Industrial Wiring', 'Smart Home Setup'],
    image: 'https://picsum.photos/seed/elec1/400/300',
  },
];

export const MOCK_TRENDS: ConstructionTrend[] = [
  { month: 'Oct 25', residential: 45, commercial: 12, industrial: 5 },
  { month: 'Nov 25', residential: 52, commercial: 15, industrial: 8 },
  { month: 'Dec 25', residential: 48, commercial: 18, industrial: 12 },
  { month: 'Jan 26', residential: 60, commercial: 22, industrial: 15 },
  { month: 'Feb 26', residential: 65, commercial: 25, industrial: 20 },
  { month: 'Mar 26', residential: 72, commercial: 30, industrial: 25 },
];

export const MATERIAL_PRICES = [
  { item: 'Cement (per bag)', price: '₹380', change: '+2%' },
  { item: 'Steel (per ton)', price: '₹65,000', change: '-1.5%' },
  { item: 'Sand (per unit)', price: '₹4,500', change: '+5%' },
  { item: 'Bricks (per 1000)', price: '₹8,000', change: '0%' },
];

export const PRICING_PLANS = [
  {
    name: 'Basic',
    price: 'Free',
    period: 'Forever',
    features: ['View Construction Map', 'Basic Project Search', 'Marketplace Access', 'Public Analytics'],
    cta: 'Get Started',
    highlight: false
  },
  {
    name: 'Pro',
    price: '₹1,008',
    period: 'per month',
    features: ['AI Cost Estimator (Beta)', 'RERA Verification Check', 'Detailed Project Analytics', 'Priority Support', 'WhatsApp Alerts (Coming Soon)'],
    cta: 'Start Pro Trial',
    highlight: true
  },
  {
    name: 'Enterprise',
    price: '₹18,000',
    period: 'per year',
    features: ['Investor Heatmap', 'Full API Access', 'Multi-project Tracking', 'AI Document Scanner', 'Dedicated Account Manager'],
    cta: 'Contact Sales',
    highlight: false
  }
];
