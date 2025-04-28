import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PromoBanner from '../components/PromoBanner';
import { useCart } from '../contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { ShoppingBag, ChevronLeft } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import AddressForm from '@/components/checkout/AddressForm';
import PaymentForm from '@/components/checkout/PaymentForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import { CheckoutFormValues } from '@/components/checkout/types';
import { isProductAvailable, reduceInventory } from '@/services/inventoryService';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { 
  calculateEstimatedDeliveryTime, 
  formatDeliveryTimeRange, 
  getFormattedDeliveryTime 
} from '@/utils/delivery-utils';
import { useDistrict } from '@/contexts/DistrictContext';

const formSchema = z.object({
  firstName: z.string().min(2, { message: 'Vorname muess mindestens 2 Zeiche ha' }),
  lastName: z.string().min(2, { message: 'Nachname muess mindestens 2 Zeiche ha' }),
  email: z.string().email({ message: 'Bitte gib e gültigi E-Mail Adresse i' }),
  phone: z.string().min(10, { message: 'Telefonnummere muess mindestens 10 Ziffere ha' }),
  address: z.string().min(5, { message: 'Adresse muess mindestens 5 Zeiche ha' }),
  city: z.string().min(2, { message: 'Stadt muess mindestens 2 Zeiche ha' }),
  postalCode: z.string().min(4, { message: 'PLZ muess mindestens 4 Zeiche ha' }),
  paymentMethod: z.enum(['card', 'twint', 'cash'], { 
    required_error: 'Bitte wähl e Zahligs-Methode us' 
  }),
  saveAddress: z.boolean(),
});

