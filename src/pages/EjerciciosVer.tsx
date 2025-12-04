/**
 * EjerciciosVer - Página para ver la lista de ejercicios
 * 
 * Muestra la tabla de ejercicios con búsqueda, filtros y opciones de gestión.
 * Los datos se obtendrán de la API del backend personalizado.
 */

import { useState, useEffect } from "react"
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
import { Search, Plus, Edit, Trash2, FileImage, FileVideo } from "lucide-react"

export function EjerciciosVer() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [categoriaFilter, setCategoriaFilter] = useState('todas')
  const [dificultadFilter, setDificultadFilter] = useState('todas')
  const [ejercicios, setEjercicios] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    ejercicioId: null as number | null,
    ejercicioNombre: ''
  })

  // Cargar ejercicios desde la API
  useEffect(() => {
    loadEjercicios()
  }, [])

  const loadEjercicios = async () => {
    setLoading(true)
    try {
      // TODO: Aquí se conectará con la API del backend
      // const response = await fetch('/api/ejercicios')
      // const data = await response.json()
      // setEjercicios(data)
      
      // Por ahora, datos vacíos
      setEjercicios([])
    } catch (error) {
      console.error('Error cargando ejercicios:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (ejercicioId: number) => {
    try {
      // TODO: Aquí se conectará con la API del backend
      // await fetch(`/api/ejercicios/${ejercicioId}`, {
      //   method: 'DELETE'
      // })
      
      setEjercicios(prev => prev.filter(e => e.id !== ejercicioId))
      toast.success("Ejercicio eliminado exitosamente")
    } catch (error) {
      toast.error("Error al eliminar el ejercicio")
    } finally {
      setDeleteDialog({ isOpen: false, ejercicioId: null, ejercicioNombre: '' })
    }
  }

  // Filtrar ejercicios
  const filteredEjercicios = ejercicios.filter(ejercicio => {
    const matchesSearch = ejercicio.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ejercicio.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategoria = categoriaFilter === 'todas' || ejercicio.categoria === categoriaFilter
    const matchesDificultad = dificultadFilter === 'todas' || ejercicio.dificultad === dificultadFilter
    
    return matchesSearch && matchesCategoria && matchesDificultad
  })

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
            
            <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las categorías</SelectItem>
                <SelectItem value="Fuerza">Fuerza</SelectItem>
                <SelectItem value="Cardio">Cardio</SelectItem>
                <SelectItem value="Flexibilidad">Flexibilidad</SelectItem>
                <SelectItem value="Resistencia">Resistencia</SelectItem>
                <SelectItem value="Equilibrio">Equilibrio</SelectItem>
              </SelectContent>
            </Select>

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
          {loading ? (
            <div className="text-center py-8 text-gray-500">
              Cargando ejercicios...
            </div>
          ) : filteredEjercicios.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm || categoriaFilter !== 'todas' || dificultadFilter !== 'todas' 
                ? 'No se encontraron ejercicios con los filtros aplicados' 
                : 'No hay ejercicios registrados'}
            </div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Dificultad</TableHead>
                    <TableHead>Duración</TableHead>
                    <TableHead>Multimedia</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEjercicios.map((ejercicio) => (
                    <TableRow key={ejercicio.id}>
                      <TableCell>
                        <div>
                          <div>{ejercicio.nombre}</div>
                          {ejercicio.descripcion && (
                            <div className="text-xs text-gray-500 truncate max-w-xs">
                              {ejercicio.descripcion}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{ejercicio.categoria}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getDificultadBadgeVariant(ejercicio.dificultad)}>
                          {ejercicio.dificultad}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {ejercicio.duracion ? `${ejercicio.duracion} min` : '-'}
                      </TableCell>
                      <TableCell>
                        {ejercicio.archivoEjemplo && (
                          ejercicio.archivoEjemplo.esVideo ? (
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
                            onClick={() => {
                              // TODO: Navegar a página de edición cuando esté implementada
                              console.log('Editar ejercicio', ejercicio.id)
                            }}
                            title="Editar"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteDialog({
                              isOpen: true,
                              ejercicioId: ejercicio.id,
                              ejercicioNombre: ejercicio.nombre
                            })}
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
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
