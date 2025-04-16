
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Image } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { Product } from '@/types/product';
import { Input } from '@/components/ui/input';

interface ProductRowProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductRow = ({ product, onEdit, onDelete }: ProductRowProps) => {
  const [hasImageError, setHasImageError] = useState(false);
  const [isEditingStock, setIsEditingStock] = useState(false);
  const [stockValue, setStockValue] = useState(product.stock?.toString() || "0");
  const { updateStock } = useAdmin();
  const placeholderImage = 'https://brings-delivery.ch/cdn/shop/files/placeholder-product_600x.png';

  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStockValue(e.target.value);
  };

  const handleStockBlur = () => {
    const newStock = parseInt(stockValue);
    if (!isNaN(newStock) && newStock >= 0) {
      updateStock(product.id.toString(), newStock);
    } else {
      setStockValue(product.stock?.toString() || "0");
    }
    setIsEditingStock(false);
  };

  const handleStockKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleStockBlur();
    } else if (e.key === 'Escape') {
      setIsEditingStock(false);
      setStockValue(product.stock?.toString() || "0");
    }
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            {product.image ? (
              <img 
                className="h-10 w-10 rounded-md object-cover" 
                src={hasImageError ? placeholderImage : product.image} 
                alt={product.name}
                onError={() => setHasImageError(true)}
                loading="lazy"
              />
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
          {product.category}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        CHF {product.price.toFixed(2)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        {isEditingStock ? (
          <Input 
            type="number"
            min="0"
            value={stockValue}
            onChange={handleStockChange}
            onBlur={handleStockBlur}
            onKeyDown={handleStockKeyDown}
            className="w-24 text-center"
            autoFocus
          />
        ) : (
          <div
            onClick={() => setIsEditingStock(true)}
            className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded w-16 text-center"
          >
            {product.stock || 0}
          </div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onEdit(product)}
          className="text-brings-primary hover:text-brings-primary/90 mr-2"
        >
          <Edit size={16} />
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onDelete(product.id.toString())}
          className="text-red-600 hover:text-red-800"
        >
          <Trash2 size={16} />
        </Button>
      </td>
    </tr>
  );
};

export default ProductRow;
