// api for /topics
import apiClient from "./client";

export interface Topic {
  id: number;
  title: string;
  description?: string;
}

// GET /topics — получение списка всех топиков
export const getTopics = async () => {
  return apiClient.get<Topic[]>("/topics");
};

// GET /topics/:id — получение топика по id
export const getTopicById = async (id: number) => {
  return apiClient.get<Topic>(`/topics/${id}`);
};
