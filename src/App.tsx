import { Suspense, lazy } from "react";
import { Routes, Route, Navigate, useRoutes } from "react-router-dom";
import Home from "./components/home";
import LoginPage from "./pages/login";
import routes from "./tempo-routes";
const AdminDashboardPage = lazy(() => import("./pages/admin/dashboard"));
const AdminMembersPage = lazy(() => import("./pages/admin/members"));
const AdminFinancesPage = lazy(() => import("./pages/admin/finances"));
const AdminCoursesPage = lazy(() => import("./pages/admin/courses"));
const AdminLibraryPage = lazy(() => import("./pages/admin/library"));
const AdminSupportPage = lazy(() => import("./pages/admin/support"));
const AdminLayoutPage = lazy(() => import("./pages/admin/layout"));
import RegisterPage from "./pages/register";
import ProfilePage from "./pages/profile";
import CoursesPage from "./pages/courses";
import CourseDetailsPage from "./pages/courses/[id]";
import LibraryPage from "./pages/library";
import SupportPage from "./pages/support";
import JoinPage from "./pages/join";
import JoinSuccessPage from "./pages/join/success";
import ValidateCredentialPage from "./pages/validate/[id]";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";
import JoinDocumentsPage from "./pages/join-documents";
import { ProtectedRoute } from "./components/auth/protected-route";

function App() {
  // Tempo routes - only in development
  const tempoRoutes =
    import.meta.env.VITE_TEMPO === "true" ? useRoutes(routes) : null;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Carregando...
        </div>
      }
    >
      {tempoRoutes}
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/join/documents" element={<JoinDocumentsPage />} />
        <Route path="/join/success" element={<JoinSuccessPage />} />
        <Route path="/validate/:id" element={<ValidateCredentialPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Rotas protegidas */}
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/courses" element={<CoursesPage />} />
        <Route
          path="/courses/:id"
          element={
            <ProtectedRoute>
              <CourseDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/library"
          element={
            <ProtectedRoute>
              <LibraryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/support"
          element={
            <ProtectedRoute>
              <SupportPage />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={<Navigate to="/admin/dashboard" replace />}
        />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/members" element={<AdminMembersPage />} />
        <Route path="/admin/finances" element={<AdminFinancesPage />} />
        <Route path="/admin/courses" element={<AdminCoursesPage />} />
        <Route path="/admin/library" element={<AdminLibraryPage />} />
        <Route path="/admin/support" element={<AdminSupportPage />} />
        <Route path="/admin/layout" element={<AdminLayoutPage />} />

        {/* Rota padrão - redireciona para home */}
        <Route path="*" element={<Navigate to="/" replace />} />

        {/* Tempo routes - only in development */}
        {import.meta.env.VITE_TEMPO === "true" && <Route path="/tempobook/*" />}
      </Routes>
    </Suspense>
  );
}

export default App;
