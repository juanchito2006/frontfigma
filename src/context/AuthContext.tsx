/**
 * AuthContext - Contexto de Autenticación
 * 
 * Proporciona el estado de autenticación y métodos para login/logout
 * a toda la aplicación. Maneja la persistencia de sesión en localStorage
 * con una expiración de 24 horas.
 * 
 * @exports useAuth - Hook personalizado para acceder al contexto de autenticación
 * @exports AuthProvider - Proveedor del contexto que envuelve la aplicación
 */

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

/**
 * Interfaz que define los datos del usuario autenticado
 */
interface User {
  username: string
  name: string
  email: string
  role: string
}

/**
 * Interfaz que define el tipo del contexto de autenticación
 */
interface AuthContextType {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
  user: User
}

/**
 * Props del proveedor de autenticación
 */
interface AuthProviderProps {
  children: ReactNode
}

// Crear el contexto con valor por defecto undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * Hook personalizado para acceder al contexto de autenticación
 * @throws Error si se usa fuera del AuthProvider
 * @returns Objeto con estado y métodos de autenticación
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

/**
 * Proveedor del contexto de autenticación
 * Maneja el estado de autenticación y persistencia en localStorage
 * 
 * @param children - Componentes hijos que tendrán acceso al contexto
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  // Datos del usuario (en producción vendrían del backend)
  const user: User = {
    username: 'admin',
    name: 'Administrador del Sistema',
    email: 'admin@combarranquilla.com',
    role: 'Administrador'
  }

  /**
   * Efecto que verifica el estado de autenticación al cargar la aplicación
   * Valida si existe una sesión guardada y si no ha expirado
   */
  useEffect(() => {
    const checkAuthStatus = () => {
      const authStatus = localStorage.getItem("isAuthenticated")
      const loginTime = localStorage.getItem("loginTime")
      
      if (authStatus === "true" && loginTime) {
        const currentTime = Date.now()
        const storedTime = parseInt(loginTime)
        const twentyFourHours = 24 * 60 * 60 * 1000
        
        // Verificar si la sesión no ha expirado (24 horas)
        if (currentTime - storedTime < twentyFourHours) {
          setIsAuthenticated(true)
        } else {
          // Sesión expirada, limpiar localStorage
          localStorage.removeItem("isAuthenticated")
          localStorage.removeItem("loginTime")
        }
      }
      
      setIsLoading(false)
    }

    checkAuthStatus()
  }, [])

  /**
   * Función para iniciar sesión
   * Actualiza el estado y guarda en localStorage
   */
  const login = () => {
    setIsAuthenticated(true)
  }

  /**
   * Función para cerrar sesión
   * Limpia el estado y remueve datos de localStorage
   */
  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("loginTime")
  }

  // Mostrar pantalla de carga mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {/* Ref oculto para acceso programático al logout (debugging) */}
      <div data-auth-context="true" style={{ display: 'none' }} ref={(el) => {
        if (el) (el as any).logout = logout;
      }} />
      {children}
    </AuthContext.Provider>
  )
}
