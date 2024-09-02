export interface IApplicationData {
  first_name: string;
  last_name: string;
  phone: string;
  worker: boolean | "";
  application_type: "credit" | "rassrochka" | "";
  official_income: string;
  unofficial_income: string;
  current_credits_presence: boolean | "";
  monthly_credit_payment: string;
  overdue_credits_presence: boolean | "";
  initial_fee: number;
}
