import { IBusesResponse } from "@/interfaces/bus";
import api from "../../client";

export const fetchTrucksByFilters = async (
  params: any
): Promise<IBusesResponse> => {
  const response = await api.get(`/trucks`, { params: { ...params } });
  return response.data;
};
