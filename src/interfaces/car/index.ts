import { IMetaReponse, IProduct, IVehicle } from "..";

export interface ICar extends IVehicle {
  body: string;
  city_id: number;
  city_name: string;
  color: string;
  drive_unit: string;
  steering_wheel_side: string;
  transmission: string;
  vehicle_model_id: number;
  vehicle_model_name: string;
  vehicle_purpose: string;
}

export interface ICarsResponse {
  data: ICar[];
  meta: IMetaReponse;
}
