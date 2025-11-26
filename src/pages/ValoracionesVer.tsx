/**
 * ValoracionesVer - Página para ver la lista de valoraciones
 * 
 * Muestra la tabla de valoraciones con búsqueda y opciones de acción
 */

import { AdminContent } from "../components/AdminContent"
import { useNavigate } from "react-router-dom"

export function ValoracionesVer() {
  const navigate = useNavigate()
  
  return (
    <AdminContent 
      activeSection="ver-valoracion"
      onNavigateToValoracionDetail={(valoracionId) => navigate(`/valoraciones/${valoracionId}`)}
    />
  )
}
