# Panel de Administración - Combarranquilla

Panel de administración para el Centro de Entrenamiento Deportivo Combarranquilla, construido con React, TypeScript, Tailwind CSS y React Router v6.

## 🚀 Características

- **Autenticación segura**: Sistema de login con sesión persistente (24 horas)
- **Gestión de clientes**: Crear, ver, editar y buscar clientes
- **Valoraciones deportivas**: Sistema completo de valoraciones físicas con formularios detallados
- **Gestión de ejercicios**: Biblioteca de ejercicios con multimedia
- **Calendario**: Vista de calendario para valoraciones programadas
- **Diseño responsive**: Interfaz adaptable a diferentes dispositivos
- **Navegación con React Router v6**: URLs amigables e historial del navegador

## 📁 Estructura del Proyecto

```
/
├── App.tsx                      # Componente raíz con BrowserRouter
├── components/
│   ├── layout/                  # Componentes de layout
│   │   ├── DashboardLayout.tsx  # Layout principal con sidebar y header
│   │   ├── DashboardHeader.tsx  # Header con logo y menú de usuario
│   │   └── Sidebar.tsx          # Barra lateral de navegación
│   ├── common/                  # Componentes reutilizables
│   │   ├── EPSCombobox.tsx      # Selector de EPS con búsqueda
│   │   └── UserDropdown.tsx     # Menú desplegable del usuario
│   ├── ui/                      # Componentes UI base (shadcn/ui)
│   ├── AdminContent.tsx         # Contenedor para formularios y listas
│   ├── DashboardContent.tsx     # Vista principal del dashboard
│   ├── UserProfileView.tsx      # Vista de perfil de cliente
│   ├── UserEditView.tsx         # Formulario de edición de cliente
│   ├── ValoracionDetailView.tsx # Vista de detalle de valoración
│   ├── ValoracionEditView.tsx   # Formulario de edición de valoración
│   ├── ScheduleView.tsx         # Vista de calendario
│   └── ConfigurationSettings.tsx# Configuración del sistema
├── context/
│   ├── AuthContext.tsx          # Contexto de autenticación
│   └── ValoracionContext.tsx    # Contexto de valoraciones
├── pages/                       # Páginas de la aplicación
│   ├── Login.tsx                # Página de inicio de sesión
│   ├── Dashboard.tsx            # Dashboard principal
│   ├── ClientesCrear.tsx        # Crear cliente
│   ├── ClientesVer.tsx          # Lista de clientes
│   ├── ClienteDetalle.tsx       # Perfil de cliente
│   ├── ClienteEditar.tsx        # Editar cliente
│   ├── ValoracionesCrear.tsx    # Crear valoración
│   ├── ValoracionesVer.tsx      # Lista de valoraciones
│   ├── ValoracionDetalle.tsx    # Detalle de valoración
│   ├── ValoracionEditar.tsx     # Editar valoración
│   ├── EjerciciosCrear.tsx      # Crear ejercicio
│   ├── EjerciciosVer.tsx        # Lista de ejercicios
│   ├── Calendario.tsx           # Vista de calendario
│   ├── Configuracion.tsx        # Configuración
│   ├── Perfil.tsx               # Perfil del usuario
│   ├── PoliticaDatos.tsx        # Política de datos
│   └── index.tsx                # Exportaciones de páginas
├── routes/
│   └── AppRoutes.tsx            # Configuración de rutas con React Router v6
└── styles/
    └── globals.css              # Estilos globales y tokens de Tailwind
```

## 🛣️ Sistema de Rutas

La aplicación utiliza **React Router v6** para la navegación. Todas las rutas están definidas en `/routes/AppRoutes.tsx`.

### Rutas Principales

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | Dashboard | Vista principal con estadísticas |
| `/clientes/crear` | ClientesCrear | Formulario para crear cliente |
| `/clientes/ver` | ClientesVer | Lista de clientes |
| `/clientes/:id` | ClienteDetalle | Perfil de un cliente |
| `/clientes/:id/editar` | ClienteEditar | Editar cliente |
| `/valoraciones/crear` | ValoracionesCrear | Crear valoración |
| `/valoraciones/ver` | ValoracionesVer | Lista de valoraciones |
| `/valoraciones/:id` | ValoracionDetalle | Detalle de valoración |
| `/valoraciones/:id/editar` | ValoracionEditar | Editar valoración |
| `/ejercicios/crear` | EjerciciosCrear | Crear ejercicio |
| `/ejercicios/ver` | EjerciciosVer | Lista de ejercicios |
| `/calendario` | Calendario | Vista de calendario |
| `/configuracion` | Configuracion | Configuración del sistema |
| `/perfil` | Perfil | Perfil del usuario |
| `/politica-datos` | PoliticaDatos | Política de privacidad |

