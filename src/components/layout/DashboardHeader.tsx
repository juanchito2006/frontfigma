/**
 * DashboardHeader - Encabezado principal del dashboard
 * 
 * Componente que muestra el header superior con:
 * - Logo de la institución
 * - Título de la página actual
 * - Subtítulo con el nombre del centro
 * - Menú de usuario (dropdown)
 * 
 * @param currentPage - Identificador de la página actual para mostrar el título correspondiente
 */

import { UserDropdown } from "../common/UserDropdown"
import logo from 'figma:asset/983aef9ca835aa855480359e8280e9e504dc61d3.png'

interface DashboardHeaderProps {
  currentPage?: string
}

/**
 * Mapeo de identificadores de página a títulos legibles
 */
const PAGE_TITLES: { [key: string]: string } = {
  'menu-principal': 'Dashboard',
  'crear-cliente': 'Crear Cliente',
  'ver-clientes': 'Ver Clientes',
  'perfil-usuario': 'Perfil de Cliente',
  'editar-cliente': 'Editar Cliente',
  'crear-valoracion': 'Crear Valoración',
  'ver-valoracion': 'Ver Valoraciones',
  'detalle-valoracion': 'Detalle de Valoración',
  'editar-valoracion': 'Editar Valoración',
  'exportar-valoracion': 'Exportar Valoraciones',
  'crear-ejercicios': 'Crear Ejercicios',
  'ver-ejercicios': 'Ver Ejercicios', 
  'estadisticas': 'Estadísticas',
  'calendario': 'Calendario',
  'configuracion': 'Configuración',
  'ayuda': 'Ayuda',
  'perfil': 'Perfil'
}

export function DashboardHeader({ currentPage }: DashboardHeaderProps) {
  /**
   * Obtiene el título legible basado en el identificador de la página
   * @param page - Identificador de la página actual
   * @returns Título formateado para mostrar en el header
   */
  const getPageTitle = (page?: string): string => {
    return PAGE_TITLES[page || 'menu-principal'] || 'Panel de Administración'
  }

  return (
    <header 
      style={{backgroundColor:"#124422"}} 
      className="text-white h-16 flex items-center px-6"
    >
      <div className="flex items-center justify-between w-full">
        {/* Logo y título de la página */}
        <div className="flex items-center gap-4">
          <div className="text-white">
            <img 
              src={logo} 
              className="h-12 w-auto" 
              alt="Caja de Compensación Familiar Logo" 
            />
          </div>
          
          {/* Separador visual */}
          <div className="h-8 w-px bg-white/30"></div>
          
          {/* Información de la página actual */}
          <div>
            <h1 className="text-xl font-semibold">{getPageTitle(currentPage)}</h1>
            <p className="text-sm text-white/80">
              Combarranquilla Centro de Entrenamiento Deportivo
            </p>
          </div>
        </div>
        
        {/* Menú desplegable del usuario */}
        <UserDropdown />
      </div>
    </header>
  )
}
