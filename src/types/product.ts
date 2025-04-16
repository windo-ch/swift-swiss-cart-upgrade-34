
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
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
