import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { ArrowLeft, Save } from "lucide-react"
import { toast } from "sonner"
import { EPSCombobox } from "./common/EPSCombobox"

// Base de datos simulada de usuarios (misma que en AdminContent)
const usuariosDB: any[] = [
  {
    id: 1,
    nombres: "Juan Carlos",
    apellidos: "Pérez García",
    email: "juan.perez@email.com",
    fechaNacimiento: "1990-05-15",
    tipoDocumento: "CC",
    documento: "1234567890",
    fechaExpedicion: "2020-03-10",
    direccion: "Calle 123 #45-67",
    eps: "Sura EPS",
    telefono: "3001234567",
    sexo: "Masculino",
    ocupacion: "Ingeniero",
    rol: "Usuario",
    fechaCreacion: "2024-01-15"
  },
  {
    id: 2,
    nombres: "María Elena",
    apellidos: "González López",
    email: "maria.gonzalez@email.com",
    fechaNacimiento: "1985-08-22",
    tipoDocumento: "CC",
    documento: "9876543210",
    fechaExpedicion: "2018-11-05",
    direccion: "Carrera 456 #78-90",
    eps: "Nueva EPS",
    telefono: "3109876543",
    sexo: "Femenino",
    ocupacion: "Doctora",
    rol: "Administrador",
    fechaCreacion: "2024-01-10"
  },
  {
    id: 3,
    nombres: "Carlos Alberto",
    apellidos: "Rodríguez Vargas",
    email: "carlos.rodriguez@email.com",
    fechaNacimiento: "1992-03-08",
    tipoDocumento: "CC",
    documento: "1122334455",
    fechaExpedicion: "2021-07-15",
    direccion: "Avenida 789 #12-34",
    eps: "Compensar EPS",
    telefono: "3201234567",
    sexo: "Masculino",
    ocupacion: "Abogado",
    rol: "Usuario",
    fechaCreacion: "2024-01-08"
  },
  {
    id: 4,
    nombres: "Ana Patricia",
    apellidos: "Martínez Sánchez",
    email: "ana.martinez@email.com",
    fechaNacimiento: "1988-11-12",
    tipoDocumento: "CC",
    documento: "5566778899",
    fechaExpedicion: "2019-09-20",
    direccion: "Calle 456 #78-90",
    eps: "Salud Total EPS",
    telefono: "3159876543",
    sexo: "Femenino",
    ocupacion: "Arquitecta",
    rol: "Usuario",
    fechaCreacion: "2024-01-05"
  },
  {
    id: 5,
    nombres: "Pedro Alejandro",
    apellidos: "Silva Moreno",
    email: "pedro.silva@email.com",
    fechaNacimiento: "1987-06-25",
    tipoDocumento: "CC",
    documento: "2233445566",
    fechaExpedicion: "2020-12-03",
    direccion: "Carrera 321 #54-76",
    eps: "Sura EPS",
    telefono: "3181234567",
    sexo: "Masculino",
    ocupacion: "Contador",
    rol: "Usuario",
    fechaCreacion: "2023-12-20"
  },
  {
    id: 6,
    nombres: "Laura Cristina",
    apellidos: "Herrera Jiménez",
    email: "laura.herrera@email.com",
    fechaNacimiento: "1993-09-14",
    tipoDocumento: "CC",
    documento: "7788990011",
    fechaExpedicion: "2022-04-18",
    direccion: "Calle 987 #65-43",
    eps: "Nueva EPS",
    telefono: "3229876543",
    sexo: "Femenino",
    ocupacion: "Psicóloga",
    rol: "Usuario",
    fechaCreacion: "2023-12-15"
  },
  {
    id: 7,
    nombres: "Diego Fernando",
    apellidos: "Morales Castro",
    email: "diego.morales@email.com",
    fechaNacimiento: "1991-01-30",
    tipoDocumento: "CC",
    documento: "3344556677",
    fechaExpedicion: "2021-08-12",
    direccion: "Avenida 654 #32-10",
    eps: "Compensar EPS",
    telefono: "3121234567",
    sexo: "Masculino",
    ocupacion: "Médico",
    rol: "Usuario",
    fechaCreacion: "2023-12-10"
  },
  {
    id: 8,
    nombres: "Sofia Isabella",
    apellidos: "Castro Ramírez",
    email: "sofia.castro@email.com",
    fechaNacimiento: "1994-04-07",
    tipoDocumento: "CC",
    documento: "8899001122",
    fechaExpedicion: "2023-01-25",
    direccion: "Carrera 147 #86-52",
    eps: "Salud Total",
    telefono: "3169876543",
    sexo: "Femenino",
    ocupacion: "Enfermera",
    rol: "Usuario",
    fechaCreacion: "2023-12-05"
  },
  {
    id: 9,
    nombres: "Roberto Carlos",
    apellidos: "Vega Mendoza",
    email: "roberto.vega@email.com",
    fechaNacimiento: "1986-12-19",
    tipoDocumento: "CC",
    documento: "4455667788",
    fechaExpedicion: "2019-06-14",
    direccion: "Calle 258 #74-96",
    eps: "Sura",
    telefono: "3131234567",
    sexo: "Masculino",
    ocupacion: "Empresario",
    rol: "Usuario",
    fechaCreacion: "2023-11-28"
  },
  {
    id: 10,
    nombres: "Carmen Lucía",
    apellidos: "Ruiz Fernández",
    email: "carmen.ruiz@email.com",
    fechaNacimiento: "1989-07-11",
    tipoDocumento: "CC",
    documento: "9900112233",
    fechaExpedicion: "2020-10-08",
    direccion: "Avenida 369 #15-28",
    eps: "Nueva EPS",
    telefono: "3219876543",
    sexo: "Femenino",
    ocupacion: "Profesora",
    rol: "Usuario",
    fechaCreacion: "2023-11-25"
  },
  {
    id: 11,
    nombres: "Andrés Felipe",
    apellidos: "Torres Gutiérrez",
    email: "andres.torres@email.com",
    fechaNacimiento: "1995-10-03",
    tipoDocumento: "CC",
    documento: "5566778800",
    fechaExpedicion: "2023-03-22",
    direccion: "Carrera 741 #63-85",
    eps: "Compensar",
    telefono: "3141234567",
    sexo: "Masculino",
    ocupacion: "Ingeniero de Software",
    rol: "Usuario",
    fechaCreacion: "2023-11-20"
  },
  {
    id: 12,
    nombres: "Valentina",
    apellidos: "López Serrano",
    email: "valentina.lopez@email.com",
    fechaNacimiento: "1996-02-17",
    tipoDocumento: "CC",
    documento: "1122334400",
    fechaExpedicion: "2023-05-30",
    direccion: "Calle 852 #41-69",
    eps: "Salud Total",
    telefono: "3259876543",
    sexo: "Femenino",
    ocupacion: "Diseñadora",
    rol: "Usuario",
    fechaCreacion: "2023-11-15"
  },
  {
    id: 13,
    nombres: "Miguel Ángel",
    apellidos: "Delgado Rojas",
    email: "miguel.delgado@email.com",
    fechaNacimiento: "1984-08-09",
    tipoDocumento: "CC",
    documento: "6677889900",
    fechaExpedicion: "2018-12-11",
    direccion: "Avenida 963 #27-44",
    eps: "Sura",
    telefono: "3151234567",
    sexo: "Masculino",
    ocupacion: "Veterinario",
    rol: "Usuario",
    fechaCreacion: "2023-11-12"
  },
  {
    id: 14,
    nombres: "Camila Andrea",
    apellidos: "Ospina Vargas",
    email: "camila.ospina@email.com",
    fechaNacimiento: "1997-05-26",
    tipoDocumento: "CC",
    documento: "2233445500",
    fechaExpedicion: "2023-07-19",
    direccion: "Carrera 159 #38-72",
    eps: "Nueva EPS",
    telefono: "3289876543",
    sexo: "Femenino",
    ocupacion: "Fisioterapeuta",
    rol: "Usuario",
    fechaCreacion: "2023-11-08"
  },
  {
    id: 15,
    nombres: "Sebastián",
    apellidos: "Aguilar Peña",
    email: "sebastian.aguilar@email.com",
    fechaNacimiento: "1993-12-04",
    tipoDocumento: "CC",
    documento: "7788990000",
    fechaExpedicion: "2022-09-26",
    direccion: "Calle 753 #49-81",
    eps: "Compensar",
    telefono: "3161234567",
    sexo: "Masculino",
    ocupacion: "Chef",
    rol: "Usuario",
    fechaCreacion: "2023-11-05"
  },
  {
    id: 16,
    nombres: "Natalia",
    apellidos: "Restrepo Molina",
    email: "natalia.restrepo@email.com",
    fechaNacimiento: "1990-11-21",
    tipoDocumento: "CC",
    documento: "3344556600",
    fechaExpedicion: "2021-02-14",
    direccion: "Avenida 486 #56-23",
    eps: "Salud Total",
    telefono: "3309876543",
    sexo: "Femenino",
    ocupacion: "Periodista",
    rol: "Usuario",
    fechaCreacion: "2023-11-02"
  },
  {
    id: 17,
    nombres: "Alejandro",
    apellidos: "Quintero Gómez",
    email: "alejandro.quintero@email.com",
    fechaNacimiento: "1985-03-18",
    tipoDocumento: "CC",
    documento: "8899001100",
    fechaExpedicion: "2019-11-07",
    direccion: "Carrera 842 #71-94",
    eps: "Sura",
    telefono: "3171234567",
    sexo: "Masculino",
    ocupacion: "Economista",
    rol: "Usuario",
    fechaCreacion: "2023-10-30"
  }
]

