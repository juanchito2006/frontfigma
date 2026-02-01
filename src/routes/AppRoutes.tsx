/**
 * AppRoutes - Configuración de rutas con React Router v6
 * 
 * Define todas las rutas de la aplicación usando React Router v6.
 * Este archivo centraliza la configuración de navegación y mapea
 * cada ruta a su componente correspondiente.
 * 
 * Estructura de rutas:
 * - / - Dashboard principal
 * - /clientes/* - Gestión de clientes
 * - /valoraciones/* - Gestión de valoraciones
 * - /ejercicios/* - Gestión de ejercicios
 * - /calendario - Vista de calendario
 * - /configuracion - Configuración del sistema
 * - /perfil - Perfil del usuario
 * 
 * React Router v6 características principales:
 * - <Routes> reemplaza a <Switch> de v5
 * - <Route> usa prop "element" en lugar de "component" o "render"
 * - useNavigate() reemplaza a useHistory()
 * - Rutas anidadas más simples con rutas relativas
 * - Sistema de coincidencia de rutas mejorado
 */


import { Routes, Route, Navigate } from "react-router-dom"
import {
  Dashboard,
  ClientesCrear,
  ClientesVer,
  ClienteDetalle,
  ValoracionesCrear,
  ValoracionesVer,
  ValoracionDetalle,
  ValoracionEditar,
  ValoracionVisualizarCompleta,
  EjerciciosCrear,
  EjerciciosVer,
  EjercicioEditar,   // 👈 AÑADIR ESTO
  Calendario,
  Configuracion,
  Perfil
} from "../pages"
import { EstadisticasGym } from "../pages/EstadisticasGym"

/**
 * AppRoutes - Componente que define todas las rutas de la aplicación
 * 
 * Utiliza React Router v6 para el manejo de navegación.
 * Todas las rutas están protegidas y requieren autenticación.
 * 
 * @returns Configuración de rutas con React Router v6
 */
export function AppRoutes() {
  return (
    <Routes>
      {/* Ruta principal - Dashboard */}
      <Route path="/" element={<Dashboard />} />

      {/* 
        Rutas de Clientes
        - /clientes/crear - Formulario de creación
        - /clientes/ver - Lista de clientes con búsqueda
        - /clientes/:id - Perfil detallado de un cliente
        - /clientes/:id/editar - Formulario de edición
      */}
      <Route path="/clientes">
        <Route path="crear" element={<ClientesCrear />} />
        <Route path="ver" element={<ClientesVer />} />
        <Route path=":id" element={<ClienteDetalle />} />
      </Route>

      {/* 
        Rutas de Valoraciones
        - /valoraciones/crear - Formulario de creación de valoración
        - /valoraciones/ver - Lista de valoraciones con búsqueda
        - /valoraciones/:id - Detalle completo de valoración (solo lectura)
        - /valoraciones/:id/ver - Visualizar valoración completa con diseño de crear
        - /valoraciones/:id/editar - Formulario de edición de valoración
      */}
      <Route path="/valoraciones">
        <Route path="crear" element={<ValoracionesCrear />} />
        <Route path="ver" element={<ValoracionesVer />} />
        <Route path=":id" element={<ValoracionDetalle />} />
        <Route path=":id/ver" element={<ValoracionVisualizarCompleta />} />
        <Route path=":id/editar" element={<ValoracionEditar />} />
      </Route>

      {/* 
  Rutas de Ejercicios
  - /ejercicios/crear - Crear ejercicio
  - /ejercicios/ver - Ver ejercicios
  - /ejercicios/:id/editar - Editar ejercicio
*/}
      <Route path="/ejercicios">
        <Route path="crear" element={<EjerciciosCrear />} />
        <Route path="ver" element={<EjerciciosVer />} />
        <Route path=":id/editar" element={<EjercicioEditar />} />
      </Route>


      {/* 
        Rutas independientes
        - /calendario - Vista de calendario con valoraciones programadas
        - /estadisticas - Estadísticas del gimnasio
        - /configuracion - Configuración del sistema y permisos
        - /perfil - Perfil del usuario autenticado
      */}
      <Route path="/calendario" element={<Calendario />} />
      <Route path="/estadisticas" element={<EstadisticasGym />} />
      <Route path="/configuracion" element={<Configuracion />} />
      <Route path="/perfil" element={<Perfil />} />

      {/* 
        Ruta catch-all para manejar rutas no encontradas
        Redirige al dashboard principal
      */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

/**
 * Mapeo de IDs de sección a rutas
 * Útil para conversión desde el sistema anterior de navegación por estado
 */
export const sectionToRoute: Record<string, string> = {
  'menu-principal': '/',
  'crear-cliente': '/clientes/crear',
  'ver-clientes': '/clientes/ver',
  'perfil-usuario': '/clientes', // Requiere ID dinámico
  'editar-cliente': '/clientes', // Requiere ID dinámico
  'crear-valoracion': '/valoraciones/crear',
  'ver-valoracion': '/valoraciones/ver',
  'detalle-valoracion': '/valoraciones', // Requiere ID dinámico
  'editar-valoracion': '/valoraciones', // Requiere ID dinámico
  'crear-ejercicios': '/ejercicios/crear',
  'ver-ejercicios': '/ejercicios/ver',
  'calendario': '/calendario',
  'estadisticas-gym': '/estadisticas',
  'configuracion': '/configuracion',
  'perfil': '/perfil'
}

/**
 * Mapeo de rutas a IDs de sección
 * Útil para determinar la sección activa en la barra lateral
 */
export const routeToSection: Record<string, string> = {
  '/': 'menu-principal',
  '/clientes/crear': 'crear-cliente',
  '/clientes/ver': 'ver-clientes',
  '/valoraciones/crear': 'crear-valoracion',
  '/valoraciones/ver': 'ver-valoracion',
  '/ejercicios/crear': 'crear-ejercicios',
  '/ejercicios/ver': 'ver-ejercicios',
  '/calendario': 'calendario',
  '/estadisticas': 'estadisticas-gym',
  '/configuracion': 'configuracion',
  '/perfil': 'perfil'
}

/**
 * Tipo que define los identificadores de las secciones del sistema
 * Mantiene compatibilidad con el código existente
 */
export type SectionId =
  | 'menu-principal'
  | 'crear-cliente'
  | 'ver-clientes'
  | 'perfil-usuario'
  | 'editar-cliente'
  | 'crear-valoracion'
  | 'ver-valoracion'
  | 'detalle-valoracion'
  | 'editar-valoracion'
  | 'exportar-valoracion'
  | 'crear-ejercicios'
  | 'ver-ejercicios'
  | 'calendario'
  | 'estadisticas-gym'
  | 'configuracion'
  | 'ayuda'
  | 'perfil'
