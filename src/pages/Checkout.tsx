import React, { useState } from 'react';
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
});

const Checkout = () => {
  const [step, setStep] = useState<'details' | 'payment'>('details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { cartItems, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, hasAppliedDiscount } = useAuth();
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      paymentMethod: 'card',
    },
  });

  const handleDetailsSubmit = () => {
    setStep('payment');
  };
  
  const handleSubmit = async (data: CheckoutFormValues) => {
    if (!user) {
      toast({
        title: "Fehler",
        description: "Bitte melde dich a zum bestelle",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    setIsSubmitting(true);

    try {
      const deliveryFee = totalPrice >= 50 ? 0 : 5.90;
      const discountAmount = hasAppliedDiscount ? totalPrice * 0.10 : 0;
      const finalTotal = totalPrice + deliveryFee - discountAmount;

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
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

      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

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
              <Form {...form}>
                {step === 'details' ? (
                  <AddressForm form={form} onNext={handleDetailsSubmit} />
                ) : (
                  <PaymentForm 
                    form={form} 
                    onSubmit={handleSubmit}
                    onBack={() => setStep('details')}
                    isSubmitting={isSubmitting}
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
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
