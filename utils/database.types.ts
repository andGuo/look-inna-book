export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      authored: {
        Row: {
          author_id: string
          isbn: string
        }
        Insert: {
          author_id: string
          isbn: string
        }
        Update: {
          author_id?: string
          isbn?: string
        }
      }
      authors: {
        Row: {
          author_id: string
          first_name: string
          middle_name: string | null
          last_name: string
        }
        Insert: {
          author_id: string
          first_name: string
          middle_name?: string | null
          last_name: string
        }
        Update: {
          author_id?: string
          first_name?: string
          middle_name?: string | null
          last_name?: string
        }
      }
      billing_address: {
        Row: {
          order_id: number
          first_name: string
          last_name: string
          address: string
          apartment_suite: string | null
          country: string
          city: string
          state: string
          zip_code: string
        }
        Insert: {
          order_id: number
          first_name: string
          last_name: string
          address: string
          apartment_suite?: string | null
          country: string
          city: string
          state: string
          zip_code: string
        }
        Update: {
          order_id?: number
          first_name?: string
          last_name?: string
          address?: string
          apartment_suite?: string | null
          country?: string
          city?: string
          state?: string
          zip_code?: string
        }
      }
      books: {
        Row: {
          isbn: string
          name: string
          msrp: number
          num_pages: number
          pub_percentage: number
          img_url: string | null
          publisher_id: string
        }
        Insert: {
          isbn: string
          name: string
          msrp: number
          num_pages: number
          pub_percentage: number
          img_url?: string | null
          publisher_id: string
        }
        Update: {
          isbn?: string
          name?: string
          msrp?: number
          num_pages?: number
          pub_percentage?: number
          img_url?: string | null
          publisher_id?: string
        }
      }
      cart_books: {
        Row: {
          cart_id: string
          isbn: string
          quantity: number
        }
        Insert: {
          cart_id: string
          isbn: string
          quantity: number
        }
        Update: {
          cart_id?: string
          isbn?: string
          quantity?: number
        }
      }
      carts: {
        Row: {
          profile_id: string
          cart_total: number
          total_quantity: number
        }
        Insert: {
          profile_id: string
          cart_total: number
          total_quantity: number
        }
        Update: {
          profile_id?: string
          cart_total?: number
          total_quantity?: number
        }
      }
      genres: {
        Row: {
          isbn: string
          name: string
        }
        Insert: {
          isbn: string
          name: string
        }
        Update: {
          isbn?: string
          name?: string
        }
      }
      order_books: {
        Row: {
          order_id: number
          isbn: string
          quantity: number
        }
        Insert: {
          order_id: number
          isbn: string
          quantity: number
        }
        Update: {
          order_id?: number
          isbn?: string
          quantity?: number
        }
      }
      orders: {
        Row: {
          order_id: number
          profile_id: string
          order_date: string
          order_total: number
          total_quantity: number
        }
        Insert: {
          order_id?: number
          profile_id: string
          order_date: string
          order_total: number
          total_quantity: number
        }
        Update: {
          order_id?: number
          profile_id?: string
          order_date?: string
          order_total?: number
          total_quantity?: number
        }
      }
      payment_info: {
        Row: {
          publisher_id: string
          transit_num: number
          institution_num: number
          account_num: number
          accounts_payable: number
        }
        Insert: {
          publisher_id: string
          transit_num: number
          institution_num: number
          account_num: number
          accounts_payable: number
        }
        Update: {
          publisher_id?: string
          transit_num?: number
          institution_num?: number
          account_num?: number
          accounts_payable?: number
        }
      }
      profile_roles: {
        Row: {
          profile_id: string
          role_id: number
        }
        Insert: {
          profile_id: string
          role_id: number
        }
        Update: {
          profile_id?: string
          role_id?: number
        }
      }
      profiles: {
        Row: {
          profile_id: string
          first_name: string | null
          last_name: string | null
        }
        Insert: {
          profile_id: string
          first_name?: string | null
          last_name?: string | null
        }
        Update: {
          profile_id?: string
          first_name?: string | null
          last_name?: string | null
        }
      }
      publisher_address: {
        Row: {
          publisher_id: string
          address: string
          apartment_suite: string | null
          country: string
          city: string
          state: string
          zip_code: string
        }
        Insert: {
          publisher_id: string
          address: string
          apartment_suite?: string | null
          country: string
          city: string
          state: string
          zip_code: string
        }
        Update: {
          publisher_id?: string
          address?: string
          apartment_suite?: string | null
          country?: string
          city?: string
          state?: string
          zip_code?: string
        }
      }
      publishers: {
        Row: {
          publisher_id: string
          name: string
          email: string
          phone_number: string
        }
        Insert: {
          publisher_id: string
          name: string
          email: string
          phone_number: string
        }
        Update: {
          publisher_id?: string
          name?: string
          email?: string
          phone_number?: string
        }
      }
      roles: {
        Row: {
          role_id: number
          role_name: string
        }
        Insert: {
          role_id?: number
          role_name: string
        }
        Update: {
          role_id?: number
          role_name?: string
        }
      }
      shipping_address: {
        Row: {
          order_id: number
          first_name: string
          last_name: string
          address: string
          apartment_suite: string | null
          country: string
          city: string
          state: string
          zip_code: string
          phone_number: string
        }
        Insert: {
          order_id: number
          first_name: string
          last_name: string
          address: string
          apartment_suite?: string | null
          country: string
          city: string
          state: string
          zip_code: string
          phone_number: string
        }
        Update: {
          order_id?: number
          first_name?: string
          last_name?: string
          address?: string
          apartment_suite?: string | null
          country?: string
          city?: string
          state?: string
          zip_code?: string
          phone_number?: string
        }
      }
      user_address: {
        Row: {
          profile_id: string
          first_name: string
          last_name: string
          address: string
          apartment_suite: string | null
          country: string
          city: string
          state: string
          zip_code: string
          phone_number: string
        }
        Insert: {
          profile_id: string
          first_name: string
          last_name: string
          address: string
          apartment_suite?: string | null
          country: string
          city: string
          state: string
          zip_code: string
          phone_number: string
        }
        Update: {
          profile_id?: string
          first_name?: string
          last_name?: string
          address?: string
          apartment_suite?: string | null
          country?: string
          city?: string
          state?: string
          zip_code?: string
          phone_number?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
