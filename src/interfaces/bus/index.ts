import { IMetaReponse, IProduct } from "..";

export interface IBus extends IProduct {
  vehicle_purpose: string;
  owner_phone_number: string;
  model: string;
}

export interface IBusesResponse {
  data: IBus[];
  meta: IMetaReponse;
}
