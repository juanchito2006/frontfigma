import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Badge } from "../components/ui/badge"
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react"
import { useList, useDelete } from "../hooks/useGenericCrud"
import type { Usuario } from "../types/schema.types"
import { toast } from "sonner"

export function ClientesVer() {
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState("")

  // Obtener usuarios
  const {
    data: usuario,
    isLoading,
    error
  } = useList<Usuario>({
    resourceName: "usuario",
    queryOptions: {
      staleTime: 0.2 * 60 * 1000,
    }
  })

  const deleteMutation = useDelete("usuario")

  // Filtrar por búsqueda
  const filteredClientes = usuario?.filter(u =>
    u.usu_nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.usu_apellido?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.usu_di?.toString().includes(searchTerm) ||
    u.usu_email?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const handleDelete = (id: number) => {
    if (window.confirm("¿Está seguro de eliminar este cliente?")) {
      deleteMutation.mutate(id, {
        onSuccess: () => toast.success("Cliente eliminado exitosamente"),
        onError: (error) => toast.error(`Error al eliminar: ${error.message}`)
      })
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-green-700 mb-2">Clientes</h1>
        <p className="text-gray-600">Gestión de clientes del sistema</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Lista de Clientes</CardTitle>
              <CardDescription>
                {searchTerm.trim() === ""
                  ? "Escribe para buscar clientes"
                  : `${filteredClientes.length} cliente(s) encontrado(s)`}
              </CardDescription>
            </div>
            <Button
              onClick={() => navigate("/clientes/crear")}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Cliente
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* Input de búsqueda */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nombre, documento o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Manejo de estados */}
          {searchTerm.trim() === "" ? (
            <div className="text-center py-8 text-gray-500">
              Escribe para buscar clientes...
            </div>
          ) : isLoading ? (
            <div className="text-center py-8 text-gray-500">
              Cargando clientes...
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              Error al cargar clientes: {error.message}
            </div>
          ) : filteredClientes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No se encontraron clientes
            </div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Documento</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredClientes.map((cliente) => (
                    <TableRow key={cliente.usu_di}>
                      <TableCell>
                        {cliente.usu_nombre} {cliente.usu_apellido}
                      </TableCell>
                      <TableCell>{cliente.usu_di}</TableCell>
                      <TableCell>{cliente.usu_email}</TableCell>
                      <TableCell>{cliente.usu_telefono}</TableCell>
                      <TableCell>
                        <Badge variant={cliente.usu_status ? "default" : "secondary"}>
                          {cliente.usu_status ? "Activo" : "Inactivo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/clientes/${cliente.usu_di}`)}
                            title="Ver detalles"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/clientes/${cliente.usu_di}/editar`)}
                            title="Editar"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(cliente.usu_di)}
                            disabled={deleteMutation.isPending}
                            title="Eliminar"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
