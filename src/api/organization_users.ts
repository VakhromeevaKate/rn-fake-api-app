import apiClient from "./client";


export interface OrganizationUser {
  id: number;
  name: string;
  email: string;
  organizations: number[];
}

// GET /organization_users — получение списка всех пользователей
export const getOrganizationUsers = async () => {
  return apiClient.get<OrganizationUser[]>("/organization_users");
};

// GET /organization_users/:id — получение пользователя по id
export const getOrganizationUserById = async (id: number) => {
  return apiClient.get<OrganizationUser>(`/organization_users/${id}`);
};