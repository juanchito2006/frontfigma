import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { toast } from "sonner";
import { 
  User, 
  Shield,
  Camera,
  Save,
  CheckCircle,
  Mail,
  Phone,
  Key
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface ConfigurationSettingsProps {
  className?: string;
}

export function ConfigurationSettings({ className = "" }: ConfigurationSettingsProps) {
  const { user } = useAuth();
  
  // Estados para configuración de perfil
  const [profileData, setProfileData] = useState({
    nombres: user?.name?.split(' ')[0] || "María Elena",
    apellidos: user?.name?.split(' ').slice(1).join(' ') || "González López",
    email: user?.email || "maria.gonzalez@email.com",
    telefono: "3109876543",
    ocupacion: user?.role || "Doctora",
    foto: null
  });

  // Estados para mostrar cambios pendientes
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Detectar cambios en las configuraciones
  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [profileData]);

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simular carga de imagen
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          foto: e.target?.result as string
        }));
        toast.success("Foto de perfil actualizada");
      };
      reader.readAsDataURL(file);
    }
  };

  const saveAllSettings = async () => {
    setSaving(true);
    
    try {
      // Simular guardado en la base de datos
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setHasUnsavedChanges(false);
      setLastSaved(new Date());
      toast.success("Configuraciones guardadas exitosamente");
    } catch (error) {
      toast.error("Error al guardar las configuraciones");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header con indicador de cambios */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Configuración</h1>
          <p className="text-sm text-gray-600 mt-1">
            Administra tu perfil y preferencias del sistema
          </p>
        </div>
        <div className="flex items-center gap-3">
          {lastSaved && (
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-green-600" />
              Guardado {lastSaved.toLocaleTimeString()}
            </div>
          )}
          <Button 
            onClick={saveAllSettings}
            disabled={!hasUnsavedChanges || saving}
            className="bg-green-700 hover:bg-green-800"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </div>
      </div>

      {/* Indicador de cambios pendientes */}
      {hasUnsavedChanges && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center gap-2">
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-amber-800">Tienes cambios sin guardar</span>
        </div>
      )}

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Información de Perfil */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-green-700" />
              Información de Perfil
            </CardTitle>
            <CardDescription>
              Actualiza tu información personal y foto de perfil
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Foto de perfil */}
            <div className="flex flex-col items-center space-y-3">
              <Avatar className="w-24 h-24">
                <AvatarImage 
                  src={profileData.foto || undefined} 
                  alt="Foto de perfil" 
                />
                <AvatarFallback className="bg-green-100 text-green-700 text-lg">
                  {profileData.nombres.charAt(0)}{profileData.apellidos.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-center">
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <div className="flex items-center gap-2 text-sm text-green-700 hover:text-green-800">
                    <Camera className="h-4 w-4" />
                    Cambiar foto
                  </div>
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <span className="text-xs text-gray-500 mt-1">
                  JPG, PNG máx. 2MB
                </span>
              </div>
            </div>

            <Separator />

            {/* Campos de perfil */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="nombres">Nombres</Label>
                <Input
                  id="nombres"
                  value={profileData.nombres}
                  onChange={(e) => handleProfileChange('nombres', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellidos">Apellidos</Label>
                <Input
                  id="apellidos"
                  value={profileData.apellidos}
                  onChange={(e) => handleProfileChange('apellidos', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="telefono"
                  value={profileData.telefono}
                  onChange={(e) => handleProfileChange('telefono', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ocupacion">Ocupación</Label>
              <Input
                id="ocupacion"
                value={profileData.ocupacion}
                onChange={(e) => handleProfileChange('ocupacion', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Seguridad */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-700" />
              Seguridad
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => toast.info("Funcionalidad de cambio de contraseña disponible")}
            >
              <Key className="h-4 w-4 mr-2" />
              Cambiar Contraseña
            </Button>
            <div className="text-xs text-gray-500">
              <p>Última actualización: Hace 2 meses</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
