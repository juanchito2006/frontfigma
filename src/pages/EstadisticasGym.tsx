/**
 * EstadisticasGym - Página de estadísticas del gimnasio
 * 
 * Muestra estadísticas completas del gimnasio incluyendo:
 * - IMC promedio por género
 * - Metas cumplidas
 * - Distribución de condición física
 * - Gráficos y métricas adicionales
 */

import { Activity, Target, TrendingUp, Users, Award, Calendar as CalendarIcon } from "lucide-react"
import { Progress } from "../components/ui/progress"
import { Badge } from "../components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"

export function EstadisticasGym() {
  // Datos de ejemplo - en producción vendrían de una API
  const stats = {
    imcHombres: {
      promedio: 24.8,
      categoria: "Normal",
      total: 28
    },
    imcMujeres: {
      promedio: 23.2,
      categoria: "Normal",
      total: 22
    },
    metasCumplidas: 76,
    totalMetas: 50,
    metasAlcanzadas: 38,
    condicionFisica: {
      bajoPeso: { cantidad: 4, porcentaje: 8 },
      normal: { cantidad: 22, porcentaje: 44 },
      sobrepeso: { cantidad: 16, porcentaje: 32 },
      obesidad: { cantidad: 8, porcentaje: 16 }
    },
    totalUsuarios: 50,
    usuariosActivos: 40,
    promedioAsistencia: 82
  }

  /**
   * Determina el color de la barra según el IMC
   */
  const getIMCColor = (imc: number) => {
    if (imc < 18.5) return "bg-blue-500"
    if (imc < 25) return "bg-green-500"
    if (imc < 30) return "bg-yellow-500"
    return "bg-red-500"
  }

  /**
   * Calcula el porcentaje de IMC para la barra visual (escala 15-35)
   */
  const getIMCProgress = (imc: number) => {
    const min = 15
    const max = 35
    return ((imc - min) / (max - min)) * 100
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="h-8 w-8 text-green-600" />
            <h1 className="text-gray-900">Estadísticas</h1>
          </div>
          <p className="text-gray-600">
            Resumen completo de métricas y estadísticas del gimnasio
          </p>
        </div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Total Usuarios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-900">{stats.totalUsuarios}</div>
              <p className="text-xs text-gray-500 mt-1">
                {stats.usuariosActivos} activos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Metas Cumplidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-900">{stats.metasCumplidas}%</div>
              <p className="text-xs text-gray-500 mt-1">
                {stats.metasAlcanzadas} de {stats.totalMetas}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Asistencia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-900">{stats.promedioAsistencia}%</div>
              <p className="text-xs text-gray-500 mt-1">
                Promedio mensual
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
                <Award className="h-4 w-4" />
                Condición Normal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-900">{stats.condicionFisica.normal.porcentaje}%</div>
              <p className="text-xs text-gray-500 mt-1">
                {stats.condicionFisica.normal.cantidad} usuarios
              </p>
            </CardContent>
          </Card>
        </div>

        {/* IMC por Género */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* IMC Hombres */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                IMC Promedio - Hombres
              </CardTitle>
              <CardDescription>
                Índice de Masa Corporal promedio en usuarios masculinos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-gray-900 text-4xl">{stats.imcHombres.promedio}</div>
                  <p className="text-sm text-gray-600 mt-1">{stats.imcHombres.categoria}</p>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {stats.imcHombres.total} usuarios
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Bajo peso (&lt;18.5)</span>
                  <span>Normal (18.5-24.9)</span>
                  <span>Sobrepeso (25-29.9)</span>
                  <span>Obesidad (≥30)</span>
                </div>
                <Progress 
                  value={getIMCProgress(stats.imcHombres.promedio)} 
                  className="h-3"
                  indicatorClassName={getIMCColor(stats.imcHombres.promedio)}
                />
              </div>

              <div className="pt-4 border-t">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Mínimo registrado:</span>
                    <span className="text-gray-900 ml-2">19.2</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Máximo registrado:</span>
                    <span className="text-gray-900 ml-2">32.5</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* IMC Mujeres */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-pink-600" />
                IMC Promedio - Mujeres
              </CardTitle>
              <CardDescription>
                Índice de Masa Corporal promedio en usuarios femeninos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-gray-900 text-4xl">{stats.imcMujeres.promedio}</div>
                  <p className="text-sm text-gray-600 mt-1">{stats.imcMujeres.categoria}</p>
                </div>
                <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">
                  {stats.imcMujeres.total} usuarios
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Bajo peso (&lt;18.5)</span>
                  <span>Normal (18.5-24.9)</span>
                  <span>Sobrepeso (25-29.9)</span>
                  <span>Obesidad (≥30)</span>
                </div>
                <Progress 
                  value={getIMCProgress(stats.imcMujeres.promedio)} 
                  className="h-3"
                  indicatorClassName={getIMCColor(stats.imcMujeres.promedio)}
                />
              </div>

              <div className="pt-4 border-t">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Mínimo registrado:</span>
                    <span className="text-gray-900 ml-2">18.1</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Máximo registrado:</span>
                    <span className="text-gray-900 ml-2">31.2</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Metas Cumplidas */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600" />
              Progreso de Metas
            </CardTitle>
            <CardDescription>
              Porcentaje de metas alcanzadas por los usuarios del gimnasio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-gray-900 text-4xl">{stats.metasCumplidas}%</div>
                <p className="text-sm text-gray-600 mt-1">
                  {stats.metasAlcanzadas} metas cumplidas de {stats.totalMetas} totales
                </p>
              </div>
            </div>
            
            <Progress 
              value={stats.metasCumplidas} 
              className="h-4"
              indicatorClassName="bg-green-600"
            />

            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div>
                <div className="text-green-700 text-2xl">26</div>
                <p className="text-sm text-gray-600">Metas de peso</p>
              </div>
              <div>
                <div className="text-blue-700 text-2xl">11</div>
                <p className="text-sm text-gray-600">Metas de resistencia</p>
              </div>
              <div>
                <div className="text-purple-700 text-2xl">13</div>
                <p className="text-sm text-gray-600">Metas de fuerza</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Distribución por Condición Física */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-600" />
              Distribución por Condición Física
            </CardTitle>
            <CardDescription>
              Cantidad de usuarios según su índice de masa corporal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Bajo Peso */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Bajo Peso
                    </Badge>
                    <span className="text-sm text-gray-600">IMC &lt; 18.5</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">
                      {stats.condicionFisica.bajoPeso.cantidad} usuarios
                    </span>
                    <span className="text-sm text-gray-900">
                      {stats.condicionFisica.bajoPeso.porcentaje}%
                    </span>
                  </div>
                </div>
                <Progress 
                  value={stats.condicionFisica.bajoPeso.porcentaje} 
                  className="h-2"
                  indicatorClassName="bg-blue-500"
                />
              </div>

              {/* Normal */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Normal
                    </Badge>
                    <span className="text-sm text-gray-600">IMC 18.5 - 24.9</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">
                      {stats.condicionFisica.normal.cantidad} usuarios
                    </span>
                    <span className="text-sm text-gray-900">
                      {stats.condicionFisica.normal.porcentaje}%
                    </span>
                  </div>
                </div>
                <Progress 
                  value={stats.condicionFisica.normal.porcentaje} 
                  className="h-2"
                  indicatorClassName="bg-green-500"
                />
              </div>

              {/* Sobrepeso */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      Sobrepeso
                    </Badge>
                    <span className="text-sm text-gray-600">IMC 25 - 29.9</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">
                      {stats.condicionFisica.sobrepeso.cantidad} usuarios
                    </span>
                    <span className="text-sm text-gray-900">
                      {stats.condicionFisica.sobrepeso.porcentaje}%
                    </span>
                  </div>
                </div>
                <Progress 
                  value={stats.condicionFisica.sobrepeso.porcentaje} 
                  className="h-2"
                  indicatorClassName="bg-yellow-500"
                />
              </div>

              {/* Obesidad */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      Obesidad
                    </Badge>
                    <span className="text-sm text-gray-600">IMC ≥ 30</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">
                      {stats.condicionFisica.obesidad.cantidad} usuarios
                    </span>
                    <span className="text-sm text-gray-900">
                      {stats.condicionFisica.obesidad.porcentaje}%
                    </span>
                  </div>
                </div>
                <Progress 
                  value={stats.condicionFisica.obesidad.porcentaje} 
                  className="h-2"
                  indicatorClassName="bg-red-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}