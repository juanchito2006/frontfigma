/**
 * EPSCombobox - Selector de EPS con búsqueda
 * 
 * Componente reutilizable que permite seleccionar una EPS (Entidad Promotora de Salud)
 * de una lista completa de EPS de Colombia. Incluye funcionalidad de búsqueda
 * para facilitar la selección.
 * 
 * Características:
 * - Lista completa de EPS de Colombia (régimen contributivo, subsidiado y especiales)
 * - Búsqueda en tiempo real
 * - Indicador visual de selección
 * - Soporte para estado disabled
 * 
 * @param value - Valor actualmente seleccionado
 * @param onChange - Callback cuando se selecciona una EPS
 * @param disabled - Si el componente está deshabilitado
 * @param className - Clases CSS adicionales
 * @param placeholder - Texto a mostrar cuando no hay selección
 */

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "../ui/utils"
import { Button } from "../ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"

/**
 * Lista completa de EPS de Colombia
 * Incluye EPS del régimen contributivo, subsidiado y regímenes especiales
 */
export const EPS_COLOMBIA = [
  // Régimen contributivo
  "Nueva EPS",
  "Sura EPS",
  "Sanitas EPS",
  "Salud Total EPS",
  "Compensar EPS",
  "Famisanar EPS",
  "Coomeva EPS",
  "Medimás EPS",
  "Coosalud EPS",
  "Mutual Ser",
  "Aliansalud EPS",
  "Capital Salud EPS",
  "Colsubsidio",
  
  // Régimen subsidiado
  "Capresoca EPS",
  "Comfacor EPS",
  "Comfachocó EPS",
  "Comfaoriente",
  "Comfaguajira",
  "Cruz Blanca EPS",
  "EPS Familiar de Colombia",
  "SOS EPS",
  "Cafesalud EPS",
  "Emdisalud ESS",
  "Saludvida EPS",
  "Salud Vida EPS",
  "Asmet Salud",
  "Emssanar ESS",
  "Cajacopi Atlántico",
  "AIC EPS",
  "Savia Salud EPS",
  "Asociación Indígena del Cauca",
  
  // EPS Indígenas (EPSI)
  "Dusakawi EPSI",
  "Anas Wayuu EPSI",
  "Mallamas EPSI",
  "Pijaos Salud EPSI",
  "Manexka EPSI",
  
  // Regímenes especiales y excepcionales
  "EPM - Empresas Públicas de Medellín",
  "Fondo de Pasivo Social de Ferrocarriles",
  "Magisterio",
  "Policía Nacional",
  "Fuerzas Militares",
  
  // Universidades públicas
  "Universidad de Antioquia",
  "Universidad del Valle",
  "Universidad de Caldas",
  "Universidad de Nariño",
  "Universidad del Cauca",
  "Universidad de Córdoba",
  "Universidad Pedagógica Nacional",
  "Universidad Tecnológica del Chocó",
  "Universidad de los Llanos",
  "Universidad del Atlántico",
]

interface EPSComboboxProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  className?: string
  placeholder?: string
}

export function EPSCombobox({ 
  value, 
  onChange, 
  disabled = false, 
  className = "",
  placeholder = "Seleccionar EPS..."
}: EPSComboboxProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* Botón que muestra la selección actual */}
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-full justify-between",
            !value && "text-muted-foreground",
            disabled && "bg-gray-100 cursor-not-allowed",
            className
          )}
        >
          {value || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      
      {/* Contenido del popover con lista y búsqueda */}
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder="Buscar EPS..." />
          <CommandList>
            <CommandEmpty>No se encontró ninguna EPS.</CommandEmpty>
            <CommandGroup>
              {EPS_COLOMBIA.map((eps) => (
                <CommandItem
                  key={eps}
                  value={eps}
                  onSelect={(currentValue) => {
                    // Buscar el valor exacto en la lista original (case-insensitive)
                    const selectedEPS = EPS_COLOMBIA.find(
                      (e) => e.toLowerCase() === currentValue.toLowerCase()
                    )
                    onChange(selectedEPS || currentValue)
                    setOpen(false)
                  }}
                >
                  {/* Ícono de check que se muestra cuando está seleccionado */}
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === eps ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {eps}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
