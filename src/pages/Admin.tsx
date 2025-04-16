
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AdminProvider } from '../contexts/AdminContext';
import AdminProductForm from '../components/admin/AdminProductForm';
import AdminProductList from '../components/admin/AdminProductList';
import { Product } from '../contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Truck, Package } from 'lucide-react';
import { initializeAdminProducts } from '../utils/admin-utils';

const Admin = () => {
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();

  // Initialize sample products when the Admin page loads
  useEffect(() => {
    initializeAdminProducts();
  }, []);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleCancel = () => {
    setEditingProduct(undefined);
  };

  return (
    <AdminProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Admin-Bereich</h1>
            <div className="flex gap-2">
              <Link to="/admin/orders">
                <Button variant="outline" className="flex items-center gap-2">
                  <Truck size={16} />
                  Bstellig Tracking
                </Button>
              </Link>
              <Button variant="outline" className="flex items-center gap-2" disabled>
                <Package size={16} />
                Produkte
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <AdminProductForm 
                initialData={editingProduct} 
                onCancel={handleCancel}
              />
            </div>
            
            <div className="lg:col-span-2">
              <AdminProductList onEdit={handleEdit} />
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </AdminProvider>
  );
};

export default Admin;
