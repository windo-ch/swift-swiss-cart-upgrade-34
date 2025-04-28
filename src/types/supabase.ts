export type ProductInsert = {
  id?: string;
  product_id?: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category: string;
  subcategory?: string;
  agerestricted?: boolean;
  stock?: number;
  ingredients?: string | null;
  weight?: string | null;
}

export type ProductUpdate = Partial<ProductInsert>;

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  category: string;
  subcategory?: string | null;
  agerestricted: boolean;
  stock: number | null;
  ingredients?: string | null;
  weight?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export type ProductWithInventory = Product;
