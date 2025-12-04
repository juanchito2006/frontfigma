import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { ArrowLeft, User, Edit } from "lucide-react"

interface UserProfileViewProps {
  userId: number
  onNavigateBack: () => void
  onNavigateToEdit?: (userId: number) => void
}

export function UserProfileView({ userId, onNavigateBack, onNavigateToEdit }: UserProfileViewProps) {
  const [usuario, setUsuario] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUsuario()
  }, [userId])

  const loadUsuario = async () => {
    setLoading(true)
    try {
      const response = await fetch(`https://gym-combarranquilla-2.onrender.com/usuario/${userId}`)
      const data = await response.json()

      if (response.ok) {
        setUsuario(data)
      } else {
        setUsuario(null)
      }
    } catch (error) {
      console.error("Error cargando usuario:", error)
      setUsuario(null)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Cargando información del usuario...
      </div>
    )
  }

  if (!usuario) {
    return (
      <div className="p-6">
        <Button variant="ghost" onClick={onNavigateBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Volver
        </Button>
        <Card>
          <CardContent className="py-8 text-center text-gray-500">
            Usuario no encontrado
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onNavigateBack}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Volver
          </Button>
          <h1 className="text-2xl font-semibold text-gray-800">Perfil de Usuario</h1>
        </div>

        {onNavigateToEdit && (
          <Button
            onClick={() => onNavigateToEdit(userId)}
            className="bg-green-700 hover:bg-green-800 text-white flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Editar Usuario
          </Button>
        )}
      </div>

      {/* INFO PERSONAL */}
      <Card className="rounded-xl overflow-hidden">
        <CardHeader className="bg-green-700 text-white">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" /> Información Personal
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <div>
              <p className="text-sm text-gray-600 mb-1">Nombre Completo</p>
              <div className="p-3 bg-gray-50 rounded-xl">
                {usuario.usu_nombre} {usuario.usu_apellido}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Documento</p>
              <div className="p-3 bg-gray-50 rounded-xl">
                {usuario.usu_di}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Email</p>
              <div className="p-3 bg-gray-50 rounded-xl">
                {usuario.usu_email}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Teléfono</p>
              <div className="p-3 bg-gray-50 rounded-xl">
                {usuario.usu_telefono || "No especificado"}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Dirección</p>
              <div className="p-3 bg-gray-50 rounded-xl">
                {usuario.usu_direccion || "No especificada"}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Sexo</p>
              <div className="p-3 bg-gray-50 rounded-xl">
                {usuario.usu_sexo || "No especificada"}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Eps</p>
              <div className="p-3 bg-gray-50 rounded-xl">
                {usuario.usu_eps || "No especificada"}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Estado</p>
              <Badge className="bg-green-100 text-green-800">
                {usuario.usu_status ? "Activo" : "Inactivo"}
              </Badge>
            </div>

          </div>

          {/* FOOTER */}
          <div className="mt-6 pt-4 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-600">Fecha de creación:</span>{" "}
              {usuario.fecha_creacion}
            </div>
          </div>

        </CardContent>
      </Card>

    </div>
  )
}
