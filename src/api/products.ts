// api for /products
import apiClient from "./client";

export interface Category {
  id: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  material: string;
  category: Category;
}

// GET /products — получение списка всех продуктов
export const getProducts = async () => {
  return apiClient.get<Product[]>("/products");
};

// GET /products/{id} — получение продукта по id
export const getProductById = async (id: number) => {
  return apiClient.get<Product>(`/products/${id}`);
};
