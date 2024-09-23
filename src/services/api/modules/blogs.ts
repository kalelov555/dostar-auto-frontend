import api from "../client";

export const fetchBlogs = (params: any) =>
  api.get(`/blogs?page=${params.page}`);

export const fetchBlogBySlug = (id: string) => api.get(`/blogs/${id}`);
