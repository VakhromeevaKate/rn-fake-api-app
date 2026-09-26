// api для /languages
import apiClient from "./client";

export interface Language {
  id: number;
  title: string;
}

// получение списка всех языков
export const getLanguages = async () => {
  return apiClient.get<Language[]>("/languages");
};

// получение языка по id
export const getLanguageById = async (id: number) => {
  return apiClient.get<Language>(`/languages/${id}`);
};
