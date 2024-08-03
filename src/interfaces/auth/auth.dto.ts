// Login

export interface ILoginDTO {
  email: string;
  password: string;
}

export interface LoginFormData {
  name: keyof ILoginDTO;
  type: string;
  placeholder: string;
}

export interface IRegisterDTO {
  password: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface RegisterFormData {
  name: keyof IRegisterDTO;
  type: string;
  placeholder: string;
}
