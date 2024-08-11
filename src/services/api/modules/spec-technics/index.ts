import { IBusesResponse } from "@/interfaces/bus";
import api from "../../client";

export const fetchSpecTechnicsByFilters = async (
  params: any
): Promise<IBusesResponse> => {
  const response = await api.get(`/spec_technics`, { params: { ...params } });
  return response.data;
};
