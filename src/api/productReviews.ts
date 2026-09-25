// api for /product-reviews
import apiClient from "./client";

export interface ProductReview {
  id: number;
  productId: number;
  userId: number;
  rating: number;
  comment: string;
}

// GET /product-reviews — получение списка всех отзывов
export const getProductReviews = async () => {
  return apiClient.get<ProductReview[]>("/product-reviews");
};

// GET /product-reviews/:id — получение отзыва по id
export const getProductReviewById = async (id: number) => {
  return apiClient.get<ProductReview[]>(`/product-reviews/${id}`);
};