const Checkout = () => {
  const [step, setStep] = useState<'details' | 'payment'>('details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const { cartItems, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, hasAppliedDiscount, signUp } = useAuth();
  const { selectedDistrict, openDistrictModal } = useDistrict();
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: user?.email || '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      paymentMethod: 'card',
      saveAddress: false,
    },
  });

  // Load user's saved addresses
  useEffect(() => {
    if (user) {
      fetchUserAddresses();
    }
  }, [user]);

  // Fetch user's saved addresses from Supabase
  const fetchUserAddresses = async () => {
    if (!user) return;
    
    setLoadingAddresses(true);
    try {
      const { data, error } = await supabase
        .from('user_addresses')
        .select('*')
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      setSavedAddresses(data || []);
    } catch (error) {
      console.error('Error fetching addresses:', error);
      toast({
        title: 'Fehler',
        description: 'Fehler beim Laden der gespeicherten Adressen.',
        variant: 'destructive',
      });
    } finally {
      setLoadingAddresses(false);
    }
  };

  // Handle selecting a saved address
  const handleSelectAddress = (addressId: string) => {
    setSelectedAddressId(addressId);
    
    const selectedAddress = savedAddresses.find(addr => addr.id === addressId);
    if (selectedAddress) {
      // Get the user's profile to fill in name and email
      (async () => {
        try {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user?.id)
            .single();
            
          if (error) throw error;
          
          const fullName = profile?.full_name || '';
          const nameParts = fullName.split(' ');
          const firstName = nameParts[0] || '';
          const lastName = nameParts.slice(1).join(' ') || '';
          
          form.reset({
            firstName,
            lastName,
            email: user?.email || '',
            phone: selectedAddress.phone || '',
            address: selectedAddress.street,
            city: selectedAddress.city,
            postalCode: selectedAddress.postal_code,
            paymentMethod: form.getValues('paymentMethod'),
            saveAddress: false,
          });
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      })();
    }
  };

  const handleDetailsSubmit = () => {
    // Check if district is selected before proceeding
    if (!selectedDistrict) {
      toast({
        title: "Bezirkswahl erforderlich",
        description: "Bitte wähle einen Bezirk aus, bevor du fortfährst.",
        variant: "destructive",
      });
      openDistrictModal();
      return;
    }
    
    setStep('payment');
  };
  
  // Function to create a user account if the user is not logged in
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
  
  const handleSubmit = async (data: CheckoutFormValues) => {
    // Check if district is selected
    if (!selectedDistrict) {
      toast({
        title: "Bezirkswahl erforderlich",
        description: "Bitte wähle einen Bezirk aus, bevor du die Bestellung aufgibst.",
        variant: "destructive",
      });
      openDistrictModal();
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Check inventory first
      for (const item of cartItems) {
        const isAvailable = await isProductAvailable(item.id, item.quantity);
        
        if (!isAvailable) {
          toast({
            title: "Lagerbestand nicht ausreichend",
            description: `Leider ist ${item.name} im gewünschten Umfang nicht verfügbar.`,
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
      }

      // Create user account if not logged in
      const userId = await createUserAccount(data) || "guest";
      
      // Save address if requested and user is logged in
      if (user && data.saveAddress) {
        try {
          await supabase
            .from('user_addresses')
            .insert({
              user_id: user.id,
              name: `${data.firstName} ${data.lastName}`,
              street: data.address,
              postal_code: data.postalCode,
              city: data.city,
              phone: data.phone,
              is_default: false,
            });
          
          toast({
            title: "Adresse gespeichert",
            description: "Dini Adresse isch erfolgriich gspeichert worde.",
            duration: 3000,
          });
          
          // Refresh the addresses list
          fetchUserAddresses();
        } catch (error) {
          console.error('Error saving address:', error);
          // Continue with checkout even if saving address fails
        }
      }
      
      const deliveryFee = totalPrice >= 50 ? 0 : 5.90;
      const discountAmount = hasAppliedDiscount ? totalPrice * 0.10 : 0;
      const finalTotal = totalPrice + deliveryFee - discountAmount;

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
          district: selectedDistrict,
          status: 'pending',
          estimated_delivery_time: calculateEstimatedDeliveryTime(data.postalCode),
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Process each item and reduce inventory
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

  const deliveryFee = totalPrice >= 50 ? 0 : 5.90;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <PromoBanner />
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Din Warächorb isch leer</h1>
            <p className="text-gray-600 mb-8">Du muesch zerscht Produkt in Warächorb legge bevor du chasch zur Kasse gah.</p>
            <Link to="/products">
              <Button size="lg" className="bg-brings-primary hover:bg-brings-primary/90">
                Zu de Produkt
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <PromoBanner />
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link to="/products" className="flex items-center text-brings-primary hover:underline mr-4">
            <ChevronLeft size={16} className="mr-1" />
            Wiiter shopppe
          </Link>
          <h1 className="text-2xl font-bold">Zur Kasse</h1>
        </div>
        
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 
                ${step === 'details' ? 'bg-brings-primary text-white' : 'bg-brings-primary text-white'}`}>
                1
              </div>
              <span className="text-xs font-medium">Adresse</span>
            </div>
            <div className={`w-16 h-1 ${step === 'payment' ? 'bg-brings-primary' : 'bg-gray-300'}`}></div>
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 
                ${step === 'payment' ? 'bg-brings-primary text-white' : 'bg-gray-300 text-gray-600'}`}>
                2
              </div>
              <span className="text-xs font-medium">Zahlig</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              {user && savedAddresses.length > 0 && step === 'details' && (
                <div className="mb-6">
                  <Label htmlFor="saved-address">Gespeicherte Adressen</Label>
                  <Select
                    value={selectedAddressId}
                    onValueChange={handleSelectAddress}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wähle eine gespeicherte Adresse" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Neue Adresse eingeben</SelectItem>
                      {savedAddresses.map(address => (
                        <SelectItem key={address.id} value={address.id}>
                          {address.name} - {address.street}, {address.postal_code} {address.city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <Form {...form}>
                {step === 'details' ? (
                  <AddressForm 
                    form={form} 
                    onNext={handleDetailsSubmit} 
                    showSaveAddress={!!user} 
                  />
                ) : (
                  <PaymentForm 
                    form={form} 
                    onSubmit={handleSubmit}
                    onBack={() => setStep('details')}
                    isSubmitting={isSubmitting || isCreatingAccount}
                  />
                )}
              </Form>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <OrderSummary 
              cartItems={cartItems}
              totalPrice={totalPrice}
              deliveryFee={deliveryFee}
              postalCode={form.watch('postalCode')}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
