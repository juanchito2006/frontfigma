/**
 * Login - Página de inicio de sesión
 * 
 * Formulario de autenticación para acceder al panel de administración.
 * Incluye validación de credenciales, manejo de errores, aceptación de
 * política de datos y footer con copyright.
 * 
 * Características:
 * - Campos de usuario y contraseña con iconos
 * - Toggle para mostrar/ocultar contraseña
 * - Checkbox de aceptación de política de datos (obligatorio)
 * - Enlace a página de política de datos
 * - Validación de credenciales
 * - Persistencia de sesión en localStorage (24 horas)
 * - Footer minimalista con copyright
 * - Mensajes de error claros
 * 
 * Credenciales de prueba:
 * Usuario: admin
 * Contraseña: admin123
 * 
 * @param onLogin - Callback que se ejecuta al autenticarse exitosamente
 */

import { LoginForm } from "../components/LoginForm"

interface LoginProps {
  onLogin: () => void
}

export function Login({ onLogin }: LoginProps) {
  return <LoginForm onLogin={onLogin} />
}
