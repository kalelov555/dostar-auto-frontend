import api from "@/services/api/client";
import { tokenStorage } from "@/store/token";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAtom } from "jotai";

type AuthResponse = {
  data: any;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: AxiosError;
};

export const useAuth = (): AuthResponse => {
  const [token, _] = useAtom(tokenStorage);
  const { data, isLoading, isError, isSuccess, error } = useQuery({
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
