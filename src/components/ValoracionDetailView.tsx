import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "./ui/dialog"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { ArrowLeft, Download, Mail, FileText, Send, Edit } from "lucide-react"
import { toast } from "sonner"
import { useValoracion } from "../context/ValoracionContext"

interface ValoracionDetailViewProps {
  valoracionId: number
  onBack: () => void
  onEdit?: (valoracionId: number) => void
}

export function ValoracionDetailView({ valoracionId, onBack, onEdit }: ValoracionDetailViewProps) {
  const [showExportModal, setShowExportModal] = useState(false)
  const [sendByEmail, setSendByEmail] = useState(false)
  const [alternativeEmail, setAlternativeEmail] = useState(false)
  
  const { getValoracion } = useValoracion()
  
  // Obtener la valoración desde el contexto
  const valoracion = getValoracion(valoracionId)
  
  if (!valoracion) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2>Valoración no encontrada</h2>
          <Button onClick={onBack} className="mt-4">Volver</Button>
        </div>
      </div>
    )
  }

  const handleExport = (format: 'pdf' | 'email') => {
    if (format === 'pdf') {
      toast.success("Exportando valoración como PDF...")
      setTimeout(() => {
        toast.success("PDF exportado exitosamente")
      }, 2000)
    } else if (format === 'email') {
      if (alternativeEmail) {
        toast.success("Enviando valoración por correo alternativo...")
      } else {
        toast.success("Enviando valoración por correo principal...")
      }
      setTimeout(() => {
        toast.success("Correo enviado exitosamente")
      }, 2000)
    }
    setShowExportModal(false)
    setSendByEmail(false)
    setAlternativeEmail(false)
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
          <h1 className="text-2xl font-semibold text-gray-800">Valoración Detallada</h1>
        </div>
        <div className="flex items-center gap-2">
          {onEdit && (
            <Button
              onClick={() => onEdit(valoracionId)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Editar
            </Button>
          )}
          <Button
            onClick={() => setShowExportModal(true)}
            className="bg-green-700 hover:bg-green-800 text-white flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Información del Usuario */}
        <Card className="rounded-xl">
          <CardHeader className="bg-green-700 text-white rounded-t-xl">
            <CardTitle>Información del Usuario</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Nombres</Label>
                <div className="p-2 bg-gray-50 rounded-xl">{valoracion.nombres}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Apellidos</Label>
                <div className="p-2 bg-gray-50 rounded-xl">{valoracion.apellidos}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Documento</Label>
                <div className="p-2 bg-gray-50 rounded-xl">{valoracion.documento || '---'}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Teléfono</Label>
                <div className="p-2 bg-gray-50 rounded-xl">{valoracion.telefono || '---'}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Email</Label>
                <div className="p-2 bg-gray-50 rounded-xl">{valoracion.email || '---'}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Ocupación</Label>
                <div className="p-2 bg-gray-50 rounded-xl">{valoracion.ocupacion || '---'}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cuestionario Inicial */}
        <Card className="rounded-xl">
          <CardHeader className="bg-green-700 text-white rounded-t-xl">
            <CardTitle>Cuestionario Inicial</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Checkbox checked={valoracion.ejercicioAnterior} disabled />
                  <Label>¿Has realizado ejercicio anteriormente de forma regular?</Label>
                </div>
                {valoracion.ejercicioAnteriorDetalle && (
                  <div className="p-2 bg-blue-50 rounded-lg text-sm ml-6">
                    {valoracion.ejercicioAnteriorDetalle}
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Checkbox checked={valoracion.actividadActual} disabled />
                  <Label>¿Realizas alguna actividad física actualmente?</Label>
                </div>
                {valoracion.actividadActualDetalle && (
                  <div className="p-2 bg-blue-50 rounded-lg text-sm ml-6">
                    {valoracion.actividadActualDetalle}
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Checkbox checked={valoracion.sedentario} disabled />
                  <Label>¿Te consideras una persona sedentaria?</Label>
                </div>
                {valoracion.sedentarioDetalle && (
                  <div className="p-2 bg-blue-50 rounded-lg text-sm ml-6">
                    {valoracion.sedentarioDetalle}
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Checkbox checked={valoracion.frecuencia} disabled />
                  <Label>¿Practicas ejercicio con frecuencia de 3-5 veces por semana?</Label>
                </div>
                {valoracion.frecuenciaDetalle && (
                  <div className="p-2 bg-blue-50 rounded-lg text-sm ml-6">
                    {valoracion.frecuenciaDetalle}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Signos Vitales */}
        <Card className="rounded-xl">
          <CardHeader className="bg-green-700 text-white rounded-t-xl">
            <CardTitle>Signos Vitales</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">FC (bpm)</Label>
                <div className="p-2 bg-gray-50 rounded-xl">{valoracion.fc || '---'}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">FR (rpm)</Label>
                <div className="p-2 bg-gray-50 rounded-xl">{valoracion.fr || '---'}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">TA (mmHg)</Label>
                <div className="p-2 bg-gray-50 rounded-xl">{valoracion.ta || '---'}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">FC Máx.</Label>
                <div className="p-2 bg-gray-50 rounded-xl">{valoracion.fcMax || '---'}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Factores de Riesgo */}
        <Card className="rounded-xl">
          <CardHeader className="bg-green-700 text-white rounded-t-xl">
            <CardTitle>Factores de Riesgo</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Checkbox checked={valoracion.cardiovascular} disabled />
                  <Label>Riesgo cardiovascular</Label>
                </div>
                {valoracion.cardiovascularDetalle && (
                  <div className="p-2 bg-red-50 rounded-lg text-sm ml-6">
                    {valoracion.cardiovascularDetalle}
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Checkbox checked={valoracion.osteomuscular} disabled />
                  <Label>Riesgo osteomuscular</Label>
                </div>
                {valoracion.osteomuscularDetalle && (
                  <div className="p-2 bg-red-50 rounded-lg text-sm ml-6">
                    {valoracion.osteomuscularDetalle}
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Checkbox checked={valoracion.metabolico} disabled />
                  <Label>Riesgo metabólico</Label>
                </div>
                {valoracion.metabolicoDetalle && (
                  <div className="p-2 bg-red-50 rounded-lg text-sm ml-6">
                    {valoracion.metabolicoDetalle}
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Checkbox checked={valoracion.otros} disabled />
                  <Label>Otros factores de riesgo</Label>
                </div>
                {valoracion.otrosDetalle && (
                  <div className="p-2 bg-red-50 rounded-lg text-sm ml-6">
                    {valoracion.otrosDetalle}
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Checkbox checked={valoracion.antecedentesMedicos} disabled />
                  <Label>Antecedentes médicos</Label>
                </div>
                {valoracion.antecedentesMedicosDetalle && (
                  <div className="p-2 bg-red-50 rounded-lg text-sm ml-6">
                    {valoracion.antecedentesMedicosDetalle}
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Checkbox checked={valoracion.antecedentesFamiliares} disabled />
                  <Label>Antecedentes familiares</Label>
                </div>
                {valoracion.antecedentesFamiliaresDetalle && (
                  <div className="p-2 bg-red-50 rounded-lg text-sm ml-6">
                    {valoracion.antecedentesFamiliaresDetalle}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Antropometría */}
        <Card className="rounded-xl">
          <CardHeader className="bg-green-700 text-white rounded-t-xl">
            <CardTitle>Antropometría</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Peso (kg)</Label>
                <div className="p-2 bg-gray-50 rounded-xl">{valoracion.peso || '---'}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Talla (cm)</Label>
                <div className="p-2 bg-gray-50 rounded-xl">{valoracion.talla || '---'}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">IMC</Label>
                <div className="p-2 bg-gray-50 rounded-xl">{valoracion.imc || '---'}</div>
              </div>
            </div>
            
            {/* Antropometría Avanzada */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Grasa Corporal (%)</Label>
                <div className="p-2 bg-gray-50 rounded-xl">{valoracion.grasaCorporal || '---'}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Grasa Visceral</Label>
                <div className="p-2 bg-gray-50 rounded-xl">{valoracion.grasaVisceral || '---'}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Masa Muscular (%)</Label>
                <div className="p-2 bg-gray-50 rounded-xl">{valoracion.muscular || '---'}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">ICC</Label>
                <div className="p-2 bg-gray-50 rounded-xl">{valoracion.icc || '---'}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Edad Metabólica</Label>
                <div className="p-2 bg-gray-50 rounded-xl">{valoracion.edadMetabolica || '---'}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">KCAL</Label>
                <div className="p-2 bg-gray-50 rounded-xl">{valoracion.kcal || '---'}</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-gray-600">Tipo de obesidad</Label>
                <div className="p-2 bg-gray-50 rounded-xl">
                  <Badge variant="outline">{valoracion.tipoObesidad || '---'}</Badge>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Tipos de peso</Label>
                <div className="p-2 bg-gray-50 rounded-xl">
                  <Badge variant="outline">{valoracion.tiposPeso || '---'}</Badge>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Nivel de entrenamiento</Label>
                <div className="p-2 bg-gray-50 rounded-xl">
                  <Badge variant="outline">{valoracion.nivelEntrenamiento || '---'}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mediciones Físicas */}
        <Card className="rounded-xl">
          <CardHeader className="bg-green-700 text-white rounded-t-xl">
            <CardTitle>Mediciones Físicas</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Muslo Derecho (cm)</Label>
                <div className="p-2 bg-gray-50 rounded-xl">{valoracion.musloD || '---'}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Brazo Derecho (cm)</Label>
                <div className="p-2 bg-gray-50 rounded-xl">{valoracion.brazoD || '---'}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Pierna Derecha (cm)</Label>
                <div className="p-2 bg-gray-50 rounded-xl">{valoracion.piernaD || '---'}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Abdomen (cm)</Label>
                <div className="p-2 bg-gray-50 rounded-xl">{valoracion.abdomen || '---'}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Hombros (cm)</Label>
                <div className="p-2 bg-gray-50 rounded-xl">{valoracion.hombros || '---'}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Cintura (cm)</Label>
                <div className="p-2 bg-gray-50 rounded-xl">{valoracion.cintura || '---'}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Muslo Izquierdo (cm)</Label>
                <div className="p-2 bg-gray-50 rounded-xl">{valoracion.musloI || '---'}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Brazo Izquierdo (cm)</Label>
                <div className="p-2 bg-gray-50 rounded-xl">{valoracion.brazoI || '---'}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Pierna Izquierda (cm)</Label>
                <div className="p-2 bg-gray-50 rounded-xl">{valoracion.piernaI || '---'}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Cadera (cm)</Label>
                <div className="p-2 bg-gray-50 rounded-xl">{valoracion.cadera || '---'}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Pecho (cm)</Label>
                <div className="p-2 bg-gray-50 rounded-xl">{valoracion.pecho || '---'}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Valoración Postural */}
        <Card className="rounded-xl">
          <CardHeader className="bg-green-700 text-white rounded-t-xl">
            <CardTitle>Valoración Postural</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div>
              <Label className="text-sm font-medium text-gray-600">Observaciones</Label>
              <div className="p-3 bg-gray-50 rounded-xl mt-2">{valoracion.observaciones || '---'}</div>
            </div>
          </CardContent>
        </Card>

        {/* Valoración Funcional */}
        <Card className="rounded-xl">
          <CardHeader className="bg-green-700 text-white rounded-t-xl">
            <CardTitle>Valoración Funcional</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div>
              <Label className="text-sm font-medium text-gray-600">Observaciones</Label>
              <div className="p-3 bg-gray-50 rounded-xl mt-2">{valoracion.observacionesFuncionales || '---'}</div>
            </div>
          </CardContent>
        </Card>

        {/* Comentarios Adicionales */}
        <Card className="rounded-xl">
          <CardHeader className="bg-green-700 text-white rounded-t-xl">
            <CardTitle>Comentarios Adicionales</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="p-3 bg-gray-50 rounded-xl">{valoracion.comentario || '---'}</div>
            <div className="mt-4 text-sm text-gray-600">
              <strong>Fecha de valoración:</strong> {valoracion.fecha}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal de Exportación */}
      <Dialog open={showExportModal} onOpenChange={setShowExportModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-green-700" />
              Exportar Valoración
            </DialogTitle>
            <DialogDescription>
              Selecciona el formato y método de exportación
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-3">
              <Button
                onClick={() => handleExport('pdf')}
                className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Exportar como PDF
              </Button>
              
              <div className="space-y-3 border-t pt-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="send-email" 
                    checked={sendByEmail}
                    onCheckedChange={(checked) => setSendByEmail(checked as boolean)}
                  />
                  <Label htmlFor="send-email" className="text-sm">
                    Enviar por correo electrónico
                  </Label>
                </div>
                
                {sendByEmail && (
                  <div className="ml-6 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="alternative-email" 
                        checked={alternativeEmail}
                        onCheckedChange={(checked) => setAlternativeEmail(checked as boolean)}
                      />
                      <Label htmlFor="alternative-email" className="text-sm">
                        Enviar por correo alternativo
                      </Label>
                    </div>
                    
                    <Button
                      onClick={() => handleExport('email')}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                    >
                      <Send className="h-4 w-4" />
                      {alternativeEmail ? 'Enviar a correo alternativo' : 'Enviar a correo principal'}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportModal(false)}>
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}