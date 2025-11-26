/**
 * DashboardLayout - Layout principal del dashboard con React Router v6
 * 
 * Componente de layout que estructura la interfaz del panel de administración.
 * Incluye el header superior, la barra lateral de navegación y el área de contenido principal.
 * 
 * Integración con React Router v6:
 * - Usa useLocation() para determinar la sección activa basada en la URL
 * - Usa useNavigate() en lugar de callbacks para cambiar de sección
 * - La navegación ahora modifica la URL del navegador
 * 
 * Estructura:
 * - Header: Logo, título de página, menú de usuario
 * - Sidebar: Navegación entre secciones con React Router
 * - Main: Contenido dinámico según la ruta activa
 * 
 * @param children - Contenido principal a renderizar (desde AppRoutes)
 */

import { ReactNode } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { DashboardHeader } from "./DashboardHeader"
import { Sidebar } from "./Sidebar"
import { Toaster } from "../ui/sonner"
import { routeToSection, sectionToRoute } from "../../routes/AppRoutes"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()

  /**
   * Determina la sección activa basada en la ruta actual
   * Mapea la URL a un ID de sección para el sidebar
   */
  const getActiveSectionFromPath = (): string => {
    const path = location.pathname
    
    // Rutas exactas
    if (routeToSection[path]) {
      return routeToSection[path]
    }
    
    // Rutas con parámetros (cliente o valoración específica)
    if (path.startsWith('/clientes/') && path.endsWith('/editar')) {
      return 'editar-cliente'
    }
    if (path.startsWith('/clientes/') && path.match(/^\/clientes\/\d+$/)) {
      return 'perfil-usuario'
    }
    if (path.startsWith('/clientes/')) {
      return 'ver-clientes'
    }
    
    if (path.startsWith('/valoraciones/') && path.endsWith('/editar')) {
      return 'editar-valoracion'
    }
    if (path.startsWith('/valoraciones/') && path.match(/^\/valoraciones\/\d+$/)) {
      return 'detalle-valoracion'
    }
    if (path.startsWith('/valoraciones/')) {
      return 'ver-valoracion'
    }
    
    if (path.startsWith('/ejercicios/')) {
      return 'ver-ejercicios'
    }
    
    // Por defecto, dashboard
    return 'menu-principal'
  }

  /**
   * Maneja el cambio de s
    if (route) {ección navegando a la ruta correspondiente
   * Convierte el ID de sección a una ruta y navega usando React Router
   * 
   * @param sectionId - ID de la sección a la que navegar
   */
  const handleSectionChange = (sectionId: string) => {
    const route = sectionToRoute[sectionId]
    if (route) {
      navigate(route)
    }
  }

  const activeSection = getActiveSectionFromPath()

  return (
    <div className="flex flex-col h-screen">
      {/* Header superior con logo y menú de usuario */}
      <DashboardHeader currentPage={activeSection} />
      {/* Contenedor flex para sidebar y contenido principal */}
      <div className="flex flex-1 overflow-hidden">
        {/* 
          Barra lateral de navegación
          Recibe el ID de sección activa y callback de navegación
        */}
        <Sidebar
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />
        {/* 
          Área de contenido principal con scroll
          El contenido viene de AppRoutes según la ruta activa
        */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
      {/* Componente de notificaciones toast */}
      <Toaster />
    </div>
  )
}
