export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chat: {
        Row: {
          created_at: string | null
          id: number
          name: string | null
          uid: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string | null
          uid?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string | null
          uid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_uid_fkey"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      chat_prompt: {
        Row: {
          chat_id: number | null
          created_at: string | null
          id: number
          response_id: number | null
          text: string | null
        }
        Insert: {
          chat_id?: number | null
          created_at?: string | null
          id?: number
          response_id?: number | null
          text?: string | null
        }
        Update: {
          chat_id?: number | null
          created_at?: string | null
          id?: number
          response_id?: number | null
          text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_prompt_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chat"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_prompt_response_id_fkey"
            columns: ["response_id"]
            isOneToOne: false
            referencedRelation: "chat_response"
            referencedColumns: ["id"]
          }
        ]
      }
      chat_response: {
        Row: {
          chat_id: number | null
          created_at: string | null
          feedback_helpful: boolean | null
          feedback_ok: boolean | null
          feedback_text: string | null
          feedback_truthful: boolean | null
          id: number
          prompt_id: number | null
          status: string | null
          text: string | null
        }
        Insert: {
          chat_id?: number | null
          created_at?: string | null
          feedback_helpful?: boolean | null
          feedback_ok?: boolean | null
          feedback_text?: string | null
          feedback_truthful?: boolean | null
          id?: number
          prompt_id?: number | null
          status?: string | null
          text?: string | null
        }
        Update: {
          chat_id?: number | null
          created_at?: string | null
          feedback_helpful?: boolean | null
          feedback_ok?: boolean | null
          feedback_text?: string | null
          feedback_truthful?: boolean | null
          id?: number
          prompt_id?: number | null
          status?: string | null
          text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_response_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chat"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_response_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "chat_prompt"
            referencedColumns: ["id"]
          }
        ]
      }
      content_type: {
        Row: {
          active: boolean | null
          category: string | null
          order: number | null
          type: string
        }
        Insert: {
          active?: boolean | null
          category?: string | null
          order?: number | null
          type: string
        }
        Update: {
          active?: boolean | null
          category?: string | null
          order?: number | null
          type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_chat_prompt: {
        Args: {
          chat_id_input: number
          content_input: string
        }
        Returns: Database["public"]["CompositeTypes"]["chat_prompt_with_response"][]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      chat_prompt_with_response: {
        prompt_id: number
        response_id: number
        chat_id: number
        prompt_content: string
        response_content: string
      }
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
