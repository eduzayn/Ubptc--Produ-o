export interface Member {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  profession: string;
  registration_number?: string;
  status: "pending" | "active" | "suspended";
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor_id: string;
  price: number;
  discount_percentage: number;
  created_at: string;
  updated_at: string;
}

export interface Ebook {
  id: string;
  title: string;
  author: string;
  file_url: string;
  cover_url: string;
  created_at: string;
}
