import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "./supabase";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data para desenvolvimento
const mockUser: User = {
  id: "dev-user",
  app_metadata: {},
  user_metadata: {},
  aud: "authenticated",
  created_at: new Date().toISOString(),
  role: "authenticated",
  email: "dev@example.com",
};

const mockMember = {
  id: "dev-member",
  user_id: "dev-user",
  full_name: "Usuário de Desenvolvimento",
  cpf: "000.000.000-00",
  rg: "00000000-0",
  address: "Rua de Teste, 123",
  active: true,
  membership_expiry: new Date(2025, 0, 1).toISOString(),
  photo_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=dev",
  id_document_url: "https://example.com/document.pdf",
  address_proof_url: "https://example.com/proof.pdf",
  certificate_url: "https://example.com/certificate.pdf",
};

// Mock data para cursos
export const mockCourses = [
  {
    id: "1",
    title: "Introdução à Psicologia Clínica",
    description:
      "Um curso abrangente sobre os fundamentos da psicologia clínica moderna.",
    instructor: "Dra. Maria Silva",
    duration: 20,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Terapia Cognitivo-Comportamental",
    description: "Aprenda as técnicas e aplicações práticas da TCC.",
    instructor: "Dr. João Santos",
    duration: 15,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Psicologia Infantil",
    description: "Desenvolvimento infantil e técnicas de intervenção.",
    instructor: "Dra. Ana Oliveira",
    duration: 25,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Mock data para materiais dos cursos
export const mockCourseMaterials = [
  {
    id: "1",
    course_id: "1",
    title: "Apostila do Curso",
    type: "pdf",
    url: "https://example.com/material1.pdf",
  },
  {
    id: "2",
    course_id: "1",
    title: "Material Complementar",
    type: "pdf",
    url: "https://example.com/material2.pdf",
  },
];

// Mock data para aulas gravadas
export const mockRecordedClasses = [
  {
    id: "1",
    course_id: "1",
    title: "Aula 1 - Introdução",
    description: "Conceitos básicos e história da psicologia clínica",
    video_url: "https://example.com/video1.mp4",
    duration: 60,
    order: 1,
  },
  {
    id: "2",
    course_id: "1",
    title: "Aula 2 - Fundamentos",
    description: "Principais teorias e abordagens",
    video_url: "https://example.com/video2.mp4",
    duration: 45,
    order: 2,
  },
];

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Em desenvolvimento, usa o usuário mock
    if (import.meta.env.DEV) {
      setUser(mockUser);
      setLoading(false);
      return;
    }

    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state (signed in, signed out, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    if (import.meta.env.DEV) {
      setUser(mockUser);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    if (import.meta.env.DEV) {
      setUser(mockUser);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    if (import.meta.env.DEV) {
      setUser(null);
      return;
    }

    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
