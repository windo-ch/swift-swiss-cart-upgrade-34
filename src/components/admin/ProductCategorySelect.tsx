
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { ProductFormValues } from '@/schemas/productSchema';

const categories = [
  { id: 'chips', name: 'Chips & Snacks' },
  { id: 'drinks', name: 'Getränk' },
  { id: 'sweets', name: 'Süssigkeite' },
  { id: 'alcohol', name: 'Alkohol' },
  { id: 'energy', name: 'Energy Drinks' },
];

interface ProductCategorySelectProps {
  form: UseFormReturn<ProductFormValues>;
}

const ProductCategorySelect = ({ form }: ProductCategorySelectProps) => {
  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Kategorie</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Kategorie uswähle" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProductCategorySelect;

