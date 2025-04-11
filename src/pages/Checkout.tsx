
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PromoBanner from '../components/PromoBanner';
import { Button } from '@/components/ui/button';
import { useCart } from '../contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { ShoppingBag, CreditCard, Truck, ChevronLeft } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Link } from 'react-router-dom';

// Form schema using zod
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

type FormValues = z.infer<typeof formSchema>;

const Checkout = () => {
  const [step, setStep] = useState<'details' | 'payment'>('details');
  const { cartItems, totalPrice, totalItems, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Initialize form
  const form = useForm<FormValues>({
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
  
  // Handle form submission
  const onSubmit = (data: FormValues) => {
    if (step === 'details') {
      setStep('payment');
    } else {
      // Here we would normally process the payment
      // For now, just show a success message and redirect
      toast({
        title: "Bstellig erfolgrich",
        description: "Dini Bstellig isch bi üs igange und wird bald glieferet.",
        duration: 5000,
      });
      
      // Clear cart
      clearCart();
      
      // Redirect to homepage
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };
  
  // Calculate delivery fee
  const deliveryFee = totalPrice >= 50 ? 0 : 5.90;
  
  // Calculate total with delivery
  const orderTotal = totalPrice + deliveryFee;
  
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
        
        {/* Progress steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step === 'details' ? 'bg-brings-primary text-white' : 'bg-brings-primary text-white'}`}>
                1
              </div>
              <span className="text-xs font-medium">Adresse</span>
            </div>
            <div className={`w-16 h-1 ${step === 'payment' ? 'bg-brings-primary' : 'bg-gray-300'}`}></div>
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step === 'payment' ? 'bg-brings-primary text-white' : 'bg-gray-300 text-gray-600'}`}>
                2
              </div>
              <span className="text-xs font-medium">Zahlig</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              {step === 'details' ? (
                <>
                  <h2 className="text-xl font-semibold mb-4">Lieferadresse</h2>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Vorname</FormLabel>
                              <FormControl>
                                <Input placeholder="Din Vorname" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nachname</FormLabel>
                              <FormControl>
                                <Input placeholder="Din Nachname" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>E-Mail</FormLabel>
                              <FormControl>
                                <Input placeholder="dini@email.ch" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Telefon</FormLabel>
                              <FormControl>
                                <Input placeholder="+41 79 123 45 67" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Strasse & Huusnummere</FormLabel>
                            <FormControl>
                              <Input placeholder="Bahnhofstrasse 123" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>PLZ</FormLabel>
                              <FormControl>
                                <Input placeholder="8001" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Stadt</FormLabel>
                              <FormControl>
                                <Input placeholder="Züri" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Button type="submit" className="w-full bg-brings-primary hover:bg-brings-primary/90">
                        Wiiter zur Zahlig
                      </Button>
                    </form>
                  </Form>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-4">Zahligsmethod</h2>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="space-y-4"
                              >
                                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                                  <RadioGroupItem value="card" id="card" />
                                  <FormLabel htmlFor="card" className="flex-1 cursor-pointer">
                                    <div className="flex items-center">
                                      <CreditCard className="mr-2 text-brings-primary" />
                                      <span>Kredit-/Debitcharte</span>
                                    </div>
                                  </FormLabel>
                                </div>
                                
                                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                                  <RadioGroupItem value="twint" id="twint" />
                                  <FormLabel htmlFor="twint" className="flex-1 cursor-pointer">
                                    <div className="flex items-center">
                                      <span className="mr-2 text-brings-primary font-bold">TWINT</span>
                                      <span>Zahle mit TWINT</span>
                                    </div>
                                  </FormLabel>
                                </div>
                                
                                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                                  <RadioGroupItem value="cash" id="cash" />
                                  <FormLabel htmlFor="cash" className="flex-1 cursor-pointer">
                                    <div className="flex items-center">
                                      <span className="mr-2 text-brings-primary">💵</span>
                                      <span>Barzahlig bi Lieferig</span>
                                    </div>
                                  </FormLabel>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex flex-col gap-4">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setStep('details')}
                          className="w-full"
                        >
                          Zrugg zu de Lieferadresse
                        </Button>
                        <Button 
                          type="submit" 
                          className="w-full bg-brings-primary hover:bg-brings-primary/90"
                        >
                          Bstellig abschlüüsse
                        </Button>
                      </div>
                    </form>
                  </Form>
                </>
              )}
            </div>
          </div>
          
          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Din Bstellig</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b pb-3">
                    <div className="flex items-center">
                      <div className="w-12 h-12 border rounded overflow-hidden mr-3">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium line-clamp-1">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.quantity} x CHF {item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <p className="font-medium">CHF {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              {/* Order totals */}
              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span>Zwischesumme</span>
                  <span>CHF {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lieferkoste</span>
                  <span>{deliveryFee === 0 ? 'Gratis' : `CHF ${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t mt-3 pt-3">
                  <span>Total</span>
                  <span>CHF {orderTotal.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Delivery info */}
              <div className="mt-6 bg-brings-light p-4 rounded-lg">
                <div className="flex items-start">
                  <Truck className="text-brings-primary mr-3 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-medium">Lieferig</p>
                    <p className="text-sm text-gray-600">Üsi Lieferzit isch meistens innerhalb vo 30-60 Minute.</p>
                  </div>
                </div>
              </div>
              
              {deliveryFee > 0 && (
                <div className="mt-4 text-sm text-brings-primary">
                  <p>Leg no für CHF {(50 - totalPrice).toFixed(2)} i Warächorb für gratis Lieferig!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
