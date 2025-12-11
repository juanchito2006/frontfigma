import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

import { useCreate } from "../hooks/useGenericCrud";

export function ClientesCrear() {
  const navigate = useNavigate();


  const createUsuario = useCreate("usuario");

  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    password: "",
    fechaNacimiento: "",
    tipoDocumento: "CC",
    documento: "",
    fechaExpedicion: "",
    direccion: "",
    eps: "",
    telefono: "",
    sexo: "",
    ocupacion: "",
    rol: "Usuario",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombres || !formData.apellidos || !formData.email || !formData.documento) {
      toast.error("Por favor complete los campos obligatorios");
      return;
    }

    const body = {
      usu_di: Number(formData.documento),
      usu_nombre: formData.nombres,
      usu_apellido: formData.apellidos,
      usu_email: formData.email,
      usu_contrase_a: formData.password,
      usu_direccion: formData.direccion,
      usu_fecha_nacimiento: formData.fechaNacimiento ? new Date(formData.fechaNacimiento) : null,
      usu_fecha_expedicion: formData.fechaExpedicion ? new Date(formData.fechaExpedicion) : null,
      usu_telefono: formData.telefono,
      usu_eps: formData.eps,
      usu_ocupacion: formData.ocupacion,
      usu_ultima_val: new Date(),
      usu_status: true,
      rol_idfk: formData.rol === "Administrador" ? 2 : 1,
      usu_sexo: formData.sexo,
      eliminado: false,
    };

    createUsuario.mutate(body, {
      onSuccess: () => {
        toast.success("Usuario creado correctamente");
        navigate("/clientes/ver");
      },
      onError: () => {
        toast.error("Error al crear el usuario");
      },
    });
  };

  return (
    <div className="p-6 mx-auto" style={{ maxWidth: "1500px" }}>


      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate("/clientes/ver")} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a la lista
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Información del Afiliado</CardTitle>
            <CardDescription>Complete los datos del nuevo afiliado</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Información personal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombres">Nombres *</Label>
                <Input
                  id="nombres"
                  value={formData.nombres}
                  onChange={(e) => handleInputChange("nombres", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellidos">Apellidos *</Label>
                <Input
                  id="apellidos"
                  value={formData.apellidos}
                  onChange={(e) => handleInputChange("apellidos", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input id="telefono" value={formData.telefono} onChange={(e) => handleInputChange("telefono", e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tipoDocumento">Tipo de Documento *</Label>
                <Select value={formData.tipoDocumento} onValueChange={(v) => handleInputChange("tipoDocumento", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CC">Cédula de Ciudadanía</SelectItem>
                    <SelectItem value="CE">Cédula de Extranjería</SelectItem>
                    <SelectItem value="TI">Tarjeta de Identidad</SelectItem>
                    <SelectItem value="PA">Pasaporte</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="documento">Número de Documento *</Label>
                <Input
                  id="documento"
                  value={formData.documento}
                  onChange={(e) => handleInputChange("documento", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fechaExpedicion">Fecha de Expedición</Label>
                <Input
                  id="fechaExpedicion"
                  type="date"
                  value={formData.fechaExpedicion}
                  onChange={(e) => handleInputChange("fechaExpedicion", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
                <Input
                  id="fechaNacimiento"
                  type="date"
                  value={formData.fechaNacimiento}
                  onChange={(e) => handleInputChange("fechaNacimiento", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sexo">Sexo</Label>
                <Select value={formData.sexo} onValueChange={(v) => handleInputChange("sexo", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Masculino">Masculino</SelectItem>
                    <SelectItem value="Femenino">Femenino</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="direccion">Dirección</Label>
              <Input id="direccion" value={formData.direccion} onChange={(e) => handleInputChange("direccion", e.target.value)} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eps">EPS</Label>
                <Input id="eps" value={formData.eps} onChange={(e) => handleInputChange("eps", e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ocupacion">Ocupación</Label>
                <Input id="ocupacion" value={formData.ocupacion} onChange={(e) => handleInputChange("ocupacion", e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rol">Rol</Label>
                <Select value={formData.rol} onValueChange={(v) => handleInputChange("rol", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Usuario">Usuario</SelectItem>
                    <SelectItem value="Administrador">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Crear afiliado
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/clientes/ver")}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
