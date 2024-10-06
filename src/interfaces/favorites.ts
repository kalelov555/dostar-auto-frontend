import { IBus } from "./bus";
import { ICar } from "./car";
import { IMoto } from "./moto";
import { ISpecTechnic } from "./spec-technics";
import { ITruck } from "./trucks";

export interface IFavorite {
  id: number;
  vehicle_data: ICar & IBus & ITruck & ISpecTechnic & IMoto;
  vehicle_id: number;
  vehicle_type: "Car" | "Bus" | "SpecTechnic" | "Truck" | "Moto";
}

export interface IFavoriteResponse {
  data: IFavorite;
}
