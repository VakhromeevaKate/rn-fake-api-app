import apiClient from "./client";

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  category: { id: number };
  status: "draft" | "published" | "rejected";
  createdAt: string;
}

export const getBlogPosts = async () => {
  return apiClient.get<BlogPost[]>("/blog_posts");
};

export const getBlogPostById = async (id: number) => {
  return apiClient.get<BlogPost>(`/blog_posts/${id}`);
};



export const getBlogPostsPage = async (page: number, limit = 20) => {
  return apiClient.get<BlogPost[]>("/blog_posts", {
    params: { _page: page, _limit: limit },
  });
};


export const getBlogPostsByStatus = async (status: BlogPost["status"]) => {
  return apiClient.get<BlogPost[]>("/blog_posts", { params: { status } });
};


export const getBlogPostsByCategory = async (categoryId: number) => {
  return apiClient.get<BlogPost[]>("/blog_posts", {
    params: { "category.id": categoryId },
  });
};
