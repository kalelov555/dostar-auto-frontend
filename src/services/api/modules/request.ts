import { IRequestDTO } from "@/interfaces/requests";
import api from "../client";

export const createRequest = (dto: IRequestDTO, token: string) => {
  return api.post("rfqs", dto, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
