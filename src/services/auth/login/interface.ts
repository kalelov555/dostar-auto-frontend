export interface ILoginData {
  username: string;
  password: string;
}

export interface LoginFormData {
  name: keyof ILoginData;
  type: string;
  placeholder: string;
}
