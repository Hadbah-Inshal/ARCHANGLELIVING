
import { Product, Service, NavItem } from './types';
import dragonSpiritGiImg from './images/dragon spirit gi.jfif';
import masteryTrainingBagImg from './images/Mastery Training Bag.jfif';
import dojoCoreTeeImg from './images/Dojo Core Tee.jfif';
import proFocusMittsImg from './images/Pro Focus Mitts.jfif';
import bushidoRecoveryRollerImg from './images/Bushido Recovery Roller.jfif';
import legacyZenHoodieImg from './images/Legacy Zen Hoodie.jfif';

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
    id: 'p1',
    name: 'Dragon Spirit Gi',
    price: 120,
    category: 'gear',
    image: dragonSpiritGiImg,
    description: 'Ultra-durable, competition-grade cotton Gi with embroidered patches.'
  },
  {
    id: 'p2',
    name: 'Onyx Boxing Gloves',
    price: 85,
    category: 'gear',
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&q=80&w=600',
    description: 'Multi-layer padding for maximum impact protection.'
  },
  {
    id: 'p3',
    name: 'Mastery Training Bag',
    price: 250,
    category: 'equipment',
    image: masteryTrainingBagImg,
    description: 'Heavy-duty 100lb punching bag for power training.'
  },
  {
    id: 'p4',
    name: 'Dojo Core Tee',
    price: 35,
    category: 'apparel',
    image: dojoCoreTeeImg,
    description: 'Moisture-wicking fabric for intense training sessions.'
  },
  {
    id: 'p5',
    name: 'Pro Focus Mitts',
    price: 65,
    category: 'equipment',
    image: proFocusMittsImg,
    description: 'Curved design for precise striking drills and coach protection.'
  },
  {
    id: 'p6',
    name: 'Bushido Recovery Roller',
    price: 45,
    category: 'equipment',
    image: bushidoRecoveryRollerImg,
    description: 'High-density foam for muscle recovery and flexibility.'
  },
  {
    id: 'p7',
    name: 'Legacy Zen Hoodie',
    price: 75,
    category: 'apparel',
    image: legacyZenHoodieImg,
    description: 'Premium heavyweight fleece for post-training comfort.'
  },
  {
    id: 'p8',
    name: 'Weighted Speed Rope',
    price: 25,
    category: 'equipment',
    image: 'https://images.unsplash.com/photo-1599058918144-1ffabb6ab9a0?auto=format&fit=crop&q=80&w=600',
    description: 'Fast-rotation bearings for intense cardio conditioning.'
  }
];