### Navegación Programática

Para navegar programáticamente, usa el hook `useNavigate`:

```tsx
import { useNavigate } from "react-router-dom"

function MiComponente() {
  const navigate = useNavigate()
  
  const handleClick = () => {
    navigate("/clientes/ver")
  }
  
  return <button onClick={handleClick}>Ver Clientes</button>
}
```

### Acceso a Parámetros de Ruta

Para acceder a parámetros de ruta (como `:id`), usa el hook `useParams`:

```tsx
import { useParams } from "react-router-dom"

function ClienteDetalle() {
  const { id } = useParams<{ id: string }>()
  
  return <div>Cliente ID: {id}</div>
}
```

## 🔐 Autenticación

El sistema de autenticación está implementado en `/context/AuthContext.tsx`.

### Credenciales de Prueba

- **Usuario**: `admin`
- **Contraseña**: `admin123`

### Características

- Sesión persistente en localStorage (24 horas)
- Verificación automática de sesión al cargar la aplicación
- Redirección automática al login si no está autenticado
- Logout con limpieza de datos

## 🎨 Estilos

La aplicación utiliza **Tailwind CSS v4** con tokens personalizados definidos en `/styles/globals.css`.

### Colores Principales

- **Verde Institucional**: `#124422` (header)
- **Verde Claro**: Variantes de `green-50` a `green-700`
- **Blanco**: Fondos y cards

### Tipografía

Los estilos de tipografía están definidos globalmente en `globals.css`. **No uses clases de Tailwind para font-size, font-weight o line-height** a menos que sea absolutamente necesario.

## 📦 Componentes Principales

### DashboardLayout

Layout principal que envuelve todas las páginas. Incluye:
- Header con logo y menú de usuario
- Sidebar con navegación
- Área de contenido principal

### AdminContent

Componente versátil que renderiza diferentes vistas según el prop `activeSection`. Utilizado por múltiples páginas para mostrar formularios y listas.

### EPSCombobox

Selector de EPS con búsqueda integrada. Incluye todas las EPS de Colombia.

### UserDropdown

Menú desplegable del usuario con opciones de perfil y logout.

## 🔄 Contextos

### AuthContext

Proporciona:
- `isAuthenticated`: Estado de autenticación
- `user`: Datos del usuario actual
- `login()`: Función para iniciar sesión
- `logout()`: Función para cerrar sesión

### ValoracionContext

Proporciona:
- `valoraciones`: Array de todas las valoraciones
- `addValoracion()`: Agregar nueva valoración
- `updateValoracion()`: Actualizar valoración existente
- `getValoracion()`: Obtener valoración por ID

## 🚦 Flujo de Navegación

1. Usuario accede a la aplicación
2. Si no está autenticado → Login
3. Si está autenticado → Dashboard
4. Usuario navega usando la Sidebar
5. React Router actualiza la URL
6. Se renderiza el componente correspondiente
7. Los componentes usan `useNavigate()` para navegación interna

## 📝 Notas de Desarrollo

### Migración a React Router v6

El proyecto fue migrado de navegación por estado a React Router v6. Los cambios principales incluyen:

1. **App.tsx**: Ahora envuelve todo con `<BrowserRouter>`
2. **AppRoutes.tsx**: Define todas las rutas con `<Routes>` y `<Route>`
3. **DashboardLayout.tsx**: Usa `useLocation()` para determinar la sección activa
4. **Sidebar.tsx**: Navega usando callback que internamente usa `navigate()`
5. **Páginas individuales**: Cada ruta tiene su propio componente en `/pages`

### Beneficios de React Router v6

- ✅ URLs amigables y compartibles
- ✅ Historial del navegador funcional (botones atrás/adelante)
- ✅ Mejor SEO (si se implementa SSR en el futuro)
- ✅ Navegación más intuitiva y estándar
- ✅ Soporte para enlaces directos

### Consideraciones

- Todas las rutas requieren autenticación (verificar en `App.tsx`)
- El sistema de búsqueda requiere mínimo 3 caracteres
- Las valoraciones y ejercicios solo se muestran con búsqueda activa
- Los datos son simulados (no hay backend real)

## 🛠️ Comandos Útiles

```bash
# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

## 📄 Licencia

Proyecto privado para Combarranquilla Centro de Entrenamiento Deportivo.

---

**Última actualización**: Noviembre 2025
**Versión**: 2.0.0 (con React Router v6)
