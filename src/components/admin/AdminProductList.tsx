
import React, { useState, useEffect } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/components/ui/use-toast';
import SearchBar from './SearchBar';
import ProductTable from './ProductTable';
import { Product } from '@/types/product';
import { Loader2, SlidersHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { categories } from '@/data/categories-data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AdminProductListProps {
  onEdit: (product: Product) => void;
}

const AdminProductList = ({ onEdit }: AdminProductListProps) => {
  const { products, deleteProduct, refreshProducts, isLoading } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [showRestricted, setShowRestricted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const { toast } = useToast();

  // Load products on mount to ensure we have the latest data
  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  // Handle delete product
  const handleDelete = (id: string) => {
    deleteProduct(id);
  };

  // Export all products
  const handleExportProducts = () => {
    const exportData = JSON.stringify(products, null, 2);
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'brings_produkte.json';
    document.body.appendChild(a);
    a.click();
    
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    toast({
      title: "Produkt exportiert",
      description: "Alli Produkt sind erfolgrich als JSON exportiert worde.",
      duration: 3000,
    });
  };

  // Filter and sort products
  const filteredProducts = products
    .filter(product => 
      // Search filter
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       product.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      // Age restriction filter
      (showRestricted || !product.ageRestricted) &&
      // Category filter
      (selectedCategory === 'all' || product.category === selectedCategory)
    )
    .sort((a, b) => {
      // Sort products
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price':
          return Number(a.price) - Number(b.price);
        case 'price-desc':
          return Number(b.price) - Number(a.price);
        case 'stock':
          return (a.stock || 0) - (b.stock || 0);
        case 'stock-desc':
          return (b.stock || 0) - (a.stock || 0);
        default:
          return 0;
      }
    });

  const totalProducts = products.length;
  const restrictedProducts = products.filter(p => p.ageRestricted).length;
  const lowStockProducts = products.filter(p => (p.stock || 0) < 10).length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onExport={handleExportProducts}
        onToggleRestricted={() => setShowRestricted(!showRestricted)}
        showRestricted={showRestricted}
      />

      <Accordion type="single" collapsible className="mb-4">
        <AccordionItem value="filters">
          <AccordionTrigger className="py-2">
            <div className="flex items-center">
              <SlidersHorizontal size={16} className="mr-2" />
              Erweiterte Filter
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="text-sm font-medium mb-1 block">Kategorie</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Alle Kategorien" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Kategorien</SelectItem>
                    {categories.filter(cat => cat.id !== 'all').map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Sortieren nach</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sortieren nach" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    <SelectItem value="price">Preis (aufsteigend)</SelectItem>
                    <SelectItem value="price-desc">Preis (absteigend)</SelectItem>
                    <SelectItem value="stock">Lagerbestand (aufsteigend)</SelectItem>
                    <SelectItem value="stock-desc">Lagerbestand (absteigend)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="outline" className="bg-blue-50 text-blue-700">
          {totalProducts} Produkte Total
        </Badge>
        <Badge 
          variant={showRestricted ? "default" : "outline"} 
          className={showRestricted ? "bg-amber-500" : "bg-amber-50 text-amber-700"} 
          onClick={() => setShowRestricted(!showRestricted)}
        >
          {restrictedProducts} 18+ Produkte
        </Badge>
        <Badge variant="outline" className="bg-red-50 text-red-700">
          {lowStockProducts} mit niedrigem Bestand
        </Badge>
        {selectedCategory !== 'all' && (
          <Badge 
            variant="default" 
            className="bg-green-600"
          >
            Filter: {categories.find(c => c.id === selectedCategory)?.name || selectedCategory}
            <button 
              className="ml-1 hover:text-white/80" 
              onClick={() => setSelectedCategory('all')}
            >
              ✕
            </button>
          </Badge>
        )}
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-brings-primary mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Produkte werden geladen...</p>
        </div>
      ) : (
        <ProductTable
          products={filteredProducts}
          searchTerm={searchTerm}
          onEdit={onEdit}
          onDelete={handleDelete}
          onResetSearch={() => setSearchTerm('')}
        />
      )}
      
      {!isLoading && products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Keine Produkte gefunden. Fügen Sie ein Produkt hinzu.</p>
        </div>
      )}
    </div>
  );
};

export default AdminProductList;
