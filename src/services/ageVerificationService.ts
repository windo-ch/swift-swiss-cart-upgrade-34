
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/supabase";

// Constants
const MIN_AGE = 18; // Minimum age for restricted products

/**
 * Check if a product requires age verification
 */
export const requiresAgeVerification = (product: Product): boolean => {
  return product.agerestricted || false;
};

/**
 * Check if a user has a valid age verification
 * Currently returns a mock implementation since the age_verifications table doesn't exist yet
 */
export const hasValidAgeVerification = async (userId: string): Promise<boolean> => {
  try {
    if (!userId || userId === "guest") return false;
    
    // Since we don't have the age_verifications table yet, we're returning a mock implementation
    // In a real implementation, we would query the age_verifications table
    console.log("Mock age verification check for user:", userId);
    return false;
  } catch (error) {
    console.error("Error in hasValidAgeVerification:", error);
    return false;
  }
};

/**
 * Create a new age verification record
 * Currently returns a mock implementation since the age_verifications table doesn't exist yet
 */
export const createAgeVerification = async (
  userId: string,
  method: "id" | "passport" | "drivers_license" | "self_declaration"
): Promise<boolean> => {
  try {
    if (!userId || userId === "guest") return false;
    
    // Mock implementation
    console.log(`Mock age verification created for user ${userId} using method ${method}`);
    return true;
  } catch (error) {
    console.error("Error in createAgeVerification:", error);
    return false;
  }
};

/**
 * Check if a cart contains age-restricted products
 */
export const cartContainsAgeRestrictedProducts = async (productIds: string[]): Promise<boolean> => {
  try {
    if (productIds.length === 0) return false;
    
    const { data, error } = await supabase
      .from("products")
      .select('agerestricted')
      .in('id', productIds)
      .eq('agerestricted', true);
    
    if (error) {
      console.error("Error checking age-restricted products:", error);
      throw error;
    }
    
    return (data || []).length > 0;
  } catch (error) {
    console.error("Error in cartContainsAgeRestrictedProducts:", error);
    return false;
  }
};

/**
 * Invalidate an age verification
 * Currently returns a mock implementation since the age_verifications table doesn't exist yet
 */
export const invalidateAgeVerification = async (userId: string): Promise<boolean> => {
  try {
    if (!userId || userId === "guest") return false;
    
    // Mock implementation
    console.log(`Mock age verification invalidated for user ${userId}`);
    return true;
  } catch (error) {
    console.error("Error in invalidateAgeVerification:", error);
    return false;
  }
}; 
