import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  RadioGroup, 
  RadioGroupItem 
} from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Truck, CheckCircle, Clock, Upload, Loader2 } from 'lucide-react';
import { Order } from '@/types/order';

interface UpdateOrderStatusProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
}

const UpdateOrderStatus = ({ order, isOpen, onClose }: UpdateOrderStatusProps) => {
  const [status, setStatus] = useState<string>(order.status);
  const [deliveryPhoto, setDeliveryPhoto] = useState<File | null>(null);
  const [marketingConsent, setMarketingConsent] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDeliveryPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      let photoUrl = null;
      
      if (status === 'delivered' && deliveryPhoto) {
        setIsUploading(true);
        
        const fileExt = deliveryPhoto.name.split('.').pop();
        const fileName = `${order.id}_${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase
          .storage
          .from('delivery-photos')
          .upload(fileName, deliveryPhoto);
          
        if (uploadError) {
          throw uploadError;
        }
        
        const { data: urlData } = supabase
          .storage
          .from('delivery-photos')
          .getPublicUrl(fileName);
          
        photoUrl = urlData.publicUrl;
        setIsUploading(false);
      }
      
      const updateData: any = { status };
      
      if (photoUrl) {
        updateData.delivery_photo = photoUrl;
        updateData.marketing_consent = marketingConsent;
      }
      
      const { error: updateError } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', order.id);
        
      if (updateError) {
        throw updateError;
      }
      
      toast({
        title: "Status aktualisiert",
        description: "Dr Bstellstatus isch erfolgriich aktualisiert worde.",
      });
      
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      
      onClose();
      
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: "Fehler",
        description: "Es isch en Fehler passiert. Bitte versuecheds nomal.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bstellstatus aktualisiere</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <RadioGroup 
            value={status} 
            onValueChange={setStatus}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pending" id="pending" />
              <Label htmlFor="pending" className="flex items-center cursor-pointer">
                <Clock size={16} className="mr-2 text-yellow-600" />
                Offe (Warte uf Zustellig)
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="in_delivery" id="in_delivery" />
              <Label htmlFor="in_delivery" className="flex items-center cursor-pointer">
                <Truck size={16} className="mr-2 text-blue-600" />
                In Lieferig
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="delivered" id="delivered" />
              <Label htmlFor="delivered" className="flex items-center cursor-pointer">
                <CheckCircle size={16} className="mr-2 text-green-600" />
                Abgschlosse (Usgliieferet)
              </Label>
            </div>
          </RadioGroup>
          
          {status === 'delivered' && (
            <div className="space-y-4 border-t pt-4">
              <div>
                <Label htmlFor="delivery-photo" className="block mb-2">
                  Lieferfoto (optional)
                </Label>
                <div className="flex items-center gap-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => document.getElementById('delivery-photo')?.click()}
                    className="w-full"
                  >
                    <Upload size={16} className="mr-2" />
                    Foto uswähle
                  </Button>
                  <input
                    id="delivery-photo"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
                {deliveryPhoto && (
                  <p className="text-sm text-gray-600 mt-2">
                    {deliveryPhoto.name} ({Math.round(deliveryPhoto.size / 1024)} KB)
                  </p>
                )}
              </div>
              
              {deliveryPhoto && (
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="marketing-consent" 
                    checked={marketingConsent}
                    onCheckedChange={(checked) => setMarketingConsent(checked as boolean)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label 
                      htmlFor="marketing-consent" 
                      className="text-sm cursor-pointer"
                    >
                      Chund het erlaubt, das Lieferfoto für Marketing z'verwende
                    </Label>
                    <p className="text-xs text-gray-500">
                      Nume aktiviere wenn dr Chund explizit zuestimmt het
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Abbreche
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting || isUploading}
            className="bg-brings-primary hover:bg-brings-primary/90"
          >
            {(isSubmitting || isUploading) && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Speichere
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateOrderStatus;
