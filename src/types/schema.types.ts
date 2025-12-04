export enum NivelEnum {
  Principiante = 'Principiante',
  Intermedio = 'Intermedio',
  Avanzado = 'Avanzado',
}

export interface Antropometria {
  ant_id: number;
  ant_grasa_corporal: number | null;
  ant_grasa_viceral: number | null;
  ant_peso: number | null;
  ant_talla: number | null;
  ant_calorias: number | null;
  ant_procentaje_muscular: number | null;
  ant_nivel_obesidad: string | null;
  ant_edad_metabolica: string | null;
  ant_riesgo_cardiaco: string | null;
  ant_tipo_obesidad: string | null;
  ant_rca: string | null;
  eliminado: boolean;
}

export interface DatosFisicos {
  dat_id: number;
  dat_fc: number;
  dat_fr: string;
  dat_ta: string;
  dat_fmax: number;
  eliminado: boolean;
}

export interface DiaEjercicio {
  dia_idfk: number;
  eje_idfk: number;
  dia_eje_observacion: string | null;
  dia_eje_id: number;
  eliminado: boolean;
}

export interface DiaEntrenamiento {
  dia_id: number;
  dia_repeticion_max: number;
  dia_repeticion_min: number;
  pro_idfk: number;
  eliminado: boolean;
}

export interface Ejercicio {
  eje_id: number;
  eje_nombre: string;
  eje_descripcion: string;
  eje_imagen: string | null;
  eje_nivel: NivelEnum;
}

export interface Entrenamiento {
  ent_id: number;
  ent_frecuencia_semanal: string;
  ent_nivel_entrenamiento: string;
  eliminado: boolean;
}

export interface EntrenamientoGrupal {
  gru_id: number;
  gru_nombre: string;
  gru_descripcion: string;
}

export interface EntrenamientoGrupalEntrenamiento {
  ent_idfk: number;
  gru_idfk: number;
  ent_gru_id: number;
  eliminado: boolean;
}

export interface MedicionParte {
  med_id: number;
  med_medida: string;
  ant_idfk: number;
  par_idfk: number;
  eliminado: boolean;
}

export interface Objetivo {
  obj_id: number;
  obj_peso_saludable: string | null;
  obj_salud: string | null;
  obj_disminucion_grasa: string | null;
  obj_acon_fisico: string | null;
  obj_fitness: string | null;
  obj_desarrollo_muscular: string | null;
  eliminado: string;
}

export interface Opcion {
  opc_id: number;
  opc_descripcion: string;
  tip_idfk: number;
}

export interface ParteCuerpo {
  par_id: number;
  par_nombre: string;
  par_descripcion: string;
}

export interface Permiso {
  per_id: number;
  per_nombre: string;
  per_descripcion: string;
}

export interface Pregunta {
  pre_id: number;
  pre_descripcion: string;
  tip_idfk: number | null;
  pre_padre_idfk: number | null;
}

export interface PreguntaFactor {
  paf_id: number;
  paf_factor: string;
  paf_descripcion: string | null;
}

export interface PreguntaFactorValoracion {
  paf_idfk: number;
  val_idfk: number;
  pfv_respuesta: boolean;
  pfv_observacion: string | null;
  paf_val_id: number;
  eliminado: boolean;
}

export interface ProgramaEntrenamiento {
  pro_id: number;
  pro_frecuencia: string;
  pro_objetivo: string;
  ent_idfk: number;
  eliminado: boolean;
}

export interface RespuestaCuestionarioFisico {
  res_id: number;
  res_texto_libre: string | null;
  opc_idfk: number | null;
  pre_idfk: number;
  val_idfk: number;
  eliminado: boolean;
}

export interface Rol {
  rol_id: number;
  rol_nombre: string;
  rol_descripcion: string;
}

export interface RolPermiso {
  rol_idfk: number;
  per_idfk: number;
  rol_per_id: number;
}

export interface TipoPregunta {
  tip_id: number;
  tip_descripcion: string;
}

export interface Usuario {
  usu_di: number;
  usu_nombre: string;
  usu_apellido: string;
  usu_email: string;
  usu_contrase_a: string;
  usu_direccion: string;
  usu_fecha_nacimiento: string; // ISO date string
  usu_fecha_expedicion: string; // ISO date string
  usu_telefono: string;
  usu_eps: string;
  usu_ocupacion: string;
  usu_ultima_val: string; // ISO date string
  usu_status: boolean;
  rol_idfk: number;
  usu_sexo: string | null;
  eliminado: boolean;
}

export interface Valoracion {
  val_id: number;
  val_fecha: string; // ISO timestamp string
  val_recomendacion: string;
  val_prox_control: string; // ISO timestamp string
  usu_difk: number;
  eliminado: boolean;
}

// ============================================
// TIPOS CON RELACIONES (Para respuestas completas del backend)
// ============================================

export interface AntropometriaConRelaciones extends Antropometria {
  valoracion?: Valoracion;
  medicion_parte?: MedicionParte[];
}

export interface ValoracionCompleta extends Valoracion {
  usuario?: Usuario;
  antropometria?: Antropometria;
  datos_fisicos?: DatosFisicos;
  entrenamiento?: Entrenamiento;
  pregunta_factor_valoracion?: PreguntaFactorValoracion[];
  respuesta_cuestionario_fisico?: RespuestaCuestionarioFisico[];
}

export interface UsuarioConRelaciones extends Usuario {
  rol?: Rol;
  valoracion?: Valoracion[];
}

