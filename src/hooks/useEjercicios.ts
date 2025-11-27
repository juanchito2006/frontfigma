// hooks/useEjercicios.ts
import { useList, useCreate, useUpdate, useDelete, useGetById } from './useGenericCrud';
import type { Ejercicio, CreateEjercicioDTO, UpdateEjercicioDTO } from '../types/schema.types';

export function useEjerciciosList() {
  return useList<Ejercicio>({
    resourceName: 'ejercicios',
    queryOptions: {
      staleTime: 5 * 60 * 1000, // 5m
    },
  });
}

export function useEjercicioById(id: number) {
  return useGetById<Ejercicio>('ejercicios', id);
}

export function useCreateEjercicio() {
  return useCreate<CreateEjercicioDTO, Ejercicio>('ejercicios');
}

export function useUpdateEjercicio() {
  return useUpdate<UpdateEjercicioDTO, Ejercicio>('ejercicios');
}

export function useDeleteEjercicio() {
  return useDelete('ejercicios');
}
