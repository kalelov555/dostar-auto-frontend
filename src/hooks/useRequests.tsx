import {
  showErrorNotification,
  showSuccessNotification,
} from "@/helpers/notifications";
import { IRequestsResponse } from "@/interfaces/requests";
import { deleteRequest, fetchRequests } from "@/services/api/modules/request";
import { tokenStorage } from "@/store/token";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAtom } from "jotai";

export const useRequests = () => {
  const [token, _] = useAtom(tokenStorage);
  return useQuery<IRequestsResponse, AxiosError>({
    queryKey: ["requests", token],
    queryFn: async () => {
      try {
        const response = await fetchRequests(token);
        return response.data;
      } catch (err) {
        if (err instanceof AxiosError) {
          throw err;
        }
      }
    },
  });
};

export const useDeleteRequest = () => {
  const [token, _] = useAtom(tokenStorage);
  return useMutation({
    mutationFn: async (id: number) => {
      try {
        await deleteRequest(id, token);
        showSuccessNotification("Запрос успешно удален!");
      } catch (err) {
        if (err instanceof AxiosError) showErrorNotification(err.message);
      }
    },
  });
};
