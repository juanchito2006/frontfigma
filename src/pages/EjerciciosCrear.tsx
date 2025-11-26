/**
 * EjerciciosCrear - Página para crear un nuevo ejercicio
 * 
 * Formulario completo para la creación de ejercicios con carga de archivos multimedia.
 * Los datos se enviarán a la API del backend personalizado.
 */

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { toast } from "sonner"
import { ArrowLeft, Upload, FileImage, FileVideo, X } from "lucide-react"

export function EjerciciosCrear() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    ejemplo: '',
    categoria: '',
    dificultad: '',
    duracion: ''
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      
      // Crear preview
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
    
    if (!formData.nombre || !formData.categoria || !formData.dificultad) {
      toast.error("Por favor complete los campos obligatorios")
      return
    }

    try {
      // TODO: Aquí se conectará con la API del backend
      // const formDataToSend = new FormData()
      // Object.entries(formData).forEach(([key, value]) => {
      //   formDataToSend.append(key, value)
      // })
      // if (selectedFile) {
      //   formDataToSend.append('archivo', selectedFile)
      // }
      // 
      // const response = await fetch('/api/ejercicios', {
      //   method: 'POST',
      //   body: formDataToSend
      // })
      
      toast.success("Ejercicio creado exitosamente")
      navigate('/ejercicios/ver')
    } catch (error) {
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
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a la lista
        </Button>
        <h1 className="text-green-700">Crear Nuevo Ejercicio</h1>
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
              />
            </div>

            {/* Categorización */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="categoria">Categoría *</Label>
                <Select
                  value={formData.categoria}
                  onValueChange={(value) => handleInputChange('categoria', value)}
                >
                  <SelectTrigger id="categoria">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fuerza">Fuerza</SelectItem>
                    <SelectItem value="Cardio">Cardio</SelectItem>
                    <SelectItem value="Flexibilidad">Flexibilidad</SelectItem>
                    <SelectItem value="Resistencia">Resistencia</SelectItem>
                    <SelectItem value="Equilibrio">Equilibrio</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dificultad">Dificultad *</Label>
                <Select
                  value={formData.dificultad}
                  onValueChange={(value) => handleInputChange('dificultad', value)}
                >
                  <SelectTrigger id="dificultad">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Principiante">Principiante</SelectItem>
                    <SelectItem value="Intermedio">Intermedio</SelectItem>
                    <SelectItem value="Avanzado">Avanzado</SelectItem>
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
                />
              </div>
            </div>

            {/* Carga de archivo */}
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
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Crear Ejercicio
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/ejercicios/ver')}
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
