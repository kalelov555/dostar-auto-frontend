import { IMetaReponse, IProduct } from ".";
import { IUser } from "./auth";
import { IBus } from "./bus";
import { ICar } from "./car";
import { IMoto } from "./moto";
import { ISpecTechnic } from "./spec-technics";
import { ITruck } from "./trucks";

export interface IApplicationData {
  first_name: string;
  last_name: string;
  phone: string;
  official_employee: boolean | "";
  application_type: "lending" | "installment" | "";
  official_income: string;
  unofficial_income: string;
  current_credits_presence: boolean | "";
  monthly_credit_payment: string;
  overdue_credits_presence: boolean | "";
  initial_fee: number;
}

export interface IApplication {
  id: number;
  application_type: string;
  created_at: string;
  current_credits_presence: boolean;
  decision: string | null;
  initial_fee: number;
  monthly_credit_payment: number;
  official_employee: boolean;
  official_income: number;
  overdue_credits_presence: boolean;
  unofficial_income: number;
  vehicle_type: string;
}

export interface IApplicationExtended extends IApplication {
  vehicle_data: ICar & IBus & IMoto & ITruck & ISpecTechnic;
}

export interface IApplicationsResponse {
  data: IApplicationExtended[];
  meta: IMetaReponse;
}

export interface IApplicationCreateResponse {
  data: IApplication;
}

export type IApplicationDto = {
  loan_application: Omit<IApplicationData, "phone">;
  user: Pick<IUser, "phone">;
};
