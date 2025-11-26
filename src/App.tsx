/**
 * App - Componente raíz de la aplicación
 *
 * Punto de entrada principal del panel de administración.
 * Gestiona la autenticación y configura React Router v6 para la navegación.
 *
 * Estructura:
 * - AuthProvider: Proporciona contexto de autenticación
 * - ValoracionProvider: Proporciona contexto de valoraciones
 * - BrowserRouter: Habilita React Router v6
 * - AppContent: Contenido principal con routing
 *
 * React Router v6 permite navegación basada en URL en lugar de estado,
 * facilitando el uso de enlaces directos, historial del navegador y mejor SEO.
 *
 * @see /context/AuthContext.tsx - Gestión de autenticación
 * @see /context/ValoracionContext.tsx - Gestión de valoraciones
 * @see /routes/AppRoutes.tsx - Configuración de rutas
 */

import { BrowserRouter } from "react-router-dom";
import { DashboardLayout } from "./components/layout";
import { AppRoutes } from "./routes/AppRoutes";
import { Login } from "./pages/Login";
import {
  AuthProvider,
  useAuth,
  ValoracionProvider,
} from "./context";

/**
 * AppContent - Contenido principal de la aplicación
 *
 * Maneja la lógica de autenticación y renderiza el layout con las rutas.
 * Requiere estar dentro de AuthProvider, ValoracionProvider y BrowserRouter.
 */
function AppContent() {
  const { isAuthenticated, login } = useAuth();

  // Si no está autenticado, mostrar pantalla de login
  if (!isAuthenticated) {
    return <Login onLogin={login} />;
  }

  // Usuario autenticado: mostrar layout con rutas
  return (
    <DashboardLayout>
      {/* AppRoutes renderiza el componente apropiado según la ruta actual */}
      <AppRoutes />
    </DashboardLayout>
  );
}

/**
 * App - Componente raíz exportado
 *
 * Envuelve la aplicación con los providers necesarios:
 * - BrowserRouter: Habilita React Router v6 para navegación
 * - AuthProvider: Gestión de autenticación y sesión
 * - ValoracionProvider: Gestión del estado de valoraciones
 *
 * Orden importante:
 * 1. BrowserRouter debe envolver todo para que useNavigate funcione
 * 2. AuthProvider proporciona estado de autenticación
 * 3. ValoracionProvider proporciona datos de valoraciones
 * 4. AppContent renderiza la UI basada en autenticación
 */
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ValoracionProvider>
          <AppContent />
        </ValoracionProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}