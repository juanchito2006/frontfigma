/**
 * ClienteEditar - Página para editar un cliente
 * 
 * Permite modificar la información de un cliente existente
 */

import { useParams, useNavigate } from "react-router-dom"
import { UserEditView } from "../components/UserEditView"

export function ClienteEditar() {
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
    <UserEditView 
      userId={userId}
      onBack={() => navigate("/clientes/ver")}
    />
  )
}
