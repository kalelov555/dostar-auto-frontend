import { IUser } from "@/interfaces/auth";
import api from "@/services/api/client";
import { tokenStorage } from "@/store/token";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAtom } from "jotai";

export const useAuth = () => {
  const [token, _] = useAtom(tokenStorage);
  const { data, isLoading, isError, isSuccess, error } = useQuery<
    IUser,
    AxiosError
  >({
    queryKey: ["auth/me"],
    queryFn: async () => {
      const response = await api.get("/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
  });

  return { data, isLoading, isError, isSuccess, error };
};
