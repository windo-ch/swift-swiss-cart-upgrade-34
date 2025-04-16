import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, User, MapPin, Package, History, ShoppingBag } from 'lucide-react';
import { OrderCard } from '@/components/profile/OrderCard';
import { AddressCard } from '@/components/profile/AddressCard';
import { AddAddressForm } from '@/components/profile/AddAddressForm';
import { Order } from '@/types/order';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/utils/formatters';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [orderError, setOrderError] = useState(null);
  const [profile, setProfile] = useState({
    fullName: '',
    phone: '',
    email: user?.email || '',
  });
  const [addresses, setAddresses] = useState<any[]>([]);
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const fetchUserData = async () => {
      setIsLoadingOrders(true);
      try {
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (*)
          `)
          .eq('user_id', user.id);

        if (ordersError) throw ordersError;
        
        const transformedOrders = ordersData.map((order: any): Order => {
          let deliveryAddress;
          
          if (typeof order.delivery_address === 'string') {
            try {
              deliveryAddress = JSON.parse(order.delivery_address);
            } catch (e) {
              deliveryAddress = {
                firstName: 'Unknown',
                lastName: 'Customer',
                address: 'Unknown',
                city: 'Unknown',
                postalCode: 'Unknown',
                email: 'unknown@example.com',
                phone: 'Unknown'
              };
            }
          } else {
            deliveryAddress = order.delivery_address;
          }
          
          return {
            id: order.id,
            user_id: order.user_id,
            total_amount: order.total_amount,
            delivery_fee: order.delivery_fee || 0,
            discount_amount: order.discount_amount || 0,
            delivery_address: deliveryAddress,
            status: order.status,
            created_at: order.created_at,
            updated_at: order.updated_at,
            payment_method: order.payment_method,
            estimated_delivery_time: order.estimated_delivery_time,
            order_items: order.order_items || []
          };
        });

        setOrders(transformedOrders);

        const { data: addressesData, error: addressesError } = await supabase
          .from('user_addresses')
          .select('*')
          .eq('user_id', user.id) as { data: any[], error: any };

        if (addressesError) throw addressesError;
        setAddresses(addressesData || []);

        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('full_name, avatar_url')
          .eq('id', user.id)
          .single();

        if (profilesError && profilesError.code !== 'PGRST116') throw profilesError;
        if (profiles) {
          setProfile(prev => ({
            ...prev,
            fullName: profiles.full_name || '',
          }));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setOrderError(error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not load your profile data. Please try again later.',
        });
      } finally {
        setIsLoadingOrders(false);
      }
    };

    fetchUserData();
  }, [user, navigate, toast]);

  const handleAddressAdded = (newAddress: any) => {
    setAddresses(prev => [newAddress, ...prev]);
    setIsAddingAddress(false);
    toast({
      title: 'Address Added',
      description: 'Your new address has been successfully added.',
    });
  };

  const handleSetDefaultAddress = async (addressId: string) => {
    try {
      await supabase
        .from('user_addresses')
        .update({ is_default: false })
        .eq('user_id', user?.id) as { error: any };
      
      const { error } = await supabase
        .from('user_addresses')
        .update({ is_default: true })
        .eq('id', addressId) as { error: any };
      
      if (error) throw error;
      
      setAddresses(prev => 
        prev.map(addr => ({
          ...addr,
          is_default: addr.id === addressId
        }))
      );
      
      toast({
        title: 'Default Address Updated',
        description: 'Your default delivery address has been updated.',
      });
    } catch (error) {
      console.error('Error updating default address:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not update default address. Please try again.',
      });
    }
  };

  const handleRemoveAddress = async (addressId: string) => {
    try {
      const { error } = await supabase
        .from('user_addresses')
        .delete()
        .eq('id', addressId) as { error: any };
      
      if (error) throw error;
      
      setAddresses(prev => prev.filter(addr => addr.id !== addressId));
      
      toast({
        title: 'Address Removed',
        description: 'The address has been removed from your profile.',
      });
    } catch (error) {
      console.error('Error removing address:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not remove address. Please try again.',
      });
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          full_name: profile.fullName,
          updated_at: new Date().toISOString(),
        });
      
      if (error) throw error;
      
      toast({
        title: 'Profile Updated',
        description: 'Your profile information has been updated successfully.',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not update profile. Please try again.',
      });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not sign out. Please try again.',
      });
    }
  };

  if (isLoadingOrders) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-brings-primary mb-4" />
            <p className="text-gray-600">Loading your profile...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Account</h1>
        
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="orders">My Orders</TabsTrigger>
            <TabsTrigger value="addresses">My Addresses</TabsTrigger>
            <TabsTrigger value="settings">Account Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders">
            <h2 className="text-xl font-semibold mb-4">My Orders</h2>
            {isLoadingOrders ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-brings-primary" />
              </div>
            ) : orderError ? (
              <div className="bg-red-50 p-4 rounded-md text-red-800 mb-4">
                There was an error loading your orders. Please try again.
              </div>
            ) : orders && orders.length > 0 ? (
              <div className="grid gap-6">
                {orders.map(order => (
                  <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                      <div>
                        <span className="text-sm text-gray-500">Order #{order.id.slice(0, 8)}</span>
                        <p className="font-medium">{new Date(order.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <Badge variant="outline" className={`
                          ${order.status === 'delivered' ? 'bg-green-50 text-green-700 border-green-200' :
                            order.status === 'in_delivery' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            'bg-yellow-50 text-yellow-700 border-yellow-200'}
                        `}>
                          {order.status === 'delivered' ? 'Delivered' : 
                           order.status === 'in_delivery' ? 'On the way' :
                           'Processing'}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total</span>
                        <span className="font-medium">CHF {formatCurrency(order.total_amount)}</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <Button variant="outline" className="w-full">
                        View Order Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by exploring our products.</p>
                <div className="mt-6">
                  <Link to="/products">
                    <Button>Browse Products</Button>
                  </Link>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="addresses" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <MapPin className="mr-2" size={20} /> My Addresses
              </h2>
              {!isAddingAddress && (
                <Button onClick={() => setIsAddingAddress(true)}>
                  Add New Address
                </Button>
              )}
            </div>

            {isAddingAddress ? (
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <AddAddressForm 
                  onAddressAdded={handleAddressAdded} 
                  onCancel={() => setIsAddingAddress(false)}
                />
              </div>
            ) : null}

            {addresses.length === 0 && !isAddingAddress ? (
              <div className="bg-gray-50 p-8 text-center rounded-lg border border-gray-200">
                <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No addresses found</h3>
                <p className="mt-2 text-gray-500">Add a delivery address to speed up your checkout process.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {addresses.map((address) => (
                  <AddressCard 
                    key={address.id} 
                    address={address} 
                    onSetDefault={() => handleSetDefaultAddress(address.id)}
                    onRemove={() => handleRemoveAddress(address.id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    value={profile.fullName} 
                    onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    value={profile.email} 
                    disabled 
                    className="bg-gray-50"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                <div className="flex justify-between pt-4">
                  <Button 
                    variant="outline" 
                    onClick={handleLogout}
                  >
                    Sign Out
                  </Button>
                  <Button onClick={handleUpdateProfile}>Save Changes</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
