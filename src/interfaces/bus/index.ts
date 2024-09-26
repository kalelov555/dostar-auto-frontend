import { IMetaReponse, IProduct, IVehicle } from "..";

export interface IBus extends IVehicle {
  vehicle_purpose: string;
  owner_phone_number: string;
  model: string;
}

export interface IBusesResponse {
  data: IBus[];
  meta: IMetaReponse;
}
