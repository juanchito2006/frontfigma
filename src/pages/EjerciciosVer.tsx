import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Badge } from "../components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "../components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { toast } from "sonner"
import { Search, Plus, Edit, Trash2, FileImage } from "lucide-react"
import { useList, useDelete } from "../hooks/useGenericCrud"

interface Ejercicio {
  eje_id: number
  eje_nombre: string
  eje_descripcion: string
  eje_imagen: string
  eje_nivel: string
}

export function EjerciciosVer() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [categoriaFilter, setCategoriaFilter] = useState('todas')
  const [dificultadFilter, setDificultadFilter] = useState('todas')
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    ejercicioId: null as number | null,
    ejercicioNombre: ''
  })

  // Obtener ejercicios con React Query
  const {
    data: ejercicios,
    isLoading,
    error
  } = useList<Ejercicio>({
    resourceName: "ejercicio",
    queryOptions: {
      staleTime: 0.2 * 60 * 1000,
      enabled: searchTerm.length >= 3 || searchTerm.length === 0
    }
  })

  const deleteMutation = useDelete("ejercicio")

  // Filtrar ejercicios
  const filteredEjercicios = ejercicios?.filter(ejercicio => {
    const matchesSearch = ejercicio.eje_nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ejercicio.eje_descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDificultad = dificultadFilter === 'todas' || ejercicio.eje_nivel === dificultadFilter

    return matchesSearch && matchesDificultad
  }) || []

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Ejercicio eliminado exitosamente")
        setDeleteDialog({ isOpen: false, ejercicioId: null, ejercicioNombre: '' })
      },
      onError: (error: any) => {
        toast.error(`Error al eliminar: ${error.message}`)
      }
    })
  }

  const getDificultadBadgeVariant = (dificultad: string) => {
    switch (dificultad) {
      case 'Principiante':
        return 'default'
      case 'Intermedio':
        return 'secondary'
      case 'Avanzado':
        return 'destructive'
      default:
        return 'default'
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-green-700 mb-2">Ejercicios</h1>
        <p className="text-gray-600">Gestión de ejercicios del sistema</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Lista de Ejercicios</CardTitle>
              <CardDescription>
                {searchTerm.trim() === "" || searchTerm.length < 3
                  ? "Escribe al menos 3 caracteres para buscar ejercicios"
                  : `${filteredEjercicios.length} ejercicio(s) encontrado(s)`}
              </CardDescription>
            </div>
            <Button
              onClick={() => navigate('/ejercicios/crear')}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Ejercicio
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Búsqueda y filtros */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar ejercicios (mínimo 3 caracteres)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={dificultadFilter} onValueChange={setDificultadFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Todas las dificultades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las dificultades</SelectItem>
                <SelectItem value="Principiante">Principiante</SelectItem>
                <SelectItem value="Intermedio">Intermedio</SelectItem>
                <SelectItem value="Avanzado">Avanzado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabla */}
          {searchTerm.trim() === "" || searchTerm.length < 3 ? (
            <div className="text-center py-8 text-gray-500">
              Escribe al menos 3 caracteres para buscar ejercicios...
            </div>
          ) : isLoading ? (
            <div className="text-center py-8 text-gray-500">
              Cargando ejercicios...
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              Error al cargar ejercicios: {error.message}
            </div>
          ) : filteredEjercicios.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No se encontraron ejercicios
            </div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-32">Imagen</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead className="w-32">Nivel</TableHead>
                    <TableHead className="text-right w-32">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEjercicios.map((ejercicio) => (
                    <TableRow key={ejercicio.eje_id} className="h-24">
                      <TableCell>
                        {ejercicio.eje_imagen ? (
                          <img
                            src={ejercicio.eje_imagen}
                            alt={ejercicio.eje_nombre}
                            className="w-20 h-20 object-cover rounded-lg shadow-sm"
                            onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/80x80?text=Sin+Imagen'
                            }}
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                            <FileImage className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        {ejercicio.eje_nombre}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-500 line-clamp-2 max-w-md">
                          {ejercicio.eje_descripcion}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getDificultadBadgeVariant(ejercicio.eje_nivel)}>
                          {ejercicio.eje_nivel}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/ejercicios/${ejercicio.eje_id}/editar`)}
                            title="Editar"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteDialog({
                              isOpen: true,
                              ejercicioId: ejercicio.eje_id,
                              ejercicioNombre: ejercicio.eje_nombre
                            })}
                            disabled={deleteMutation.isPending}
                            title="Eliminar"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
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

      {/* Diálogo de confirmación de eliminación */}
      <AlertDialog open={deleteDialog.isOpen} onOpenChange={(open) =>
        !open && setDeleteDialog({ isOpen: false, ejercicioId: null, ejercicioNombre: '' })
      }>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar ejercicio?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Está seguro de que desea eliminar el ejercicio "{deleteDialog.ejercicioNombre}"?
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteDialog.ejercicioId && handleDelete(deleteDialog.ejercicioId)}
              className="bg-red-600 hover:bg-red-700"
              disabled={deleteMutation.isPending}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
