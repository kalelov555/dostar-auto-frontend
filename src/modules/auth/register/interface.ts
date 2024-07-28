export interface IRegisterData {
  password: string;
  email: string;
  // tel: string;
  first_name: string;
  last_name: string;
}

export interface RegisterFormData {
  name: keyof IRegisterData;
  type: string;
  placeholder: string;
}
