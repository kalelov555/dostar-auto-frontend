// /favourite_vehicles?view=with_vehicle

import { IFavoriteResponse } from "@/interfaces/favorites";
import api from "../../client";
import { AxiosError, AxiosHeaders } from "axios";

export const fetchFavorites = async (
  params: any,
  headers: any
) => {
  try {
    const response = await api.get<IFavoriteResponse>(`/favourite_vehicles`, {
      params: { ...params },
      headers,
    });
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) return err;
    throw err;
  }
};
