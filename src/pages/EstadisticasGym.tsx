/**
 * EstadisticasGym - Página de estadísticas del gimnasio
 * 
 * Muestra estadísticas base y opciones de exportación
 */

import { Activity, Download, BarChart3, Users, TrendingUp, FileText, Calendar, Filter, Printer } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input"
import { toast } from "sonner"
import { useState } from "react"

export function EstadisticasGym() {
  const [exportFormat, setExportFormat] = useState("pdf")
  const [dateRange, setDateRange] = useState("mes")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  // Estadísticas base de ejemplo
  const stats = {
    totalUsuarios: 50,
    usuariosActivos: 42,
    nuevasInscripciones: 8,
    promedioEdad: 32,
    totalValoraciones: 150,
    valoracionesMes: 60,
    promedioIMC: 24.5,
    progresoMetas: 76,
    frecuenciaEntrenamiento: 3.2,
  }

  const handleExport = () => {
    toast.info(`Generando reporte en formato ${exportFormat.toUpperCase()}...`, {
      description: "Esta es una demostración. En producción se generaría el archivo real."
    })
  }

  const handlePrint = () => {
    toast.info("Preparando para impresión...", {
      description: "Esta es una demostración. En producción se abriría el diálogo de impresión."
    })
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="h-8 w-8 text-green-600" />
            <h1 className="text-gray-900">Estadísticas e Informes</h1>
          </div>
          <p className="text-gray-600">
            Genera reportes y exporta estadísticas del gimnasio
          </p>
        </div>

        {/* Sección Principal: Exportar Reportes */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-green-600" />
              Generar y Exportar Reportes
            </CardTitle>
            <CardDescription>
              Configura y exporta reportes estadísticos personalizados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Configuración de Reporte */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Formato de Exportación */}
              <div className="space-y-2">
                <Label>Formato de Exportación</Label>
                <Select value={exportFormat} onValueChange={setExportFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF (Documento)</SelectItem>
                    <SelectItem value="excel">Excel (XLSX)</SelectItem>
                    <SelectItem value="csv">CSV (Datos)</SelectItem>
                    <SelectItem value="html">HTML (Web)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Rango de Fechas */}
              <div className="space-y-2">
                <Label>Rango de Fechas</Label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dia">Último día</SelectItem>
                    <SelectItem value="semana">Última semana</SelectItem>
                    <SelectItem value="mes">Último mes</SelectItem>
                    <SelectItem value="trimestre">Último trimestre</SelectItem>
                    <SelectItem value="anio">Último año</SelectItem>
                    <SelectItem value="personalizado">Personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tipo de Reporte */}
              <div className="space-y-2">
                <Label>Tipo de Reporte</Label>
                <Select defaultValue="completo">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="completo">Reporte Completo</SelectItem>
                    <SelectItem value="usuarios">Usuarios y Afiliados</SelectItem>
                    <SelectItem value="valoraciones">Valoraciones Físicas</SelectItem>
                    <SelectItem value="entrenamientos">Programas de Entrenamiento</SelectItem>
                    <SelectItem value="metas">Progreso de Metas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Fechas Personalizadas */}
            {dateRange === "personalizado" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-gray-50">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Fecha Inicio</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Fecha Fin</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Opciones de Exportación */}
            <div className="space-y-2">
              <Label>Opciones Adicionales</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="incluirGraficos" defaultChecked className="h-4 w-4" />
                  <Label htmlFor="incluirGraficos" className="text-sm">Incluir gráficos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="incluirTablas" defaultChecked className="h-4 w-4" />
                  <Label htmlFor="incluirTablas" className="text-sm">Incluir tablas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="incluirResumen" defaultChecked className="h-4 w-4" />
                  <Label htmlFor="incluirResumen" className="text-sm">Incluir resumen</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="contrasena" className="h-4 w-4" />
                  <Label htmlFor="contrasena" className="text-sm">Proteger con contraseña</Label>
                </div>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="flex flex-wrap gap-3 pt-4 border-t">
              <Button onClick={handleExport} className="bg-green-600 hover:bg-green-700">
                <Download className="h-4 w-4 mr-2" />
                Exportar Reporte
              </Button>
              
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Imprimir
              </Button>
              
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Vista Previa
              </Button>
              
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtros Avanzados
              </Button>
            </div>

            {/* Información de Exportación */}
            <div className="text-sm text-gray-500 p-3 bg-gray-50 rounded-md">
              <p className="font-medium mb-1">Formatos disponibles:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>PDF</strong>: Para informes formales y presentaciones</li>
                <li><strong>Excel</strong>: Para análisis de datos y procesamiento</li>
                <li><strong>CSV</strong>: Para importación a otras aplicaciones</li>
                <li><strong>HTML</strong>: Para visualización en navegador</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Estadísticas Base */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-gray-600" />
            Estadísticas Base del Sistema
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Usuarios */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Usuarios Totales</p>
                    <p className="text-2xl font-semibold">{stats.totalUsuarios}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  {stats.usuariosActivos} activos • {stats.nuevasInscripciones} nuevos este mes
                </p>
              </CardContent>
            </Card>

            {/* Valoraciones */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FileText className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Valoraciones</p>
                    <p className="text-2xl font-semibold">{stats.totalValoraciones}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  {stats.valoracionesMes} este mes • Promedio IMC: {stats.promedioIMC}
                </p>
              </CardContent>
            </Card>

            {/* Progreso */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Progreso Metas</p>
                    <p className="text-2xl font-semibold">{stats.progresoMetas}%</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Promedio de cumplimiento de objetivos
                </p>
              </CardContent>
            </Card>

            {/* Frecuencia */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Frecuencia entrenamiento</p>
                    <p className="text-2xl font-semibold">{stats.frecuenciaEntrenamiento}/sem</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Sesiones por semana • Edad promedio: {stats.promedioEdad}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Información Adicional */}
        <Card>
          <CardHeader>
            <CardTitle>Información del Reporte</CardTitle>
            <CardDescription>
              Detalles sobre la generación de reportes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="font-medium text-gray-700 mb-1">Datos Incluidos</p>
                <ul className="space-y-1 text-gray-600">
                  <li>• Estadísticas de usuarios</li>
                  <li>• Historial de valoraciones</li>
                  <li>• Progreso de objetivos</li>
                  <li>• Frecuencia de asistencia</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-700 mb-1">Periodos Disponibles</p>
                <ul className="space-y-1 text-gray-600">
                  <li>• Diario (últimas 24 horas)</li>
                  <li>• Semanal (últimos 7 días)</li>
                  <li>• Mensual (últimos 30 días)</li>
                  <li>• Anual (últimos 12 meses)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-700 mb-1">Notas Importantes</p>
                <ul className="space-y-1 text-gray-600">
                  <li>• Los datos se actualizan cada hora</li>
                  <li>• Los reportes incluyen marca de tiempo</li>
                  <li>• Máximo histórico: 2 años</li>
                  <li>• Los datos son anónimos por privacidad</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}