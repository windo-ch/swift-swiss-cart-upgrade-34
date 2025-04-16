
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { ProductFormValues } from '@/schemas/productSchema';
import { categories } from '@/data/categories-data';

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
              {/* Skip the 'all' category which is just for filtering */}
              {categories.filter(category => category.id !== 'all').map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.icon} {category.name}
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
