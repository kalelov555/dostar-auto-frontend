import api from "../client";

export const fetchBlogs = (params: any) =>
  api.get(`/blogs?page=${params.page}`);
