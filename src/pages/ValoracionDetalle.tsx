/**
 * ValoracionDetalle - Página de detalle de valoración
 * 
 * Muestra la información completa de una valoración específica (solo lectura)
 */

import { useParams, useNavigate } from "react-router-dom"
import { ValoracionDetailView } from "../components/ValoracionDetailView"

export function ValoracionDetalle() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  // Convertir id a número
  const valoracionId = id ? parseInt(id) : null
  
  if (!valoracionId) {
    return (
      <div className="p-6 bg-gray-50 min-h-full">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Valoración no encontrada</h1>
        </div>
      </div>
    )
  }
  
  return (
    <ValoracionDetailView 
      valoracionId={valoracionId}
      onBack={() => navigate("/valoraciones/ver")}
      onEdit={(id) => navigate(`/valoraciones/${id}/editar`)}
    />
  )
}
