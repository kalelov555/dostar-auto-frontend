import { ICar, ICarsResponse } from "@/interfaces/car";
import api from "../../client";

type PaginatedCarsResponse = {
  data: ICar[];
  currentPage: number;
  nextPage: number | null;
  totalPages: number;
};

type Props = {
  pageParam: number;
  restParams?: Object;
};

export const fetchAllCars = async ({
  pageParam,
  restParams,
}: Props): Promise<PaginatedCarsResponse> => {
  const response = await api
    .get(`/cars?page=${pageParam + 1}`, { params: { ...restParams } })
    .then((res) => res.data);
  return {
    data: response.data,
    currentPage: pageParam,
    nextPage: pageParam + 1,
    totalPages: response.meta.total_pages,
  };
};

export const fetchCarsByFilters = async (
  params: any
): Promise<ICarsResponse> => {
  const response = await api.get(`/cars`, { params: { ...params } });
  return response.data;
};
