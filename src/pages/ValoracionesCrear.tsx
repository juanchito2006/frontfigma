import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Checkbox } from "../components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { toast } from "sonner"
import { ArrowLeft } from "lucide-react"
import { apiClient } from "../lib/api-client"

export function ValoracionesCrear() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tiposPeso, setTiposPeso] = useState('')
  const [tipoObesidad, setTipoObesidad] = useState('')

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
    frecuencia: false,
    frecuenciaDetalle: '',

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
    antecedentesMedicos: false,
    antecedentesMedicosDetalle: '',
    antecedentesFamiliares: false,
    antecedentesFamiliaresDetalle: '',
    otrosFactores: false,
    otrosFactoresDetalle: '',

    // Antropometría
    peso: '',
    talla: '',
    imc: '',
    grasaCorporal: '',
    grasaVisceral: '',
    resPeso: '',
    icc: '',
    riesgoCardiovascular: '',
    kcal: '',
    porcentajeMuscular: '',
    edadMetabolica: '',
    rca: '',
    mifios: '',

    // Mediciones
    cintura: '',
    cadera: '',
    pecho: '',
    abdomen: '',
    brazo0: '',
    pierna0: '',
    abdomen0: '',
    hombros0: '',
    cintura0: '',
    brazo1: '',
    pierna1: '',
    muslo: '',
    pantorrilla: '',

    // Entrenamiento
    nivelEntrenamiento: '',
    frecuenciaSemanal: '',
    objetivoPeso: '',
    objetivoSalud: '',
    objetivoGraso: '',
    objetivoAcondicionamiento: '',
    objetivoFisico: '',
    objetivoMuscular: '',
    entrenamientoCruzado: [] as string[],

    // Observaciones
    observaciones: '',
    comentario: ''
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Cálculo automático del IMC
  useEffect(() => {
    if (formData.peso && formData.talla) {
      const pesoNum = parseFloat(formData.peso);
      const tallaNum = parseFloat(formData.talla) / 100;
      if (tallaNum > 0) {
        const imcCalculado = (pesoNum / (tallaNum * tallaNum)).toFixed(2);
        handleInputChange('imc', imcCalculado);

        const imcValue = parseFloat(imcCalculado);
        if (imcValue < 18.5) setTiposPeso('bajopeso');
        else if (imcValue < 25) setTiposPeso('normal');
        else if (imcValue < 30) setTiposPeso('sobrepeso');
        else setTiposPeso('obesidad');
      }
    }
  }, [formData.peso, formData.talla]);

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.nombres?.trim()) errors.push("Nombres es obligatorio");
    if (!formData.apellidos?.trim()) errors.push("Apellidos es obligatorio");
    if (!formData.documento?.trim()) errors.push("Documento es obligatorio");

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.push("Email no válido");
    }

    return errors;
  };

  const mapFormDataToBackend = () => {
    const usuarioData = {
      usu_di: parseInt(formData.documento) || 0,
      usu_nombre: formData.nombres,
      usu_apellido: formData.apellidos,
      usu_email: formData.email || `${formData.nombres.toLowerCase()}.${formData.apellidos.toLowerCase()}@gmail.com`,
      usu_telefono: formData.telefono || '3000000000',
      usu_direccion: formData.direccion || 'Dirección no especificada',
      usu_eps: formData.eps || 'EPS no especificada',
      usu_ocupacion: formData.ocupacion || 'Ocupación no especificada',
      usu_contraseña: 'tempPassword123',
      usu_fecha_nacimiento: new Date('1990-01-01').toISOString(),
      usu_fecha_expedicion: new Date().toISOString(),
      usu_ultima_val: new Date().toISOString(),
      usu_status: true,
      rol_idfk: 2,
      usu_sexo: 'No especificado'
    };

    const valoracionData = {
      val_recomendacion: formData.observaciones || formData.comentario || 'Sin recomendaciones',
      val_prox_control: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      usu_difk: parseInt(formData.documento) || 0,
      antropometria: {
        ant_peso: formData.peso ? parseFloat(formData.peso) : 0,
        ant_talla: formData.talla ? parseFloat(formData.talla) : 0,
        ant_grasa_corporal: formData.grasaCorporal ? parseFloat(formData.grasaCorporal) : 0,
        ant_grasa_viceral: formData.grasaVisceral ? parseFloat(formData.grasaVisceral) : 0,
        ant_calorias: formData.kcal ? parseInt(formData.kcal) : 0,
        ant_procentaje_muscular: formData.porcentajeMuscular ? parseFloat(formData.porcentajeMuscular) : 0,
        ant_nivel_obesidad: tiposPeso || 'No especificado',
        ant_edad_metabolica: formData.edadMetabolica || 'No especificado',
        ant_riesgo_cardiaco: formData.riesgoCardiovascular || 'No especificado',
        ant_tipo_obesidad: tipoObesidad || 'No especificado',
        ant_rca: formData.rca || 'No especificado',
      },
      datos_fisicos: {
        dat_fc: formData.fc ? parseInt(formData.fc) : 0,
        dat_fr: formData.fr || 'No especificado',
        dat_ta: formData.ta || 'No especificado',
        dat_fmax: formData.horasSueno ? parseInt(formData.horasSueno) : 0,
      },
      entrenamiento: {
        ent_frecuencia_semanal: formData.frecuenciaSemanal || 'No especificado',
        ent_nivel_entrenamiento: formData.nivelEntrenamiento || 'No especificado',
        entrenamiento_grupal: formData.entrenamientoCruzado || [],
        objetivo: {
          obj_peso_saludable: formData.objetivoPeso || 'No especificado',
          obj_salud: formData.objetivoSalud || 'No especificado',
          obj_disminucion_grasa: formData.objetivoGraso || 'No especificado',
          obj_acon_fisico: formData.objetivoAcondicionamiento || 'No especificado',
          obj_fitness: formData.objetivoFisico || 'No especificado',
          obj_desarrollo_muscular: formData.objetivoMuscular || 'No especificado',
        },
      },
    };

    return { usuarioData, valoracionData };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const errors = validateForm();
    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
      return;
    }

    setIsSubmitting(true)

    try {
      const { usuarioData, valoracionData } = mapFormDataToBackend();

      // 1. Crear o verificar usuario
      try {
        await apiClient.post('/usuario', usuarioData);
      } catch (error: any) {
        if (!error.message.includes('Unique constraint')) {
          throw error;
        }
      }

      // 2. Crear valoración
      await apiClient.post('/valoracion', valoracionData);

      toast.success("Valoración guardada exitosamente")
      navigate('/valoraciones/ver')

    } catch (error: any) {
      console.error('Error al guardar valoración:', error)
      toast.error(error.message || "Error al guardar la valoración")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/valoraciones/ver')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a la lista
        </Button>
        <h1 className="text-2xl font-bold text-green-700">Crear Nueva Valoración</h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Información Personal */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>Datos básicos del cliente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <div className="space-y-2">
                <Label htmlFor="documento">Documento *</Label>
                <Input
                  id="documento"
                  value={formData.documento}
                  onChange={(e) => handleInputChange('documento', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  value={formData.telefono}
                  onChange={(e) => handleInputChange('telefono', e.target.value)}
                />
              </div>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="direccion">Dirección</Label>
                <Input
                  id="direccion"
                  value={formData.direccion}
                  onChange={(e) => handleInputChange('direccion', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ocupacion">Ocupación</Label>
                <Input
                  id="ocupacion"
                  value={formData.ocupacion}
                  onChange={(e) => handleInputChange('ocupacion', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cuestionario Inicial */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Cuestionario Inicial</CardTitle>
            <CardDescription>Historial de actividad física</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ejercicio-anterior"
                    checked={formData.ejercicioAnterior}
                    onCheckedChange={(checked) => handleInputChange('ejercicioAnterior', checked)}
                  />
                  <Label htmlFor="ejercicio-anterior">¿Ha realizado ejercicio en un gimnasio anteriormente?</Label>
                </div>
                <Textarea
                  placeholder="Detalles..."
                  value={formData.ejercicioAnteriorDetalle}
                  onChange={(e) => handleInputChange('ejercicioAnteriorDetalle', e.target.value)}
                  disabled={!formData.ejercicioAnterior}
                  className={!formData.ejercicioAnterior ? "bg-gray-100" : ""}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="actividad-actual"
                    checked={formData.actividadActual}
                    onCheckedChange={(checked) => handleInputChange('actividadActual', checked)}
                  />
                  <Label htmlFor="actividad-actual">¿Actualmente realiza alguna actividad física?</Label>
                </div>
                <Textarea
                  placeholder="Detalles..."
                  value={formData.actividadActualDetalle}
                  onChange={(e) => handleInputChange('actividadActualDetalle', e.target.value)}
                  disabled={!formData.actividadActual}
                  className={!formData.actividadActual ? "bg-gray-100" : ""}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sedentario"
                    checked={formData.sedentario}
                    onCheckedChange={(checked) => handleInputChange('sedentario', checked)}
                  />
                  <Label htmlFor="sedentario">¿Es sedentario?</Label>
                </div>
                <Textarea
                  placeholder="Detalles..."
                  value={formData.sedentarioDetalle}
                  onChange={(e) => handleInputChange('sedentarioDetalle', e.target.value)}
                  disabled={!formData.sedentario}
                  className={!formData.sedentario ? "bg-gray-100" : ""}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="frecuencia"
                    checked={formData.frecuencia}
                    onCheckedChange={(checked) => handleInputChange('frecuencia', checked)}
                  />
                  <Label htmlFor="frecuencia">Frecuencia de actividad física</Label>
                </div>
                <Textarea
                  placeholder="Frecuencia (veces por semana, duración, etc.)..."
                  value={formData.frecuenciaDetalle}
                  onChange={(e) => handleInputChange('frecuenciaDetalle', e.target.value)}
                  disabled={!formData.frecuencia}
                  className={!formData.frecuencia ? "bg-gray-100" : ""}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Signos Vitales */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Signos Vitales</CardTitle>
            <CardDescription>Mediciones básicas de salud</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fc">FC</Label>
                <Input
                  id="fc"
                  type="number"
                  value={formData.fc}
                  onChange={(e) => handleInputChange('fc', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fr">FR</Label>
                <Input
                  id="fr"
                  type="number"
                  value={formData.fr}
                  onChange={(e) => handleInputChange('fr', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ta">T/A</Label>
                <Input
                  id="ta"
                  type="number"
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
        </Card>

        {/* Antropometría */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Antropometría</CardTitle>
            <CardDescription>Mediciones corporales y composición</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="peso">Peso (kg)</Label>
                  <Input
                    id="peso"
                    type="number"
                    value={formData.peso}
                    onChange={(e) => handleInputChange('peso', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="talla">Talla (cm)</Label>
                  <Input
                    id="talla"
                    type="number"
                    value={formData.talla}
                    onChange={(e) => handleInputChange('talla', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="imc">IMC</Label>
                  <Input
                    id="imc"
                    value={formData.imc}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="grasaCorporal">Grasa Corporal (%)</Label>
                  <Input
                    id="grasaCorporal"
                    type="number"
                    value={formData.grasaCorporal}
                    onChange={(e) => handleInputChange('grasaCorporal', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grasaVisceral">Grasa Visceral</Label>
                  <Input
                    id="grasaVisceral"
                    type="number"
                    value={formData.grasaVisceral}
                    onChange={(e) => handleInputChange('grasaVisceral', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="porcentajeMuscular">% Muscular</Label>
                  <Input
                    id="porcentajeMuscular"
                    type="number"
                    value={formData.porcentajeMuscular}
                    onChange={(e) => handleInputChange('porcentajeMuscular', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>Tipo de Peso</Label>
                  <RadioGroup
                    value={tiposPeso}
                    onValueChange={setTiposPeso}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bajopeso" id="bajopeso" />
                      <Label htmlFor="bajopeso">Bajopeso</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="normal" id="normal" />
                      <Label htmlFor="normal">Normal</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sobrepeso" id="sobrepeso" />
                      <Label htmlFor="sobrepeso">Sobrepeso</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="obesidad" id="obesidad" />
                      <Label htmlFor="obesidad">Obesidad</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Tipo de Obesidad</Label>
                  <RadioGroup
                    value={tipoObesidad}
                    onValueChange={setTipoObesidad}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cinoide" id="cinoide" />
                      <Label htmlFor="cinoide">Cinoide</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="androide" id="androide" />
                      <Label htmlFor="androide">Androide</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Entrenamiento */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Entrenamiento</CardTitle>
            <CardDescription>Planificación y objetivos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Nivel de Entrenamiento</Label>
                  <RadioGroup
                    value={formData.nivelEntrenamiento}
                    onValueChange={(value) => handleInputChange('nivelEntrenamiento', value)}
                    className="grid grid-cols-3 gap-2"
                  >
                    <div className="flex flex-col items-center space-y-2 p-3 border rounded-lg">
                      <RadioGroupItem value="inicial" id="inicial" />
                      <Label htmlFor="inicial" className="text-sm">Inicial</Label>
                    </div>
                    <div className="flex flex-col items-center space-y-2 p-3 border rounded-lg">
                      <RadioGroupItem value="intermedio" id="intermedio" />
                      <Label htmlFor="intermedio" className="text-sm">Intermedio</Label>
                    </div>
                    <div className="flex flex-col items-center space-y-2 p-3 border rounded-lg">
                      <RadioGroupItem value="avanzado" id="avanzado" />
                      <Label htmlFor="avanzado" className="text-sm">Avanzado</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frecuenciaSemanal">Frecuencia Semanal</Label>
                  <Select
                    value={formData.frecuenciaSemanal}
                    onValueChange={(value) => handleInputChange('frecuenciaSemanal', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione frecuencia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="una-vez">Una vez</SelectItem>
                      <SelectItem value="dos-veces">Dos veces</SelectItem>
                      <SelectItem value="tres-veces">Tres veces</SelectItem>
                      <SelectItem value="cuatro-veces">Cuatro veces</SelectItem>
                      <SelectItem value="cinco-veces">Cinco veces</SelectItem>
                      <SelectItem value="seis-veces">Seis veces</SelectItem>
                      <SelectItem value="siete-veces">Siete veces</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Entrenamiento Cruzado</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Bamba', 'Core', 'Yoga', 'Metrofitness', 'Spinning', 'Yoga-pilates',
                    'Body Pump', 'Body Combat', 'Body Attack', 'Est. Funcional', 'Zumba', 'TDX'
                  ].map((actividad) => (
                    <div key={actividad} className="flex items-center space-x-2">
                      <Checkbox
                        id={`cruzado-${actividad}`}
                        checked={formData.entrenamientoCruzado?.includes(actividad) || false}
                        onCheckedChange={(checked) => {
                          const current = formData.entrenamientoCruzado || [];
                          if (checked) {
                            handleInputChange('entrenamientoCruzado', [...current, actividad]);
                          } else {
                            handleInputChange('entrenamientoCruzado', current.filter(a => a !== actividad));
                          }
                        }}
                      />
                      <Label htmlFor={`cruzado-${actividad}`} className="text-sm">{actividad}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Observaciones */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Observaciones</CardTitle>
            <CardDescription>Comentarios y recomendaciones finales</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="observaciones">Observaciones</Label>
              <Textarea
                id="observaciones"
                rows={4}
                placeholder="Observaciones generales..."
                value={formData.observaciones}
                onChange={(e) => handleInputChange('observaciones', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="comentario">Comentario</Label>
              <Textarea
                id="comentario"
                rows={4}
                placeholder="Comentarios adicionales..."
                value={formData.comentario}
                onChange={(e) => handleInputChange('comentario', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Botones de acción */}
        <div className="flex gap-3">
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Guardando..." : "Crear Valoración"}
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
