import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import LoginPage from "./pages/login";
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
import AuthProvider from "./lib/auth";
import { ProtectedRoute } from "./components/auth/protected-route";

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
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/members"
            element={
              <ProtectedRoute>
                <AdminMembersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/finances"
            element={
              <ProtectedRoute>
                <AdminFinancesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/courses"
            element={
              <ProtectedRoute>
                <AdminCoursesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/library"
            element={
              <ProtectedRoute>
                <AdminLibraryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/support"
            element={
              <ProtectedRoute>
                <AdminSupportPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/layout"
            element={
              <ProtectedRoute>
                <AdminLayoutPage />
              </ProtectedRoute>
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
