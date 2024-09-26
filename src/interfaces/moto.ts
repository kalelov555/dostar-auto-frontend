import { IVehicle } from ".";

export interface IMoto extends IVehicle {
  city_id: number;
  moto_type: string;
  owner_phone_number: string;
  state: string;
  model: string;
}
