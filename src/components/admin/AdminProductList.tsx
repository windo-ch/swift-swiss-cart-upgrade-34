
import React, { useState, useEffect } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/components/ui/use-toast';
import SearchBar from './SearchBar';
import ProductTable from './ProductTable';
import { Product } from '@/types/product';
import { Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AdminProductListProps {
  onEdit: (product: Product) => void;
}

const AdminProductList = ({ onEdit }: AdminProductListProps) => {
  const { products, deleteProduct, refreshProducts, isLoading } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const [showRestricted, setShowRestricted] = useState(false);

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

  // Filter products based on search term and age restriction
  const filteredProducts = products.filter(product => 
    (product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     product.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (showRestricted || !product.ageRestricted)
  );

  const totalProducts = products.length;
  const restrictedProducts = products.filter(p => p.ageRestricted).length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            {totalProducts} Produkte Total
          </Badge>
          <Badge variant="outline" className="bg-amber-50 text-amber-700" onClick={() => setShowRestricted(!showRestricted)}>
            {restrictedProducts} 18+ Produkte {showRestricted ? '(angezeigt)' : '(ausgeblendet)'}
          </Badge>
        </div>
      </div>

      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onExport={handleExportProducts}
        onToggleRestricted={() => setShowRestricted(!showRestricted)}
        showRestricted={showRestricted}
      />

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
