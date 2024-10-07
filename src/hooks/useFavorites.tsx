import { IFavorite } from "@/interfaces/favorites";
import api from "@/services/api/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAuth } from "./useAuth";

type Params = {
  params?: {
    [name: string]: string;
  };
  headers: {
    [name: string]: string;
  };
};

export const useGetFavorites = (params: Params) => {
  const auth = useAuth();
  return useQuery({
    refetchOnMount: "always",
    retry: false,
    queryKey: ["favorites", params.headers.Authorization],
    enabled: auth.isSuccess,
    queryFn: () =>
      api.get<IFavorite[]>("/favourite_vehicles", {
        ...params,
      }),
  });
};

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
