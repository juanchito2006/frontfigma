# Guía de Integración con API Backend

## Resumen de Cambios Realizados

Se ha completado la refactorización de la aplicación para eliminar el componente `AdminContent.tsx` y separar el contenido en páginas individuales. Cada página ahora tiene su propio archivo y está lista para conectarse a tu API backend personalizada.

## Estado de las Páginas

### ✅ Páginas Limpias (Sin Datos Mock)

Las siguientes páginas ya NO tienen datos mock y están listas para conectarse a tu API:

1. **`/pages/ClientesCrear.tsx`**
   - Formulario de creación de clientes
   - Incluye comentarios `// TODO:` indicando dónde conectar la API
   - Endpoint sugerido: `POST /api/clientes`

2. **`/pages/ClientesVer.tsx`**
   - Lista de clientes con búsqueda y filtros
   - Endpoint sugerido: `GET /api/clientes`

3. **`/pages/ValoracionesCrear.tsx`**
   - Formulario completo de valoraciones con todas las secciones
   - Endpoint sugerido: `POST /api/valoraciones`

4. **`/pages/ValoracionesVer.tsx`**
   - Lista de valoraciones con búsqueda
   - Endpoint sugerido: `GET /api/valoraciones`

5. **`/pages/EjerciciosCrear.tsx`**
   - Formulario de creación de ejercicios con carga de archivos
   - Endpoint sugerido: `POST /api/ejercicios`
   - Soporte para FormData para archivos multimedia

6. **`/pages/EjerciciosVer.tsx`**
   - Lista de ejercicios con filtros por categoría y dificultad
   - Endpoint sugerido: `GET /api/ejercicios`
   - Eliminación: `DELETE /api/ejercicios/:id`

7. **`/pages/Perfil.tsx`**
   - Perfil del usuario autenticado
   - Endpoints sugeridos:
     - `PUT /api/usuarios/perfil` - Actualizar perfil
     - `POST /api/usuarios/cambiar-password` - Cambiar contraseña

### ✅ Páginas que ya tenían Componentes Dedicados

Estas páginas ya estaban bien estructuradas y usan componentes específicos:

1. **`/pages/Dashboard.tsx`** - Usa `DashboardContent`
2. **`/pages/Calendario.tsx`** - Usa `ScheduleView`
3. **`/pages/Configuracion.tsx`** - Usa `ConfigurationSettings`

### ⚠️ Componentes con Datos Mock (Requieren Actualización)

Los siguientes componentes todavía contienen datos mock y necesitan ser actualizados para conectarse a tu API:

1. **`/components/UserProfileView.tsx`**
   - Tiene un array `usuariosDB` con datos mock
   - Usado por `/pages/ClienteDetalle.tsx`
   - Necesita: `GET /api/usuarios/:id`

2. **`/components/UserEditView.tsx`**
   - Tiene un array `usuariosDB` con datos mock
   - Usado por `/pages/ClienteEditar.tsx`
   - Necesita: 
     - `GET /api/usuarios/:id`
     - `PUT /api/usuarios/:id`

3. **`/components/ValoracionDetailView.tsx`**
   - Usa el contexto ValoracionContext
   - Usado por `/pages/ValoracionDetalle.tsx`
   - Necesita: `GET /api/valoraciones/:id`

4. **`/components/ValoracionEditView.tsx`**
   - Usa el contexto ValoracionContext
   - Usado por `/pages/ValoracionEditar.tsx`
   - Necesita:
     - `GET /api/valoraciones/:id`
     - `PUT /api/valoraciones/:id`

5. **`/components/DashboardContent.tsx`**
   - Puede tener datos estáticos para widgets
   - Necesita: `GET /api/estadisticas/dashboard`

6. **`/components/ScheduleView.tsx`**
   - Vista de calendario
   - Necesita: `GET /api/valoraciones/calendario`

7. **`/components/ConfigurationSettings.tsx`**
   - Configuraciones del sistema
   - Necesita: 
     - `GET /api/configuracion`
     - `PUT /api/configuracion`

## Estructura de API Recomendada

### Clientes / Usuarios

```
GET    /api/clientes              # Lista de clientes
POST   /api/clientes              # Crear cliente
GET    /api/clientes/:id          # Detalle de cliente
PUT    /api/clientes/:id          # Actualizar cliente
DELETE /api/clientes/:id          # Eliminar cliente
```

### Valoraciones

```
GET    /api/valoraciones          # Lista de valoraciones
POST   /api/valoraciones          # Crear valoración
GET    /api/valoraciones/:id      # Detalle de valoración
PUT    /api/valoraciones/:id      # Actualizar valoración
DELETE /api/valoraciones/:id      # Eliminar valoración
GET    /api/valoraciones/calendario  # Valoraciones para calendario
```

### Ejercicios

```
GET    /api/ejercicios            # Lista de ejercicios
POST   /api/ejercicios            # Crear ejercicio (multipart/form-data)
GET    /api/ejercicios/:id        # Detalle de ejercicio
PUT    /api/ejercicios/:id        # Actualizar ejercicio
DELETE /api/ejercicios/:id        # Eliminar ejercicio
```

### Usuario Autenticado

```
GET    /api/usuarios/perfil       # Perfil del usuario autenticado
PUT    /api/usuarios/perfil       # Actualizar perfil
POST   /api/usuarios/cambiar-password  # Cambiar contraseña
```

