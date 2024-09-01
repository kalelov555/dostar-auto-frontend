import { IUser } from "@/interfaces/auth";
import api from "@/services/api/client";
import { tokenStorage } from "@/store/token";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAtom } from "jotai";

type AuthResponse = {
  data: IUser;
};

export const useAuth = () => {
  const [token, _] = useAtom(tokenStorage);
  const { data, isLoading, isError, isSuccess, error } = useQuery<
    AuthResponse,
    AxiosError
  >({
    queryKey: ["auth", token],
    // Cache for 5 minutes
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
    // Invalidate cache after 10 minutes
    gcTime: 10 * 60 * 1000,
    queryFn: async () => {
      try {
        const response = await api.get("/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.response?.status === 401) localStorage.removeItem("token");
        }
      }
    },
  });

  return { user: data, isLoading, isError, isSuccess, error };
};
