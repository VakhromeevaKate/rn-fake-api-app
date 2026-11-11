import apiClient from "./client";
export interface Tag {
  id: number;
  title: string;
}
export const getTags = async () => {
  return apiClient.get<Tag[]>("/tags");
};
export const getTagById = async (id: number) => {
  return apiClient.get<Tag>(/tags/${id});
};