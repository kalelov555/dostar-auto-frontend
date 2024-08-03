import { ICarResponse } from "@/interfaces/car";
import api from "../../client";

export const fetchAllCars = async (): Promise<ICarResponse> => {
  return api.get("/cars").then((res) => res.data);
};
