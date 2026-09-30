// api for /blog_posts
import apiClient from "./client";


export interface Category{
  id: number;
}

export interface Blog_posts {
  id: number;
  title: string;
  content: string;
  category: string;
  status: string;
}

// GET /blog_posts — получение списка всех постов
export const getBlog_posts = async () => {
  return apiClient.get<Blog_posts[]>("/blog_posts");
};

// GET /blog_posts — получение поста по id
export const getBlog_postById = async (id: number) => {
  return apiClient.get<Blog_posts[]>(`/blog_posts/${id}`);
};