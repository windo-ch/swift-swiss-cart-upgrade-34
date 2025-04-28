import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { useDistrict } from '@/contexts/DistrictContext';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const OrderTestPage = () => {
  const { toast } = useToast();
  const { selectedDistrict, setSelectedDistrict, openDistrictModal } = useDistrict();
  const { cartItems, addToCart, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [testProduct, setTestProduct] = useState<any>(null);
  const [testError, setTestError] = useState<string | null>(null);
  const [testFormData, setTestFormData] = useState({
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phone: '123456789',
    address: 'Test Street 123',
    city: 'Zürich',
    postalCode: '8000',
  });
  
  // Fetch a test product on mount
  useEffect(() => {
    const fetchTestProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .limit(1)
          .single();
        
        if (error) throw error;
        
        if (data) {
          setTestProduct(data);
          console.log('Test product fetched:', data);
        }
      } catch (err) {
        console.error('Error fetching test product:', err);
        setTestError(err instanceof Error ? err.message : String(err));
      }
    };
    
    fetchTestProduct();
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTestFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const addTestProductToCart = () => {
    if (!testProduct) return;
    
    addToCart({
      id: testProduct.id,
      name: testProduct.name,
      price: testProduct.price,
      image: testProduct.image || 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png',
      category: testProduct.category
    });
    
    toast({
      title: 'Test product added to cart',
      description: `${testProduct.name} has been added to your cart.`
    });
  };
  
  const submitTestOrder = async () => {
    if (cartItems.length === 0) {
      toast({
        title: 'Cart is empty',
        description: 'Please add a test product to your cart first.',
        variant: 'destructive'
      });
      return;
    }
    
    if (!selectedDistrict) {
      toast({
        title: 'District not selected',
        description: 'Please select a district before placing an order.',
        variant: 'destructive'
      });
      openDistrictModal();
      return;
    }
    
    setLoading(true);
    
    try {
      // Calculate totals
      const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const deliveryFee = totalPrice >= 50 ? 0 : 5.90;
      const finalTotal = totalPrice + deliveryFee;
      
      console.log('Submitting test order with data:', {
        formData: testFormData,
        cart: cartItems,
        district: selectedDistrict,
        totalPrice,
        deliveryFee,
        finalTotal
      });
      
      // Create the order in Supabase
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: '00000000-0000-0000-0000-000000000000', // Test user ID
          total_amount: finalTotal,
          delivery_fee: deliveryFee,
          discount_amount: 0,
          payment_method: 'card',
          delivery_address: {
            ...testFormData
          },
          district: typeof selectedDistrict === 'string' ? selectedDistrict : 'Unbekannt',
          status: 'pending',
          estimated_delivery_time: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        })
        .select()
        .single();
      
      if (orderError) throw orderError;
      
      console.log('Order created:', order);
      
      // Create order items
      for (const item of cartItems) {
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
      }
      
      toast({
        title: 'Test order placed successfully!',
        description: `Order ID: ${order.id}`
      });
      
      clearCart();
      setTestError(null);
    } catch (err) {
      console.error('Error placing test order:', err);
      setTestError(err instanceof Error ? err.message : String(err));
      
      toast({
        title: 'Error placing test order',
        description: err instanceof Error ? err.message : String(err),
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const forceDistrictSelection = () => {
    navigate('/order-test?select-district=true');
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Order Test Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>District Status</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDistrict ? (
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>District selected: <strong>{selectedDistrict ? (typeof selectedDistrict === 'object' && selectedDistrict !== null ? selectedDistrict.name : selectedDistrict) : ''}</strong></span>
              </div>
            ) : (
              <div className="flex items-center text-amber-600">
                <AlertTriangle className="h-5 w-5 mr-2" />
                <span>No district selected</span>
              </div>
            )}
            
            <div className="mt-4">
              <Button onClick={openDistrictModal}>
                {selectedDistrict ? 'Change District' : 'Select District'}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Cart Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              {cartItems.length > 0 ? (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>{cartItems.length} items in cart</span>
                </div>
              ) : (
                <div className="flex items-center text-amber-600">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  <span>Cart is empty</span>
                </div>
              )}
            </div>
            
            {testProduct ? (
              <Button onClick={addTestProductToCart}>
                Add Test Product to Cart
              </Button>
            ) : testError ? (
              <div className="text-red-500">
                Error loading test product: {testError}
              </div>
            ) : (
              <div className="flex items-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <span>Loading test product...</span>
              </div>
            )}
            
            {cartItems.length > 0 && (
              <Button variant="outline" className="ml-2" onClick={clearCart}>
                Clear Cart
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Test Order Form</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={testFormData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={testFormData.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={testFormData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={testFormData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={testFormData.address}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={testFormData.city}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                name="postalCode"
                value={testFormData.postalCode}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <Button 
            onClick={submitTestOrder} 
            disabled={loading || !testProduct || cartItems.length === 0}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Placing Test Order...
              </>
            ) : 'Place Test Order'}
          </Button>
          
          {testError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
              <p className="font-semibold">Error:</p>
              <pre className="text-sm overflow-x-auto mt-2">{testError}</pre>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="text-center">
        <a href="/admin-test" className="inline-block px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md">
          Back to Admin Test
        </a>
      </div>
      
      <div className="mt-4 text-center">
        <button
          onClick={forceDistrictSelection}
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
        >
          Force District Selection
        </button>
      </div>
    </div>
  );
};

export default OrderTestPage; 