
export interface OrderAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  email: string;
  phone: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
  created_at?: string;
}

export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  delivery_fee: number;
  discount_amount: number;
  delivery_address: OrderAddress;
  status: "pending" | "in_delivery" | "delivered";
  created_at: string;
  updated_at: string;
  payment_method: string;
  estimated_delivery_time: string | null;
  order_items: OrderItem[];
  delivery_photo?: string | null;
  marketing_consent?: boolean;
}
