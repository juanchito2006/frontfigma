/**
 * ValoracionContext - Contexto de Valoraciones
 * 
 * Proporciona el estado global de valoraciones y métodos para
 * crear, leer, actualizar y eliminar valoraciones en la aplicación.
 * Maneja toda la información relacionada con las evaluaciones
 * de los clientes del centro de entrenamiento.
 * 
 * @exports useValoracion - Hook para acceder al contexto de valoraciones
 * @exports ValoracionProvider - Proveedor del contexto
 * @exports ValoracionCompleta - Tipo de datos de una valoración completa
 * @exports ValoracionData - Tipo de datos para crear una nueva valoración
 */

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

/**
 * Interfaz que define la estructura completa de una valoración
 * Incluye todos los campos posibles de una evaluación física completa
 */
interface ValoracionCompleta {
  id: number;
  usuario: string;
  fecha: string;
  comentario?: string;
  documento?: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  eps?: string;

  // Información del usuario
  nombres?: string;
  apellidos?: string;
  ocupacion?: string;

  // Cuestionario inicial de actividad física
  ejercicioAnterior?: boolean;
  ejercicioAnteriorDetalle?: string;
  actividadActual?: boolean;
  actividadActualDetalle?: string;
  sedentario?: boolean;
  sedentarioDetalle?: string;
  frecuencia?: boolean;
  frecuenciaDetalle?: string;

  // Signos vitales
  fc?: string; // Frecuencia cardíaca
  fr?: string; // Frecuencia respiratoria
  ta?: string; // Tensión arterial
  fcMax?: string; // Frecuencia cardíaca máxima

  // Factores de riesgo y antecedentes médicos
  cardiovascular?: boolean;
  cardiovascularDetalle?: string;
  osteomuscular?: boolean;
  osteomuscularDetalle?: string;
  metabolico?: boolean;
  metabolicoDetalle?: string;
  otros?: boolean;
  otrosDetalle?: string;
  antecedentesMedicos?: boolean;
  antecedentesMedicosDetalle?: string;
  antecedentesFamiliares?: boolean;
  antecedentesFamiliaresDetalle?: string;

  // Antropometría básica
  peso?: string;
  talla?: string;
  imc?: string; // Índice de masa corporal
  resPeso?: string; // Rango de peso
  tiposPeso?: string; // Clasificación del peso

  // Antropometría avanzada
  grasaCorporal?: string;
  grasaVisceral?: string;
  icc?: string; // Índice cintura-cadera
  riesgoCV?: string; // Riesgo cardiovascular
  kcal?: string; // Calorías
  muscular?: string; // Masa muscular
  edadMetabolica?: string;
  tipoObesidad?: string;
  rca?: string; // Relación cintura-altura
  ninos?: string;

  // Mediciones físicas (perímetros corporales)
  musloD?: string;
  brazoD?: string;
  piernaD?: string;
  abdomen?: string;
  hombros?: string;
  cintura?: string;
  musloI?: string;
  brazoI?: string;
  piernaI?: string;
  cadera?: string;
  pecho?: string;

  // Información de entrenamiento
  nivelEntrenamiento?: string;
  frecuenciaSemanal?: string;

  // Observaciones del profesional
  observaciones?: string;
  observacionesFuncionales?: string;
}

/**
 * Interfaz para crear nuevas valoraciones
 * Similar a ValoracionCompleta pero sin el campo id
 */
