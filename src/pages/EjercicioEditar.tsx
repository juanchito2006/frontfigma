import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "../components/ui/select"
import { useGetById, useUpdate } from "../hooks/useGenericCrud"
import { toast } from "sonner"
import { ArrowLeft } from "lucide-react"

interface Ejercicio {
    eje_id: number
    eje_nombre: string
    eje_descripcion: string
    eje_imagen: string | null
    eje_nivel: string
}

export function EjercicioEditar() {
    const { id } = useParams()
    const navigate = useNavigate()

    const { data: ejercicio, isLoading, error } = useGetById<Ejercicio>(
        "ejercicio",
        Number(id),
        !!id
    )

    const updateMutation = useUpdate("ejercicio")

    const [eje_nombre, setNombre] = useState("")
    const [eje_descripcion, setDescripcion] = useState("")
    const [eje_nivel, setNivel] = useState("Principiante")
    const [file, setFile] = useState<File | null>(null)
    const [imagenActual, setImagenActual] = useState<string | null>(null)

    useEffect(() => {
        if (ejercicio) {
            setNombre(ejercicio.eje_nombre)
            setDescripcion(ejercicio.eje_descripcion)
            setNivel(ejercicio.eje_nivel)
            setImagenActual(ejercicio.eje_imagen)
        }
    }, [ejercicio])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!eje_nombre || !eje_descripcion || !eje_nivel) {
            toast.error("Complete los campos obligatorios")
            return
        }

        let imageUrl = imagenActual

        // 👉 SOLO sube imagen si el usuario seleccionó una nueva
        if (file) {
            const formData = new FormData()
            formData.append("file", file)
            formData.append("image_type", "ejercicios")

            const resImg = await fetch(
                "https://gym-image-server.leapcell.app/api/ejercicios",
                {
                    method: "POST",
                    body: formData
                }
            )

            if (!resImg.ok) {
                toast.error("Error subiendo imagen")
                return
            }

            const dataImg = await resImg.json()
            imageUrl = dataImg.url
        }

        updateMutation.mutate(
            {
                id: Number(id),
                data: {
                    eje_nombre,
                    eje_descripcion,
                    eje_nivel,
                    eje_imagen: imageUrl
                }
            },
            {
                onSuccess: () => {
                    toast.success("Ejercicio actualizado correctamente")
                    navigate("/ejercicios/ver")
                },
                onError: () => {
                    toast.error("Error al actualizar el ejercicio")
                }
            }
        )
    }

    if (isLoading) {
        return <div className="p-6 text-gray-500">Cargando ejercicio...</div>
    }

    if (error) {
        return <div className="p-6 text-red-500">Error al cargar el ejercicio</div>
    }

    return (
        <div className="p-6 mx-auto" style={{ maxWidth: "1500px" }}>
            <div className="mb-6">
                <Button variant="ghost" onClick={() => navigate("/ejercicios/ver")}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver a la lista
                </Button>
            </div>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Editar Ejercicio</CardTitle>
                        <CardDescription>
                            Modifique la información del ejercicio
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Nombre */}
                        <div className="space-y-2">
                            <Label>Nombre del ejercicio *</Label>
                            <Input
                                value={eje_nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </div>

                        {/* Descripción */}
                        <div className="space-y-2">
                            <Label>Descripción *</Label>
                            <Input
                                value={eje_descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                required
                            />
                        </div>

                        {/* Nivel */}
                        <div className="space-y-2">
                            <Label>Nivel *</Label>
                            <Select value={eje_nivel} onValueChange={setNivel}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Principiante">Principiante</SelectItem>
                                    <SelectItem value="Intermedio">Intermedio</SelectItem>
                                    <SelectItem value="Avanzado">Avanzado</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Imagen */}
                        <div className="space-y-2">
                            <Label>Imagen (opcional)</Label>

                            {imagenActual && (
                                <img
                                    src={imagenActual}
                                    alt="Imagen actual"
                                    className="h-32 rounded-md object-cover"
                                />
                            )}

                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setFile(e.target.files?.[0] || null)
                                }
                            />
                        </div>

                        {/* Botones */}
                        <div className="flex gap-3 pt-4">
                            <Button
                                type="submit"
                                className="bg-green-600 hover:bg-green-700"
                                disabled={updateMutation.isPending}
                            >
                                Guardar Cambios
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate("/ejercicios/ver")}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}
