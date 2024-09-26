import { IVehicle } from ".";

export interface ISpecTechnic extends IVehicle {
  vehicle_purpose?: string; // It may be null
  owner_phone_number: string;
  model: string;
  manufacture_country: string;
}
