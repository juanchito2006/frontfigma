import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { toast } from "sonner";
import { Search, Plus, Edit, Trash2, FileImage, Hash, Info, Dumbbell, Filter } from "lucide-react";
import { useList, useDelete } from "../hooks/useGenericCrud";
import { useDebounce } from "../hooks/useDebounce";

interface Ejercicio {
  eje_id: number;
  eje_nombre: string;
  eje_descripcion: string;
  eje_imagen: string;
  eje_nivel: string;
}

export function EjerciciosVer() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [dificultadFilter, setDificultadFilter] = useState("todas");

  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    ejercicioId: number | null;
    ejercicioNombre: string;
  }>({
    isOpen: false,
    ejercicioId: null,
    ejercicioNombre: "",
  });

  const shouldFetch = debouncedSearchTerm.length >= 3;

  const {
    data: ejercicios = [],
    isLoading,
    refetch,
  } = useList<Ejercicio>({
    resourceName: "ejercicio",
    queryOptions: {
      enabled: shouldFetch,
    },
  });

  const deleteMutation = useDelete("ejercicio");

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Ejercicio eliminado correctamente");
        setDeleteDialog({
          isOpen: false,
          ejercicioId: null,
          ejercicioNombre: "",
        });
        refetch();
      },
      onError: (error: any) => {
        toast.error(`Error al eliminar: ${error.message || "Error desconocido"}`);
      },
    });
  };

  const filteredEjercicios = ejercicios.filter((ej) => {
    const matchesSearch = shouldFetch ? (
      ej.eje_nombre.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      ej.eje_descripcion.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    ) : true;

    const matchesNivel =
      dificultadFilter === "todas" || ej.eje_nivel === dificultadFilter;

    return matchesSearch && matchesNivel;
  });

  const badgeVariant = (nivel: string) => {
    switch (nivel) {
      case "Principiante":
        return "default";
      case "Intermedio":
        return "secondary";
      case "Avanzado":
        return "destructive";
      default:
        return "default";
    }
  };

  const badgeColor = (nivel: string) => {
    switch (nivel) {
      case "Principiante":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Intermedio":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "Avanzado":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "";
    }
  };

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
              <CardTitle>Buscar Ejercicios</CardTitle>
              <CardDescription>
                {shouldFetch && filteredEjercicios.length > 0 
                  ? `${filteredEjercicios.length} ejercicio(s) encontrado(s)`
                  : "Escribe al menos 3 caracteres para buscar"}
                {shouldFetch && filteredEjercicios.length === 0 && (
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
                className="bg-green-600 hover:bg-green-700"
                onClick={() => navigate("/ejercicios/crear")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Ejercicio
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* BUSCADOR Y FILTROS */}
          <div className="mb-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por nombre o descripción (mínimo 3 caracteres)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Select
                  value={dificultadFilter}
                  onValueChange={setDificultadFilter}
                >
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Filtrar por nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todos los niveles</SelectItem>
                    <SelectItem value="Principiante">Principiante</SelectItem>
                    <SelectItem value="Intermedio">Intermedio</SelectItem>
                    <SelectItem value="Avanzado">Avanzado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Indicador de búsqueda */}
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Dumbbell className="h-3 w-3" />
                  <span>Nombre ejercicio</span>
                </div>
                <div className="flex items-center gap-1">
                  <Hash className="h-3 w-3" />
                  <span>Descripción</span>
                </div>
                <div className="flex items-center gap-1">
                  <Filter className="h-3 w-3" />
                  <span>Nivel (filtro)</span>
                </div>
              </div>
              
              {searchTerm.length > 0 && searchTerm.length < 3 && (
                <div className="flex items-center gap-1 text-amber-600 text-xs">
                  <Info className="h-3 w-3" />
                  <span>Escribe al menos 3 caracteres para buscar</span>
                </div>
              )}
              
              {shouldFetch && filteredEjercicios.length > 0 && (
                <div className="flex items-center gap-1 text-green-600 text-xs">
                  <Search className="h-3 w-3" />
                  <span>{filteredEjercicios.length} resultado(s)</span>
                </div>
              )}
            </div>
          </div>

          {/* ESTADOS */}
          {!shouldFetch ? (
            <div className="text-center py-12 text-gray-500 border-2 border-dashed rounded-lg">
              <Dumbbell className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <p className="text-lg font-medium mb-1">
                Buscar ejercicios
              </p>
              <p className="text-sm mb-3">
                Escribe al menos 3 caracteres en el campo de búsqueda
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500 mt-4">
                <div className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full">
                  <Dumbbell className="h-3 w-3" />
                  <span>Ej: "sentadilla" (Nombre)</span>
                </div>
                <div className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full">
                  <Hash className="h-3 w-3" />
                  <span>Ej: "piernas" (Descripción)</span>
                </div>
              </div>
            </div>
          ) : isLoading ? (
            <div className="text-center py-12 text-gray-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-3"></div>
              Buscando ejercicios...
            </div>
          ) : filteredEjercicios.length === 0 ? (
            <div className="text-center py-12 text-gray-500 border-2 border-dashed rounded-lg">
              <Search className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <p className="text-lg font-medium mb-1">
                No se encontraron ejercicios
              </p>
              <p className="text-sm mb-3">
                No hay resultados para "{debouncedSearchTerm}"
                {dificultadFilter !== "todas" && ` con nivel ${dificultadFilter}`}
              </p>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setDificultadFilter('todas');
                  }}
                >
                  Limpiar búsqueda
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  Intenta con otros términos o cambia el filtro de nivel
                </p>
              </div>
            </div>
          ) : (
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="font-semibold w-24">Imagen</TableHead>
                    <TableHead className="font-semibold">Nombre</TableHead>
                    <TableHead className="font-semibold">Descripción</TableHead>
                    <TableHead className="font-semibold">Nivel</TableHead>
                    <TableHead className="font-semibold text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredEjercicios.map((ej) => (
                    <TableRow key={ej.eje_id} className="hover:bg-gray-50">
                      <TableCell>
                        {ej.eje_imagen ? (
                          <div className="w-20 h-20 overflow-hidden rounded-md border">
                            <img
                              src={ej.eje_imagen}
                              alt={ej.eje_nombre}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "https://via.placeholder.com/80?text=Sin+Imagen";
                                e.currentTarget.className = "w-full h-full object-cover";
                              }}
                            />
                          </div>
                        ) : (
                          <div className="w-20 h-20 bg-gray-100 rounded-md border flex items-center justify-center">
                            <FileImage className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </TableCell>

                      <TableCell>
                        <div className="font-medium">{ej.eje_nombre}</div>
                        <div className="text-xs text-gray-500 font-mono mt-1">
                          ID: {ej.eje_id}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="text-sm text-gray-600 max-w-md">
                          {ej.eje_descripcion}
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={badgeColor(ej.eje_nivel)}
                        >
                          {ej.eje_nivel}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/ejercicios/${ej.eje_id}/editar`)}
                            title="Editar"
                            className="h-8 w-8"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setDeleteDialog({
                                isOpen: true,
                                ejercicioId: ej.eje_id,
                                ejercicioNombre: ej.eje_nombre,
                              })
                            }
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

      {/* MODAL ELIMINAR */}
      <AlertDialog
        open={deleteDialog.isOpen}
        onOpenChange={(open) =>
          !open &&
          setDeleteDialog({
            isOpen: false,
            ejercicioId: null,
            ejercicioNombre: "",
          })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-red-600" />
              ¿Eliminar ejercicio?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminará permanentemente el ejercicio <b>"{deleteDialog.ejercicioNombre}"</b>.
              <br />
              <span className="text-amber-600 mt-1 block">
                Esta acción no se puede deshacer.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="outline" disabled={deleteMutation.isPending}>
                Cancelar
              </Button>
            </AlertDialogCancel>

            <AlertDialogAction asChild>
              <Button
                className="bg-red-600 hover:bg-red-700"
                disabled={deleteMutation.isPending}
                onClick={() =>
                  deleteDialog.ejercicioId &&
                  handleDelete(deleteDialog.ejercicioId)
                }
              >
                {deleteMutation.isPending ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                    Eliminando...
                  </>
                ) : (
                  "Eliminar"
                )}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}