
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/product';

// Fetch products from Supabase
export const getStoredProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*');
    
    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    // Map database fields to our Product type
    return data.map(product => ({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      description: product.description || '',
      image: product.image || '',
      category: product.category,
      ageRestricted: product.agerestricted || false, // Map from DB 'agerestricted' to our 'ageRestricted'
      ingredients: product.ingredients || '',
      weight: product.weight || '',
      stock: product.stock || 0,
    }));
  } catch (error) {
    console.error('Error in getStoredProducts:', error);
    return [];
  }
};

// Get image URL from path or return as is if already a URL
export const getProductImageUrl = (imagePath: string): string => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  
  // Get public URL from Supabase storage
  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(imagePath);
  
  return data.publicUrl;
};
