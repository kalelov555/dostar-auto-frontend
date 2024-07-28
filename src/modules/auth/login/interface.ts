export interface ILoginData {
  email: string;
  password: string;
}

export interface LoginFormData {
  name: keyof ILoginData;
  type: string;
  placeholder: string;
}

export interface LoginDTO {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  token: string;
  refreshToken: string;
}
