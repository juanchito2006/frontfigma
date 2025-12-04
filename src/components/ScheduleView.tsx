import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Badge } from "./ui/badge"
import { toast } from "sonner"
import { Plus, X, Clock, User, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"

interface ScheduleEvent {
  id: number
  date: string // formato: YYYY-MM-DD
  timeSlot: string
  title: string
  client: string
  type: string
  description?: string
}

const DAYS_OF_WEEK = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const MONTHS = [
  { value: 0, label: 'Enero' },
  { value: 1, label: 'Febrero' },
  { value: 2, label: 'Marzo' },
  { value: 3, label: 'Abril' },
  { value: 4, label: 'Mayo' },
  { value: 5, label: 'Junio' },
  { value: 6, label: 'Julio' },
  { value: 7, label: 'Agosto' },
  { value: 8, label: 'Septiembre' },
  { value: 9, label: 'Octubre' },
  { value: 10, label: 'Noviembre' },
  { value: 11, label: 'Diciembre' }
]
const TIME_SLOTS = [
  '7:00 - 8:00',
  '8:00 - 9:00',
  '9:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '12:00 - 13:00',
  '13:00 - 14:00',
  '14:00 - 15:00',
  '15:00 - 16:00',
  '16:00 - 17:00',
  '17:00 - 18:00',
  '18:00 - 19:00',
  '19:00 - 20:00',
]

export function ScheduleView() {
  const today = new Date()
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth())
  const [selectedYear] = useState(today.getFullYear())
  const [selectedWeek, setSelectedWeek] = useState(1)

  const [events, setEvents] = useState<ScheduleEvent[]>([
    {
      id: 1,
      date: '2025-11-03', // Lunes 3 de noviembre
      timeSlot: '9:00 - 10:00',
      title: 'Entrenamiento Personal',
      client: 'Juan Carlos Pérez',
      type: 'entrenamiento',
      description: 'Sesión de fuerza y resistencia'
    },
    {
      id: 2,
      date: '2025-11-03',
      timeSlot: '11:00 - 12:00',
      title: 'Valoración Inicial',
      client: 'María Elena González',
      type: 'valoracion',
      description: 'Primera evaluación física'
    },
    {
      id: 3,
      date: '2025-11-04', // Martes 4 de noviembre
      timeSlot: '10:00 - 11:00',
      title: 'Entrenamiento Grupal',
      client: 'Carlos Rodríguez',
      type: 'entrenamiento',
      description: 'Clase de CrossFit'
    },
    {
      id: 4,
      date: '2025-11-05', // Miércoles 5 de noviembre
      timeSlot: '15:00 - 16:00',
      title: 'Fisioterapia',
      client: 'Ana Patricia Martínez',
      type: 'fisioterapia',
      description: 'Sesión de recuperación'
    },
    {
      id: 5,
      date: '2025-11-06', // Jueves 6 de noviembre
      timeSlot: '9:00 - 10:00',
      title: 'Entrenamiento Personal',
      client: 'Juan Carlos Pérez',
      type: 'entrenamiento',
      description: 'Cardio y movilidad'
    },
    {
      id: 6,
      date: '2025-11-07', // Viernes 7 de noviembre
      timeSlot: '11:00 - 12:00',
      title: 'Valoración de Seguimiento',
      client: 'María Elena González',
      type: 'valoracion',
      description: 'Evaluación mensual'
    },
    {
      id: 7,
      date: '2025-11-10', // Segunda semana
      timeSlot: '14:00 - 15:00',
      title: 'Entrenamiento Funcional',
      client: 'Pedro Sánchez',
      type: 'entrenamiento',
      description: 'Trabajo de core y estabilidad'
    },
    {
      id: 8,
      date: '2025-11-17', // Tercera semana
      timeSlot: '10:00 - 11:00',
      title: 'Valoración Nutricional',
      client: 'Laura Gómez',
      type: 'valoracion',
      description: 'Evaluación de composición corporal'
    },
    {
      id: 9,
      date: '2025-12-02', // Diciembre
      timeSlot: '9:00 - 10:00',
      title: 'Sesión de Rehabilitación',
      client: 'Roberto Díaz',
      type: 'fisioterapia',
      description: 'Recuperación de lesión de rodilla'
    },
    {
      id: 10,
      date: '2025-12-09',
      timeSlot: '16:00 - 17:00',
      title: 'Entrenamiento de Alta Intensidad',
      client: 'Sofía Martínez',
      type: 'entrenamiento',
      description: 'HIIT y pliometría'
    },
  ])

  const [showEventDialog, setShowEventDialog] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<{ date: string; timeSlot: string } | null>(null)
  const [editingEvent, setEditingEvent] = useState<ScheduleEvent | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    type: 'entrenamiento',
    description: ''
  })

  // Obtener las semanas del mes seleccionado
  const weeksInMonth = useMemo(() => {
    const firstDay = new Date(selectedYear, selectedMonth, 1)
    const lastDay = new Date(selectedYear, selectedMonth + 1, 0)
    
    const weeks: { number: number; startDate: Date; endDate: Date }[] = []
    let currentWeekStart = new Date(firstDay)
    
    // Ajustar al lunes de la semana actual
    const dayOfWeek = currentWeekStart.getDay()
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
    currentWeekStart.setDate(currentWeekStart.getDate() + diff)
    
    let weekNumber = 1
    while (currentWeekStart <= lastDay) {
      const weekEnd = new Date(currentWeekStart)
      weekEnd.setDate(weekEnd.getDate() + 6)
      
      weeks.push({
        number: weekNumber,
        startDate: new Date(currentWeekStart),
        endDate: weekEnd
      })
      
      currentWeekStart.setDate(currentWeekStart.getDate() + 7)
      weekNumber++
    }
    
    return weeks
  }, [selectedMonth, selectedYear])

  // Obtener los días de la semana seleccionada
  const weekDays = useMemo(() => {
    const week = weeksInMonth.find(w => w.number === selectedWeek)
    if (!week) return []
    
    const days: Date[] = []
    const current = new Date(week.startDate)
    
    for (let i = 0; i < 7; i++) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }
    
    return days
  }, [weeksInMonth, selectedWeek])

  const getEventsForSlot = (date: Date, timeSlot: string) => {
    const dateString = date.toISOString().split('T')[0]
    return events.filter(event => event.date === dateString && event.timeSlot === timeSlot)
  }

  const handleSlotClick = (date: Date, timeSlot: string) => {
    const dateString = date.toISOString().split('T')[0]
    setSelectedSlot({ date: dateString, timeSlot })
    setEditingEvent(null)
    setFormData({
      title: '',
      client: '',
      type: 'entrenamiento',
      description: ''
    })
    setShowEventDialog(true)
  }

  const handleEventClick = (event: ScheduleEvent, e: React.MouseEvent) => {
    e.stopPropagation()
    setEditingEvent(event)
    setFormData({
      title: event.title,
      client: event.client,
      type: event.type,
      description: event.description || ''
    })
    setSelectedSlot({ date: event.date, timeSlot: event.timeSlot })
    setShowEventDialog(true)
  }

  const handleMonthChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (selectedMonth === 0) {
        setSelectedMonth(11)
      } else {
        setSelectedMonth(selectedMonth - 1)
      }
    } else {
      if (selectedMonth === 11) {
        setSelectedMonth(0)
      } else {
        setSelectedMonth(selectedMonth + 1)
      }
    }
    setSelectedWeek(1) // Reset a la primera semana del nuevo mes
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const handleSaveEvent = () => {
    if (!selectedSlot) return
    
    if (!formData.title || !formData.client) {
      toast.error('Por favor complete todos los campos requeridos')
      return
    }

    if (editingEvent) {
      // Editar evento existente
      setEvents(prev => prev.map(event => 
        event.id === editingEvent.id 
          ? { ...event, ...formData }
          : event
      ))
      toast.success('Evento actualizado exitosamente')
    } else {
      // Crear nuevo evento
      const newEvent: ScheduleEvent = {
        id: Date.now(),
        date: selectedSlot.date,
        timeSlot: selectedSlot.timeSlot,
        ...formData
      }
      setEvents(prev => [...prev, newEvent])
      toast.success('Evento creado exitosamente')
    }

    setShowEventDialog(false)
    setSelectedSlot(null)
    setEditingEvent(null)
  }

  const handleDeleteEvent = () => {
    if (!editingEvent) return
    
    setEvents(prev => prev.filter(event => event.id !== editingEvent.id))
    toast.success('Evento eliminado exitosamente')
    setShowEventDialog(false)
    setEditingEvent(null)
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case 'entrenamiento':
        return 'bg-green-100 border-green-300 hover:bg-green-200'
      case 'valoracion':
        return 'bg-blue-100 border-blue-300 hover:bg-blue-200'
      case 'fisioterapia':
        return 'bg-purple-100 border-purple-300 hover:bg-purple-200'
      default:
        return 'bg-gray-100 border-gray-300 hover:bg-gray-200'
    }
  }

  const getEventBadgeColor = (type: string) => {
    switch (type) {
      case 'entrenamiento':
        return 'bg-green-500'
      case 'valoracion':
        return 'bg-blue-500'
      case 'fisioterapia':
        return 'bg-purple-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle>Calendario Semanal</CardTitle>
            <div className="flex gap-2">
              <Badge className={getEventBadgeColor('entrenamiento')}>
                Entrenamiento
              </Badge>
              <Badge className={getEventBadgeColor('valoracion')}>
                Valoración
              </Badge>
              <Badge className={getEventBadgeColor('fisioterapia')}>
                Fisioterapia
              </Badge>
            </div>
          </div>

          {/* Filtros de mes y semana */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Selector de mes */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleMonthChange('prev')}
                className="h-9 w-9"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded px-4 py-2 min-w-[180px]">
                <CalendarIcon className="h-4 w-4 text-green-600" />
                <span className="text-green-800">
                  {MONTHS[selectedMonth].label} {selectedYear}
                </span>
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => handleMonthChange('next')}
                className="h-9 w-9"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Selector de semana */}
            <div className="flex items-center gap-2">
              <Label className="text-sm text-gray-600">Semana:</Label>
              <Select 
                value={selectedWeek.toString()}
                onValueChange={(value) => setSelectedWeek(parseInt(value))}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {weeksInMonth.map((week) => (
                    <SelectItem key={week.number} value={week.number.toString()}>
                      Semana {week.number} ({formatDate(week.startDate)} - {formatDate(week.endDate)})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[1200px]">
              {/* Header con días de la semana */}
              <div className="grid grid-cols-[120px_repeat(7,1fr)] gap-2 mb-2">
                <div className="bg-gray-50 border border-gray-200 rounded p-3">
                  <p className="text-center text-gray-600">Hora</p>
                </div>
                {weekDays.map((date, index) => {
                  const dayName = DAYS_OF_WEEK[date.getDay()]
                  const isCurrentDay = isToday(date)
                  return (
                    <div 
                      key={index} 
                      className={`border rounded p-3 ${
                        isCurrentDay 
                          ? 'bg-green-100 border-green-400' 
                          : 'bg-green-50 border-green-200'
                      }`}
                    >
                      <p className={`text-center ${isCurrentDay ? 'text-green-900' : 'text-green-800'}`}>
                        {dayName}
                      </p>
                      <p className={`text-center text-xs mt-1 ${isCurrentDay ? 'text-green-700' : 'text-green-600'}`}>
                        {formatDate(date)}
                      </p>
                    </div>
                  )
                })}
              </div>

              {/* Filas de horarios */}
              <div className="space-y-2">
                {TIME_SLOTS.map(timeSlot => (
                  <div key={timeSlot} className="grid grid-cols-[120px_repeat(7,1fr)] gap-2">
                    {/* Columna de hora */}
                    <div className="bg-gray-50 border border-gray-200 rounded p-3 flex items-center justify-center">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{timeSlot}</span>
                      </div>
                    </div>

                    {/* Columnas de días */}
                    {weekDays.map((date, index) => {
                      const slotEvents = getEventsForSlot(date, timeSlot)
                      const isCurrentDay = isToday(date)
                      return (
                        <div
                          key={index}
                          onClick={() => handleSlotClick(date, timeSlot)}
                          className={`border border-gray-200 rounded p-2 min-h-[80px] cursor-pointer transition-colors ${
                            isCurrentDay 
                              ? 'bg-green-50/30 hover:bg-green-50' 
                              : 'bg-white hover:bg-gray-50'
                          }`}
                        >
                          <div className="space-y-1">
                            {slotEvents.map(event => (
                              <div
                                key={event.id}
                                onClick={(e) => handleEventClick(event, e)}
                                className={`p-2 rounded border cursor-pointer transition-colors ${getEventColor(event.type)}`}
                              >
                                <p className="text-xs truncate">{event.title}</p>
                                <div className="flex items-center gap-1 mt-1">
                                  <User className="h-3 w-3 text-gray-600" />
                                  <p className="text-xs text-gray-600 truncate">{event.client}</p>
                                </div>
                              </div>
                            ))}
                            {slotEvents.length === 0 && (
                              <div className="flex items-center justify-center h-full">
                                <Plus className="h-4 w-4 text-gray-400" />
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialog para crear/editar eventos */}
      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingEvent ? 'Editar Evento' : 'Nuevo Evento'}
            </DialogTitle>
          </DialogHeader>
          
          {selectedSlot && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded p-3">
                <p className="text-sm text-green-800">
                  {new Date(selectedSlot.date).toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} - {selectedSlot.timeSlot}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Título del Evento *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ej: Entrenamiento Personal"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="client">Cliente *</Label>
                <Input
                  id="client"
                  value={formData.client}
                  onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                  placeholder="Nombre del cliente"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Evento *</Label>
                <Select 
                  value={formData.type}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entrenamiento">Entrenamiento</SelectItem>
                    <SelectItem value="valoracion">Valoración</SelectItem>
                    <SelectItem value="fisioterapia">Fisioterapia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Detalles adicionales..."
                  rows={3}
                />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            {editingEvent && (
              <Button
                variant="destructive"
                onClick={handleDeleteEvent}
              >
                <X className="h-4 w-4 mr-2" />
                Eliminar
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => setShowEventDialog(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSaveEvent}
              className="bg-green-600 hover:bg-green-700"
            >
              {editingEvent ? 'Actualizar' : 'Guardar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
