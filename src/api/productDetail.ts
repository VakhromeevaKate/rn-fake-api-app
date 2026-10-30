import apiClient from "./client";

export interface ProductDetail {
  id: number;
  weight: number;
  dimensions: {
    height: number;
    width: number;
    depth: number;
  };
}

export const getProductDetails = async () => {
  return apiClient.get<ProductDetail[]>("/product-detail");
};

export const getProductDetailById = async (id: number) => {
  return apiClient.get<ProductDetail>(`/product-detail/${id}`);
};