interface UserEditViewProps {
  userId: number
  onBack: () => void
}

export function UserEditView({ userId, onBack }: UserEditViewProps) {
  // Buscar el usuario por ID
  const user = usuariosDB.find(u => u.id === userId)
  
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    email: '',
    fechaNacimiento: '',
    tipoDocumento: '',
    documento: '',
    fechaExpedicion: '',
    direccion: '',
    eps: '',
    telefono: '',
    sexo: '',
    ocupacion: '',
    rol: ''
  })

  // Cargar datos del usuario cuando el componente se monte
  useEffect(() => {
    if (user) {
      setFormData({
        nombres: user.nombres || '',
        apellidos: user.apellidos || '',
        email: user.email || '',
        fechaNacimiento: user.fechaNacimiento || '',
        tipoDocumento: user.tipoDocumento || '',
        documento: user.documento || '',
        fechaExpedicion: user.fechaExpedicion || '',
        direccion: user.direccion || '',
        eps: user.eps || '',
        telefono: user.telefono || '',
        sexo: user.sexo || '',
        ocupacion: user.ocupacion || '',
        rol: user.rol || ''
      })
    }
  }, [user])

  if (!user) {
    return (
      <div className="p-6">
        <div className="mb-6 flex items-center gap-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
          <h1 className="text-2xl font-semibold text-gray-800">Usuario no encontrado</h1>
        </div>
        <Card className="rounded-xl">
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">El usuario solicitado no existe o ha sido eliminado.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    // Validar campos requeridos
    if (!formData.nombres || !formData.apellidos || !formData.email || !formData.documento) {
      toast.error("Por favor complete los campos obligatorios")
      return
    }

    // Actualizar usuario en la base de datos simulada
    const index = usuariosDB.findIndex(u => u.id === userId)
    if (index !== -1) {
      usuariosDB[index] = {
        ...usuariosDB[index],
        ...formData
      }
      toast.success("Usuario actualizado exitosamente")
      setTimeout(() => {
        onBack()
      }, 1000)
    } else {
      toast.error("Error al actualizar el usuario")
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
          <h1 className="text-2xl font-semibold text-gray-800">Editar Usuario</h1>
        </div>
        <Button
          onClick={handleSave}
          className="bg-green-700 hover:bg-green-800 text-white flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Guardar Cambios
        </Button>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="rounded-xl overflow-hidden">
          <CardHeader className="bg-green-700 text-white">
            <CardTitle>Información del Usuario</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Información Personal */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Información Personal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombres">Nombres *</Label>
                  <Input
                    id="nombres"
                    value={formData.nombres}
                    onChange={(e) => handleFormChange('nombres', e.target.value)}
                    placeholder="Nombres del usuario"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellidos">Apellidos *</Label>
                  <Input
                    id="apellidos"
                    value={formData.apellidos}
                    onChange={(e) => handleFormChange('apellidos', e.target.value)}
                    placeholder="Apellidos del usuario"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    value={formData.telefono}
                    onChange={(e) => handleFormChange('telefono', e.target.value)}
                    placeholder="3001234567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
                  <Input
                    id="fechaNacimiento"
                    type="date"
                    value={formData.fechaNacimiento}
                    onChange={(e) => handleFormChange('fechaNacimiento', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sexo">Sexo</Label>
                  <Select value={formData.sexo} onValueChange={(value) => handleFormChange('sexo', value)}>
                    <SelectTrigger id="sexo">
                      <SelectValue placeholder="Seleccionar sexo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Masculino">Masculino</SelectItem>
                      <SelectItem value="Femenino">Femenino</SelectItem>
                      <SelectItem value="Otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Documentación */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Documentación</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipoDocumento">Tipo de Documento *</Label>
                  <Select value={formData.tipoDocumento} onValueChange={(value) => handleFormChange('tipoDocumento', value)}>
                    <SelectTrigger id="tipoDocumento">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="T.I">T.I - Tarjeta de Identidad</SelectItem>
                      <SelectItem value="CC">CC - Cédula de Ciudadanía</SelectItem>
                      <SelectItem value="CE">CE - Cédula de Extranjería</SelectItem>
                      <SelectItem value="PA">PA - Pasaporte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="documento">Número de Documento *</Label>
                  <Input
                    id="documento"
                    value={formData.documento}
                    onChange={(e) => handleFormChange('documento', e.target.value)}
                    placeholder="1234567890"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fechaExpedicion">Fecha de Expedición</Label>
                  <Input
                    id="fechaExpedicion"
                    type="date"
                    value={formData.fechaExpedicion}
                    onChange={(e) => handleFormChange('fechaExpedicion', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Información de Contacto */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Información de Contacto y Salud</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input
                    id="direccion"
                    value={formData.direccion}
                    onChange={(e) => handleFormChange('direccion', e.target.value)}
                    placeholder="Calle 123 #45-67"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eps">EPS</Label>
                  <EPSCombobox
                    value={formData.eps}
                    onChange={(value) => handleFormChange('eps', value)}
                    placeholder="Buscar o seleccionar EPS..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ocupacion">Ocupación</Label>
                  <Input
                    id="ocupacion"
                    value={formData.ocupacion}
                    onChange={(e) => handleFormChange('ocupacion', e.target.value)}
                    placeholder="Profesión u ocupación"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rol">Rol</Label>
                  <Select value={formData.rol} onValueChange={(value) => handleFormChange('rol', value)}>
                    <SelectTrigger id="rol">
                      <SelectValue placeholder="Seleccionar rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Usuario">Usuario</SelectItem>
                      <SelectItem value="Administrador">Administrador</SelectItem>
                      <SelectItem value="Entrenador">Entrenador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-4 pt-6 border-t">
              <Button
                onClick={handleSave}
                className="bg-green-700 hover:bg-green-800 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Guardar Cambios
              </Button>
              <Button
                variant="outline"
                onClick={onBack}
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
