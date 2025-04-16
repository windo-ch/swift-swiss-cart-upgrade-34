
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAdmin, Product } from '@/contexts/AdminContext';

// Available categories
const categories = [
  { id: 'chips', name: 'Chips & Snacks' },
  { id: 'drinks', name: 'Getränk' },
  { id: 'sweets', name: 'Süssigkeite' },
  { id: 'alcohol', name: 'Alkohol' },
  { id: 'energy', name: 'Energy Drinks' },
];

// Product form schema
const productSchema = z.object({
  name: z.string().min(3, { message: 'Name muess mindestens 3 Zeiche ha' }),
  price: z.coerce.number().min(0.1, { message: 'Priis muess grösser als 0 si' }),
  category: z.string({ required_error: 'Bitte wähl e Kategorie us' }),
  description: z.string().min(10, { message: 'Beschribig muess mindestens 10 Zeiche ha' }),
  image: z.string().url({ message: 'Bitte gib e gültigi URL für s Bild i' }),
  weight: z.string().min(1, { message: 'Bitte gib s Gwicht/Inhalt a' }),
  ingredients: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

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
      // For updating, we need to include the id from initialData
      updateProduct({
        ...data,
        id: initialData.id,
      } as Product); // Cast to Product since we know all required fields are present
      
      toast({
        title: "Produkt aktualisiert",
        description: `${data.name} isch erfolgrich aktualisiert worde.`,
        duration: 3000,
      });
    } else {
      // For adding a new product, we properly type it as Omit<Product, "id">
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
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Produktname" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priis (CHF)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gwicht/Inhalt</FormLabel>
                  <FormControl>
                    <Input placeholder="100g, 0.5L, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
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
          
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bild URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/image.jpg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
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
