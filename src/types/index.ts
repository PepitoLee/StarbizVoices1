export interface Pack {
  id: string;
  title: string;
  description: string | null;
  cover_url: string | null;
  category: string;
  audio_count: number;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface Audio {
  id: string;
  pack_id: string;
  title: string;
  description: string | null;
  audio_url: string;
  cover_url: string | null;
  duration_seconds: number;
  tags: string[];
  sort_order: number;
  is_preview: boolean;
  created_at: string;
  pack?: Pack;
}

export interface UserAccess {
  id: string;
  email: string;
  hotmart_transaction_id: string | null;
  buyer_name: string | null;
  granted_at: string;
  expires_at: string | null;
  is_active: boolean;
}

export interface Favorite {
  id: string;
  user_id: string;
  audio_id: string;
  created_at: string;
  audio?: Audio;
}
