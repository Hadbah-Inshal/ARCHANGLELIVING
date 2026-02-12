
export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'gear' | 'apparel' | 'equipment';
  image: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  price: number;
  period: 'month' | 'session';
  features: string[];
  level: 'Beginner' | 'Intermediate' | 'Master';
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
