import { useNavigate, useParams } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { toast } from "sonner"
import { ArrowLeft, Trash2 } from "lucide-react"

export function EjerciciosDelete() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const handleDelete = async () => {
    if (!id) {
      toast.error("ID no válido")
      return
    }

    try {
      const res = await fetch(
        `https://gym-combarranquilla-master.onrender.com/ejercicio/${id}`,
        { method: "DELETE" }
      )

      if (!res.ok) throw new Error()

      toast.success("Ejercicio eliminado correctamente")
      navigate("/ejercicios/ver")
    } catch {
      toast.error("Error eliminando el ejercicio")
    }
  }

  return (
    <div className="p-6 mx-auto" style={{ maxWidth: "900px" }}>
      <Button
        variant="ghost"
        onClick={() => navigate("/ejercicios/ver")}
        className="mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Volver
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Eliminar Ejercicio</CardTitle>
          <CardDescription>
            Esta acción no se puede deshacer
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground">
            ¿Seguro que deseas eliminar este ejercicio?
          </p>

          <div className="flex gap-3">
            <Button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate("/ejercicios/ver")}
            >
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
