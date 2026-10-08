// api for /logs
import apiClient from "./client";

export interface Log {
  id: number;
  resource: string;
  action: string;
  data: Record<string, unknown> | null;
  previousData?: Record<string, unknown>;
  meta: Record<string, unknown>;
  author?: Record<string, unknown>;
  timestamp: string;
}

// GET /logs — получение списка всех записей журнала
export const getLogs = async () => {
  return apiClient.get<Log[]>("/logs");
};

// GET /logs/{id} — получение записи журнала по id
export const getLogById = async (id: number) => {
  return apiClient.get<Log>(`/logs/${id}`);
};
