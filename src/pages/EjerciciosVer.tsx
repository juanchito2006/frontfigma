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
import { Search, Plus, Edit, Trash2, FileImage, FileVideo, Loader2 } from "lucide-react"
import { useEjerciciosList, useDeleteEjercicio } from "../hooks/useEjercicios"
import type { Ejercicio, NivelEnum } from "../types/schema.types"

// Tipo local para el formulario (si necesitas mapeo de campos)
interface EjercicioFormData {
  nombre: string;
  descripcion: string;
  ejemplo: string;
  categoria: string;
  dificultad: NivelEnum | '';
  duracion: string;
}

export function EjerciciosVer() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [dificultadFilter, setDificultadFilter] = useState<NivelEnum | 'todas'>('todas')
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    ejercicioId: null as number | null,
    ejercicioNombre: ''
  })

  const { data: ejercicios = [], isLoading, error } = useEjerciciosList()
  const deleteMutation = useDeleteEjercicio()

  const handleDelete = async (ejercicioId: number) => {
    try {
      await deleteMutation.mutateAsync(ejercicioId)
      toast.success("Ejercicio eliminado exitosamente")
    } catch (error) {
      console.error('Error eliminando ejercicio:', error)
      toast.error("Error al eliminar el ejercicio")
    } finally {
      setDeleteDialog({ isOpen: false, ejercicioId: null, ejercicioNombre: '' })
    }
  }

  const filteredEjercicios = ejercicios.filter((ejercicio: Ejercicio) => {
    const matchesSearch = ejercicio.eje_nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ejercicio.eje_descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDificultad = dificultadFilter === 'todas' || ejercicio.eje_nivel === dificultadFilter

    return matchesSearch && matchesDificultad
  })

  const getDificultadBadgeVariant = (dificultad: NivelEnum) => {
    switch (dificultad) {
      case NivelEnum.Principiante:
        return 'default'
      case NivelEnum.Intermedio:
        return 'secondary'
      case NivelEnum.Avanzado:
        return 'destructive'
      default:
        return 'default'
    }
  }

  const handleEdit = (ejercicio: Ejercicio) => {
    // TODO: Implementar navegación a página de edición
    navigate(`/ejercicios/editar/${ejercicio.eje_id}`, { state: { ejercicio } })
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-8 text-red-600">
          Error al cargar los ejercicios. Por favor, intente nuevamente.
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-green-700 mb-2">Ejercicios</h1>
        <p className="text-gray-600">Gestión de ejercicios del sistema</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Lista de Ejercicios</CardTitle>
              <CardDescription>
                {filteredEjercicios.length} ejercicio(s) disponible(s)
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative md:col-span-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar ejercicios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={dificultadFilter} onValueChange={(value: NivelEnum | 'todas') => setDificultadFilter(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Todas las dificultades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las dificultades</SelectItem>
                <SelectItem value={NivelEnum.Principiante}>Principiante</SelectItem>
                <SelectItem value={NivelEnum.Intermedio}>Intermedio</SelectItem>
                <SelectItem value={NivelEnum.Avanzado}>Avanzado</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center text-sm text-gray-500">
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-green-600" />
              <p className="text-gray-500 mt-2">Cargando ejercicios...</p>
            </div>
          ) : filteredEjercicios.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm || dificultadFilter !== 'todas'
                ? 'No se encontraron ejercicios con los filtros aplicados'
                : 'No hay ejercicios registrados'}
            </div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Dificultad</TableHead>
                    <TableHead>Multimedia</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEjercicios.map((ejercicio: Ejercicio) => (
                    <TableRow key={ejercicio.eje_id}>
                      <TableCell className="font-medium">
                        {ejercicio.eje_nombre}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-500 max-w-xs truncate">
                          {ejercicio.eje_descripcion}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getDificultadBadgeVariant(ejercicio.eje_nivel)}>
                          {ejercicio.eje_nivel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {ejercicio.eje_imagen && (
                          ejercicio.eje_imagen.includes('video') ? (
                            <FileVideo className="h-4 w-4 text-blue-600" />
                          ) : (
                            <FileImage className="h-4 w-4 text-green-600" />
                          )
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(ejercicio)}
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
                            title="Eliminar"
                            disabled={deleteMutation.isPending}
                          >
                            {deleteMutation.isPending && deleteMutation.variables === ejercicio.eje_id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4 text-red-600" />
                            )}
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
            <AlertDialogCancel disabled={deleteMutation.isPending}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteDialog.ejercicioId && handleDelete(deleteDialog.ejercicioId)}
              className="bg-red-600 hover:bg-red-700"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Eliminando...
                </>
              ) : (
                'Eliminar'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
