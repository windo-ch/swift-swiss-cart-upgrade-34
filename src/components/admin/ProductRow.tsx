
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Image, AlertCircle } from 'lucide-react';
import { useAdmin } from '@/hooks/use-admin';
import { Product } from '@/types/product';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ProductRowProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const PLACEHOLDER_IMAGE = 'https://zbvdlkfnpufqfhrptfhz.supabase.co/storage/v1/object/public/product-images/gobrings-product-placeholder.png';

const ProductRow = ({ product, onEdit, onDelete }: ProductRowProps) => {
  const [hasImageError, setHasImageError] = useState(false);
  const [isEditingStock, setIsEditingStock] = useState(false);
  const [stockValue, setStockValue] = useState(product.stock?.toString() || "0");
  const { updateStock } = useAdmin();

  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStockValue(e.target.value);
  };

  const handleStockBlur = () => {
    const newStock = parseInt(stockValue);
    if (!isNaN(newStock) && newStock >= 0) {
      updateStock(String(product.id), newStock);
      toast({
        title: "Lagerbestand aktualisiert",
        description: `Lagerbestand für ${product.name} wurde auf ${newStock} aktualisiert.`,
      });
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
          <div className="flex-shrink-0 h-10 w-10 relative">
            {product.image ? (
              <img 
                className="h-10 w-10 rounded-md object-cover" 
                src={hasImageError ? PLACEHOLDER_IMAGE : product.image} 
                alt={product.name}
                onError={() => {
                  console.error(`Error loading admin product image: ${product.image} for ${product.name}`);
                  setHasImageError(true);
                }}
                loading="lazy"
              />
            ) : (
              <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center">
                <Image size={16} className="text-gray-500" />
              </div>
            )}
            {product.ageRestricted && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center" title="Altersbeschränkt">
                18+
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
        CHF {typeof product.price === 'number' ? product.price.toFixed(2) : parseFloat(String(product.price)).toFixed(2)}
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
            className={`cursor-pointer hover:bg-gray-100 px-2 py-1 rounded w-16 text-center 
              ${Number(product.stock) <= 5 ? 'text-red-600 font-semibold' : 
                Number(product.stock) <= 15 ? 'text-orange-600' : ''}`}
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
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 size={16} />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Produkt löschen?</AlertDialogTitle>
              <AlertDialogDescription>
                Sind Sie sicher, dass Sie {product.name} löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Abbrechen</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(String(product.id))} className="bg-red-600 hover:bg-red-700">
                Löschen
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </td>
    </tr>
  );
};

export default ProductRow;
