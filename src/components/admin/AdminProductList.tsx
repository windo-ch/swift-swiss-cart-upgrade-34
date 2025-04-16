
import React, { useState, useEffect } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/components/ui/use-toast';
import { getStoredProducts } from '@/utils/product-utils';
import SearchBar from './SearchBar';
import ProductTable from './ProductTable';
import { Product } from '@/types/product';

interface AdminProductListProps {
  onEdit: (product: Product) => void;
}

const AdminProductList = ({ onEdit }: AdminProductListProps) => {
  const { products, deleteProduct, setProducts, refreshProducts } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  // Load products on mount to ensure we have the latest data
  useEffect(() => {
    console.log("AdminProductList: Initial products count:", products.length);
    
    const loadProducts = () => {
      setIsLoading(true);
      console.log("AdminProductList: Loading products");
      
      try {
        // Attempt to refresh products from context
        refreshProducts();
        
        // Double check if we have products
        if (products.length === 0) {
          console.log("Still no products after refresh, fetching directly");
          const allStoredProducts = getStoredProducts();
          console.log("AdminProductList: All stored products:", allStoredProducts.length);
          
          if (allStoredProducts.length > 0) {
            setProducts(allStoredProducts);
          } else {
            console.log("No products found, may need to create some through the form");
          }
        }
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
    
    // Also listen for storage events to reload when admin products change
    window.addEventListener('storage', loadProducts);
    return () => window.removeEventListener('storage', loadProducts);
  }, [setProducts, refreshProducts]);

  // Debug: log products when they change
  useEffect(() => {
    console.log("AdminProductList: Current products:", products.length);
  }, [products]);

  // Handle delete product
  const handleDelete = (id: string) => {
    deleteProduct(id);
    toast({
      title: "Produkt glöscht",
      description: "S'Produkt isch erfolgrich glöscht worde.",
      duration: 3000,
    });
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onExport={handleExportProducts}
      />

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Produkte werden geladen...</p>
        </div>
      ) : (
        <ProductTable
          products={products}
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
