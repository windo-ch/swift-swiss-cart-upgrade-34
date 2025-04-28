import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, AlertTriangle, Package, Filter } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Product } from '@/types/supabase';

interface InventoryTabProps {
  lowInventoryProducts: Product[];
  isLoading: boolean;
  openInventoryDialog: (product: Product) => void;
}

const InventoryTab: React.FC<InventoryTabProps> = ({ 
  lowInventoryProducts, 
  isLoading, 
  openInventoryDialog 
}) => {
  const getInventoryStatusColor = (count: number) => {
    if (count <= 5) return 'text-red-500';
    if (count <= 15) return 'text-orange-400';
    return 'text-green-500';
  };

  const getBorderColor = (count: number) => {
    if (count <= 5) return 'border-red-300';
    if (count <= 15) return 'border-orange-300';
    return '';
  };

  const getInventoryStatus = (count: number) => {
    if (count <= 5) return 'Kritisch';
    if (count <= 15) return 'Niedrig';
    return 'OK';
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Lagerbestand</h2>
        <Badge variant="outline">{lowInventoryProducts.length} Produkte mit niedrigem Bestand</Badge>
      </div>
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Filter className="h-4 w-4" />
        <span>Anzeige: Produkte mit Bestand unter 20 Stück</span>
      </div>
      
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : lowInventoryProducts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">Alle Produkte haben ausreichend Lagerbestand</h3>
            <p className="text-sm text-muted-foreground">
              Es gibt keine Produkte mit kritischem oder niedrigem Lagerbestand.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {lowInventoryProducts.map(product => {
            const inventory = product.inventory_count || 0;
            return (
              <Card 
                key={product.id} 
                className={`overflow-hidden border ${getBorderColor(inventory)}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      {product.image && (
                        <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-100 border">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-base">{product.name}</CardTitle>
                        <p className="text-xs text-muted-foreground mt-1">
                          Kategorie: {product.category || 'Keine Kategorie'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-lg ${getInventoryStatusColor(inventory)}`}>
                          {inventory} Stk.
                        </span>
                        <Badge variant={inventory <= 5 ? "destructive" : inventory <= 15 ? "default" : "outline"}>
                          {getInventoryStatus(inventory)}
                        </Badge>
                      </div>
                      {inventory <= 5 && (
                        <div className="flex items-center mt-1 text-xs text-red-500">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Nachbestellen!
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {product.description && (
                    <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                  )}
                  
                  <div className="flex justify-end mt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => openInventoryDialog(product)}
                    >
                      <Plus className="h-3 w-3" />
                      Bestand aktualisieren
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InventoryTab; 