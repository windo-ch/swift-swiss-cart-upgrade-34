import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Package, Truck, AlertCircle, DollarSign } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface OverviewTabProps {
  pendingOrdersCount: number;
  activeDeliveriesCount: number;
  totalRevenue: number;
  avgOrderValue: number;
  lowInventoryCount: number;
  isLoading: boolean;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  pendingOrdersCount,
  activeDeliveriesCount,
  totalRevenue,
  avgOrderValue,
  lowInventoryCount,
  isLoading
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-CH', {
      style: 'currency',
      currency: 'CHF'
    }).format(value);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Dashboard Übersicht</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Pending Orders Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Offene Bestellungen</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-6 w-12" />
            ) : (
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold">{pendingOrdersCount}</div>
                <Badge 
                  variant={pendingOrdersCount > 10 ? "destructive" : pendingOrdersCount > 5 ? "default" : "outline"}
                >
                  {pendingOrdersCount > 10 ? 'Hoch' : pendingOrdersCount > 5 ? 'Mittel' : 'Niedrig'}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Active Deliveries Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Aktive Lieferungen</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-6 w-12" />
            ) : (
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold">{activeDeliveriesCount}</div>
                <Badge 
                  variant={activeDeliveriesCount > 10 ? "destructive" : activeDeliveriesCount > 5 ? "default" : "outline"}
                >
                  {activeDeliveriesCount > 10 ? 'Hoch' : activeDeliveriesCount > 5 ? 'Mittel' : 'Niedrig'}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Low Inventory Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Produkte mit niedrigem Bestand</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-6 w-12" />
            ) : (
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold">{lowInventoryCount}</div>
                <Badge 
                  variant={lowInventoryCount > 15 ? "destructive" : lowInventoryCount > 8 ? "default" : "outline"}
                >
                  {lowInventoryCount > 15 ? 'Kritisch' : lowInventoryCount > 8 ? 'Warnung' : 'OK'}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Total Revenue Card */}
        <Card className="md:col-span-2 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Gesamtumsatz</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-10 w-24" />
            ) : (
              <div>
                <div className="text-3xl font-bold">{formatCurrency(totalRevenue)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Durchschnittlicher Bestellwert: {formatCurrency(avgOrderValue)}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTab; 