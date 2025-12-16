import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { toast } from "sonner";
import { 
  Settings,
  Save,
  RotateCcw,
  Bell,
  Shield,
  Database,
  Clock,
  Info
} from "lucide-react";

export function ConfigurationSettings() {
  // Estados para diferentes configuraciones
  const [settings, setSettings] = useState({
    // General
    nombreSistema: "Gym Combarranquilla",
    horarioApertura: "06:00",
    horarioCierre: "22:00",
    
    // Notificaciones
    emailNotificaciones: true,
    pushNotificaciones: true,
    
    // Seguridad
    autoLogout: true,
    tiempoSesion: "30",
    
    // Sistema
    backupAutomatico: true,
    mantenerLogs: true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (field: string, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simular guardado
      await new Promise(resolve => setTimeout(resolve, 800));
      setHasChanges(false);
      toast.success("Configuraciones guardadas");
    } catch {
      toast.error("Error al guardar");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("¿Restablecer todas las configuraciones a valores por defecto?")) {
      setSettings({
        nombreSistema: "Gym Combarranquilla",
        horarioApertura: "06:00",
        horarioCierre: "22:00",
        emailNotificaciones: true,
        pushNotificaciones: true,
        autoLogout: true,
        tiempoSesion: "30",
        backupAutomatico: true,
        mantenerLogs: true,
      });
      setHasChanges(true);
      toast.info("Configuraciones restablecidas");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <Settings className="h-6 w-6 text-green-700" />
          Configuración del Sistema
        </h1>
        <p className="text-gray-600 mt-1">Ajusta el comportamiento de la aplicación</p>
      </div>

      {/* Indicador de cambios */}
      {hasChanges && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-sm text-amber-800 flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            Tienes cambios sin guardar
          </p>
        </div>
      )}

      {/* Configuración General */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-green-700" />
            Configuración General
          </CardTitle>
          <CardDescription>Ajustes básicos del sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombreSistema">Nombre del Sistema</Label>
              <Input
                id="nombreSistema"
                value={settings.nombreSistema}
                onChange={(e) => handleChange("nombreSistema", e.target.value)}
                placeholder="Nombre del gimnasio"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Tiempo de Sesión (minutos)</Label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="5"
                  max="120"
                  step="5"
                  value={settings.tiempoSesion}
                  onChange={(e) => handleChange("tiempoSesion", e.target.value)}
                  className="flex-1"
                />
                <span className="w-12 text-center font-medium">{settings.tiempoSesion}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="horarioApertura">Horario de Apertura</Label>
              <Input
                id="horarioApertura"
                type="time"
                value={settings.horarioApertura}
                onChange={(e) => handleChange("horarioApertura", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="horarioCierre">Horario de Cierre</Label>
              <Input
                id="horarioCierre"
                type="time"
                value={settings.horarioCierre}
                onChange={(e) => handleChange("horarioCierre", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notificaciones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-green-700" />
            Notificaciones
          </CardTitle>
          <CardDescription>Configura cómo recibes notificaciones</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Notificaciones por Email</Label>
                <p className="text-sm text-gray-500">Recibir recordatorios y alertas por correo</p>
              </div>
              <Switch
                checked={settings.emailNotificaciones}
                onCheckedChange={(checked) => handleChange("emailNotificaciones", checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Notificaciones Push</Label>
                <p className="text-sm text-gray-500">Alertas en tiempo real en el sistema</p>
              </div>
              <Switch
                checked={settings.pushNotificaciones}
                onCheckedChange={(checked) => handleChange("pushNotificaciones", checked)}
              />
            </div>
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
          <CardDescription>Configuración de seguridad del sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Cierre Automático de Sesión</Label>
                <p className="text-sm text-gray-500">Cerrar sesión automáticamente después de {settings.tiempoSesion} minutos</p>
              </div>
              <Switch
                checked={settings.autoLogout}
                onCheckedChange={(checked) => handleChange("autoLogout", checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Mantener Logs del Sistema</Label>
                <p className="text-sm text-gray-500">Registrar todas las actividades realizadas</p>
              </div>
              <Switch
                checked={settings.mantenerLogs}
                onCheckedChange={(checked) => handleChange("mantenerLogs", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-green-700" />
            Sistema
          </CardTitle>
          <CardDescription>Configuración del sistema y mantenimiento</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Backup Automático</Label>
                <p className="text-sm text-gray-500">Realizar copias de seguridad automáticamente</p>
              </div>
              <Switch
                checked={settings.backupAutomatico}
                onCheckedChange={(checked) => handleChange("backupAutomatico", checked)}
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="pt-2">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => toast.info("Backup manual iniciado correctamente")}
            >
              <Database className="h-4 w-4 mr-2" />
              Realizar Backup Manual Ahora
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Información del Sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-green-700" />
            Información del Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-500">Versión</p>
              <p className="font-semibold">v1.2.0</p>
            </div>
            <div>
              <p className="font-medium text-gray-500">Última Actualización</p>
              <p className="font-semibold">15 Dic 2025</p>
            </div>
            <div>
              <p className="font-medium text-gray-500">Base de Datos</p>
              <p className="font-semibold">PostgreSQL</p>
            </div>
            <div>
              <p className="font-medium text-gray-500">Entorno</p>
              <p className="font-semibold">Producción</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botones de Acción */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button
          variant="outline"
          onClick={handleReset}
          disabled={isSaving}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Restablecer
        </Button>
        
        <Button
          onClick={handleSave}
          disabled={!hasChanges || isSaving}
          className="bg-green-700 hover:bg-green-800"
        >
          {isSaving ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Guardar Cambios
            </>
          )}
        </Button>
      </div>
    </div>
  );
}