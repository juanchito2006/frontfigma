import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { toast } from "sonner";
import { ArrowLeft, Upload, Image as ImageIcon, X, Check } from "lucide-react";

export function EjerciciosCrear() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [eje_nombre, setNombre] = useState("");
  const [eje_descripcion, setDescripcion] = useState("");
  const [eje_nivel, setNivel] = useState("Principiante");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (selectedFile: File | null) => {
    if (!selectedFile) return;

    // Validar tipo de archivo
    if (!selectedFile.type.startsWith('image/')) {
      toast.error("Por favor, selecciona solo archivos de imagen");
      return;
    }

    // Validar tamaño (máx 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("La imagen es demasiado grande. Máximo 5MB");
      return;
    }

    setFile(selectedFile);
    
    // Crear preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileChange(droppedFile);
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.info("Imagen eliminada");
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!file) return null;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("image_type", "ejercicios");

      const resImg = await fetch(
        "https://gym-image-server.leapcell.app/api/ejercicios",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!resImg.ok) {
        console.error("Error imagen:", await resImg.text());
        throw new Error("Error subiendo imagen");
      }

      const dataImg = await resImg.json();
      return dataImg.url;
    } catch (error) {
      console.error("Error en uploadImage:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!eje_nombre || !eje_descripcion || !eje_nivel) {
      toast.error("Complete los campos obligatorios");
      return;
    }

    setIsUploading(true);
    let imageUrl = null;

    try {
      if (file) {
        imageUrl = await uploadImage();
      }

      const payload = {
        eje_nombre,
        eje_descripcion,
        eje_nivel,
        eje_imagen: imageUrl,
      };

      const res = await fetch(
        "https://gym-combarranquilla-master.onrender.com/ejercicio",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Error en la API");

      toast.success("Ejercicio creado correctamente");
      navigate("/ejercicios/ver");
    } catch (error) {
      console.error("Error completo:", error);
      toast.error("Error al crear el ejercicio");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6 mx-auto" style={{ maxWidth: "1500px" }}>
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate("/ejercicios/ver")} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a la lista
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Crear Nuevo Ejercicio</CardTitle>
            <CardDescription>Complete los datos del nuevo ejercicio</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Nombre */}
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre del ejercicio *</Label>
              <Input 
                id="nombre"
                value={eje_nombre} 
                onChange={(e) => setNombre(e.target.value)} 
                placeholder="Ej: Sentadilla, Press de banca, etc."
                required 
              />
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción *</Label>
              <Input 
                id="descripcion"
                value={eje_descripcion} 
                onChange={(e) => setDescripcion(e.target.value)} 
                placeholder="Ej: Ejercicio para trabajar piernas y glúteos..."
                required 
              />
            </div>

            {/* Nivel */}
            <div className="space-y-2">
              <Label htmlFor="nivel">Nivel *</Label>
              <Select value={eje_nivel} onValueChange={(v) => setNivel(v)}>
                <SelectTrigger id="nivel">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Principiante">Principiante</SelectItem>
                  <SelectItem value="Intermedio">Intermedio</SelectItem>
                  <SelectItem value="Avanzado">Avanzado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Imagen con Drag & Drop - SOLUCIÓN CORREGIDA */}
            <div className="space-y-2">
              <Label>Imagen del ejercicio (opcional)</Label>
              
              <div className="relative">
                {previewUrl ? (
                  <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors border-green-500 bg-green-50`}>
                    <div className="space-y-4">
                      {/* Preview de imagen dentro del mismo tamaño */}
                      <div className="flex justify-center">
                        <div className="relative w-32 h-32 overflow-hidden rounded-lg border border-gray-300">
                          <img 
                            src={previewUrl} 
                            alt="Vista previa" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                          <Check className="h-4 w-4" />
                          <span>Imagen lista para subir</span>
                        </div>
                        
                        <div className="flex justify-center gap-2">
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={handleRemoveImage}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Quitar imagen
                          </Button>
                          
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleFileInputClick}
                          >
                            <ImageIcon className="h-4 w-4 mr-2" />
                            Cambiar imagen
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                      isDragging 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-300 hover:border-green-400 hover:bg-gray-50'
                    }`}
                    onClick={handleFileInputClick}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    
                    <div className="space-y-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
                        <Upload className="h-6 w-6 text-green-600" />
                      </div>
                      
                      <div>
                        <p className="font-medium text-gray-700">
                          {isDragging ? 'Suelta la imagen aquí' : 'Arrastra una imagen o haz clic para seleccionar'}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          PNG, JPG, GIF hasta 5MB
                        </p>
                      </div>
                      
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                      >
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Seleccionar archivo
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Información del archivo */}
              {file && (
                <div className="text-sm text-gray-500 p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-gray-400" />
                      <span className="truncate">{file.name}</span>
                    </div>
                    <span className="text-xs font-medium">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                </div>
              )}
            </div>

            {/* Botones */}
            <div className="flex gap-3 pt-6 border-t">
              <Button 
                type="submit" 
                className="bg-green-600 hover:bg-green-700"
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                    Creando...
                  </>
                ) : "Crear Ejercicio"}
              </Button>

              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate("/ejercicios/ver")}
                disabled={isUploading}
              >
                Cancelar
              </Button>
            </div>

          </CardContent>
        </Card>
      </form>
    </div>
  );
}