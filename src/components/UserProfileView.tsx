import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { ArrowLeft, User, Edit, Calendar, Mail, Phone, MapPin, Briefcase, Shield, Heart, TrendingDown, Activity, Target, Scale } from "lucide-react"
import { useGetById } from "../hooks/useGenericCrud"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

interface UserProfileViewProps {
  userId: number
  onNavigateBack: () => void
  onNavigateToEdit?: (userId: number) => void
}

interface Usuario {
  usu_di: number
  usu_nombre: string
  usu_apellido: string
  usu_email: string
  usu_direccion: string
  usu_fecha_nacimiento: string
  usu_fecha_expedicion: string
  usu_telefono: string
  usu_eps: string
  usu_ocupacion: string
  usu_ultima_val: string
  usu_status: boolean
  usu_sexo: string
  rol: {
    rol_id: number
    rol_nombre: string
    rol_descripcion: string
  }
  valoracion: Array<{
    val_id: number
    val_fecha: string
    val_recomendacion: string
    val_prox_control: string
  }>
}

export function UserProfileView({ userId, onNavigateBack, onNavigateToEdit }: UserProfileViewProps) {
  const { data: usuario, isLoading, error } = useGetById<Usuario>("usuario", userId)

  // Datos de ejemplo para las gráficas de progreso
  const pesoData = [
    { mes: 'Ene', peso: 77.8 },
    { mes: 'Feb', peso: 76.5 },
    { mes: 'Mar', peso: 75.2 },
    { mes: 'Abr', peso: 74.1 },
    { mes: 'May', peso: 73.5 },
    { mes: 'Jun', peso: 72.5 },
  ]

  const imcData = [
    { mes: 'Ene', imc: 26.8 },
    { mes: 'Feb', imc: 26.3 },
    { mes: 'Mar', imc: 25.9 },
    { mes: 'Abr', imc: 25.5 },
    { mes: 'May', imc: 25.1 },
    { mes: 'Jun', imc: 24.8 },
  ]

  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Cargando información del usuario...
      </div>
    )
  }

  if (error || !usuario) {
    return (
      <div className="p-6">
        <Button variant="ghost" onClick={onNavigateBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Volver
        </Button>
        <Card>
          <CardContent className="py-8 text-center text-gray-500">
            Usuario no encontrado
          </CardContent>
        </Card>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "No especificado"
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onNavigateBack}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Volver
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

      {/* ESTADÍSTICAS */}
      {/* Tarjetas de métricas rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="pt-6 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium mb-1">Meta de Peso</p>
                <p className="text-2xl font-bold text-green-900">70.0 kg</p>
              </div>
              <Target className="h-10 w-10 text-green-600 opacity-60" />
            </div>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 bg-green-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <span className="text-xs font-medium text-green-700">75%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="pt-6 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium mb-1">Valoraciones</p>
                <p className="text-2xl font-bold text-blue-900">{usuario?.valoracion?.length || 0}</p>
              </div>
              <Calendar className="h-10 w-10 text-blue-600 opacity-60" />
            </div>
            <p className="text-xs text-blue-600 mt-3">Total realizadas</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="pt-6 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-medium mb-1">Grasa Corporal</p>
                <p className="text-2xl font-bold text-purple-900">18.5%</p>
              </div>
              <TrendingDown className="h-10 w-10 text-purple-600 opacity-60" />
            </div>
            <p className="text-xs text-purple-600 mt-3">-3.2% este mes</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="pt-6 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700 font-medium mb-1">Masa Muscular</p>
                <p className="text-2xl font-bold text-orange-900">42.3%</p>
              </div>
              <Activity className="h-10 w-10 text-orange-600 opacity-60" />
            </div>
            <p className="text-xs text-orange-600 mt-3">+1.8% este mes</p>
          </CardContent>
        </Card>
      </div>

      {/* INFO PERSONAL */}
      <Card className="rounded-xl overflow-hidden mb-6">
        <CardHeader className="bg-green-700 text-white">
          <CardTitle className="flex items-center gap-2 text-xl font-bold">
            <User className="h-6 w-6" /> Información Personal
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                <User className="h-4 w-4" />
                Nombre Completo
              </p>
              <div className="p-3 bg-gray-50 rounded-xl font-medium">
                {usuario.usu_nombre} {usuario.usu_apellido}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Documento
              </p>
              <div className="p-3 bg-gray-50 rounded-xl">
                {usuario.usu_di}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </p>
              <div className="p-3 bg-gray-50 rounded-xl">
                {usuario.usu_email || "No especificado"}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Teléfono
              </p>
              <div className="p-3 bg-gray-50 rounded-xl">
                {usuario.usu_telefono || "No especificado"}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Dirección
              </p>
              <div className="p-3 bg-gray-50 rounded-xl">
                {usuario.usu_direccion || "No especificada"}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                <User className="h-4 w-4" />
                Sexo
              </p>
              <div className="p-3 bg-gray-50 rounded-xl">
                {usuario.usu_sexo === 'M' ? 'Masculino' : usuario.usu_sexo === 'F' ? 'Femenino' : usuario.usu_sexo || "No especificado"}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                <Heart className="h-4 w-4" />
                EPS
              </p>
              <div className="p-3 bg-gray-50 rounded-xl">
                {usuario.usu_eps || "No especificada"}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Ocupación
              </p>
              <div className="p-3 bg-gray-50 rounded-xl">
                {usuario.usu_ocupacion || "No especificada"}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Estado
              </p>
              <Badge className={usuario.usu_status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                {usuario.usu_status ? "Activo" : "Inactivo"}
              </Badge>
            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-6 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <div>
                <span className="text-sm text-gray-600">Fecha de nacimiento:</span>{" "}
                <span className="font-medium">{formatDate(usuario.usu_fecha_nacimiento)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <div>
                <span className="text-sm text-gray-600">Expedición documento:</span>{" "}
                <span className="font-medium">{formatDate(usuario.usu_fecha_expedicion)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <div>
                <span className="text-sm text-gray-600">Última valoración:</span>{" "}
                <span className="font-medium">{formatDate(usuario.usu_ultima_val)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ROL Y PERMISOS */}
      {usuario.rol && (
        <Card className="rounded-xl overflow-hidden mb-6">
          <CardHeader className="bg-green-700 text-white">
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <Shield className="h-6 w-6" /> Rol y Permisos
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Rol</p>
                <div className="p-3 bg-blue-50 rounded-xl font-medium text-blue-900">
                  {usuario.rol.rol_nombre}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Descripción</p>
                <div className="p-3 bg-gray-50 rounded-xl">
                  {usuario.rol.rol_descripcion || "Sin descripción"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      {/* VALORACIONES */}
      {usuario.valoracion && usuario.valoracion.length > 0 && (
        <Card className="rounded-xl overflow-hidden">
          <CardHeader className="bg-green-700 text-white">
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <Calendar className="h-6 w-6" /> Historial de Valoraciones
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6">
            <div className="space-y-4">
              {usuario.valoracion.map((val) => (
                <div key={val.val_id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Fecha de valoración</p>
                      <p className="font-medium">{formatDate(val.val_fecha)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Próximo control</p>
                      <p className="font-medium">{formatDate(val.val_prox_control)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Recomendación</p>
                      <p className="font-medium">{val.val_recomendacion || "Sin recomendaciones"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 mt-6">
        {/* Progreso de Peso */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-black pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  Evolución de Peso
                </CardTitle>
                <p className="text-sm text-green-100 mt-1">Últimos 6 meses</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">72.5 kg</p>
                <p className="text-sm text-green-100">Actual</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={pesoData}>
                <defs>
                  <linearGradient id="colorPeso" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="mes" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <YAxis domain={[70, 80]} stroke="#6b7280" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  formatter={(value: any) => [`${value} kg`, 'Peso']}
                />
                <Area
                  type="monotone"
                  dataKey="peso"
                  stroke="#16a34a"
                  strokeWidth={3}
                  fill="url(#colorPeso)"
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-700">-5.3 kg</p>
                <p className="text-xs text-gray-600">Perdido</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-700">74.2 kg</p>
                <p className="text-xs text-gray-600">Promedio</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-700">77.8 kg</p>
                <p className="text-xs text-gray-600">Inicial</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progreso de IMC */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-black pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Evolución de IMC
                </CardTitle>
                <p className="text-sm text-blue-100 mt-1">Índice de Masa Corporal</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">24.8</p>
                <p className="text-sm text-blue-100">Normal</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={imcData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="mes" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <YAxis domain={[24, 27]} stroke="#6b7280" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  formatter={(value: any) => [value, 'IMC']}
                />
                <Line
                  type="monotone"
                  dataKey="imc"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ fill: '#2563eb', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-700">-2.0</p>
                <p className="text-xs text-gray-600">Reducción</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-700">25.6</p>
                <p className="text-xs text-gray-600">Promedio</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-700">26.8</p>
                <p className="text-xs text-gray-600">Inicial</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>


    </div>
  )
}
