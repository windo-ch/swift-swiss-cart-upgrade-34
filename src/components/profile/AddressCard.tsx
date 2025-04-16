
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Trash2 } from 'lucide-react';

interface AddressProps {
  address: {
    id: string;
    name: string;
    street: string;
    postal_code: string;
    city: string;
    is_default: boolean;
  };
  onSetDefault: () => void;
  onRemove: () => void;
}

export const AddressCard = ({ address, onSetDefault, onRemove }: AddressProps) => {
  return (
    <Card className="relative overflow-hidden">
      {address.is_default && (
        <div className="absolute top-0 right-0">
          <Badge className="bg-brings-primary text-white">
            <Star className="mr-1 h-3 w-3" /> Default
          </Badge>
        </div>
      )}
      
      <CardContent className="p-6">
        <div className="flex items-start mb-4">
          <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
          <div>
            <h3 className="font-medium">{address.name}</h3>
            <p className="text-gray-600 text-sm mt-1">{address.street}</p>
            <p className="text-gray-600 text-sm">{address.postal_code} {address.city}</p>
          </div>
        </div>
        
        <div className="flex space-x-2 mt-4">
          {!address.is_default && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={onSetDefault}
            >
              <Star className="mr-1 h-4 w-4" /> Set as Default
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="sm"
            className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
            onClick={onRemove}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
