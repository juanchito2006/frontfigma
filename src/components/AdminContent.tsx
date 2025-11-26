import { useState, useEffect } from "react"
import { useAuth } from "../context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Checkbox } from "./ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Badge } from "./ui/badge"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "./ui/dialog"
import { ScrollArea } from "./ui/scroll-area"
import { Switch } from "./ui/switch"
import { toast } from "sonner"
import { 
  Users, Dumbbell, BarChart3, Settings, HelpCircle, User, Plus, Download, 
  ChevronDown, LogOut, Edit, Calendar, ChevronLeft, ChevronRight, ClipboardList, 
  TrendingUp, Info, Upload, FileVideo, FileImage, Play, Trash2, X, Search, 
  GripVertical, PlusCircle, Eye, Shield, FileText, CheckCircle, UserCheck, 
  Mail, Phone, ArrowLeft 
} from "lucide-react"
import { useValoracion } from "../context"
import { ExerciseManager } from "./ExerciseManager"
import { Calendar as CalendarComponent } from "./ui/calendar"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from "recharts"
import exampleImage from 'figma:asset/bdbdb9e96e0c5fc635919289bd77ed6257ab9994.png'
import { ValoracionDetailView } from "./ValoracionDetailView"
import { UserProfileView } from "./UserProfileView"
import { ConfigurationSettings } from "./ConfigurationSettings"
import { EPSCombobox } from "./common/EPSCombobox"
import { PoliticaDatosContent } from "./PoliticaDatosContent"

interface AdminContentProps {
  activeSection: string
  onNavigateToUserProfile?: (userId: number) => void
  onNavigateToValoracionDetail?: (valoracionId: number) => void
  onNavigateToEditUser?: (userId: number) => void
}

// Datos de valoraciones ahora se manejan a través del contexto ValoracionContext

// Simulated database for usuarios
let usuariosDB: any[] = [
  {
    id: 1,
    nombres: "Juan Carlos",
    apellidos: "Pérez García",
    email: "juan.perez@email.com",
    fechaNacimiento: "1990-05-15",
    tipoDocumento: "CC",
    documento: "1234567890",
    fechaExpedicion: "2020-03-10",
    direccion: "Calle 123 #45-67",
    eps: "Sura EPS",
    telefono: "3001234567",
    sexo: "Masculino",
    ocupacion: "Ingeniero",
    rol: "Usuario",
    fechaCreacion: "2024-01-15"
  },
  {
    id: 2,
    nombres: "María Elena",
    apellidos: "González López",
    email: "maria.gonzalez@email.com",
    fechaNacimiento: "1985-08-22",
    tipoDocumento: "CC",
    documento: "9876543210",
    fechaExpedicion: "2018-11-05",
    direccion: "Carrera 456 #78-90",
    eps: "Nueva EPS",
    telefono: "3109876543",
    sexo: "Femenino",
    ocupacion: "Doctora",
    rol: "Administrador",
    fechaCreacion: "2024-01-10"
  },
  {
    id: 3,
    nombres: "Carlos Alberto",
    apellidos: "Rodríguez Vargas",
    email: "carlos.rodriguez@email.com",
    fechaNacimiento: "1992-03-08",
    tipoDocumento: "CC",
    documento: "1122334455",
    fechaExpedicion: "2021-07-15",
    direccion: "Avenida 789 #12-34",
    eps: "Compensar EPS",
    telefono: "3201234567",
    sexo: "Masculino",
    ocupacion: "Abogado",
    rol: "Usuario",
    fechaCreacion: "2024-01-08"
  },
  {
    id: 4,
    nombres: "Ana Patricia",
    apellidos: "Martínez Sánchez",
    email: "ana.martinez@email.com",
    fechaNacimiento: "1988-11-12",
    tipoDocumento: "CC",
    documento: "5566778899",
    fechaExpedicion: "2019-09-20",
    direccion: "Calle 456 #78-90",
    eps: "Salud Total EPS",
    telefono: "3159876543",
    sexo: "Femenino",
    ocupacion: "Arquitecta",
    rol: "Usuario",
    fechaCreacion: "2024-01-05"
  },
  {
    id: 5,
    nombres: "Pedro Alejandro",
    apellidos: "Silva Moreno",
    email: "pedro.silva@email.com",
    fechaNacimiento: "1987-06-25",
    tipoDocumento: "CC",
    documento: "2233445566",
    fechaExpedicion: "2020-12-03",
    direccion: "Carrera 321 #54-76",
    eps: "Sura EPS",
    telefono: "3181234567",
    sexo: "Masculino",
    ocupacion: "Contador",
    rol: "Usuario",
    fechaCreacion: "2023-12-20"
  },
  {
    id: 6,
    nombres: "Laura Cristina",
    apellidos: "Herrera Jiménez",
    email: "laura.herrera@email.com",
    fechaNacimiento: "1993-09-14",
    tipoDocumento: "CC",
    documento: "7788990011",
    fechaExpedicion: "2022-04-18",
    direccion: "Calle 987 #65-43",
    eps: "Nueva EPS",
    telefono: "3229876543",
    sexo: "Femenino",
    ocupacion: "Psicóloga",
    rol: "Usuario",
    fechaCreacion: "2023-12-15"
  },
  {
    id: 7,
    nombres: "Diego Fernando",
    apellidos: "Morales Castro",
    email: "diego.morales@email.com",
    fechaNacimiento: "1991-01-30",
    tipoDocumento: "CC",
    documento: "3344556677",
    fechaExpedicion: "2021-08-12",
    direccion: "Avenida 654 #32-10",
    eps: "Compensar EPS",
    telefono: "3121234567",
    sexo: "Masculino",
    ocupacion: "Médico",
    rol: "Usuario",
    fechaCreacion: "2023-12-10"
  },
  {
    id: 8,
    nombres: "Sofia Isabella",
    apellidos: "Castro Ramírez",
    email: "sofia.castro@email.com",
    fechaNacimiento: "1994-04-07",
    tipoDocumento: "CC",
    documento: "8899001122",
    fechaExpedicion: "2023-01-25",
    direccion: "Carrera 147 #86-52",
    eps: "Salud Total",
    telefono: "3169876543",
    sexo: "Femenino",
    ocupacion: "Enfermera",
    rol: "Usuario",
    fechaCreacion: "2023-12-05"
  },
  {
    id: 9,
    nombres: "Roberto Carlos",
    apellidos: "Vega Mendoza",
    email: "roberto.vega@email.com",
    fechaNacimiento: "1986-12-19",
    tipoDocumento: "CC",
    documento: "4455667788",
    fechaExpedicion: "2019-06-14",
    direccion: "Calle 258 #74-96",
    eps: "Sura",
    telefono: "3131234567",
    sexo: "Masculino",
    ocupacion: "Empresario",
    rol: "Usuario",
    fechaCreacion: "2023-11-28"
  },
  {
    id: 10,
    nombres: "Carmen Lucía",
    apellidos: "Ruiz Fernández",
    email: "carmen.ruiz@email.com",
    fechaNacimiento: "1989-07-11",
    tipoDocumento: "CC",
    documento: "9900112233",
    fechaExpedicion: "2020-10-08",
    direccion: "Avenida 369 #15-28",
    eps: "Nueva EPS",
    telefono: "3219876543",
    sexo: "Femenino",
    ocupacion: "Profesora",
    rol: "Usuario",
    fechaCreacion: "2023-11-25"
  },
  {
    id: 11,
    nombres: "Andrés Felipe",
    apellidos: "Torres Gutiérrez",
    email: "andres.torres@email.com",
    fechaNacimiento: "1995-10-03",
    tipoDocumento: "CC",
    documento: "5566778800",
    fechaExpedicion: "2023-03-22",
    direccion: "Carrera 741 #63-85",
    eps: "Compensar",
    telefono: "3141234567",
    sexo: "Masculino",
    ocupacion: "Ingeniero de Software",
    rol: "Usuario",
    fechaCreacion: "2023-11-20"
  },
  {
    id: 12,
    nombres: "Valentina",
    apellidos: "López Serrano",
    email: "valentina.lopez@email.com",
    fechaNacimiento: "1996-02-17",
    tipoDocumento: "CC",
    documento: "1122334400",
    fechaExpedicion: "2023-05-30",
    direccion: "Calle 852 #41-69",
    eps: "Salud Total",
    telefono: "3259876543",
    sexo: "Femenino",
    ocupacion: "Diseñadora",
    rol: "Usuario",
    fechaCreacion: "2023-11-15"
  },
  {
    id: 13,
    nombres: "Miguel Ángel",
    apellidos: "Delgado Rojas",
    email: "miguel.delgado@email.com",
    fechaNacimiento: "1984-08-09",
    tipoDocumento: "CC",
    documento: "6677889900",
    fechaExpedicion: "2018-12-11",
    direccion: "Avenida 963 #27-44",
    eps: "Sura",
    telefono: "3151234567",
    sexo: "Masculino",
    ocupacion: "Veterinario",
    rol: "Usuario",
    fechaCreacion: "2023-11-12"
  },
  {
    id: 14,
    nombres: "Camila Andrea",
    apellidos: "Ospina Vargas",
    email: "camila.ospina@email.com",
    fechaNacimiento: "1997-05-26",
    tipoDocumento: "CC",
    documento: "2233445500",
    fechaExpedicion: "2023-07-19",
    direccion: "Carrera 159 #38-72",
    eps: "Nueva EPS",
    telefono: "3289876543",
    sexo: "Femenino",
    ocupacion: "Fisioterapeuta",
    rol: "Usuario",
    fechaCreacion: "2023-11-08"
  },
  {
    id: 15,
    nombres: "Sebastián",
    apellidos: "Aguilar Peña",
    email: "sebastian.aguilar@email.com",
    fechaNacimiento: "1993-12-04",
    tipoDocumento: "CC",
    documento: "7788990000",
    fechaExpedicion: "2022-09-26",
    direccion: "Calle 753 #49-81",
    eps: "Compensar",
    telefono: "3161234567",
    sexo: "Masculino",
    ocupacion: "Chef",
    rol: "Usuario",
    fechaCreacion: "2023-11-05"
  },
  {
    id: 16,
    nombres: "Natalia",
    apellidos: "Restrepo Molina",
    email: "natalia.restrepo@email.com",
    fechaNacimiento: "1990-11-21",
    tipoDocumento: "CC",
    documento: "3344556600",
    fechaExpedicion: "2021-02-14",
    direccion: "Avenida 486 #56-23",
    eps: "Salud Total",
    telefono: "3309876543",
    sexo: "Femenino",
    ocupacion: "Periodista",
    rol: "Usuario",
    fechaCreacion: "2023-11-02"
  },
  {
    id: 17,
    nombres: "Alejandro",
    apellidos: "Quintero Gómez",
    email: "alejandro.quintero@email.com",
    fechaNacimiento: "1985-03-18",
    tipoDocumento: "CC",
    documento: "8899001100",
    fechaExpedicion: "2019-11-07",
    direccion: "Carrera 842 #71-94",
    eps: "Sura",
    telefono: "3171234567",
    sexo: "Masculino",
    ocupacion: "Economista",
    rol: "Usuario",
    fechaCreacion: "2023-10-30"
  }
]

// Simulated database for ejercicios
let ejerciciosDB: any[] = [
  {
    id: 1,
    nombre: "Flexiones de brazos",
    descripcion: "Ejercicio de fuerza para el tren superior que fortalece pecho, hombros y tríceps",
    ejemplo: "Posición de plancha, bajar el cuerpo hasta que el pecho toque el suelo y subir",
    categoria: "Fuerza",
    duracion: 15,
    dificultad: "Intermedio",
    fechaCreacion: "2024-01-15",
    archivoEjemplo: {
      nombre: "flexiones_ejemplo.jpg",
      tipo: "image/jpeg",
      tamaño: 245760,
      url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      esVideo: false
    }
  },
  {
    id: 2,
    nombre: "Carrera en cinta",
    descripcion: "Ejercicio cardiovascular que mejora la resistencia y quema calorías",
    ejemplo: "Caminar o correr a velocidad constante manteniendo una postura erguida",
    categoria: "Cardio",
    duracion: 30,
    dificultad: "Principiante",
    fechaCreacion: "2024-01-10",
    archivoEjemplo: {
      nombre: "carrera_ejemplo.mp4",
      tipo: "video/mp4",
      tamaño: 1524000,
      url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
      esVideo: true
    }
  },
  {
    id: 3,
    nombre: "Sentadillas",
    descripcion: "Ejercicio fundamental para fortalecer piernas y glúteos",
    ejemplo: "Pies separados al ancho de hombros, bajar como si se fuera a sentar y subir",
    categoria: "Fuerza",
    duracion: 20,
    dificultad: "Intermedio",
    fechaCreacion: "2024-01-08",
    archivoEjemplo: {
      nombre: "sentadillas_demo.jpg",
      tipo: "image/jpeg",
      tamaño: 312000,
      url: "https://images.unsplash.com/photo-1566241134521-fc4b19b40836?w=400&h=300&fit=crop",
      esVideo: false
    }
  }
]

