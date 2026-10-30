import apiClient from "./client";

export interface LogAuthor {
  id: number | string;
  name: string;
}

export interface LogMeta {
  id: number;
}

export interface Log {
  id: number;
  resource: string;
  action: string;
  author: LogAuthor;
  data: Record<string, unknown>;
  previousData?: Record<string, unknown>;
  meta: LogMeta;
  timestamp: string;
}

export const getLogs = async () => {
  return apiClient.get<Log[]>("/logs");
};

export const getLogById = async (id: number) => {
  return apiClient.get<Log>(`/logs/${id}`);
};
