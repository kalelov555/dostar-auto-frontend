import { IBusesResponse } from "@/interfaces/bus";
import api from "../../client";

export const fetchBusesByFilters = async (
  params: any
): Promise<IBusesResponse> => {
  const response = await api.get(`/buses`, { params: { ...params } });
  return response.data;
};
