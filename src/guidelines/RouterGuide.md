# Guía de React Router v6

Esta guía explica cómo funciona el sistema de enrutamiento con React Router v6 en la aplicación.

## 📚 Conceptos Básicos

### ¿Qué es React Router v6?

React Router v6 es la biblioteca de enrutamiento estándar para React que permite:
- Navegación entre diferentes vistas/páginas
- URLs amigables y compartibles
- Manejo del historial del navegador
- Parámetros dinámicos en las rutas

### Componentes Principales

#### `<BrowserRouter>`
Envuelve toda la aplicación y habilita el routing basado en URL del navegador.

```tsx
<BrowserRouter>
  <App />
</BrowserRouter>
```

#### `<Routes>` y `<Route>`
Definen las rutas de la aplicación.

```tsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
```

#### Hooks de Navegación

- **`useNavigate()`**: Para navegación programática
- **`useLocation()`**: Para obtener la ubicación actual
- **`useParams()`**: Para acceder a parámetros de ruta

## 🗺️ Estructura de Rutas en el Proyecto

### Archivo de Configuración

Todas las rutas están definidas en `/routes/AppRoutes.tsx`:

```tsx
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/clientes">
        <Route path="crear" element={<ClientesCrear />} />
        <Route path="ver" element={<ClientesVer />} />
        <Route path=":id" element={<ClienteDetalle />} />
      </Route>
    </Routes>
  )
}
```

### Rutas Anidadas

React Router v6 permite anidar rutas de forma intuitiva:

```tsx
<Route path="/clientes">
  {/* /clientes/crear */}
  <Route path="crear" element={<ClientesCrear />} />
  
  {/* /clientes/ver */}
  <Route path="ver" element={<ClientesVer />} />
  
  {/* /clientes/123 */}
  <Route path=":id" element={<ClienteDetalle />} />
  
  {/* /clientes/123/editar */}
  <Route path=":id/editar" element={<ClienteEditar />} />
</Route>
```

## 🧭 Navegación

### 1. Navegación con useNavigate()

```tsx
import { useNavigate } from "react-router-dom"

function MiComponente() {
  const navigate = useNavigate()
  
  // Navegar a una ruta
  const irAClientes = () => {
    navigate("/clientes/ver")
  }
  
  // Navegar con parámetros
  const verCliente = (id: number) => {
    navigate(`/clientes/${id}`)
  }
  
  // Navegar hacia atrás
  const volver = () => {
    navigate(-1) // Equivalente al botón "atrás" del navegador
  }
  
  // Reemplazar la entrada del historial
  const irAlInicio = () => {
    navigate("/", { replace: true })
  }
  
  return (
    <div>
      <button onClick={irAClientes}>Ver Clientes</button>
      <button onClick={() => verCliente(123)}>Ver Cliente 123</button>
      <button onClick={volver}>Volver</button>
    </div>
  )
}
```

### 2. Navegación con Link

Para enlaces simples, puedes usar el componente `<Link>`:

```tsx
import { Link } from "react-router-dom"

function Menu() {
  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/clientes/ver">Clientes</Link>
      <Link to="/valoraciones/crear">Nueva Valoración</Link>
    </nav>
  )
}
```

### 3. Navegación en el Sidebar

El Sidebar usa un callback que internamente llama a `navigate()`:

```tsx
// En Sidebar.tsx
<button onClick={() => onSectionChange('crear-cliente')}>
  Crear Cliente
</button>

// En DashboardLayout.tsx
const handleSectionChange = (sectionId: string) => {
  const route = sectionToRoute[sectionId] // Convierte ID a ruta
  if (route) {
    navigate(route)
  }
}
```

## 📋 Parámetros de Ruta

### Definir Parámetros

```tsx
<Route path="/clientes/:id" element={<ClienteDetalle />} />
<Route path="/valoraciones/:id/editar" element={<ValoracionEditar />} />
```

### Acceder a Parámetros

```tsx
import { useParams } from "react-router-dom"

function ClienteDetalle() {
  const { id } = useParams<{ id: string }>()
  
  // Convertir a número si es necesario
  const clienteId = id ? parseInt(id) : null
  
  if (!clienteId) {
    return <div>Cliente no encontrado</div>
  }
  
  return <div>Viendo cliente {clienteId}</div>
}
```

## 🔍 Ubicación Actual

### useLocation()

```tsx
import { useLocation } from "react-router-dom"

function MiComponente() {
  const location = useLocation()
  
  console.log(location.pathname)  // "/clientes/123"
  console.log(location.search)    // "?tab=info"
  console.log(location.hash)      // "#section1"
  console.log(location.state)     // Estado pasado con navigate
  
  return <div>Ruta actual: {location.pathname}</div>
}
```

### Determinar Sección Activa

En `DashboardLayout.tsx`, usamos `useLocation()` para determinar qué item del sidebar debe estar activo:

```tsx
const getActiveSectionFromPath = (): string => {
  const path = location.pathname
  
  // Rutas exactas
  if (routeToSection[path]) {
    return routeToSection[path]
  }
  
  // Rutas con parámetros
  if (path.startsWith('/clientes/') && path.match(/^\/clientes\/\d+$/)) {
    return 'perfil-usuario'
  }
  
  return 'menu-principal'
}
```

## ➕ Agregar una Nueva Ruta

### Paso 1: Crear el Componente de Página

```tsx
// /pages/MiNuevaPagina.tsx
export function MiNuevaPagina() {
  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <h1 className="text-2xl font-semibold text-gray-800">
        Mi Nueva Página
      </h1>
      {/* Contenido */}
    </div>
  )
}
```

