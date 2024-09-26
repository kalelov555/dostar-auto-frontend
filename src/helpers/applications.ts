import { IApplication, IApplicationData } from "@/interfaces/applications";
import { KeyFilterType } from "primereact/keyfilter";

type Option = {
  name: string;
  value: string;
};

type IDataInput = {
  name: keyof IApplicationData;
  type: string;
  keyfilter?: KeyFilterType | undefined;
  options?: Option[];
  placeholder?: string;
  floatingLabel: boolean;
  label?: string;
  children?: IDataInput[];
};

const applicationTypeOptions = [
  {
    name: "Кредит",
    value: "lending",
  },
  {
    name: "Рассрочка",
    value: "installment",
  },
];

const yesNoOptions = [
  { name: "Да", value: "true" },
  { name: "Нет", value: "false" },
];

export const dataInputs: IDataInput[] = [
  {
    name: "first_name",
    type: "text",
    placeholder: "Напишите ваше имя",
    floatingLabel: false,
    label: "Имя",
  },
  {
    name: "last_name",
    type: "text",
    placeholder: "Напишите вашу фамилию",
    floatingLabel: false,
    label: "Фамилия",
  },
  {
    name: "phone",
    type: "phone",
    placeholder: "Напишите номер телефона",
    floatingLabel: false,
    label: "Номер Телефона",
  },
  {
    name: "application_type",
    type: "selectDefault",
    options: applicationTypeOptions,
    placeholder: "Выбрать тип авто",
    floatingLabel: false,
    label: "Тип",
  },
  {
    name: "official_employee",
    type: "radio",
    options: yesNoOptions,
    floatingLabel: false,
    label: "Рабоете?",
  },
  {
    name: "official_income",
    type: "text",
    placeholder: "Напишите ваш доход",
    floatingLabel: false,
    label: "Ваш доход",
    keyfilter: "pnum",
  },
  {
    name: "unofficial_income",
    type: "text",
    placeholder: "Напишите ваш неоф. доход",
    floatingLabel: false,
    label: "Ваш неоф. доход",
    keyfilter: "pnum",
  },
  {
    name: "current_credits_presence",
    type: "radio",
    options: yesNoOptions,
    floatingLabel: false,
    label: "Есть ли текущ. кредиты?",
  },
  {
    name: "monthly_credit_payment",
    type: "text",
    placeholder: "Напишите ваш (текущий) ежем. платеж",
    floatingLabel: false,
    label: "Ваш ежем. платеж",
    keyfilter: "pnum",
  },
  {
    name: "overdue_credits_presence",
    type: "radio",
    options: yesNoOptions,
    floatingLabel: false,
    label: "Есть ли просроч. кредиты?",
  },
  {
    name: "initial_fee",
    type: "text",
    placeholder: "Укажите 0, если нет первоначального взноса",
    floatingLabel: false,
    label: "Первоночальный взнос",
    keyfilter: "pnum",
  },
];

export const getApplicationParamsById = (application: IApplication) => {
  if (application.decision == "1")
    return {
      bgColor: "bg-red-600",
      percentage: "0%",
    };
  else if (application.decision == "2")
    return {
      bgColor: "bg-orange-600",
      percentage: "25%",
    };
  else if (application.decision == "3")
    return {
      bgColor: "bg-yellow-500",
      percentage: "50%",
    };
  else if (application.decision == "4")
    return {
      bgColor: "bg-lime-500",
      percentage: "75%",
    };
  else
    return {
      bgColor: "bg-green-600",
      percentage: "100%",
    };
};