### Dashboard y Estadísticas

```
GET    /api/estadisticas/dashboard    # Datos para dashboard principal
GET    /api/estadisticas/gym          # Estadísticas del gimnasio
```

## Patrón de Integración

Todas las páginas siguen el mismo patrón para facilitar la integración:

```typescript
// 1. Estado para datos
const [datos, setDatos] = useState<any[]>([])
const [loading, setLoading] = useState(false)

// 2. Cargar datos al montar
useEffect(() => {
  loadDatos()
}, [])

// 3. Función de carga con TODO comentado
const loadDatos = async () => {
  setLoading(true)
  try {
    // TODO: Aquí se conectará con la API del backend
    // const response = await fetch('/api/endpoint')
    // const data = await response.json()
    // setDatos(data)
    
    // Por ahora, datos vacíos
    setDatos([])
  } catch (error) {
    console.error('Error:', error)
  } finally {
    setLoading(false)
  }
}

// 4. Función de guardado/actualización
const handleSubmit = async () => {
  try {
    // TODO: Aquí se conectará con la API del backend
    // const response = await fetch('/api/endpoint', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // })
    
    toast.success("Operación exitosa")
  } catch (error) {
    toast.error("Error en la operación")
  }
}
```

## Contextos de Estado

### ValoracionContext

El contexto de valoraciones (`/context/ValoracionContext.tsx`) gestiona el estado global de las valoraciones. Deberías actualizarlo para:

1. Cargar valoraciones desde tu API
2. Sincronizar cambios con el backend
3. Mantener el estado actualizado en toda la aplicación

### AuthContext

El contexto de autenticación (`/context/AuthContext.tsx`) ya está configurado para React Router y gestiona:

- Estado de autenticación
- Información del usuario actual
- Login/Logout

## Próximos Pasos

1. **Implementar servicios de API**: Crea una carpeta `/services` o `/api` con funciones para cada endpoint
   ```typescript
   // /services/clientes.service.ts
   export const clientesService = {
     getAll: async () => fetch('/api/clientes').then(r => r.json()),
     getById: async (id: number) => fetch(`/api/clientes/${id}`).then(r => r.json()),
     create: async (data: any) => fetch('/api/clientes', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(data)
     }),
     // ...
   }
   ```

2. **Configurar axios o fetch interceptors**: Para manejar autenticación, errores globales, etc.

3. **Actualizar componentes auxiliares**: Actualiza los componentes en ⚠️ para que usen la API

4. **Eliminar datos mock restantes**: Una vez que la API esté funcionando, elimina los arrays de datos mock de los componentes auxiliares

5. **Testing**: Prueba cada página con tu API real

## Estructura Final sin AdminContent

```
/
├── pages/
│   ├── ClientesCrear.tsx       ✅ Sin mock, lista para API
│   ├── ClientesVer.tsx         ✅ Sin mock, lista para API
│   ├── ClienteDetalle.tsx      ⚠️ Usa UserProfileView (tiene mock)
│   ├── ClienteEditar.tsx       ⚠️ Usa UserEditView (tiene mock)
│   ├── ValoracionesCrear.tsx   ✅ Sin mock, lista para API
│   ├── ValoracionesVer.tsx     ✅ Sin mock, lista para API
│   ├── ValoracionDetalle.tsx   ⚠️ Usa ValoracionDetailView
│   ├── ValoracionEditar.tsx    ⚠️ Usa ValoracionEditView
│   ├── EjerciciosCrear.tsx     ✅ Sin mock, lista para API
│   ├── EjerciciosVer.tsx       ✅ Sin mock, lista para API
│   ├── Perfil.tsx              ✅ Sin mock, lista para API
│   ├── Dashboard.tsx           ✅ Usa DashboardContent
│   ├── Calendario.tsx          ✅ Usa ScheduleView
│   └── Configuracion.tsx       ✅ Usa ConfigurationSettings
├── components/
│   ├── UserProfileView.tsx     ⚠️ Tiene mock - actualizar
│   ├── UserEditView.tsx        ⚠️ Tiene mock - actualizar
│   ├── ValoracionDetailView.tsx
│   ├── ValoracionEditView.tsx
│   ├── DashboardContent.tsx
│   ├── ScheduleView.tsx
│   └── ConfigurationSettings.tsx
└── routes/
    └── AppRoutes.tsx           ✅ Configurado con React Router

❌ AdminContent.tsx - ELIMINADO ✅
```

## Notas Importantes

- **Validación**: Añade validación apropiada antes de enviar datos a la API
- **Manejo de Errores**: Implementa manejo de errores robusto (códigos 400, 401, 403, 404, 500)
- **Loading States**: Todas las páginas ya manejan estados de carga
- **Toasts**: Se usa `sonner` para notificaciones - ya está integrado
- **Navegación**: Todo usa React Router v6 correctamente
- **Formularios**: Considera usar `react-hook-form` para formularios complejos
- **TypeScript**: Define interfaces para tus modelos de datos

## Beneficios de la Nueva Estructura

✅ Cada página en su propio archivo
✅ Separación de responsabilidades
✅ Fácil de mantener y escalar  
✅ React Router integrado correctamente
✅ Sin switch gigante
✅ Preparado para API backend
✅ Código limpio y organizado
