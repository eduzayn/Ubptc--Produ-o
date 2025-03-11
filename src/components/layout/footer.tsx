import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gray-100 py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">UBPCT</h3>
            <p className="text-gray-600">
              União Brasileira de Psicanalistas e Terapeutas Clínicos
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-gray-900">
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Cursos
                </Link>
              </li>
              <li>
                <Link to="/join" className="text-gray-600 hover:text-gray-900">
                  Associe-se
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 text-gray-600">
              <li>contato@ubpct.org.br</li>
              <li>(11) 9999-9999</li>
              <li>São Paulo, SP</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              {[
                { name: "Facebook", icon: "F" },
                { name: "Instagram", icon: "I" },
                { name: "LinkedIn", icon: "L" },
                { name: "YouTube", icon: "Y" },
              ].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          <p>
            © {new Date().getFullYear()} UBPCT. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
