import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export function EjerciciosCrear() {
  const navigate = useNavigate();

  const [eje_nombre, setNombre] = useState("");
  const [eje_descripcion, setDescripcion] = useState("");
  const [eje_nivel, setNivel] = useState("Principiante");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!eje_nombre || !eje_descripcion || !eje_nivel) {
      toast.error("Complete los campos obligatorios");
      return;
    }

    let imageUrl = null;

if (file) {
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
    toast.error("Error subiendo imagen");
    return;
  }

  const dataImg = await resImg.json();
  imageUrl = dataImg.url;
}




    const payload = {
      eje_nombre,
      eje_descripcion,
      eje_nivel,
      eje_imagen: imageUrl,
    };

    try {
      const res = await fetch(
        "https://gym-combarranquilla-master.onrender.com/ejercicio",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error();

      toast.success("Ejercicio creado correctamente");
      navigate("/ejercicios/ver");
    } catch {
      toast.error("Error al crear el ejercicio");
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
            <CardTitle>Información del Ejercicio</CardTitle>
            <CardDescription>Complete los datos del nuevo ejercicio</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Nombre */}
            <div className="space-y-2">
              <Label>Nombre del ejercicio *</Label>
              <Input value={eje_nombre} onChange={(e) => setNombre(e.target.value)} required />
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <Label>Descripción *</Label>
              <Input value={eje_descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
            </div>

            {/* Nivel */}
            <div className="space-y-2">
              <Label>Nivel *</Label>
              <Select value={eje_nivel} onValueChange={(v) => setNivel(v)}>
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
              <Input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </div>

            {/* Botones */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Crear Ejercicio
              </Button>

              <Button type="button" variant="outline" onClick={() => navigate("/ejercicios/ver")}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
