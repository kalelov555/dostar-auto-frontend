import { ICar } from "./car";

export interface IFavorite {
  id: number;
  vehicle_data: ICar;
  vehicle_id: number;
  vehicle_type: "Car" | "Bus" | "SpecTechnic" | "Truck" | "Moto";
}

export interface IFavoriteResponse {
  data: IFavorite;
}
