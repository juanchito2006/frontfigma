/**
 * ValoracionesCrear - Página para crear una nueva valoración
 * 
 * Formulario completo para la creación de valoraciones con todas las secciones.
 * Los datos se enviarán a la API del backend personalizado.
 */
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useAuth } from "../context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Checkbox } from "../components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Badge } from "../components/ui/badge"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../components/ui/alert-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "../components/ui/dialog"
import { ScrollArea } from "../components/ui/scroll-area"
import { Switch } from "../components/ui/switch"
import { toast } from "sonner"
import {
  Users, Dumbbell, BarChart3, Settings, HelpCircle, User, Plus, Download,
  ChevronDown, LogOut, Edit, Calendar, ChevronLeft, ChevronRight, ClipboardList,
  TrendingUp, Info, Upload, FileVideo, FileImage, Play, Trash2, X, Search,
  GripVertical, PlusCircle, Eye, Shield, FileText, CheckCircle, UserCheck,
  Mail, Phone, ArrowLeft
} from "lucide-react"
import { EPSCombobox } from "../components/common/EPSCombobox"


export function ValoracionesCrear() {
  const navigate = useNavigate()

  // Estados - SOLO estos
  const [tiposPeso, setTiposPeso] = useState('')
  const [tipoObesidad, setTipoObesidad] = useState('')
  const [selectedEps, setSelectedEps] = useState('')

  const [formData, setFormData] = useState({

    // Nuevos campos de cuestionario inicial
    frecuencia: false,
    frecuenciaDetalle: '',

    // Nuevos campos de mediciones físicas
    brazo0: '',
    pierna0: '',
    abdomen0: '',
    hombros0: '',
    cintura0: '',
    brazo1: '',
    pierna1: '',
    muslo: '',
    pantorrilla: '',

    // Campos de entrenamiento actualizados
    nivelEntrenamiento: '',
    frecuenciaSemanal: '',
    // Nuevos campos de objetivos como inputs
    objetivoPeso: '',
    objetivoSalud: '',
    objetivoGraso: '',
    objetivoAcondicionamiento: '',
    objetivoFisico: '',
    objetivoMuscular: '',
    entrenamientoCruzado: [] as string[],

    // ... resto de campos ...


    // Nuevos campos de factores de riesgo
    antecedentesMedicos: false,
    antecedentesMedicosDetalle: '',
    antecedentesFamiliares: false,
    antecedentesFamiliaresDetalle: '',
    otrosFactores: false,
    otrosFactoresDetalle: '',

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

    // Nuevos campos de antropometría
    resPeso: '',
    icc: '',
    riesgoCardiovascular: '',
    kcal: '',
    porcentajeMuscular: '',
    edadMetabolica: '',
    rca: '',
    mifios: '',

    // Observaciones
    observaciones: '',
    comentario: ''
  })

  // Estados para checkboxes y selecciones
  const [cuestionarioChecks, setCuestionarioChecks] = useState({
    ejercicioAnterior: false,
    actividadActual: false,
    sedentario: false,
    frecuencia: false
  })

  const [factoresRiesgoChecks, setFactoresRiesgoChecks] = useState({
    cardiovascular: false,
    osteomuscular: false,
    metabolico: false,
    otros: false,
    antecedentesMedicos: false,
    antecedentesFamiliares: false
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
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Crear Valoración</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg shadow-sm space-y-6 p-6">

          {/* Información Personal */}
          <div>
            <div className="bg-green-700 text-white p-3 rounded-t-lg">
              <h2 className="text-lg">Información personal</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-b-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="mb-4" htmlFor="nombres">Nombres *</Label>
                  <Input
                    id="nombres"
                    placeholder="Ingrese nombres"
                    value={formData.nombres}
                    onChange={(e) => handleInputChange('nombres', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="mb-4" htmlFor="apellidos">Apellidos *</Label>
                  <Input
                    id="apellidos"
                    placeholder="Ingrese apellidos"
                    value={formData.apellidos}
                    onChange={(e) => handleInputChange('apellidos', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="mb-4" htmlFor="documento">Documento</Label>
                  <Input
                    id="documento"
                    placeholder="Número de documento"
                    value={formData.documento}
                    onChange={(e) => handleInputChange('documento', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="mb-4" htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    placeholder="Número de teléfono"
                    value={formData.telefono}
                    onChange={(e) => handleInputChange('telefono', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="mb-4" htmlFor="direccion">Dirección</Label>
                  <Input
                    id="direccion"
                    placeholder="Dirección"
                    value={formData.direccion}
                    onChange={(e) => handleInputChange('direccion', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="mb-4" htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="mb-4" htmlFor="ocupacion">Ocupación</Label>
                  <Input
                    id="ocupacion"
                    placeholder="Ocupación"
                    value={formData.ocupacion}
                    onChange={(e) => handleInputChange('ocupacion', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="mb-4" htmlFor="eps">EPS</Label>
                  <Input
                    id="eps"
                    placeholder="EPS"
                    value={formData.eps}
                    onChange={(e) => handleInputChange('eps', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Cuestionario Inicial */}
          <div>
            <div className="bg-green-700 text-white p-3 rounded-t-lg">
              <h2 className="text-lg">Cuestionario Inicial</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-b-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id="ejercicio-anterior"
                      checked={formData.ejercicioAnterior}
                      onCheckedChange={(checked) => handleInputChange('ejercicioAnterior', checked)}
                    />
                    <Label htmlFor="ejercicio-anterior" className="font-medium">Ha realizado ejercicio en un gimnasio anteriormente?</Label>
                  </div>
                  <Textarea
                    id="ejercicio-anterior-text"
                    rows={3}
                    placeholder="Ingrese detalles..."
                    value={formData.ejercicioAnteriorDetalle}
                    onChange={(e) => handleInputChange('ejercicioAnteriorDetalle', e.target.value)}
                    disabled={!formData.ejercicioAnterior}
                    className={!formData.ejercicioAnterior ? "bg-gray-100" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id="actividad-actual"
                      checked={formData.actividadActual}
                      onCheckedChange={(checked) => handleInputChange('actividadActual', checked)}
                    />
                    <Label htmlFor="actividad-actual" className="font-medium">Actualmente realiza alguna actividad física?</Label>
                  </div>
                  <Textarea
                    id="actividad-actual-text"
                    rows={3}
                    placeholder="Ingrese detalles..."
                    value={formData.actividadActualDetalle}
                    onChange={(e) => handleInputChange('actividadActualDetalle', e.target.value)}
                    disabled={!formData.actividadActual}
                    className={!formData.actividadActual ? "bg-gray-100" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id="sedentario"
                      checked={formData.sedentario}
                      onCheckedChange={(checked) => handleInputChange('sedentario', checked)}
                    />
                    <Label htmlFor="sedentario" className="font-medium">Sedentario?</Label>
                  </div>
                  <Textarea
                    id="sedentario-text"
                    rows={3}
                    placeholder="Ingrese detalles..."
                    value={formData.sedentarioDetalle}
                    onChange={(e) => handleInputChange('sedentarioDetalle', e.target.value)}
                    disabled={!formData.sedentario}
                    className={!formData.sedentario ? "bg-gray-100" : ""}
                  />
                </div>

                {/* Nuevo campo: Frecuencia */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id="frecuencia"
                      checked={formData.frecuencia}
                      onCheckedChange={(checked) => handleInputChange('frecuencia', checked)}
                    />
                    <Label htmlFor="frecuencia" className="font-medium">Frecuencia de actividad física</Label>
                  </div>
                  <Textarea
                    id="frecuencia-text"
                    rows={3}
                    placeholder="Ingrese frecuencia (veces por semana, duración, etc.)..."
                    value={formData.frecuenciaDetalle}
                    onChange={(e) => handleInputChange('frecuenciaDetalle', e.target.value)}
                    disabled={!formData.frecuencia}
                    className={!formData.frecuencia ? "bg-gray-100" : ""}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Signos vitales */}
          <div>
            <div className="bg-green-700 text-white p-3 rounded-t-lg">
              <h2 className="text-lg">Signos vitales</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-b-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="mb-4" htmlFor="fc">FC</Label>
                  <Input
                    id="fc"
                    type="number"
                    value={formData.fc}
                    onChange={(e) => handleInputChange('fc', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="mb-4" htmlFor="fr">FR</Label>
                  <Input
                    id="fr"
                    type="number"
                    value={formData.fr}
                    onChange={(e) => handleInputChange('fr', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="mb-4" htmlFor="ta">T/A</Label>
                  <Input
                    id="ta"
                    type="number"
                    value={formData.ta}
                    onChange={(e) => handleInputChange('ta', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="mb-4" htmlFor="horas-sueno">Horas de Sueño</Label>
                  <Input
                    id="horas-sueno"
                    type="number"
                    value={formData.horasSueno}
                    onChange={(e) => handleInputChange('horasSueno', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Factores de riesgo */}
          <div>
            <div className="bg-green-700 text-white p-3 rounded-t-lg">
              <h2 className="text-lg">Factores de riesgo</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-b-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        id="cardiovascular"
                        checked={formData.cardiovascular}
                        onCheckedChange={(checked) => handleInputChange('cardiovascular', checked)}
                      />
                      <Label htmlFor="cardiovascular" className="font-semibold">Cardiovascular</Label>
                    </div>
                    <Textarea
                      id="cardiovascular-text"
                      placeholder="Observaciones..."
                      rows={3}
                      value={formData.cardiovascularDetalle}
                      onChange={(e) => handleInputChange('cardiovascularDetalle', e.target.value)}
                      disabled={!formData.cardiovascular}
                      className={!formData.cardiovascular ? "bg-gray-100" : ""}
                    />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        id="osteomuscular"
                        checked={formData.osteomuscular}
                        onCheckedChange={(checked) => handleInputChange('osteomuscular', checked)}
                      />
                      <Label htmlFor="osteomuscular" className="font-semibold">Osteomuscular</Label>
                    </div>
                    <Textarea
                      id="osteomuscular-text"
                      placeholder="Observaciones..."
                      rows={3}
                      value={formData.osteomuscularDetalle}
                      onChange={(e) => handleInputChange('osteomuscularDetalle', e.target.value)}
                      disabled={!formData.osteomuscular}
                      className={!formData.osteomuscular ? "bg-gray-100" : ""}
                    />
                  </div>

                  {/* Nuevo campo: Antecedentes Médicos */}
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        id="antecedentesMedicos"
                        checked={formData.antecedentesMedicos}
                        onCheckedChange={(checked) => handleInputChange('antecedentesMedicos', checked)}
                      />
                      <Label htmlFor="antecedentesMedicos" className="font-semibold">Antecedentes Médicos</Label>
                    </div>
                    <Textarea
                      id="antecedentesMedicos-text"
                      placeholder="Enfermedades previas, cirugías, tratamientos..."
                      rows={3}
                      value={formData.antecedentesMedicosDetalle}
                      onChange={(e) => handleInputChange('antecedentesMedicosDetalle', e.target.value)}
                      disabled={!formData.antecedentesMedicos}
                      className={!formData.antecedentesMedicos ? "bg-gray-100" : ""}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        id="metabolico"
                        checked={formData.metabolico}
                        onCheckedChange={(checked) => handleInputChange('metabolico', checked)}
                      />
                      <Label htmlFor="metabolico" className="font-semibold">Metabólico</Label>
                    </div>
                    <Textarea
                      id="metabolico-text"
                      placeholder="Observaciones..."
                      rows={3}
                      value={formData.metabolicoDetalle}
                      onChange={(e) => handleInputChange('metabolicoDetalle', e.target.value)}
                      disabled={!formData.metabolico}
                      className={!formData.metabolico ? "bg-gray-100" : ""}
                    />
                  </div>

                  {/* Nuevo campo: Antecedentes Familiares */}
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        id="antecedentesFamiliares"
                        checked={formData.antecedentesFamiliares}
                        onCheckedChange={(checked) => handleInputChange('antecedentesFamiliares', checked)}
                      />
                      <Label htmlFor="antecedentesFamiliares" className="font-semibold">Antecedentes Familiares</Label>
                    </div>
                    <Textarea
                      id="antecedentesFamiliares-text"
                      placeholder="Enfermedades hereditarias, condiciones familiares..."
                      rows={3}
                      value={formData.antecedentesFamiliaresDetalle}
                      onChange={(e) => handleInputChange('antecedentesFamiliaresDetalle', e.target.value)}
                      disabled={!formData.antecedentesFamiliares}
                      className={!formData.antecedentesFamiliares ? "bg-gray-100" : ""}
                    />
                  </div>

                  {/* Nuevo campo: Otros */}
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        id="otrosFactores"
                        checked={formData.otrosFactores}
                        onCheckedChange={(checked) => handleInputChange('otrosFactores', checked)}
                      />
                      <Label htmlFor="otrosFactores" className="font-semibold">Otros</Label>
                    </div>
                    <Textarea
                      id="otrosFactores-text"
                      placeholder="Otros factores de riesgo relevantes..."
                      rows={3}
                      value={formData.otrosFactoresDetalle}
                      onChange={(e) => handleInputChange('otrosFactoresDetalle', e.target.value)}
                      disabled={!formData.otrosFactores}
                      className={!formData.otrosFactores ? "bg-gray-100" : ""}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Antropometría */}
          <div>
            <div className="bg-green-700 text-white p-3 rounded-t-lg">
              <h2 className="text-lg">Antropometría</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-b-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Columna 1 */}
                <div className="space-y-3">
                  <div>
                    <Label className="mb-4" htmlFor="peso">Peso (kg)</Label>
                    <Input
                      id="peso"
                      type="number"
                      value={formData.peso}
                      onChange={(e) => handleInputChange('peso', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="mb-4" htmlFor="talla">Talla (cm)</Label>
                    <Input
                      id="talla"
                      type="number"
                      value={formData.talla}
                      onChange={(e) => handleInputChange('talla', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="mb-4" htmlFor="imc">IMC</Label>
                    <Input
                      id="imc"
                      value={formData.imc}
                      onChange={(e) => handleInputChange('imc', e.target.value)}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>
                  <div>
                    <Label className="mb-4" htmlFor="resPeso">Res. Peso</Label>
                    <Input
                      id="resPeso"
                      placeholder="Resultado peso"
                      value={formData.resPeso}
                      onChange={(e) => handleInputChange('resPeso', e.target.value)}
                    />
                  </div>

                  {/* Tipo de peso - Radio buttons */}
                  <div className="space-y-2">
                    <Label className="font-medium">Tipo de peso</Label>
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
                </div>

                {/* Columna 2 */}
                <div className="space-y-3">
                  <div>
                    <Label className="mb-4" htmlFor="grasaCorporal">Grasa Corporal (%)</Label>
                    <Input
                      id="grasaCorporal"
                      type="number"
                      value={formData.grasaCorporal}
                      onChange={(e) => handleInputChange('grasaCorporal', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="mb-4" htmlFor="grasaVisceral">Grasa Visceral</Label>
                    <Input
                      id="grasaVisceral"
                      type="number"
                      value={formData.grasaVisceral}
                      onChange={(e) => handleInputChange('grasaVisceral', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="mb-4" htmlFor="icc">ICC</Label>
                    <Input
                      id="icc"
                      placeholder="Índice Cintura/Cadera"
                      value={formData.icc}
                      onChange={(e) => handleInputChange('icc', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="mb-4" htmlFor="riesgoCardiovascular">Riesgo Cardiovascular</Label>
                    <Input
                      id="riesgoCardiovascular"
                      placeholder="Nivel de riesgo"
                      value={formData.riesgoCardiovascular}
                      onChange={(e) => handleInputChange('riesgoCardiovascular', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="mb-4" htmlFor="kcal">Kcal</Label>
                    <Input
                      id="kcal"
                      type="number"
                      placeholder="Calorías"
                      value={formData.kcal}
                      onChange={(e) => handleInputChange('kcal', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="mb-4" htmlFor="porcentajeMuscular">% Muscular</Label>
                    <Input
                      id="porcentajeMuscular"
                      type="number"
                      value={formData.porcentajeMuscular}
                      onChange={(e) => handleInputChange('porcentajeMuscular', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="mb-4" htmlFor="edadMetabolica">Edad Metabólica</Label>
                    <Input
                      id="edadMetabolica"
                      type="number"
                      value={formData.edadMetabolica}
                      onChange={(e) => handleInputChange('edadMetabolica', e.target.value)}
                    />
                  </div>
                </div>

                {/* Columna 3 */}
                <div className="space-y-3">
                  {/* Tipo de Obesidad */}
                  <div className="space-y-2">
                    <Label className="font-medium">Tipo de Obesidad</Label>
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

                  {/* RCA */}
                  <div>
                    <Label className="mb-4" htmlFor="rca">RCA</Label>
                    <Input
                      id="rca"
                      placeholder="Relación Cintura/Altura"
                      value={formData.rca}
                      onChange={(e) => handleInputChange('rca', e.target.value)}
                    />
                  </div>

                  {/* Mifios (probablemente masa libre de grasa) */}
                  <div>
                    <Label className="mb-4" htmlFor="mifios">Mifios</Label>
                    <Input
                      id="mifios"
                      placeholder="Masa libre de grasa"
                      value={formData.mifios}
                      onChange={(e) => handleInputChange('mifios', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Mediciones físicas */}
          <div>
            <div className="bg-green-700 text-white p-3 rounded-t-lg">
              <h2 className="text-lg">Mediciones físicas</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-b-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Columna 1 - Muito 0 */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-700 border-b pb-2">Muito 0</h3>
                  <div>
                    <Label className="mb-4" htmlFor="brazo0">Brazo 0</Label>
                    <Input
                      id="brazo0"
                      type="number"
                      placeholder="0"
                      value={formData.brazo0}
                      onChange={(e) => handleInputChange('brazo0', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="mb-4" htmlFor="pierna0">Pierna 0</Label>
                    <Input
                      id="pierna0"
                      type="number"
                      placeholder="0"
                      value={formData.pierna0}
                      onChange={(e) => handleInputChange('pierna0', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="mb-4" htmlFor="abdomen0">Abdomen 0</Label>
                    <Input
                      id="abdomen0"
                      type="number"
                      placeholder="0"
                      value={formData.abdomen0}
                      onChange={(e) => handleInputChange('abdomen0', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="mb-4" htmlFor="hombros0">Hombros 0</Label>
                    <Input
                      id="hombros0"
                      type="number"
                      placeholder="0"
                      value={formData.hombros0}
                      onChange={(e) => handleInputChange('hombros0', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="mb-4" htmlFor="cintura0">Cintura 0</Label>
                    <Input
                      id="cintura0"
                      type="number"
                      placeholder="0"
                      value={formData.cintura0}
                      onChange={(e) => handleInputChange('cintura0', e.target.value)}
                    />
                  </div>
                </div>

                {/* Columna 2 - Muito 1 */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-700 border-b pb-2">Muito 1</h3>
                  <div>
                    <Label className="mb-4" htmlFor="brazo1">Brazo 1</Label>
                    <Input
                      id="brazo1"
                      type="number"
                      placeholder="0"
                      value={formData.brazo1}
                      onChange={(e) => handleInputChange('brazo1', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="mb-4" htmlFor="pierna1">Pierna 1</Label>
                    <Input
                      id="pierna1"
                      type="number"
                      placeholder="0"
                      value={formData.pierna1}
                      onChange={(e) => handleInputChange('pierna1', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="mb-4" htmlFor="cadera">Cadera</Label>
                    <Input
                      id="cadera"
                      type="number"
                      value={formData.cadera}
                      onChange={(e) => handleInputChange('cadera', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="mb-4" htmlFor="pecho">Pecho</Label>
                    <Input
                      id="pecho"
                      type="number"
                      value={formData.pecho}
                      onChange={(e) => handleInputChange('pecho', e.target.value)}
                    />
                  </div>
                </div>

                {/* Columna 3 - Mediciones adicionales */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-700 border-b pb-2">Otras Mediciones</h3>
                  <div>
                    <Label className="mb-4" htmlFor="cintura">Cintura</Label>
                    <Input
                      id="cintura"
                      type="number"
                      value={formData.cintura}
                      onChange={(e) => handleInputChange('cintura', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="mb-4" htmlFor="muslo">Muslo</Label>
                    <Input
                      id="muslo"
                      type="number"
                      placeholder="0"
                      value={formData.muslo}
                      onChange={(e) => handleInputChange('muslo', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="mb-4" htmlFor="pantorrilla">Pantorrilla</Label>
                    <Input
                      id="pantorrilla"
                      type="number"
                      placeholder="0"
                      value={formData.pantorrilla}
                      onChange={(e) => handleInputChange('pantorrilla', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Entrenamiento */}
          <div>
            <div className="bg-green-700 text-white p-3 rounded-t-lg">
              <h2 className="text-lg">Entrenamiento</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-b-lg p-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Columna 1 - Nivel de Entrenamiento y Objetivos */}
                <div className="space-y-6">
                  {/* Nivel de Entrenamiento */}
                  <div>
                    <Label className="font-semibold text-gray-700 mb-3 block">Nivel Entrenamiento</Label>
                    <div className="border rounded-lg p-4">
                      <RadioGroup
                        value={formData.nivelEntrenamiento}
                        onValueChange={(value) => handleInputChange('nivelEntrenamiento', value)}
                        className="grid grid-cols-3 gap-2 text-center"
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <div className="text-sm font-medium">Inicial</div>
                          <RadioGroupItem value="inicial" id="inicial" />
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                          <div className="text-sm font-medium">Intermedio</div>
                          <RadioGroupItem value="intermedio" id="intermedio" />
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                          <div className="text-sm font-medium">Avanzado</div>
                          <RadioGroupItem value="avanzado" id="avanzado" />
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  {/* Frecuencia Semanal - Ahora como Select */}
                  <div>
                    <Label className="font-semibold text-gray-700 mb-3 block">Frecuencia Semanal</Label>
                    <Select
                      value={formData.frecuenciaSemanal}
                      onValueChange={(value) => handleInputChange('frecuenciaSemanal', value)}
                    >
                      <SelectTrigger className="w-full">
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

                  {/* Objetivos - Ahora como Inputs medianos */}
                  <div>
                    <Label className="font-semibold text-gray-700 mb-3 block">Objetivos</Label>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="objetivo-peso" className="text-sm mb-2 block">Peso Saludable</Label>
                        <Input
                          id="objetivo-peso"
                          placeholder="Especifique objetivo..."
                          value={formData.objetivoPeso}
                          onChange={(e) => handleInputChange('objetivoPeso', e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <Label htmlFor="objetivo-salud" className="text-sm mb-2 block">Salud</Label>
                        <Input
                          id="objetivo-salud"
                          placeholder="Especifique objetivo..."
                          value={formData.objetivoSalud}
                          onChange={(e) => handleInputChange('objetivoSalud', e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <Label htmlFor="objetivo-graso" className="text-sm mb-2 block">Dism. % Graso</Label>
                        <Input
                          id="objetivo-graso"
                          placeholder="Especifique porcentaje..."
                          value={formData.objetivoGraso}
                          onChange={(e) => handleInputChange('objetivoGraso', e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <Label htmlFor="objetivo-acondicionamiento" className="text-sm mb-2 block">Acond. Físico</Label>
                        <Input
                          id="objetivo-acondicionamiento"
                          placeholder="Especifique objetivo..."
                          value={formData.objetivoAcondicionamiento}
                          onChange={(e) => handleInputChange('objetivoAcondicionamiento', e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <Label htmlFor="objetivo-fisico" className="text-sm mb-2 block">Físico</Label>
                        <Input
                          id="objetivo-fisico"
                          placeholder="Especifique objetivo..."
                          value={formData.objetivoFisico}
                          onChange={(e) => handleInputChange('objetivoFisico', e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <Label htmlFor="objetivo-muscular" className="text-sm mb-2 block">Des. Muscular</Label>
                        <Input
                          id="objetivo-muscular"
                          placeholder="Especifique objetivo..."
                          value={formData.objetivoMuscular}
                          onChange={(e) => handleInputChange('objetivoMuscular', e.target.value)}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Columna 2 - Entrenamiento Cruzado */}
                <div>
                  <Label className="font-semibold text-gray-700 mb-3 block">Entrenamiento Cruzado</Label>
                  <div className="space-y-2">
                    {[
                      'Bamba',
                      'Core',
                      'Yoga',
                      'Metrofitness',
                      'Spinning',
                      'Yoga-pilates',
                      'Body Pump',
                      'Body Combat',
                      'Body Attack',
                      'Est. Funcional',
                      'Zumba',
                      'TDX'
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
            </div>
          </div>

          {/* Programa de entrenamiento */}
          <div className="border rounded-md mt-6">
            <div className="bg-green-700 text-white p-3 rounded-t-lg">
              <h2 className="text-lg">Observaciones</h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {[1, 2, 3, 4, 5].map((dia, index) => (
                <AccordionItem key={index} value={`dia-${dia}`}>
                  <div className="flex items-center justify-between bg-gray-200 px-4">
                    <AccordionTrigger className="font-medium">Día {dia}</AccordionTrigger>
                    <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-800">
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>

                  <AccordionContent className="p-4 space-y-4">
                    {/* Buscador */}
                    <div className="flex items-center gap-2">
                      <Search className="text-green-700" />
                      <Input placeholder="Seleccionar ejercicio" />
                    </div>

                    {/* Lista de ejercicios */}
                    <div className="space-y-2">
                      {["Sentadillas", "Sentadillas", "Sentadillas"].map((ej, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between border rounded px-2 py-1"
                        >
                          <div className="flex items-center gap-2">
                            <GripVertical className="text-gray-500 cursor-move" />
                            <span>{ej}</span>
                          </div>
                          <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-800">
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Botón agregar día */}
            <div className="p-4">
              <Button className="flex items-center gap-2 bg-gray-800 text-white hover:bg-gray-700">
                <PlusCircle className="w-4 h-4" />
                Día
              </Button>
            </div>
          </div>

          {/* Observaciones */}
          <div>
            <div className="bg-green-700 text-white p-3 rounded-t-lg">
              <h2 className="text-lg">Observaciones</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-b-lg p-4">
              <div className="space-y-4">
                <div>
                  <Label className="mb-4" htmlFor="observaciones">Observaciones</Label>
                  <Textarea
                    id="observaciones"
                    rows={4}
                    placeholder="Observaciones generales..."
                    value={formData.observaciones}
                    onChange={(e) => handleInputChange('observaciones', e.target.value)}
                  />
                </div>
                <div>
                  <Label className="mb-4" htmlFor="comentario">Comentario</Label>
                  <Textarea
                    id="comentario"
                    rows={4}
                    placeholder="Comentarios adicionales..."
                    value={formData.comentario}
                    onChange={(e) => handleInputChange('comentario', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end space-x-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/valoraciones/ver')}
            >
              Cancelar
            </Button>
            <Button type="submit">
              Guardar Valoración
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
