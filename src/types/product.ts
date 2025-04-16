
export interface Product {
  id: number | string;
  name: string;
  image: string;
  price: number;
  category: string;
  ageRestricted: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  ingredients?: string;
  weight?: string;
  description?: string;
  stock?: number; // Added stock field for inventory tracking
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
