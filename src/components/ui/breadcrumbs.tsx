import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

// Mapeamento de rotas para nomes amigáveis
const routeLabels: Record<string, string> = {
  "": "Home",
  "dashboard": "Dashboard",
  "profile": "Perfil",
  "courses": "Cursos",
  "library": "Biblioteca",
  "support": "Suporte",
  "admin": "Admin",
  "members": "Associados",
  "finances": "Financeiro",
  "layout": "Layout",
  "settings": "Configurações",
  "about": "Sobre Nós",
  "join": "Associe-se",
  "contact": "Contato",
};

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const location = useLocation();
  
  // Se não houver items fornecidos, gera automaticamente com base na URL atual
  const breadcrumbItems = items || generateBreadcrumbs(location.pathname);
  
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-sm text-gray-500 ${className}`}>
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/" className="hover:text-blue-600 flex items-center">
            <Home className="h-4 w-4" />
          </Link>
        </li>
        
        {breadcrumbItems.map((item, index) => (
          <li key={item.path} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-1" />
            {index === breadcrumbItems.length - 1 ? (
              <span className="font-medium text-gray-900">{item.label}</span>
            ) : (
              <Link to={item.path} className="hover:text-blue-600">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Função para gerar breadcrumbs automaticamente com base na URL
function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const paths = pathname.split('/').filter(Boolean);
  
  return paths.map((path, index) => {
    const url = '/' + paths.slice(0, index + 1).join('/');
    const label = routeLabels[path] || path;
    
    return {
      label,
      path: url
    };
  });
}
