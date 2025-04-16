
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
  const { products, deleteProduct, setProducts } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Load products on mount to ensure we have the latest data
  useEffect(() => {
    const loadProducts = () => {
      console.log("AdminProductList: Loading products");
      const allStoredProducts = getStoredProducts();
      console.log("AdminProductList: All stored products:", allStoredProducts.length);
      
      // Only get admin products (those with IDs starting with 'admin-')
      const adminOnlyProducts = allStoredProducts
        .filter(p => typeof p.id === 'string' && p.id.toString().startsWith('admin-'))
        .map(p => ({
          ...p,
          id: p.id.toString()
        }));
      
      console.log("AdminProductList: Found admin products:", adminOnlyProducts.length);
      
      // Check if we have any admin products
      if (adminOnlyProducts.length > 0) {
        setProducts(adminOnlyProducts);
      } else {
        console.log("No admin products found, may need to create some through the form");
      }
    };

    loadProducts();
    
    // Also listen for storage events to reload when admin products change
    window.addEventListener('storage', loadProducts);
    return () => window.removeEventListener('storage', loadProducts);
  }, [setProducts]);

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

      <ProductTable
        products={products}
        searchTerm={searchTerm}
        onEdit={onEdit}
        onDelete={handleDelete}
        onResetSearch={() => setSearchTerm('')}
      />
    </div>
  );
};

export default AdminProductList;
