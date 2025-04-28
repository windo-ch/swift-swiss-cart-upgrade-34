import { useEffect, useRef } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/components/ui/use-toast';

/**
 * This component provides automatic synchronization between Supabase products and localStorage.
 * It's used for backward compatibility with older code that might still rely on localStorage.
 * This component doesn't render anything visible - it just handles the synchronization.
 */
const ProductSyncHandler = () => {
  const { products } = useAdmin();
  const { toast } = useToast();
  const hasShownNotification = useRef(false);

  // Sync products from Supabase to localStorage whenever products change
  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      console.log("🔄 ProductSyncHandler - Syncing Supabase products to localStorage:", products.length);
      try {
        localStorage.setItem('adminProducts', JSON.stringify(products));
        window.dispatchEvent(new Event('storage')); // Notify other components
        console.log("✅ ProductSyncHandler - Successfully synced products to localStorage");
        
        // Show notification only once per session
        if (!hasShownNotification.current) {
          toast({
            title: "Products synchronized",
            description: `${products.length} products synced from Supabase`,
            duration: 3000,
          });
          hasShownNotification.current = true;
        }
      } catch (error) {
        console.error("❌ ProductSyncHandler - Error syncing products to localStorage:", error);
        
        // Always show error toasts
        toast({
          title: "Synchronization error",
          description: "Failed to sync products to localStorage",
          variant: "destructive",
          duration: 3000,
        });
      }
    } else if (products && products.length === 0) {
      console.log("⚠️ ProductSyncHandler - No products to sync");
    }
  }, [products, toast]);

  // This component doesn't render anything visible
  return null;
};

export default ProductSyncHandler; 