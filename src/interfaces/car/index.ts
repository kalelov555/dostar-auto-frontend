import { IMetaReponse, IProduct } from "..";

export interface ICar extends IProduct {
  body: string;
  city_id: number;
  city_name: string;
  color: string;
  drive_unit: string;
  manufacturer_name: string;
  steering_wheel_side: string;
  transmission: string;
  vehicle_model_id: number;
  vehicle_model_name: string;
  vehicle_purpose: string;
  model: string;
}

export interface ICarsResponse {
  data: ICar[];
  meta: IMetaReponse;
}
