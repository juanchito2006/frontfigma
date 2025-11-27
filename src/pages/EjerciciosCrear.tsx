import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { toast } from "sonner"
import { ArrowLeft, Upload, FileImage, FileVideo, X, Loader2 } from "lucide-react"
import { useCreateEjercicio } from "../hooks/useEjercicios"
import type { CreateEjercicioDTO, NivelEnum } from "../types/schema.types"

interface EjercicioFormData {
  nombre: string;
  descripcion: string;
  ejemplo: string;
  categoria: string;
  dificultad: NivelEnum | '';
  duracion: string;
}

export function EjerciciosCrear() {
  const navigate = useNavigate()
  const createMutation = useCreateEjercicio()

  const [formData, setFormData] = useState<EjercicioFormData>({
    nombre: '',
    descripcion: '',
    ejemplo: '',
    categoria: '',
    dificultad: '',
    duracion: ''
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)

  const handleInputChange = (field: keyof EjercicioFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)

      const reader = new FileReader()
      reader.onloadend = () => {
        setFilePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
    setFilePreview(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.nombre || !formData.dificultad) {
      toast.error("Por favor complete los campos obligatorios")
      return
    }

    try {
      const ejercicioData: CreateEjercicioDTO = {
        eje_nombre: formData.nombre,
        eje_descripcion: formData.descripcion || formData.ejemplo,
        eje_nivel: formData.dificultad,
        eje_imagen: selectedFile ? URL.createObjectURL(selectedFile) : null,
      }

      await createMutation.mutateAsync(ejercicioData)
      toast.success("Ejercicio creado exitosamente")
      navigate('/ejercicios/ver')
    } catch (error) {
      console.error('Error creando ejercicio:', error)
      toast.error("Error al crear el ejercicio")
    }
  }

  const isVideo = selectedFile?.type.startsWith('video/')

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/ejercicios/ver')}
          className="mb-4"
          disabled={createMutation.isPending}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a la lista
        </Button>
        <h1 className="text-2xl font-bold text-green-700">Crear Nuevo Ejercicio</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Información del Ejercicio</CardTitle>
            <CardDescription>Complete los datos del nuevo ejercicio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Información básica */}
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre del Ejercicio *</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => handleInputChange('nombre', e.target.value)}
                placeholder="Ej: Flexiones de brazos"
                required
                disabled={createMutation.isPending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                rows={3}
                value={formData.descripcion}
                onChange={(e) => handleInputChange('descripcion', e.target.value)}
                placeholder="Descripción detallada del ejercicio..."
                disabled={createMutation.isPending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ejemplo">Instrucciones de Ejecución</Label>
              <Textarea
                id="ejemplo"
                rows={3}
                value={formData.ejemplo}
                onChange={(e) => handleInputChange('ejemplo', e.target.value)}
                placeholder="Paso a paso de cómo realizar el ejercicio..."
                disabled={createMutation.isPending}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dificultad">Dificultad *</Label>
                <Select
                  value={formData.dificultad}
                  onValueChange={(value: NivelEnum) => handleInputChange('dificultad', value)}
                  disabled={createMutation.isPending}
                >
                  <SelectTrigger id="dificultad">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={NivelEnum.Principiante}>Principiante</SelectItem>
                    <SelectItem value={NivelEnum.Intermedio}>Intermedio</SelectItem>
                    <SelectItem value={NivelEnum.Avanzado}>Avanzado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duracion">Duración (minutos)</Label>
                <Input
                  id="duracion"
                  type="number"
                  min="1"
                  value={formData.duracion}
                  onChange={(e) => handleInputChange('duracion', e.target.value)}
                  placeholder="Ej: 15"
                  disabled={createMutation.isPending}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Archivo de Ejemplo (Imagen o Video)</Label>

              {!selectedFile ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors">
                  <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center">
                    <Upload className="h-12 w-12 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">
                      Haz clic para cargar un archivo
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      Imágenes (JPG, PNG) o Videos (MP4, AVI)
                    </span>
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={createMutation.isPending}
                  />
                </div>
              ) : (
                <div className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {isVideo ? (
                        <FileVideo className="h-10 w-10 text-green-600" />
                      ) : (
                        <FileImage className="h-10 w-10 text-green-600" />
                      )}
                      <div>
                        <p className="text-sm">{selectedFile.name}</p>
                        <p className="text-xs text-gray-500">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={removeFile}
                      disabled={createMutation.isPending}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Preview */}
                  {filePreview && (
                    <div className="mt-3">
                      {isVideo ? (
                        <video
                          src={filePreview}
                          controls
                          className="w-full max-h-64 rounded-md"
                        />
                      ) : (
                        <img
                          src={filePreview}
                          alt="Preview"
                          className="w-full max-h-64 object-contain rounded-md"
                        />
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700"
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Creando...
                  </>
                ) : (
                  'Crear Ejercicio'
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/ejercicios/ver')}
                disabled={createMutation.isPending}
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
