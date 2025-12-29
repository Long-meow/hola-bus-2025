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
      trips: {
        Row: {
          id: string
          origin: string
          destination: string
          departure_time: string
          price: number
          capacity: number
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          origin: string
          destination: string
          departure_time: string
          price: number
          capacity?: number
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          origin?: string
          destination?: string
          departure_time?: string
          price?: number
          capacity?: number
          status?: string
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          full_name: string | null
          email: string | null
          student_id: string | null
          phone_number: string | null
          avatar_url: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          full_name?: string | null
          email?: string | null
          student_id?: string | null
          phone_number?: string | null
          avatar_url?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string | null
          student_id?: string | null
          phone_number?: string | null
          avatar_url?: string | null
          updated_at?: string | null
        }
      }
    }
  }
}