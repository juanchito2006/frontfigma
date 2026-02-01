import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
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
import { useList } from "../hooks/useGenericCrud"
import type { ValoracionCompleta } from "../types/schema.types"

export function ValoracionVisualizarCompleta() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const valoracionId = id ? parseInt(id) : null

  const [formData, setFormData] = useState({
    frecuencia: false,
    frecuenciaDetalle: '',
    brazo0: '',
    pierna0: '',
    abdomen0: '',
    hombros0: '',
    cintura0: '',
    brazo1: '',
    pierna1: '',
    muslo: '',
    pantorrilla: '',
    nivelEntrenamiento: '',
    frecuenciaSemanal: '',
    objetivoPeso: '',
    objetivoSalud: '',
    objetivoGraso: '',
    objetivoAcondicionamiento: '',
    objetivoFisico: '',
    objetivoMuscular: '',
    entrenamientoCruzado: [] as string[],
    antecedentesMedicos: false,
    antecedentesMedicosDetalle: '',
    antecedentesFamiliares: false,
    antecedentesFamiliaresDetalle: '',
    otrosFactores: false,
    otrosFactoresDetalle: '',
    nombres: '',
    apellidos: '',
    documento: '',
    telefono: '',
    email: '',
    direccion: '',
    eps: '',
    ocupacion: '',
    ejercicioAnterior: false,
    ejercicioAnteriorDetalle: '',
    actividadActual: false,
    actividadActualDetalle: '',
    sedentario: false,
    sedentarioDetalle: '',
    fc: '',
    fr: '',
    ta: '',
    horasSueno: '',
    cardiovascular: false,
    cardiovascularDetalle: '',
    osteomuscular: false,
    osteomuscularDetalle: '',
    metabolico: false,
    metabolicoDetalle: '',
    peso: '',
    talla: '',
    imc: '',
    grasaCorporal: '',
    grasaVisceral: '',
    cintura: '',
    cadera: '',
    pecho: '',
    abdomen: '',
    resPeso: '',
    icc: '',
    riesgoCardiovascular: '',
    kcal: '',
    porcentajeMuscular: '',
    edadMetabolica: '',
    rca: '',
    mifios: '',
    observaciones: '',
    comentario: ''
  })

  const [tiposPeso, setTiposPeso] = useState('')
  const [tipoObesidad, setTipoObesidad] = useState('')
  const [selectedUsuario, setSelectedUsuario] = useState<any>(null)
  const [valoracion, setValoracion] = useState<ValoracionCompleta | null>(null)
  const [programas, setProgramas] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const { data: allValoraciones = [] } = useList<ValoracionCompleta>({
    resourceName: "valoracion",
    queryOptions: {
      enabled: !!valoracionId,
    },
  })

  useEffect(() => {
    if (valoracionId && allValoraciones.length > 0) {
      const found = allValoraciones.find(v => v.val_id === valoracionId)
      if (found) {
        setValoracion(found)
        loadValoracionData(found)
      }
      setIsLoading(false)
    }
  }, [valoracionId, allValoraciones])

  const loadValoracionData = (val: ValoracionCompleta) => {
    // Cargar datos del usuario
    if (val.usuario) {
      setSelectedUsuario(val.usuario)
      setFormData(prev => ({
        ...prev,
        nombres: val.usuario?.usu_nombre || '',
        apellidos: val.usuario?.usu_apellido || '',
        documento: val.usuario?.usu_di?.toString() || '',
        telefono: val.usuario?.usu_telefono || '',
        email: val.usuario?.usu_email || '',
        direccion: val.usuario?.usu_direccion || '',
        eps: val.usuario?.usu_eps || '',
        ocupacion: val.usuario?.usu_ocupacion || '',
      }))
    }

    // Cargar datos de antropometría
    if (val.antropometria) {
      setFormData(prev => ({
        ...prev,
        peso: val.antropometria?.ant_peso?.toString() || '',
        talla: val.antropometria?.ant_talla?.toString() || '',
        grasaCorporal: val.antropometria?.ant_grasa_corporal?.toString() || '',
        grasaVisceral: val.antropometria?.ant_grasa_viceral?.toString() || '',
        kcal: val.antropometria?.ant_calorias?.toString() || '',
        porcentajeMuscular: val.antropometria?.ant_procentaje_muscular?.toString() || '',
        edadMetabolica: val.antropometria?.ant_edad_metabolica?.toString() || '',
        riesgoCardiovascular: val.antropometria?.ant_riesgo_cardiaco || '',
        rca: val.antropometria?.ant_rca || '',
      }))
      if (val.antropometria.ant_nivel_obesidad) {
        setTiposPeso(val.antropometria.ant_nivel_obesidad)
      }
      if (val.antropometria.ant_tipo_obesidad) {
        setTipoObesidad(val.antropometria.ant_tipo_obesidad)
      }

      // Cargar mediciones de partes
      if ((val.antropometria as any)?.medicion_parte) {
        const medicionesData = (val.antropometria as any).medicion_parte
        if (Array.isArray(medicionesData)) {
          medicionesData.forEach((med: any) => {
            const partesMap: any = {
              1: 'brazo0',
              2: 'brazo1',
              3: 'pecho',
              4: 'cintura0',
              5: 'cadera',
              6: 'abdomen0',
              7: 'muslo',
              8: 'muslo',
              9: 'pierna0',
              10: 'pierna1',
              11: 'hombros0',
              13: 'pantorrilla',
            }
            const field = partesMap[med.par_idfk]
            if (field) {
              setFormData(prev => ({ ...prev, [field]: med.med_medida }))
            }
          })
        }
      }
    }

    // Cargar datos físicos
    if (val.datos_fisicos) {
      setFormData(prev => ({
        ...prev,
        fc: val.datos_fisicos?.dat_fc?.toString() || '',
        fr: val.datos_fisicos?.dat_fr?.toString() || '',
        ta: val.datos_fisicos?.dat_ta || '',
      }))
    }

    // Cargar datos de entrenamiento
    if (val.entrenamiento) {
      setFormData(prev => ({
        ...prev,
        nivelEntrenamiento: val.entrenamiento?.ent_nivel_entrenamiento || '',
        frecuenciaSemanal: val.entrenamiento?.ent_frecuencia_semanal || '',
      }))

      if ((val.entrenamiento as any)?.objetivo) {
        const obj = (val.entrenamiento as any).objetivo as any
        setFormData(prev => ({
          ...prev,
          objetivoPeso: obj.obj_peso_saludable || '',
          objetivoSalud: obj.obj_salud || '',
          objetivoGraso: obj.obj_disminucion_grasa || '',
          objetivoAcondicionamiento: obj.obj_acon_fisico || '',
          objetivoFisico: obj.obj_fitness || '',
          objetivoMuscular: obj.obj_desarrollo_muscular || '',
        }))
      }

      if ((val.entrenamiento as any)?.entrenamiento_grupal_entrenamiento) {
        const cruzados = (val.entrenamiento as any).entrenamiento_grupal_entrenamiento.map(
          (eg: any) => eg.entrenamiento_grupal?.gru_nombre
        ).filter(Boolean) as string[]
        setFormData(prev => ({
          ...prev,
          entrenamientoCruzado: cruzados,
        }))
      }
    }

    // Cargar factores de riesgo
    if (val.pregunta_factor_valoracion) {
      val.pregunta_factor_valoracion.forEach(pfv => {
        const factorMap: any = {
          1: { field: 'cardiovascular', detail: 'cardiovascularDetalle' },
          2: { field: 'osteomuscular', detail: 'osteomuscularDetalle' },
          3: { field: 'metabolico', detail: 'metabolicoDetalle' },
          4: { field: 'otrosFactores', detail: 'otrosFactoresDetalle' },
          5: { field: 'antecedentesMedicos', detail: 'antecedentesMedicosDetalle' },
          6: { field: 'antecedentesFamiliares', detail: 'antecedentesFamiliaresDetalle' },
        }
        const map = factorMap[pfv.paf_idfk]
        if (map) {
          setFormData(prev => ({
            ...prev,
            [map.field]: pfv.pfv_respuesta || false,
            [map.detail]: pfv.pfv_observacion || '',
          }))
        }
      })
    }

    // Cargar cuestionario físico
    if (val.respuesta_cuestionario_fisico) {
      val.respuesta_cuestionario_fisico.forEach(rcf => {
        const preMap: any = {
          4: { field: 'ejercicioAnterior', detail: 'ejercicioAnteriorDetalle' },
          9: { field: 'actividadActual', detail: 'actividadActualDetalle' },
          7: { field: 'sedentario', detail: 'sedentarioDetalle' },
          10: { field: 'frecuencia', detail: 'frecuenciaDetalle' },
        }
        const map = preMap[rcf.pre_idfk]
        if (map) {
          setFormData(prev => ({
            ...prev,
            [map.field]: true,
            [map.detail]: rcf.res_texto_libre || '',
          }))
        }
      })
    }

    // Cargar programas de entrenamiento
    if ((val.entrenamiento as any)?.programa_entrenamiento) {
      const programasData = (val.entrenamiento as any).programa_entrenamiento as any[]
      const programasFormato = programasData.map(pro => ({
        id: `programa-${pro.pro_id}`,
        frecuencia: pro.pro_frecuencia || '',
        objetivo: pro.pro_objetivo || '',
        dias: (pro.dia_entrenamiento || []).map((dia: any) => ({
          id: `dia-${dia.dia_id}`,
          nombre: `Día ${dia.dia_id}`,
          repeticionMin: dia.dia_repeticion_min || 8,
          repeticionMax: dia.dia_repeticion_max || 12,
          ejercicios: (dia.dia_ejercicio || []).map((diaEj: any) => ({
            id: `ejercicio-${diaEj.dia_eje_id}`,
            ejercicioId: diaEj.eje_idfk,
            nombre: diaEj.ejercicio?.eje_nombre || 'Ejercicio',
            descripcion: diaEj.ejercicio?.eje_descripcion || '',
            imagen: diaEj.ejercicio?.eje_imagen || null,
            observacion: diaEj.dia_eje_observacion || '',
          }))
        }))
      }))
      setProgramas(programasFormato)
    }

    // Cargar observaciones
    if (val.val_recomendacion) {
      setFormData(prev => ({
        ...prev,
        observaciones: val.val_recomendacion,
      }))
    }
  }

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-50 min-h-full">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </div>
    )
  }

  if (!valoracion) {
    return (
      <div className="p-6 bg-gray-50 min-h-full">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Valoración no encontrada</h1>
        </div>
        <Button onClick={() => navigate("/valoraciones/ver")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a valoraciones
        </Button>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Visualizar Valoración</h1>
          <p className="text-gray-600 text-sm mt-1">
            ID: <span className="font-mono">{valoracionId}</span> - {selectedUsuario?.usu_nombre} {selectedUsuario?.usu_apellido}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/valoraciones/ver")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
          <Button
            onClick={() => navigate(`/valoraciones/${valoracionId}/editar`)}
            className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Editar
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm space-y-6 p-6">

        {/* Información Personal */}
        <div>
          <div className="bg-green-700 text-white p-3 rounded-t-lg">
            <h2 className="text-lg">Información personal</h2>
          </div>
          <div className="bg-white border border-gray-200 rounded-b-lg p-4 space-y-4">
            {selectedUsuario && (
              <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-600 text-white rounded-full p-3">
                      <UserCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">
                        {selectedUsuario.usu_nombre} {selectedUsuario.usu_apellido}
                      </p>
                      <p className="text-sm text-gray-600">
                        ID: <span className="text-blue-600 font-mono">{selectedUsuario.usu_di}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="mb-4" htmlFor="nombres">Nombres</Label>
                <Input
                  id="nombres"
                  placeholder="Nombres"
                  value={formData.nombres}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <Label className="mb-4" htmlFor="apellidos">Apellidos</Label>
                <Input
                  id="apellidos"
                  placeholder="Apellidos"
                  value={formData.apellidos}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <Label className="mb-4" htmlFor="documento">Documento</Label>
                <Input
                  id="documento"
                  placeholder="Documento"
                  value={formData.documento}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <Label className="mb-4" htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  placeholder="Teléfono"
                  value={formData.telefono}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <Label className="mb-4" htmlFor="direccion">Dirección</Label>
                <Input
                  id="direccion"
                  placeholder="Dirección"
                  value={formData.direccion}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <Label className="mb-4" htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  placeholder="E-mail"
                  value={formData.email}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <Label className="mb-4" htmlFor="ocupacion">Ocupación</Label>
                <Input
                  id="ocupacion"
                  placeholder="Ocupación"
                  value={formData.ocupacion}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <Label className="mb-4" htmlFor="eps">EPS</Label>
                <Input
                  id="eps"
                  placeholder="EPS"
                  value={formData.eps}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
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
                    disabled
                  />
                  <Label htmlFor="ejercicio-anterior" className="font-medium">Ha realizado ejercicio en un gimnasio anteriormente?</Label>
                </div>
                <Textarea
                  id="ejercicio-anterior-text"
                  rows={3}
                  placeholder="Detalles..."
                  value={formData.ejercicioAnteriorDetalle}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id="actividad-actual"
                    checked={formData.actividadActual}
                    disabled
                  />
                  <Label htmlFor="actividad-actual" className="font-medium">Actualmente realiza alguna actividad física?</Label>
                </div>
                <Textarea
                  id="actividad-actual-text"
                  rows={3}
                  placeholder="Detalles..."
                  value={formData.actividadActualDetalle}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id="sedentario"
                    checked={formData.sedentario}
                    disabled
                  />
                  <Label htmlFor="sedentario" className="font-medium">Sedentario?</Label>
                </div>
                <Textarea
                  id="sedentario-text"
                  rows={3}
                  placeholder="Detalles..."
                  value={formData.sedentarioDetalle}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id="frecuencia"
                    checked={formData.frecuencia}
                    disabled
                  />
                  <Label htmlFor="frecuencia" className="font-medium">Frecuencia de actividad física</Label>
                </div>
                <Textarea
                  id="frecuencia-text"
                  rows={3}
                  placeholder="Frecuencia..."
                  value={formData.frecuenciaDetalle}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
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
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <Label className="mb-4" htmlFor="fr">FR</Label>
                <Input
                  id="fr"
                  type="number"
                  value={formData.fr}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <Label className="mb-4" htmlFor="ta">T/A</Label>
                <Input
                  id="ta"
                  type="text"
                  value={formData.ta}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <Label className="mb-4" htmlFor="horas-sueno">Horas de Sueño</Label>
                <Input
                  id="horas-sueno"
                  type="number"
                  value={formData.horasSueno}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
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
                      disabled
                    />
                    <Label htmlFor="cardiovascular" className="font-semibold">Cardiovascular</Label>
                  </div>
                  <Textarea
                    id="cardiovascular-text"
                    placeholder="Observaciones..."
                    rows={3}
                    value={formData.cardiovascularDetalle}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id="osteomuscular"
                      checked={formData.osteomuscular}
                      disabled
                    />
                    <Label htmlFor="osteomuscular" className="font-semibold">Osteomuscular</Label>
                  </div>
                  <Textarea
                    id="osteomuscular-text"
                    placeholder="Observaciones..."
                    rows={3}
                    value={formData.osteomuscularDetalle}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id="antecedentesMedicos"
                      checked={formData.antecedentesMedicos}
                      disabled
                    />
                    <Label htmlFor="antecedentesMedicos" className="font-semibold">Antecedentes Médicos</Label>
                  </div>
                  <Textarea
                    id="antecedentesMedicos-text"
                    placeholder="Enfermedades previas, cirugías, tratamientos..."
                    rows={3}
                    value={formData.antecedentesMedicosDetalle}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id="metabolico"
                      checked={formData.metabolico}
                      disabled
                    />
                    <Label htmlFor="metabolico" className="font-semibold">Metabólico</Label>
                  </div>
                  <Textarea
                    id="metabolico-text"
                    placeholder="Observaciones..."
                    rows={3}
                    value={formData.metabolicoDetalle}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id="antecedentesFamiliares"
                      checked={formData.antecedentesFamiliares}
                      disabled
                    />
                    <Label htmlFor="antecedentesFamiliares" className="font-semibold">Antecedentes Familiares</Label>
                  </div>
                  <Textarea
                    id="antecedentesFamiliares-text"
                    placeholder="Enfermedades hereditarias..."
                    rows={3}
                    value={formData.antecedentesFamiliaresDetalle}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id="otrosFactores"
                      checked={formData.otrosFactores}
                      disabled
                    />
                    <Label htmlFor="otrosFactores" className="font-semibold">Otros</Label>
                  </div>
                  <Textarea
                    id="otrosFactores-text"
                    placeholder="Otros factores..."
                    rows={3}
                    value={formData.otrosFactoresDetalle}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
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
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <Label className="mb-4" htmlFor="talla">Talla (cm)</Label>
                  <Input
                    id="talla"
                    type="number"
                    value={formData.talla}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <Label className="mb-4" htmlFor="imc">IMC</Label>
                  <Input
                    id="imc"
                    value={formData.imc}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <Label className="mb-4" htmlFor="resPeso">Res. Peso</Label>
                  <Input
                    id="resPeso"
                    placeholder="Resultado peso"
                    value={formData.resPeso}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="font-medium">Tipo de peso</Label>
                  <Input
                    value={tiposPeso}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
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
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <Label className="mb-4" htmlFor="grasaVisceral">Grasa Visceral</Label>
                  <Input
                    id="grasaVisceral"
                    type="number"
                    value={formData.grasaVisceral}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <Label className="mb-4" htmlFor="icc">ICC</Label>
                  <Input
                    id="icc"
                    placeholder="Índice Cintura/Cadera"
                    value={formData.icc}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <Label className="mb-4" htmlFor="riesgoCardiovascular">Riesgo Cardiovascular</Label>
                  <Input
                    id="riesgoCardiovascular"
                    placeholder="Nivel de riesgo"
                    value={formData.riesgoCardiovascular}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <Label className="mb-4" htmlFor="kcal">Kcal</Label>
                  <Input
                    id="kcal"
                    type="number"
                    placeholder="Calorías"
                    value={formData.kcal}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <Label className="mb-4" htmlFor="porcentajeMuscular">% Muscular</Label>
                  <Input
                    id="porcentajeMuscular"
                    type="number"
                    value={formData.porcentajeMuscular}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <Label className="mb-4" htmlFor="edadMetabolica">Edad Metabólica</Label>
                  <Input
                    id="edadMetabolica"
                    type="number"
                    value={formData.edadMetabolica}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Columna 3 */}
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label className="font-medium">Tipo de Obesidad</Label>
                  <Input
                    value={tipoObesidad}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div>
                  <Label className="mb-4" htmlFor="rca">RCA</Label>
                  <Input
                    id="rca"
                    placeholder="Relación Cintura/Altura"
                    value={formData.rca}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div>
                  <Label className="mb-4" htmlFor="mifios">Mifios</Label>
                  <Input
                    id="mifios"
                    placeholder="Masa libre de grasa"
                    value={formData.mifios}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
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
              {/* Columna 1 */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700 border-b pb-2">Muito 0</h3>
                <div>
                  <Label className="mb-4" htmlFor="brazo0">Brazo 0</Label>
                  <Input
                    id="brazo0"
                    type="number"
                    value={formData.brazo0}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <Label className="mb-4" htmlFor="pierna0">Pierna 0</Label>
                  <Input
                    id="pierna0"
                    type="number"
                    value={formData.pierna0}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <Label className="mb-4" htmlFor="abdomen0">Abdomen 0</Label>
                  <Input
                    id="abdomen0"
                    type="number"
                    value={formData.abdomen0}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <Label className="mb-4" htmlFor="hombros0">Hombros 0</Label>
                  <Input
                    id="hombros0"
                    type="number"
                    value={formData.hombros0}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <Label className="mb-4" htmlFor="cintura0">Cintura 0</Label>
                  <Input
                    id="cintura0"
                    type="number"
                    value={formData.cintura0}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Columna 2 */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700 border-b pb-2">Muito 1</h3>
                <div>
                  <Label className="mb-4" htmlFor="brazo1">Brazo 1</Label>
                  <Input
                    id="brazo1"
                    type="number"
                    value={formData.brazo1}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <Label className="mb-4" htmlFor="pierna1">Pierna 1</Label>
                  <Input
                    id="pierna1"
                    type="number"
                    value={formData.pierna1}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <Label className="mb-4" htmlFor="cadera">Cadera</Label>
                  <Input
                    id="cadera"
                    type="number"
                    value={formData.cadera}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <Label className="mb-4" htmlFor="pecho">Pecho</Label>
                  <Input
                    id="pecho"
                    type="number"
                    value={formData.pecho}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Columna 3 */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700 border-b pb-2">Otras Mediciones</h3>
                <div>
                  <Label className="mb-4" htmlFor="cintura">Cintura</Label>
                  <Input
                    id="cintura"
                    type="number"
                    value={formData.cintura}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <Label className="mb-4" htmlFor="muslo">Muslo</Label>
                  <Input
                    id="muslo"
                    type="number"
                    value={formData.muslo}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <Label className="mb-4" htmlFor="pantorrilla">Pantorrilla</Label>
                  <Input
                    id="pantorrilla"
                    type="number"
                    value={formData.pantorrilla}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
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
              {/* Columna 1 */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <Label className="font-semibold text-gray-700 mb-3 block">Nivel Entrenamiento</Label>
                  <Input
                    value={formData.nivelEntrenamiento}
                    disabled
                    className="bg-gray-100 cursor-not-allowed w-full"
                  />
                </div>

                <div>
                  <Label className="font-semibold text-gray-700 mb-3 block">Frecuencia Semanal</Label>
                  <Input
                    value={formData.frecuenciaSemanal}
                    disabled
                    className="bg-gray-100 cursor-not-allowed w-full"
                  />
                </div>

                <div>
                  <Label className="font-semibold text-gray-700 mb-3 block">Objetivos</Label>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="objetivo-peso" className="text-sm mb-2 block">Peso Saludable</Label>
                      <Input
                        id="objetivo-peso"
                        placeholder="Especifique objetivo..."
                        value={formData.objetivoPeso}
                        disabled
                        className="bg-gray-100 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <Label htmlFor="objetivo-salud" className="text-sm mb-2 block">Salud</Label>
                      <Input
                        id="objetivo-salud"
                        placeholder="Especifique objetivo..."
                        value={formData.objetivoSalud}
                        disabled
                        className="bg-gray-100 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <Label htmlFor="objetivo-graso" className="text-sm mb-2 block">Dism. % Graso</Label>
                      <Input
                        id="objetivo-graso"
                        placeholder="Especifique porcentaje..."
                        value={formData.objetivoGraso}
                        disabled
                        className="bg-gray-100 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <Label htmlFor="objetivo-acondicionamiento" className="text-sm mb-2 block">Acond. Físico</Label>
                      <Input
                        id="objetivo-acondicionamiento"
                        placeholder="Especifique objetivo..."
                        value={formData.objetivoAcondicionamiento}
                        disabled
                        className="bg-gray-100 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <Label htmlFor="objetivo-fisico" className="text-sm mb-2 block">Físico</Label>
                      <Input
                        id="objetivo-fisico"
                        placeholder="Especifique objetivo..."
                        value={formData.objetivoFisico}
                        disabled
                        className="bg-gray-100 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <Label htmlFor="objetivo-muscular" className="text-sm mb-2 block">Des. Muscular</Label>
                      <Input
                        id="objetivo-muscular"
                        placeholder="Especifique objetivo..."
                        value={formData.objetivoMuscular}
                        disabled
                        className="bg-gray-100 cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Columna 2 */}
              <div className="p-4 border rounded-lg">
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
                        disabled
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
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-green-700 text-white p-3 rounded-lg">
              <h2 className="text-lg">Programas de Entrenamiento</h2>
            </div>

            {programas.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="py-12 text-center text-gray-500">
                  <Dumbbell className="h-12 w-12 mx-auto mb-3 text-gray-400 mt-4" />
                  <p>No hay programas de entrenamiento.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {programas.map((programa, programaIndex) => (
                  <Card key={programa.id} className="border-2 border-green-200">
                    <CardHeader className="bg-green-50">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3">
                            <h2>Programa {programaIndex + 1}</h2>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <Label className="text-xs">Frecuencia</Label>
                              <Input
                                value={programa.frecuencia}
                                disabled
                                className="bg-gray-100 cursor-not-allowed"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Objetivo</Label>
                              <Input
                                value={programa.objetivo}
                                disabled
                                className="bg-gray-100 cursor-not-allowed"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="">
                      <Accordion type="single" collapsible className="w-full">
                        {programa.dias.map((dia: any, diaIndex: number) => (
                          <AccordionItem key={dia.id} value={dia.id}>
                            <div className="flex items-center justify-between bg-gray-100 px-4 rounded-t-md">
                              <AccordionTrigger className="font-medium hover:no-underline flex-1">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-green-700" />
                                  {dia.nombre} ({dia.ejercicios.length} ejercicio{dia.ejercicios.length !== 1 ? 's' : ''})
                                </div>
                              </AccordionTrigger>
                            </div>

                            <AccordionContent className="p-4 space-y-4 bg-gray-50">
                              {/* Configuración del día */}
                              <div className="grid grid-cols-2 gap-3 p-3 bg-white rounded-md border">
                                <div>
                                  <Label className="text-xs">Rep. Mínimas</Label>
                                  <Input
                                    type="number"
                                    value={dia.repeticionMin}
                                    disabled
                                    className="bg-gray-100 cursor-not-allowed"
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs">Rep. Máximas</Label>
                                  <Input
                                    type="number"
                                    value={dia.repeticionMax}
                                    disabled
                                    className="bg-gray-100 cursor-not-allowed"
                                  />
                                </div>
                              </div>

                              {/* Lista de ejercicios agregados */}
                              <div className="space-y-2">
                                {dia.ejercicios.length === 0 ? (
                                  <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                                    <Dumbbell className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-500">
                                      No hay ejercicios en este día
                                    </p>
                                  </div>
                                ) : (
                                  dia.ejercicios.map((ejercicio: any, ejercicioIndex: number) => (
                                    <div
                                      key={ejercicio.id}
                                      className="border rounded-lg p-3 bg-white hover:shadow-md transition-shadow"
                                    >
                                      <div className="flex gap-3">
                                        {/* Imagen */}
                                        <div className="flex-shrink-0">
                                          {ejercicio.imagen ? (
                                            <img
                                              src={ejercicio.imagen}
                                              alt={ejercicio.nombre}
                                              className="w-20 h-20 object-cover rounded-md border"
                                              onError={(e) => {
                                                e.currentTarget.src = 'https://via.placeholder.com/80?text=Sin+Imagen'
                                              }}
                                            />
                                          ) : (
                                            <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center">
                                              <Dumbbell className="h-8 w-8 text-gray-400" />
                                            </div>
                                          )}
                                        </div>

                                        {/* Información */}
                                        <div className="flex-1 space-y-2">
                                          <div>
                                            <p className="font-semibold text-gray-900">{ejercicio.nombre}</p>
                                            <p className="text-xs text-gray-500">{ejercicio.descripcion}</p>
                                          </div>
                                          {ejercicio.observacion && (
                                            <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded border border-gray-200">
                                              <span className="font-medium">Observación:</span> {ejercicio.observacion}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                )}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
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
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end space-x-4 pt-6">
          <Button
            variant="outline"
            onClick={() => navigate("/valoraciones/ver")}
          >
            Cerrar
          </Button>
          <Button
            onClick={() => navigate(`/valoraciones/${valoracionId}/editar`)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Edit className="h-4 w-4 mr-2" />
            Editar Valoración
          </Button>
        </div>
      </div>
    </div>
  )
}
