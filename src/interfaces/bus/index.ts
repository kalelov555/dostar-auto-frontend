import { IMetaReponse, IProduct } from "..";

export interface IBus extends IProduct {
  created_at: string; // It's a date-time string in ISO 8601 format
  manufacturer_id: number;
  model: string;
  vehicle_purpose: string;
}

export interface IBusesResponse {
  data: IBus[];
  meta: IMetaReponse;
}
