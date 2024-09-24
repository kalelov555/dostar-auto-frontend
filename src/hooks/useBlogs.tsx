import { IBlogResponse, IBlogsResponse } from "@/interfaces/blog";
import { fetchBlogBySlug, fetchBlogs } from "@/services/api/modules/blogs";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetBlogs = () => {
  return useQuery<IBlogsResponse, AxiosError>({
    queryKey: ["requests"],
    queryFn: async () => {
      const response = await fetchBlogs({});
      return response.data;
    },
  });
};

export const useGetBlogById = (id: string) => {
  return useQuery<IBlogResponse, AxiosError>({
    queryKey: ["requests", id],
    queryFn: async () => {
      if (id) {
        const response = await fetchBlogBySlug(id);
        return response.data;
      } else throw new Error("Something went wrong with blogs");
    },
  });
};
