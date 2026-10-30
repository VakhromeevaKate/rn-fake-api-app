// api for /landing
import apiClient from "./client";

export interface Landing {
  id: number;
}

// GET /landing — получение списка всех landing
export const getLandings = async () => {
  return apiClient.get<Landing[]>("/landing");
};

// GET /landing/:id — получение landing по id
export const getLandingById = async (id: number) => {
  return apiClient.get<Landing[]>(`/landing/${id}`);
};
