
import React from 'react';
import { Button } from '@/components/ui/button';
import ProductRow from './ProductRow';
import { Product } from '@/types/product';

interface ProductTableProps {
  products: Product[];
  searchTerm: string;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onResetSearch: () => void;
}

const ProductTable = ({ products, searchTerm, onEdit, onDelete, onResetSearch }: ProductTableProps) => {
  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">Kei Produkt gfunde</p>
        {searchTerm && (
          <Button 
            variant="outline" 
            onClick={onResetSearch}
          >
            Suechi zrücksetze
          </Button>
        )}
      </div>
    );
  }

  return (
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Lagerbestand
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Aktione
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredProducts.map((product) => (
            <ProductRow 
              key={product.id.toString()} 
              product={product} 
              onEdit={onEdit} 
              onDelete={onDelete} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
