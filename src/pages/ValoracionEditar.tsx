/**
 * ValoracionEditar - Página para editar una valoración
 * 
 * Permite modificar la información de una valoración existente
 */

import { useParams, useNavigate } from "react-router-dom"
import { ValoracionEditView } from "../components/ValoracionEditView"

export function ValoracionEditar() {
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
    <ValoracionEditView 
      valoracionId={valoracionId}
      onBack={() => navigate("/valoraciones/ver")}
    />
  )
}
