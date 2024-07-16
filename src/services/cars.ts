import api from "./api/client";

export const fetchActualCars = async (page?: string, limit?: string) => {
  return api.get("/products", {
    params: { limit: 10, ...(page ? { page } : {}) },
  });
};
