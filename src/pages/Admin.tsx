
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AdminProvider } from '../contexts/AdminContext';
import AdminProductForm from '../components/admin/AdminProductForm';
import AdminProductList from '../components/admin/AdminProductList';
import { Product } from '../contexts/AdminContext';

const Admin = () => {
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();

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
