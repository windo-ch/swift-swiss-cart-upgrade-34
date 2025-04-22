
import React, { useState, memo } from 'react';
import { useAdmin } from '@/hooks/use-admin';
import { useToast } from '@/components/ui/use-toast';
import SearchBar from './SearchBar';
import ProductTable from './ProductTable';
import ProductFilters from './ProductFilters';
import ProductStats from './ProductStats';
import ProductLoadingState from './ProductLoadingState';
import { Product } from '@/types/product';

interface AdminProductListProps {
  onEdit: (product: Product) => void;
}

// Use memo to prevent unnecessary re-renders
const AdminProductList = memo(({ onEdit }: AdminProductListProps) => {
  const { products, deleteProduct, isLoading } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [showRestricted, setShowRestricted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const { toast } = useToast();

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

  if (isLoading) {
    return <ProductLoadingState />;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onExport={handleExportProducts}
        onToggleRestricted={() => setShowRestricted(!showRestricted)}
        showRestricted={showRestricted}
      />

      <ProductFilters
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <ProductStats
        products={products}
        showRestricted={showRestricted}
        setShowRestricted={setShowRestricted}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <ProductTable
        products={filteredProducts}
        searchTerm={searchTerm}
        onEdit={onEdit}
        onDelete={handleDelete}
        onResetSearch={() => setSearchTerm('')}
      />
      
      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Keine Produkte gefunden. Fügen Sie ein Produkt hinzu.</p>
        </div>
      )}
    </div>
  );
});

AdminProductList.displayName = 'AdminProductList';

export default AdminProductList;
