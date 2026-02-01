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
import { useDebounce } from "../hooks/useDebounce"
import { useList, useCreate } from "../hooks/useGenericCrud"
import type { Usuario } from "../types/schema.types"

const cleanObject = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(item => cleanObject(item)).filter(item =>
      item !== null && item !== undefined &&
      !(typeof item === 'object' && Object.keys(item).length === 0)
    )
  } else if (obj && typeof obj === 'object') {
    const cleaned: any = {}
    for (const [key, value] of Object.entries(obj)) {
      const cleanedValue = cleanObject(value)
      // Solo incluir si el valor no es null/undefined y no es un objeto vacío
      if (cleanedValue !== null &&
        cleanedValue !== undefined &&
        !(typeof cleanedValue === 'object' && Object.keys(cleanedValue).length === 0)) {
        cleaned[key] = cleanedValue
      }
    }
    return Object.keys(cleaned).length > 0 ? cleaned : undefined
  }
  return obj
}


export function ValoracionesCrear() {
  const navigate = useNavigate()

  const [tiposPeso, setTiposPeso] = useState('')
  const [tipoObesidad, setTipoObesidad] = useState('')
  const [selectedEps, setSelectedEps] = useState('')

  const [searchUsuario, setSearchUsuario] = useState('')
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null)
  const [showUsuarioList, setShowUsuarioList] = useState(false)

  const debouncedSearch = useDebounce(searchUsuario, 300)
  const shouldFetchUsuarios = debouncedSearch.trim().length >= 3

  const [programas, setProgramas] = useState<Array<{
    id: string;
    frecuencia: string;
    objetivo: string;
    dias: Array<{
      id: string;
      nombre: string;
      repeticionMin: number;
      repeticionMax: number;
      ejercicios: Array<{
        id: string;
        ejercicioId: number;
        nombre: string;
        descripcion: string;
        imagen: string | null;
      }>;
    }>;
  }>>([])

  const [searchEjercicio, setSearchEjercicio] = useState<{ [key: string]: string }>({})
  const [showEjercicioList, setShowEjercicioList] = useState<{ [key: string]: boolean }>({})
  const debouncedSearchEjercicio = useDebounce(Object.values(searchEjercicio).join(''), 300)

  const {
    data: usuarios = [],
    isLoading: loadingUsuarios,
  } = useList<Usuario>({
    resourceName: "usuario",
    queryOptions: {
      enabled: shouldFetchUsuarios,
    },
  })

  const shouldFetchEjercicios = Object.values(searchEjercicio).some(
    search => search.trim().length >= 3
  )

  const {
    data: ejercicios = [],
    isLoading: loadingEjercicios,
  } = useList<{
    eje_id: number;
    eje_nombre: string;
    eje_descripcion: string;
    eje_imagen: string | null;
    eje_nivel: string;
  }>({
    resourceName: "ejercicio",
    queryOptions: {
      enabled: shouldFetchEjercicios,
    },
  })

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

  const { mutate: createValoracion, isPending } = useCreate<any, any>("valoracion")

  const handleSelectUsuario = (usuario: Usuario) => {
    setSelectedUsuario(usuario)
    setFormData(prev => ({
      ...prev,
      nombres: usuario.usu_nombre,
      apellidos: usuario.usu_apellido,
      documento: usuario.usu_di.toString(),
      telefono: usuario.usu_telefono,
      email: usuario.usu_email,
      direccion: usuario.usu_direccion,
      eps: usuario.usu_eps,
      ocupacion: usuario.usu_ocupacion,
    }))
    setSearchUsuario('')
    setShowUsuarioList(false)
  }

  // Después de handleSelectUsuario:

  const agregarPrograma = () => {
    const nuevoPrograma = {
      id: `programa-${Date.now()}`,
      nombre: `Programa ${programas.length + 1}`,
      frecuencia: '',
      objetivo: '',
      dias: []
    }
    setProgramas([...programas, nuevoPrograma])
  }

  const eliminarPrograma = (programaId: string) => {
    setProgramas(programas.filter(p => p.id !== programaId))
  }

  const actualizarPrograma = (programaId: string, campo: string, valor: string) => {
    setProgramas(programas.map(p =>
      p.id === programaId ? { ...p, [campo]: valor } : p
    ))
  }

  const agregarDia = (programaId: string) => {
    setProgramas(programas.map(p => {
      if (p.id === programaId) {
        const nuevoDia = {
          id: `dia-${Date.now()}`,
          nombre: `Día ${p.dias.length + 1}`,
          repeticionMin: 8,
          repeticionMax: 12,
          ejercicios: []
        }
        return { ...p, dias: [...p.dias, nuevoDia] }
      }
      return p
    }))
  }

  const eliminarDia = (programaId: string, diaId: string) => {
    setProgramas(programas.map(p => {
      if (p.id === programaId) {
        return { ...p, dias: p.dias.filter(d => d.id !== diaId) }
      }
      return p
    }))
  }

  const actualizarDia = (programaId: string, diaId: string, campo: string, valor: any) => {
    setProgramas(programas.map(p => {
      if (p.id === programaId) {
        return {
          ...p,
          dias: p.dias.map(d =>
            d.id === diaId ? { ...d, [campo]: valor } : d
          )
        }
      }
      return p
    }))
  }

  const agregarEjercicioADia = (programaId: string, diaId: string, ejercicio: any) => {
    const nuevoEjercicio = {
      id: `ejercicio-${Date.now()}`,
      ejercicioId: ejercicio.eje_id,
      nombre: ejercicio.eje_nombre,
      descripcion: ejercicio.eje_descripcion,
      imagen: ejercicio.eje_imagen,
      series: 3,
      repeticiones: 12,
      peso: 0,
      observacion: ''
    }

    setProgramas(programas.map(p => {
      if (p.id === programaId) {
        return {
          ...p,
          dias: p.dias.map(d => {
            if (d.id === diaId) {
              return { ...d, ejercicios: [...d.ejercicios, nuevoEjercicio] }
            }
            return d
          })
        }
      }
      return p
    }))

    // Limpiar búsqueda
    const searchKey = `${programaId}-${diaId}`
    setSearchEjercicio(prev => ({ ...prev, [searchKey]: '' }))
    setShowEjercicioList(prev => ({ ...prev, [searchKey]: false }))
  }

  const eliminarEjercicioDeDia = (programaId: string, diaId: string, ejercicioId: string) => {
    setProgramas(programas.map(p => {
      if (p.id === programaId) {
        return {
          ...p,
          dias: p.dias.map(d => {
            if (d.id === diaId) {
              return { ...d, ejercicios: d.ejercicios.filter(e => e.id !== ejercicioId) }
            }
            return d
          })
        }
      }
      return p
    }))
  }

  const actualizarEjercicio = (
    programaId: string,
    diaId: string,
    ejercicioId: string,
    campo: string,
    valor: any
  ) => {
    setProgramas(programas.map(p => {
      if (p.id === programaId) {
        return {
          ...p,
          dias: p.dias.map(d => {
            if (d.id === diaId) {
              return {
                ...d,
                ejercicios: d.ejercicios.map(e =>
                  e.id === ejercicioId ? { ...e, [campo]: valor } : e
                )
              }
            }
            return d
          })
        }
      }
      return p
    }))
  }

  const moverEjercicio = (
    programaId: string,
    diaId: string,
    fromIndex: number,
    toIndex: number
  ) => {
    setProgramas(programas.map(p => {
      if (p.id === programaId) {
        return {
          ...p,
          dias: p.dias.map(d => {
            if (d.id === diaId) {
              const nuevosEjercicios = [...d.ejercicios]
              const [ejercicioMovido] = nuevosEjercicios.splice(fromIndex, 1)
              nuevosEjercicios.splice(toIndex, 0, ejercicioMovido)
              return { ...d, ejercicios: nuevosEjercicios }
            }
            return d
          })
        }
      }
      return p
    }))
  }

  const getFilteredEjercicios = (searchKey: string) => {
    const searchTerm = searchEjercicio[searchKey] || ''
    if (searchTerm.length < 3) return []

    return ejercicios.filter(ej =>
      ej.eje_nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ej.eje_descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const filteredUsuarios = usuarios.filter(u =>
    u.usu_nombre?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    u.usu_apellido?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    u.usu_di?.toString().includes(debouncedSearch)
  )

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.nombres || !formData.apellidos || !selectedUsuario) {
      toast.error("Por favor seleccione un usuario y complete los campos obligatorios")
      return
    }

    if (isPending) {
      return
    }

    try {
      const valoracionData = {
        val_recomendacion: formData.observaciones || "Sin observaciones",
        val_prox_control: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        usu_difk: selectedUsuario.usu_di,
      }

      const antropometriaData: any = {}
      if (formData.peso) antropometriaData.ant_peso = parseFloat(formData.peso)
      if (formData.talla) antropometriaData.ant_talla = parseFloat(formData.talla)
      if (formData.grasaCorporal) antropometriaData.ant_grasa_corporal = parseFloat(formData.grasaCorporal)
      if (formData.grasaVisceral) antropometriaData.ant_grasa_viceral = parseFloat(formData.grasaVisceral)
      if (formData.kcal) antropometriaData.ant_calorias = parseInt(formData.kcal)
      if (formData.porcentajeMuscular) antropometriaData.ant_procentaje_muscular = parseFloat(formData.porcentajeMuscular)
      if (tiposPeso) antropometriaData.ant_nivel_obesidad = tiposPeso
      if (formData.edadMetabolica) antropometriaData.ant_edad_metabolica = formData.edadMetabolica
      if (formData.riesgoCardiovascular) antropometriaData.ant_riesgo_cardiaco = formData.riesgoCardiovascular
      if (tipoObesidad) antropometriaData.ant_tipo_obesidad = tipoObesidad
      if (formData.rca) antropometriaData.ant_rca = formData.rca

      // 3. Preparar datos físicos - solo campos con valores
      const datosFisicosData: any = {}
      if (formData.fc) {
        const fc = parseInt(formData.fc)
        if (fc > 0) {
          datosFisicosData.dat_fc = fc
          datosFisicosData.dat_fmax = fc
        }
      }
      if (formData.fr && formData.fr !== "0") datosFisicosData.dat_fr = formData.fr
      if (formData.ta && formData.ta !== "0/0") datosFisicosData.dat_ta = formData.ta

      // 4. Preparar entrenamiento y objetivo - solo campos con valores
      const objetivoData: any = {}
      if (formData.objetivoPeso) objetivoData.obj_peso_saludable = formData.objetivoPeso
      if (formData.objetivoSalud) objetivoData.obj_salud = formData.objetivoSalud
      if (formData.objetivoGraso) objetivoData.obj_disminucion_grasa = formData.objetivoGraso
      if (formData.objetivoAcondicionamiento) objetivoData.obj_acon_fisico = formData.objetivoAcondicionamiento
      if (formData.objetivoFisico) objetivoData.obj_fitness = formData.objetivoFisico
      if (formData.objetivoMuscular) objetivoData.obj_desarrollo_muscular = formData.objetivoMuscular

      const entrenamientoData: any = {}
      if (formData.frecuenciaSemanal) entrenamientoData.ent_frecuencia_semanal = formData.frecuenciaSemanal
      if (formData.nivelEntrenamiento) entrenamientoData.ent_nivel_entrenamiento = formData.nivelEntrenamiento
      if (Object.keys(objetivoData).length > 0) {
        entrenamientoData.objetivo = objetivoData
      }

      // 5. Preparar pregunta_factor_valoracion - solo si hay respuesta o observación
      const preguntaFactorValoracionData = [
        {
          paf_idfk: 1,
          pfv_respuesta: formData.cardiovascular,
          pfv_observacion: formData.cardiovascularDetalle || undefined,
        },
        {
          paf_idfk: 2,
          pfv_respuesta: formData.osteomuscular,
          pfv_observacion: formData.osteomuscularDetalle || undefined,
        },
        {
          paf_idfk: 3,
          pfv_respuesta: formData.metabolico,
          pfv_observacion: formData.metabolicoDetalle || undefined,
        },
        {
          paf_idfk: 4,
          pfv_respuesta: formData.otrosFactores,
          pfv_observacion: formData.otrosFactoresDetalle || undefined,
        },
        {
          paf_idfk: 5,
          pfv_respuesta: formData.antecedentesMedicos,
          pfv_observacion: formData.antecedentesMedicosDetalle || undefined,
        },
        {
          paf_idfk: 6,
          pfv_respuesta: formData.antecedentesFamiliares,
          pfv_observacion: formData.antecedentesFamiliaresDetalle || undefined,
        },
      ].filter(item => item.pfv_respuesta || item.pfv_observacion)
        .map(item => ({
          paf_idfk: item.paf_idfk,
          pfv_respuesta: item.pfv_respuesta,
          ...(item.pfv_observacion && { pfv_observacion: item.pfv_observacion })
        }))

      // 6. Preparar respuesta_cuestionario_fisico - solo si hay texto
      const respuestaCuestionarioData = [
        {
          pre_idfk: 4,
          ...(formData.ejercicioAnteriorDetalle && { res_texto_libre: formData.ejercicioAnteriorDetalle }),
        },
        {
          pre_idfk: 9,
          ...(formData.actividadActualDetalle && { res_texto_libre: formData.actividadActualDetalle }),
        },
        {
          pre_idfk: 7,
          ...(formData.sedentarioDetalle && { res_texto_libre: formData.sedentarioDetalle }),
        },
        {
          pre_idfk: 10,
          ...(formData.frecuenciaDetalle && { res_texto_libre: formData.frecuenciaDetalle }),
        },
      ].filter(item => Object.keys(item).length > 1) // Filtra objetos que solo tienen pre_idfk

      // 7. Preparar mediciones_parte - solo si hay medición diferente de "0"
      const medicionesParteData = [
        { par_idfk: 1, med_medida: formData.brazo0 },
        { par_idfk: 9, med_medida: formData.pierna0 },
        { par_idfk: 6, med_medida: formData.abdomen0 },
        { par_idfk: 11, med_medida: formData.hombros0 },
        { par_idfk: 4, med_medida: formData.cintura0 },
        { par_idfk: 2, med_medida: formData.brazo1 },
        { par_idfk: 10, med_medida: formData.pierna1 },
        { par_idfk: 5, med_medida: formData.cadera },
        { par_idfk: 3, med_medida: formData.pecho },
        { par_idfk: 7, med_medida: formData.muslo },
        { par_idfk: 8, med_medida: formData.muslo },
        { par_idfk: 13, med_medida: formData.pantorrilla },
      ]
        .filter(item => item.med_medida && item.med_medida.trim() !== "" && item.med_medida !== "0")
        .map(item => ({
          par_idfk: item.par_idfk,
          med_medida: item.med_medida.trim()
        }))

      // 8. Construir payload final - solo incluir objetos que tengan datos
      const payload: any = {
        ...valoracionData,
      }

      // Solo añadir objetos que tengan propiedades
      if (Object.keys(antropometriaData).length > 0) {
        payload.antropometria = antropometriaData
      }

      if (Object.keys(datosFisicosData).length > 0) {
        payload.datos_fisicos = datosFisicosData
      }

      if (Object.keys(entrenamientoData).length > 0) {
        payload.entrenamiento = entrenamientoData
      }

      if (preguntaFactorValoracionData.length > 0) {
        payload.pregunta_factor_valoracion = preguntaFactorValoracionData
      }

      if (respuestaCuestionarioData.length > 0) {
        payload.respuesta_cuestionario_fisico = respuestaCuestionarioData
      }

      if (medicionesParteData.length > 0) {
        payload.medicion_parte = medicionesParteData
      }

      console.log("Payload final a enviar:", JSON.stringify(payload, null, 2))

      // Validar que hay más datos que solo los básicos
      const basicFields = ['val_recomendacion', 'val_prox_control', 'usu_difk', 'eliminado']
      const hasAdditionalData = Object.keys(payload).some(key => !basicFields.includes(key))

      if (!hasAdditionalData) {
        toast.error("Por favor complete al menos algunos datos de la valoración")
        return
      }

      // 9. Enviar petición POST
      createValoracion(payload, {
        onSuccess: (response) => {
          toast.success("Valoración guardada exitosamente")
          navigate('/valoraciones/ver')
        },
        onError: (error) => {
          console.error("Error al guardar:", error)
          toast.error("Error al guardar la valoración: " + (error.message || "Error desconocido"))
        }
      })
    } catch (error) {
      console.error("Error inesperado:", error)
      toast.error("Error inesperado al procesar la valoración")
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
            <div className="bg-white border border-gray-200 rounded-b-lg p-4 space-y-4">

              {/* Buscador de Usuario */}
              {!selectedUsuario && (
                <div className="space-y-2">
                  <Label htmlFor="search-usuario" className="text-base font-semibold">
                    Buscar Afiliado *
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="search-usuario"
                      placeholder="Buscar por nombre o documento (mínimo 3 caracteres)..."
                      value={searchUsuario}
                      onChange={(e) => {
                        setSearchUsuario(e.target.value)
                        setShowUsuarioList(e.target.value.length >= 3)
                      }}
                      onFocus={() => searchUsuario.length >= 3 && setShowUsuarioList(true)}
                      className="pl-10"
                    />
                  </div>

                  {/* Lista de resultados */}
                  {showUsuarioList && shouldFetchUsuarios && (
                    <div className="border rounded-lg bg-white shadow-lg max-h-60 overflow-y-auto">
                      {loadingUsuarios ? (
                        <div className="p-4 text-center text-gray-500">
                          Buscando afiliados...
                        </div>
                      ) : filteredUsuarios.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                          No se encontraron afiliados
                        </div>
                      ) : (
                        <div className="divide-y">
                          {filteredUsuarios.map((usuario) => (
                            <div
                              key={usuario.usu_di}
                              className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                              onClick={() => handleSelectUsuario(usuario)}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-gray-900">
                                    {usuario.usu_nombre} {usuario.usu_apellido}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Doc: {usuario.usu_di} | {usuario.usu_email}
                                  </p>
                                </div>
                                <Plus className="h-5 w-5 text-green-600" />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {searchUsuario.length > 0 && searchUsuario.length < 3 && (
                    <p className="text-sm text-gray-500">
                      Escribe al menos 3 caracteres para buscar
                    </p>
                  )}
                </div>
              )}

              {/* Card de Usuario Seleccionado */}
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
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedUsuario(null)
                        setFormData(prev => ({
                          ...prev,
                          nombres: '',
                          apellidos: '',
                          documento: '',
                          telefono: '',
                          email: '',
                          direccion: '',
                          eps: '',
                          ocupacion: '',
                        }))
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cambiar
                    </Button>
                  </div>
                </div>
              )}

              {/* Campos de información (read-only cuando hay usuario seleccionado) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="mb-4" htmlFor="nombres">Nombres *</Label>
                  <Input
                    id="nombres"
                    placeholder="Ingrese nombres"
                    value={formData.nombres}
                    onChange={(e) => handleInputChange('nombres', e.target.value)}
                    disabled
                    className={selectedUsuario ? "bg-gray-100 cursor-not-allowed" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="mb-4" htmlFor="apellidos">Apellidos *</Label>
                  <Input
                    id="apellidos"
                    placeholder="Ingrese apellidos"
                    value={formData.apellidos}
                    onChange={(e) => handleInputChange('apellidos', e.target.value)}
                    disabled
                    className={selectedUsuario ? "bg-gray-100 cursor-not-allowed" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="mb-4" htmlFor="documento">Documento</Label>
                  <Input
                    id="documento"
                    placeholder="Número de documento"
                    value={formData.documento}
                    onChange={(e) => handleInputChange('documento', e.target.value)}
                    disabled
                    className={selectedUsuario ? "bg-gray-100 cursor-not-allowed" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="mb-4" htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    placeholder="Número de teléfono"
                    value={formData.telefono}
                    onChange={(e) => handleInputChange('telefono', e.target.value)}
                    disabled
                    className={selectedUsuario ? "bg-gray-100 cursor-not-allowed" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="mb-4" htmlFor="direccion">Dirección</Label>
                  <Input
                    id="direccion"
                    placeholder="Dirección"
                    value={formData.direccion}
                    onChange={(e) => handleInputChange('direccion', e.target.value)}
                    disabled
                    className={selectedUsuario ? "bg-gray-100 cursor-not-allowed" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="mb-4" htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled
                    className={selectedUsuario ? "bg-gray-100 cursor-not-allowed" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="mb-4" htmlFor="ocupacion">Ocupación</Label>
                  <Input
                    id="ocupacion"
                    placeholder="Ocupación"
                    value={formData.ocupacion}
                    onChange={(e) => handleInputChange('ocupacion', e.target.value)}
                    disabled
                    className={selectedUsuario ? "bg-gray-100 cursor-not-allowed" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="mb-4" htmlFor="eps">EPS</Label>
                  <Input
                    id="eps"
                    placeholder="EPS"
                    value={formData.eps}
                    onChange={(e) => handleInputChange('eps', e.target.value)}
                    disabled
                    className={selectedUsuario ? "bg-gray-100 cursor-not-allowed" : ""}
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
                    <Select value={tiposPeso} onValueChange={setTiposPeso}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione tipo de peso" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bajopeso">Bajopeso</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="sobrepeso">Sobrepeso</SelectItem>
                        <SelectItem value="obesidad">Obesidad</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Select value={tipoObesidad} onValueChange={setTipoObesidad}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione tipo de obesidad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cinoide">Cinoide</SelectItem>
                        <SelectItem value="androide">Androide</SelectItem>
                      </SelectContent>
                    </Select>
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
              <div className="mb-4">
                <Label className="font-semibold text-gray-700 mb-3 block">Nivel Entrenamiento</Label>
                <Select
                  value={formData.nivelEntrenamiento}
                  onValueChange={(value) => handleInputChange('nivelEntrenamiento', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inicial">Inicial</SelectItem>
                    <SelectItem value="intermedio">Intermedio</SelectItem>
                    <SelectItem value="avanzado">Avanzado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Columna 1 - Nivel de Entrenamiento y Objetivos */}
                <div className="lg:col-span-3 space-y-6">
                  {/* Nivel de Entrenamiento */}
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
                <div className="p-4">
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
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-green-700 text-white p-3 rounded-lg">
              <h2 className="text-lg">Programas de Entrenamiento</h2>
              <Button
                type="button"
                onClick={agregarPrograma}
                className="bg-white text-green-700 hover:bg-green-50"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                Agregar Programa
              </Button>
            </div>

            {programas.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="py-12 text-center text-gray-500">
                  <Dumbbell className="h-12 w-12 mx-auto mb-3 text-gray-400 mt-4" />
                  <p>No hay programas de entrenamiento.</p>
                  <p className="text-sm">Haz clic en "Agregar Programa" para comenzar.</p>
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
                            <h2 className="">Programa {programas.length + 1}</h2>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => eliminarPrograma(programa.id)}
                              className="text-red-600 hover:text-red-800 hover:bg-red-50"
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <Label className="text-xs">Frecuencia</Label>
                              <Input
                                value={programa.frecuencia}
                                onChange={(e) => actualizarPrograma(programa.id, 'frecuencia', e.target.value)}
                                placeholder="Ej: 3 veces por semana"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Objetivo</Label>
                              <Input
                                value={programa.objetivo}
                                onChange={(e) => actualizarPrograma(programa.id, 'objetivo', e.target.value)}
                                placeholder="Ej: Hipertrofia, Fuerza..."
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-6">
                      <Accordion type="single" collapsible className="w-full">
                        {programa.dias.map((dia, diaIndex) => {
                          const searchKey = `${programa.id}-${dia.id}`
                          const filteredEjs = getFilteredEjercicios(searchKey)

                          return (
                            <AccordionItem key={dia.id} value={dia.id}>
                              <div className="flex items-center justify-between bg-gray-100 px-4 rounded-t-md">
                                <AccordionTrigger className="font-medium hover:no-underline flex-1">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-green-700" />
                                    {dia.nombre} ({dia.ejercicios.length} ejercicio{dia.ejercicios.length !== 1 ? 's' : ''})
                                  </div>
                                </AccordionTrigger>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    eliminarDia(programa.id, dia.id)
                                  }}
                                  className="text-red-600 hover:text-red-800 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>

                              <AccordionContent className="p-4 space-y-4 bg-gray-50">
                                {/* Configuración del día */}
                                <div className="grid grid-cols-2 gap-3 p-3 bg-white rounded-md border">
                                  <div>
                                    <Label className="text-xs">Rep. Mínimas</Label>
                                    <Input
                                      type="number"
                                      value={dia.repeticionMin}
                                      onChange={(e) => actualizarDia(programa.id, dia.id, 'repeticionMin', parseInt(e.target.value))}
                                      min="1"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-xs">Rep. Máximas</Label>
                                    <Input
                                      type="number"
                                      value={dia.repeticionMax}
                                      onChange={(e) => actualizarDia(programa.id, dia.id, 'repeticionMax', parseInt(e.target.value))}
                                      min="1"
                                    />
                                  </div>
                                </div>

                                {/* Buscador de ejercicios */}
                                <div className="space-y-2">
                                  <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-700 h-4 w-4" />
                                    <Input
                                      placeholder="Buscar ejercicio (mínimo 3 caracteres)..."
                                      value={searchEjercicio[searchKey] || ''}
                                      onChange={(e) => {
                                        setSearchEjercicio(prev => ({ ...prev, [searchKey]: e.target.value }))
                                        setShowEjercicioList(prev => ({
                                          ...prev,
                                          [searchKey]: e.target.value.length >= 3
                                        }))
                                      }}
                                      onFocus={() => {
                                        if ((searchEjercicio[searchKey] || '').length >= 3) {
                                          setShowEjercicioList(prev => ({ ...prev, [searchKey]: true }))
                                        }
                                      }}
                                      className="pl-10"
                                    />
                                  </div>

                                  {/* Lista de ejercicios disponibles */}
                                  {showEjercicioList[searchKey] && (searchEjercicio[searchKey] || '').length >= 3 && (
                                    <div className="border rounded-lg bg-white shadow-lg max-h-64 overflow-y-auto">
                                      {loadingEjercicios ? (
                                        <div className="p-4 text-center text-gray-500">
                                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-700 mx-auto"></div>
                                          <p className="mt-2">Buscando ejercicios...</p>
                                        </div>
                                      ) : filteredEjs.length === 0 ? (
                                        <div className="p-4 text-center text-gray-500">
                                          No se encontraron ejercicios
                                        </div>
                                      ) : (
                                        <div className="divide-y">
                                          {filteredEjs.map((ejercicio) => (
                                            <div
                                              key={ejercicio.eje_id}
                                              className="p-3 hover:bg-green-50 cursor-pointer transition-colors flex items-center gap-3"
                                              onClick={() => agregarEjercicioADia(programa.id, dia.id, ejercicio)}
                                            >
                                              {/* Imagen del ejercicio */}
                                              <div className="flex-shrink-0">
                                                {ejercicio.eje_imagen ? (
                                                  <img
                                                    src={ejercicio.eje_imagen}
                                                    alt={ejercicio.eje_nombre}
                                                    className="w-16 h-16 object-cover rounded-md border"
                                                    onError={(e) => {
                                                      e.currentTarget.src = 'https://via.placeholder.com/64?text=Sin+Imagen'
                                                    }}
                                                  />
                                                ) : (
                                                  <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                                                    <Dumbbell className="h-6 w-6 text-gray-400" />
                                                  </div>
                                                )}
                                              </div>

                                              {/* Información del ejercicio */}
                                              <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-900 truncate">
                                                  {ejercicio.eje_nombre}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                  {ejercicio.eje_descripcion}
                                                </p>
                                                <Badge variant="outline" className="mt-1">
                                                  {ejercicio.eje_nivel}
                                                </Badge>
                                              </div>

                                              <Plus className="h-5 w-5 text-green-600 flex-shrink-0" />
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {(searchEjercicio[searchKey] || '').length > 0 && (searchEjercicio[searchKey] || '').length < 3 && (
                                    <p className="text-sm text-gray-500">
                                      Escribe al menos 3 caracteres para buscar
                                    </p>
                                  )}
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
                                    dia.ejercicios.map((ejercicio, ejercicioIndex) => (
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

                                          {/* Información y controles */}
                                          <div className="flex-1 space-y-2">
                                            <div className="flex items-start justify-between">
                                              <div className="flex-1">
                                                <p className="font-semibold text-gray-900">{ejercicio.nombre}</p>
                                                <p className="text-xs text-gray-500">{ejercicio.descripcion}</p>
                                              </div>

                                              {/* Controles de orden */}
                                              <div className="flex items-center gap-1">
                                                <Button
                                                  type="button"
                                                  variant="ghost"
                                                  size="icon"
                                                  className="h-7 w-7"
                                                  onClick={() => moverEjercicio(programa.id, dia.id, ejercicioIndex, ejercicioIndex - 1)}
                                                  disabled={ejercicioIndex === 0}
                                                >
                                                  {/* <ChevronUp className="h-4 w-4" /> */}
                                                </Button>
                                                <Button
                                                  type="button"
                                                  variant="ghost"
                                                  size="icon"
                                                  className="h-7 w-7"
                                                  onClick={() => moverEjercicio(programa.id, dia.id, ejercicioIndex, ejercicioIndex + 1)}
                                                  disabled={ejercicioIndex === dia.ejercicios.length - 1}
                                                >
                                                  <ChevronDown className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                  type="button"
                                                  variant="ghost"
                                                  size="icon"
                                                  className="h-7 w-7 text-red-600 hover:text-red-800"
                                                  onClick={() => eliminarEjercicioDeDia(programa.id, dia.id, ejercicio.id)}
                                                >
                                                  <X className="h-4 w-4" />
                                                </Button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))
                                  )}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          )
                        })}
                      </Accordion>

                      {/* Botón agregar día */}
                      <div className="mt-4">
                        <Button
                          type="button"
                          onClick={() => agregarDia(programa.id)}
                          variant="outline"
                          className="w-full border-dashed border-2 hover:border-green-600 hover:bg-green-50"
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Agregar Día al Programa
                        </Button>
                      </div>
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
                    onChange={(e) => handleInputChange('observaciones', e.target.value)}
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