export interface EntrenamientoCompleto extends Entrenamiento {
  valoracion?: Valoracion;
  objetivo?: Objetivo;
  programa_entrenamiento?: ProgramaEntrenamiento[];
  entrenamiento_grupal_entrenamiento?: EntrenamientoGrupalEntrenamiento[];
}

export interface ProgramaEntrenamientoCompleto extends ProgramaEntrenamiento {
  entrenamiento?: Entrenamiento;
  dia_entrenamiento?: DiaEntrenamiento[];
}

export interface DiaEntrenamientoCompleto extends DiaEntrenamiento {
  programa_entrenamiento?: ProgramaEntrenamiento;
  dia_ejercicio?: DiaEjercicio[];
}

export interface EjercicioConRelaciones extends Ejercicio {
  dia_ejercicio?: DiaEjercicio[];
}

// ============================================
// DTOs PARA CREAR
// ============================================

export type CreateAntropometriaDTO = Omit<Antropometria, 'ant_id' | 'eliminado'>;

export type CreateDatosFisicosDTO = Omit<DatosFisicos, 'dat_id' | 'eliminado'>;

export type CreateEjercicioDTO = Omit<Ejercicio, 'eje_id'>;

export type CreateEntrenamientoDTO = Omit<Entrenamiento, 'ent_id' | 'eliminado'>;

export type CreateUsuarioDTO = Omit<Usuario, 'usu_di' | 'eliminado'>;

export type CreateValoracionDTO = Omit<Valoracion, 'val_id' | 'eliminado'>;

export type CreateProgramaEntrenamientoDTO = Omit<ProgramaEntrenamiento, 'pro_id' | 'eliminado'>;

export type CreateDiaEntrenamientoDTO = Omit<DiaEntrenamiento, 'dia_id' | 'eliminado'>;

export type CreateObjetivoDTO = Omit<Objetivo, 'obj_id' | 'eliminado'>;

export type CreateRespuestaCuestionarioFisicoDTO = Omit<RespuestaCuestionarioFisico, 'res_id' | 'eliminado'>;

export type CreatePreguntaFactorValoracionDTO = Omit<PreguntaFactorValoracion, 'paf_val_id' | 'eliminado'>;

// ============================================
// DTOs PARA ACTUALIZAR
// ============================================

export type UpdateAntropometriaDTO = Partial<Omit<Antropometria, 'ant_id'>>;

export type UpdateDatosFisicosDTO = Partial<Omit<DatosFisicos, 'dat_id'>>;

export type UpdateEjercicioDTO = Partial<Omit<Ejercicio, 'eje_id'>>;

export type UpdateEntrenamientoDTO = Partial<Omit<Entrenamiento, 'ent_id'>>;

export type UpdateUsuarioDTO = Partial<Omit<Usuario, 'usu_di'>>;

export type UpdateValoracionDTO = Partial<Omit<Valoracion, 'val_id'>>;

export type UpdateProgramaEntrenamientoDTO = Partial<Omit<ProgramaEntrenamiento, 'pro_id'>>;

export type UpdateObjetivoDTO = Partial<Omit<Objetivo, 'obj_id'>>;

// ============================================
// TIPOS DE FILTROS Y PARÁMETROS
// ============================================

export interface ValoracionFiltros {
  usu_difk?: number;
  fecha_desde?: string;
  fecha_hasta?: string;
  eliminado?: boolean;
}

export interface UsuarioFiltros {
  rol_idfk?: number;
  usu_status?: boolean;
  eliminado?: boolean;
  search?: string; // Para búsqueda por nombre, email, etc.
}

export interface EjercicioFiltros {
  eje_nivel?: NivelEnum;
  search?: string;
}

export interface PaginacionParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ============================================
// RESPUESTAS PAGINADAS
// ============================================

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ============================================
// TIPOS DE RESPUESTA DE API
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  statusCode: number;
  details?: unknown;
}

// ============================================
// TIPOS PARA FORMULARIOS COMPLEJOS
// ============================================

export interface ValoracionFormData {
  valoracion: CreateValoracionDTO;
  antropometria?: CreateAntropometriaDTO;
  datos_fisicos?: CreateDatosFisicosDTO;
  entrenamiento?: CreateEntrenamientoDTO;
  pregunta_factor_valoracion?: CreatePreguntaFactorValoracionDTO[];
  respuestas_cuestionario?: CreateRespuestaCuestionarioFisicoDTO[];
}

export interface ProgramaEntrenamientoFormData {
  programa: CreateProgramaEntrenamientoDTO;
  dias_entrenamiento: Array<{
    dia: CreateDiaEntrenamientoDTO;
    ejercicios: Array<{
      eje_idfk: number;
      dia_eje_observacion?: string;
    }>;
  }>;
}

// ============================================
// TIPOS AUXILIARES
// ============================================

export interface MedicionParteConDetalles extends MedicionParte {
  parte_cuerpo?: ParteCuerpo;
}

export interface RespuestaCuestionarioConDetalles extends RespuestaCuestionarioFisico {
  pregunta?: Pregunta;
  opcion?: Opcion;
}

export interface DiaEjercicioConDetalles extends DiaEjercicio {
  ejercicio?: Ejercicio;
}

// ============================================
// CONSTANTES Y UTILIDADES
// ============================================

export const NIVELES_EJERCICIO = Object.values(NivelEnum);

export const CAMPOS_USUARIO_PUBLICO = [
  'usu_di',
  'usu_nombre',
  'usu_apellido',
  'usu_email',
  'usu_telefono',
  'usu_status',
] as const;

export type UsuarioPublico = Pick<Usuario, typeof CAMPOS_USUARIO_PUBLICO[number]>;
