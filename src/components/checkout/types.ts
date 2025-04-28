export interface CheckoutFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  paymentMethod: 'card' | 'twint' | 'cash';
  saveAddress?: boolean;
}
