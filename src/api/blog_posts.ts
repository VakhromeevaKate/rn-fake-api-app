import apiClient from "./client";

export interface Category {
  id: number;
}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  category: Category;
  status: string;
  createdAt: string;
}

export const getBlogPosts = async () => {
  return apiClient.get<BlogPost[]>("/blog_posts");
};

export const getBlogPostById = async (id: number) => {
  return apiClient.get<BlogPost>(`/blog_posts/${id}`);
};