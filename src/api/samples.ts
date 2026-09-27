// api for /samples
import apiClient from "./client";

export interface SampleCategory {
  id: number;
}

export interface Sample {
  id: number;
  title: string;
  content: string;
  category: SampleCategory;
  tags: number[];
  createdAt: string;
}

// GET /samples — получение списка всех записей
export const getSamples = async () => {
  return apiClient.get<Sample[]>("/samples");
};

// GET /samples/{id} — получение записи по id
export const getSampleById = async (id: number) => {
  return apiClient.get<Sample>(`/samples/${id}`);
};
