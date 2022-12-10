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
          author_id?: string
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
      book_genres: {
        Row: {
          isbn: string
          genre_id: string
        }
        Insert: {
          isbn: string
          genre_id: string
        }
        Update: {
          isbn?: string
          genre_id?: string
        }
      }
      books: {
        Row: {
          isbn: string
          title: string
          msrp: number
          instock_quantity: number
          num_pages: number
          pub_percentage: number
          img_url: string | null
          publisher_id: string
        }
        Insert: {
          isbn: string
          title: string
          msrp: number
          instock_quantity?: number
          num_pages: number
          pub_percentage: number
          img_url?: string | null
          publisher_id: string
        }
        Update: {
          isbn?: string
          title?: string
          msrp?: number
          instock_quantity?: number
          num_pages?: number
          pub_percentage?: number
          img_url?: string | null
          publisher_id?: string
        }
      }
      cart_books: {
        Row: {
          profile_id: string
          isbn: string
          quantity: number
        }
        Insert: {
          profile_id: string
          isbn: string
          quantity: number
        }
        Update: {
          profile_id?: string
          isbn?: string
          quantity?: number
        }
      }
      genres: {
        Row: {
          name: string
        }
        Insert: {
          name: string
        }
        Update: {
          name?: string
        }
      }
      order_books: {
        Row: {
          order_id: number
          isbn: string
          title: string
          price: number
          quantity: number
          pub_percentage: number
          publisher_id: string
        }
        Insert: {
          order_id: number
          isbn: string
          title: string
          price: number
          quantity: number
          pub_percentage: number
          publisher_id: string
        }
        Update: {
          order_id?: number
          isbn?: string
          title?: string
          price?: number
          quantity?: number
          pub_percentage?: number
          publisher_id?: string
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
          order_date?: string
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
      publisher_payment: {
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
      publisher_phones: {
        Row: {
          publisher_id: string
          number: string
        }
        Insert: {
          publisher_id: string
          number: string
        }
        Update: {
          publisher_id?: string
          number?: string
        }
      }
      publishers: {
        Row: {
          publisher_id: string
          name: string
          email: string
        }
        Insert: {
          publisher_id?: string
          name: string
          email: string
        }
        Update: {
          publisher_id?: string
          name?: string
          email?: string
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
      tracking_info: {
        Row: {
          order_id: number
          shipping_status: string
          creation_date: string
          delivery_date: string | null
          delivered_date: string | null
          city: string | null
          state: string | null
          country: string | null
        }
        Insert: {
          order_id: number
          shipping_status?: string
          creation_date?: string
          delivery_date?: string | null
          delivered_date?: string | null
          city?: string | null
          state?: string | null
          country?: string | null
        }
        Update: {
          order_id?: number
          shipping_status?: string
          creation_date?: string
          delivery_date?: string | null
          delivered_date?: string | null
          city?: string | null
          state?: string | null
          country?: string | null
        }
      }
      user_address: {
        Row: {
          profile_id: string
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
      carts: {
        Row: {
          profile_id: string | null
          cart_total: number | null
          total_quantity: number | null
        }
      }
    }
    Functions: {
      add_to_cart: {
        Args: { isbn_: string; quantity: number; pid: string }
        Returns: undefined
      }
      buy_book: {
        Args: { uid: string; isbn_: string }
        Returns: undefined
      }
      create_author: {
        Args: {
          first_name: string
          middle_name: string
          last_name: string
          author_id: string
        }
        Returns: undefined
      }
      create_book: {
        Args: {
          isbn: string
          title: string
          msrp: number
          num_pages: number
          pub_percentage: number
          publisher_id: string
          authors: string[]
          genres: string[]
          instock_quantity: number
          img_url: string
        }
        Returns: undefined
      }
      create_publisher: {
        Args: {
          name: string
          email: string
          address: string
          country: string
          city: string
          state: string
          zip_code: string
          transit_num: number
          institution_num: number
          account_num: number
          phonenumbers: string[]
          apartment_suite: string
          publisher_id: string
        }
        Returns: undefined
      }
      generate_report: {
        Args: Record<PropertyKey, never>
        Returns: { total_sales: number; total_expenses: number }[]
      }
      get_profile_cart: {
        Args: { uid: string }
        Returns: {
          isbn: string
          purchase_quantity: number
          title: string
          msrp: number
          instock_quantity: number
          img_url: string
        }[]
      }
      get_profile_order: {
        Args: { order_number: number }
        Returns: {
          shipping_status: string
          creation_date: string
          delivery_date: string
          delivered_date: string
          city: string
          state: string
          country: string
        }[]
      }
      is_owner: {
        Args: { pid: string }
        Returns: boolean
      }
      place_order: {
        Args: {
          shipfname: string
          shiplname: string
          shipaddr: string
          shipcountry: string
          shipcity: string
          shipstate: string
          shipzipcode: string
          shipphonenum: string
          billfname: string
          billlname: string
          billaddr: string
          billcountry: string
          billcity: string
          billstate: string
          billzipcode: string
          uid: string
          shipaptsuite: string
          billaptsuite: string
        }
        Returns: undefined
      }
      remove_book: {
        Args: { isbn_: string }
        Returns: {
          isbn: string
          title: string
          msrp: number
          instock_quantity: number
          num_pages: number
          img_url: string
          publisher_id: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
