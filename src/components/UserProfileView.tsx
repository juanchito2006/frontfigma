import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, FileText, Dumbbell, Activity, Edit } from "lucide-react"

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
    eps: "Sura",
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
    eps: "Compensar",
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
    eps: "Salud Total",
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
    eps: "Sura",
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
    eps: "Compensar",
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

interface UserProfileViewProps {
  userId: number
  onBack: () => void
  onNavigateToEdit?: (userId: number) => void
}

export function UserProfileView({ userId, onBack, onNavigateToEdit }: UserProfileViewProps) {
  // Buscar el usuario por ID
  const user = usuariosDB.find(u => u.id === userId)
  
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
            <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">El usuario solicitado no existe o ha sido eliminado.</p>
          </CardContent>
        </Card>
      </div>
    )
  }
  // Simular valoraciones del usuario basadas en su información
  const userValoraciones = [
    {
      id: 1,
      fecha: "2024-01-15",
      tipo: "Valoración Inicial",
      estado: "Completada",
      observaciones: "Evaluación física inicial, buen estado general",
      peso: "75 kg",
      altura: "175 cm",
      imc: "24.5"
    },
    {
      id: 2,
      fecha: "2024-01-28",
      tipo: "Seguimiento",
      estado: "Completada", 
      observaciones: "Progreso satisfactorio, mejora en resistencia",
      peso: "74 kg",
      altura: "175 cm",
      imc: "24.2"
    }
  ]

  // Simular programas de entrenamiento asignados
  const programasAsignados = [
    {
      id: 1,
      nombre: "Programa de Fuerza Básico",
      fechaInicio: "2024-01-16",
      duracion: "8 semanas",
      estado: "Activo",
      progreso: "75%",
      entrenador: "Carlos Rodríguez"
    },
    {
      id: 2,
      nombre: "Acondicionamiento Cardiovascular",
      fechaInicio: "2024-02-01", 
      duracion: "4 semanas",
      estado: "Completado",
      progreso: "100%",
      entrenador: "María González"
    }
  ]

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
          <h1 className="text-2xl font-semibold text-gray-800">Perfil de Usuario</h1>
        </div>
        {onNavigateToEdit && (
          <Button
            onClick={() => onNavigateToEdit(userId)}
            className="bg-green-700 hover:bg-green-800 text-white flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Editar Usuario
          </Button>
        )}
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Información Personal */}
        <Card className="rounded-xl overflow-hidden">
          <CardHeader className="bg-green-700 text-white">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Información Personal
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600">Nombre Completo</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    {user.nombres} {user.apellidos}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600">Documento</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    {user.tipoDocumento}: {user.documento}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600">Fecha de Nacimiento</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    {user.fechaNacimiento || 'No especificada'}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600">Email</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    {user.email}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600">Teléfono</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    {user.telefono || 'No especificado'}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600">Sexo</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    {user.sexo || 'No especificado'}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600">Dirección</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    {user.direccion || 'No especificada'}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600">EPS</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    {user.eps || 'No especificada'}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600">Rol</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <Badge className="bg-green-100 text-green-800">
                      {user.rol || 'Usuario'}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-600">Ocupación:</span>
                  <span className="ml-2 text-gray-800">{user.ocupacion || 'No especificada'}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Fecha de registro:</span>
                  <span className="ml-2 text-gray-800">{user.fechaCreacion}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Valoraciones Realizadas */}
        <Card className="rounded-xl overflow-hidden">
          <CardHeader className="bg-green-700 text-white">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Valoraciones Realizadas ({userValoraciones.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {userValoraciones.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Peso</TableHead>
                    <TableHead>IMC</TableHead>
                    <TableHead>Observaciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userValoraciones.map((valoracion) => (
                    <TableRow key={valoracion.id}>
                      <TableCell>{valoracion.fecha}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{valoracion.tipo}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          {valoracion.estado}
                        </Badge>
                      </TableCell>
                      <TableCell>{valoracion.peso}</TableCell>
                      <TableCell>{valoracion.imc}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {valoracion.observaciones}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No se han realizado valoraciones para este usuario</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Programas de Entrenamiento */}
        <Card className="rounded-xl overflow-hidden">
          <CardHeader className="bg-green-700 text-white">
            <CardTitle className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5" />
              Programas de Entrenamiento Asignados ({programasAsignados.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {programasAsignados.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Programa</TableHead>
                    <TableHead>Fecha Inicio</TableHead>
                    <TableHead>Duración</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Progreso</TableHead>
                    <TableHead>Entrenador</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {programasAsignados.map((programa) => (
                    <TableRow key={programa.id}>
                      <TableCell className="font-medium">{programa.nombre}</TableCell>
                      <TableCell>{programa.fechaInicio}</TableCell>
                      <TableCell>{programa.duracion}</TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            programa.estado === 'Activo' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }
                        >
                          {programa.estado}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: programa.progreso }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{programa.progreso}</span>
                        </div>
                      </TableCell>
                      <TableCell>{programa.entrenador}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Dumbbell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No se han asignado programas de entrenamiento a este usuario</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Estadísticas Resumidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="rounded-xl">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-700 mb-2">
                {userValoraciones.length}
              </div>
              <div className="text-sm text-gray-600">Valoraciones Realizadas</div>
            </CardContent>
          </Card>
          
          <Card className="rounded-xl">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-700 mb-2">
                {programasAsignados.filter(p => p.estado === 'Activo').length}
              </div>
              <div className="text-sm text-gray-600">Programas Activos</div>
            </CardContent>
          </Card>
          
          <Card className="rounded-xl">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-700 mb-2">
                {Math.round((new Date().getTime() - new Date(user.fechaCreacion).getTime()) / (1000 * 60 * 60 * 24))}
              </div>
              <div className="text-sm text-gray-600">Días como Usuario</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}