import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Badge } from "../components/ui/badge"
import { Search, Plus, Eye, Edit, Trash2, Check, X, Save, User, Hash, Mail, Phone, Info } from "lucide-react"
import { useList, useDelete, useUpdate } from "../hooks/useGenericCrud"
import type { Usuario } from "../types/schema.types"
import { toast } from "sonner"
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
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "../components/ui/dialog"
import { Label } from "../components/ui/label"
import { Switch } from "../components/ui/switch"
import { useDebounce } from "../hooks/useDebounce"

export function ClientesVer() {
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    clienteId: null as number | null,
    clienteNombre: ''
  });

  // Estado para la edición en modal
  const [editDialog, setEditDialog] = useState({
    isOpen: false,
    cliente: null as Usuario | null
  });

  // Estado para el formulario de edición
  const [editForm, setEditForm] = useState<Partial<Usuario>>({});

  // Determinar si debe buscar (al menos 3 caracteres)
  const shouldFetch = debouncedSearchTerm.length >= 3

  // Obtener usuarios - solo si hay búsqueda
  const {
    data: usuarios = [],
    isLoading,
    refetch
  } = useList<Usuario>({
    resourceName: "usuario",
    queryOptions: {
      enabled: shouldFetch,
      staleTime: 0.2 * 60 * 1000,
    }
  })

  const deleteMutation = useDelete("usuario")
  const updateMutation = useUpdate<Partial<Usuario>, Usuario>("usuario")

  // Filtrar por búsqueda
  const filteredClientes = usuarios.filter(u => {
    const searchLower = debouncedSearchTerm.toLowerCase()
    
    // Buscar por documento
    if (u.usu_di?.toString().includes(debouncedSearchTerm)) return true
    
    // Buscar por nombre completo
    const nombreCompleto = `${u.usu_nombre || ''} ${u.usu_apellido || ''}`.toLowerCase()
    if (nombreCompleto.includes(searchLower)) return true
    
    // Buscar por nombre individual
    if (u.usu_nombre?.toLowerCase().includes(searchLower)) return true
    if (u.usu_apellido?.toLowerCase().includes(searchLower)) return true
    
    // Buscar por email
    if (u.usu_email?.toLowerCase().includes(searchLower)) return true
    
    // Buscar por teléfono
    if (u.usu_telefono?.includes(debouncedSearchTerm)) return true
    
    return false
  })

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Afiliado eliminado exitosamente")
        setDeleteDialog({ isOpen: false, clienteId: null, clienteNombre: '' })
        refetch() // Actualizar la lista
      },
      onError: (error: any) => {
        toast.error(`Error al eliminar: ${error.message}`)
      }
    })
  }

  // Función para abrir el modal de edición
  const openEditDialog = (cliente: Usuario) => {
    setEditDialog({
      isOpen: true,
      cliente
    });
    // Inicializar el formulario con los datos del cliente
    setEditForm({
      usu_nombre: cliente.usu_nombre,
      usu_apellido: cliente.usu_apellido,
      usu_email: cliente.usu_email,
      usu_telefono: cliente.usu_telefono,
      usu_direccion: cliente.usu_direccion,
      usu_eps: cliente.usu_eps,
      usu_ocupacion: cliente.usu_ocupacion,
      usu_sexo: cliente.usu_sexo,
      usu_status: cliente.usu_status,
    });
  }

  // Función para guardar los cambios
  const handleSaveEdit = () => {
    if (!editDialog.cliente) return;

    updateMutation.mutate(
      {
        id: editDialog.cliente.usu_di,
        data: editForm
      },
      {
        onSuccess: () => {
          toast.success("Afiliado actualizado exitosamente");
          setEditDialog({ isOpen: false, cliente: null });
          refetch(); // Actualizar la lista
        },
        onError: (error: any) => {
          toast.error(`Error al actualizar: ${error.message}`);
        }
      }
    );
  };

  // Función para manejar cambios en el formulario
  const handleFormChange = (field: keyof Usuario, value: any) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-green-700 mb-2">Afiliados</h1>
        <p className="text-gray-600">Gestión de Afiliados del sistema</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Buscar Afiliados</CardTitle>
              <CardDescription>
                {shouldFetch && filteredClientes.length > 0 
                  ? `${filteredClientes.length} afiliado(s) encontrado(s)`
                  : "Escribe al menos 3 caracteres para buscar"}
                {shouldFetch && filteredClientes.length === 0 && (
                  <span className="text-amber-600 ml-2">(Búsqueda: "{debouncedSearchTerm}")</span>
                )}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              {shouldFetch && (
                <Button
                  variant="outline"
                  onClick={() => refetch()}
                >
                  Actualizar
                </Button>
              )}
              <Button
                onClick={() => navigate("/clientes/crear")}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Afiliado
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Input de búsqueda */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por documento, nombre, apellido, email o teléfono (mínimo 3 caracteres)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Indicador de búsqueda */}
            <div className="mt-2 flex items-center justify-between">
              <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Hash className="h-3 w-3" />
                  <span>Documento</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>Nombre/Apellido</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  <span>Email</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  <span>Teléfono</span>
                </div>
              </div>
              
              {searchTerm.length > 0 && searchTerm.length < 3 && (
                <div className="flex items-center gap-1 text-amber-600 text-xs">
                  <Info className="h-3 w-3" />
                  <span>Escribe al menos 3 caracteres para buscar</span>
                </div>
              )}
              
              {shouldFetch && filteredClientes.length > 0 && (
                <div className="flex items-center gap-1 text-green-600 text-xs">
                  <Search className="h-3 w-3" />
                  <span>{filteredClientes.length} resultado(s)</span>
                </div>
              )}
            </div>
          </div>

          {/* Manejo de estados */}
          {!shouldFetch ? (
            <div className="text-center py-12 text-gray-500 border-2 border-dashed rounded-lg">
              <Search className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <p className="text-lg font-medium mb-1">
                Buscar afiliados
              </p>
              <p className="text-sm mb-3">
                Escribe al menos 3 caracteres en el campo de búsqueda
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500 mt-4">
                <div className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full">
                  <Hash className="h-3 w-3" />
                  <span>Ej: "98765432" (Documento)</span>
                </div>
                <div className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full">
                  <User className="h-3 w-3" />
                  <span>Ej: "Juan" (Nombre)</span>
                </div>
                <div className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full">
                  <Mail className="h-3 w-3" />
                  <span>Ej: "juan@mail.com" (Email)</span>
                </div>
              </div>
            </div>
          ) : isLoading ? (
            <div className="text-center py-12 text-gray-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-3"></div>
              Buscando afiliados...
            </div>
          ) : filteredClientes.length === 0 ? (
            <div className="text-center py-12 text-gray-500 border-2 border-dashed rounded-lg">
              <Search className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <p className="text-lg font-medium mb-1">
                No se encontraron afiliados
              </p>
              <p className="text-sm mb-3">
                No hay resultados para "{debouncedSearchTerm}"
              </p>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchTerm('')}
                >
                  Limpiar búsqueda
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  Intenta con otros términos como documento, nombre o email
                </p>
              </div>
            </div>
          ) : (
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="font-semibold">Documento</TableHead>
                    <TableHead className="font-semibold">Nombre</TableHead>
                    <TableHead className="font-semibold">Email</TableHead>
                    <TableHead className="font-semibold">Teléfono</TableHead>
                    <TableHead className="font-semibold">EPS</TableHead>
                    <TableHead className="font-semibold">Estado</TableHead>
                    <TableHead className="font-semibold text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredClientes.map((cliente) => (
                    <TableRow key={cliente.usu_di} className="hover:bg-gray-50">
                      <TableCell className="font-mono font-medium">
                        {cliente.usu_di}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {cliente.usu_nombre} {cliente.usu_apellido}
                        </div>
                        <div className="text-xs text-gray-500">
                          {cliente.usu_ocupacion || "Sin ocupación"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3 text-gray-400" />
                          <span className="text-sm">{cliente.usu_email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {cliente.usu_telefono ? (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3 text-gray-400" />
                            <span className="text-sm">{cliente.usu_telefono}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {cliente.usu_eps ? (
                          <Badge variant="outline" className="text-xs">
                            {cliente.usu_eps}
                          </Badge>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={cliente.usu_status ? "default" : "secondary"}
                          className={cliente.usu_status 
                            ? "bg-green-100 text-green-800 hover:bg-green-100" 
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }
                        >
                          {cliente.usu_status ? "Activo" : "Inactivo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/clientes/${cliente.usu_di}`)}
                            title="Ver detalles"
                            className="h-8 w-8"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(cliente)}
                            disabled={updateMutation.isPending}
                            title="Editar"
                            className="h-8 w-8"
                          >
                            <Edit className="h-4 w-4 text-yellow-500" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteDialog({
                              isOpen: true,
                              clienteId: cliente.usu_di,
                              clienteNombre: `${cliente.usu_nombre} ${cliente.usu_apellido}`,
                            })}
                            disabled={deleteMutation.isPending}
                            title="Eliminar"
                            className="h-8 w-8"
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

      {/* Modal de Edición */}
      <Dialog open={editDialog.isOpen} onOpenChange={(open) => {
        if (!open) {
          setEditDialog({ isOpen: false, cliente: null });
        }
      }}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Editar Afiliado
            </DialogTitle>
            <DialogDescription>
              Modifica la información del afiliado {editDialog.cliente?.usu_nombre} {editDialog.cliente?.usu_apellido}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            {/* Nombre */}
            <div className="space-y-2">
              <Label htmlFor="usu_nombre">Nombre *</Label>
              <Input
                id="usu_nombre"
                value={editForm.usu_nombre || ''}
                onChange={(e) => handleFormChange('usu_nombre', e.target.value)}
                placeholder="Nombre del afiliado"
              />
            </div>

            {/* Apellido */}
            <div className="space-y-2">
              <Label htmlFor="usu_apellido">Apellido *</Label>
              <Input
                id="usu_apellido"
                value={editForm.usu_apellido || ''}
                onChange={(e) => handleFormChange('usu_apellido', e.target.value)}
                placeholder="Apellido del afiliado"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="usu_email">Email *</Label>
              <Input
                id="usu_email"
                type="email"
                value={editForm.usu_email || ''}
                onChange={(e) => handleFormChange('usu_email', e.target.value)}
                placeholder="correo@ejemplo.com"
              />
            </div>

            {/* Teléfono */}
            <div className="space-y-2">
              <Label htmlFor="usu_telefono">Teléfono *</Label>
              <Input
                id="usu_telefono"
                value={editForm.usu_telefono || ''}
                onChange={(e) => handleFormChange('usu_telefono', e.target.value)}
                placeholder="3001234567"
              />
            </div>

            {/* Dirección */}
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="usu_direccion">Dirección</Label>
              <Input
                id="usu_direccion"
                value={editForm.usu_direccion || ''}
                onChange={(e) => handleFormChange('usu_direccion', e.target.value)}
                placeholder="Dirección completa"
              />
            </div>

            {/* EPS */}
            <div className="space-y-2">
              <Label htmlFor="usu_eps">EPS</Label>
              <Input
                id="usu_eps"
                value={editForm.usu_eps || ''}
                onChange={(e) => handleFormChange('usu_eps', e.target.value)}
                placeholder="Nombre de la EPS"
              />
            </div>

            {/* Ocupación */}
            <div className="space-y-2">
              <Label htmlFor="usu_ocupacion">Ocupación</Label>
              <Input
                id="usu_ocupacion"
                value={editForm.usu_ocupacion || ''}
                onChange={(e) => handleFormChange('usu_ocupacion', e.target.value)}
                placeholder="Profesión u oficio"
              />
            </div>

            {/* Sexo */}
            <div className="space-y-2">
              <Label htmlFor="usu_sexo">Sexo</Label>
              <select
                id="usu_sexo"
                value={editForm.usu_sexo || ''}
                onChange={(e) => handleFormChange('usu_sexo', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Seleccionar...</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            {/* Estado */}
            <div className="flex items-center space-x-2">
              <Switch
                id="usu_status"
                checked={editForm.usu_status || false}
                onCheckedChange={(checked) => handleFormChange('usu_status', checked)}
              />
              <Label htmlFor="usu_status" className="cursor-pointer">
                {editForm.usu_status ? "Activo" : "Inactivo"}
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditDialog({ isOpen: false, cliente: null })}
              disabled={updateMutation.isPending}
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button
              onClick={handleSaveEdit}
              disabled={updateMutation.isPending}
              className="bg-green-600 hover:bg-green-700"
            >
              {updateMutation.isPending ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Cambios
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmación de eliminación */}
      <AlertDialog open={deleteDialog.isOpen} onOpenChange={(open) =>
        !open && setDeleteDialog({ isOpen: false, clienteId: null, clienteNombre: '' })
      }>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar afiliado?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Está seguro de que desea eliminar el afiliado "{deleteDialog.clienteNombre}"?
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteDialog.clienteId && handleDelete(deleteDialog.clienteId)}
              className="bg-red-600 hover:bg-red-700"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                  Eliminando...
                </>
              ) : (
                "Eliminar"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}