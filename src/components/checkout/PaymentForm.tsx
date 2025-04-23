
import React from 'react';
import { FormField, FormItem, FormControl, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from 'react-hook-form';
import { CreditCard, AlertTriangle } from 'lucide-react';
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
                  <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50 opacity-60">
                    <RadioGroupItem value="card" id="card" disabled />
                    <FormLabel htmlFor="card" className="flex-1 cursor-pointer flex items-center justify-between">
                      <div className="flex items-center">
                        <CreditCard className="mr-2 text-brings-primary" />
                        <span>Kredit-/Debitcharte</span>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Stripe wird vorbereitet</span>
                    </FormLabel>
                  </div>
                  
                  <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50 opacity-60">
                    <RadioGroupItem value="twint" id="twint" disabled />
                    <FormLabel htmlFor="twint" className="flex-1 cursor-pointer flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="mr-2 text-brings-primary font-bold">TWINT</span>
                        <span>Zahle mit TWINT</span>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Chunnt bald</span>
                    </FormLabel>
                  </div>
                  
                  <div className="flex items-center space-x-2 border-2 border-green-300 rounded-lg p-4 cursor-pointer hover:bg-green-50 bg-green-50/50">
                    <RadioGroupItem value="cash" id="cash" defaultChecked />
                    <FormLabel htmlFor="cash" className="flex-1 cursor-pointer">
                      <div className="flex items-center flex-wrap">
                        <span className="mr-2 text-brings-primary text-xl">💵</span>
                        <span className="font-medium">Barzahlig bi Lieferig</span>
                        <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Verfügbar für Tests</span>
                      </div>
                    </FormLabel>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md flex items-start">
          <AlertTriangle className="text-yellow-500 mt-1 mr-3 flex-shrink-0" size={18} />
          <p className="text-sm text-yellow-700">
            Die Integration mit Stripe (via Supabase) isch in Vorbereitung. Für Test-Bestellige chasch du momentan Barzahlig wähle.
          </p>
        </div>
        
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
