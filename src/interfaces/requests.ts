import { IMetaReponse, IVehicleType } from ".";

export interface IRequestData {
  first_name: string;
  last_name: string;
  phone: string;
  manufacturer_id: string;
  vehicle_model_id: string;
  model: string;
  budget: string;
  manufacture_year: string;
  description: string;
  vehicle_type: IVehicleType;
  engine_capacity: string;
}

export interface IRequestDTO {
  rfq: {
    manufacturer_id: string;
    vehicle_model_id: string;
    model: string;
    budget: string;
    manufacture_year: string;
    description: string;
    vehicle_type: IVehicleType;
    engine_capacity: string;
  };
  user: {
    first_name: string;
    last_name: string;
    phone: string;
  };
}

export interface IRequestsResponse {
  data: {
    id: number;
    budget: number;
    created_at: string; // ISO 8601 date string
    description: string | null;
    engine_capacity: number | null;
    manufacture_year: number;
    manufacturer_id: number | null;
    manufacturer_name: string | null;
    model: string | null;
    state: "active" | "inactive" | "archived"; // assuming possible states
    user_id: number;
    vehicle_model_id: number | null;
    vehicle_model_name: string | null;
    vehicle_type: IVehicleType;
  }[];
  meta: IMetaReponse;
}