interface ValoracionData {
  usuario: string;
  fecha: string;
  comentario?: string;
  documento?: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  eps?: string;
  nombres?: string;
  apellidos?: string;
  ocupacion?: string;
  ejercicioAnterior?: boolean;
  ejercicioAnteriorDetalle?: string;
  actividadActual?: boolean;
  actividadActualDetalle?: string;
  sedentario?: boolean;
  sedentarioDetalle?: string;
  frecuencia?: boolean;
  frecuenciaDetalle?: string;
  fc?: string;
  fr?: string;
  ta?: string;
  fcMax?: string;
  cardiovascular?: boolean;
  cardiovascularDetalle?: string;
  osteomuscular?: boolean;
  osteomuscularDetalle?: string;
  metabolico?: boolean;
  metabolicoDetalle?: string;
  otros?: boolean;
  otrosDetalle?: string;
  antecedentesMedicos?: boolean;
  antecedentesMedicosDetalle?: string;
  antecedentesFamiliares?: boolean;
  antecedentesFamiliaresDetalle?: string;
  peso?: string;
  talla?: string;
  imc?: string;
  resPeso?: string;
  tiposPeso?: string;
  grasaCorporal?: string;
  grasaVisceral?: string;
  icc?: string;
  riesgoCV?: string;
  kcal?: string;
  muscular?: string;
  edadMetabolica?: string;
  tipoObesidad?: string;
  rca?: string;
  ninos?: string;
  musloD?: string;
  brazoD?: string;
  piernaD?: string;
  abdomen?: string;
  hombros?: string;
  cintura?: string;
  musloI?: string;
  brazoI?: string;
  piernaI?: string;
  cadera?: string;
  pecho?: string;
  nivelEntrenamiento?: string;
  frecuenciaSemanal?: string;
  observaciones?: string;
  observacionesFuncionales?: string;
}

/**
 * Interfaz del contexto con métodos disponibles
 */
interface ValoracionContextType {
  valoraciones: ValoracionCompleta[];
  getValoracion: (id: number) => ValoracionCompleta | undefined;
  updateValoracion: (
    id: number,
    data: Partial<ValoracionCompleta>,
  ) => void;
  addValoracion: (valoracion: ValoracionData) => number;
  deleteValoracion: (id: number) => void;
}

// Crear el contexto
const ValoracionContext = createContext<
  ValoracionContextType | undefined
>(undefined);

/**
 * Datos iniciales de valoraciones de ejemplo
 * En producción estos vendrían de una base de datos
 */
const initialValoraciones: ValoracionCompleta[] = [
  {
    id: 1,
    usuario: "Juan Pérez",
    fecha: "2024-01-15",
    comentario: "Excelente servicio",
    documento: "1234567890",
    telefono: "+57 300 123 4567",
    email: "juan.perez@email.com",
    direccion: "Calle 123 #45-67",
    eps: "Nueva EPS",

    // Información del usuario
    nombres: "Juan",
    apellidos: "Pérez",
    ocupacion: "Ingeniero",

    // Cuestionario inicial
    ejercicioAnterior: true,
    ejercicioAnteriorDetalle:
      "Sí, durante 2 años en otro gimnasio con rutinas de fuerza",
    actividadActual: false,
    actividadActualDetalle:
      "No, actualmente no realizo actividad física regular",
    sedentario: true,
    sedentarioDetalle:
      "Trabajo de oficina, paso 8 horas sentado diariamente",
    frecuencia: false,
    frecuenciaDetalle:
      "No tengo una rutina establecida de ejercicio",

    // Signos vitales
    fc: "72",
    fr: "16",
    ta: "120/80",
    fcMax: "190",

    // Factores de riesgo
    cardiovascular: true,
    cardiovascularDetalle:
      "Antecedentes familiares de hipertensión",
    otros: true,
    otrosDetalle: "Estrés laboral elevado",
    antecedentesFamiliares: true,
    antecedentesFamiliaresDetalle:
      "Diabetes tipo 2 por parte materna",

    // Antropometría básica
    peso: "75",
    talla: "175",
    imc: "24.5",
    resPeso: "70-80",
    tiposPeso: "Normal",

    // Antropometría avanzada
    grasaCorporal: "18",
    grasaVisceral: "8",
    icc: "0.85",
    riesgoCV: "Bajo",
    kcal: "1850",
    muscular: "42",
    edadMetabolica: "25",
    tipoObesidad: "Androide",
    rca: "0.88",

    // Mediciones físicas
    musloD: "58",
    brazoD: "32",
    piernaD: "38",
    abdomen: "85",
    hombros: "110",
    cintura: "78",
    musloI: "57",
    brazoI: "31",
    piernaI: "37",
    cadera: "95",
    pecho: "102",

    // Entrenamiento
    nivelEntrenamiento: "Intermedio",
    frecuenciaSemanal: "Tres veces",

    // Observaciones
    observaciones:
      "Postura adecuada, leve desviación en hombro derecho",
    observacionesFuncionales:
      "Buena flexibilidad, resistencia cardiovascular por mejorar",
  },
  {
    id: 2,
    usuario: "María González",
    fecha: "2024-01-12",
    comentario: "Muy buena atención",
    documento: "1234567891",
    telefono: "+57 300 123 4568",
    email: "maria.gonzalez@email.com",
    direccion: "Carrera 45 #23-89",
    eps: "SURA EPS",

    nombres: "María",
    apellidos: "González",
    ocupacion: "Doctora",

    ejercicioAnterior: false,
    ejercicioAnteriorDetalle:
      "No he realizado ejercicio de forma regular anteriormente",
    actividadActual: true,
    actividadActualDetalle:
      "Caminatas ocasionales los fines de semana",

    fc: "68",
    fr: "14",
    ta: "110/70",
    fcMax: "185",

    osteomuscular: true,
    osteomuscularDetalle:
      "Dolor lumbar ocasional por largas jornadas de trabajo",

    peso: "62",
    talla: "165",
    imc: "22.8",
    resPeso: "58-68",
    tiposPeso: "Normal",

    nivelEntrenamiento: "Principiante",
    frecuenciaSemanal: "Dos veces",

    observaciones:
      "Postura correcta, sin desviaciones aparentes",
  },
  {
    id: 3,
    usuario: "Carlos Rodríguez",
    fecha: "2024-01-10",
    documento: "1234567892",
    telefono: "+57 300 123 4569",
    nombres: "Carlos",
    apellidos: "Rodríguez",

    // Solo información básica y algunos signos vitales
    peso: "82",
    talla: "180",
    fc: "75",
    ta: "125/85",

    observaciones: "Evaluación inicial básica",
  },
];

