import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { reduceInventory, isProductAvailable } from '@/services/inventoryService';

interface CheckoutFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: 'card' | 'twint' | 'cash';
  saveAddress?: boolean;
}

export const useCheckout = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const { cartItems, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, hasAppliedDiscount, signUp } = useAuth();

  // Check inventory availability for all items in cart
  const checkInventoryAvailability = async (): Promise<boolean> => {
    try {
      for (const item of cartItems) {
        const isAvailable = await isProductAvailable(item.id, item.quantity);
        
        if (!isAvailable) {
          toast({
            title: "Lagerbestand nicht ausreichend",
            description: `Leider ist ${item.name} im gewünschten Umfang nicht verfügbar.`,
            variant: "destructive",
          });
          return false;
        }
      }
      
      return true;
    } catch (error) {
      console.error("Error checking inventory:", error);
      toast({
        title: "Fehler",
        description: "Fehler beim Überprüfen des Lagerbestands.",
        variant: "destructive",
      });
      return false;
    }
  };

  // Function to create a user account if needed
  const createUserAccount = async (data: CheckoutFormValues) => {
    if (user) return user.id; // User is already logged in
    
    try {
      setIsCreatingAccount(true);
      // Generate a random password (this will be reset later)
      const password = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
      
      // Sign up the user
      await signUp(data.email, password);
      
      // Get the newly created user
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) throw new Error("Failed to create user account");
      
      // Add user profile information
      await supabase
        .from('profiles')
        .upsert({
          id: userData.user.id,
          full_name: `${data.firstName} ${data.lastName}`,
        });
      
      // Add user address
      await supabase
        .from('user_addresses')
        .insert({
          user_id: userData.user.id,
          name: `${data.firstName} ${data.lastName}`,
          street: data.address,
          city: data.city,
          postal_code: data.postalCode,
          is_default: true,
        });
      
      toast({
        title: "Konto erstellt",
        description: "Es isch automatisch es Konto für dich erstellt worde. Check din E-Mail zum es Passwort setze.",
        duration: 5000,
      });
      
      return userData.user.id;
    } catch (error) {
      console.error("Error creating user account:", error);
      toast({
        title: "Fehler",
        description: "Es isch en Fehler passiert bim Erstelle vom Konto. Din Bestellig isch aber erfolgrich gspeicheret worde.",
        variant: "destructive",
        duration: 5000,
      });
      return null;
    } finally {
      setIsCreatingAccount(false);
    }
  };
  
  // Function to handle checkout submission
  const handleCheckout = async (data: CheckoutFormValues) => {
    setIsSubmitting(true);

    try {
      // Check inventory first
      const inventoryAvailable = await checkInventoryAvailability();
      if (!inventoryAvailable) {
        setIsSubmitting(false);
        return;
      }

      // Create user account if not logged in
      const userId = await createUserAccount(data) || "guest";
      
      const deliveryFee = totalPrice >= 50 ? 0 : 5.90;
      const discountAmount = hasAppliedDiscount ? totalPrice * 0.10 : 0;
      const finalTotal = totalPrice + deliveryFee - discountAmount;

      // Create the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: userId,
          total_amount: finalTotal,
          delivery_fee: deliveryFee,
          discount_amount: discountAmount,
          payment_method: data.paymentMethod,
          delivery_address: {
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            city: data.city,
            postalCode: data.postalCode,
            email: data.email,
            phone: data.phone,
          },
          status: 'pending',
          estimated_delivery_time: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items and reduce inventory
      for (const item of cartItems) {
        // Add to order_items
        const { error: itemError } = await supabase
          .from('order_items')
          .insert({
            order_id: order.id,
            product_id: item.id,
            product_name: item.name,
            quantity: item.quantity,
            price: item.price,
          });

        if (itemError) throw itemError;
        
        // Reduce inventory
        await reduceInventory(item.id, item.quantity);
      }

      // Clear the cart and navigate to confirmation
      clearCart();
      navigate('/order-confirmation', { 
        state: { 
          orderId: order.id,
          estimatedDeliveryTime: order.estimated_delivery_time
        }
      });
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Fehler",
        description: "Es isch öppis schiefgloffe. Bitte versuech's spöter nomal.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleCheckout,
    isSubmitting,
    isCreatingAccount
  };
}; 