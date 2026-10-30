// api for /blog_posts
import apiClient from "./client";

export interface BlogPostCategory {
  id: number;
}

export type BlogPostStatus = "draft" | "published" | "rejected";

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  category: BlogPostCategory;
  status: BlogPostStatus;
  createdAt: string;
}

// GET /blog_posts — получение списка всех публикаций
export const getBlogPosts = async () => {
  return apiClient.get<BlogPost[]>("/blog_posts");
};

// GET /blog_posts/:id — получение публикации по id
export const getBlogPostById = async (id: number) => {
  return apiClient.get<BlogPost>(`/blog_posts/${id}`);
};
