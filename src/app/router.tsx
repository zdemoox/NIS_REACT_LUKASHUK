import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "@shared/lib/hooks";
import { PrivateLayout } from "@widgets/layouts/PrivateLayout";

const LoginPage = lazy(() => import("@pages/login"));
const RegisterPage = lazy(() => import("@pages/register"));
const DashboardPage = lazy(() => import("@pages/dashboard"));
const ProductsPage = lazy(() => import("@pages/products"));
const ProductDetailsPage = lazy(() => import("@pages/product-details"));
const ProfilePage = lazy(() => import("@pages/profile"));
const SettingsPage = lazy(() => import("@pages/settings"));
const NotFoundPage = lazy(() => import("@pages/not-found"));
const LogoutPage = lazy(() => import("@pages/logout"));

const Loader = () => <div>Loading...</div>;

function PrivateRoute({ children }: { children: JSX.Element }) {
  const isAuth = useAppSelector((state) => !!state.auth.token);
  if (!isAuth) return <Navigate to="/login" replace />;
  return children;
}

function PublicRoute({ children }: { children: JSX.Element }) {
  const isAuth = useAppSelector((state) => !!state.auth.token);
  if (isAuth) return <Navigate to="/" replace />;
  return children;
}

export const AppRouter = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <PrivateLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductDetailsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="logout" element={<LogoutPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
);

