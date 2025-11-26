/**
 * ClienteDetalle - Página de perfil de cliente
 * 
 * Muestra la información detallada de un cliente específico
 */

import { useParams, useNavigate } from "react-router-dom"
import { UserProfileView } from "../components/UserProfileView"

export function ClienteDetalle() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  // Convertir id a número
  const userId = id ? parseInt(id) : null
  
  if (!userId) {
    return (
      <div className="p-6 bg-gray-50 min-h-full">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Cliente no encontrado</h1>
        </div>
      </div>
    )
  }
  
  return (
    <UserProfileView 
      userId={userId}
      onBack={() => navigate("/clientes/ver")}
      onNavigateToEdit={(userId) => navigate(`/clientes/${userId}/editar`)}
    />
  )
}
