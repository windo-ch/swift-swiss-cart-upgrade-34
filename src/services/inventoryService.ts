import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/supabase";

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
    // Get data from Supabase
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
    // No fallback to localStorage - just return empty array if Supabase fails
    return [];
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
    // No fallback to localStorage - just return false if Supabase fails
    return false;
  }
};
