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
import { Search, Plus, Edit, Trash2, FileImage } from "lucide-react";

import { useList, useDelete } from "../hooks/useGenericCrud";



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



  const shouldFetch = searchTerm.trim().length >= 3;

  const {
    data: ejercicios = [],
    isLoading,
    error,
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
      },
      onError: () => {
        toast.error("No se pudo eliminar el ejercicio");
      },
    });
  };



  const filteredEjercicios = ejercicios.filter((ej) => {
    const matchesSearch =
      ej.eje_nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ej.eje_descripcion.toLowerCase().includes(searchTerm.toLowerCase());

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



  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <div>
              <CardTitle>Ejercicios</CardTitle>
              <CardDescription>
                Busca un ejercicio para visualizar resultados
              </CardDescription>
            </div>

            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => navigate("/ejercicios/crear")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Ejercicio
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* BUSCADOR */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <Input
                placeholder="Buscar (mínimo 3 caracteres)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select
              value={dificultadFilter}
              onValueChange={setDificultadFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Nivel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todos</SelectItem>
                <SelectItem value="Principiante">Principiante</SelectItem>
                <SelectItem value="Intermedio">Intermedio</SelectItem>
                <SelectItem value="Avanzado">Avanzado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ESTADOS */}
          {!shouldFetch && (
            <div className="text-center text-gray-500 py-10">
              Escribe al menos 3 caracteres para buscar ejercicios
            </div>
          )}

          {shouldFetch && isLoading && (
            <div className="text-center py-10 text-gray-500">
              Buscando ejercicios...
            </div>
          )}

          {shouldFetch && error && (
            <div className="text-center py-10 text-red-500">
              Error al cargar ejercicios
            </div>
          )}

          {shouldFetch && filteredEjercicios.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No se encontraron resultados
            </div>
          )}

          {shouldFetch && filteredEjercicios.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Imagen</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Nivel</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredEjercicios.map((ej) => (
                  <TableRow key={ej.eje_id}>
                    <TableCell>
                      {ej.eje_imagen ? (
                        <img
                          src={ej.eje_imagen}
                          className="w-20 h-20 object-cover rounded"
                          onError={(e) =>
                          (e.currentTarget.src =
                            "https://via.placeholder.com/80")
                          }
                        />
                      ) : (
                        <FileImage className="text-gray-400" />
                      )}
                    </TableCell>

                    <TableCell>{ej.eje_nombre}</TableCell>

                    <TableCell className="text-sm text-gray-500">
                      {ej.eje_descripcion}
                    </TableCell>

                    <TableCell>
                      <Badge variant={badgeVariant(ej.eje_nivel)}>
                        {ej.eje_nivel}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          navigate(`/ejercicios/${ej.eje_id}/editar`)
                        }
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
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
            <AlertDialogTitle>¿Eliminar ejercicio?</AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminará <b>{deleteDialog.ejercicioNombre}</b>. Esta acción no
              se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
  <AlertDialogCancel asChild>
    <Button variant="outline">
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
      {deleteMutation.isPending ? "Eliminando..." : "Eliminar"}
    </Button>
  </AlertDialogAction>
</AlertDialogFooter>

        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
