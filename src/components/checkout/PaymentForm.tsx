
import React from 'react';
import { FormField, FormItem, FormControl, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from 'react-hook-form';
import { CreditCard } from 'lucide-react';
import { CheckoutFormValues } from './types';

interface PaymentFormProps {
  form: UseFormReturn<CheckoutFormValues>;
  onSubmit: (data: CheckoutFormValues) => void;
  onBack: () => void;
  isSubmitting: boolean;
}

const PaymentForm = ({ form, onSubmit, onBack, isSubmitting }: PaymentFormProps) => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Zahligsmethod</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="card" id="card" />
                    <FormLabel htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="flex items-center">
                        <CreditCard className="mr-2 text-brings-primary" />
                        <span>Kredit-/Debitcharte</span>
                      </div>
                    </FormLabel>
                  </div>
                  
                  <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="twint" id="twint" />
                    <FormLabel htmlFor="twint" className="flex-1 cursor-pointer">
                      <div className="flex items-center">
                        <span className="mr-2 text-brings-primary font-bold">TWINT</span>
                        <span>Zahle mit TWINT</span>
                      </div>
                    </FormLabel>
                  </div>
                  
                  <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="cash" id="cash" />
                    <FormLabel htmlFor="cash" className="flex-1 cursor-pointer">
                      <div className="flex items-center">
                        <span className="mr-2 text-brings-primary">💵</span>
                        <span>Barzahlig bi Lieferig</span>
                      </div>
                    </FormLabel>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        
        <div className="flex flex-col gap-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onBack}
            className="w-full"
          >
            Zrugg zu de Lieferadresse
          </Button>
          <Button 
            type="submit" 
            className="w-full bg-brings-primary hover:bg-brings-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Bstellig wird verarbeitet..." : "Bstellig abschlüüsse"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default PaymentForm;
