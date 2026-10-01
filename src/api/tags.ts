// api for /tags
import apiClient from "./client";

export interface Tag {
  id: number;
  title: string;
}

// GET /tags — получение списка всех тегов
export const getTags = async () => {
  return apiClient.get<Tag[]>("/tags");
};

// GET /tags/:id — получение тега по id
export const getTagById = async (id: number) => {
  return apiClient.get<Tag>(`/tags/${id}`);
};

// POST /tags — создание нового тега
export const createTag = async (title: string) => {
  return apiClient.post<Tag>("/tags", { title });
};

// PATCH /tags/:id — изменение названия тега
export const updateTag = async (id: number, title: string) => {
  return apiClient.patch<Tag>(`/tags/${id}`, { title });
};

// DELETE /tags/:id — удаление тега
export const deleteTag = async (id: number) => {
  return apiClient.delete(`/tags/${id}`);
};
