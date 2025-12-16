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
    rol: "3", // Por defecto Cliente (rol_id: 3)
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones básicas
    if (!formData.nombres || !formData.apellidos || !formData.email || !formData.documento) {
      toast.error("Por favor complete los campos obligatorios");
      return;
    }

    // Validar que el documento sea un número válido
    const documentoNumero = Number(formData.documento);
    if (isNaN(documentoNumero) || documentoNumero <= 0) {
      toast.error("El documento debe ser un número válido");
      return;
    }

    // Validar formato de fecha
    const formatDate = (dateString: string): Date | null => {
      if (!dateString) return null;
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? null : date;
    };

    // Preparar el body según el ejemplo funcional
    const body = {
      usu_di: documentoNumero,
      usu_nombre: formData.nombres.trim(),
      usu_apellido: formData.apellidos.trim(),
      usu_email: formData.email.trim(),
      usu_contrase_a: formData.password || "password123", // Contraseña por defecto si está vacía
      usu_direccion: formData.direccion.trim() || null,
      usu_fecha_nacimiento: formatDate(formData.fechaNacimiento) || null,
      usu_fecha_expedicion: formatDate(formData.fechaExpedicion) || null,
      usu_telefono: formData.telefono.trim() || null,
      usu_eps: formData.eps.trim() || null,
      usu_ocupacion: formData.ocupacion.trim() || null,
      usu_ultima_val: new Date(), // Fecha actual
      usu_status: true, // Siempre activo al crear
      rol_idfk: parseInt(formData.rol) || 3, // 3 = Cliente por defecto
      usu_sexo: formData.sexo || null,
      eliminado: false,
    };

    console.log("Enviando usuario:", JSON.stringify(body, null, 2));

    createUsuario.mutate(body, {
      onSuccess: (response) => {
        toast.success("Usuario creado correctamente");
        navigate("/clientes/ver");
      },
      onError: (error: any) => {
        console.error("Error al crear usuario:", error);
        toast.error(`Error al crear el usuario: ${error.message || "Error desconocido"}`);
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
            <CardTitle>Crear Nuevo Afiliado</CardTitle>
            <CardDescription>Complete los datos del nuevo afiliado</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Rol - PRIMERO como solicitaste */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rol">Rol *</Label>
                <Select value={formData.rol} onValueChange={(v) => handleInputChange("rol", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">Cliente</SelectItem>
                    <SelectItem value="2">Entrenador</SelectItem>
                    <SelectItem value="1">Administrador</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">
                  {formData.rol === "1" ? "Administrador: Acceso completo al sistema" :
                    formData.rol === "2" ? "Entrenador: Gestionar valoraciones y entrenamientos" :
                      "Cliente: Solo puede ver su información"}
                </p>
              </div>
            </div>

            {/* Información personal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="space-y-2">
                <Label htmlFor="documento">Número de Documento *</Label>
                <Input
                  id="documento"
                  value={formData.documento}
                  onChange={(e) => handleInputChange("documento", e.target.value)}
                  placeholder="Ej: 98765432"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nombres">Nombres *</Label>
                <Input
                  id="nombres"
                  value={formData.nombres}
                  onChange={(e) => handleInputChange("nombres", e.target.value)}
                  placeholder="Ej: Juan"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellidos">Apellidos *</Label>
                <Input
                  id="apellidos"
                  value={formData.apellidos}
                  onChange={(e) => handleInputChange("apellidos", e.target.value)}
                  placeholder="Ej: Pérez"
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
                  placeholder="ejemplo@correo.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  value={formData.telefono}
                  onChange={(e) => handleInputChange("telefono", e.target.value)}
                  placeholder="Ej: 3001234567"
                />
              </div>
            </div>

            {/* Tipo de documento y fechas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tipoDocumento">Tipo de Documento</Label>
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
                <Label htmlFor="fechaExpedicion">Fecha de Expedición</Label>
                <Input
                  id="fechaExpedicion"
                  type="date"
                  value={formData.fechaExpedicion}
                  onChange={(e) => handleInputChange("fechaExpedicion", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
                <Input
                  id="fechaNacimiento"
                  type="date"
                  value={formData.fechaNacimiento}
                  onChange={(e) => handleInputChange("fechaNacimiento", e.target.value)}
                />
              </div>
            </div>

            {/* Sexo y otros */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  placeholder="Dejar vacío para contraseña por defecto"
                />
              </div>
            </div>

            {/* Dirección */}
            <div className="space-y-2">
              <Label htmlFor="direccion">Dirección</Label>
              <Input
                id="direccion"
                value={formData.direccion}
                onChange={(e) => handleInputChange("direccion", e.target.value)}
                placeholder="Dirección completa"
              />
            </div>

            {/* EPS y Ocupación */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eps">EPS</Label>
                <Select value={formData.eps} onValueChange={(v) => handleInputChange("eps", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione EPS" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectItem value="No tiene EPS">Sin EPS / No tiene</SelectItem>

                    {/* EPS Principales */}
                    <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase mt-1">
                      Principales
                    </div>
                    <SelectItem value="Sura EPS">Sura EPS</SelectItem>
                    <SelectItem value="Nueva EPS">Nueva EPS</SelectItem>
                    <SelectItem value="Salud Total EPS">Salud Total EPS</SelectItem>
                    <SelectItem value="Sanitas EPS">Sanitas EPS</SelectItem>
                    <SelectItem value="Coomeva EPS">Coomeva EPS</SelectItem>

                    {/* EPS Régimen Contributivo */}
                    <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase mt-2">
                      Régimen Contributivo
                    </div>
                    <SelectItem value="Compensar EPS">Compensar EPS</SelectItem>
                    <SelectItem value="Famisanar EPS">Famisanar EPS</SelectItem>
                    <SelectItem value="Aliansalud EPS">Aliansalud EPS</SelectItem>
                    <SelectItem value="Savia Salud EPS">Savia Salud EPS</SelectItem>
                    <SelectItem value="Medimas EPS">Medimas EPS</SelectItem>
                    <SelectItem value="Mutual Ser EPS">Mutual Ser EPS</SelectItem>

                    {/* EPS Régimen Subsidiado */}
                    <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase mt-2">
                      Régimen Subsidiado
                    </div>
                    <SelectItem value="Asmet Salud EPS">Asmet Salud EPS</SelectItem>
                    <SelectItem value="Ecoopsos EPS">Ecoopsos EPS</SelectItem>
                    <SelectItem value="Comfenalco Valle EPS">Comfenalco Valle EPS</SelectItem>
                    <SelectItem value="Comfamiliar Huila EPS">Comfamiliar Huila EPS</SelectItem>
                    <SelectItem value="Cajacopi EPS">Cajacopi EPS</SelectItem>
                    <SelectItem value="Comfacor EPS">Comfacor EPS</SelectItem>
                    <SelectItem value="Comfachocó EPS">Comfachocó EPS</SelectItem>

                    {/* EPS Indígenas */}
                    <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase mt-2">
                      EPS Indígenas
                    </div>
                    <SelectItem value="Asociación Indígena del Cauca EPS">Asociación Indígena del Cauca EPS</SelectItem>
                    <SelectItem value="Mallamas EPSI">Mallamas EPSI</SelectItem>
                    <SelectItem value="Pijaos Salud EPSI">Pijaos Salud EPSI</SelectItem>
                    <SelectItem value="Anaswayuu EPSI">Anaswayuu EPSI</SelectItem>
                    <SelectItem value="Dusakawi EPSI">Dusakawi EPSI</SelectItem>
                    <SelectItem value="Manexka EPSI">Manexka EPSI</SelectItem>
                  </SelectContent>
                </Select>
              </div>


              <div className="space-y-2">
                <Label htmlFor="ocupacion">Ocupación</Label>
                <Input
                  id="ocupacion"
                  value={formData.ocupacion}
                  onChange={(e) => handleInputChange("ocupacion", e.target.value)}
                  placeholder="Ej: Ingeniero, Estudiante, etc."
                />
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3 pt-6 border-t">
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700"
                disabled={createUsuario.isPending}
              >
                {createUsuario.isPending ? "Creando..." : "Crear afiliado"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/clientes/ver")}
                disabled={createUsuario.isPending}
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