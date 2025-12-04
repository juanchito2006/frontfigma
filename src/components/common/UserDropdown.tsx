/**
 * UserDropdown - Menú desplegable de usuario
 * 
 * Componente que muestra la información del usuario actual
 * y opciones como configuración, perfil y cerrar sesión.
 * 
 * Incluye:
 * - Avatar con iniciales del usuario
 * - Información del usuario (nombre, email, rol)
 * - Enlaces a configuración y perfil
 * - Opción de cerrar sesión
 * 
 * Se muestra en el header superior derecho del dashboard
 */

import { Button } from "../ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "../ui/dropdown-menu"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { useAuth } from "../../context/AuthContext"
import { User, ChevronDown, LogOut, Mail, Shield, Settings } from "lucide-react"

export function UserDropdown() {
  const { user, logout } = useAuth()

  /**
   * Genera las iniciales del nombre del usuario
   * @param name - Nombre completo del usuario
   * @returns Iniciales en mayúsculas (máximo 2 caracteres)
   */
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase()
  }

  /**
   * Maneja el cierre de sesión del usuario
   */
  const handleLogout = () => {
    logout()
  }

  return (
    <DropdownMenu>
      {/* Trigger: Avatar y nombre del usuario */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto p-2 text-white hover:bg-white/10 hover:text-white"
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-white/20 text-white text-sm">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <span className="text-sm">{user.name}</span>
              <span className="text-xs text-white/70">{user.role}</span>
            </div>
            <ChevronDown className="h-4 w-4 ml-1" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      
      {/* Contenido del menú desplegable */}
      <DropdownMenuContent className="w-80" align="end" sideOffset={8}>
        {/* Header del usuario con avatar grande */}
        <div className="flex items-center gap-3 p-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-green-100 text-green-800 text-lg">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <DropdownMenuLabel className="p-0 text-base">
              {user.name}
            </DropdownMenuLabel>
            <p className="text-sm text-gray-500">@{user.username}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Información del usuario */}
        <DropdownMenuItem className="flex items-center gap-3 p-3">
          <Mail className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-700">{user.email}</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="flex items-center gap-3 p-3">
          <Shield className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-700">{user.role}</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="flex items-center gap-3 p-3">
          <User className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-700">Sesión activa</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Opciones adicionales */}
        <DropdownMenuItem className="p-3 cursor-pointer">
          <Settings className="h-4 w-4 mr-3" />
          <div>
            <div className="text-sm">Configuración</div>
            <div className="text-xs text-gray-500">Personalizar cuenta</div>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="p-3 cursor-pointer">
          <User className="h-4 w-4 mr-3" />
          <div>
            <div className="text-sm">Mi Perfil</div>
            <div className="text-xs text-gray-500">Ver información personal</div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Botón de cerrar sesión */}
        <DropdownMenuItem 
          className="p-3 cursor-pointer focus:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-3 text-red-600" />
          <span className="text-red-600">Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
