/**
 * Perfil - Página de perfil del usuario autenticado
 * 
 * Muestra y permite editar la información del usuario autenticado actual.
 * Los datos se obtendrán y actualizarán a través de la API del backend personalizado.
 */

import { useState } from "react"
import { useAuth } from "../context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Separator } from "../components/ui/separator"
import { Avatar, AvatarFallback } from "../components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { toast } from "sonner"
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Shield, Key } from "lucide-react"

export function Perfil() {
  const { user } = useAuth()
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  
  const [profileData, setProfileData] = useState({
    nombres: user?.name || '',
    apellidos: '',
    email: user?.email || '',
    telefono: '',
    direccion: '',
    ocupacion: ''
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }))
  }

  const handleSaveProfile = async () => {
    try {
      // TODO: Aquí se conectará con la API del backend
      // const response = await fetch('/api/usuarios/perfil', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(profileData)
      // })
      
      toast.success("Perfil actualizado exitosamente")
      setIsEditingProfile(false)
    } catch (error) {
      toast.error("Error al actualizar el perfil")
    }
  }

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Las contraseñas no coinciden")
      return
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres")
      return
    }

    try {
      // TODO: Aquí se conectará con la API del backend
      // const response = await fetch('/api/usuarios/cambiar-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     currentPassword: passwordData.currentPassword,
      //     newPassword: passwordData.newPassword
      //   })
      // })
      
      toast.success("Contraseña actualizada exitosamente")
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setIsChangingPassword(false)
    } catch (error) {
      toast.error("Error al cambiar la contraseña")
    }
  }

  const getInitials = () => {
    if (user?.name) {
      const names = user.name.split(' ')
      return names.length > 1 
        ? `${names[0][0]}${names[1][0]}`
        : names[0][0]
    }
    return 'U'
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-green-700 mb-2">Mi Perfil</h1>
        <p className="text-gray-600">Gestiona tu información personal y configuración</p>
      </div>

      <div className="grid gap-6">
        {/* Información General */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-green-600 text-white text-2xl">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{user?.name || 'Usuario'}</CardTitle>
                  <CardDescription>{user?.email}</CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <Shield className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {user?.role || 'Usuario'}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant={isEditingProfile ? "outline" : "default"}
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className={!isEditingProfile ? "bg-green-600 hover:bg-green-700" : ""}
              >
                {isEditingProfile ? 'Cancelar' : 'Editar Perfil'}
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Datos Personales */}
        <Card>
          <CardHeader>
            <CardTitle>Datos Personales</CardTitle>
            <CardDescription>
              {isEditingProfile ? 'Edita tu información personal' : 'Información de tu cuenta'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombres">
                  <User className="h-4 w-4 inline mr-2" />
                  Nombres
                </Label>
                <Input
                  id="nombres"
                  value={profileData.nombres}
                  onChange={(e) => handleProfileChange('nombres', e.target.value)}
                  disabled={!isEditingProfile}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellidos">
                  <User className="h-4 w-4 inline mr-2" />
                  Apellidos
                </Label>
                <Input
                  id="apellidos"
                  value={profileData.apellidos}
                  onChange={(e) => handleProfileChange('apellidos', e.target.value)}
                  disabled={!isEditingProfile}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="h-4 w-4 inline mr-2" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  disabled={!isEditingProfile}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono">
                  <Phone className="h-4 w-4 inline mr-2" />
                  Teléfono
                </Label>
                <Input
                  id="telefono"
                  value={profileData.telefono}
                  onChange={(e) => handleProfileChange('telefono', e.target.value)}
                  disabled={!isEditingProfile}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="direccion">
                <MapPin className="h-4 w-4 inline mr-2" />
                Dirección
              </Label>
              <Input
                id="direccion"
                value={profileData.direccion}
                onChange={(e) => handleProfileChange('direccion', e.target.value)}
                disabled={!isEditingProfile}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ocupacion">
                <Briefcase className="h-4 w-4 inline mr-2" />
                Ocupación
              </Label>
              <Input
                id="ocupacion"
                value={profileData.ocupacion}
                onChange={(e) => handleProfileChange('ocupacion', e.target.value)}
                disabled={!isEditingProfile}
              />
            </div>

            {isEditingProfile && (
              <>
                <Separator />
                <div className="flex gap-3">
                  <Button onClick={handleSaveProfile} className="bg-green-600 hover:bg-green-700">
                    Guardar Cambios
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                    Cancelar
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Seguridad */}
        <Card>
          <CardHeader>
            <CardTitle>Seguridad</CardTitle>
            <CardDescription>Gestiona tu contraseña y seguridad de la cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog open={isChangingPassword} onOpenChange={setIsChangingPassword}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">
                  <Key className="h-4 w-4 mr-2" />
                  Cambiar Contraseña
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cambiar Contraseña</DialogTitle>
                  <DialogDescription>
                    Ingresa tu contraseña actual y la nueva contraseña
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Contraseña Actual</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nueva Contraseña</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsChangingPassword(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleChangePassword} className="bg-green-600 hover:bg-green-700">
                    Cambiar Contraseña
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Información de la cuenta */}
        <Card>
          <CardHeader>
            <CardTitle>Información de la Cuenta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Miembro desde
                </span>
                <span>Enero 2024</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-gray-600">
                  <Shield className="h-4 w-4 inline mr-2" />
                  Rol
                </span>
                <span className="font-medium">{user?.role || 'Usuario'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
