import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { apiClient } from "../lib/api-client";

interface UseResourceOptions<T> {
  resourceName: string;
  queryOptions?: Omit<UseQueryOptions<T[]>, "queryKey" | "queryFn">;
}

export function useList<T>(options: UseResourceOptions<T>) {
  const { resourceName, queryOptions } = options;

  return useQuery({
    queryKey: [resourceName, "list"],
    queryFn: () => apiClient.get<T[]>(`/${resourceName}`),
    ...queryOptions,
  });
}

export function useGetById<T>(
  resourceName: string,
  id: number | string,
  enabled = true
) {
  return useQuery({
    queryKey: [resourceName, "detail", id],
    queryFn: () => apiClient.get<T>(`/${resourceName}/${id}`),
    enabled: enabled && !!id,
  });
}

export function useCreate<TData, TResponse = TData>(
  resourceName: string
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TData) =>
      apiClient.post<TResponse>(`/${resourceName}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [resourceName, "list"] });
    },
  });
}

export function useUpdate<TData, TResponse = TData>(
  resourceName: string
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: TData }) =>
      apiClient.patch<TResponse>(`/${resourceName}/${id}`, data),
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({
        queryKey: [resourceName, "detail", vars.id],
      });
      queryClient.invalidateQueries({ queryKey: [resourceName, "list"] });
    },
  });
}

// 🔥 DELETE FIX
export function useDelete(resourceName: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number | string) => {
      await apiClient.delete(`/${resourceName}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [resourceName, "list"] });
    },
  });
}
