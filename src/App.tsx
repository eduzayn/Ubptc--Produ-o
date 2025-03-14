import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import LoginPage from "./pages/login";
const AdminDashboardPage = lazy(() => import("./pages/admin/dashboard-new"));
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
import AuthProvider from "./lib/auth";
import { ProtectedRoute } from "./components/auth/protected-route";
import { AdminProtectedRoute } from "./components/auth/admin-protected-route";

function App() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <AuthProvider>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/join/success" element={<JoinSuccessPage />} />
          <Route path="/validate/:id" element={<ValidateCredentialPage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Rotas protegidas */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <CoursesPage />
              </ProtectedRoute>
            }
          />
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
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboardPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/members"
            element={
              <AdminProtectedRoute>
                <AdminMembersPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/finances"
            element={
              <AdminProtectedRoute>
                <AdminFinancesPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/courses"
            element={
              <AdminProtectedRoute>
                <AdminCoursesPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/library"
            element={
              <AdminProtectedRoute>
                <AdminLibraryPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/support"
            element={
              <AdminProtectedRoute>
                <AdminSupportPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/layout"
            element={
              <AdminProtectedRoute>
                <AdminLayoutPage />
              </AdminProtectedRoute>
            }
          />

          {/* Rota padrão - redireciona para home */}
          <Route path="*" element={<Navigate to="/" replace />} />

          {/* Tempo routes */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
