
import { UserRole, Product, Doctor } from './types';

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Sarah Smith',
    specialty: 'Dermatologist',
    availability: ['09:00', '10:00', '14:00', '16:00'],
    bio: 'Specialist in acne and inflammatory skin diseases with 10 years experience.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 'd2',
    name: 'Dr. James Wilson',
    specialty: 'Cosmetic Surgeon',
    availability: ['11:00', '13:00', '15:00'],
    bio: 'Expert in anti-aging treatments and skin rejuvenation.',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 'd3',
    name: 'Dr. Elena Rossi',
    specialty: 'Pediatric Derm',
    availability: ['08:00', '12:00', '17:00'],
    bio: 'Specialized in sensitive skin conditions for children and infants.',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200&h=200'
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Lume Hydrating Serum',
    price: 45,
    category: 'Serums',
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=300&h=300',
    description: 'Deep hydration for glowing skin.',
    rating: 4.8,
    reviews: [{ id: 'r1', userName: 'Alice', rating: 5, comment: 'Changed my life!', date: '2023-10-01' }]
  },
  {
    id: 'p2',
    name: 'Pink Clay Mask',
    price: 32,
    category: 'Masks',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=300&h=300',
    description: 'Purifies pores and brightens complexion.',
    rating: 4.5,
    reviews: []
  },
  {
    id: 'p3',
    name: 'Gentle Cleanser',
    price: 24,
    category: 'Cleansers',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=300&h=300',
    description: 'PH balanced for sensitive skin.',
    rating: 4.9,
    reviews: []
  },
  {
    id: 'p4',
    name: 'SPF 50+ Glow',
    price: 38,
    category: 'Sunscreen',
    image: 'https://images.unsplash.com/photo-1556228578-8c519fbc4c73?auto=format&fit=crop&q=80&w=300&h=300',
    description: 'Invisible protection with a dewy finish.',
    rating: 4.7,
    reviews: []
  },
  {
    id: 'p5',
    name: 'Retinol Night Cream',
    price: 58,
    category: 'Night Care',
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=300&h=300',
    description: 'Advanced anti-aging overnight treatment.',
    rating: 4.6,
    reviews: []
  }
];
