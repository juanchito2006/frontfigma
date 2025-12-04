/**
 * ValoracionesVer - Página para ver la lista de valoraciones
 * 
 * Muestra la tabla de valoraciones con búsqueda y opciones de acción.
 * Los datos se obtendrán de la API del backend personalizado.
 */

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Badge } from "../components/ui/badge"
import { Search, Plus, Eye, Edit, Download } from "lucide-react"

export function ValoracionesVer() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [valoraciones, setValoraciones] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // Cargar valoraciones desde la API
  useEffect(() => {
    loadValoraciones()
  }, [])

  const loadValoraciones = async () => {
    setLoading(true)
    try {
      // TODO: Aquí se conectará con la API del backend
      // const response = await fetch('/api/valoraciones')
      // const data = await response.json()
      // setValoraciones(data)
      
      // Por ahora, datos vacíos
      setValoraciones([])
    } catch (error) {
      console.error('Error cargando valoraciones:', error)
    } finally {
      setLoading(false)
    }
  }

  // Filtrar valoraciones por búsqueda
  const filteredValoraciones = valoraciones.filter(valoracion =>
    valoracion.usuario?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    valoracion.documento?.includes(searchTerm) ||
    valoracion.fecha?.includes(searchTerm)
  )

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
              <CardTitle>Lista de Valoraciones</CardTitle>
              <CardDescription>
                {filteredValoraciones.length} valoracion(es) registrada(s)
              </CardDescription>
            </div>
            <Button
              onClick={() => navigate('/valoraciones/crear')}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nueva Valoración
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Búsqueda */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por usuario, documento o fecha..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Tabla */}
          {loading ? (
            <div className="text-center py-8 text-gray-500">
              Cargando valoraciones...
            </div>
          ) : filteredValoraciones.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? 'No se encontraron valoraciones' : 'No hay valoraciones registradas'}
            </div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Documento</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>IMC</TableHead>
                    <TableHead>Peso</TableHead>
                    <TableHead>Talla</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredValoraciones.map((valoracion) => (
                    <TableRow key={valoracion.id}>
                      <TableCell>{valoracion.usuario}</TableCell>
                      <TableCell>{valoracion.documento}</TableCell>
                      <TableCell>{valoracion.fecha}</TableCell>
                      <TableCell>
                        {valoracion.imc && (
                          <Badge variant="secondary">
                            {valoracion.imc}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{valoracion.peso ? `${valoracion.peso} kg` : '-'}</TableCell>
                      <TableCell>{valoracion.talla ? `${valoracion.talla} cm` : '-'}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/valoraciones/${valoracion.id}`)}
                            title="Ver detalle"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/valoraciones/${valoracion.id}/editar`)}
                            title="Editar"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              // TODO: Implementar exportación
                              console.log('Exportar valoración', valoracion.id)
                            }}
                            title="Exportar"
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
