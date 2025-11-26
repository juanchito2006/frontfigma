/**
 * ValoracionesCrear - Página para crear una nueva valoración
 * 
 * Formulario completo para la creación de valoraciones con todas las secciones.
 * Los datos se enviarán a la API del backend personalizado.
 */

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Checkbox } from "../components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"
import { toast } from "sonner"
import { ArrowLeft, Save } from "lucide-react"

export function ValoracionesCrear() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    // Información del usuario
    nombres: '',
    apellidos: '',
    documento: '',
    telefono: '',
    email: '',
    direccion: '',
    eps: '',
    ocupacion: '',
    
    // Cuestionario inicial
    ejercicioAnterior: false,
    ejercicioAnteriorDetalle: '',
    actividadActual: false,
    actividadActualDetalle: '',
    sedentario: false,
    sedentarioDetalle: '',
    
    // Signos vitales
    fc: '',
    fr: '',
    ta: '',
    horasSueno: '',
    
    // Factores de riesgo
    cardiovascular: false,
    cardiovascularDetalle: '',
    osteomuscular: false,
    osteomuscularDetalle: '',
    metabolico: false,
    metabolicoDetalle: '',
    
    // Antropometría
    peso: '',
    talla: '',
    imc: '',
    grasaCorporal: '',
    grasaVisceral: '',
    
    // Mediciones
    cintura: '',
    cadera: '',
    pecho: '',
    abdomen: '',
    
    // Observaciones
    observaciones: '',
    comentario: ''
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.nombres || !formData.apellidos) {
      toast.error("Por favor complete los campos obligatorios")
      return
    }

    try {
      // TODO: Aquí se conectará con la API del backend
      // const response = await fetch('/api/valoraciones', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      
      toast.success("Valoración guardada exitosamente")
      navigate('/valoraciones/ver')
    } catch (error) {
      toast.error("Error al guardar la valoración")
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/valoraciones/ver')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a la lista
        </Button>
        <h1 className="text-green-700">Crear Nueva Valoración</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Accordion type="multiple" defaultValue={['info', 'cuestionario', 'signos', 'antropometria']} className="space-y-4">
          {/* Información del Usuario */}
          <AccordionItem value="info">
            <Card>
              <AccordionTrigger className="px-6 pt-6 hover:no-underline">
                <CardTitle>Información del Usuario</CardTitle>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombres">Nombres *</Label>
                      <Input
                        id="nombres"
                        value={formData.nombres}
                        onChange={(e) => handleInputChange('nombres', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apellidos">Apellidos *</Label>
                      <Input
                        id="apellidos"
                        value={formData.apellidos}
                        onChange={(e) => handleInputChange('apellidos', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="documento">Documento</Label>
                      <Input
                        id="documento"
                        value={formData.documento}
                        onChange={(e) => handleInputChange('documento', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefono">Teléfono</Label>
                      <Input
                        id="telefono"
                        value={formData.telefono}
                        onChange={(e) => handleInputChange('telefono', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eps">EPS</Label>
                      <Input
                        id="eps"
                        value={formData.eps}
                        onChange={(e) => handleInputChange('eps', e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* Cuestionario Inicial */}
          <AccordionItem value="cuestionario">
            <Card>
              <AccordionTrigger className="px-6 pt-6 hover:no-underline">
                <CardTitle>Cuestionario Inicial</CardTitle>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="ejercicioAnterior"
                        checked={formData.ejercicioAnterior}
                        onCheckedChange={(checked) => handleInputChange('ejercicioAnterior', checked)}
                      />
                      <div className="flex-1">
                        <Label htmlFor="ejercicioAnterior">¿Ha realizado ejercicio anteriormente?</Label>
                        {formData.ejercicioAnterior && (
                          <Textarea
                            className="mt-2"
                            placeholder="Detalles..."
                            value={formData.ejercicioAnteriorDetalle}
                            onChange={(e) => handleInputChange('ejercicioAnteriorDetalle', e.target.value)}
                          />
                        )}
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="actividadActual"
                        checked={formData.actividadActual}
                        onCheckedChange={(checked) => handleInputChange('actividadActual', checked)}
                      />
                      <div className="flex-1">
                        <Label htmlFor="actividadActual">¿Realiza actividad física actualmente?</Label>
                        {formData.actividadActual && (
                          <Textarea
                            className="mt-2"
                            placeholder="Detalles..."
                            value={formData.actividadActualDetalle}
                            onChange={(e) => handleInputChange('actividadActualDetalle', e.target.value)}
                          />
                        )}
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="sedentario"
                        checked={formData.sedentario}
                        onCheckedChange={(checked) => handleInputChange('sedentario', checked)}
                      />
                      <div className="flex-1">
                        <Label htmlFor="sedentario">¿Tiene un estilo de vida sedentario?</Label>
                        {formData.sedentario && (
                          <Textarea
                            className="mt-2"
                            placeholder="Detalles..."
                            value={formData.sedentarioDetalle}
                            onChange={(e) => handleInputChange('sedentarioDetalle', e.target.value)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* Signos Vitales */}
          <AccordionItem value="signos">
            <Card>
              <AccordionTrigger className="px-6 pt-6 hover:no-underline">
                <CardTitle>Signos Vitales</CardTitle>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fc">FC (ppm)</Label>
                      <Input
                        id="fc"
                        type="number"
                        value={formData.fc}
                        onChange={(e) => handleInputChange('fc', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fr">FR (rpm)</Label>
                      <Input
                        id="fr"
                        type="number"
                        value={formData.fr}
                        onChange={(e) => handleInputChange('fr', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ta">TA (mmHg)</Label>
                      <Input
                        id="ta"
                        value={formData.ta}
                        onChange={(e) => handleInputChange('ta', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="horasSueno">Horas de Sueño</Label>
                      <Input
                        id="horasSueno"
                        type="number"
                        value={formData.horasSueno}
                        onChange={(e) => handleInputChange('horasSueno', e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* Factores de Riesgo */}
          <AccordionItem value="factores">
            <Card>
              <AccordionTrigger className="px-6 pt-6 hover:no-underline">
                <CardTitle>Factores de Riesgo</CardTitle>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="cardiovascular"
                        checked={formData.cardiovascular}
                        onCheckedChange={(checked) => handleInputChange('cardiovascular', checked)}
                      />
                      <div className="flex-1">
                        <Label htmlFor="cardiovascular">Cardiovascular</Label>
                        {formData.cardiovascular && (
                          <Textarea
                            className="mt-2"
                            placeholder="Detalles..."
                            value={formData.cardiovascularDetalle}
                            onChange={(e) => handleInputChange('cardiovascularDetalle', e.target.value)}
                          />
                        )}
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="osteomuscular"
                        checked={formData.osteomuscular}
                        onCheckedChange={(checked) => handleInputChange('osteomuscular', checked)}
                      />
                      <div className="flex-1">
                        <Label htmlFor="osteomuscular">Osteomuscular</Label>
                        {formData.osteomuscular && (
                          <Textarea
                            className="mt-2"
                            placeholder="Detalles..."
                            value={formData.osteomuscularDetalle}
                            onChange={(e) => handleInputChange('osteomuscularDetalle', e.target.value)}
                          />
                        )}
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="metabolico"
                        checked={formData.metabolico}
                        onCheckedChange={(checked) => handleInputChange('metabolico', checked)}
                      />
                      <div className="flex-1">
                        <Label htmlFor="metabolico">Metabólico</Label>
                        {formData.metabolico && (
                          <Textarea
                            className="mt-2"
                            placeholder="Detalles..."
                            value={formData.metabolicoDetalle}
                            onChange={(e) => handleInputChange('metabolicoDetalle', e.target.value)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* Antropometría */}
          <AccordionItem value="antropometria">
            <Card>
              <AccordionTrigger className="px-6 pt-6 hover:no-underline">
                <CardTitle>Antropometría y Mediciones</CardTitle>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="peso">Peso (kg)</Label>
                      <Input
                        id="peso"
                        type="number"
                        step="0.1"
                        value={formData.peso}
                        onChange={(e) => handleInputChange('peso', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="talla">Talla (cm)</Label>
                      <Input
                        id="talla"
                        type="number"
                        step="0.1"
                        value={formData.talla}
                        onChange={(e) => handleInputChange('talla', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="imc">IMC</Label>
                      <Input
                        id="imc"
                        type="number"
                        step="0.1"
                        value={formData.imc}
                        onChange={(e) => handleInputChange('imc', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="grasaCorporal">% Grasa Corporal</Label>
                      <Input
                        id="grasaCorporal"
                        type="number"
                        step="0.1"
                        value={formData.grasaCorporal}
                        onChange={(e) => handleInputChange('grasaCorporal', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="grasaVisceral">Grasa Visceral</Label>
                      <Input
                        id="grasaVisceral"
                        type="number"
                        step="0.1"
                        value={formData.grasaVisceral}
                        onChange={(e) => handleInputChange('grasaVisceral', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cintura">Cintura (cm)</Label>
                      <Input
                        id="cintura"
                        type="number"
                        step="0.1"
                        value={formData.cintura}
                        onChange={(e) => handleInputChange('cintura', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cadera">Cadera (cm)</Label>
                      <Input
                        id="cadera"
                        type="number"
                        step="0.1"
                        value={formData.cadera}
                        onChange={(e) => handleInputChange('cadera', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pecho">Pecho (cm)</Label>
                      <Input
                        id="pecho"
                        type="number"
                        step="0.1"
                        value={formData.pecho}
                        onChange={(e) => handleInputChange('pecho', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="abdomen">Abdomen (cm)</Label>
                      <Input
                        id="abdomen"
                        type="number"
                        step="0.1"
                        value={formData.abdomen}
                        onChange={(e) => handleInputChange('abdomen', e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* Observaciones */}
          <AccordionItem value="observaciones">
            <Card>
              <AccordionTrigger className="px-6 pt-6 hover:no-underline">
                <CardTitle>Observaciones y Comentarios</CardTitle>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="observaciones">Observaciones Generales</Label>
                    <Textarea
                      id="observaciones"
                      rows={4}
                      value={formData.observaciones}
                      onChange={(e) => handleInputChange('observaciones', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="comentario">Comentarios Adicionales</Label>
                    <Textarea
                      id="comentario"
                      rows={4}
                      value={formData.comentario}
                      onChange={(e) => handleInputChange('comentario', e.target.value)}
                    />
                  </div>
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>
        </Accordion>

        {/* Botones de acción */}
        <div className="flex gap-3 mt-6">
          <Button type="submit" className="bg-green-600 hover:bg-green-700">
            <Save className="h-4 w-4 mr-2" />
            Guardar Valoración
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/valoraciones/ver')}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  )
}
