# Guía de Migración: Navegación por Estado → React Router v6

Este documento explica los cambios realizados al migrar de navegación por estado a React Router v6.

## 📊 Comparación: Antes vs Después

### Sistema Anterior (Navegación por Estado)

#### Características
- Usaba `useState` para controlar qué vista mostrar
- Switch/case para renderizar componentes
- Callbacks para cambiar entre vistas
- URLs siempre permanecían igual
- No se podía compartir enlaces a vistas específicas
- Historial del navegador no funcionaba

#### Código Anterior

```tsx
// App.tsx (ANTERIOR)
function AppContent() {
  const [activeSection, setActiveSection] = useState('menu-principal')
  const [selectedUserId, setSelectedUserId] = useState(null)

  const renderContent = () => {
    if (activeSection === 'menu-principal') {
      return <DashboardContent />
    }
    if (activeSection === 'ver-clientes') {
      return <ClientesList />
    }
    if (activeSection === 'perfil-usuario' && selectedUserId) {
      return <UserProfile userId={selectedUserId} />
    }
    return <AdminContent activeSection={activeSection} />
  }

  return (
    <DashboardLayout 
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {renderContent()}
    </DashboardLayout>
  )
}
```

```tsx
// Sidebar.tsx (ANTERIOR)
<button onClick={() => onSectionChange('ver-clientes')}>
  Ver Clientes
</button>

// Para navegar con datos
<button onClick={() => {
  setSelectedUserId(123)
  setActiveSection('perfil-usuario')
}}>
  Ver Perfil
</button>
```

### Sistema Nuevo (React Router v6)

#### Características
- Usa React Router para manejar la navegación
- URLs cambian según la vista actual
- Se pueden compartir enlaces directos
- Historial del navegador funciona correctamente
- Soporte para parámetros en la URL
- Mejor experiencia de usuario

#### Código Nuevo

```tsx
// App.tsx (NUEVO)
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ValoracionProvider>
          <AppContent />
        </ValoracionProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

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

```tsx
// routes/AppRoutes.tsx (NUEVO)
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/clientes/ver" element={<ClientesVer />} />
      <Route path="/clientes/:id" element={<ClienteDetalle />} />
    </Routes>
  )
}
```

```tsx
// Navegación (NUEVO)
const navigate = useNavigate()

// Simple
<button onClick={() => navigate('/clientes/ver')}>
  Ver Clientes
</button>

// Con parámetro
<button onClick={() => navigate(`/clientes/${123}`)}>
  Ver Perfil
</button>
```

## 🔄 Cambios Realizados

### 1. Estructura de Archivos

#### Antes
```
/
├── App.tsx (lógica de navegación + renderizado)
├── components/
│   ├── AdminContent.tsx (switch gigante)
│   └── AdminSidebar.tsx
```

#### Después
```
/
├── App.tsx (configuración de providers y router)
├── pages/ (NUEVO)
│   ├── Dashboard.tsx
│   ├── ClientesVer.tsx
│   ├── ClienteDetalle.tsx
│   └── ...
├── routes/ (NUEVO)
│   └── AppRoutes.tsx (configuración de rutas)
└── components/
    ├── AdminContent.tsx (simplificado)
    └── layout/
        ├── DashboardLayout.tsx (integrado con router)
        └── Sidebar.tsx (usa navigate)
```

### 2. App.tsx

#### Antes
```tsx
function AppContent() {
  const [activeSection, setActiveSection] = useState('menu-principal')
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [selectedValoracionId, setSelectedValoracionId] = useState(null)
  
  // Múltiples funciones de navegación
  const handleNavigateToUserProfile = (userId) => {
    setSelectedUserId(userId)
    setActiveSection('perfil-usuario')
  }
  
  // Switch case gigante
  const renderContent = () => {
    if (activeSection === 'menu-principal') return <DashboardContent />
    if (activeSection === 'ver-clientes') return <AdminContent ... />
    // ... muchos más casos
  }
  
  return (
    <DashboardLayout 
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {renderContent()}
    </DashboardLayout>
  )
}
```

#### Después
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

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ValoracionProvider>
          <AppContent />
        </ValoracionProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
```

### 3. DashboardLayout.tsx

#### Antes
```tsx
interface DashboardLayoutProps {
  children: ReactNode
  activeSection: string
  onSectionChange: (section: string) => void
}

export function DashboardLayout({ 
  children, 
  activeSection, 
  onSectionChange 
}: DashboardLayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader currentPage={activeSection} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={onSectionChange}
        />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  )
}
```

#### Después
```tsx
interface DashboardLayoutProps {
  children: ReactNode
  // Ya no necesita activeSection ni onSectionChange
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()

  // Deriva activeSection de la URL
  const getActiveSectionFromPath = (): string => {
    const path = location.pathname
    if (routeToSection[path]) {
      return routeToSection[path]
    }
    // ... lógica de mapeo
    return 'menu-principal'
  }

  // Convierte sectionId a ruta y navega
  const handleSectionChange = (sectionId: string) => {
    const route = sectionToRoute[sectionId]
    if (route) {
      navigate(route)
    }
  }

  const activeSection = getActiveSectionFromPath()

  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader currentPage={activeSection} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  )
}
```

### 4. Sidebar.tsx

El componente Sidebar se mantiene prácticamente igual, pero ahora el callback `onSectionChange` usa `navigate()` internamente:

```tsx
// Antes y Después (similar)
<button onClick={() => onSectionChange('ver-clientes')}>
  Ver Clientes
</button>

// La diferencia está en DashboardLayout:
// Antes: setActiveSection('ver-clientes')
// Después: navigate('/clientes/ver')
```

