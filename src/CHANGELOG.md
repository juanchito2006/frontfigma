# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

## [2.0.0] - Noviembre 2025

### 🎉 Migración a React Router v6

#### ✨ Agregado
- Sistema completo de enrutamiento con React Router v6
- 14 páginas individuales en `/pages`:
  - `Dashboard.tsx` - Vista principal
  - `ClientesCrear.tsx` - Formulario de creación de cliente
  - `ClientesVer.tsx` - Lista de clientes
  - `ClienteDetalle.tsx` - Perfil de cliente
  - `ClienteEditar.tsx` - Editar cliente
  - `ValoracionesCrear.tsx` - Formulario de creación de valoración
  - `ValoracionesVer.tsx` - Lista de valoraciones
  - `ValoracionDetalle.tsx` - Detalle de valoración
  - `ValoracionEditar.tsx` - Editar valoración
  - `EjerciciosCrear.tsx` - Formulario de creación de ejercicio
  - `EjerciciosVer.tsx` - Lista de ejercicios
  - `Calendario.tsx` - Vista de calendario
  - `Configuracion.tsx` - Configuración del sistema
  - `Perfil.tsx` - Perfil del usuario
  - `PoliticaDatos.tsx` - Política de privacidad y datos
- Archivo `/routes/AppRoutes.tsx` con configuración de rutas
- Componente `<BrowserRouter>` en App.tsx
- URLs amigables y compartibles para cada vista
- Soporte para parámetros dinámicos en rutas (`:id`)
- Mapeos de `sectionToRoute` y `routeToSection`
- Documentación completa:
  - `README.md` actualizado
  - `/guidelines/RouterGuide.md` - Guía de uso de React Router
  - `/guidelines/MigrationGuide.md` - Guía de migración
  - `CHANGELOG.md` - Este archivo

#### 🔄 Cambiado
- **App.tsx**: Simplificado, ahora solo configura providers y router
  - Removida lógica de navegación por estado
  - Removido `renderContent()` con switch/case
  - Agregado `<BrowserRouter>` wrapper
- **DashboardLayout.tsx**: Integrado con React Router
  - Usa `useLocation()` para determinar sección activa
  - Usa `useNavigate()` para cambios de sección
  - Props simplificadas (solo `children`)
- **Sidebar.tsx**: Mantiene interfaz similar pero usa navigation callback
  - El callback ahora llama internamente a `navigate()`
  - Actualizado sistema de resaltado de sección activa
- **AdminContent.tsx**: Actualizado para recibir callbacks de navegación
  - Callbacks ahora usan `navigate()` en lugar de `setState`

#### 🗑️ Removido
- Lógica de navegación por estado en App.tsx
- Switch/case gigante de renderizado
- Estados de navegación redundantes:
  - `activeSection`
  - `selectedUserId`
  - `selectedValoracionId`
- Funciones de navegación manual:
  - `handleNavigateToUserProfile`
  - `handleNavigateToValoracionDetail`
  - `handleEditUser`
  - `handleBackToUsers`
  - etc.

#### 🐛 Corregido
- Botones atrás/adelante del navegador ahora funcionan correctamente
- URLs reflejan la vista actual
- Se pueden compartir enlaces directos a vistas específicas

#### 🎯 Mejorado
- Experiencia de usuario más intuitiva
- Código más limpio y mantenible
- Mejor separación de responsabilidades
- Testing más fácil
- Preparado para SEO (si se implementa SSR en el futuro)

---

## [1.0.0] - Enero 2024

### 🎉 Versión Inicial

#### ✨ Características
- Sistema de autenticación con login
- Dashboard con estadísticas y gráficos
- Gestión completa de clientes:
  - Crear cliente
  - Ver lista de clientes
  - Perfil de cliente
  - Editar cliente
- Gestión de valoraciones deportivas:
  - Crear valoración con formulario completo
  - Ver lista de valoraciones
  - Exportar valoraciones (PDF, Email)
- Gestión de ejercicios:
  - Crear ejercicio con multimedia
  - Ver lista de ejercicios
  - Editar ejercicios
- Vista de calendario
- Configuración del sistema
- Perfil de usuario
- Navegación por estado (sin React Router)

#### 🎨 Diseño
- Diseño minimalista en verde y blanco
- Header con logo institucional
- Sidebar colapsable con navegación estructurada
- Responsive design
- Componentes UI con shadcn/ui
- Tailwind CSS v4 para estilos

#### 🔐 Seguridad
- Autenticación requerida para todas las vistas
- Sesión persistente (24 horas)
- Roles de usuario (Admin, Entrenador, Usuario)

#### 📊 Datos
- Base de datos simulada en memoria
- Contexto de autenticación
- Contexto de valoraciones
- EPS Combobox con todas las EPS de Colombia

---

## Formato

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

### Tipos de Cambios
- **✨ Agregado** - Para nuevas características
- **🔄 Cambiado** - Para cambios en funcionalidad existente
- **🗑️ Removido** - Para características removidas
- **🐛 Corregido** - Para corrección de bugs
- **🎯 Mejorado** - Para mejoras de rendimiento o UX
- **🔐 Seguridad** - Para vulnerabilidades de seguridad
