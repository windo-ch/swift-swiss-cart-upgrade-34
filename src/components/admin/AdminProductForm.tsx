
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAdmin } from '@/hooks/use-admin';
import { Product } from '@/types/product';
import ImageUpload from './ImageUpload';
import ProductBasicInfo from './ProductBasicInfo';
import ProductCategorySelect from './ProductCategorySelect';
import ProductDetails from './ProductDetails';
import { Checkbox } from '@/components/ui/checkbox';
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
    defaultValues: initialData ? {
      name: initialData.name || '',
      price: initialData.price || 0,
      category: initialData.category || '',
      description: initialData.description || '',
      image: initialData.image || '',
      weight: initialData.weight || '',
      ingredients: initialData.ingredients || '',
      stock: initialData.stock !== undefined ? initialData.stock : 0,
      ageRestricted: initialData.ageRestricted || false,
    } : {
      name: '',
      price: 0,
      category: '',
      description: '',
      image: '',
      weight: '',
      ingredients: '',
      stock: 0,
      ageRestricted: false,
    },
  });

  // Reset form when initialData changes (when editing a different product)
  useEffect(() => {
    if (initialData) {
      console.log("Setting form values from initialData:", initialData);
      form.reset({
        name: initialData.name || '',
        price: initialData.price || 0,
        category: initialData.category || '',
        description: initialData.description || '',
        image: initialData.image || '',
        weight: initialData.weight || '',
        ingredients: initialData.ingredients || '',
        stock: initialData.stock !== undefined ? initialData.stock : 0,
        ageRestricted: initialData.ageRestricted || false,
      });
    } else {
      form.reset({
        name: '',
        price: 0,
        category: '',
        description: '',
        image: '',
        weight: '',
        ingredients: '',
        stock: 0,
        ageRestricted: false,
      });
    }
  }, [initialData, form]);

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

  const handleImageUploaded = (url: string) => {
    console.log("Image uploaded, setting form value:", url);
    form.setValue('image', url);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">
        {initialData ? 'Produkt bearbeite' : 'Neus Produkt erstelle'}
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <ProductBasicInfo form={form} />
          <ProductCategorySelect form={form} />
          
          <FormField
            control={form.control}
            name="ageRestricted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    18+ Altersbestätigung erforderlich
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          
          <div className="space-y-4">
            <h3 className="text-md font-medium">Produktbild</h3>
            <ImageUpload 
              onImageUploaded={handleImageUploaded} 
              existingImageUrl={form.watch('image')}
            />
            {form.formState.errors.image && (
              <p className="text-sm text-red-500">{form.formState.errors.image.message}</p>
            )}
          </div>
          
          <ProductDetails form={form} />
          
          <div className="flex justify-end gap-2">
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
