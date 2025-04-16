
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().min(1, "Address name is required"),
  street: z.string().min(1, "Street address is required"),
  postal_code: z.string().min(4, "Valid postal code is required"),
  city: z.string().min(1, "City is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface AddAddressFormProps {
  onAddressAdded: (address: any) => void;
  onCancel: () => void;
}

export const AddAddressForm = ({ onAddressAdded, onCancel }: AddAddressFormProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      street: '',
      postal_code: '',
      city: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'You must be logged in to add an address',
      });
      return;
    }

    try {
      // Check if this is the first address (to set as default)
      const { count, error: countError } = await supabase
        .from('user_addresses')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id) as { count: number, error: any };
      
      if (countError) throw countError;
      
      const isFirstAddress = count === 0;
      
      // Add the new address
      const { data: newAddress, error } = await supabase
        .from('user_addresses')
        .insert({
          user_id: user.id,
          name: data.name,
          street: data.street,
          postal_code: data.postal_code,
          city: data.city,
          is_default: isFirstAddress, // Set as default if it's the first address
        })
        .select() as { data: any, error: any };
      
      if (error) throw error;
      
      onAddressAdded(newAddress[0]);
    } catch (error) {
      console.error('Error adding address:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not add address. Please try again.',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">Add New Address</h3>
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Name (e.g., Home, Work)</FormLabel>
              <FormControl>
                <Input placeholder="Home" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <Input placeholder="Bahnhofstrasse 123" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="postal_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder="8000" {...field} />
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
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Zürich" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end space-x-2 pt-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Save Address
          </Button>
        </div>
      </form>
    </Form>
  );
};
