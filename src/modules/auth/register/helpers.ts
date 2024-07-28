import { RegisterFormData } from "./interface";

export const registerInputs: RegisterFormData[] = [
  {
    name: "email",
    type: "text",
    placeholder: "Почта",
  },
  {
    name: "first_name",
    type: "text",
    placeholder: "Имя",
  },
  {
    name: "last_name",
    type: "text",
    placeholder: "Фамилия",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Пароль",
  },
  // {
  //   name: "tel",
  //   type: "tel",
  //   placeholder: "Номер телефона",
  // },
];
