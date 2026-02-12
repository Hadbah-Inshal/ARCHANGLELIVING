
import { Product, Service, NavItem } from './types';

import adidasBlueBoxingHelmetImg from './images/Adidas blue boxing helmet.jpeg';
import blackAndWhiteVenumBoxingGlovesImg from './images/black and white venum boxing gloves.jpeg';
import blackBoxingGlovesImg from './images/black boxing gloves.jpeg';
import blueAdidasBoxingGlovesImg from './images/blue adidas boxing gloves.jpeg';
import danubeWhiteBoxingGlovesImg from './images/danube white boxing gloves.jpeg';
import logoImg from './images/logo.jpeg';
import neonAndBlackVenumBoxingGlovesImg from './images/neon and black venum boxing gloves.jpeg';
import pinkAdidasBoxingGlovesImg from './images/pink adidas boxing gloves.jpeg';
import pinkAndWhiteEverlastingBoxingGlovesImg from './images/pink and white everlasting boxing gloves.jpeg';
import pinkBoxingGlovesImg from './images/pink boxing gloves.jpeg';
import superBlackBoxingGlovesImg from './images/super black boxing gloves.jpeg';
import waxfloPinkBoxingHelmetImg from './images/waxflo pink boxing helmet.jpeg';
import whiteAndPinkVenomBoxingGlovesImg from './images/white and pink venom boxing gloves.jpeg';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Institute', href: '#institute' },
  { label: 'Master', href: '#master' },
  { label: 'Programs', href: '#programs' },
  { label: 'Shop', href: '#/shop' },
  { label: 'Contact', href: '#/contact' },
];

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'White Belt Foundation',
    price: 99,
    period: 'month',
    features: ['Basic Stances', 'Controlled Striking', '2 Classes Per Week', 'Free Uniform'],
    level: 'Beginner'
  },
  {
    id: '2',
    title: 'Bushido Masterclass',
    price: 149,
    period: 'month',
    features: ['Advanced Forms', 'Sparring Access', 'Unlimited Classes', 'Monthly Seminar'],
    level: 'Intermediate'
  },
  {
    id: '3',
    title: 'Private Dragon Session',
    price: 75,
    period: 'session',
    features: ['1-on-1 Personalized Coaching', 'Video Analysis', 'Custom Nutrition Plan', 'Focused Technique'],
    level: 'Master'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p2',
    name: 'Onyx Boxing Gloves',
    price: 85,
    category: 'gear',
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&q=80&w=600',
    description: 'Multi-layer padding for maximum impact protection.'
  },
  {
    id: 'p20',
    name: 'Adidas Blue Boxing Helmet',
    price: 240,
    category: 'gear',
    image: adidasBlueBoxingHelmetImg,
    description: 'Full-coverage Adidas headgear engineered for advanced sparring protection.'
  },
  {
    id: 'p21',
    name: 'Waxflo Pink Boxing Helmet',
    price: 250,
    category: 'gear',
    image: waxfloPinkBoxingHelmetImg,
    description: 'High-visibility pink helmet with reinforced padding for confident defense.'
  },
  {
    id: 'p22',
    name: 'Blue Adidas Boxing Gloves',
    price: 255,
    category: 'gear',
    image: blueAdidasBoxingGlovesImg,
    description: 'Professional-grade blue gloves tuned for power and speed work.'
  },
  {
    id: 'p23',
    name: 'Black Boxing Gloves',
    price: 260,
    category: 'gear',
    image: blackBoxingGlovesImg,
    description: 'Classic black gloves with multi-layer foam for everyday heavy training.'
  },
  {
    id: 'p24',
    name: 'Black & White Venum Boxing Gloves',
    price: 265,
    category: 'gear',
    image: blackAndWhiteVenumBoxingGlovesImg,
    description: 'Contrasting Venum design built for precision bag and mitt rounds.'
  },
  {
    id: 'p25',
    name: 'Neon & Black Venum Boxing Gloves',
    price: 270,
    category: 'gear',
    image: neonAndBlackVenumBoxingGlovesImg,
    description: 'Striking neon-and-black Venum gloves for fighters who stand out under the lights.'
  },
  {
    id: 'p26',
    name: 'Danube White Boxing Gloves',
    price: 245,
    category: 'gear',
    image: danubeWhiteBoxingGlovesImg,
    description: 'Clean white design with secure wrist support for technical sparring.'
  },
  {
    id: 'p27',
    name: 'Pink Adidas Boxing Gloves',
    price: 248,
    category: 'gear',
    image: pinkAdidasBoxingGlovesImg,
    description: 'Adidas pink gloves balancing style and serious knuckle protection.'
  },
  {
    id: 'p28',
    name: 'Pink Boxing Gloves',
    price: 252,
    category: 'gear',
    image: pinkBoxingGlovesImg,
    description: 'All-pink gloves with dense padding for beginners and seasoned punchers alike.'
  },
  {
    id: 'p29',
    name: 'Pink & White Everlast Boxing Gloves',
    price: 258,
    category: 'gear',
    image: pinkAndWhiteEverlastingBoxingGlovesImg,
    description: 'Pink-and-white Everlast gloves tuned for fitness boxing and cardio rounds.'
  },
  {
    id: 'p30',
    name: 'White & Pink Venum Boxing Gloves',
    price: 262,
    category: 'gear',
    image: whiteAndPinkVenomBoxingGlovesImg,
    description: 'White-and-pink Venum gloves with a snug fit for controlled power shots.'
  },
  {
    id: 'p31',
    name: 'Super Black Boxing Gloves',
    price: 275,
    category: 'gear',
    image: superBlackBoxingGlovesImg,
    description: 'Ultra-durable all-black gloves for the most intense training sessions.'
  },
  // ...existing code...
];
