export interface ICar {
  id: number;
  body: string;
  city_id: number;
  city_name: string;
  color: string;
  description: string | null;
  discounted_price: number;
  drive_unit: string;
  engine_capacity: number;
  fuel_type: string;
  manufacture_year: number;
  manufacturer_name: string;
  owner_phone_number: string;
  price: number;
  steering_wheel_side: string;
  transmission: string;
  user_id: number;
  vehicle_model_id: number;
  vehicle_model_name: string;
}

export interface ICarResponse {
  data: ICar[];
  meta: {
    total_pages: number;
    current_page: number;
    total_count: number;
  };
}