/**
 * Proveedor del contexto de valoraciones
 * Maneja el estado global de todas las valoraciones
 * 
 * @param children - Componentes hijos que tendrán acceso al contexto
 */
export function ValoracionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [valoraciones, setValoraciones] = useState<
    ValoracionCompleta[]
  >(initialValoraciones);

  /**
   * Obtiene una valoración por su ID
   * @param id - ID de la valoración a buscar
   * @returns La valoración encontrada o undefined
   */
  const getValoracion = (
    id: number,
  ): ValoracionCompleta | undefined => {
    return valoraciones.find((v) => v.id === id);
  };

  /**
   * Actualiza los datos de una valoración existente
   * @param id - ID de la valoración a actualizar
   * @param data - Datos parciales a actualizar
   */
  const updateValoracion = (
    id: number,
    data: Partial<ValoracionCompleta>,
  ) => {
    setValoraciones((prev) =>
      prev.map((valoracion) =>
        valoracion.id === id
          ? { ...valoracion, ...data }
          : valoracion,
      ),
    );
  };

  /**
   * Agrega una nueva valoración al sistema
   * @param valoracionData - Datos de la nueva valoración
   * @returns El ID de la valoración creada
   */
  const addValoracion = (
    valoracionData: ValoracionData,
  ): number => {
    const newId =
      Math.max(...valoraciones.map((v) => v.id), 0) + 1;
    const newValoracion: ValoracionCompleta = {
      id: newId,
      ...valoracionData,
    };
    setValoraciones((prev) => [...prev, newValoracion]);
    return newId;
  };

  /**
   * Elimina una valoración del sistema
   * @param id - ID de la valoración a eliminar
   */
  const deleteValoracion = (id: number) => {
    setValoraciones((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <ValoracionContext.Provider
      value={{
        valoraciones,
        getValoracion,
        updateValoracion,
        addValoracion,
        deleteValoracion,
      }}
    >
      {children}
    </ValoracionContext.Provider>
  );
}

/**
 * Hook personalizado para acceder al contexto de valoraciones
 * @throws Error si se usa fuera del ValoracionProvider
 * @returns Objeto con estado y métodos de valoraciones
 */
export function useValoracion() {
  const context = useContext(ValoracionContext);
  if (context === undefined) {
    throw new Error(
      "useValoracion must be used within a ValoracionProvider",
    );
  }
  return context;
}

// Exportar tipos para uso en otros componentes
export type { ValoracionCompleta, ValoracionData };
