/**
 * ClientesVer - Página para ver la lista de clientes
 * 
 * Muestra la tabla de clientes con búsqueda y opciones de acción
 */

import { AdminContent } from "../components/AdminContent"
import { useNavigate } from "react-router-dom"

export function ClientesVer() {
  const navigate = useNavigate()
  
  return (
    <AdminContent 
      activeSection="ver-clientes"
      onNavigateToUserProfile={(userId) => navigate(`/clientes/${userId}`)}
      onNavigateToEditUser={(userId) => navigate(`/clientes/${userId}/editar`)}
    />
  )
}
