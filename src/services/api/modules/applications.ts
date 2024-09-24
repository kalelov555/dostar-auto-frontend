import { AxiosHeaders } from "axios";
import api from "../client";
import { IVehicleType } from "@/interfaces";
import { IApplicationDto } from "@/interfaces/applications";

export const fetchMyApplications = (params: any, headers: any) =>
  api.get(`/loan_applications?page=${params.page || 1}`, { headers });

export const createApplication = (
  vehicle_type: IVehicleType,
  id: number,
  body: IApplicationDto,
  headers: any
) => {
  const prefix =
    vehicle_type === "bus"
      ? "buses"
      : vehicle_type === "car"
      ? "cars"
      : vehicle_type === "moto"
      ? "motos"
      : vehicle_type === "spectechnic"
      ? "spec_technics"
      : "trucks";
  return api.post(
    `/${prefix}/${id}/loan_applications`,
    { ...body },
    { headers }
  );
};
