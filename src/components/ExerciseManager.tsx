import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { Trash2, Search, X, GripVertical, PlusCircle, Plus, ChevronUp, ChevronDown } from "lucide-react"
import { Badge } from "./ui/badge"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

interface Exercise {
  id: string
  name: string
  category: string
  sets?: number
  reps?: number
  weight?: number
  duration?: number
}

interface TrainingDay {
  id: string
  name: string
  exercises: Exercise[]
}

interface ExerciseManagerProps {
  onUpdate?: (days: TrainingDay[]) => void
  availableExercises?: Exercise[]
}

const defaultExercises: Exercise[] = [
  { id: '1', name: 'Sentadillas', category: 'Piernas' },
  { id: '2', name: 'Press de banca', category: 'Pecho' },
  { id: '3', name: 'Peso muerto', category: 'Espalda' },
  { id: '4', name: 'Press militar', category: 'Hombros' },
  { id: '5', name: 'Curl de bíceps', category: 'Brazos' },
  { id: '6', name: 'Extensión de tríceps', category: 'Brazos' },
  { id: '7', name: 'Plancha', category: 'Core' },
  { id: '8', name: 'Burpees', category: 'Cardio' },
  { id: '9', name: 'Dominadas', category: 'Espalda' },
  { id: '10', name: 'Fondos', category: 'Pecho' },
  { id: '11', name: 'Zancadas', category: 'Piernas' },
  { id: '12', name: 'Remo con barra', category: 'Espalda' }
]

interface DraggableExerciseItemProps {
  exercise: Exercise
  dayId: string
  index: number
  moveExercise: (dayId: string, fromIndex: number, toIndex: number) => void
  updateExerciseData: (dayId: string, exerciseId: string, field: string, value: number) => void
  removeExerciseFromDay: (dayId: string, exerciseId: string) => void
  moveExerciseUp: (dayId: string, index: number) => void
  moveExerciseDown: (dayId: string, index: number) => void
  isFirst: boolean
  isLast: boolean
}

const ItemType = 'EXERCISE'

