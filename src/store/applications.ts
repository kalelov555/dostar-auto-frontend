import { IApplication } from "@/interfaces/applications";
import { atom } from "jotai";

export const initialValuesForApplication = {
  id: 0,
  application_type: "",
  created_at: "",
  current_credits_presence: false,
  decision: null,
  initial_fee: 0,
  monthly_credit_payment: 0,
  official_employee: false,
  official_income: 0,
  overdue_credits_presence: false,
  unofficial_income: 0,
  vehicle_type: "",
};

export const applicationStorage = atom<IApplication>(
  initialValuesForApplication
);
