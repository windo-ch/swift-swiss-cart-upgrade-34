import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/supabase";
import { Product as AdminProduct } from "@/types/product";
import { getStoredProducts } from "@/utils/product-utils";

const PRODUCTS_TABLE = "products";

/**
 * Get current inventory level for a product
 */
export const getProductInventory = async (productId: string): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from(PRODUCTS_TABLE)
      .select('stock')
      .eq('id', productId)
      .single();
    
    if (error) {
      console.error("Error fetching inventory:", error);
      throw error;
    }
    
    return data?.stock || 0;
  } catch (error) {
    console.error("Error in getProductInventory:", error);
    throw error;
  }
};

/**
 * Update inventory level for a product
 */
export const updateProductInventory = async (productId: string, newCount: number): Promise<void> => {
  try {
    const { error } = await supabase
      .from(PRODUCTS_TABLE)
      .update({ stock: newCount })
      .eq('id', productId);
    
    if (error) {
      console.error("Error updating inventory:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error in updateProductInventory:", error);
    throw error;
  }
};

/**
 * Reduce inventory by quantity (used when placing an order)
 */
export const reduceInventory = async (productId: string, quantity: number): Promise<boolean> => {
  try {
    // Get current inventory
    const currentInventory = await getProductInventory(productId);
    
    // Check if we have enough stock
    if (currentInventory < quantity) {
      console.warn(`Not enough inventory for product ${productId}. Requested: ${quantity}, Available: ${currentInventory}`);
      return false;
    }
    
    // Update inventory with new count
    await updateProductInventory(productId, currentInventory - quantity);
    return true;
  } catch (error) {
    console.error("Error in reduceInventory:", error);
    throw error;
  }
};

/**
 * Increase inventory by quantity (used when restocking)
 */
export const addInventory = async (productId: string, quantity: number): Promise<void> => {
  try {
    // Get current inventory
    const currentInventory = await getProductInventory(productId);
    
    // Update inventory with new count
    await updateProductInventory(productId, currentInventory + quantity);
  } catch (error) {
    console.error("Error in addInventory:", error);
    throw error;
  }
};

/**
 * Get products with low inventory
 */
export const getLowInventoryProducts = async (threshold: number = 10): Promise<Product[]> => {
  try {
    // Try to get data from Supabase first
    const { data, error } = await supabase
      .from(PRODUCTS_TABLE)
      .select('*')
      .lt('stock', threshold)
      .order('stock', { ascending: true });
    
    if (error) {
      console.error("Error fetching low inventory products:", error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error("Error in getLowInventoryProducts:", error);
    
    // Fallback to localStorage if Supabase query fails
    console.log("Falling back to localStorage for inventory data");
    try {
      const localProducts = getStoredProducts();
      const lowStockProducts = localProducts
        .filter(product => (product.stock || 0) < threshold)
        .sort((a, b) => (a.stock || 0) - (b.stock || 0));
      
      console.log(`Found ${lowStockProducts.length} low stock products in localStorage`);
      
      // Convert admin product format to supabase Product format
      return lowStockProducts.map(p => {
        // Create a Product object that matches the expected type
        const product: Product = {
          id: String(p.id),
          product_id: String(p.id),
          name: p.name,
          description: p.description || null,
          price: p.price,
          image: p.image || null,
          category: p.category,
          subcategory: null,
          is_age_restricted: Boolean(p.ageRestricted),
          is_featured: Boolean(p.isFeatured),
          inventory_count: p.stock || 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        return product;
      });
    } catch (localError) {
      console.error("Error getting low inventory from localStorage:", localError);
      return [];
    }
  }
};

/**
 * Check if a product has available inventory
 */
export const isProductAvailable = async (productId: string, requestedQuantity: number = 1): Promise<boolean> => {
  try {
    const inventory = await getProductInventory(productId);
    return inventory >= requestedQuantity;
  } catch (error) {
    console.error("Error in isProductAvailable:", error);
    
    // Fallback to localStorage
    try {
      const localProducts = getStoredProducts();
      const product = localProducts.find(p => String(p.id) === String(productId));
      if (product) {
        return (product.stock || 0) >= requestedQuantity;
      }
    } catch (localError) {
      console.error("Error checking availability in localStorage:", localError);
    }
    
    return false;
  }
};
