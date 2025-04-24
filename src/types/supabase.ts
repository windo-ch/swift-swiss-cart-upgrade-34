export type ProductInsert = {
  id?: string;
  product_id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category: string;
  subcategory?: string;
  is_age_restricted?: boolean;
  is_featured?: boolean;
  inventory_count?: number;
}

export type ProductUpdate = Partial<ProductInsert>;

export type Product = {
  id: string;
  product_id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  category: string;
  subcategory: string | null;
  is_age_restricted: boolean;
  is_featured: boolean;
  inventory_count: number | null;
  created_at: string | null;
  updated_at: string | null;
}

export type ProductWithInventory = Product;
