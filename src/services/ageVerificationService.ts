import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/supabase";

// Constants
const MIN_AGE = 18; // Minimum age for restricted products
const AGE_VERIFICATION_TABLE = "age_verifications";

/**
 * Interface for age verification records
 */
interface AgeVerification {
  id: string;
  user_id: string;
  verified_at: string;
  verification_method: "id" | "passport" | "drivers_license" | "self_declaration";
  is_valid: boolean;
  expires_at: string;
}

/**
 * Check if a product requires age verification
 */
export const requiresAgeVerification = (product: Product): boolean => {
  return product.is_age_restricted;
};

/**
 * Check if a user has a valid age verification
 */
export const hasValidAgeVerification = async (userId: string): Promise<boolean> => {
  try {
    if (!userId || userId === "guest") return false;
    
    const { data, error } = await supabase
      .from(AGE_VERIFICATION_TABLE)
      .select('*')
      .eq('user_id', userId)
      .eq('is_valid', true)
      .gte('expires_at', new Date().toISOString())
      .single();
    
    if (error) {
      // If error is "not found", it means no verification exists
      if (error.code === 'PGRST116') {
        return false;
      }
      console.error("Error checking age verification:", error);
      throw error;
    }
    
    return !!data;
  } catch (error) {
    console.error("Error in hasValidAgeVerification:", error);
    return false;
  }
};

/**
 * Create a new age verification record
 */
export const createAgeVerification = async (
  userId: string,
  method: "id" | "passport" | "drivers_license" | "self_declaration"
): Promise<boolean> => {
  try {
    if (!userId || userId === "guest") return false;
    
    // Calculate expiration date (1 year from now)
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    
    const { error } = await supabase
      .from(AGE_VERIFICATION_TABLE)
      .insert({
        user_id: userId,
        verified_at: new Date().toISOString(),
        verification_method: method,
        is_valid: true,
        expires_at: expiresAt.toISOString()
      });
    
    if (error) {
      console.error("Error creating age verification:", error);
      throw error;
    }
    
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
      .select('is_age_restricted')
      .in('product_id', productIds)
      .eq('is_age_restricted', true);
    
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
 * Invalidate an age verification (e.g., if it was found to be fraudulent)
 */
export const invalidateAgeVerification = async (userId: string): Promise<boolean> => {
  try {
    if (!userId || userId === "guest") return false;
    
    const { error } = await supabase
      .from(AGE_VERIFICATION_TABLE)
      .update({ is_valid: false })
      .eq('user_id', userId);
    
    if (error) {
      console.error("Error invalidating age verification:", error);
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Error in invalidateAgeVerification:", error);
    return false;
  }
}; 