export function AdminContent({ activeSection, onNavigateToUserProfile, onNavigateToValoracionDetail, onNavigateToEditUser }: AdminContentProps) {
  const { user, logout } = useAuth()
  const { valoraciones, addValoracion, updateValoracion, getValoracion } = useValoracion()
  const [internalActiveSection, setActiveSection] = useState(activeSection)
  const [formData, setFormData] = useState<any>({})
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showUserConfirmDialog, setShowUserConfirmDialog] = useState(false)
  const [showPolicyDialog, setShowPolicyDialog] = useState(false)
  const [acceptedPolicy, setAcceptedPolicy] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [userSearchTerm, setUserSearchTerm] = useState('')
  const [showUserList, setShowUserList] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [showCreateRoleDialog, setShowCreateRoleDialog] = useState(false)
  const [showEditRoleDialog, setShowEditRoleDialog] = useState(false)
  const [showDeleteRoleDialog, setShowDeleteRoleDialog] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [showValoracionDialog, setShowValoracionDialog] = useState(false)
  const [currentValoracion, setCurrentValoracion] = useState<any>(null)
  const [isEditingValoracion, setIsEditingValoracion] = useState(false)
  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [roleFormData, setRoleFormData] = useState({
    nombre: '',
    permisos: {
      crearUsuarios: false,
      eliminarUsuarios: false,
      crearEjercicios: false,
      eliminarEjercicios: false,
      editarEjercicios: false,
      crearValoracion: false
    }
  })
  const [notifications, setNotifications] = useState(true)
  const [showUserStatsModal, setShowUserStatsModal] = useState(false)
  const [showExerciseConfirmDialog, setShowExerciseConfirmDialog] = useState(false)
  const [exerciseFormData, setExerciseFormData] = useState({
    nombre: '',
    descripcion: '',
    ejemplo: '',
    categoria: '',
    dificultad: ''
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [editingExercise, setEditingExercise] = useState<any>(null)
  const [deleteExerciseDialog, setDeleteExerciseDialog] = useState({ 
    isOpen: false, 
    exerciseId: null as number | null, 
    exerciseName: '' 
  })
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [exportSearchTerm, setExportSearchTerm] = useState('')
  const [exportedValoracion, setExportedValoracion] = useState<any>(null)
  const [editFormData, setEditFormData] = useState({
    nombre: '',
    descripcion: '',
    categoria: '',
    dificultad: ''
  })
  const [editSelectedFile, setEditSelectedFile] = useState<File | null>(null)
  const [editFilePreview, setEditFilePreview] = useState<string | null>(null)
  const [showUserDetailDialog, setShowUserDetailDialog] = useState(false)
  const [selectedUserForDetail, setSelectedUserForDetail] = useState<any>(null)
  const [showEmailDialog, setShowEmailDialog] = useState(false)
  const [emailData, setEmailData] = useState({
    email: '',
    alternativeEmail: '',
    useAlternativeEmail: false
  })
  
  // Estados para el calendario
  const [calendarDate, setCalendarDate] = useState(new Date())
  
  // Estados para cuestionario inicial
  const [cuestionarioChecks, setCuestionarioChecks] = useState({
    ejercicioAnterior: false,
    actividadActual: false,
    sedentario: false,
    frecuencia: false
  })
  
  // Estados para factores de riesgo
  const [factoresRiesgoChecks, setFactoresRiesgoChecks] = useState({
    cardiovascular: false,
    osteomuscular: false,
    metabolico: false,
    otros: false,
    antecedentesMedicos: false,
    antecedentesFamiliares: false
  })
  
  // Estados para antropometría - selección exclusiva
  const [tipoObesidad, setTipoObesidad] = useState('')
  const [tiposPeso, setTiposPeso] = useState('')
  const [nivelEntrenamiento, setNivelEntrenamiento] = useState('')
  const [selectedEps, setSelectedEps] = useState('')
  const [frecuenciaSemanal, setFrecuenciaSemanal] = useState('')
  const [userFormData, setUserFormData] = useState({
    nombres: '',
    apellidos: '',
    email: '',
    password: '',
    fechaNacimiento: '',
    tipoDocumento: '',
    documento: '',
    fechaExpedicion: '',
    direccion: '',
    eps: '',
    telefono: '',
    sexo: '',
    ocupacion: '',
    rol: ''
  })

  // Sincronizar el estado interno con el prop cuando cambie
  useEffect(() => {
    setActiveSection(activeSection)
  }, [activeSection])

  const clearForm = () => {
    // Clear form data state
    setFormData({})
    
    // Clear all form fields specifically for valoracion form
    const valoracionInputs = [
      'nombres', 'apellidos', 'documento', 'telefono', 'email', 'direccion', 'ocupacion',
      'fc', 'fr', 'ta', 'horas-sueno',
      'peso', 'talla', 'imc', 'resPeso',
      'grasaCorporal', 'grasaVisceral', 'icc', 'riesgoCV', 'kcal', 
      'muscular', 'edadMetabolica', 'rca', 'ninos',
      'musloD', 'brazoD', 'piernaD', 'abdomen', 'hombros', 'cintura',
      'musloI', 'brazoI', 'piernaI', 'cadera', 'pecho'
    ]
    
    valoracionInputs.forEach(inputId => {
      const input = document.getElementById(inputId) as HTMLInputElement
      if (input) {
        input.value = ''
      }
    })

    // Clear textareas
    const textareas = [
      'observaciones', 'observacionesFuncionales', 'comentario',
      'ejercicio-anterior-text', 'actividad-actual-text', 'sedentario-text', 'frecuencia-text',
      'cardiovascular-text', 'osteomuscular-text', 'metabolico-text', 'otros-text',
      'antecedentesMedicos-text', 'antecedentesFamiliares-text'
    ]
    
    textareas.forEach(textareaId => {
      const textarea = document.getElementById(textareaId) as HTMLTextAreaElement
      if (textarea) {
        textarea.value = ''
      }
    })

    // Clear checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]')
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = false
    })

    // Clear radio buttons
    const radioButtons = document.querySelectorAll('input[type="radio"]')
    radioButtons.forEach((radio: any) => {
      radio.checked = false
    })

    // Clear select elements
    const selects = document.querySelectorAll('select')
    selects.forEach((select: any) => {
      select.selectedIndex = 0
      select.value = ''
    })

    // Clear estados de selección exclusiva
    setTipoObesidad('')
    setTiposPeso('')
    setNivelEntrenamiento('')
    setSelectedEps('')
    setFrecuenciaSemanal('')
    
    // Clear factores de riesgo
    setFactoresRiesgoChecks({
      cardiovascular: false,
      osteomuscular: false,
      metabolico: false,
      otros: false,
      antecedentesMedicos: false,
      antecedentesFamiliares: false
    })
    
    // Clear cuestionario inicial
    setCuestionarioChecks({
      ejercicioAnterior: false,
      actividadActual: false,
      sedentario: false,
      frecuencia: false
    })
  }

  const handleSaveValoracion = () => {
    // Get form data
    const nombres = (document.getElementById('nombres') as HTMLInputElement)?.value?.trim() || ''
    const apellidos = (document.getElementById('apellidos') as HTMLInputElement)?.value?.trim() || ''
    
    if (!nombres || !apellidos) {
      toast.error("Por favor complete los campos obligatorios")
      return
    }

    // Función para capturar valores sin agregar defaults
    const getInputValue = (id: string) => {
      const element = document.getElementById(id) as HTMLInputElement
      return element?.value?.trim() || ""
    }

    const getTextareaValue = (id: string) => {
      const element = document.getElementById(id) as HTMLTextAreaElement
      return element?.value?.trim() || ""
    }

    // Capturar detalles SOLO si el checkbox está marcado, sino cadena vacía
    const cardiovascularDetalle = factoresRiesgoChecks.cardiovascular ? getTextareaValue('cardiovascular-text') : ""
    const osteomuscularDetalle = factoresRiesgoChecks.osteomuscular ? getTextareaValue('osteomuscular-text') : ""
    const metabolicoDetalle = factoresRiesgoChecks.metabolico ? getTextareaValue('metabolico-text') : ""
    const otrosDetalle = factoresRiesgoChecks.otros ? getTextareaValue('otros-text') : ""
    const antecedentesMedicosDetalle = factoresRiesgoChecks.antecedentesMedicos ? getTextareaValue('antecedentesMedicos-text') : ""
    const antecedentesFamiliaresDetalle = factoresRiesgoChecks.antecedentesFamiliares ? getTextareaValue('antecedentesFamiliares-text') : ""

    // Capturar detalles SOLO si el checkbox está marcado, sino cadena vacía
    const ejercicioAnteriorDetalle = cuestionarioChecks.ejercicioAnterior ? getTextareaValue('ejercicio-anterior-text') : ""
    const actividadActualDetalle = cuestionarioChecks.actividadActual ? getTextareaValue('actividad-actual-text') : ""
    const sedentarioDetalle = cuestionarioChecks.sedentario ? getTextareaValue('sedentario-text') : ""
    const frecuenciaDetalle = cuestionarioChecks.frecuencia ? getTextareaValue('frecuencia-text') : ""

    // Capturar EPS seleccionado
    const getSelectValue = (selector: string) => {
      const selectElement = document.querySelector(selector) as HTMLSelectElement
      return selectElement?.value?.trim() || ""
    }

    // Crear valoración con ÚNICAMENTE los datos ingresados (sin defaults)
    const newValoracionData = {
      usuario: `${nombres} ${apellidos}`,
      fecha: new Date().toISOString().split('T')[0],
      comentario: getTextareaValue('comentario') || "",
      documento: getInputValue('documento'),
      telefono: getInputValue('telefono'),
      email: getInputValue('email'),
      direccion: getInputValue('direccion'),
      eps: getInputValue('eps'),
      
      // Información del usuario
      nombres: nombres,
      apellidos: apellidos,
      ocupacion: getInputValue('ocupacion'),
      
      // Cuestionario inicial
      ejercicioAnterior: cuestionarioChecks.ejercicioAnterior,
      ejercicioAnteriorDetalle: ejercicioAnteriorDetalle,
      actividadActual: cuestionarioChecks.actividadActual,
      actividadActualDetalle: actividadActualDetalle,
      sedentario: cuestionarioChecks.sedentario,
      sedentarioDetalle: sedentarioDetalle,
      frecuencia: cuestionarioChecks.frecuencia,
      frecuenciaDetalle: frecuenciaDetalle,
      
      // Signos vitales
      fc: getInputValue('fc'),
      fr: getInputValue('fr'),
      ta: getInputValue('ta'),
      fcMax: getInputValue('horas-sueno'), // Este input tiene id 'horas-sueno' pero es FC/MAX
      
      // Factores de riesgo
      cardiovascular: factoresRiesgoChecks.cardiovascular,
      cardiovascularDetalle: cardiovascularDetalle,
      osteomuscular: factoresRiesgoChecks.osteomuscular,
      osteomuscularDetalle: osteomuscularDetalle,
      metabolico: factoresRiesgoChecks.metabolico,
      metabolicoDetalle: metabolicoDetalle,
      otros: factoresRiesgoChecks.otros,
      otrosDetalle: otrosDetalle,
      antecedentesMedicos: factoresRiesgoChecks.antecedentesMedicos,
      antecedentesMedicosDetalle: antecedentesMedicosDetalle,
      antecedentesFamiliares: factoresRiesgoChecks.antecedentesFamiliares,
      antecedentesFamiliaresDetalle: antecedentesFamiliaresDetalle,
      
      // Antropometría básica
      peso: getInputValue('peso'),
      talla: getInputValue('talla'),
      imc: getInputValue('imc'),
      resPeso: getInputValue('resPeso'),
      tiposPeso: tiposPeso,
      
      // Antropometría avanzada
      grasaCorporal: getInputValue('grasaCorporal'),
      grasaVisceral: getInputValue('grasaVisceral'),
      icc: getInputValue('icc'),
      riesgoCV: getInputValue('riesgoCV'),
      kcal: getInputValue('kcal'),
      muscular: getInputValue('muscular'),
      edadMetabolica: getInputValue('edadMetabolica'),
      tipoObesidad: tipoObesidad,
      rca: getInputValue('rca'),
      ninos: getInputValue('ninos'),
      
      // Mediciones físicas
      musloD: getInputValue('musloD'),
      brazoD: getInputValue('brazoD'),
      piernaD: getInputValue('piernaD'),
      abdomen: getInputValue('abdomen'),
      hombros: getInputValue('hombros'),
      cintura: getInputValue('cintura'),
      musloI: getInputValue('musloI'),
      brazoI: getInputValue('brazoI'),
      piernaI: getInputValue('piernaI'),
      cadera: getInputValue('cadera'),
      pecho: getInputValue('pecho'),
      
      // Entrenamiento
      nivelEntrenamiento: nivelEntrenamiento,
      frecuenciaSemanal: getSelectValue('select[name="frecuencia-semanal"]') || "",
      
      // Observaciones
      observaciones: getTextareaValue('observaciones'),
      observacionesFuncionales: getTextareaValue('observacionesFuncionales')
    }
    
    addValoracion(newValoracionData)
    
    // Clear form and show success
    clearForm()
    setSelectedUser(null) // También limpiar el usuario seleccionado
    toast.success("Valoración guardada exitosamente")
    setShowConfirmDialog(false)
  }

  const handleCreateUserClick = () => {
    // Validate required fields
    if (!userFormData.nombres || !userFormData.apellidos || !userFormData.email || 
        !userFormData.documento || !userFormData.tipoDocumento) {
      toast.error("Por favor complete los campos obligatorios")
      return
    }

    // Check if document already exists
    const existingUser = usuariosDB.find(user => user.documento === userFormData.documento)
    if (existingUser) {
      toast.error("Ya existe un cliente con este documento")
      return
    }

    // Mostrar diálogo de política de datos
    setShowPolicyDialog(true)
  }

  const handleSaveUser = () => {
    if (!acceptedPolicy) {
      toast.error("Debe aceptar la Política de Datos para crear el usuario")
      return
    }

    // Create new user
    const newUser = {
      id: usuariosDB.length + 1,
      ...userFormData,
      fechaCreacion: new Date().toISOString().split('T')[0]
    }
    
    usuariosDB.push(newUser)
    
    // Clear form and show success
    setUserFormData({
      nombres: '',
      apellidos: '',
      email: '',
      password: '',
      fechaNacimiento: '',
      tipoDocumento: '',
      documento: '',
      fechaExpedicion: '',
      direccion: '',
      eps: '',
      telefono: '',
      sexo: '',
      ocupacion: '',
      rol: ''
    })
    
    // Reset policy state
    setAcceptedPolicy(false)
    setShowPolicyDialog(false)
    setShowUserConfirmDialog(false)
    
    toast.success("Usuario creado exitosamente")
  }

  const handleUserFormChange = (field: string, value: string) => {
    setUserFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePasswordFormChange = (field: string, value: string) => {
    setPasswordFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePasswordChange = () => {
    if (!passwordFormData.currentPassword || !passwordFormData.newPassword || !passwordFormData.confirmPassword) {
      toast.error("Por favor complete todos los campos")
      return
    }

    if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
      toast.error("Las contraseñas no coinciden")
      return
    }

    if (passwordFormData.newPassword.length < 6) {
      toast.error("La nueva contraseña debe tener al menos 6 caracteres")
      return
    }

    // Simulate password change
    toast.success("Contraseña cambiada exitosamente")
    setPasswordFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    setShowPasswordDialog(false)
  }

  const handleRoleFormChange = (field: string, value: string | boolean) => {
    if (field.startsWith('permisos.')) {
      const permiso = field.split('.')[1]
      setRoleFormData(prev => ({
        ...prev,
        permisos: {
          ...prev.permisos,
          [permiso]: value as boolean
        }
      }))
    } else {
      setRoleFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleCreateRole = () => {
    if (!roleFormData.nombre.trim()) {
      toast.error("Por favor ingrese el nombre del rol")
      return
    }

    toast.success("Rol creado exitosamente")
    setRoleFormData({
      nombre: '',
      permisos: {
        crearUsuarios: false,
        eliminarUsuarios: false,
        crearEjercicios: false,
        eliminarEjercicios: false,
        editarEjercicios: false,
        crearValoracion: false
      }
    })
    setShowCreateRoleDialog(false)
  }

  const handleEditRole = () => {
    if (!roleFormData.nombre.trim()) {
      toast.error("Por favor ingrese el nombre del rol")
      return
    }

    toast.success("Rol editado exitosamente")
    setRoleFormData({
      nombre: '',
      permisos: {
        crearUsuarios: false,
        eliminarUsuarios: false,
        crearEjercicios: false,
        eliminarEjercicios: false,
        editarEjercicios: false,
        crearValoracion: false
      }
    })
    setShowEditRoleDialog(false)
  }

  const handleDeleteRole = () => {
    toast.success("Rol eliminado exitosamente")
    setShowDeleteRoleDialog(false)
  }

  const handleLogout = () => {
    toast.success("Sesión cerrada exitosamente")
    setShowLogoutDialog(false)
  }

  const handleViewUser = (user: any) => {
    if (onNavigateToUserProfile) {
      onNavigateToUserProfile(user.id)
    } else {
      // Fallback al modal si no hay función de navegación
      setSelectedUserForDetail(user)
      setShowUserDetailDialog(true)
    }
  }

  const handleEditValoracion = (valoracion: any) => {
    setCurrentValoracion({...valoracion})
    setIsEditingValoracion(true)
    setShowValoracionDialog(true)
  }

  const handleViewValoracion = (valoracion: any) => {
    if (onNavigateToValoracionDetail) {
      onNavigateToValoracionDetail(valoracion.id)
    } else {
      // Fallback al modal si no hay función de navegación
      setCurrentValoracion(valoracion)
      setIsEditingValoracion(false)
      setShowValoracionDialog(true)
    }
  }

  const handleSaveEditedValoracion = () => {
    if (currentValoracion) {
      updateValoracion(currentValoracion.id, currentValoracion)
    }
    setShowValoracionDialog(false)
    setCurrentValoracion(null)
    setIsEditingValoracion(false)
    toast.success("Valoración actualizada exitosamente")
  }

  const handleViewValoracionComplete = (valoracion: any) => {
    setCurrentValoracion(valoracion)
    setActiveSection('ver-valoracion-detalle')
  }

  const handleEditValoracionComplete = (valoracion: any) => {
    setCurrentValoracion(valoracion)
    setActiveSection('editar-valoracion-detalle')
  }

  const handleBackToValoracionList = () => {
    setActiveSection('ver-valoracion')
    setCurrentValoracion(null)
  }



  const handleSaveEditedValoracionComplete = () => {
    if (currentValoracion) {
      updateValoracion(currentValoracion.id, currentValoracion)
    }
    setActiveSection('ver-valoracion')
    setCurrentValoracion(null)
    toast.success("Valoración actualizada exitosamente")
  }





  const getFilteredUsersForValoracion = () => {
    if (!userSearchTerm) return usuariosDB.slice(0, 10) // Show first 10 users by default
    return usuariosDB.filter(user => 
      user.nombres.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      user.apellidos.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      user.documento.includes(userSearchTerm) ||
      `${user.nombres} ${user.apellidos}`.toLowerCase().includes(userSearchTerm.toLowerCase())
    )
  }

  const selectUserForValoracion = (user: any) => {
    setSelectedUser(user)
    setUserSearchTerm('')
    setShowUserList(false)
    
    // Auto-fill the form fields with user data
    const nombresField = document.getElementById('nombres') as HTMLInputElement
    const apellidosField = document.getElementById('apellidos') as HTMLInputElement
    const documentoField = document.getElementById('documento') as HTMLInputElement
    const telefonoField = document.getElementById('telefono') as HTMLInputElement
    const direccionField = document.getElementById('direccion') as HTMLInputElement
    const emailField = document.getElementById('email') as HTMLInputElement
    const ocupacionField = document.getElementById('ocupacion') as HTMLInputElement
    const epsField = document.getElementById('eps') as HTMLInputElement

    if (nombresField) nombresField.value = user.nombres
    if (apellidosField) apellidosField.value = user.apellidos
    if (documentoField) documentoField.value = user.documento
    if (telefonoField) telefonoField.value = user.telefono
    if (direccionField) direccionField.value = user.direccion
    if (emailField) emailField.value = user.email
    if (ocupacionField) ocupacionField.value = user.ocupacion
    if (epsField) epsField.value = user.eps
  }

  const getFilteredUsers = () => {
    // Si no hay término de búsqueda o tiene menos de 3 caracteres, no mostrar nada
    if (!searchTerm || searchTerm.trim().length < 3) {
      return []
    }
    return usuariosDB
      .filter(user => 
        user.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.documento.includes(searchTerm)
      )
  }

  const handleExerciseFormChange = (field: string, value: string) => {
    setExerciseFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validar tipo de archivo
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/avi', 'video/mov', 'video/wmv']
      if (!allowedTypes.includes(file.type)) {
        toast.error("Tipo de archivo no permitido. Use imágenes (JPG, PNG, GIF) o videos (MP4, AVI, MOV, WMV)")
        return
      }

      // Validar tamaño (máximo 50MB)
      const maxSize = 50 * 1024 * 1024 // 50MB
      if (file.size > maxSize) {
        toast.error("El archivo es demasiado grande. Máximo 50MB")
        return
      }

      setSelectedFile(file)
      
      // Crear preview para imágenes
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setFilePreview(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        // Para videos, crear un objeto URL
        const videoUrl = URL.createObjectURL(file)
        setFilePreview(videoUrl)
      }

      toast.success("Archivo seleccionado exitosamente")
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
    setFilePreview(null)
    // Limpiar el input file
    const fileInput = document.getElementById('file-upload') as HTMLInputElement
    if (fileInput) {
      fileInput.value = ''
    }
  }

  const handleDeleteExercise = (exerciseId: number, exerciseName: string) => {
    setDeleteExerciseDialog({
      isOpen: true,
      exerciseId,
      exerciseName
    })
  }

  const confirmDeleteExercise = () => {
    if (deleteExerciseDialog.exerciseId) {
      const index = ejerciciosDB.findIndex(ejercicio => ejercicio.id === deleteExerciseDialog.exerciseId)
      if (index !== -1) {
        ejerciciosDB.splice(index, 1)
        toast.success(`Ejercicio "${deleteExerciseDialog.exerciseName}" eliminado exitosamente`)
      }
    }
    setDeleteExerciseDialog({ isOpen: false, exerciseId: null, exerciseName: '' })
  }

  const cancelDeleteExercise = () => {
    setDeleteExerciseDialog({ isOpen: false, exerciseId: null, exerciseName: '' })
  }

  const handleExportValoracion = () => {
    setShowExportDialog(true)
    setExportSearchTerm('')
    setExportedValoracion(null)
  }

  const searchValoracionForExport = () => {
    if (!exportSearchTerm.trim()) {
      toast.error("Por favor ingrese un término de búsqueda")
      return
    }

    // Búsqueda principal por nombre de usuario
    const found = valoraciones.find(valoracion =>
      valoracion.usuario.toLowerCase().includes(exportSearchTerm.toLowerCase())
    )

    if (found) {
      setExportedValoracion(found)
      toast.success("Valoración encontrada")
    } else {
      setExportedValoracion(null)
      toast.error("No se encontró ninguna valoración para ese usuario")
    }
  }

  const handleExportValoracionDirect = (valoracion: any) => {
    setExportedValoracion(valoracion)
    setExportSearchTerm('')
    setShowExportDialog(true)
  }

  const closeExportDialog = () => {
    setShowExportDialog(false)
    setExportSearchTerm('')
    setExportedValoracion(null)
  }

  const handleEditExercise = (exercise: any) => {
    setEditingExercise(exercise)
    setEditFormData({
      nombre: exercise.nombre,
      descripcion: exercise.descripcion,
      categoria: exercise.categoria,
      dificultad: exercise.dificultad
    })
    
    // Si tiene archivo de ejemplo, configurar el preview
    if (exercise.archivoEjemplo) {
      setEditFilePreview(exercise.archivoEjemplo.url)
    } else {
      setEditFilePreview(null)
    }
    setEditSelectedFile(null)
  }

  const handleEditFormChange = (field: string, value: string) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleEditFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validar tipo de archivo
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/avi', 'video/mov', 'video/wmv']
      if (!allowedTypes.includes(file.type)) {
        toast.error("Tipo de archivo no permitido. Use imágenes (JPG, PNG, GIF) o videos (MP4, AVI, MOV, WMV)")
        return
      }

      // Validar tamaño (máximo 50MB)
      const maxSize = 50 * 1024 * 1024 // 50MB
      if (file.size > maxSize) {
        toast.error("El archivo es demasiado grande. Máximo 50MB")
        return
      }

      setEditSelectedFile(file)
      
      // Crear preview para imágenes
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setEditFilePreview(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        // Para videos, crear un objeto URL
        const videoUrl = URL.createObjectURL(file)
        setEditFilePreview(videoUrl)
      }

      toast.success("Nuevo archivo seleccionado")
    }
  }

  const removeEditFile = () => {
    setEditSelectedFile(null)
    // Si había un archivo original, volver a mostrar ese
    if (editingExercise?.archivoEjemplo) {
      setEditFilePreview(editingExercise.archivoEjemplo.url)
    } else {
      setEditFilePreview(null)
    }
    // Limpiar el input file
    const fileInput = document.getElementById('edit-file-upload') as HTMLInputElement
    if (fileInput) {
      fileInput.value = ''
    }
  }

  const handleSaveEditExercise = () => {
    // Validar campos requeridos
    if (!editFormData.nombre || !editFormData.descripcion) {
      toast.error("Por favor complete todos los campos obligatorios")
      return
    }

    // Encontrar el ejercicio en la base de datos
    const index = ejerciciosDB.findIndex(ejercicio => ejercicio.id === editingExercise.id)
    if (index !== -1) {
      // Actualizar el ejercicio
      ejerciciosDB[index] = {
        ...ejerciciosDB[index],
        ...editFormData,
        // Solo actualizar el archivo si se seleccionó uno nuevo
        ...(editSelectedFile && {
          archivoEjemplo: {
            nombre: editSelectedFile.name,
            tipo: editSelectedFile.type,
            tamaño: editSelectedFile.size,
            url: editFilePreview,
            esVideo: editSelectedFile.type.startsWith('video/')
          }
        })
      }
      
      toast.success("Ejercicio actualizado exitosamente")
      setEditingExercise(null)
      setEditSelectedFile(null)
      setEditFilePreview(null)
    }
  }

  const cancelEdit = () => {
    setEditingExercise(null)
    setEditSelectedFile(null)
    setEditFilePreview(null)
  }

  const handleSaveExercise = () => {
    // Validate required fields
    if (!exerciseFormData.nombre || !exerciseFormData.descripcion || !selectedFile) {
      toast.error("Por favor complete todos los campos obligatorios (nombre, descripción y archivo de ejemplo)")
      return
    }

    // Create new exercise
    const newExercise = {
      id: ejerciciosDB.length + 1,
      ...exerciseFormData,
      fechaCreacion: new Date().toISOString().split('T')[0],
      // Información del archivo
      archivoEjemplo: {
        nombre: selectedFile.name,
        tipo: selectedFile.type,
        tamaño: selectedFile.size,
        url: filePreview, // En una app real esto sería una URL del servidor
        esVideo: selectedFile.type.startsWith('video/')
      }
    }
    
    ejerciciosDB.push(newExercise)
    
    // Clear form and show success
    setExerciseFormData({
      nombre: '',
      descripcion: '',
      ejemplo: '',
      categoria: '',
      dificultad: ''
    })
    setSelectedFile(null)
    setFilePreview(null)
    
    // Limpiar el input file
    const fileInput = document.getElementById('file-upload') as HTMLInputElement
    if (fileInput) {
      fileInput.value = ''
    }
    
    toast.success("Ejercicio creado exitosamente")
    setShowExerciseConfirmDialog(false)
  }

  const getPageTitle = (section: string) => {
    const pageMap: { [key: string]: string } = {
      'crear-cliente': 'Crear Cliente',
      'ver-clientes': 'Ver Clientes', 
      'crear-valoracion': 'Crear Valoración',
      'ver-valoracion': 'Ver Valoraciones',
      'ver-valoracion-detalle': 'Ver Valoración Completa',
      'editar-valoracion-detalle': 'Editar Valoración',
      'editar-valoracion': 'Editar Valoración',
      'crear-ejercicios': 'Crear Ejercicios',
      'ver-ejercicios': 'Ver Ejercicios',
      'calendario': 'Calendario de Valoraciones',
      'configuracion': 'Configuración',
      'politica-datos': 'Política de Tratamiento de Datos',
      'perfil': 'Perfil'
    }
    return pageMap[section] || 'Panel de Administración'
  }

  const renderContent = () => {
    switch (internalActiveSection) {
      case 'crear-cliente':
        return (
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">{getPageTitle(activeSection)}</h1>
            </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Crear Nuevo Cliente
              </CardTitle>
              <CardDescription>
                Completa la información para crear un nuevo cliente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Información Personal */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="user-rol">Rol en el Sistema</Label>
                  <Select value={userFormData.rol} onValueChange={(value) => handleUserFormChange('rol', value)}>
                    <SelectTrigger id="user-rol">
                      <SelectValue placeholder="Seleccionar rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Usuario">Usuario</SelectItem>
                      <SelectItem value="Entrenador">Entrenador</SelectItem>
                      <SelectItem value="Administrador">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <h3 className="text-lg font-semibold">Información Personal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-nombres">Nombres *</Label>
                    <Input 
                      id="user-nombres" 
                      placeholder="Ingresa los nombres" 
                      value={userFormData.nombres}
                      onChange={(e) => handleUserFormChange('nombres', e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-apellidos">Apellidos *</Label>
                    <Input 
                      id="user-apellidos" 
                      placeholder="Ingresa los apellidos" 
                      value={userFormData.apellidos}
                      onChange={(e) => handleUserFormChange('apellidos', e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-email">Correo Electrónico *</Label>
                    <Input 
                      id="user-email" 
                      type="email" 
                      placeholder="correo@ejemplo.com" 
                      value={userFormData.email}
                      onChange={(e) => handleUserFormChange('email', e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-password">Contraseña *</Label>
                    <Input 
                      id="user-password" 
                      type="password" 
                      placeholder="Contraseña segura" 
                      value={userFormData.password}
                      onChange={(e) => handleUserFormChange('password', e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-fecha-nacimiento">Fecha de Nacimiento</Label>
                    <Input 
                      id="user-fecha-nacimiento" 
                      type="date" 
                      value={userFormData.fechaNacimiento}
                      onChange={(e) => handleUserFormChange('fechaNacimiento', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-sexo">Sexo</Label>
                    <Select value={userFormData.sexo} onValueChange={(value) => handleUserFormChange('sexo', value)}>
                      <SelectTrigger id="user-sexo">
                        <SelectValue placeholder="Seleccionar sexo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Masculino">Masculino</SelectItem>
                        <SelectItem value="Femenino">Femenino</SelectItem>
                        <SelectItem value="Otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Documentación */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Documentación</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-tipo-documento">Tipo de Documento *</Label>
                    <Select value={userFormData.tipoDocumento} onValueChange={(value) => handleUserFormChange('tipoDocumento', value)}>
                      <SelectTrigger id="user-tipo-documento">
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="RC">RC - Registro Civil</SelectItem>
                        <SelectItem value="T.I">T.I - Tarjeta de Identidad</SelectItem>
                        <SelectItem value="CC">CC - Cédula de Ciudadanía</SelectItem>
                        <SelectItem value="CE">CE - Cédula de Extranjería</SelectItem>
                        <SelectItem value="Pasaporte">Pasaporte</SelectItem>
                        <SelectItem value="NIT">NIT - Número de Identificación Tributaria</SelectItem>
                        <SelectItem value="PPT">PPT - Permiso por Protección Temporal</SelectItem>
                        <SelectItem value="Salvoconducto">Salvoconducto de Permanencia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-documento">Documento de Identidad *</Label>
                    <Input 
                      id="user-documento" 
                      placeholder="Número de documento" 
                      value={userFormData.documento}
                      onChange={(e) => handleUserFormChange('documento', e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-fecha-expedicion">Fecha de Expedición</Label>
                    <Input 
                      id="user-fecha-expedicion" 
                      type="date" 
                      value={userFormData.fechaExpedicion}
                      onChange={(e) => handleUserFormChange('fechaExpedicion', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Información de Contacto */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Información de Contacto</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-direccion">Dirección</Label>
                    <Input 
                      id="user-direccion" 
                      placeholder="Dirección de residencia" 
                      value={userFormData.direccion}
                      onChange={(e) => handleUserFormChange('direccion', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-telefono">Teléfono</Label>
                    <Input 
                      id="user-telefono" 
                      placeholder="Número de teléfono" 
                      value={userFormData.telefono}
                      onChange={(e) => handleUserFormChange('telefono', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Información Adicional */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Información Adicional</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-eps">EPS</Label>
                    <EPSCombobox
                      value={userFormData.eps}
                      onChange={(value) => handleUserFormChange('eps', value)}
                      placeholder="Buscar o seleccionar EPS..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-ocupacion">Ocupación</Label>
                    <Input 
                      id="user-ocupacion" 
                      placeholder="Profesión u ocupación" 
                      value={userFormData.ocupacion}
                      onChange={(e) => handleUserFormChange('ocupacion', e.target.value)}
                    />
                  </div>
                  
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-4 pt-6">
                <Button 
                  className="bg-green-700 hover:bg-green-800"
                  onClick={handleCreateUserClick}
                >
                  Crear Usuario
                </Button>
                <Button variant="outline" onClick={() => setUserFormData({
                  nombres: '',
                  apellidos: '',
                  email: '',
                  password: '',
                  fechaNacimiento: '',
                  tipoDocumento: '',
                  documento: '',
                  fechaExpedicion: '',
                  direccion: '',
                  eps: '',
                  telefono: '',
                  sexo: '',
                  ocupacion: '',
                  rol: ''
                })}>
                  Limpiar Campos
                </Button>
              </div>
            </CardContent>
          </Card>
          </div>
        )

      case 'ver-clientes':
        return (
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">{getPageTitle(activeSection)}</h1>
            </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Ver Clientes
              </CardTitle>
              <CardDescription>
                Lista de clientes registrados (mostrando los 10 más recientes)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Buscador */}
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Buscar por nombre o número de documento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre Completo</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Tipo Doc.</TableHead>
                    <TableHead>Documento</TableHead>
                    <TableHead>Género</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getFilteredUsers().map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{`${user.nombres} ${user.apellidos}`}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.tipoDocumento}</Badge>
                      </TableCell>
                      <TableCell>{user.documento}</TableCell>
                      <TableCell>{user.sexo}</TableCell>
                      <TableCell>
                        <Badge variant={user.rol === 'Administrador' ? 'default' : 'secondary'}>
                          {user.rol}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewUser(user)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Ver
                          </Button>
                          {onNavigateToEditUser && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => onNavigateToEditUser(user.id)}
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Editar
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {getFilteredUsers().length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground py-6">
                        {!searchTerm || searchTerm.trim().length < 3
                          ? "Ingrese al menos 3 caracteres para buscar (ID/nombre)"
                          : "No se encontraron clientes"}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Modal de vista detallada del usuario */}
          <Dialog open={showUserDetailDialog} onOpenChange={setShowUserDetailDialog}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Perfil de Usuario
                </DialogTitle>
                <DialogDescription>
                  Información detallada y estadísticas del usuario seleccionado
                </DialogDescription>
              </DialogHeader>
              
              {selectedUserForDetail && (
                <div className="space-y-6">
                  {/* Información Personal */}
                  <div>
                    <div className="bg-green-700 text-white p-3 rounded-t-lg">
                      <h3 className="text-lg font-semibold">Información Personal</h3>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-b-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                          <p className="mt-1 text-sm text-gray-900">{selectedUserForDetail.nombres} {selectedUserForDetail.apellidos}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Email</label>
                          <p className="mt-1 text-sm text-gray-900">{selectedUserForDetail.email}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                          <p className="mt-1 text-sm text-gray-900">{selectedUserForDetail.telefono}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Documento</label>
                          <p className="mt-1 text-sm text-gray-900">{selectedUserForDetail.tipoDocumento}: {selectedUserForDetail.documento}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                          <p className="mt-1 text-sm text-gray-900">{selectedUserForDetail.fechaNacimiento}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Género</label>
                          <p className="mt-1 text-sm text-gray-900">{selectedUserForDetail.sexo}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Ocupación</label>
                          <p className="mt-1 text-sm text-gray-900">{selectedUserForDetail.ocupacion}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">EPS</label>
                          <p className="mt-1 text-sm text-gray-900">{selectedUserForDetail.eps}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Rol</label>
                          <Badge variant={selectedUserForDetail.rol === 'Administrador' ? 'default' : 'secondary'}>
                            {selectedUserForDetail.rol}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Valoraciones del Usuario */}
                  <div>
                    <div className="bg-green-700 text-white p-3 rounded-t-lg">
                      <h3 className="text-lg font-semibold">Valoraciones</h3>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-b-lg p-4">
                      {(() => {
                        const userValoraciones = valoracionesDB.filter(val => 
                          val.usuario.toLowerCase().includes(selectedUserForDetail.nombres.toLowerCase()) ||
                          val.usuario.toLowerCase().includes(selectedUserForDetail.apellidos.toLowerCase()) ||
                          val.usuario.toLowerCase().includes(`${selectedUserForDetail.nombres} ${selectedUserForDetail.apellidos}`.toLowerCase())
                        )
                        
                        if (userValoraciones.length === 0) {
                          return (
                            <div className="text-center py-8">
                              <ClipboardList className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                              <p className="text-gray-500">No se encontraron valoraciones para este usuario</p>
                            </div>
                          )
                        }

                        return (
                          <div className="space-y-3">
                            {userValoraciones.map((val, index) => (
                              <div key={val.id} className="border border-gray-200 rounded-lg p-3">
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Badge variant="outline">Valoración #{index + 1}</Badge>
                                      <span className="text-sm text-gray-500">{val.fecha}</span>
                                    </div>
                                    <p className="text-sm text-gray-700">{val.comentario}</p>
                                  </div>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleViewValoracion(val)}
                                  >
                                    Ver Detalle
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )
                      })()}
                    </div>
                  </div>

                  {/* Estadísticas del Usuario */}
                  <div>
                    <div className="bg-green-700 text-white p-3 rounded-t-lg">
                      <h3 className="text-lg font-semibold">Estadísticas</h3>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-b-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="bg-blue-50 rounded-lg p-4">
                            <h4 className="text-lg font-semibold text-blue-700">Total Valoraciones</h4>
                            <p className="text-3xl font-bold text-blue-600">
                              {valoracionesDB.filter(val => 
                                val.usuario.toLowerCase().includes(selectedUserForDetail.nombres.toLowerCase()) ||
                                val.usuario.toLowerCase().includes(`${selectedUserForDetail.nombres} ${selectedUserForDetail.apellidos}`.toLowerCase())
                              ).length}
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="bg-green-50 rounded-lg p-4">
                            <h4 className="text-lg font-semibold text-green-700">Miembro desde</h4>
                            <p className="text-lg font-medium text-green-600">
                              {selectedUserForDetail.fechaCreacion}
                            </p>
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="bg-purple-50 rounded-lg p-4">
                            <h4 className="text-lg font-semibold text-purple-700">Progreso de Peso</h4>
                            <div className="space-y-2">
                              <p className="text-sm text-purple-600">Peso inicial: 75 kg</p>
                              <p className="text-sm text-purple-600">Peso actual: 72 kg</p>
                              <p className="text-lg font-bold text-purple-600">-3 kg</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Gráfico de progreso simulado */}
                      <div className="mt-6">
                        <h4 className="text-md font-semibold text-gray-700 mb-3">Evolución de Peso (Últimas 6 valoraciones)</h4>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={[
                              { fecha: 'Ene', peso: 75 },
                              { fecha: 'Feb', peso: 74.5 },
                              { fecha: 'Mar', peso: 74 },
                              { fecha: 'Abr', peso: 73.5 },
                              { fecha: 'May', peso: 73 },
                              { fecha: 'Jun', peso: 72 }
                            ]}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="fecha" />
                              <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                              <Tooltip />
                              <Bar dataKey="peso" fill="#059669" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Botón de cerrar */}
                  <div className="flex justify-end pt-4 border-t">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setShowUserDetailDialog(false)
                        setSelectedUserForDetail(null)
                      }}
                    >
                      Cerrar
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
          </div>
        )

      //CREAR VALORACION

      case 'crear-valoracion':
        return (
          <div className="p-6 bg-gray-50 min-h-full">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">{getPageTitle(activeSection)}</h1>
            </div>
            <div className="bg-white rounded-lg shadow-sm space-y-6 p-6">

              {/* Información Personal */}
              <div>
                <div className="bg-green-700 text-white p-3 rounded-t-lg">
                  <h2 className="text-lg">Información personal</h2>
                </div>
                <div className="bg-white border border-gray-200 rounded-b-lg p-4">
                    <div style={{margin:"15px"}} className="space-y-2">
                      <div className="space-y-2">
                        <Label className="mb-4 text-blue-600" htmlFor="user-search">Seleccionar Cliente:</Label>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Search className="text-green-700" />
                            <Input
                              id="user-search"
                              placeholder="Buscar cliente por nombre o documento..."
                              value={userSearchTerm}
                              onChange={(e) => {
                                setUserSearchTerm(e.target.value)
                                setShowUserList(e.target.value.length > 0)
                              }}
                              onFocus={() => setShowUserList(true)}
                              onBlur={() => {
                                // Delay hiding to allow click on items
                                setTimeout(() => setShowUserList(false), 200)
                              }}
                            />
                          </div>
                          
                          {/* Selected user display */}
                          {selectedUser && !showUserList && (
                            <div className="flex items-center justify-between border rounded-lg p-3 bg-blue-50 border-blue-200">
                              <div>
                                <span className="font-medium">{selectedUser.nombres} {selectedUser.apellidos}</span>
                                <Badge variant="outline" className="ml-2">{selectedUser.tipoDocumento}: {selectedUser.documento}</Badge>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  setSelectedUser(null)
                                  setUserSearchTerm('')
                                }}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                          
                          {/* User list dropdown */}
                          {showUserList && (
                            <div className="border rounded-lg p-2 bg-white shadow-lg max-h-60 overflow-y-auto">
                              {getFilteredUsersForValoracion().map((user) => (
                                <div
                                  key={user.id}
                                  className="flex items-center justify-between p-3 hover:bg-gray-100 rounded cursor-pointer"
                                  onClick={() => selectUserForValoracion(user)}
                                >
                                  <div>
                                    <div className="font-medium">{user.nombres} {user.apellidos}</div>
                                    <div className="text-sm text-gray-600">{user.tipoDocumento}: {user.documento}</div>
                                    <div className="text-xs text-gray-500">{user.email}</div>
                                  </div>
                                  <Plus className="w-4 h-4 text-green-600" />
                                </div>
                              ))}
                              {getFilteredUsersForValoracion().length === 0 && (
                                <div className="text-center text-gray-500 py-4">
                                  No se encontraron clientes
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="mb-4" htmlFor="nombres">Nombres</Label>
                      <Input 
                        id="nombres" 
                        placeholder="Ingrese nombres" 
                        disabled={selectedUser !== null}
                        className={selectedUser ? "bg-gray-100" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="mb-4" htmlFor="apellidos">Apellidos</Label>
                      <Input 
                        id="apellidos" 
                        placeholder="Ingrese apellidos" 
                        disabled={selectedUser !== null}
                        className={selectedUser ? "bg-gray-100" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="mb-4" htmlFor="documento">Documento</Label>
                      <Input 
                        id="documento" 
                        placeholder="Número de documento" 
                        disabled={selectedUser !== null}
                        className={selectedUser ? "bg-gray-100" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="mb-4" htmlFor="telefono">Teléfono</Label>
                      <Input 
                        id="telefono" 
                        placeholder="Número de teléfono" 
                        disabled={selectedUser !== null}
                        className={selectedUser ? "bg-gray-100" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="mb-4" htmlFor="direccion">Dirección</Label>
                      <Input 
                        id="direccion" 
                        placeholder="Dirección" 
                        disabled={selectedUser !== null}
                        className={selectedUser ? "bg-gray-100" : ""}
                      />
                    </div>
                   <div className="space-y-2">
                      <Label className="mb-4" htmlFor="email">E-mail</Label>
                      <Input 
                        id="email" 
                        placeholder="E-mail" 
                        disabled={selectedUser !== null}
                        className={selectedUser ? "bg-gray-100" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="mb-4" htmlFor="ocupacion">Ocupación</Label>
                      <Input 
                        id="ocupacion" 
                        placeholder="Ocupación" 
                        disabled={selectedUser !== null}
                        className={selectedUser ? "bg-gray-100" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="mb-4" htmlFor="eps">EPS</Label>
                      <EPSCombobox
                        value={selectedEps}
                        onChange={(value) => {
                          setSelectedEps(value)
                          const input = document.getElementById('eps') as HTMLInputElement
                          if (input) input.value = value
                        }}
                        disabled={selectedUser !== null}
                        placeholder="Buscar o seleccionar EPS..."
                        className={selectedUser ? "bg-gray-100" : ""}
                      />
                      <input type="hidden" id="eps" value={selectedEps} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Antecedentes médicos */}
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
                          checked={cuestionarioChecks.ejercicioAnterior}
                          onCheckedChange={(checked) => setCuestionarioChecks(prev => ({...prev, ejercicioAnterior: !!checked}))}
                        />
                        <Label htmlFor="ejercicio-anterior" className="font-medium">Ha realizado ejercicio en un gimnasio anteriormente?</Label>
                      </div>
                      <Textarea 
                        id="ejercicio-anterior-text" 
                        rows={3} 
                        placeholder="Ingrese detalles..."
                        disabled={!cuestionarioChecks.ejercicioAnterior}
                        className={!cuestionarioChecks.ejercicioAnterior ? "bg-gray-100" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 mb-2">
                        <Checkbox 
                          id="actividad-actual"
                          checked={cuestionarioChecks.actividadActual}
                          onCheckedChange={(checked) => setCuestionarioChecks(prev => ({...prev, actividadActual: !!checked}))}
                        />
                        <Label htmlFor="actividad-actual" className="font-medium">Actualmente realiza alguna actividad física?</Label>
                      </div>
                      <Textarea 
                        id="actividad-actual-text" 
                        rows={3} 
                        placeholder="Ingrese detalles..."
                        disabled={!cuestionarioChecks.actividadActual}
                        className={!cuestionarioChecks.actividadActual ? "bg-gray-100" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 mb-2">
                        <Checkbox 
                          id="sedentario"
                          checked={cuestionarioChecks.sedentario}
                          onCheckedChange={(checked) => setCuestionarioChecks(prev => ({...prev, sedentario: !!checked}))}
                        />
                        <Label htmlFor="sedentario" className="font-medium">Sedentario?</Label>
                      </div>
                      <Textarea 
                        id="sedentario-text" 
                        rows={3} 
                        placeholder="Ingrese detalles..."
                        disabled={!cuestionarioChecks.sedentario}
                        className={!cuestionarioChecks.sedentario ? "bg-gray-100" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 mb-2">
                        <Checkbox 
                          id="frecuencia"
                          checked={cuestionarioChecks.frecuencia}
                          onCheckedChange={(checked) => setCuestionarioChecks(prev => ({...prev, frecuencia: !!checked}))}
                        />
                        <Label htmlFor="frecuencia" className="font-medium">Frecuencia</Label>
                      </div>
                      <Textarea 
                        id="frecuencia-text" 
                        rows={3} 
                        placeholder="Ingrese detalles..."
                        disabled={!cuestionarioChecks.frecuencia}
                        className={!cuestionarioChecks.frecuencia ? "bg-gray-100" : ""}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Estilo de vida */}
              <div>
                <div className="bg-green-700 text-white p-3 rounded-t-lg">
                  <h2 className="text-lg">Signos vitales</h2>
                </div>
                <div className="bg-white border border-gray-200 rounded-b-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

              <div className="space-y-2">
                      <Label className="mb-4" htmlFor="horas-sueno">FC</Label>
                      <Input id="horas-sueno" type="number"  />
                    </div>

                    <div className="space-y-2">
                      <Label className="mb-4" htmlFor="horas-sueno">FR</Label>
                      <Input id="horas-sueno" type="number"  />
                    </div>

                      <div className="space-y-2">
                      <Label className="mb-4" htmlFor="horas-sueno">T/A</Label>
                      <Input id="horas-sueno" type="number"  />
                    </div>

                    <div className="space-y-2">
                      <Label className="mb-4" htmlFor="horas-sueno">FC/MAX</Label>
                      <Input id="horas-sueno" type="number"  />
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
      {/* Columna izquierda */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Checkbox 
              id="cardiovascular" 
              checked={factoresRiesgoChecks.cardiovascular}
              onCheckedChange={(checked) => setFactoresRiesgoChecks(prev => ({...prev, cardiovascular: !!checked}))}
            />
            <Label htmlFor="cardiovascular" className="font-semibold">Cardiovascular</Label>
          </div>
          <Textarea 
            id="cardiovascular-text"
            placeholder="Observaciones..." 
            rows={3} 
            disabled={!factoresRiesgoChecks.cardiovascular}
            className={!factoresRiesgoChecks.cardiovascular ? "bg-gray-100" : ""}
          />
        </div>
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Checkbox 
              id="osteomuscular" 
              checked={factoresRiesgoChecks.osteomuscular}
              onCheckedChange={(checked) => setFactoresRiesgoChecks(prev => ({...prev, osteomuscular: !!checked}))}
            />
            <Label htmlFor="osteomuscular" className="font-semibold">Osteomuscular</Label>
          </div>
          <Textarea 
            id="osteomuscular-text"
            placeholder="Observaciones..." 
            rows={3} 
            disabled={!factoresRiesgoChecks.osteomuscular}
            className={!factoresRiesgoChecks.osteomuscular ? "bg-gray-100" : ""}
          />
        </div>
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Checkbox 
              id="metabolico" 
              checked={factoresRiesgoChecks.metabolico}
              onCheckedChange={(checked) => setFactoresRiesgoChecks(prev => ({...prev, metabolico: !!checked}))}
            />
            <Label htmlFor="metabolico" className="font-semibold">Metabólico</Label>
          </div>
          <Textarea 
            id="metabolico-text"
            placeholder="Observaciones..." 
            rows={3} 
            disabled={!factoresRiesgoChecks.metabolico}
            className={!factoresRiesgoChecks.metabolico ? "bg-gray-100" : ""}
          />
        </div>
      </div>

      {/* Columna derecha */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Checkbox 
              id="otros" 
              checked={factoresRiesgoChecks.otros}
              onCheckedChange={(checked) => setFactoresRiesgoChecks(prev => ({...prev, otros: !!checked}))}
            />
            <Label htmlFor="otros" className="font-semibold">Otros</Label>
          </div>
          <Textarea 
            id="otros-text"
            placeholder="Observaciones..." 
            rows={3} 
            disabled={!factoresRiesgoChecks.otros}
            className={!factoresRiesgoChecks.otros ? "bg-gray-100" : ""}
          />
        </div>
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Checkbox 
              id="antecedentesMedicos" 
              checked={factoresRiesgoChecks.antecedentesMedicos}
              onCheckedChange={(checked) => setFactoresRiesgoChecks(prev => ({...prev, antecedentesMedicos: !!checked}))}
            />
            <Label htmlFor="antecedentesMedicos" className="font-semibold">Antecedentes Médicos</Label>
          </div>
          <Textarea 
            id="antecedentesMedicos-text"
            placeholder="Observaciones..." 
            rows={3} 
            disabled={!factoresRiesgoChecks.antecedentesMedicos}
            className={!factoresRiesgoChecks.antecedentesMedicos ? "bg-gray-100" : ""}
          />
        </div>
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Checkbox 
              id="antecedentesFamiliares" 
              checked={factoresRiesgoChecks.antecedentesFamiliares}
              onCheckedChange={(checked) => setFactoresRiesgoChecks(prev => ({...prev, antecedentesFamiliares: !!checked}))}
            />
            <Label htmlFor="antecedentesFamiliares" className="font-semibold">Antecedentes Familiares</Label>
          </div>
          <Textarea 
            id="antecedentesFamiliares-text"
            placeholder="Observaciones..." 
            rows={3} 
            disabled={!factoresRiesgoChecks.antecedentesFamiliares}
            className={!factoresRiesgoChecks.antecedentesFamiliares ? "bg-gray-100" : ""}
          />
        </div>
      </div>
    </div>
  </div>
</div>

<div>
  <div className="bg-green-700 text-white p-3 rounded-t-lg">
    <h2 className="text-lg">Antropometría</h2>
  </div>
  <div className="bg-white border border-gray-200 rounded-b-lg p-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Columna 1 */}
      <div className="space-y-3">
        <div>
          <Label className="mb-4" htmlFor="peso">Peso</Label>
          <Input id="peso" />
        </div>
        <div>
          <Label className="mb-4" htmlFor="talla">Talla</Label>
          <Input id="talla" />
        </div>
        <div>
          <Label className="mb-4" htmlFor="imc">IMC</Label>
          <Input id="imc" />
        </div>
        <div>
          <Label className="mb-4" htmlFor="resPeso">Res. Peso</Label>
          <Input id="resPeso" />
        </div>

        {/* Tipo de peso - selección exclusiva */}
        <div>
          <Label className="mb-2 block">Tipo de peso</Label>
          <RadioGroup value={tiposPeso} onValueChange={setTiposPeso}>
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
          <Label className="mb-4" htmlFor="grasaCorporal">Grasa Corporal</Label>
          <Input id="grasaCorporal" />
        </div>
        <div>
          <Label className="mb-4" htmlFor="grasaVisceral">Grasa Visceral</Label>
          <Input id="grasaVisceral" />
        </div>
        <div>
          <Label className="mb-4" htmlFor="icc">ICC</Label>
          <Input id="icc" />
        </div>
        <div>
          <Label className="mb-4" htmlFor="riesgoCV">Riesgo Cardiovascular</Label>
          <Input id="riesgoCV" />
        </div>
        <div>
          <Label className="mb-4" htmlFor="kcal">Kcal</Label>
          <Input id="kcal" />
        </div>
        <div>
          <Label className="mb-4" htmlFor="muscular">% Muscular</Label>
          <Input id="muscular" />
        </div>
        <div>
          <Label className="mb-4" htmlFor="edadMetabolica">Edad Metabólica</Label>
          <Input id="edadMetabolica" />
        </div>
      </div>

      {/* Columna 3 */}
      <div className="space-y-3">
        <div>
          <Label className="mb-2 block">Tipo de Obesidad</Label>
          <RadioGroup value={tipoObesidad} onValueChange={setTipoObesidad}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ginoide" id="ginoide" />
              <Label htmlFor="ginoide">Ginoide</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="androide" id="androide" />
              <Label htmlFor="androide">Androide</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <Label className="mb-4" htmlFor="rca">RCA</Label>
          <Input id="rca" />
        </div>
        <div>
          <Label className="mb-4" htmlFor="ninos">*Niños</Label>
          <Input id="ninos" />
        </div>
      </div>
    </div>
  </div>
</div>

{/* Mediciones físicas */}
<div>
  <div className="bg-green-700 text-white p-3 rounded-t-lg w-full">
    <h2 className="text-lg">Mediciones físicas</h2>
  </div>
  <div className="bg-white border border-gray-200 rounded-b-lg p-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Columna izquierda */}
      <div className="space-y-3">
        <div>
          <Label className="mb-4" htmlFor="musloD">Muslo D</Label>
          <Input id="musloD" />
        </div>
        <div>
          <Label className="mb-4" htmlFor="brazoD">Brazo D</Label>
          <Input id="brazoD" />
        </div>
        <div>
          <Label className="mb-4" htmlFor="piernaD">Pierna D</Label>
          <Input id="piernaD" />
        </div>
        <div>
          <Label className="mb-4" htmlFor="abdomen">Abdomen</Label>
          <Input id="abdomen" />
        </div>
        <div>
          <Label className="mb-4" htmlFor="hombros">Hombros</Label>
          <Input id="hombros" />
        </div>
        <div>
          <Label className="mb-4" htmlFor="cintura">Cintura</Label>
          <Input id="cintura" />
        </div>
      </div>

      {/* Columna derecha */}
      <div className="space-y-3">
        <div>
          <Label className="mb-4" htmlFor="musloI">Muslo I</Label>
          <Input id="musloI" />
        </div>
        <div>
          <Label className="mb-4" htmlFor="brazoI">Brazo I</Label>
          <Input id="brazoI" />
        </div>
        <div>
          <Label className="mb-4" htmlFor="piernaI">Pierna I</Label>
          <Input id="piernaI" />
        </div>
        <div>
          <Label className="mb-4" htmlFor="cadera">Cadera</Label>
          <Input id="cadera" />
        </div>
        <div>
          <Label className="mb-4" htmlFor="pecho">Pecho</Label>
          <Input id="pecho" />
        </div>
      </div>
    </div>
  </div>
</div>

              <div>
  <div className="bg-green-700 text-white p-3 rounded-t-lg">
    <h2 className="text-lg">Entrenamiento</h2>
  </div>
  <div className="bg-white border border-gray-200 rounded-b-lg p-4">
    {/* Nivel entrenamiento */}
    <h3 className="text-center text-green-800 font-semibold mb-4">Nivel Entrenamiento</h3>
    <div className="flex justify-center mb-6">
      <RadioGroup value={nivelEntrenamiento} onValueChange={setNivelEntrenamiento} className="flex gap-6">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="inicial" id="inicial" />
          <Label htmlFor="inicial">Inicial</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="intermedio" id="intermedio" />
          <Label htmlFor="intermedio">Intermedio</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="avanzado" id="avanzado" />
          <Label htmlFor="avanzado">Avanzado</Label>
        </div>
      </RadioGroup>
    </div>

    <hr className="border-dashed border-green-800 mb-6" />

    {/* Grid principal */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Frecuencia semanal */}
      <div>
        <h4 className="text-green-800 font-semibold mb-2">Frecuencia Semanal</h4>
        <select className="w-full border border-gray-300 rounded-md p-2">
          <option>Una vez</option>
          <option>Dos veces</option>
          <option>Tres veces</option>
          <option>Cuatro veces</option>
          <option>Cinco veces</option>
          <option>Seis veces</option>
          <option>Siete veces</option>
        </select>
      </div>

      {/* Objetivos */}
      <div>
        <h4 className="text-green-800 font-semibold mb-2">Objetivos</h4>
        <div className="space-y-2">
          <div>
            <Label htmlFor="pesoSalud">Peso Saludable</Label>
            <Input id="pesoSalud" />
          </div>
          <div>
            <Label htmlFor="salud">Salud</Label>
            <Input id="salud" />
          </div>
          <div>
            <Label htmlFor="dismGraso">Dism. % Graso</Label>
            <Input id="dismGraso" />
          </div>
          <div>
            <Label htmlFor="acondFisico">Acond. Físico</Label>
            <Input id="acondFisico" />
          </div>
          <div>
            <Label htmlFor="fitness">Fitness</Label>
            <Input id="fitness" />
          </div>
          <div>
            <Label htmlFor="desMuscular">Des. Muscular</Label>
            <Input id="desMuscular" />
          </div>
        </div>
      </div>

      {/* Entrenamiento grupal */}
      <div>
        <h4 className="text-green-800 font-semibold mb-2">Entrenamiento Grupal</h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <Checkbox id="rumba" />
            <Label htmlFor="rumba">Rumba</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="bodyPump" />
            <Label htmlFor="bodyPump">Body Pump</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="core" />
            <Label htmlFor="core">Core</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="bodyCombat" />
            <Label htmlFor="bodyCombat">Body Combat</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="yoga" />
            <Label htmlFor="yoga">Yoga</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="bodyAttack" />
            <Label htmlFor="bodyAttack">Body Attack</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="hidrogimnasia" />
            <Label htmlFor="hidrogimnasia">Hidrogimnasia</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="entFuncional" />
            <Label htmlFor="entFuncional">Ent. Funcional</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="spinning" />
            <Label htmlFor="spinning">Spinning</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="zumba" />
            <Label htmlFor="zumba">Zumba</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="yogaPilates" />
            <Label htmlFor="yogaPilates">Yoga-pilates</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="trx" />
            <Label htmlFor="trx">TRX</Label>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


            {/* Observaciones */}
            <div>
              <div className="bg-green-700 text-white p-3 rounded-t-lg">
                <h2 className="text-lg">Observaciones</h2>
              </div>
              <div className="bg-white border border-gray-200 rounded-b-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="mb-2 block">Observaciones Generales</Label>
                    <Textarea 
                      id="observaciones"
                      placeholder="Ingrese observaciones generales..." 
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block">Observaciones Funcionales</Label>
                    <Textarea 
                      id="observacionesFuncionales"
                      placeholder="Ingrese observaciones funcionales..." 
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Programa de entrenamiento */}
            <ExerciseManager 
              onUpdate={(days) => setFormData(prev => ({ ...prev, trainingDays: days }))}
              availableExercises={ejerciciosDB.map(ejercicio => ({
                id: ejercicio.id.toString(),
                name: ejercicio.nombre,
                category: ejercicio.categoria
              }))}
            />


              {/* Botones de acción */}
              <div className="flex gap-4 pt-6">
                <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                  <AlertDialogTrigger asChild>
                    <Button className="bg-green-700 hover:bg-green-800">
                      Guardar valoración
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmar guardado</AlertDialogTitle>
                      <AlertDialogDescription>
                        ¿Está seguro que desea guardar esta valoración? Esta acción no se puede deshacer.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleSaveValoracion}
                        className="bg-green-700 hover:bg-green-800"
                      >
                        Confirmar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button variant="outline" onClick={clearForm}>
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        )

      case 'ver-valoracion':
        return (
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">{getPageTitle(activeSection)}</h1>
            </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                Ver Valoraciones
              </CardTitle>
              <CardDescription>
                Lista de todas las valoraciones ({valoraciones.length} valoraciones)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Buscador */}
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Buscar valoración por nombre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Comentario</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(() => {
                    // Si no hay término de búsqueda o tiene menos de 3 caracteres, no mostrar nada
                    if (!searchTerm || searchTerm.trim().length < 3) {
                      return (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center text-muted-foreground py-6">
                            Ingrese al menos 3 caracteres para buscar (ID/nombre)
                          </TableCell>
                        </TableRow>
                      )
                    }
                    
                    const filteredValoraciones = valoraciones.filter(valoracion => 
                      valoracion.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      valoracion.id.toString().includes(searchTerm)
                    )
                    
                    if (filteredValoraciones.length === 0) {
                      return (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center text-muted-foreground py-6">
                            No se encontraron valoraciones
                          </TableCell>
                        </TableRow>
                      )
                    }
                    
                    return filteredValoraciones.map((valoracion) => (
                      <TableRow key={valoracion.id}>
                        <TableCell>{valoracion.usuario}</TableCell>
                        <TableCell>{valoracion.comentario}</TableCell>
                        <TableCell>{valoracion.fecha}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewValoracionComplete(valoracion)}
                            >
                              Ver
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditValoracionComplete(valoracion)}
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Editar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  })()}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Modal unificado de valoración */}
          <Dialog open={showValoracionDialog} onOpenChange={setShowValoracionDialog}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <DialogTitle>{isEditingValoracion ? 'Editar Valoración' : 'Valoración Completa'}</DialogTitle>
                    <DialogDescription>
                      {isEditingValoracion ? 'Modifica los datos de la valoración seleccionada.' : 'Visualiza todos los detalles de la valoración seleccionada.'}
                    </DialogDescription>
                  </div>
                  {!isEditingValoracion && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleExportValoracionDirect(currentValoracion)}
                        size="sm"
                        className="bg-green-700 hover:bg-green-800 text-white"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Exportar
                      </Button>
                      <Button
                        onClick={() => setIsEditingValoracion(true)}
                        size="sm"
                        variant="outline"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                    </div>
                  )}
                </div>
              </DialogHeader>
              {currentValoracion && (
                <div className="space-y-6">
                  {/* Información del Usuario */}
                  <div>
                    <div className="bg-green-700 text-white p-3 rounded-t-lg">
                      <h3 className="text-lg font-semibold">Información del Cliente</h3>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-b-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                          {isEditingValoracion ? (
                            <Input
                              value={currentValoracion.usuario}
                              onChange={(e) => setCurrentValoracion({...currentValoracion, usuario: e.target.value})}
                              className="mt-1"
                            />
                          ) : (
                            <p className="mt-1 text-sm text-gray-900">{currentValoracion.usuario}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Documento</label>
                          {isEditingValoracion ? (
                            <Input
                              value={currentValoracion.documento || ''}
                              onChange={(e) => setCurrentValoracion({...currentValoracion, documento: e.target.value})}
                              className="mt-1"
                              placeholder="CC: 1234567890"
                            />
                          ) : (
                            <p className="mt-1 text-sm text-gray-900">CC: {currentValoracion.documento || '1234567890'}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                          {isEditingValoracion ? (
                            <Input
                              value={currentValoracion.telefono || ''}
                              onChange={(e) => setCurrentValoracion({...currentValoracion, telefono: e.target.value})}
                              className="mt-1"
                              placeholder="+57 300 123 4567"
                            />
                          ) : (
                            <p className="mt-1 text-sm text-gray-900">{currentValoracion.telefono || '+57 300 123 4567'}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Email</label>
                          {isEditingValoracion ? (
                            <Input
                              value={currentValoracion.email || ''}
                              onChange={(e) => setCurrentValoracion({...currentValoracion, email: e.target.value})}
                              className="mt-1"
                              placeholder="usuario@email.com"
                            />
                          ) : (
                            <p className="mt-1 text-sm text-gray-900">{currentValoracion.email || 'cliente@email.com'}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Dirección</label>
                          {isEditingValoracion ? (
                            <Input
                              value={currentValoracion.direccion || ''}
                              onChange={(e) => setCurrentValoracion({...currentValoracion, direccion: e.target.value})}
                              className="mt-1"
                              placeholder="Calle 123 #45-67"
                            />
                          ) : (
                            <p className="mt-1 text-sm text-gray-900">{currentValoracion.direccion || 'Calle 123 #45-67'}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">EPS</label>
                          {isEditingValoracion ? (
                            <div className="mt-1">
                              <EPSCombobox
                                value={currentValoracion.eps || ''}
                                onChange={(value) => setCurrentValoracion({...currentValoracion, eps: value})}
                                placeholder="Buscar o seleccionar EPS..."
                              />
                            </div>
                          ) : (
                            <p className="mt-1 text-sm text-gray-900">{currentValoracion.eps || 'Nueva EPS'}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cuestionario Inicial */}
                  <div>
                    <div className="bg-green-700 text-white p-3 rounded-t-lg">
                      <h3 className="text-lg font-semibold">Cuestionario Inicial</h3>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-b-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">¿Ha realizado ejercicio en gimnasio anteriormente?</label>
                          {isEditingValoracion ? (
                            <Textarea
                              value={currentValoracion.ejercicio_anterior || ''}
                              onChange={(e) => setCurrentValoracion({...currentValoracion, ejercicio_anterior: e.target.value})}
                              className="mt-1"
                              placeholder="Sí, durante 2 años en otro gimnasio"
                              rows={2}
                            />
                          ) : (
                            <p className="mt-1 text-sm text-gray-900">{currentValoracion.ejercicio_anterior || 'Sí, durante 2 años en otro gimnasio'}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">¿Actualmente realiza alguna actividad física?</label>
                          {isEditingValoracion ? (
                            <Textarea
                              value={currentValoracion.actividad_actual || ''}
                              onChange={(e) => setCurrentValoracion({...currentValoracion, actividad_actual: e.target.value})}
                              className="mt-1"
                              placeholder="Camino 3 veces por semana"
                              rows={2}
                            />
                          ) : (
                            <p className="mt-1 text-sm text-gray-900">{currentValoracion.actividad_actual || 'Camino 3 veces por semana'}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">¿Sedentario?</label>
                          {isEditingValoracion ? (
                            <Select 
                              value={currentValoracion.sedentario || ''} 
                              onValueChange={(value) => setCurrentValoracion({...currentValoracion, sedentario: value})}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Seleccionar" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Sí">Sí</SelectItem>
                                <SelectItem value="No">No</SelectItem>
                                <SelectItem value="Parcialmente">Parcialmente</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <p className="mt-1 text-sm text-gray-900">{currentValoracion.sedentario || 'Parcialmente'}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Frecuencia</label>
                          {isEditingValoracion ? (
                            <Select 
                              value={currentValoracion.frecuencia || ''} 
                              onValueChange={(value) => setCurrentValoracion({...currentValoracion, frecuencia: value})}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Seleccionar frecuencia" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1-2 veces por semana">1-2 veces por semana</SelectItem>
                                <SelectItem value="3-4 veces por semana">3-4 veces por semana</SelectItem>
                                <SelectItem value="5-6 veces por semana">5-6 veces por semana</SelectItem>
                                <SelectItem value="Todos los días">Todos los días</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <p className="mt-1 text-sm text-gray-900">{currentValoracion.frecuencia || '3-4 veces por semana'}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Signos Vitales */}
                  <div>
                    <div className="bg-green-700 text-white p-3 rounded-t-lg">
                      <h3 className="text-lg font-semibold">Signos Vitales</h3>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-b-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">FC (Frecuencia Cardíaca)</label>
                          {isEditingValoracion ? (
                            <Input
                              value={currentValoracion.fc || ''}
                              onChange={(e) => setCurrentValoracion({...currentValoracion, fc: e.target.value})}
                              className="mt-1"
                              placeholder="72 bpm"
                            />
                          ) : (
                            <p className="mt-1 text-sm text-gray-900">{currentValoracion.fc || '72 bpm'}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">FR (Frecuencia Respiratoria)</label>
                          {isEditingValoracion ? (
                            <Input
                              value={currentValoracion.fr || ''}
                              onChange={(e) => setCurrentValoracion({...currentValoracion, fr: e.target.value})}
                              className="mt-1"
                              placeholder="16 rpm"
                            />
                          ) : (
                            <p className="mt-1 text-sm text-gray-900">{currentValoracion.fr || '16 rpm'}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">T/A (Tensión Arterial)</label>
                          {isEditingValoracion ? (
                            <Input
                              value={currentValoracion.ta || ''}
                              onChange={(e) => setCurrentValoracion({...currentValoracion, ta: e.target.value})}
                              className="mt-1"
                              placeholder="120/80 mmHg"
                            />
                          ) : (
                            <p className="mt-1 text-sm text-gray-900">{currentValoracion.ta || '120/80 mmHg'}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">FC/MAX</label>
                          {isEditingValoracion ? (
                            <Input
                              value={currentValoracion.fc_max || ''}
                              onChange={(e) => setCurrentValoracion({...currentValoracion, fc_max: e.target.value})}
                              className="mt-1"
                              placeholder="190 bpm"
                            />
                          ) : (
                            <p className="mt-1 text-sm text-gray-900">{currentValoracion.fc_max || '190 bpm'}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Factores de Riesgo */}
                  <div>
                    <div className="bg-green-700 text-white p-3 rounded-t-lg">
                      <h3 className="text-lg font-semibold">Factores de Riesgo</h3>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-b-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            {isEditingValoracion ? (
                              <Checkbox 
                                checked={currentValoracion.enfermedad_cardiovascular || false}
                                onCheckedChange={(checked) => setCurrentValoracion({...currentValoracion, enfermedad_cardiovascular: checked})}
                              />
                            ) : (
                              <div className={`w-4 h-4 rounded border ${currentValoracion.enfermedad_cardiovascular ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            )}
                            <span className="text-sm">Enfermedad cardiovascular</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            {isEditingValoracion ? (
                              <Checkbox 
                                checked={currentValoracion.diabetes || false}
                                onCheckedChange={(checked) => setCurrentValoracion({...currentValoracion, diabetes: checked})}
                              />
                            ) : (
                              <div className={`w-4 h-4 rounded border ${currentValoracion.diabetes ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            )}
                            <span className="text-sm">Diabetes</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            {isEditingValoracion ? (
                              <Checkbox 
                                checked={currentValoracion.hipertension || false}
                                onCheckedChange={(checked) => setCurrentValoracion({...currentValoracion, hipertension: checked})}
                              />
                            ) : (
                              <div className={`w-4 h-4 rounded border ${currentValoracion.hipertension ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            )}
                            <span className="text-sm">Hipertensión arterial</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            {isEditingValoracion ? (
                              <Checkbox 
                                checked={currentValoracion.fumador || false}
                                onCheckedChange={(checked) => setCurrentValoracion({...currentValoracion, fumador: checked})}
                              />
                            ) : (
                              <div className={`w-4 h-4 rounded border ${currentValoracion.fumador ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            )}
                            <span className="text-sm">Fumador</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            {isEditingValoracion ? (
                              <Checkbox 
                                checked={currentValoracion.obesidad || false}
                                onCheckedChange={(checked) => setCurrentValoracion({...currentValoracion, obesidad: checked})}
                              />
                            ) : (
                              <div className={`w-4 h-4 rounded border ${currentValoracion.obesidad ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            )}
                            <span className="text-sm">Obesidad</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            {isEditingValoracion ? (
                              <Checkbox 
                                checked={currentValoracion.problemas_articulares || false}
                                onCheckedChange={(checked) => setCurrentValoracion({...currentValoracion, problemas_articulares: checked})}
                              />
                            ) : (
                              <div className={`w-4 h-4 rounded border ${currentValoracion.problemas_articulares ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            )}
                            <span className="text-sm">Problemas articulares</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            {isEditingValoracion ? (
                              <Checkbox 
                                checked={currentValoracion.antecedentes_familiares || false}
                                onCheckedChange={(checked) => setCurrentValoracion({...currentValoracion, antecedentes_familiares: checked})}
                              />
                            ) : (
                              <div className={`w-4 h-4 rounded border ${currentValoracion.antecedentes_familiares ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            )}
                            <span className="text-sm">Antecedentes familiares</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            {isEditingValoracion ? (
                              <Checkbox 
                                checked={currentValoracion.medicamentos || false}
                                onCheckedChange={(checked) => setCurrentValoracion({...currentValoracion, medicamentos: checked})}
                              />
                            ) : (
                              <div className={`w-4 h-4 rounded border ${currentValoracion.medicamentos ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            )}
                            <span className="text-sm">Medicamentos</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Evaluación y Comentarios */}
                  <div>
                    <div className="bg-green-700 text-white p-3 rounded-t-lg">
                      <h3 className="text-lg font-semibold">Evaluación y Comentarios</h3>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-b-lg p-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Fecha de Valoración</label>
                          {isEditingValoracion ? (
                            <Input
                              type="date"
                              value={currentValoracion.fecha}
                              onChange={(e) => setCurrentValoracion({...currentValoracion, fecha: e.target.value})}
                              className="mt-1"
                            />
                          ) : (
                            <p className="mt-1 text-sm text-gray-900">{currentValoracion.fecha}</p>
                          )}
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Comentarios y Observaciones</label>
                        {isEditingValoracion ? (
                          <Textarea
                            value={currentValoracion.comentario}
                            onChange={(e) => setCurrentValoracion({...currentValoracion, comentario: e.target.value})}
                            className="mt-1"
                            rows={4}
                            placeholder="Ingrese comentarios y observaciones..."
                          />
                        ) : (
                          <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded border">
                            {currentValoracion.comentario}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Recomendaciones */}
                  <div>
                    <div className="bg-green-700 text-white p-3 rounded-t-lg">
                      <h3 className="text-lg font-semibold">Recomendaciones</h3>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-b-lg p-4">
                      {isEditingValoracion ? (
                        <Textarea
                          value={currentValoracion.recomendaciones || ''}
                          onChange={(e) => setCurrentValoracion({...currentValoracion, recomendaciones: e.target.value})}
                          className="w-full"
                          rows={6}
                          placeholder="• Iniciar con rutina de ejercicios cardiovasculares de baja intensidad&#10;• Realizar calentamiento de 10-15 minutos antes de cada sesión&#10;• Mantener hidratación constante durante el entrenamiento&#10;• Programar sesiones de 45-60 minutos, 3-4 veces por semana"
                        />
                      ) : (
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                            <p className="text-sm text-gray-700">Iniciar con rutina de ejercicios cardiovasculares de baja intensidad</p>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                            <p className="text-sm text-gray-700">Realizar calentamiento de 10-15 minutos antes de cada sesión</p>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                            <p className="text-sm text-gray-700">Mantener hidratación constante durante el entrenamiento</p>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                            <p className="text-sm text-gray-700">Programar sesiones de 45-60 minutos, 3-4 veces por semana</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex gap-3 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowValoracionDialog(false)
                        setCurrentValoracion(null)
                        setIsEditingValoracion(false)
                      }}
                      className="flex-1"
                    >
                      {isEditingValoracion ? 'Cancelar' : 'Cerrar'}
                    </Button>
                    {isEditingValoracion && (
                      <Button
                        onClick={handleSaveEditedValoracion}
                        className="flex-1 bg-green-700 hover:bg-green-800"
                      >
                        Guardar Cambios
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          </div>
        )

      case 'editar-valoracion':
        return (
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">{getPageTitle(activeSection)}</h1>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit className="h-5 w-5" />
                  Seleccionar Valoración para Editar
                </CardTitle>
                <CardDescription>
                  Selecciona una valoración de la lista para editarla
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Buscador */}
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Buscar por cliente, fecha o comentario..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1"
                    />
                  </div>

                  {/* Lista de valoraciones */}
                  <div className="space-y-2">
                    {valoracionesDB
                      .filter(val => 
                        val.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        val.comentario.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        val.fecha.includes(searchTerm)
                      )
                      .map((valoracion) => (
                        <div 
                          key={valoracion.id}
                          className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleEditValoracion(valoracion)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-4 mb-2">
                                <h3 className="font-medium text-gray-900">{valoracion.usuario}</h3>
                                <Badge variant="outline">{valoracion.fecha}</Badge>
                              </div>
                              <p className="text-sm text-gray-600 line-clamp-2">{valoracion.comentario}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                <span>Doc: {valoracion.documento}</span>
                                <span>EPS: {valoracion.eps}</span>
                              </div>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="ml-4"
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Editar
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Mensaje si no hay resultados */}
                  {valoracionesDB.filter(val => 
                    val.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    val.comentario.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    val.fecha.includes(searchTerm)
                  ).length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No se encontraron valoraciones que coincidan con tu búsqueda</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Modal unificado de valoración para editar */}
            <Dialog open={showValoracionDialog} onOpenChange={setShowValoracionDialog}>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Editar Valoración</DialogTitle>
                  <DialogDescription>
                    Modifica los datos de la valoración seleccionada
                  </DialogDescription>
                </DialogHeader>
                {currentValoracion && (
                  <div className="space-y-6">
                    {/* Información del Usuario */}
                    <div>
                      <div className="bg-green-700 text-white p-3 rounded-t-lg">
                        <h3 className="text-lg font-semibold">Información del Cliente</h3>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-b-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Cliente</label>
                            <Input
                              value={currentValoracion.usuario}
                              onChange={(e) => setCurrentValoracion({...currentValoracion, usuario: e.target.value})}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Documento</label>
                            <Input
                              value={currentValoracion.documento || ''}
                              onChange={(e) => setCurrentValoracion({...currentValoracion, documento: e.target.value})}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                            <Input
                              value={currentValoracion.telefono || ''}
                              onChange={(e) => setCurrentValoracion({...currentValoracion, telefono: e.target.value})}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <Input
                              type="email"
                              value={currentValoracion.email || ''}
                              onChange={(e) => setCurrentValoracion({...currentValoracion, email: e.target.value})}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Dirección</label>
                            <Input
                              value={currentValoracion.direccion || ''}
                              onChange={(e) => setCurrentValoracion({...currentValoracion, direccion: e.target.value})}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">EPS</label>
                            <EPSCombobox
                              value={currentValoracion.eps || ''}
                              onChange={(value) => setCurrentValoracion({...currentValoracion, eps: value})}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Fecha de Valoración */}
                    <div>
                      <div className="bg-green-700 text-white p-3 rounded-t-lg">
                        <h3 className="text-lg font-semibold">Información de la Valoración</h3>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-b-lg p-4">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Fecha de Valoración</label>
                            <Input
                              type="date"
                              value={currentValoracion.fecha}
                              onChange={(e) => setCurrentValoracion({...currentValoracion, fecha: e.target.value})}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Comentarios y Observaciones</label>
                            <Textarea
                              value={currentValoracion.comentario}
                              onChange={(e) => setCurrentValoracion({...currentValoracion, comentario: e.target.value})}
                              className="mt-1"
                              rows={4}
                              placeholder="Ingrese comentarios y observaciones..."
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex gap-3 pt-4 border-t">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowValoracionDialog(false)
                          setCurrentValoracion(null)
                        }}
                        className="flex-1"
                      >
                        Cancelar
                      </Button>
                      <Button
                        onClick={handleSaveEditedValoracion}
                        className="flex-1 bg-green-700 hover:bg-green-800"
                      >
                        Guardar Cambios
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>


          </div>
        )



      case 'crear-ejercicios':
        return (
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">{getPageTitle(activeSection)}</h1>
            </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Crear Ejercicio
              </CardTitle>
              <CardDescription>
                Añade un nuevo ejercicio al sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombre-ejercicio">Nombre del ejercicio *</Label>
                <Input 
                  id="nombre-ejercicio" 
                  placeholder="Ej: Flexiones de brazos" 
                  value={exerciseFormData.nombre}
                  onChange={(e) => handleExerciseFormChange('nombre', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descripcion-ejercicio">Descripción del ejercicio *</Label>
                <Textarea 
                  id="descripcion-ejercicio" 
                  placeholder="Describe el ejercicio y sus beneficios..."
                  value={exerciseFormData.descripcion}
                  onChange={(e) => handleExerciseFormChange('descripcion', e.target.value)}
                  rows={3}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ejemplo-ejercicio">Añadir ejemplo (imagen o video) *</Label>
                
                {/* Input file oculto */}
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                {/* Botón de upload personalizado */}
                {!selectedFile ? (
                  <div 
                    onClick={() => document.getElementById('file-upload')?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors"
                  >
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Haz clic para subir un archivo</p>
                    <p className="text-xs text-gray-400">Imágenes: JPG, PNG, GIF | Videos: MP4, AVI, MOV, WMV</p>
                    <p className="text-xs text-gray-400">Tamaño máximo: 50MB</p>
                  </div>
                ) : (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {selectedFile.type.startsWith('image/') ? (
                          <FileImage className="h-5 w-5 text-blue-500" />
                        ) : (
                          <FileVideo className="h-5 w-5 text-purple-500" />
                        )}
                        <span className="text-sm font-medium">{selectedFile.name}</span>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={removeFile}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Preview del archivo */}
                    {filePreview && (
                      <div className="mt-3">
                        {selectedFile.type.startsWith('image/') ? (
                          <img
                            src={filePreview}
                            alt="Preview"
                            className="max-w-full h-32 object-cover rounded border"
                          />
                        ) : (
                          <div className="relative">
                            <video
                              src={filePreview}
                              className="max-w-full h-32 object-cover rounded border"
                              controls={false}
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded">
                              <Play className="h-8 w-8 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <span>Tipo: {selectedFile.type}</span>
                      <span>Tamaño: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoria">Categoría</Label>
                <Select value={exerciseFormData.categoria} onValueChange={(value) => handleExerciseFormChange('categoria', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cardio">Cardio</SelectItem>
                    <SelectItem value="Fuerza">Fuerza</SelectItem>
                    <SelectItem value="Flexibilidad">Flexibilidad</SelectItem>
                    <SelectItem value="Funcional">Funcional</SelectItem>
                    <SelectItem value="Resistencia">Resistencia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dificultad">Dificultad</Label>
                <Select value={exerciseFormData.dificultad} onValueChange={(value) => handleExerciseFormChange('dificultad', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Principiante">Principiante</SelectItem>
                    <SelectItem value="Intermedio">Intermedio</SelectItem>
                    <SelectItem value="Avanzado">Avanzado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Botón de crear con confirmación */}
              <div className="pt-4">
                <AlertDialog open={showExerciseConfirmDialog} onOpenChange={setShowExerciseConfirmDialog}>
                  <AlertDialogTrigger asChild>
                    <Button className="bg-green-700 hover:bg-green-800 w-full">
                      Crear Ejercicio
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmar creación de ejercicio</AlertDialogTitle>
                      <AlertDialogDescription>
                        ¿Está seguro que desea crear este ejercicio? Revise que toda la información esté correcta antes de continuar.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleSaveExercise}
                        className="bg-green-700 hover:bg-green-800"
                      >
                        Confirmar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
          </div>
        )

      case 'ver-ejercicios':
        return (
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">{getPageTitle(activeSection)}</h1>
            </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="h-5 w-5" />
                Ver Ejercicios
              </CardTitle>
              <CardDescription>
                Lista de todos los ejercicios disponibles ({ejerciciosDB.length} ejercicios)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {ejerciciosDB.length > 0 ? (
                <div className="space-y-4">
                  {/* Buscador */}
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Buscar ejercicios..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1"
                    />
                  </div>

                  {/* Lista de ejercicios */}
                  <div className="space-y-4">
                    {(() => {
                      // Si no hay término de búsqueda o tiene menos de 3 caracteres, mostrar mensaje
                      if (!searchTerm || searchTerm.trim().length < 3) {
                        return (
                          <div className="text-center text-muted-foreground py-8 border border-dashed border-gray-300 rounded-lg">
                            Ingrese al menos 3 caracteres para buscar (ID/nombre)
                          </div>
                        )
                      }
                      
                      const filteredEjercicios = ejerciciosDB.filter(ejercicio => 
                        ejercicio.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        ejercicio.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        ejercicio.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        ejercicio.id.toString().includes(searchTerm)
                      )
                      
                      if (filteredEjercicios.length === 0) {
                        return (
                          <div className="text-center text-muted-foreground py-8 border border-dashed border-gray-300 rounded-lg">
                            No se encontraron ejercicios
                          </div>
                        )
                      }
                      
                      return filteredEjercicios.map((ejercicio) => (
                        <div 
                          key={ejercicio.id}
                          className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-4 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">{ejercicio.nombre}</h3>
                                <Badge variant="outline">{ejercicio.categoria}</Badge>
                                <Badge variant="secondary">{ejercicio.dificultad}</Badge>
                              </div>
                              
                              <div className="space-y-2">
                                <div>
                                  <p className="text-sm font-medium text-gray-700 mb-1">Descripción:</p>
                                  <p className="text-sm text-gray-600">{ejercicio.descripcion}</p>
                                </div>
                                
                                <div>
                                  <p className="text-sm font-medium text-gray-700 mb-1">Ejemplo de ejecución:</p>
                                  {ejercicio.archivoEjemplo ? (
                                    <div className="bg-gray-50 p-3 rounded border">
                                      <div className="flex items-center gap-2 mb-2">
                                        {ejercicio.archivoEjemplo.esVideo ? (
                                          <FileVideo className="h-4 w-4 text-purple-500" />
                                        ) : (
                                          <FileImage className="h-4 w-4 text-blue-500" />
                                        )}
                                        <span className="text-xs font-medium">{ejercicio.archivoEjemplo.nombre}</span>
                                        <span className="text-xs text-gray-400">
                                          ({(ejercicio.archivoEjemplo.tamaño / 1024 / 1024).toFixed(2)} MB)
                                        </span>
                                      </div>
                                      
                                      {ejercicio.archivoEjemplo.esVideo ? (
                                        <video
                                          src={ejercicio.archivoEjemplo.url}
                                          className="w-full max-w-xs h-32 object-cover rounded border"
                                          controls
                                          preload="metadata"
                                        />
                                      ) : (
                                        <img
                                          src={ejercicio.archivoEjemplo.url}
                                          alt={`Ejemplo de ${ejercicio.nombre}`}
                                          className="w-full max-w-xs h-32 object-cover rounded border"
                                        />
                                      )}
                                    </div>
                                  ) : (
                                    <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded border">{ejercicio.ejemplo}</p>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                                <span>Creado: {ejercicio.fechaCreacion}</span>
                                <span>ID: {ejercicio.id}</span>
                              </div>
                            </div>
                            
                            <div className="ml-4 flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEditExercise(ejercicio)}
                              >
                                <Edit className="h-3 w-3 mr-1" />
                                Editar
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-red-600 hover:text-red-700"
                                onClick={() => handleDeleteExercise(ejercicio.id, ejercicio.nombre)}
                              >
                                <Trash2 className="h-3 w-3 mr-1" />
                                Eliminar
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    })()}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Dumbbell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-2">No hay ejercicios creados</p>
                  <p className="text-sm text-gray-400">Crea tu primer ejercicio desde la sección "Crear ejercicios"</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Modal de edición de ejercicio */}
          {editingExercise && (
            <Dialog open={!!editingExercise} onOpenChange={() => cancelEdit()}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Editar Ejercicio</DialogTitle>
                  <DialogDescription>
                    Modifica los campos que desees actualizar del ejercicio "{editingExercise.nombre}"
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  {/* Nombre del ejercicio */}
                  <div className="space-y-2">
                    <Label htmlFor="edit-nombre-ejercicio">Nombre del ejercicio *</Label>
                    <Input 
                      id="edit-nombre-ejercicio" 
                      placeholder="Ingresa el nombre del ejercicio"
                      value={editFormData.nombre}
                      onChange={(e) => handleEditFormChange('nombre', e.target.value)}
                      required
                    />
                  </div>

                  {/* Descripción */}
                  <div className="space-y-2">
                    <Label htmlFor="edit-descripcion-ejercicio">Descripción del ejercicio *</Label>
                    <Textarea 
                      id="edit-descripcion-ejercicio" 
                      placeholder="Describe qué músculos trabaja, beneficios, etc."
                      value={editFormData.descripcion}
                      onChange={(e) => handleEditFormChange('descripcion', e.target.value)}
                      rows={3}
                      required
                    />
                  </div>

                  {/* Archivo de ejemplo */}
                  <div className="space-y-2">
                    <Label htmlFor="edit-ejemplo-ejercicio">Ejemplo (imagen o video)</Label>
                    
                    {/* Input file oculto */}
                    <input
                      id="edit-file-upload"
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleEditFileSelect}
                      className="hidden"
                    />
                    
                    {/* Mostrar archivo actual o preview del nuevo */}
                    {editFilePreview ? (
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {editSelectedFile ? (
                              <>
                                {editSelectedFile.type.startsWith('image/') ? (
                                  <FileImage className="h-5 w-5 text-blue-500" />
                                ) : (
                                  <FileVideo className="h-5 w-5 text-purple-500" />
                                )}
                                <span className="text-sm font-medium">{editSelectedFile.name}</span>
                                <Badge variant="secondary">Nuevo</Badge>
                              </>
                            ) : (
                              <>
                                {editingExercise.archivoEjemplo?.esVideo ? (
                                  <FileVideo className="h-5 w-5 text-purple-500" />
                                ) : (
                                  <FileImage className="h-5 w-5 text-blue-500" />
                                )}
                                <span className="text-sm font-medium">
                                  {editingExercise.archivoEjemplo?.nombre || 'Archivo actual'}
                                </span>
                                <Badge variant="outline">Actual</Badge>
                              </>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => document.getElementById('edit-file-upload')?.click()}
                            >
                              <Upload className="h-4 w-4 mr-1" />
                              Cambiar
                            </Button>
                            {editSelectedFile && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={removeEditFile}
                                className="text-red-600 hover:text-red-700"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                        
                        {/* Preview del archivo */}
                        <div className="mt-3">
                          {editSelectedFile?.type.startsWith('image/') || (!editSelectedFile && !editingExercise.archivoEjemplo?.esVideo) ? (
                            <img
                              src={editFilePreview}
                              alt="Preview"
                              className="max-w-full h-32 object-cover rounded border"
                            />
                          ) : (
                            <div className="relative">
                              <video
                                src={editFilePreview}
                                className="max-w-full h-32 object-cover rounded border"
                                controls={editSelectedFile ? false : true}
                              />
                              {editSelectedFile && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded">
                                  <Play className="h-8 w-8 text-white" />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                          <span>Tipo: {editSelectedFile?.type || editingExercise.archivoEjemplo?.tipo}</span>
                          <span>Tamaño: {editSelectedFile ? 
                            (editSelectedFile.size / 1024 / 1024).toFixed(2) : 
                            (editingExercise.archivoEjemplo?.tamaño / 1024 / 1024).toFixed(2)
                          } MB</span>
                        </div>
                      </div>
                    ) : (
                      <div 
                        onClick={() => document.getElementById('edit-file-upload')?.click()}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors"
                      >
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-1">Haz clic para subir un archivo</p>
                        <p className="text-xs text-gray-400">Imágenes: JPG, PNG, GIF | Videos: MP4, AVI, MOV, WMV</p>
                      </div>
                    )}
                  </div>

                  {/* Categoría */}
                  <div className="space-y-2">
                    <Label htmlFor="edit-categoria-ejercicio">Categoría</Label>
                    <Select value={editFormData.categoria} onValueChange={(value) => handleEditFormChange('categoria', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cardio">Cardio</SelectItem>
                        <SelectItem value="Fuerza">Fuerza</SelectItem>
                        <SelectItem value="Flexibilidad">Flexibilidad</SelectItem>
                        <SelectItem value="Equilibrio">Equilibrio</SelectItem>
                        <SelectItem value="Funcional">Funcional</SelectItem>
                        <SelectItem value="HIIT">HIIT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Dificultad */}
                  <div className="space-y-2">
                    <Label htmlFor="edit-dificultad-ejercicio">Nivel de dificultad</Label>
                    <Select value={editFormData.dificultad} onValueChange={(value) => handleEditFormChange('dificultad', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el nivel de dificultad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Principiante">Principiante</SelectItem>
                        <SelectItem value="Intermedio">Intermedio</SelectItem>
                        <SelectItem value="Avanzado">Avanzado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={cancelEdit}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSaveEditExercise} className="bg-green-700 hover:bg-green-800">
                    Guardar Cambios
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          {/* Alert Dialog personalizado para eliminar ejercicio */}
          <AlertDialog open={deleteExerciseDialog.isOpen} onOpenChange={() => setDeleteExerciseDialog({ isOpen: false, exerciseId: null, exerciseName: '' })}>
            <AlertDialogContent className="max-w-md">
              <AlertDialogHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-3">
                  <Trash2 className="w-6 h-6 text-red-500" />
                </div>
                <AlertDialogTitle className="text-lg text-gray-900">
                  Eliminar ejercicio
                </AlertDialogTitle>
                <AlertDialogDescription className="text-sm text-gray-600 mt-2">
                  ¿Estás seguro de que deseas eliminar el ejercicio <span className="font-medium">"{deleteExerciseDialog.exerciseName}"</span>?
                  <br />
                  <span className="text-red-500">Esta acción no se puede deshacer.</span>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex gap-2 mt-6">
                <AlertDialogCancel 
                  onClick={cancelDeleteExercise}
                  className="flex-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction 
                  onClick={confirmDeleteExercise}
                  className="flex-1 bg-red-500 text-white hover:bg-red-600 border-red-500"
                >
                  Eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          </div>
        )

      case 'calendario':
        const monthNames = [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ]
        
        const calendarMonth = calendarDate.getMonth()
        const calendarYear = calendarDate.getFullYear()
        const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate()
        const firstDayOfMonth = new Date(calendarYear, calendarMonth, 1).getDay()
        
        // Datos de valoraciones pendientes por mes (simulados)
        const valoracionesPorMes = {
          9: { // Octubre 2024
            5: [
              { name: 'Carlos Rodríguez', time: '09:00 AM' },
              { name: 'Ana Martínez', time: '11:30 AM' }
            ],
            12: [
              { name: 'Pedro Silva', time: '08:00 AM' },
              { name: 'Laura Herrera', time: '10:15 AM' },
              { name: 'Diego Morales', time: '02:30 PM' }
            ],
            18: [
              { name: 'Sofia Castro', time: '04:00 PM' }
            ],
            25: [
              { name: 'Roberto Vega', time: '07:30 AM' },
              { name: 'Carmen Ruiz', time: '03:45 PM' }
            ]
          },
          8: { // Septiembre 2024
            8: [
              { name: 'María González', time: '10:00 AM' }
            ],
            15: [
              { name: 'Juan López', time: '02:00 PM' },
              { name: 'Carmen Silva', time: '04:30 PM' }
            ],
            22: [
              { name: 'Pablo Restrepo', time: '08:30 AM' }
            ]
          },
          10: { // Noviembre 2024
            3: [
              { name: 'Andrea Morales', time: '09:30 AM' },
              { name: 'Luis Fernández', time: '11:00 AM' }
            ],
            10: [
              { name: 'Sandra Ruiz', time: '03:00 PM' }
            ],
            17: [
              { name: 'Miguel Castro', time: '08:00 AM' },
              { name: 'Elena Vargas', time: '10:30 AM' },
              { name: 'Roberto Díaz', time: '02:15 PM' }
            ]
          }
        }
        
        const currentMonthData = valoracionesPorMes[calendarMonth as keyof typeof valoracionesPorMes] || {}
        const totalPendingCurrentMonth = Object.values(currentMonthData).reduce((acc, users) => acc + users.length, 0)
        
        const goToPreviousMonth = () => {
          const newDate = new Date(calendarDate)
          newDate.setMonth(newDate.getMonth() - 1)
          setCalendarDate(newDate)
        }
        
        const goToNextMonth = () => {
          const newDate = new Date(calendarDate)
          newDate.setMonth(newDate.getMonth() + 1)
          setCalendarDate(newDate)
        }
        
        return (
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">{getPageTitle(activeSection)}</h1>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Calendario de Valoraciones Pendientes
                </CardTitle>
                <CardDescription>
                  Gestiona y visualiza las valoraciones programadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Navegación del calendario */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      {monthNames[calendarMonth]} {calendarYear}
                    </h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={goToNextMonth}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Calendario */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-7 gap-2 text-center">
                      <div className="font-semibold p-3 text-gray-600">Dom</div>
                      <div className="font-semibold p-3 text-gray-600">Lun</div>
                      <div className="font-semibold p-3 text-gray-600">Mar</div>
                      <div className="font-semibold p-3 text-gray-600">Mié</div>
                      <div className="font-semibold p-3 text-gray-600">Jue</div>
                      <div className="font-semibold p-3 text-gray-600">Vie</div>
                      <div className="font-semibold p-3 text-gray-600">Sáb</div>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {/* Espacios vacíos para los días del mes anterior */}
                      {Array.from({ length: firstDayOfMonth }, (_, i) => (
                        <div key={`empty-${i}`} className="p-4"></div>
                      ))}
                      
                      {/* Días del mes actual */}
                      {Array.from({ length: daysInMonth }, (_, i) => {
                        const day = i + 1
                        const hasPending = Object.keys(currentMonthData).includes(day.toString())
                        const users = currentMonthData[day as keyof typeof currentMonthData] || []
                        
                        return (
                          <div key={day} className="relative group">
                            <button
                              className={`w-full p-4 text-sm rounded-lg border transition-all duration-200 ${
                                hasPending 
                                  ? 'bg-red-50 border-red-200 text-red-700 font-semibold hover:bg-red-100 shadow-sm' 
                                  : 'bg-white border-gray-200 hover:bg-gray-50'
                              }`}
                              onClick={() => {
                                if (hasPending) {
                                  toast.info(`${monthNames[calendarMonth]} ${day}: ${users.length} valoración(es) pendiente(s)`)
                                }
                              }}
                            >
                              <div className="flex flex-col items-center gap-1">
                                <span>{day}</span>
                                {hasPending && (
                                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                )}
                              </div>
                            </button>
                            {hasPending && (
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-3 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap pointer-events-none shadow-lg">
                                <div className="font-semibold mb-2 text-yellow-300">Valoraciones pendientes:</div>
                                <div className="space-y-1">
                                  {users.map((user, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                      <TrendingUp className="h-3 w-3 text-green-400" />
                                      <span>{user.name}</span>
                                    </div>
                                  ))}
                                </div>
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Leyenda */}
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Días con valoraciones pendientes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Info className="h-3 w-3 text-blue-500" />
                      <span className="text-sm text-gray-600">Pasa el mouse para ver detalles</span>
                    </div>
                  </div>

                  {/* Resumen de valoraciones pendientes */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        Resumen de Valoraciones - {monthNames[calendarMonth]} {calendarYear}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                          <span className="font-medium">Total de valoraciones pendientes:</span>
                          <span className="font-bold text-red-600">{totalPendingCurrentMonth}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-blue-50 rounded">
                            <p className="font-semibold text-blue-700">Esta semana</p>
                            <p className="text-lg font-bold text-blue-600">
                              {Math.ceil(totalPendingCurrentMonth * 0.4)}
                            </p>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded">
                            <p className="font-semibold text-green-700">Próxima semana</p>
                            <p className="text-lg font-bold text-green-600">
                              {Math.floor(totalPendingCurrentMonth * 0.6)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Lista detallada de valoraciones por fecha */}
                  {Object.keys(currentMonthData).length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Valoraciones Programadas - Detalles por Fecha
                        </CardTitle>
                        <CardDescription>
                          Lista completa de valoraciones pendientes este mes
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {Object.keys(currentMonthData)
                            .map(Number)
                            .sort((a, b) => a - b)
                            .map((day) => {
                              const dayUsers = currentMonthData[day as keyof typeof currentMonthData]
                              const dayOfWeek = new Date(calendarYear, calendarMonth, day).toLocaleDateString('es-ES', { weekday: 'long' })
                              const capitalizedDayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)
                              
                              return (
                                <div key={day} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                  <div className="flex items-center justify-between mb-3 pb-2 border-b">
                                    <div className="flex items-center gap-3">
                                      <div className="flex flex-col items-center justify-center bg-red-100 rounded-lg p-2 min-w-[60px]">
                                        <span className="text-xs text-red-600 font-medium uppercase">{monthNames[calendarMonth].slice(0, 3)}</span>
                                        <span className="text-2xl font-bold text-red-700">{day}</span>
                                        <span className="text-xs text-red-600">{calendarYear}</span>
                                      </div>
                                      <div>
                                        <h4 className="font-semibold text-gray-900">{capitalizedDayOfWeek}</h4>
                                        <p className="text-sm text-gray-500">
                                          {dayUsers.length} {dayUsers.length === 1 ? 'valoración' : 'valoraciones'} programada{dayUsers.length === 1 ? '' : 's'}
                                        </p>
                                      </div>
                                    </div>
                                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                      {dayUsers.length} cita{dayUsers.length === 1 ? '' : 's'}
                                    </Badge>
                                  </div>
                                  <div className="space-y-2">
                                    {dayUsers.map((user: any, idx: number) => (
                                      <div key={idx} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-md hover:border-green-300 transition-colors">
                                        <div className="flex items-center gap-3">
                                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                            <User className="h-5 w-5 text-green-700" />
                                          </div>
                                          <div>
                                            <p className="font-medium text-gray-900">{user.name}</p>
                                            <p className="text-sm text-gray-500">Valoración programada</p>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <div className="flex items-center gap-1 text-sm font-medium text-green-700 bg-green-50 px-3 py-1 rounded-full">
                                            <Calendar className="h-3 w-3" />
                                            {user.time}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )
                            })}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Mensaje cuando no hay valoraciones */}
                  {Object.keys(currentMonthData).length === 0 && (
                    <Card>
                      <CardContent className="py-8">
                        <div className="text-center text-gray-500">
                          <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                          <p className="font-medium">No hay valoraciones programadas</p>
                          <p className="text-sm">para {monthNames[calendarMonth]} {calendarYear}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'configuracion':
        return (
          <div className="p-6">
            <ConfigurationSettings />
          </div>
        )

      case 'ayuda':
        return (
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">{getPageTitle(activeSection)}</h1>
            </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Centro de Ayuda
              </CardTitle>
              <CardDescription>
                Documentación y preguntas frecuentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">¿Cómo crear un nuevo usuario?</h3>
                  <p className="text-sm text-muted-foreground">
                    Ve a la sección "Clientes" → "Crear cliente" y completa el formulario con la información requerida.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">¿Cómo exportar valoraciones?</h3>
                  <p className="text-sm text-muted-foreground">
                    En "Valoraciones" → "Exportar valoración" puedes seleccionar el formato y rango de fechas.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">¿Cómo añadir ejercicios?</h3>
                  <p className="text-sm text-muted-foreground">
                    Utiliza "Ejercicios" → "Crear ejercicio" para añadir nuevos ejercicios al sistema.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
        )

      case 'politica-datos':
        return (
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">{getPageTitle(activeSection)}</h1>
            </div>
            <Card className="max-w-4xl mx-auto">
              <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="h-6 w-6" />
                  <CardTitle className="text-xl">Política de Tratamiento de Datos</CardTitle>
                </div>
                <CardDescription className="text-green-50">
                  En Combarranquilla cuidamos tus datos personales y garantizamos su seguridad
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Sección 1: Responsable del Tratamiento */}
                <div className="border-l-4 border-green-500 pl-4">
                  <div className="flex items-center gap-2 mb-3">
                    <UserCheck className="h-5 w-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-800">1. Responsable del Tratamiento</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Combarranquilla Centro de Entrenamiento Deportivo</strong> es el responsable del tratamiento de sus datos personales. 
                    Nos comprometemos a cumplir con la normatividad vigente en materia de protección de datos personales, 
                    especialmente la Ley 1581 de 2012 y sus decretos reglamentarios.
                  </p>
                </div>

                {/* Sección 2: Finalidades */}
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-800">2. Finalidades</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    Los datos personales recolectados serán utilizados para:
                  </p>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• Gestión de servicios deportivos y de entrenamiento</li>
                    <li>• Seguimiento médico y nutricional de los clientes</li>
                    <li>• Comunicación sobre programas, eventos y servicios</li>
                    <li>• Facturación y gestión administrativa</li>
                    <li>• Cumplimiento de obligaciones legales</li>
                  </ul>
                </div>

                {/* Sección 3: Datos que se Recogen */}
                <div className="border-l-4 border-purple-500 pl-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Info className="h-5 w-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-800">3. Datos que se Recogen</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    Recolectamos los siguientes tipos de datos:
                  </p>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• Datos de identificación (nombres, documento, fecha de nacimiento)</li>
                    <li>• Datos de contacto (teléfono, email, dirección)</li>
                    <li>• Información médica (EPS, condiciones de salud relevantes)</li>
                    <li>• Datos biométricos y de rendimiento físico</li>
                    <li>• Información de valoraciones deportivas</li>
                  </ul>
                </div>

                {/* Sección 4: Derechos de los clientes*/}
                <div className="border-l-4 border-green-500 pl-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-800">4. Derechos de los clientes</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    Como titular de datos personales, usted tiene derecho a:
                  </p>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• Conocer, actualizar y rectificar sus datos personales</li>
                    <li>• Solicitar prueba de la autorización otorgada</li>
                    <li>• Ser informado sobre el uso de sus datos</li>
                    <li>• Presentar quejas ante la Superintendencia de Industria y Comercio</li>
                    <li>• Revocar la autorización y/o solicitar la supresión del dato</li>
                    <li>• Acceder de forma gratuita a sus datos personales</li>
                  </ul>
                </div>

                {/* Sección 5: Seguridad de los Datos */}
                <div className="border-l-4 border-red-500 pl-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-5 w-5 text-red-600" />
                    <h3 className="text-lg font-semibold text-gray-800">5. Seguridad de los Datos</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Implementamos medidas técnicas, humanas y administrativas necesarias y suficientes para conferir 
                    seguridad a los registros y repositorios electrónicos, evitando su adulteración, pérdida, consulta, 
                    uso o acceso no autorizado o fraudulento. Nuestros sistemas cuentan con protocolos de encriptación 
                    y acceso controlado.
                  </p>
                </div>

                {/* Sección 6: Contacto */}
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-800">6. Contacto</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Para ejercer sus derechos o resolver dudas sobre el tratamiento de sus datos personales, 
                    puede contactarnos a través de:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-600" />
                      <span className="text-gray-700">datos@combarranquilla.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-600" />
                      <span className="text-gray-700">+57 (5) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-gray-600" />
                      <span className="text-gray-700">Oficina de Atención al cliente- Barranquilla, Colombia</span>
                    </div>
                  </div>
                </div>

                {/* Fecha de actualización */}
                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Última actualización: Enero 2024 - Versión 1.0
                  </p>
                </div>
              </CardContent>
              
              {/* Botón de aceptación fijo */}
              <div className="bg-gray-50 px-6 py-4 rounded-b-lg border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={() => window.history.back()}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Atrás
                  </Button>
                  <Button 
                    className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                    onClick={() => {
                      toast.success("Has aceptado la Política de Tratamiento de Datos")
                    }}
                  >
                    <CheckCircle className="h-4 w-4" />
                    He leído y acepto
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )

      case 'perfil':
        return (
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">{getPageTitle(activeSection)}</h1>
            </div>
            
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Información del Cliente*/}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-green-700" />
                    Información del Cliente
                  </CardTitle>
                  <CardDescription>
                    Detalles de la cuenta actualmente autenticada
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">Cliente</Label>
                      <div className="p-3 bg-gray-50 rounded-md">
                        <span className="text-gray-800">{user.username}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">Nombre completo</Label>
                      <div className="p-3 bg-gray-50 rounded-md">
                        <span className="text-gray-800">{user.name}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">Email</Label>
                      <div className="p-3 bg-gray-50 rounded-md">
                        <span className="text-gray-800">{user.email}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">Rol</Label>
                      <div className="p-3 bg-gray-50 rounded-md">
                        <Badge className="bg-green-100 text-green-800">{user.role}</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Acciones de Perfil */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-green-700" />
                    Acciones del Perfil
                  </CardTitle>
                  <CardDescription>
                    Gestiona tu cuenta y sesión
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      className="h-20 flex flex-col items-center justify-center gap-2"
                      onClick={() => setShowPasswordDialog(true)}
                    >
                      <Settings className="h-5 w-5" />
                      <span>Cambiar Contraseña</span>
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="h-20 flex flex-col items-center justify-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <LogOut className="h-5 w-5" />
                          <span>Cerrar Sesión</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirmar cierre de sesión</AlertDialogTitle>
                          <AlertDialogDescription>
                            ¿Estás seguro que deseas cerrar sesión? Tendrás que volver a ingresar tus credenciales para acceder al sistema.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => {
                              logout()
                              toast.success("Sesión cerrada exitosamente")
                            }}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Cerrar Sesión
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>

              {/* Información de Sesión */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-green-700" />
                    Información de Sesión
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Permisos actuales:</span>
                      <span className="text-gray-800">Administrador completo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ubicación:</span>
                      <span className="text-gray-800">Combarranquilla Centro</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 'ver-valoracion-detalle':
        if (!currentValoracion) return null
        return (
          <div className="p-6 bg-gray-50 min-h-full">
            <div className="mb-6 flex items-center gap-4">
              <Button
                variant="outline"
                onClick={handleBackToValoracionList}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver a la lista
              </Button>
              <h1 className="text-2xl font-semibold text-gray-800">{getPageTitle(internalActiveSection)}</h1>
              <div className="ml-auto flex items-center gap-2">
                <Button
                  onClick={() => handleExportValoracionDirect(currentValoracion)}
                  className="bg-green-700 hover:bg-green-800 text-white"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Exportar
                </Button>
                <Button
                  onClick={() => handleEditValoracionComplete(currentValoracion)}
                  variant="outline"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm space-y-6 p-6">

              {/* Información Personal */}
              <div>
                <div className="bg-green-700 text-white p-3 rounded-t-xl">
                  <h2 className="text-lg">Información personal</h2>
                </div>
                <div className="bg-white border border-gray-200 rounded-b-xl p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="mb-4" htmlFor="nombres-view">Nombres</Label>
                      <div className="p-3 bg-gray-50 rounded-md border">
                        {currentValoracion.usuario.split(' ')[0] || 'N/A'}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="mb-4" htmlFor="apellidos-view">Apellidos</Label>
                      <div className="p-3 bg-gray-50 rounded-md border">
                        {currentValoracion.usuario.split(' ').slice(1).join(' ') || 'N/A'}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="mb-4" htmlFor="documento-view">Documento</Label>
                      <div className="p-3 bg-gray-50 rounded-md border">
                        {currentValoracion.documento || 'CC: 1234567890'}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="mb-4" htmlFor="telefono-view">Teléfono</Label>
                      <div className="p-3 bg-gray-50 rounded-md border">
                        {currentValoracion.telefono || '+57 300 123 4567'}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="mb-4" htmlFor="direccion-view">Dirección</Label>
                      <div className="p-3 bg-gray-50 rounded-md border">
                        {currentValoracion.direccion || 'Calle 123 #45-67'}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="mb-4" htmlFor="email-view">E-mail</Label>
                      <div className="p-3 bg-gray-50 rounded-md border">
                        {currentValoracion.email || 'cliente@email.com'}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="mb-4" htmlFor="ocupacion-view">Ocupación</Label>
                      <div className="p-3 bg-gray-50 rounded-md border">
                        Ingeniero
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="mb-4" htmlFor="eps-view">EPS</Label>
                      <div className="p-3 bg-gray-50 rounded-md border">
                        {currentValoracion.eps || 'Nueva EPS'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cuestionario Inicial */}
              <div>
                <div className="bg-green-700 text-white p-3 rounded-t-xl">
                  <h2 className="text-lg">Cuestionario Inicial</h2>
                </div>
                <div className="bg-white border border-gray-200 rounded-b-xl p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-medium">¿Ha realizado ejercicio en gimnasio anteriormente?</Label>
                      <div className="p-3 bg-gray-50 rounded-md border">
                        Sí, durante 2 años en otro gimnasio
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-medium">¿Actualmente realiza alguna actividad física?</Label>
                      <div className="p-3 bg-gray-50 rounded-md border">
                        Camino 3 veces por semana
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-medium">¿Sedentario?</Label>
                      <div className="p-3 bg-gray-50 rounded-md border">
                        Parcialmente
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-medium">Frecuencia</Label>
                      <div className="p-3 bg-gray-50 rounded-md border">
                        3-4 veces por semana
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Signos vitales */}
              <div>
                <div className="bg-green-700 text-white p-3 rounded-t-xl">
                  <h2 className="text-lg">Signos vitales</h2>
                </div>
                <div className="bg-white border border-gray-200 rounded-b-xl p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label className="mb-4" htmlFor="fc-view">FC</Label>
                      <div className="p-3 bg-gray-50 rounded-md border">
                        72 bpm
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="mb-4" htmlFor="fr-view">FR</Label>
                      <div className="p-3 bg-gray-50 rounded-md border">
                        16 rpm
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="mb-4" htmlFor="ta-view">T/A</Label>
                      <div className="p-3 bg-gray-50 rounded-md border">
                        120/80 mmHg
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="mb-4" htmlFor="fcmax-view">FC/MAX</Label>
                      <div className="p-3 bg-gray-50 rounded-md border">
                        190 bpm
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Factores de riesgo */}
              <div>
                <div className="bg-green-700 text-white p-3 rounded-t-xl">
                  <h2 className="text-lg">Factores de riesgo</h2>
                </div>
                <div className="bg-white border border-gray-200 rounded-b-xl p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Columna izquierda */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-4 h-4 rounded border bg-gray-300"></div>
                          <Label className="font-semibold">Cardiovascular</Label>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-md border min-h-[80px]">
                          Sin antecedentes cardiovasculares
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-4 h-4 rounded border bg-gray-300"></div>
                          <Label className="font-semibold">Osteomuscular</Label>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-md border min-h-[80px]">
                          Dolor lumbar ocasional
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-4 h-4 rounded border bg-gray-300"></div>
                          <Label className="font-semibold">Metabólico</Label>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-md border min-h-[80px]">
                          Sin alteraciones metabólicas
                        </div>
                      </div>
                    </div>

                    {/* Columna derecha */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-4 h-4 rounded border bg-gray-300"></div>
                          <Label className="font-semibold">Otros</Label>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-md border min-h-[80px]">
                          Ninguno
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-4 h-4 rounded border bg-green-500"></div>
                          <Label className="font-semibold">Antecedentes Médicos</Label>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-md border min-h-[80px]">
                          Apendicitis hace 5 años
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-4 h-4 rounded border bg-gray-300"></div>
                          <Label className="font-semibold">Antecedentes Familiares</Label>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-md border min-h-[80px]">
                          Diabetes tipo 2 (padre)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Antropometría */}
              <div>
                <div className="bg-green-700 text-white p-3 rounded-t-xl">
                  <h2 className="text-lg">Antropometría</h2>
                </div>
                <div className="bg-white border border-gray-200 rounded-b-xl p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Columna 1 */}
                    <div className="space-y-3">
                      <div>
                        <Label className="mb-4">Peso</Label>
                        <div className="p-3 bg-gray-50 rounded-md border">75 kg</div>
                      </div>
                      <div>
                        <Label className="mb-4">Talla</Label>
                        <div className="p-3 bg-gray-50 rounded-md border">1.75 m</div>
                      </div>
                      <div>
                        <Label className="mb-4">IMC</Label>
                        <div className="p-3 bg-gray-50 rounded-md border">24.5</div>
                      </div>
                      <div>
                        <Label className="mb-4">Res. Peso</Label>
                        <div className="p-3 bg-gray-50 rounded-md border">N/A</div>
                      </div>
                      <div>
                        <Label className="mb-2 block">Tipo de peso</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded-full border bg-gray-300"></div>
                            <Label>Bajopeso</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded-full border bg-green-500"></div>
                            <Label>Normal</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded-full border bg-gray-300"></div>
                            <Label>Sobrepeso</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded-full border bg-gray-300"></div>
                            <Label>Obesidad</Label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Columna 2 */}
                    <div className="space-y-3">
                      <div>
                        <Label className="mb-4">Grasa Corporal</Label>
                        <div className="p-3 bg-gray-50 rounded-md border">15%</div>
                      </div>
                      <div>
                        <Label className="mb-4">Grasa Visceral</Label>
                        <div className="p-3 bg-gray-50 rounded-md border">8</div>
                      </div>
                      <div>
                        <Label className="mb-4">ICC</Label>
                        <div className="p-3 bg-gray-50 rounded-md border">0.85</div>
                      </div>
                      <div>
                        <Label className="mb-4">Riesgo Cardiovascular</Label>
                        <div className="p-3 bg-gray-50 rounded-md border">Bajo</div>
                      </div>
                      <div>
                        <Label className="mb-4">Kcal</Label>
                        <div className="p-3 bg-gray-50 rounded-md border">2200</div>
                      </div>
                      <div>
                        <Label className="mb-4">% Muscular</Label>
                        <div className="p-3 bg-gray-50 rounded-md border">42%</div>
                      </div>
                      <div>
                        <Label className="mb-4">Edad Metabólica</Label>
                        <div className="p-3 bg-gray-50 rounded-md border">28 años</div>
                      </div>
                    </div>

                    {/* Columna 3 */}
                    <div className="space-y-3">
                      <div>
                        <Label className="mb-2 block">Tipo de Obesidad</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded-full border bg-gray-300"></div>
                            <Label>Ginoide</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded-full border bg-green-500"></div>
                            <Label>Androide</Label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label className="mb-4">RCA</Label>
                        <div className="p-3 bg-gray-50 rounded-md border">0.45</div>
                      </div>
                      <div>
                        <Label className="mb-4">*Niños</Label>
                        <div className="p-3 bg-gray-50 rounded-md border">N/A</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mediciones físicas */}
              <div>
                <div className="bg-green-700 text-white p-3 rounded-t-xl w-full">
                  <h2 className="text-lg">Mediciones físicas</h2>
                </div>
                <div className="bg-white border border-gray-200 rounded-b-xl p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Columna izquierda */}
                    <div className="space-y-3">
                      <div>
                        <Label className="mb-4">Muslo D</Label>
                        <div className="p-3 bg-gray-50 rounded-md border">58 cm</div>
                      </div>
                      <div>
                        <Label className="mb-4">Brazo D</Label>
                        <div className="p-3 bg-gray-50 rounded-md border">32 cm</div>
                      </div>
                      <div>
                        <Label className="mb-4">Pierna D</Label>
                        <div className="p-3 bg-gray-50 rounded-md border">38 cm</div>
                      </div>
                      <div>
                        <Label className="mb-4">Abdomen</Label>
                        <div className="p-3 bg-gray-50 rounded-md border">82 cm</div>
                      </div>
                      <div>
                        <Label className="mb-4">Hombros</Label>
                        <div className="p-3 bg-gray-50 rounded-md border">115 cm</div>
                      </div>
                      <div>
                        <Label className="mb-4">Cintura</Label>
                        <div className="p-3 bg-gray-50 rounded-md border">78 cm</div>
                      </div>
                    </div>

                    {/* Columna derecha */}
                    <div className="space-y-3">
                      <div>
                        <Label className="mb-4">Muslo I</Label>
                        <div className="p-3 bg-gray-50 rounded-md border">57 cm</div>
                      </div>
                      <div>
                        <Label className="mb-4">Brazo I</Label>
                        <div className="p-3 bg-gray-50 rounded-md border">31 cm</div>
                      </div>
                      <div>
                        <Label className="mb-4">Pierna I</Label>
                        <div className="p-3 bg-gray-50 rounded-md border">37 cm</div>
                      </div>
                      <div>
                        <Label className="mb-4">Cadera</Label>
                        <div className="p-3 bg-gray-50 rounded-md border">95 cm</div>
                      </div>
                      <div>
                        <Label className="mb-4">Pecho</Label>
                        <div className="p-3 bg-gray-50 rounded-md border">102 cm</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Entrenamiento */}
              <div>
                <div className="bg-green-700 text-white p-3 rounded-t-xl">
                  <h2 className="text-lg">Entrenamiento</h2>
                </div>
                <div className="bg-white border border-gray-200 rounded-b-xl p-4">
                  {/* Nivel entrenamiento */}
                  <h3 className="text-center text-green-800 font-semibold mb-4">Nivel Entrenamiento</h3>
                  <div className="flex justify-center mb-6">
                    <div className="flex gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border bg-gray-300"></div>
                        <Label>Inicial</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border bg-green-500"></div>
                        <Label>Intermedio</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border bg-gray-300"></div>
                        <Label>Avanzado</Label>
                      </div>
                    </div>
                  </div>

                  <hr className="border-dashed border-green-800 mb-6" />

                  {/* Grid principal */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Frecuencia semanal */}
                    <div>
                      <h4 className="text-green-800 font-semibold mb-2">Frecuencia Semanal</h4>
                      <div className="p-3 bg-gray-50 rounded-md border">
                        Tres veces
                      </div>
                    </div>

                    {/* Objetivos */}
                    <div>
                      <h4 className="text-green-800 font-semibold mb-2">Objetivos</h4>
                      <div className="space-y-2">
                        <div>
                          <Label>Peso Saludable</Label>
                          <div className="p-2 bg-gray-50 rounded-md border text-sm">Sí</div>
                        </div>
                        <div>
                          <Label>Salud</Label>
                          <div className="p-2 bg-gray-50 rounded-md border text-sm">Mejorar condición física</div>
                        </div>
                        <div>
                          <Label>Dism. % Graso</Label>
                          <div className="p-2 bg-gray-50 rounded-md border text-sm">5%</div>
                        </div>
                        <div>
                          <Label>Acond. Físico</Label>
                          <div className="p-2 bg-gray-50 rounded-md border text-sm">Aumentar resistencia</div>
                        </div>
                        <div>
                          <Label>Fitness</Label>
                          <div className="p-2 bg-gray-50 rounded-md border text-sm">Tonificar</div>
                        </div>
                        <div>
                          <Label>Des. Muscular</Label>
                          <div className="p-2 bg-gray-50 rounded-md border text-sm">Moderado</div>
                        </div>
                      </div>
                    </div>

                    {/* Entrenamiento grupal */}
                    <div>
                      <h4 className="text-green-800 font-semibold mb-2">Entrenamiento Grupal</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded border bg-gray-300"></div>
                          <Label className="text-sm">Rumba</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded border bg-green-500"></div>
                          <Label className="text-sm">Body Pump</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded border bg-green-500"></div>
                          <Label className="text-sm">Core</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded border bg-gray-300"></div>
                          <Label className="text-sm">Body Combat</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded border bg-gray-300"></div>
                          <Label className="text-sm">Yoga</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded border bg-gray-300"></div>
                          <Label className="text-sm">Body Attack</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded border bg-gray-300"></div>
                          <Label className="text-sm">Hidrogimnasia</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded border bg-green-500"></div>
                          <Label className="text-sm">Ent. Funcional</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded border bg-gray-300"></div>
                          <Label className="text-sm">Spinning</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded border bg-gray-300"></div>
                          <Label className="text-sm">Zumba</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded border bg-gray-300"></div>
                          <Label className="text-sm">Yoga-pilates</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded border bg-gray-300"></div>
                          <Label className="text-sm">TRX</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comentarios */}
              <div>
                <div className="bg-green-700 text-white p-3 rounded-t-xl">
                  <h2 className="text-lg">Comentarios y Observaciones</h2>
                </div>
                <div className="bg-white border border-gray-200 rounded-b-xl p-4">
                  <div className="p-4 bg-gray-50 rounded-md border min-h-[100px]">
                    {currentValoracion.comentario}
                  </div>
                </div>
              </div>

              {/* Fecha de valoración */}
              <div>
                <div className="bg-green-700 text-white p-3 rounded-t-xl">
                  <h2 className="text-lg">Información de la Valoración</h2>
                </div>
                <div className="bg-white border border-gray-200 rounded-b-xl p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-2 block">Fecha de Valoración</Label>
                      <div className="p-3 bg-gray-50 rounded-md border">
                        {currentValoracion.fecha}
                      </div>
                    </div>
                    <div>
                      <Label className="mb-2 block">Estado</Label>
                      <div className="p-3 bg-gray-50 rounded-md border">
                        <Badge className="bg-green-100 text-green-800">Completa</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'editar-valoracion-detalle':
        if (!currentValoracion) return null
        return (
          <div className="p-6 bg-gray-50 min-h-full">
            <div className="mb-6 flex items-center gap-4">
              <Button
                variant="outline"
                onClick={handleBackToValoracionList}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver a la lista
              </Button>
              <h1 className="text-2xl font-semibold text-gray-800">{getPageTitle(internalActiveSection)}</h1>
            </div>
            <div className="bg-white rounded-xl shadow-sm space-y-6 p-6">

              {/* Información Personal */}
              <div>
                <div className="bg-green-700 text-white p-3 rounded-t-xl">
                  <h2 className="text-lg">Información personal</h2>
                </div>
                <div className="bg-white border border-gray-200 rounded-b-xl p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="mb-4" htmlFor="nombres-edit">Nombres</Label>
                      <Input 
                        id="nombres-edit" 
                        value={currentValoracion?.usuario?.split(' ')[0] || ''}
                        onChange={(e) => {
                          const apellidos = currentValoracion?.usuario?.split(' ').slice(1).join(' ') || ''
                          setCurrentValoracion({...currentValoracion, usuario: `${e.target.value} ${apellidos}`})
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="mb-4" htmlFor="apellidos-edit">Apellidos</Label>
                      <Input 
                        id="apellidos-edit" 
                        value={currentValoracion?.usuario?.split(' ').slice(1).join(' ') || ''}
                        onChange={(e) => {
                          const nombres = currentValoracion?.usuario?.split(' ')[0] || ''
                          setCurrentValoracion({...currentValoracion, usuario: `${nombres} ${e.target.value}`})
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="mb-4" htmlFor="documento-edit">Documento</Label>
                      <Input 
                        id="documento-edit" 
                        value={currentValoracion?.documento || ''}
                        onChange={(e) => setCurrentValoracion({...currentValoracion, documento: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="mb-4" htmlFor="telefono-edit">Teléfono</Label>
                      <Input 
                        id="telefono-edit" 
                        value={currentValoracion?.telefono || ''}
                        onChange={(e) => setCurrentValoracion({...currentValoracion, telefono: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="mb-4" htmlFor="direccion-edit">Dirección</Label>
                      <Input 
                        id="direccion-edit" 
                        value={currentValoracion?.direccion || ''}
                        onChange={(e) => setCurrentValoracion({...currentValoracion, direccion: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="mb-4" htmlFor="email-edit">E-mail</Label>
                      <Input 
                        id="email-edit" 
                        value={currentValoracion?.email || ''}
                        onChange={(e) => setCurrentValoracion({...currentValoracion, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="mb-4" htmlFor="ocupacion-edit">Ocupación</Label>
                      <Input 
                        id="ocupacion-edit" 
                        placeholder="Ocupación"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="mb-4" htmlFor="eps-edit">EPS</Label>
                      <EPSCombobox
                        value={currentValoracion?.eps || ''}
                        onChange={(value) => setCurrentValoracion({...currentValoracion, eps: value})}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Cuestionario Inicial */}
              <div>
                <div className="bg-green-700 text-white p-3 rounded-t-xl">
                  <h2 className="text-lg">Cuestionario Inicial</h2>
                </div>
                <div className="bg-white border border-gray-200 rounded-b-xl p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 mb-2">
                        <Checkbox id="ejercicio-anterior-edit" />
                        <Label htmlFor="ejercicio-anterior-edit" className="font-medium">Ha realizado ejercicio en un gimnasio anteriormente?</Label>
                      </div>
                      <Textarea 
                        id="ejercicio-anterior-text-edit" 
                        rows={3} 
                        placeholder="Ingrese detalles..."
                        defaultValue="Sí, durante 2 años en otro gimnasio"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 mb-2">
                        <Checkbox id="actividad-actual-edit" />
                        <Label htmlFor="actividad-actual-edit" className="font-medium">Actualmente realiza alguna actividad física?</Label>
                      </div>
                      <Textarea 
                        id="actividad-actual-text-edit" 
                        rows={3} 
                        placeholder="Ingrese detalles..."
                        defaultValue="Camino 3 veces por semana"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 mb-2">
                        <Checkbox id="sedentario-edit" />
                        <Label htmlFor="sedentario-edit" className="font-medium">Sedentario?</Label>
                      </div>
                      <Textarea 
                        id="sedentario-text-edit" 
                        rows={3} 
                        placeholder="Ingrese detalles..."
                        defaultValue="Parcialmente"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 mb-2">
                        <Checkbox id="frecuencia-edit" />
                        <Label htmlFor="frecuencia-edit" className="font-medium">Frecuencia</Label>
                      </div>
                      <Textarea 
                        id="frecuencia-text-edit" 
                        rows={3} 
                        placeholder="Ingrese detalles..."
                        defaultValue="3-4 veces por semana"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Signos vitales */}
              <div>
                <div className="bg-green-700 text-white p-3 rounded-t-xl">
                  <h2 className="text-lg">Signos vitales</h2>
                </div>
                <div className="bg-white border border-gray-200 rounded-b-xl p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label className="mb-4" htmlFor="fc-edit">FC</Label>
                      <Input id="fc-edit" type="number" defaultValue="72" />
                    </div>
                    <div className="space-y-2">
                      <Label className="mb-4" htmlFor="fr-edit">FR</Label>
                      <Input id="fr-edit" type="number" defaultValue="16" />
                    </div>
                    <div className="space-y-2">
                      <Label className="mb-4" htmlFor="ta-edit">T/A</Label>
                      <Input id="ta-edit" defaultValue="120/80" />
                    </div>
                    <div className="space-y-2">
                      <Label className="mb-4" htmlFor="fcmax-edit">FC/MAX</Label>
                      <Input id="fcmax-edit" type="number" defaultValue="190" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Factores de riesgo */}
              <div>
                <div className="bg-green-700 text-white p-3 rounded-t-xl">
                  <h2 className="text-lg">Factores de riesgo</h2>
                </div>
                <div className="bg-white border border-gray-200 rounded-b-xl p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Columna izquierda */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Checkbox id="cardiovascular-edit" />
                          <Label htmlFor="cardiovascular-edit" className="font-semibold">Cardiovascular</Label>
                        </div>
                        <Textarea 
                          placeholder="Observaciones..." 
                          rows={3}
                          defaultValue="Sin antecedentes cardiovasculares"
                        />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Checkbox id="osteomuscular-edit" />
                          <Label htmlFor="osteomuscular-edit" className="font-semibold">Osteomuscular</Label>
                        </div>
                        <Textarea 
                          placeholder="Observaciones..." 
                          rows={3}
                          defaultValue="Dolor lumbar ocasional"
                        />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Checkbox id="metabolico-edit" />
                          <Label htmlFor="metabolico-edit" className="font-semibold">Metabólico</Label>
                        </div>
                        <Textarea 
                          placeholder="Observaciones..." 
                          rows={3}
                          defaultValue="Sin alteraciones metabólicas"
                        />
                      </div>
                    </div>

                    {/* Columna derecha */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Checkbox id="otros-edit" />
                          <Label htmlFor="otros-edit" className="font-semibold">Otros</Label>
                        </div>
                        <Textarea 
                          placeholder="Observaciones..." 
                          rows={3}
                          defaultValue="Ninguno"
                        />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Checkbox id="antecedentesMedicos-edit" defaultChecked />
                          <Label htmlFor="antecedentesMedicos-edit" className="font-semibold">Antecedentes Médicos</Label>
                        </div>
                        <Textarea 
                          placeholder="Observaciones..." 
                          rows={3}
                          defaultValue="Apendicitis hace 5 años"
                        />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Checkbox id="antecedentesFamiliares-edit" />
                          <Label htmlFor="antecedentesFamiliares-edit" className="font-semibold">Antecedentes Familiares</Label>
                        </div>
                        <Textarea 
                          placeholder="Observaciones..." 
                          rows={3}
                          defaultValue="Diabetes tipo 2 (padre)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Antropometría */}
              <div>
                <div className="bg-green-700 text-white p-3 rounded-t-xl">
                  <h2 className="text-lg">Antropometría</h2>
                </div>
                <div className="bg-white border border-gray-200 rounded-b-xl p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Columna 1 */}
                    <div className="space-y-3">
                      <div>
                        <Label className="mb-4" htmlFor="peso-edit">Peso</Label>
                        <Input id="peso-edit" defaultValue="75" />
                      </div>
                      <div>
                        <Label className="mb-4" htmlFor="talla-edit">Talla</Label>
                        <Input id="talla-edit" defaultValue="1.75" />
                      </div>
                      <div>
                        <Label className="mb-4" htmlFor="imc-edit">IMC</Label>
                        <Input id="imc-edit" defaultValue="24.5" />
                      </div>
                      <div>
                        <Label className="mb-4" htmlFor="resPeso-edit">Res. Peso</Label>
                        <Input id="resPeso-edit" />
                      </div>

                      {/* Tipo de peso - selección exclusiva */}
                      <div>
                        <Label className="mb-2 block">Tipo de peso</Label>
                        <RadioGroup defaultValue="normal">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="bajopeso" id="bajopeso-edit" />
                            <Label htmlFor="bajopeso-edit">Bajopeso</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="normal" id="normal-edit" />
                            <Label htmlFor="normal-edit">Normal</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="sobrepeso" id="sobrepeso-edit" />
                            <Label htmlFor="sobrepeso-edit">Sobrepeso</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="obesidad" id="obesidad-edit" />
                            <Label htmlFor="obesidad-edit">Obesidad</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    {/* Columna 2 */}
                    <div className="space-y-3">
                      <div>
                        <Label className="mb-4" htmlFor="grasaCorporal-edit">Grasa Corporal</Label>
                        <Input id="grasaCorporal-edit" defaultValue="15" />
                      </div>
                      <div>
                        <Label className="mb-4" htmlFor="grasaVisceral-edit">Grasa Visceral</Label>
                        <Input id="grasaVisceral-edit" defaultValue="8" />
                      </div>
                      <div>
                        <Label className="mb-4" htmlFor="icc-edit">ICC</Label>
                        <Input id="icc-edit" defaultValue="0.85" />
                      </div>
                      <div>
                        <Label className="mb-4" htmlFor="riesgoCV-edit">Riesgo Cardiovascular</Label>
                        <Input id="riesgoCV-edit" defaultValue="Bajo" />
                      </div>
                      <div>
                        <Label className="mb-4" htmlFor="kcal-edit">Kcal</Label>
                        <Input id="kcal-edit" defaultValue="2200" />
                      </div>
                      <div>
                        <Label className="mb-4" htmlFor="muscular-edit">% Muscular</Label>
                        <Input id="muscular-edit" defaultValue="42" />
                      </div>
                      <div>
                        <Label className="mb-4" htmlFor="edadMetabolica-edit">Edad Metabólica</Label>
                        <Input id="edadMetabolica-edit" defaultValue="28" />
                      </div>
                    </div>

                    {/* Columna 3 */}
                    <div className="space-y-3">
                      <div>
                        <Label className="mb-2 block">Tipo de Obesidad</Label>
                        <RadioGroup defaultValue="androide">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="ginoide" id="ginoide-edit" />
                            <Label htmlFor="ginoide-edit">Ginoide</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="androide" id="androide-edit" />
                            <Label htmlFor="androide-edit">Androide</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div>
                        <Label className="mb-4" htmlFor="rca-edit">RCA</Label>
                        <Input id="rca-edit" defaultValue="0.45" />
                      </div>
                      <div>
                        <Label className="mb-4" htmlFor="ninos-edit">*Niños</Label>
                        <Input id="ninos-edit" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mediciones físicas */}
              <div>
                <div className="bg-green-700 text-white p-3 rounded-t-xl w-full">
                  <h2 className="text-lg">Mediciones físicas</h2>
                </div>
                <div className="bg-white border border-gray-200 rounded-b-xl p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Columna izquierda */}
                    <div className="space-y-3">
                      <div>
                        <Label className="mb-4" htmlFor="musloD-edit">Muslo D</Label>
                        <Input id="musloD-edit" defaultValue="58" />
                      </div>
                      <div>
                        <Label className="mb-4" htmlFor="brazoD-edit">Brazo D</Label>
                        <Input id="brazoD-edit" defaultValue="32" />
                      </div>
                      <div>
                        <Label className="mb-4" htmlFor="piernaD-edit">Pierna D</Label>
                        <Input id="piernaD-edit" defaultValue="38" />
                      </div>
                      <div>
                        <Label className="mb-4" htmlFor="abdomen-edit">Abdomen</Label>
                        <Input id="abdomen-edit" defaultValue="82" />
                      </div>
                      <div>
                        <Label className="mb-4" htmlFor="hombros-edit">Hombros</Label>
                        <Input id="hombros-edit" defaultValue="115" />
                      </div>
                      <div>
                        <Label className="mb-4" htmlFor="cintura-edit">Cintura</Label>
                        <Input id="cintura-edit" defaultValue="78" />
                      </div>
                    </div>

                    {/* Columna derecha */}
                    <div className="space-y-3">
                      <div>
                        <Label className="mb-4" htmlFor="musloI-edit">Muslo I</Label>
                        <Input id="musloI-edit" defaultValue="57" />
                      </div>
                      <div>
                        <Label className="mb-4" htmlFor="brazoI-edit">Brazo I</Label>
                        <Input id="brazoI-edit" defaultValue="31" />
                      </div>
                      <div>
                        <Label className="mb-4" htmlFor="piernaI-edit">Pierna I</Label>
                        <Input id="piernaI-edit" defaultValue="37" />
                      </div>
                      <div>
                        <Label className="mb-4" htmlFor="cadera-edit">Cadera</Label>
                        <Input id="cadera-edit" defaultValue="95" />
                      </div>
                      <div>
                        <Label className="mb-4" htmlFor="pecho-edit">Pecho</Label>
                        <Input id="pecho-edit" defaultValue="102" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Entrenamiento */}
              <div>
                <div className="bg-green-700 text-white p-3 rounded-t-xl">
                  <h2 className="text-lg">Entrenamiento</h2>
                </div>
                <div className="bg-white border border-gray-200 rounded-b-xl p-4">
                  {/* Nivel entrenamiento */}
                  <h3 className="text-center text-green-800 font-semibold mb-4">Nivel Entrenamiento</h3>
                  <div className="flex justify-center mb-6">
                    <RadioGroup defaultValue="intermedio" className="flex gap-6">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="inicial" id="inicial-edit" />
                        <Label htmlFor="inicial-edit">Inicial</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="intermedio" id="intermedio-edit" />
                        <Label htmlFor="intermedio-edit">Intermedio</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="avanzado" id="avanzado-edit" />
                        <Label htmlFor="avanzado-edit">Avanzado</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <hr className="border-dashed border-green-800 mb-6" />

                  {/* Grid principal */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Frecuencia semanal */}
                    <div>
                      <h4 className="text-green-800 font-semibold mb-2">Frecuencia Semanal</h4>
                      <select className="w-full border border-gray-300 rounded-md p-2" defaultValue="Tres veces">
                        <option>Una vez</option>
                        <option>Dos veces</option>
                        <option>Tres veces</option>
                        <option>Cuatro veces</option>
                        <option>Cinco veces</option>
                        <option>Seis veces</option>
                        <option>Siete veces</option>
                      </select>
                    </div>

                    {/* Objetivos */}
                    <div>
                      <h4 className="text-green-800 font-semibold mb-2">Objetivos</h4>
                      <div className="space-y-2">
                        <div>
                          <Label htmlFor="pesoSalud-edit">Peso Saludable</Label>
                          <Input id="pesoSalud-edit" defaultValue="Sí" />
                        </div>
                        <div>
                          <Label htmlFor="salud-edit">Salud</Label>
                          <Input id="salud-edit" defaultValue="Mejorar condición física" />
                        </div>
                        <div>
                          <Label htmlFor="dismGraso-edit">Dism. % Graso</Label>
                          <Input id="dismGraso-edit" defaultValue="5%" />
                        </div>
                        <div>
                          <Label htmlFor="acondFisico-edit">Acond. Físico</Label>
                          <Input id="acondFisico-edit" defaultValue="Aumentar resistencia" />
                        </div>
                        <div>
                          <Label htmlFor="fitness-edit">Fitness</Label>
                          <Input id="fitness-edit" defaultValue="Tonificar" />
                        </div>
                        <div>
                          <Label htmlFor="desMuscular-edit">Des. Muscular</Label>
                          <Input id="desMuscular-edit" defaultValue="Moderado" />
                        </div>
                      </div>
                    </div>

                    {/* Entrenamiento grupal */}
                    <div>
                      <h4 className="text-green-800 font-semibold mb-2">Entrenamiento Grupal</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2">
                          <Checkbox id="rumba-edit" />
                          <Label htmlFor="rumba-edit">Rumba</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="bodyPump-edit" defaultChecked />
                          <Label htmlFor="bodyPump-edit">Body Pump</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="core-edit" defaultChecked />
                          <Label htmlFor="core-edit">Core</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="bodyCombat-edit" />
                          <Label htmlFor="bodyCombat-edit">Body Combat</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="yoga-edit" />
                          <Label htmlFor="yoga-edit">Yoga</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="bodyAttack-edit" />
                          <Label htmlFor="bodyAttack-edit">Body Attack</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="hidrogimnasia-edit" />
                          <Label htmlFor="hidrogimnasia-edit">Hidrogimnasia</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="entFuncional-edit" defaultChecked />
                          <Label htmlFor="entFuncional-edit">Ent. Funcional</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="spinning-edit" />
                          <Label htmlFor="spinning-edit">Spinning</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="zumba-edit" />
                          <Label htmlFor="zumba-edit">Zumba</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="yogaPilates-edit" />
                          <Label htmlFor="yogaPilates-edit">Yoga-pilates</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="trx-edit" />
                          <Label htmlFor="trx-edit">TRX</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comentarios */}
              <div>
                <div className="bg-green-700 text-white p-3 rounded-t-xl">
                  <h2 className="text-lg">Comentarios y Observaciones</h2>
                </div>
                <div className="bg-white border border-gray-200 rounded-b-xl p-4">
                  <Textarea
                    value={currentValoracion.comentario}
                    onChange={(e) => setCurrentValoracion({...currentValoracion, comentario: e.target.value})}
                    rows={4}
                    placeholder="Ingrese comentarios y observaciones..."
                  />
                </div>
              </div>

              {/* Fecha de valoración */}
              <div>
                <div className="bg-green-700 text-white p-3 rounded-t-xl">
                  <h2 className="text-lg">Información de la Valoración</h2>
                </div>
                <div className="bg-white border border-gray-200 rounded-b-xl p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-2 block">Fecha de Valoración</Label>
                      <Input
                        type="date"
                        value={currentValoracion.fecha}
                        onChange={(e) => setCurrentValoracion({...currentValoracion, fecha: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block">Estado</Label>
                      <div className="p-3 bg-gray-50 rounded-md border">
                        <Badge className="bg-green-100 text-green-800">Completa</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-4 pt-6">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="bg-green-700 hover:bg-green-800">
                      Guardar cambios
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmar cambios</AlertDialogTitle>
                      <AlertDialogDescription>
                        ¿Está seguro que desea guardar los cambios realizados en esta valoración?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleSaveEditedValoracionComplete}
                        className="bg-green-700 hover:bg-green-800"
                      >
                        Confirmar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button variant="outline" onClick={handleBackToValoracionList}>
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="p-6">
          <Card>
            <CardHeader>
              <CardTitle>Bienvenido al Panel de Administración</CardTitle>
              <CardDescription>
                Selecciona una opción del menú lateral para comenzar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <Users className="h-8 w-8 text-blue-600 mb-2" />
                  <h3 className="font-semibold">Gestión de Usuarios</h3>
                  <p className="text-sm text-muted-foreground">Crea y administra usuarios del sistema</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <ClipboardList className="h-8 w-8 text-blue-600 mb-2" />
                  <h3 className="font-semibold">Valoraciones</h3>
                  <p className="text-sm text-muted-foreground">Gestiona y exporta valoraciones</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <Dumbbell className="h-8 w-8 text-green-600 mb-2" />
                  <h3 className="font-semibold">Ejercicios</h3>
                  <p className="text-sm text-muted-foreground">Administra el catálogo de ejercicios</p>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
        )
    }
  }

  return (
    <div className="flex-1">
      {renderContent()}
      
      {/* Modal de exportación - Colocado fuera de todos los cases para evitar anidación */}
      <Dialog open={showExportDialog} onOpenChange={closeExportDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-green-700" />
              Exportar Valoración
            </DialogTitle>
            <DialogDescription>
              {exportedValoracion ? 'Exporta la valoración seleccionada en el formato que prefieras' : 'Busca una valoración específica para ver su resumen y exportar'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Buscador - Solo mostrar si no hay valoración cargada */}
            {!exportedValoracion && (
              <div className="space-y-2">
                <Label>Buscar valoración</Label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Buscar por nombre de cliente..."
                      value={exportSearchTerm}
                      onChange={(e) => setExportSearchTerm(e.target.value)}
                      className="pl-10"
                      onKeyPress={(e) => e.key === 'Enter' && searchValoracionForExport()}
                    />
                  </div>
                  <Button 
                    onClick={searchValoracionForExport}
                    className="bg-green-700 hover:bg-green-800"
                  >
                    Buscar
                  </Button>
                </div>
              </div>
            )}

            {/* Resumen de la valoración encontrada */}
            {exportedValoracion && (
              <div className="border border-green-200 rounded-lg bg-green-50 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-green-700" />
                    <h3 className="font-semibold text-green-800">Valoración Seleccionada</h3>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setExportedValoracion(null)
                      setExportSearchTerm('')
                    }}
                  >
                    <Search className="h-3 w-3 mr-1" />
                    Buscar otra
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-gray-700">Paciente:</span>
                      <p className="text-gray-900">{exportedValoracion.usuario}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Documento:</span>
                      <p className="text-gray-900">{exportedValoracion.documento}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Teléfono:</span>
                      <p className="text-gray-900">{exportedValoracion.telefono}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Email:</span>
                      <p className="text-gray-900">{exportedValoracion.email}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-gray-700">Fecha:</span>
                      <p className="text-gray-900">{exportedValoracion.fecha}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">EPS:</span>
                      <p className="text-gray-900">{exportedValoracion.eps}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Dirección:</span>
                      <p className="text-gray-900">{exportedValoracion.direccion}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Comentario:</span>
                      <p className="text-gray-900 line-clamp-2">{exportedValoracion.comentario}</p>
                    </div>
                  </div>
                </div>
                
                {/* Botones de acción */}
                <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-green-200">
                  <Button 
                    size="sm" 
                    className="bg-green-700 hover:bg-green-800"
                    onClick={() => {
                      toast.success("Valoración exportada como PDF")
                      closeExportDialog()
                    }}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Exportar PDF
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      toast.success("Valoración exportada como Excel")
                      closeExportDialog()
                    }}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Exportar Excel
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      setEmailData({
                        email: exportedValoracion.email || '',
                        alternativeEmail: '',
                        useAlternativeEmail: false
                      })
                      setShowEmailDialog(true)
                    }}
                  >
                    <Mail className="h-4 w-4 mr-1" />
                    Enviar por Correo
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      closeExportDialog()
                      handleViewValoracionComplete(exportedValoracion)
                    }}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Ver Completa
                  </Button>
                </div>
              </div>
            )}

            {/* Mensaje cuando no hay resultados */}
            {exportSearchTerm && !exportedValoracion && exportSearchTerm.length > 0 && (
              <div className="text-center py-6 text-gray-500">
                <ClipboardList className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>No se encontró ninguna valoración</p>
                <p className="text-sm">Intenta con otro término de búsqueda</p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={closeExportDialog}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de envío por correo */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-green-700" />
              Enviar por Correo
            </DialogTitle>
            <DialogDescription>
              Envía la valoración de {exportedValoracion?.usuario} por correo electrónico
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="default-email">Correo del usuario</Label>
              <Input
                id="default-email"
                value={emailData.email}
                onChange={(e) => setEmailData({...emailData, email: e.target.value})}
                placeholder="usuario@email.com"
                disabled={emailData.useAlternativeEmail}
                className={emailData.useAlternativeEmail ? "bg-gray-100" : ""}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="use-alternative"
                checked={emailData.useAlternativeEmail}
                onCheckedChange={(checked) => setEmailData({...emailData, useAlternativeEmail: !!checked})}
              />
              <Label htmlFor="use-alternative">Usar correo alternativo</Label>
            </div>

            {emailData.useAlternativeEmail && (
              <div className="space-y-2">
                <Label htmlFor="alternative-email">Correo alternativo</Label>
                <Input
                  id="alternative-email"
                  value={emailData.alternativeEmail}
                  onChange={(e) => setEmailData({...emailData, alternativeEmail: e.target.value})}
                  placeholder="correo.alternativo@email.com"
                />
              </div>
            )}

            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Se enviará:</strong> Valoración completa en formato PDF con todos los datos antropométricos, signos vitales y recomendaciones.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowEmailDialog(false)}
            >
              Cancelar
            </Button>
            <Button 
              className="bg-green-700 hover:bg-green-800"
              onClick={() => {
                const targetEmail = emailData.useAlternativeEmail ? emailData.alternativeEmail : emailData.email
                if (!targetEmail) {
                  toast.error("Por favor ingrese un correo electrónico")
                  return
                }
                toast.success(`Valoración enviada a ${targetEmail}`)
                setShowEmailDialog(false)
                closeExportDialog()
              }}
            >
              <Mail className="h-4 w-4 mr-1" />
              Enviar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Política de Datos para Creación de Usuario */}
      <Dialog open={showPolicyDialog} onOpenChange={setShowPolicyDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Política de Tratamiento de Datos</DialogTitle>
            <DialogDescription>
              Para crear un nuevo usuario, debe aceptar la política de tratamiento de datos personales
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[calc(90vh-200px)] pr-4">
            <PoliticaDatosContent />
          </ScrollArea>
          <DialogFooter className="flex justify-between items-center gap-4 sm:gap-0">
            <Button 
              variant="outline"
              onClick={() => {
                setShowPolicyDialog(false)
                setAcceptedPolicy(false)
              }}
            >
              Cancelar
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => {
                setAcceptedPolicy(true)
                handleSaveUser()
              }}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Acepto y Crear Usuario
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}