function DraggableExerciseItem({
  exercise,
  dayId,
  index,
  moveExercise,
  updateExerciseData,
  removeExerciseFromDay,
  moveExerciseUp,
  moveExerciseDown,
  isFirst,
  isLast
}: DraggableExerciseItemProps) {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { dayId, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item: { dayId: string; index: number }) => {
      if (item.dayId !== dayId) return
      if (item.index === index) return

      moveExercise(dayId, item.index, index)
      item.index = index
    }
  })

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`flex items-center justify-between border rounded px-3 py-2 bg-gray-50 transition-opacity ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
      style={{ cursor: 'move' }}
    >
      <div className="flex items-center gap-2 flex-1">
        <GripVertical className="text-gray-500 cursor-move" />
        <div className="flex-1">
          <span className="font-medium">{exercise.name}</span>
          <Badge variant="outline" className="ml-2">{exercise.category}</Badge>
        </div>
      </div>
      
      {/* Campos de series, repeticiones y peso */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-600">Series:</span>
          <Input
            type="number"
            value={exercise.sets || ''}
            onChange={(e) => updateExerciseData(dayId, exercise.id, 'sets', parseInt(e.target.value) || 0)}
            className="w-16 h-8 text-xs"
            min="1"
          />
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-600">Reps:</span>
          <Input
            type="number"
            value={exercise.reps || ''}
            onChange={(e) => updateExerciseData(dayId, exercise.id, 'reps', parseInt(e.target.value) || 0)}
            className="w-16 h-8 text-xs"
            min="1"
          />
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-600">Peso:</span>
          <Input
            type="number"
            value={exercise.weight || ''}
            onChange={(e) => updateExerciseData(dayId, exercise.id, 'weight', parseInt(e.target.value) || 0)}
            className="w-16 h-8 text-xs"
            min="0"
          />
          <span className="text-xs text-gray-600">kg</span>
        </div>
      </div>

      {/* Botones de ordenamiento */}
      <div className="flex items-center gap-1 ml-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-gray-600 hover:text-gray-800"
          onClick={() => moveExerciseUp(dayId, index)}
          disabled={isFirst}
        >
          <ChevronUp className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-gray-600 hover:text-gray-800"
          onClick={() => moveExerciseDown(dayId, index)}
          disabled={isLast}
        >
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-red-600 hover:text-red-800 ml-2"
        onClick={() => removeExerciseFromDay(dayId, exercise.id)}
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  )
}

function ExerciseManagerContent({ onUpdate, availableExercises = defaultExercises }: ExerciseManagerProps) {
  const [trainingDays, setTrainingDays] = useState<TrainingDay[]>([
    { id: '1', name: 'Día 1', exercises: [] },
    { id: '2', name: 'Día 2', exercises: [] },
    { id: '3', name: 'Día 3', exercises: [] },
    { id: '4', name: 'Día 4', exercises: [] },
    { id: '5', name: 'Día 5', exercises: [] }
  ])
  
  const [searchTerms, setSearchTerms] = useState<{ [key: string]: string }>({})
  const [showExerciseList, setShowExerciseList] = useState<{ [key: string]: boolean }>({})

  const addExerciseToDay = (dayId: string, exercise: Exercise) => {
    const newExercise = { 
      ...exercise, 
      id: `${exercise.id}_${Date.now()}`,
      sets: 3,
      reps: 12,
      weight: 0
    }
    
    setTrainingDays(prev => {
      const updated = prev.map(day =>
        day.id === dayId
          ? { ...day, exercises: [...day.exercises, newExercise] }
          : day
      )
      onUpdate?.(updated)
      return updated
    })
    
    setSearchTerms(prev => ({ ...prev, [dayId]: '' }))
    setShowExerciseList(prev => ({ ...prev, [dayId]: false }))
  }

  const removeExerciseFromDay = (dayId: string, exerciseId: string) => {
    setTrainingDays(prev => {
      const updated = prev.map(day =>
        day.id === dayId
          ? { ...day, exercises: day.exercises.filter(ex => ex.id !== exerciseId) }
          : day
      )
      onUpdate?.(updated)
      return updated
    })
  }

  const moveExercise = (dayId: string, fromIndex: number, toIndex: number) => {
    setTrainingDays(prev => {
      const updated = prev.map(day => {
        if (day.id === dayId) {
          const newExercises = [...day.exercises]
          const [movedExercise] = newExercises.splice(fromIndex, 1)
          newExercises.splice(toIndex, 0, movedExercise)
          return { ...day, exercises: newExercises }
        }
        return day
      })
      onUpdate?.(updated)
      return updated
    })
  }

  const moveExerciseUp = (dayId: string, index: number) => {
    if (index > 0) {
      moveExercise(dayId, index, index - 1)
    }
  }

  const moveExerciseDown = (dayId: string, index: number) => {
    const day = trainingDays.find(d => d.id === dayId)
    if (day && index < day.exercises.length - 1) {
      moveExercise(dayId, index, index + 1)
    }
  }

  const addNewDay = () => {
    const newDay: TrainingDay = {
      id: `${Date.now()}`,
      name: `Día ${trainingDays.length + 1}`,
      exercises: []
    }
    setTrainingDays(prev => {
      const updated = [...prev, newDay]
      onUpdate?.(updated)
      return updated
    })
  }

  const removeDay = (dayId: string) => {
    setTrainingDays(prev => {
      const updated = prev.filter(day => day.id !== dayId)
      onUpdate?.(updated)
      return updated
    })
  }

  const updateExerciseData = (dayId: string, exerciseId: string, field: string, value: number) => {
    setTrainingDays(prev => {
      const updated = prev.map(day =>
        day.id === dayId
          ? {
              ...day,
              exercises: day.exercises.map(ex =>
                ex.id === exerciseId ? { ...ex, [field]: value } : ex
              )
            }
          : day
      )
      onUpdate?.(updated)
      return updated
    })
  }

  const getFilteredExercises = (dayId: string) => {
    const searchTerm = searchTerms[dayId] || ''
    return availableExercises.filter(exercise =>
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return (
    <div className="border rounded-md mt-6">
      <div className="bg-green-700 text-white font-bold px-4 py-2 rounded-md">
        Programa de entrenamiento
      </div>

      <Accordion type="single" collapsible className="w-full">
        {trainingDays.map((day) => (
          <AccordionItem key={day.id} value={`dia-${day.id}`}>
            <div className="flex items-center justify-between bg-gray-200 px-4">
              <AccordionTrigger className="font-medium">{day.name}</AccordionTrigger>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-red-600 hover:text-red-800"
                onClick={() => removeDay(day.id)}
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>

            <AccordionContent className="p-4 space-y-4">
              {/* Buscador */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Search className="text-green-700" />
                  <Input
                    placeholder="Buscar ejercicio para añadir..."
                    value={searchTerms[day.id] || ''}
                    onChange={(e) => {
                      setSearchTerms(prev => ({ ...prev, [day.id]: e.target.value }))
                      setShowExerciseList(prev => ({ ...prev, [day.id]: e.target.value.length > 0 }))
                    }}
                    onFocus={() => setShowExerciseList(prev => ({ ...prev, [day.id]: true }))}
                  />
                </div>
                
                {/* Lista de ejercicios disponibles */}
                {showExerciseList[day.id] && (
                  <div className="border rounded-lg p-2 bg-white shadow-lg max-h-40 overflow-y-auto">
                    {getFilteredExercises(day.id).map((exercise) => (
                      <div
                        key={exercise.id}
                        className="flex items-center justify-between p-2 hover:bg-gray-100 rounded cursor-pointer"
                        onClick={() => addExerciseToDay(day.id, exercise)}
                      >
                        <div>
                          <span className="font-medium">{exercise.name}</span>
                          <Badge variant="outline" className="ml-2">{exercise.category}</Badge>
                        </div>
                        <Plus className="w-4 h-4 text-green-600" />
                      </div>
                    ))}
                    {getFilteredExercises(day.id).length === 0 && (
                      <div className="text-center text-gray-500 py-2">
                        No se encontraron ejercicios
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Lista de ejercicios del día */}
              <div className="space-y-2">
                {day.exercises.map((exercise, index) => (
                  <DraggableExerciseItem
                    key={exercise.id}
                    exercise={exercise}
                    dayId={day.id}
                    index={index}
                    moveExercise={moveExercise}
                    updateExerciseData={updateExerciseData}
                    removeExerciseFromDay={removeExerciseFromDay}
                    moveExerciseUp={moveExerciseUp}
                    moveExerciseDown={moveExerciseDown}
                    isFirst={index === 0}
                    isLast={index === day.exercises.length - 1}
                  />
                ))}
                
                {day.exercises.length === 0 && (
                  <div className="text-center text-gray-500 py-4 border-2 border-dashed border-gray-300 rounded">
                    No hay ejercicios añadidos. Busca ejercicios arriba para añadir.
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Botón agregar día */}
      <div className="p-4">
        <Button 
          onClick={addNewDay}
          className="flex items-center gap-2 bg-gray-800 text-white hover:bg-gray-700"
        >
          <PlusCircle className="w-4 h-4" />
          Añadir Día
        </Button>
      </div>
    </div>
  )
}

export function ExerciseManager(props: ExerciseManagerProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <ExerciseManagerContent {...props} />
    </DndProvider>
  )
}