### Paso 2: Exportar desde /pages/index.tsx

```tsx
// /pages/index.tsx
export { MiNuevaPagina } from "./MiNuevaPagina"
```

### Paso 3: Agregar la Ruta en AppRoutes.tsx

```tsx
// /routes/AppRoutes.tsx
import { MiNuevaPagina } from "../pages"

export function AppRoutes() {
  return (
    <Routes>
      {/* Rutas existentes... */}
      <Route path="/mi-nueva-pagina" element={<MiNuevaPagina />} />
    </Routes>
  )
}
```

### Paso 4: Actualizar los Mapeos

```tsx
// /routes/AppRoutes.tsx
export const sectionToRoute: Record<string, string> = {
  // Existentes...
  'mi-nueva-seccion': '/mi-nueva-pagina'
}

export const routeToSection: Record<string, string> = {
  // Existentes...
  '/mi-nueva-pagina': 'mi-nueva-seccion'
}
```

### Paso 5: Agregar al Sidebar (Opcional)

```tsx
// /components/layout/Sidebar.tsx
const menuItems: MenuItem[] = [
  // Existentes...
  {
    id: 'mi-nueva-seccion',
    label: 'Mi Nueva Sección',
    icon: Star,
    hasSubmenu: false
  }
]
```

### Paso 6: Agregar Título al Header (Opcional)

```tsx
// /components/layout/DashboardHeader.tsx
const PAGE_TITLES: { [key: string]: string } = {
  // Existentes...
  'mi-nueva-seccion': 'Mi Nueva Página'
}
```

## 🔐 Rutas Protegidas

Actualmente, todas las rutas están protegidas por autenticación en `App.tsx`:

```tsx
function AppContent() {
  const { isAuthenticated, login } = useAuth()

  if (!isAuthenticated) {
    return <Login onLogin={login} />
  }

  return (
    <DashboardLayout>
      <AppRoutes />
    </DashboardLayout>
  )
}
```

Para crear rutas públicas, podrías modificar esto:

```tsx
function AppContent() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  
  const publicRoutes = ['/terminos', '/privacidad']
  const isPublicRoute = publicRoutes.includes(location.pathname)
  
  if (!isAuthenticated && !isPublicRoute) {
    return <Login />
  }
  
  return isPublicRoute ? (
    <AppRoutes />
  ) : (
    <DashboardLayout>
      <AppRoutes />
    </DashboardLayout>
  )
}
```

## 🎯 Navegación con Estado

Puedes pasar estado entre rutas:

```tsx
// Página origen
const navigate = useNavigate()

navigate('/clientes/123', {
  state: { from: 'dashboard', highlight: true }
})

// Página destino
const location = useLocation()
const state = location.state as { from: string; highlight: boolean }

if (state?.highlight) {
  // Hacer algo especial
}
```

## 📱 Query Parameters

Para trabajar con query parameters:

```tsx
import { useSearchParams } from "react-router-dom"

function Lista() {
  const [searchParams, setSearchParams] = useSearchParams()
  
  // Leer parámetros
  const filtro = searchParams.get('filtro') // ?filtro=activos
  const pagina = searchParams.get('pagina') // ?pagina=2
  
  // Establecer parámetros
  const aplicarFiltro = (valor: string) => {
    setSearchParams({ filtro: valor })
  }
  
  return (
    <div>
      <input 
        value={filtro || ''} 
        onChange={(e) => aplicarFiltro(e.target.value)} 
      />
    </div>
  )
}
```

## 🚫 Ruta 404

La aplicación tiene una ruta catch-all que redirige al dashboard:

```tsx
<Route path="*" element={<Navigate to="/" replace />} />
```

Para mostrar una página 404 personalizada:

```tsx
// Crear /pages/NotFound.tsx
export function NotFound() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl">404</h1>
      <p>Página no encontrada</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  )
}

// En AppRoutes.tsx
<Route path="*" element={<NotFound />} />
```

## 🔄 Redirecciones

```tsx
import { Navigate } from "react-router-dom"

// Redirección simple
<Route path="/old-path" element={<Navigate to="/new-path" replace />} />

// Redirección condicional
function ConditionalRedirect() {
  const { user } = useAuth()
  
  if (!user.hasPermission) {
    return <Navigate to="/" replace />
  }
  
  return <AdminPanel />
}
```

## ✅ Mejores Prácticas

1. **Usa rutas relativas** en componentes anidados
2. **Centraliza las rutas** en un solo archivo
3. **Usa TypeScript** para tipado de parámetros
4. **Evita lógica compleja** en los componentes de ruta
5. **Documenta las rutas** con comentarios
6. **Usa Navigate** solo para redirecciones, no para navegación de usuario
7. **Prefiere Link** sobre `navigate()` para enlaces simples
8. **Mantén las rutas planas** cuando sea posible

## 🐛 Debugging

```tsx
function DebugRoutes() {
  const location = useLocation()
  const params = useParams()
  
  console.log('Ruta actual:', location.pathname)
  console.log('Parámetros:', params)
  console.log('Query string:', location.search)
  
  return null
}

// Agregar al App
<DebugRoutes />
<AppRoutes />
```

## 📚 Recursos Adicionales

- [React Router v6 Documentación Oficial](https://reactrouter.com/en/main)
- [Guía de Migración v5 → v6](https://reactrouter.com/en/main/upgrading/v5)
- [Tutorial Interactivo](https://reactrouter.com/en/main/start/tutorial)

---

**Última actualización**: Noviembre 2025
