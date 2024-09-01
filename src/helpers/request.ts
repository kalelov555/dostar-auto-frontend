import { IMark } from "@/interfaces/marks";
import { IRequestData, IRequestDTO } from "@/interfaces/requests";
import { KeyFilterType } from "primereact/keyfilter";

type Option = {
  name: string;
  value: string;
};

export type IDataInput = {
  name: keyof IRequestData;
  type: string;
  keyfilter?: KeyFilterType | undefined;
  options?: Option[];
  getOptions?: (arr: IMark[] | undefined) => Option[];
  placeholder?: string;
  floatingLabel: boolean;
  label?: string;
  children?: IDataInput[];
};

const vehicleTypesOptions = [
  {
    name: "Машина",
    value: "car",
  },
  {
    name: "Грузовик",
    value: "truck",
  },
  {
    name: "Автобус",
    value: "bus",
  },
  {
    name: "Спец. Техника",
    value: "spectechnic",
  },
  {
    name: "Мото",
    value: "moto",
  },
];

export const optionsByVechileType = (
  apiManufactures: IMark[] = []
): Option[] => {
  return apiManufactures.map((item) => ({ name: item.name, value: item.id }));
};

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
    name: "vehicle_type",
    type: "selectDefault",
    options: vehicleTypesOptions,
    placeholder: "Выбрать тип авто",
    floatingLabel: false,
    label: "Тип",
  },
  {
    name: "manufacturer_id",
    type: "select",
    getOptions: (arr) => optionsByVechileType(arr),
    placeholder: "Выбрать марку авто",
    floatingLabel: false,
    label: "Марка",
  },
  {
    name: "vehicle_model_id",
    type: "select",
    getOptions: (arr) => optionsByVechileType(arr),
    placeholder: "Выбрать модель авто",
    floatingLabel: false,
    label: "Модель",
  },
  {
    name: "model",
    type: "text",
    placeholder: "Напишите модель",
    floatingLabel: false,
    label: "Модель",
  },
  {
    name: "budget",
    type: "text",
    placeholder: "Напишите ваш бюджет",
    floatingLabel: false,
    label: "Бюджет",
    keyfilter: "pnum",
  },
  {
    name: "engine_capacity",
    type: "text",
    placeholder: "Напишите объем в литрах",
    floatingLabel: false,
    label: "Объем двигателя",
    keyfilter: "pnum",
  },
  {
    name: "manufacture_year",
    type: "text",
    placeholder: "Какого года?",
    floatingLabel: false,
    label: "Год выпуска",
    keyfilter: "pnum",
  },
  {
    name: "description",
    type: "textarea",
    placeholder: "Придумайте описание",
    floatingLabel: false,
    label: "Описание",
  },
];

export function transformData(input: any) {
  // Helper function to remove keys with empty values
  const removeEmptyKeys = (obj: any) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => value !== "")
    );
  };

  // Apply the helper function to the input object
  const cleanedInput = removeEmptyKeys(input);

  // Transform the data
  return {
    rfq: {
      manufacturer_id: cleanedInput.manufacturer_id,
      vehicle_model_id: cleanedInput.vehicle_model_id,
      vehicle_type: cleanedInput.vehicle_type,
      engine_capacity: cleanedInput.engine_capacity
        ? cleanedInput.engine_capacity
        : null,
      budget: cleanedInput.budget,
      manufacture_year: cleanedInput.manufacture_year,
      description: cleanedInput.description,
    },
    user: {
      first_name: cleanedInput.first_name,
      last_name: cleanedInput.last_name,
      phone: cleanedInput.phone,
    },
  };
}
