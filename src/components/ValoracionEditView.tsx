import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useValoracion, ValoracionCompleta } from "../context/ValoracionContext";

interface ValoracionEditViewProps {
  valoracionId: number
  onBack: () => void
  onSave?: () => void
}

export function ValoracionEditView({ valoracionId, onBack, onSave }: ValoracionEditViewProps) {
  const { getValoracion, updateValoracion } = useValoracion()
  const [editData, setEditData] = useState<ValoracionCompleta | null>(null)
  const [hasChanges, setHasChanges] = useState(false)

  // Cargar datos iniciales
  useEffect(() => {
    const valoracion = getValoracion(valoracionId)
    if (valoracion) {
      setEditData({ ...valoracion })
    }
  }, [valoracionId, getValoracion])

  const handleInputChange = (field: keyof ValoracionCompleta, value: string | boolean) => {
    if (!editData) return
    
    setEditData(prev => ({
      ...prev!,
      [field]: value
    }))
    setHasChanges(true)
  }

  const handleSave = () => {
    if (!editData) return

    updateValoracion(valoracionId, editData)
    setHasChanges(false)
    toast.success("Valoración actualizada exitosamente")
    
    if (onSave) {
      onSave()
    } else {
      onBack()
    }
  }

  const handleCancel = () => {
    if (hasChanges) {
      if (window.confirm("¿Estás seguro de que quieres cancelar? Se perderán los cambios no guardados.")) {
        onBack()
      }
    } else {
      onBack()
    }
  }

  if (!editData) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2>Valoración no encontrada</h2>
          <Button onClick={onBack} className="mt-4">Volver</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {hasChanges ? "Cancelar" : "Volver"}
          </Button>
          <h1 className="text-2xl font-semibold text-gray-800">Editar Valoración</h1>
          {hasChanges && (
            <span className="text-sm text-orange-600 bg-orange-100 px-2 py-1 rounded">
              Cambios sin guardar
            </span>
          )}
        </div>
        <Button
          onClick={handleSave}
          className="bg-green-700 hover:bg-green-800 text-white flex items-center gap-2"
          disabled={!hasChanges}
        >
          <Save className="h-4 w-4" />
          Guardar cambios
        </Button>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Información del Usuario - Solo lectura */}
        <Card className="rounded-xl">
          <CardHeader className="bg-gray-600 text-white rounded-t-xl">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Información del Usuario (Solo lectura)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-gray-600">Nombres</Label>
                <div className="mt-1 p-3 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                  {editData.nombres}
                </div>
              </div>
              <div>
                <Label className="text-gray-600">Apellidos</Label>
                <div className="mt-1 p-3 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                  {editData.apellidos}
                </div>
              </div>
              <div>
                <Label className="text-gray-600">Documento</Label>
                <div className="mt-1 p-3 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                  {editData.documento}
                </div>
              </div>
              <div>
                <Label className="text-gray-600">Teléfono</Label>
                <div className="mt-1 p-3 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                  {editData.telefono}
                </div>
              </div>
              <div>
                <Label className="text-gray-600">Email</Label>
                <div className="mt-1 p-3 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                  {editData.email}
                </div>
              </div>
              <div>
                <Label className="text-gray-600">Ocupación</Label>
                <div className="mt-1 p-3 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                  {editData.ocupacion}
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-700 flex items-center gap-2">
                <Info className="h-4 w-4" />
                La información personal del usuario no puede ser editada desde esta vista por motivos de seguridad.
              </p>
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
                  <Checkbox 
                    checked={editData.ejercicioAnterior}
                    onCheckedChange={(checked) => handleInputChange('ejercicioAnterior', checked as boolean)}
                  />
                  <Label>¿Has realizado ejercicio anteriormente de forma regular?</Label>
                </div>
                <Textarea
                  placeholder="Detalles adicionales..."
                  value={editData.ejercicioAnteriorDetalle}
                  onChange={(e) => handleInputChange('ejercicioAnteriorDetalle', e.target.value)}
                  className="ml-6"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Checkbox 
                    checked={editData.actividadActual}
                    onCheckedChange={(checked) => handleInputChange('actividadActual', checked as boolean)}
                  />
                  <Label>¿Realizas alguna actividad física actualmente?</Label>
                </div>
                <Textarea
                  placeholder="Detalles adicionales..."
                  value={editData.actividadActualDetalle}
                  onChange={(e) => handleInputChange('actividadActualDetalle', e.target.value)}
                  className="ml-6"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Checkbox 
                    checked={editData.sedentario}
                    onCheckedChange={(checked) => handleInputChange('sedentario', checked as boolean)}
                  />
                  <Label>¿Te consideras una persona sedentaria?</Label>
                </div>
                <Textarea
                  placeholder="Detalles adicionales..."
                  value={editData.sedentarioDetalle}
                  onChange={(e) => handleInputChange('sedentarioDetalle', e.target.value)}
                  className="ml-6"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Checkbox 
                    checked={editData.frecuencia}
                    onCheckedChange={(checked) => handleInputChange('frecuencia', checked as boolean)}
                  />
                  <Label>¿Practicas ejercicio con frecuencia de 3-5 veces por semana?</Label>
                </div>
                <Textarea
                  placeholder="Detalles adicionales..."
                  value={editData.frecuenciaDetalle}
                  onChange={(e) => handleInputChange('frecuenciaDetalle', e.target.value)}
                  className="ml-6"
                />
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
                <Label htmlFor="fc">FC (bpm)</Label>
                <Input
                  id="fc"
                  value={editData.fc}
                  onChange={(e) => handleInputChange('fc', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="fr">FR (rpm)</Label>
                <Input
                  id="fr"
                  value={editData.fr}
                  onChange={(e) => handleInputChange('fr', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="ta">TA (mmHg)</Label>
                <Input
                  id="ta"
                  value={editData.ta}
                  onChange={(e) => handleInputChange('ta', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="fcMax">FC Máx.</Label>
                <Input
                  id="fcMax"
                  value={editData.fcMax}
                  onChange={(e) => handleInputChange('fcMax', e.target.value)}
                  className="mt-1"
                />
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
                  <Checkbox 
                    checked={editData.cardiovascular}
                    onCheckedChange={(checked) => handleInputChange('cardiovascular', checked as boolean)}
                  />
                  <Label>Riesgo cardiovascular</Label>
                </div>
                <Textarea
                  placeholder="Detalles del riesgo cardiovascular..."
                  value={editData.cardiovascularDetalle}
                  onChange={(e) => handleInputChange('cardiovascularDetalle', e.target.value)}
                  className="ml-6"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Checkbox 
                    checked={editData.osteomuscular}
                    onCheckedChange={(checked) => handleInputChange('osteomuscular', checked as boolean)}
                  />
                  <Label>Riesgo osteomuscular</Label>
                </div>
                <Textarea
                  placeholder="Detalles del riesgo osteomuscular..."
                  value={editData.osteomuscularDetalle}
                  onChange={(e) => handleInputChange('osteomuscularDetalle', e.target.value)}
                  className="ml-6"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Checkbox 
                    checked={editData.metabolico}
                    onCheckedChange={(checked) => handleInputChange('metabolico', checked as boolean)}
                  />
                  <Label>Riesgo metabólico</Label>
                </div>
                <Textarea
                  placeholder="Detalles del riesgo metabólico..."
                  value={editData.metabolicoDetalle}
                  onChange={(e) => handleInputChange('metabolicoDetalle', e.target.value)}
                  className="ml-6"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Checkbox 
                    checked={editData.otros}
                    onCheckedChange={(checked) => handleInputChange('otros', checked as boolean)}
                  />
                  <Label>Otros factores de riesgo</Label>
                </div>
                <Textarea
                  placeholder="Otros factores de riesgo..."
                  value={editData.otrosDetalle}
                  onChange={(e) => handleInputChange('otrosDetalle', e.target.value)}
                  className="ml-6"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Checkbox 
                    checked={editData.antecedentesMedicos}
                    onCheckedChange={(checked) => handleInputChange('antecedentesMedicos', checked as boolean)}
                  />
                  <Label>Antecedentes médicos</Label>
                </div>
                <Textarea
                  placeholder="Detalles de antecedentes médicos..."
                  value={editData.antecedentesMedicosDetalle}
                  onChange={(e) => handleInputChange('antecedentesMedicosDetalle', e.target.value)}
                  className="ml-6"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Checkbox 
                    checked={editData.antecedentesFamiliares}
                    onCheckedChange={(checked) => handleInputChange('antecedentesFamiliares', checked as boolean)}
                  />
                  <Label>Antecedentes familiares</Label>
                </div>
                <Textarea
                  placeholder="Detalles de antecedentes familiares..."
                  value={editData.antecedentesFamiliaresDetalle}
                  onChange={(e) => handleInputChange('antecedentesFamiliaresDetalle', e.target.value)}
                  className="ml-6"
                />
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
                <Label htmlFor="peso">Peso (kg)</Label>
                <Input
                  id="peso"
                  value={editData.peso}
                  onChange={(e) => handleInputChange('peso', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="talla">Talla (cm)</Label>
                <Input
                  id="talla"
                  value={editData.talla}
                  onChange={(e) => handleInputChange('talla', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="imc">IMC</Label>
                <Input
                  id="imc"
                  value={editData.imc}
                  onChange={(e) => handleInputChange('imc', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            
            {/* Antropometría Avanzada */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <Label htmlFor="grasaCorporal">Grasa Corporal (%)</Label>
                <Input
                  id="grasaCorporal"
                  value={editData.grasaCorporal}
                  onChange={(e) => handleInputChange('grasaCorporal', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="grasaVisceral">Grasa Visceral</Label>
                <Input
                  id="grasaVisceral"
                  value={editData.grasaVisceral}
                  onChange={(e) => handleInputChange('grasaVisceral', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="muscular">Masa Muscular (%)</Label>
                <Input
                  id="muscular"
                  value={editData.muscular}
                  onChange={(e) => handleInputChange('muscular', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="icc">ICC</Label>
                <Input
                  id="icc"
                  value={editData.icc}
                  onChange={(e) => handleInputChange('icc', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="edadMetabolica">Edad Metabólica</Label>
                <Input
                  id="edadMetabolica"
                  value={editData.edadMetabolica}
                  onChange={(e) => handleInputChange('edadMetabolica', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="kcal">KCAL</Label>
                <Input
                  id="kcal"
                  value={editData.kcal}
                  onChange={(e) => handleInputChange('kcal', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="tipoObesidad">Tipo de obesidad</Label>
                <Select value={editData.tipoObesidad} onValueChange={(value) => handleInputChange('tipoObesidad', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Androide">Androide</SelectItem>
                    <SelectItem value="Ginecoide">Ginecoide</SelectItem>
                    <SelectItem value="Mixto">Mixto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="tiposPeso">Tipos de peso</Label>
                <Select value={editData.tiposPeso} onValueChange={(value) => handleInputChange('tiposPeso', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bajo peso">Bajo peso</SelectItem>
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="Sobrepeso">Sobrepeso</SelectItem>
                    <SelectItem value="Obesidad">Obesidad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="nivelEntrenamiento">Nivel de entrenamiento</Label>
                <Select value={editData.nivelEntrenamiento} onValueChange={(value) => handleInputChange('nivelEntrenamiento', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Principiante">Principiante</SelectItem>
                    <SelectItem value="Intermedio">Intermedio</SelectItem>
                    <SelectItem value="Avanzado">Avanzado</SelectItem>
                  </SelectContent>
                </Select>
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
                <Label htmlFor="musloD">Muslo Derecho (cm)</Label>
                <Input
                  id="musloD"
                  value={editData.musloD}
                  onChange={(e) => handleInputChange('musloD', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="brazoD">Brazo Derecho (cm)</Label>
                <Input
                  id="brazoD"
                  value={editData.brazoD}
                  onChange={(e) => handleInputChange('brazoD', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="piernaD">Pierna Derecha (cm)</Label>
                <Input
                  id="piernaD"
                  value={editData.piernaD}
                  onChange={(e) => handleInputChange('piernaD', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="abdomen">Abdomen (cm)</Label>
                <Input
                  id="abdomen"
                  value={editData.abdomen}
                  onChange={(e) => handleInputChange('abdomen', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="hombros">Hombros (cm)</Label>
                <Input
                  id="hombros"
                  value={editData.hombros}
                  onChange={(e) => handleInputChange('hombros', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="cintura">Cintura (cm)</Label>
                <Input
                  id="cintura"
                  value={editData.cintura}
                  onChange={(e) => handleInputChange('cintura', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="musloI">Muslo Izquierdo (cm)</Label>
                <Input
                  id="musloI"
                  value={editData.musloI}
                  onChange={(e) => handleInputChange('musloI', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="brazoI">Brazo Izquierdo (cm)</Label>
                <Input
                  id="brazoI"
                  value={editData.brazoI}
                  onChange={(e) => handleInputChange('brazoI', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="piernaI">Pierna Izquierda (cm)</Label>
                <Input
                  id="piernaI"
                  value={editData.piernaI}
                  onChange={(e) => handleInputChange('piernaI', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="cadera">Cadera (cm)</Label>
                <Input
                  id="cadera"
                  value={editData.cadera}
                  onChange={(e) => handleInputChange('cadera', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="pecho">Pecho (cm)</Label>
                <Input
                  id="pecho"
                  value={editData.pecho}
                  onChange={(e) => handleInputChange('pecho', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Observaciones */}
        <Card className="rounded-xl">
          <CardHeader className="bg-green-700 text-white rounded-t-xl">
            <CardTitle>Observaciones</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="observaciones">Valoración Postural</Label>
                <Textarea
                  id="observaciones"
                  value={editData.observaciones}
                  onChange={(e) => handleInputChange('observaciones', e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="observacionesFuncionales">Valoración Funcional</Label>
                <Textarea
                  id="observacionesFuncionales"
                  value={editData.observacionesFuncionales}
                  onChange={(e) => handleInputChange('observacionesFuncionales', e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="comentario">Comentarios Adicionales</Label>
                <Textarea
                  id="comentario"
                  value={editData.comentario}
                  onChange={(e) => handleInputChange('comentario', e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sticky footer con botones */}
      {hasChanges && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Tienes cambios sin guardar
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                className="bg-green-700 hover:bg-green-800 text-white flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Guardar cambios
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}