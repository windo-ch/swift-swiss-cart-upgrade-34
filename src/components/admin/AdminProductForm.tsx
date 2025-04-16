
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAdmin, Product } from '@/contexts/AdminContext';
import ImageUpload from './ImageUpload';
import ProductBasicInfo from './ProductBasicInfo';
import ProductCategorySelect from './ProductCategorySelect';
import ProductDetails from './ProductDetails';
import { productSchema, type ProductFormValues } from '@/schemas/productSchema';

interface AdminProductFormProps {
  initialData?: Product;
  onCancel?: () => void;
}

const AdminProductForm = ({ initialData, onCancel }: AdminProductFormProps) => {
  const { addProduct, updateProduct } = useAdmin();
  const { toast } = useToast();
  const isEditing = !!initialData;

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: '',
      price: 0,
      category: '',
      description: '',
      image: '',
      weight: '',
      ingredients: '',
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    if (isEditing && initialData) {
      updateProduct({
        ...data,
        id: initialData.id,
      } as Product);
      
      toast({
        title: "Produkt aktualisiert",
        description: `${data.name} isch erfolgrich aktualisiert worde.`,
        duration: 3000,
      });
    } else {
      addProduct(data as Omit<Product, "id">);
      
      toast({
        title: "Produkt hinzuegfüegt",
        description: `${data.name} isch erfolgrich hinzuegfüegt worde.`,
        duration: 3000,
      });
    }
    form.reset();
    if (onCancel) onCancel();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {isEditing ? 'Produkt bearbeite' : 'Neus Produkt hinzuefüege'}
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <ProductBasicInfo form={form} />
          <ProductCategorySelect form={form} />
          
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produktbild</FormLabel>
                <FormControl>
                  <ImageUpload
                    onImageUploaded={(url) => field.onChange(url)}
                    existingImageUrl={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <ProductDetails form={form} />
          
          <div className="flex gap-2 pt-2">
            {isEditing ? (
              <>
                <Button type="submit" className="flex-1 bg-brings-primary hover:bg-brings-primary/90">
                  Speichere
                </Button>
                <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                  Abbreche
                </Button>
              </>
            ) : (
              <Button type="submit" className="w-full bg-brings-primary hover:bg-brings-primary/90">
                <Plus size={16} className="mr-2" />
                Hinzuefüege
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AdminProductForm;

