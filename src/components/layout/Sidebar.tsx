/**
 * Sidebar - Barra lateral de navegación con React Router v6
 * 
 * Componente de navegación principal del panel de administración.
 * Incluye menús colapsables para las secciones con sub-elementos
 * y navegación directa para secciones independientes.
 * 
 * Integración con React Router v6:
 * - Utiliza el callback onSectionChange que internamente usa navigate()
 * - La navegación ahora cambia la URL del navegador
 * - Permite enlaces directos y uso del botón atrás/adelante del navegador
 * 
 * Secciones principales:
 * - Menú Principal (Dashboard)
 * - Clientes (Crear/Ver)
 * - Valoraciones (Crear/Ver)
 * - Ejercicios (Crear/Ver)
 * - Calendario
 * - Configuración
 * - Política de Datos
 * - Perfil
 * 
 * @param activeSection - Sección actualmente seleccionada (derivada de la URL)
 * @param onSectionChange - Callback para navegar a una sección (usa navigate)
 */

import { useState } from "react"
import {
  Users,
  ClipboardList,
  Dumbbell,
  Settings,
  Shield,
  User,
  ChevronDown,
  ChevronRight,
  LayoutGrid,
  Calendar,
  Activity
} from "lucide-react"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

/**
 * Interfaz para definir un ítem del menú
 */
interface MenuItem {
  id: string
  label: string
  icon: any
  hasSubmenu: boolean
  submenu?: SubMenuItem[]
}

/**
 * Interfaz para definir un sub-ítem del menú
 */
interface SubMenuItem {
  id: string
  label: string
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  // Estado para controlar qué secciones están expandidas
  // Por defecto, expandimos las secciones principales
  const [openSections, setOpenSections] = useState<string[]>([
    'clientes',
    'valoraciones',
    'ejercicios'
  ])

  /**
   * Alterna el estado de expansión de una sección
   * @param section - ID de la sección a expandir/colapsar
   */
  const toggleSection = (section: string) => {
    setOpenSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  /**
   * Configuración de los ítems del menú principal
   * Cada ítem puede tener un submenú o navegar directamente
   */
  const menuItems: MenuItem[] = [
    {
      id: 'menu-principal',
      label: 'Dashboard',
      icon: LayoutGrid,
      hasSubmenu: false
    },
    {
      id: 'clientes',
      label: 'Afiliados',
      icon: Users,
      hasSubmenu: true,
      submenu: [
        { id: 'crear-cliente', label: 'Crear afiliado' },
        { id: 'ver-clientes', label: 'Ver afiliados' }
      ]
    },
    {
      id: 'valoraciones',
      label: 'Valoraciones',
      icon: ClipboardList,
      hasSubmenu: true,
      submenu: [
        { id: 'crear-valoracion', label: 'Crear valoracion' },
        { id: 'ver-valoracion', label: 'Ver valoracion' }
      ]
    },
    {
      id: 'ejercicios',
      label: 'Ejercicios',
      icon: Dumbbell,
      hasSubmenu: true,
      submenu: [
        { id: 'crear-ejercicios', label: 'Crear ejercicios' },
        { id: 'ver-ejercicios', label: 'Ver ejercicios' }
      ]
    },
    {
      id: 'calendario',
      label: 'Calendario',
      icon: Calendar,
      hasSubmenu: false
    },
    {
      id: 'estadisticas-gym',
      label: 'Estadísticas',
      icon: Activity,
      hasSubmenu: false
    },
    {
      id: 'configuracion',
      label: 'Configuracion',
      icon: Settings,
      hasSubmenu: false
    },
    {
      id: 'perfil',
      label: 'Perfil',
      icon: User,
      hasSubmenu: false
    }
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <div key={item.id}>
              {item.hasSubmenu ? (
                // Menú con sub-elementos (colapsable)
                <div>
                  <button
                    onClick={() => toggleSection(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors $
                      activeSection === item.id ? 'bg-gray-100' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 text-gray-600" />
                      <span className="text-gray-700">{item.label}</span>
                    </div>
                    {/* Ícono de expansión/colapso */}
                    {openSections.includes(item.id) ? (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    )}
                  </button>

                  {/* 
                    Sub-menú (visible cuando está expandido)
                    Al hacer click en un sub-ítem, navega usando React Router
                  */}
                  {openSections.includes(item.id) && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.submenu?.map((subItem) => (
                        <button
                          key={subItem.id}
                          onClick={() => onSectionChange(subItem.id)}
                          className={`w-full text-left px-3 py-1 text-sm rounded-md hover:bg-gray-100 transition-colors ${activeSection === subItem.id ? 'bg-gray-100 text-green-700 font-medium' : 'text-gray-600'
                            }`}
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                // Menú sin sub-elementos (navegación directa con React Router)
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors ${activeSection === item.id ? 'bg-gray-100 text-green-700 font-medium' : ''
                    }`}
                >
                  <item.icon className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-700">{item.label}</span>
                </button>
              )}

              {/* Separador visual después de las secciones principales */}
              {(item.id === 'clientes' || item.id === 'valoraciones' || item.id === 'ejercicios') && (
                <div className="my-3 border-b border-dashed border-gray-300"></div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}
