export type ProductInsert = {
  product_id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  subcategory?: string;
  is_age_restricted: boolean;
  is_featured?: boolean;
  inventory_count?: number;
}

export type ProductUpdate = Partial<ProductInsert> & {
  id?: string;
}

export type Product = ProductInsert & {
  id: string;
  created_at: string;
  updated_at: string;
}

export type ProductWithInventory = Product & {
  inventory_count: number;
} 