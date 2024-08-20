import api from "../../client";
import { ICarsResponse } from "@/interfaces/car";

export const fetchMotosByFilters = async (
  params: any
): Promise<ICarsResponse> => {
  const response = await api.get(`/motos`, { params: { ...params } });
  return response.data;
};
