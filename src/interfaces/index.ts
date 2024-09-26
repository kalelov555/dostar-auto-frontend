import { IFilter } from "@/components/Product/FiltersDialog";
import { KeyFilterType } from "primereact/keyfilter";

export interface IProduct {
  id: number;
  description: string | null;
  discounted_price: number | null;
  engine_capacity: number;
  fuel_type: string;
  manufacture_year: number;
  owner_phone_number: string;
  price: number;
  user_id: number;
  mileage: number;
}

export interface IVehicle {
  id: number;
  created_at: string;
  description: string;
  discounted_price: number | null;
  engine_capacity?: number; // Optional for vehicles that don't have it
  fuel_type?: string;
  image_urls: string[] | null;
  info: string;
  manufacture_year: number;
  manufacturer_name: string;
  mileage?: number; // Optional for vehicles that don't have it
  price: number;
  user_id: number | null;
}

export interface IMetaReponse {
  total_pages: number;
  current_page: number;
  total_count: number;
}

export type IDataInput = {
  name: keyof IFilter;
  type: string;
  keyfilter?: KeyFilterType | undefined;
  options?: {
    name: string;
    value: string;
  }[];
  placeholder?: string;
  floatingLabel: boolean;
  label?: string;
  children?: IDataInput[];
};

export type IVehicleType =
  | "car"
  | "bus"
  | "truck"
  | "moto"
  | "spectechnic"
  | "";
