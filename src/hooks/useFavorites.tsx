import { IFavorite } from "@/interfaces/favorites";
import api from "@/services/api/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type Params = {
  params?: {
    [name: string]: string;
  };
  headers: {
    [name: string]: string;
  };
};

export const useGetFavorites = (params: Params) =>
  useQuery({
    refetchOnMount: true,
    retry: false,
    queryKey: ["favorites", params.headers.Authorization],
    queryFn: async () => {
      try {
        const response = await api.get<IFavorite[]>("/favourite_vehicles", {
          ...params,
        });
        return response;
      } catch (err) {
        if (err instanceof AxiosError) {
          throw err;
        }
      }
    },
  });

type PostParams = {
  id: number;
  type: string;
  token: string;
};

export const useAddFavorite = () =>
  useMutation({
    mutationFn: async ({ id, type, token }: PostParams) => {
      api.post(`${type}/${id}/favourite_vehicles`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
  });

export const useDeleteFavorite = () =>
  useMutation({
    mutationFn: async ({ id, type, token }: PostParams) =>
      api.delete(`${type}/${id}/favourite_vehicles`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
  });
