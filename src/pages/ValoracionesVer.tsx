/**
 * ValoracionesVer - Página para ver la lista de valoraciones
 * 
 * Muestra la tabla de valoraciones con búsqueda y opciones de acción.
 * Los datos se obtendrán de la API del backend personalizado.
 */

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Badge } from "../components/ui/badge"
import { Search, Plus, Eye, Edit, Download, User, Calendar, Hash, Info } from "lucide-react"
import { useList } from "../hooks/useGenericCrud"
import type { ValoracionCompleta } from "../types/schema.types"
import { useDebounce } from "../hooks/useDebounce"

export function ValoracionesVer() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 300) // Debounce de 300ms
  
  // Usar el hook useList para obtener valoraciones, pero solo habilitado después de 3 caracteres
  const shouldFetch = debouncedSearchTerm.length >= 3
  
  const { 
    data: valoraciones = [], 
    isLoading: loading, 
    refetch 
  } = useList<ValoracionCompleta>({
    resourceName: "valoracion",
    queryOptions: {
      enabled: shouldFetch, // Solo buscar si hay al menos 3 caracteres
    },
  })

  // Filtrar valoraciones por múltiples criterios (ya viene filtrado del backend)
  const filteredValoraciones = valoraciones.filter(valoracion => {
    if (!shouldFetch) return false // Si no hay búsqueda, no mostrar nada
    
    const searchLower = debouncedSearchTerm.toLowerCase()
    
    // Buscar por ID de valoración
    if (valoracion.val_id?.toString().includes(debouncedSearchTerm)) return true
    
    // Buscar por documento del usuario
    if (valoracion.usuario?.usu_di?.toString().includes(debouncedSearchTerm)) return true
    
    // Buscar por nombre completo del usuario
    const nombreCompleto = `${valoracion.usuario?.usu_nombre || ''} ${valoracion.usuario?.usu_apellido || ''}`.toLowerCase()
    if (nombreCompleto.includes(searchLower)) return true
    
    // Buscar por nombre individual
    if (valoracion.usuario?.usu_nombre?.toLowerCase().includes(searchLower)) return true
    if (valoracion.usuario?.usu_apellido?.toLowerCase().includes(searchLower)) return true
    
    // Buscar por fecha de valoración
    if (valoracion.val_fecha?.toLowerCase().includes(searchLower)) return true
    
    return false
  })

  // Formatear fecha
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return dateString
    }
  }

  // Formatear fecha próxima control
  const formatProxControl = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-green-700 mb-2">Valoraciones</h1>
        <p className="text-gray-600">Gestión de valoraciones del sistema</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Buscar Valoraciones</CardTitle>
              <CardDescription>
                {shouldFetch && filteredValoraciones.length > 0 
                  ? `${filteredValoraciones.length} valoracion(es) encontrada(s)`
                  : "Escribe al menos 3 caracteres para buscar"}
                {shouldFetch && filteredValoraciones.length === 0 && (
                  <span className="text-amber-600 ml-2">(Búsqueda: "{debouncedSearchTerm}")</span>
                )}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              {shouldFetch && (
                <Button
                  variant="outline"
                  onClick={() => refetch()}
                >
                  Actualizar
                </Button>
              )}
              <Button
                onClick={() => navigate('/valoraciones/crear')}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nueva Valoración
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Búsqueda */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por ID, documento, nombre, apellido o fecha (mínimo 3 caracteres)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Indicador de búsqueda */}
            <div className="mt-2 flex items-center justify-between">
              <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Hash className="h-3 w-3" />
                  <span>ID Valoración</span>
                </div>
                <div className="flex items-center gap-1">
                  <Hash className="h-3 w-3" />
                  <span>Documento</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>Nombre/Apellido</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Fecha</span>
                </div>
              </div>
              
              {searchTerm.length > 0 && searchTerm.length < 3 && (
                <div className="flex items-center gap-1 text-amber-600 text-xs">
                  <Info className="h-3 w-3" />
                  <span>Escribe al menos 3 caracteres para buscar</span>
                </div>
              )}
              
              {shouldFetch && filteredValoraciones.length > 0 && (
                <div className="flex items-center gap-1 text-green-600 text-xs">
                  <Search className="h-3 w-3" />
                  <span>{filteredValoraciones.length} resultado(s)</span>
                </div>
              )}
            </div>
          </div>

          {/* Tabla */}
          {!shouldFetch ? (
            <div className="text-center py-12 text-gray-500 border-2 border-dashed rounded-lg">
              <Search className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <p className="text-lg font-medium mb-1">
                Buscar valoraciones
              </p>
              <p className="text-sm mb-3">
                Escribe al menos 3 caracteres en el campo de búsqueda
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500 mt-4">
                <div className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full">
                  <Hash className="h-3 w-3" />
                  <span>Ej: "123" (ID)</span>
                </div>
                <div className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full">
                  <User className="h-3 w-3" />
                  <span>Ej: "Juan" (Nombre)</span>
                </div>
                <div className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full">
                  <Hash className="h-3 w-3" />
                  <span>Ej: "10012345" (Documento)</span>
                </div>
              </div>
            </div>
          ) : loading ? (
            <div className="text-center py-12 text-gray-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-3"></div>
              Buscando valoraciones...
            </div>
          ) : filteredValoraciones.length === 0 ? (
            <div className="text-center py-12 text-gray-500 border-2 border-dashed rounded-lg">
              <Search className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <p className="text-lg font-medium mb-1">
                No se encontraron valoraciones
              </p>
              <p className="text-sm mb-3">
                No hay resultados para "{debouncedSearchTerm}"
              </p>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchTerm('')}
                >
                  Limpiar búsqueda
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  Intenta con otros términos como nombre, documento o ID
                </p>
              </div>
            </div>
          ) : (
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="font-semibold">ID</TableHead>
                    <TableHead className="font-semibold">Usuario</TableHead>
                    <TableHead className="font-semibold">Documento</TableHead>
                    <TableHead className="font-semibold">Fecha Valoración</TableHead>
                    <TableHead className="font-semibold">Próximo Control</TableHead>
                    <TableHead className="font-semibold">IMC</TableHead>
                    <TableHead className="font-semibold">Peso</TableHead>
                    <TableHead className="font-semibold text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredValoraciones.map((valoracion) => (
                    <TableRow key={valoracion.val_id} className="hover:bg-gray-50">
                      <TableCell>
                        <Badge variant="outline" className="font-mono">
                          #{valoracion.val_id}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {valoracion.usuario?.usu_nombre} {valoracion.usuario?.usu_apellido}
                        </div>
                        <div className="text-xs text-gray-500">
                          {valoracion.usuario?.usu_email}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono">
                        {valoracion.usuario?.usu_di}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {formatDate(valoracion.val_fecha)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {valoracion.val_prox_control ? (
                          <div className="text-sm">
                            {formatProxControl(valoracion.val_prox_control)}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">No programado</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {valoracion.antropometria?.ant_peso && valoracion.antropometria?.ant_talla ? (
                          (() => {
                            const peso = valoracion.antropometria.ant_peso
                            const talla = valoracion.antropometria.ant_talla
                            const imc = peso / ((talla / 100) ** 2)
                            return (
                              <Badge variant={imc < 18.5 ? "outline" : imc < 25 ? "default" : imc < 30 ? "secondary" : "destructive"}>
                                {imc.toFixed(1)}
                              </Badge>
                            )
                          })()
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {valoracion.antropometria?.ant_peso ? (
                            <>
                              <span className="font-medium">{valoracion.antropometria.ant_peso}</span>
                              <span className="text-xs text-gray-500">kg</span>
                            </>
                          ) : (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/valoraciones/${valoracion.val_id}/ver`)}
                            title="Ver detalle completo"
                            className="h-8 w-8"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/valoraciones/${valoracion.val_id}/editar`)}
                            title="Editar"
                            className="h-8 w-8"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              // TODO: Implementar exportación
                              console.log('Exportar valoración', valoracion.val_id)
                            }}
                            title="Exportar PDF"
                            className="h-8 w-8"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}