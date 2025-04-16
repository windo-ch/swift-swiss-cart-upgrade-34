
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { ProductFormValues } from '@/schemas/productSchema';

interface ProductDetailsProps {
  form: UseFormReturn<ProductFormValues>;
}

const ProductDetails = ({ form }: ProductDetailsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Beschribig</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Beschriib s'Produkt..." 
                className="resize-none min-h-[100px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="ingredients"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Zuetate (optional)</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Zuetate vom Produkt..." 
                className="resize-none min-h-[80px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default ProductDetails;

