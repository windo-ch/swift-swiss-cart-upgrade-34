export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      age_verifications: {
        Row: {
          id: string
          user_id: string
          verified_at: string
          verification_method: "id" | "passport" | "drivers_license" | "self_declaration"
          is_valid: boolean
          expires_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          verified_at?: string
          verification_method: "id" | "passport" | "drivers_license" | "self_declaration"
          is_valid?: boolean
          expires_at: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          verified_at?: string
          verification_method?: "id" | "passport" | "drivers_license" | "self_declaration"
          is_valid?: boolean
          expires_at?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "age_verifications_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          product_name: string
          quantity: number
          price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          product_name: string
          quantity: number
          price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          product_name?: string
          quantity?: number
          price?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            referencedRelation: "orders"
            referencedColumns: ["id"]
          }
        ]
      }
      orders: {
        Row: {
          id: string
          user_id: string
          total_amount: number
          discount_amount: number
          delivery_fee: number
          status: string
          delivery_address: Json
          payment_method: string
          estimated_delivery_time: string
          created_at: string
          updated_at: string
          delivery_photo?: string
          marketing_consent?: boolean
        }
        Insert: {
          id?: string
          user_id: string
          total_amount: number
          discount_amount?: number
          delivery_fee?: number
          status?: string
          delivery_address: Json
          payment_method: string
          estimated_delivery_time?: string
          created_at?: string
          updated_at?: string
          delivery_photo?: string
          marketing_consent?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          total_amount?: number
          discount_amount?: number
          delivery_fee?: number
          status?: string
          delivery_address?: Json
          payment_method?: string
          estimated_delivery_time?: string
          created_at?: string
          updated_at?: string
          delivery_photo?: string
          marketing_consent?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          id: string
          product_id: string
          name: string
          description: string
          price: number
          image: string
          category: string
          subcategory: string
          is_age_restricted: boolean
          is_featured: boolean
          inventory_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id: string
          name: string
          description: string
          price: number
          image: string
          category: string
          subcategory?: string
          is_age_restricted: boolean
          is_featured?: boolean
          inventory_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          name?: string
          description?: string
          price?: number
          image?: string
          category?: string
          subcategory?: string
          is_age_restricted?: boolean
          is_featured?: boolean
          inventory_count?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          full_name: string
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_addresses: {
        Row: {
          id: string
          user_id: string
          name: string
          street: string
          postal_code: string
          city: string
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          street: string
          postal_code: string
          city: string
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          street?: string
          postal_code?: string
          city?: string
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_addresses_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_discounts: {
        Row: {
          id: string
          user_id: string
          discount_code: string
          discount_percent: number
          is_used: boolean
          valid_until: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          discount_code: string
          discount_percent: number
          is_used?: boolean
          valid_until?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          discount_code?: string
          discount_percent?: number
          is_used?: boolean
          valid_until?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_discounts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Insertables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updateables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]
