export interface IRegisterData {
  password: string;
  username: string;
  tel: string;
  fullName: string;
  city: string;
}

export interface RegisterFormData {
  name: keyof IRegisterData;
  type: string;
  placeholder: string;
}
