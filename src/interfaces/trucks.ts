import { IVehicle } from ".";

export interface ITruck extends IVehicle {
  vehicle_purpose: string;
  owner_phone_number: string;
  model: string;
}
