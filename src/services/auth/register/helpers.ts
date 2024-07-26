import { RegisterFormData } from "./interface";

export const registerInputs: RegisterFormData[] = [
  {
    name: "username",
    type: "text",
    placeholder: "Почта",
  },
  {
    name: "fullName",
    type: "text",
    placeholder: "Имя и фамилия",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Пароль",
  },
  {
    name: "tel",
    type: "tel",
    placeholder: "Номер телефона",
  },
];
