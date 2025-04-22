
import { Product } from './product';

export interface AdminContextType {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, newStock: number) => void;
  refreshProducts: () => void;
  seedProducts: () => void;
  isLoading: boolean;
  isInitialized: boolean;
}
