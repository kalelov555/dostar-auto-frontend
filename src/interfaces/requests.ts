export interface IRequestData {
  first_name: string;
  last_name: string;
  phone_number: string;
  manufacturer_id: string;
  vehicle_model_id: string;
  model: string;
  budget: string;
  manufacture_year: string;
  description: string;
  vehicle_type: "car" | "bus" | "truck" | "moto" | "spectechnic" | "";
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
    vehicle_type: "car" | "bus" | "truck" | "moto" | "spectechnic" | "";
    engine_capacity: string;
  };
  user: {
    first_name: string;
    last_name: string;
    phone: string;
  };
}