### 5. Componentes de Página

#### Antes (Todo en AdminContent)
```tsx
// AdminContent.tsx
case 'ver-clientes':
  return (
    <div className="p-6">
      <h1>Ver Clientes</h1>
      {/* ... contenido inline ... */}
    </div>
  )
```

#### Después (Componentes Separados)
```tsx
// pages/ClientesVer.tsx
export function ClientesVer() {
  const navigate = useNavigate()
  
  return (
    <AdminContent 
      activeSection="ver-clientes"
      onNavigateToUserProfile={(userId) => navigate(`/clientes/${userId}`)}
    />
  )
}

// pages/ClienteDetalle.tsx
export function ClienteDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  return (
    <UserProfileView 
      userId={parseInt(id)}
      onBack={() => navigate("/clientes/ver")}
    />
  )
}
```

### 6. Navegación Programática

#### Antes
```tsx
// Múltiples estados y funciones
const [selectedUserId, setSelectedUserId] = useState(null)

const handleViewUser = (userId) => {
  setSelectedUserId(userId)
  setActiveSection('perfil-usuario')
}

<button onClick={() => handleViewUser(123)}>Ver Usuario</button>
```

#### Después
```tsx
// Un solo hook
const navigate = useNavigate()

<button onClick={() => navigate('/clientes/123')}>
  Ver Usuario
</button>
```

## 🎯 Beneficios de la Migración

### 1. URLs Compartibles
**Antes**: Imposible compartir un enlace a una vista específica
**Después**: Cada vista tiene su propia URL compartible

```
Antes: https://app.com/
Después: https://app.com/clientes/123
```

### 2. Historial del Navegador
**Antes**: Botones atrás/adelante no funcionan
**Después**: Funcionan correctamente, mejorando UX

### 3. Deep Linking
**Antes**: Siempre se carga el dashboard
**Después**: Se puede acceder directamente a cualquier vista

### 4. Menos Estado
**Antes**: Múltiples estados para navegación
```tsx
const [activeSection, setActiveSection] = useState('menu-principal')
const [selectedUserId, setSelectedUserId] = useState(null)
const [selectedValoracionId, setSelectedValoracionId] = useState(null)
```

**Después**: La URL es la única fuente de verdad
```tsx
// No se necesitan estados de navegación
// La ruta y parámetros están en la URL
```

### 5. Código Más Limpio
**Antes**: Switch/case gigante con mucha lógica
**Después**: Cada ruta es un componente independiente

### 6. Mejor Testing
**Antes**: Difícil testear navegación
**Después**: Se puede testear cada ruta individualmente

### 7. SEO Friendly
**Antes**: Una sola URL para toda la app
**Después**: URLs descriptivas para cada vista (útil si se implementa SSR)

## 🚀 Cómo Usar el Nuevo Sistema

### Navegar a una Vista Simple
```tsx
const navigate = useNavigate()
navigate('/valoraciones/crear')
```

### Navegar con Parámetros
```tsx
const navigate = useNavigate()
const userId = 123
navigate(`/clientes/${userId}`)
```

### Navegar y Pasar Estado
```tsx
navigate('/clientes/ver', {
  state: { message: 'Usuario creado exitosamente' }
})

// En el destino
const location = useLocation()
const message = location.state?.message
```

### Volver a la Página Anterior
```tsx
const navigate = useNavigate()
navigate(-1) // Equivalente al botón "atrás"
```

### Obtener Parámetros de Ruta
```tsx
const { id } = useParams()
// URL: /clientes/123
// id = "123"
```

### Verificar Ruta Actual
```tsx
const location = useLocation()
console.log(location.pathname) // "/clientes/123"

// Condicional
if (location.pathname.startsWith('/clientes/')) {
  // Estamos en la sección de clientes
}
```

## 📝 Checklist de Migración

- [x] Instalar React Router v6
- [x] Crear estructura de `/pages`
- [x] Crear `/routes/AppRoutes.tsx`
- [x] Envolver App con `<BrowserRouter>`
- [x] Actualizar `DashboardLayout` para usar `useLocation()` y `useNavigate()`
- [x] Actualizar componentes para usar `useNavigate()` en lugar de callbacks
- [x] Crear mapeos `sectionToRoute` y `routeToSection`
- [x] Actualizar documentación
- [x] Testear todas las rutas
- [x] Verificar que los botones atrás/adelante funcionen
- [x] Verificar que se puedan compartir URLs

## 🐛 Problemas Comunes y Soluciones

### Problema: "useNavigate() may be used only in the context of a <Router>"
**Solución**: Asegúrate de que `<BrowserRouter>` envuelva toda tu app antes de cualquier uso de hooks de router.

```tsx
// ❌ Incorrecto
<AuthProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</AuthProvider>

// ✅ Correcto
<BrowserRouter>
  <AuthProvider>
    <App />
  </AuthProvider>
</BrowserRouter>
```

### Problema: El sidebar no muestra la sección activa correcta
**Solución**: Verifica el mapeo en `getActiveSectionFromPath()` y asegúrate de que incluya todas las rutas.

### Problema: Parámetros de ruta no se obtienen correctamente
**Solución**: Verifica que:
1. La ruta esté definida con el parámetro: `path=":id"`
2. Estés usando `useParams()` correctamente
3. El parámetro tenga el mismo nombre en ambos lugares

## 📚 Referencias

- [Documentación de React Router v6](https://reactrouter.com/)
- [Guía de Migración Oficial](https://reactrouter.com/en/main/upgrading/v5)
- [Tutorial de React Router](https://reactrouter.com/en/main/start/tutorial)

---

**Última actualización**: Noviembre 2025
**Estado**: Migración completada ✅
