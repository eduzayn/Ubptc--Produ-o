import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "./supabase";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
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

export const mockMember = {
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

// Mock data para e-books
export const mockEbooks = [
  {
    id: "1",
    title: "Fundamentos da Psicanálise",
    description: "Uma introdução aos conceitos básicos da psicanálise.",
    category: "Psicanálise",
    cover_url:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80",
    file_url: "https://example.com/ebook1.pdf",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Terapia Cognitiva na Prática",
    description: "Guia prático para aplicação da terapia cognitiva.",
    category: "Terapia Cognitiva",
    cover_url:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&q=80",
    file_url: "https://example.com/ebook2.pdf",
    created_at: new Date().toISOString(),
  },
];

// Mock data para tickets de suporte
export const mockSupportTickets = [
  {
    id: "1",
    member_id: "dev-member",
    title: "Problema com acesso ao curso",
    description: "Não consigo acessar o material do curso de Psicanálise.",
    status: "open",
    priority: "high",
    category: "technical",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    member_id: "dev-member",
    title: "Dúvida sobre renovação",
    description: "Gostaria de saber como renovar minha associação.",
    status: "closed",
    priority: "medium",
    category: "billing",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Em desenvolvimento, usa o usuário mock
    if (import.meta.env.DEV) {
      setUser(mockUser);
      setIsAdmin(import.meta.env.VITE_DEV_ADMIN === "true");
      setLoading(false);
      return;
    }

    // Em produção, verifica se há uma sessão ativa
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        const currentUser = data.session?.user || null;
        setUser(currentUser);
        
        // Verifica se o usuário é admin
        if (currentUser) {
          const { data: adminData, error: adminError } = await supabase
            .from("admin_roles")
            .select("*")
            .eq("user_id", currentUser.id)
            .maybeSingle();
            
          if (adminError) {
            console.error("Error checking admin role:", adminError);
            setIsAdmin(false);
          } else {
            setIsAdmin(!!adminData);
          }
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error("Error checking auth session:", err);
        setUser(null);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Escuta mudanças no estado de autenticação
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

    try {
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
    } catch (err) {
      console.error("Error signing up:", err);
      throw err;
    }
  };

  const signIn = async (email: string, password: string) => {
    if (import.meta.env.DEV) {
      setUser(mockUser);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (err) {
      console.error("Error signing in:", err);
      throw err;
    }
  };

  const signOut = async () => {
    if (import.meta.env.DEV) {
      setUser(null);
      return;
    }

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err) {
      console.error("Error signing out:", err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, signIn, signUp, signOut }}>
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
