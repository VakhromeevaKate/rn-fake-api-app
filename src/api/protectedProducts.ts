// api for /protected-products
import apiClient from "./client";

export interface ProtectedProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: boolean;
  categoryId: number;
  images: string[];
  createdAt: string;
  isActive: boolean;
}

// GET /protected-products — получение списка всех товаров
export const getProtectedProducts = async () => {
  return apiClient.get<ProtectedProduct[]>("/protected-products");
};

// GET /protected-products/:id — получение товара по id
export const getProtectedProductById = async (id: number) => {
  return apiClient.get<ProtectedProduct>(`/protected-products/${id}`);
};