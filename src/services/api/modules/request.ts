import { IRequestDTO } from "@/interfaces/requests";
import api from "../client";

export const fetchRequests = (token: string) => {
  return api.get("/rfqs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createRequest = (dto: IRequestDTO, token: string) => {
  return api.post("rfqs", dto, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteRequest = (id: number, token: string) => {
  return api.delete(`/rfqs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
