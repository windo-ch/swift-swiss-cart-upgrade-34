
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2, Edit, Search, Image } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock products data
// In a real app, this would come from a database
const initialProducts = [
  {
    id: '1',
    name: 'Zweifel Chips Paprika',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    price: 5.90,
    category: 'chips',
    description: 'Die beliebte Zweifel Chips mit Paprika-Gschmack. Perfekt für de Film-Abig oder es gemütlichs Zämme-Sitze mit Fründe.',
    weight: '175g',
  },
  {
    id: '2',
    name: 'Coca Cola 0.5L',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    price: 2.50,
    category: 'drinks',
    description: 'Die klassischi Coca-Cola. Erfrischend und perfekt für unterwegs.',
    weight: '500ml',
  },
  {
    id: '3',
    name: 'Rivella Rot 0.5L',
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    price: 2.80,
    category: 'drinks',
    description: 'Rivella Rot - Das Original. Das beliebte Schwizer Getränk us Milchserum.',
    weight: '500ml',
  }
];

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
  id: z.string().optional(),
  name: z.string().min(3, { message: 'Name muess mindestens 3 Zeiche ha' }),
  price: z.coerce.number().min(0.1, { message: 'Priis muess grösser als 0 si' }),
  category: z.string({ required_error: 'Bitte wähl e Kategorie us' }),
  description: z.string().min(10, { message: 'Beschribig muess mindestens 10 Zeiche ha' }),
  image: z.string().url({ message: 'Bitte gib e gültigi URL für s Bild i' }),
  weight: z.string().min(1, { message: 'Bitte gib s Gwicht/Inhalt a' }),
});

type ProductFormValues = z.infer<typeof productSchema>;

const Admin = () => {
  const [products, setProducts] = useState(initialProducts);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  // Initialize form
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      price: 0,
      category: '',
      description: '',
      image: '',
      weight: '',
    },
  });
  
  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle form submission
  const onSubmit = (data: ProductFormValues) => {
    if (isEditing && data.id) {
      // Update existing product
      setProducts(prevProducts => 
        prevProducts.map(product => 
          product.id === data.id ? { ...data } : product
        )
      );
      
      toast({
        title: "Produkt aktualisiert",
        description: `${data.name} isch erfolgrich aktualisiert worde.`,
        duration: 3000,
      });
    } else {
      // Add new product
      const newProduct = {
        ...data,
        id: Date.now().toString(),
      };
      
      setProducts(prevProducts => [...prevProducts, newProduct]);
      
      toast({
        title: "Produkt hinzuegfüegt",
        description: `${data.name} isch erfolgrich hinzuegfüegt worde.`,
        duration: 3000,
      });
    }
    
    // Reset form and editing state
    form.reset();
    setIsEditing(false);
  };
  
  // Handle edit product
  const handleEdit = (product: any) => {
    form.reset(product);
    setIsEditing(true);
  };
  
  // Handle delete product
  const handleDelete = (id: string) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    
    toast({
      title: "Produkt glöscht",
      description: "S'Produkt isch erfolgrich glöscht worde.",
      duration: 3000,
    });
  };
  
  // Cancel editing
  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Produkt Verwalitig</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product form */}
          <div className="lg:col-span-1">
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
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
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
                  
                  <div className="flex gap-2 pt-2">
                    {isEditing ? (
                      <>
                        <Button type="submit" className="flex-1 bg-brings-primary hover:bg-brings-primary/90">
                          Speichere
                        </Button>
                        <Button type="button" variant="outline" onClick={handleCancel} className="flex-1">
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
          </div>
          
          {/* Products list */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Alli Produkt</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    placeholder="Produkt sueche..."
                    className="pl-10 w-full max-w-xs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              {filteredProducts.length > 0 ? (
                <div className="rounded-lg border overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Produkt
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kategorie
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Priis
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Aktione
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                {product.image ? (
                                  <img className="h-10 w-10 rounded-md object-cover" src={product.image} alt={product.name} />
                                ) : (
                                  <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center">
                                    <Image size={16} className="text-gray-500" />
                                  </div>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                <div className="text-sm text-gray-500">{product.weight}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {categories.find(c => c.id === product.category)?.name || product.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            CHF {product.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEdit(product)}
                              className="text-brings-primary hover:text-brings-primary/80 mr-2"
                            >
                              <Edit size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDelete(product.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg mb-4">Kei Produkt gfunde</p>
                  {searchTerm && (
                    <Button 
                      variant="outline" 
                      onClick={() => setSearchTerm('')}
                    >
                      Suechi zrücksetze
                    </Button>
                  )}
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

export default Admin;
