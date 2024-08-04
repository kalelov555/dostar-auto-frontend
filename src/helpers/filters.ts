import { IFilter } from "@/components/Product/FiltersDialog";
import { KeyFilterType } from "primereact/keyfilter";

// const sortingFilters = [
//   { name: "По возрастанию цены", value: "price-asc" },
//   { name: "По убыванию цены", value: "price-desc" },
//   { name: "Сначала свежие объявления", value: "date-asc" },
//   { name: "Сначала старые объявления", value: "date-desc" },
// ];

// const markFilters = [
//   { name: "Toyota", value: "toyota" },
//   { name: "Kia", value: "kia" },
//   { name: "bmw", value: "bmw" },
// ];

const transmissionFilters = [
  { name: "Автомат", value: "at" },
  { name: "Механика", value: "mt" },
  { name: "Автомат-Механика", value: "amt" },
  { name: "CVT", value: "cvt" },
  { name: "Tiptronic", value: "tiptronic" },
];

const bodyFilters = [
  { name: "Sedan", value: "sedan" },
  { name: "Universal", value: "universal" },
  { name: "Hatchback", value: "hatchback" },
  { name: "Limousine", value: "limousine" },
  { name: "Coupe", value: "coupe" },
  { name: "Roadster", value: "roadster" },
  { name: "Cabriolet", value: "cabriolet" },
  { name: "SUV", value: "suv" },
  { name: "CUV", value: "cuv" },
  { name: "Minivan", value: "minivan" },
  { name: "Micro", value: "micro" },
  { name: "Microbus", value: "microbus" },
  { name: "Van", value: "van" },
  { name: "Pickup", value: "pickup" },
  { name: "Targa", value: "targa" },
  { name: "Fastback", value: "fastback" },
  { name: "Liftback", value: "liftback" },
  { name: "Hardtop", value: "hardtop" },
];

const fuelTypeFilters = [
  { name: "Бензин", value: "petrol" },
  { name: "Дизель", value: "diesel" },
  { name: "Газ-бензин", value: "gas_petrol" },
  { name: "Газ", value: "gas" },
  { name: "Гибрид", value: "hybrid" },
  { name: "Электричество", value: "electricity" },
];

const steeringWheelSideFilters = [
  { name: "Справа", value: "right_hand_drive" },
  { name: "Слева", value: "left_hand_drive" },
];

// const driveUnitFilters = [
//   { name: "Задний привод", value: "back" },
//   { name: "Передний привод", value: "front" },
//   { name: "Полный привод", value: "full" },
// ];

const colorFilters = [
  { name: "Белый", value: "белый" },
  { name: "Вишня", value: "вишня" },
  { name: "Хамелеон", value: "хамелеон" },
  { name: "Бежевый", value: "бежевый" },
  { name: "Бирюзовый", value: "бирюзовый" },
  { name: "Бордовый", value: "бордовый" },
  { name: "Голубой", value: "голубой" },
  { name: "Серый", value: "серый" },
  { name: "Синий", value: "синий" },
  { name: "Черный", value: "черный" },
];

type DataInput = {
  name: keyof IFilter;
  type: string;
  keyfilter?: KeyFilterType | undefined;
  options?: {
    name: string;
    value: string;
  }[];
  placeholder?: string;
  floatingLabel: boolean;
  label?: string;
  children?: DataInput[];
};

export const dataInputs: DataInput[] = [
  // {
  //   name: "sortBy",
  //   type: "select",
  //   options: sortingFilters,
  //   placeholder: "Выбрать",
  //   floatingLabel: false,
  //   label: "Сортировать по",
  // },
  // {
  //   name: "mark",
  //   type: "select",
  //   options: markFilters,
  //   placeholder: "Выбрать марку",
  //   floatingLabel: false,
  //   label: "Выбрать марку",
  // },
  {
    name: "price_from",
    type: "range",
    floatingLabel: false,
    label: "Цена, ₸",
    children: [
      {
        name: "price_from",
        type: "text",
        keyfilter: "pnum",
        placeholder: "от",
        floatingLabel: false,
      },
      {
        name: "price_to",
        type: "text",
        keyfilter: "pnum",
        placeholder: "до",
        floatingLabel: false,
      },
    ],
  },
  {
    name: "manufacture_year_from",
    type: "range",
    floatingLabel: false,
    label: "Год выпуска",
    children: [
      {
        name: "manufacture_year_from",
        type: "text",
        keyfilter: "pnum",
        placeholder: "с",
        floatingLabel: false,
      },
      {
        name: "manufacture_year_to",
        type: "text",
        keyfilter: "pnum",
        placeholder: "по",
        floatingLabel: false,
      },
    ],
  },
  {
    name: "transmission",
    type: "select",
    options: transmissionFilters,
    placeholder: "Выбрать кпп",
    floatingLabel: true,
    label: "Коробка передач",
  },
  {
    name: "body",
    type: "select",
    options: bodyFilters,
    placeholder: "Выбрать кузов",
    floatingLabel: true,
    label: "Кузов",
  },
  {
    name: "fuel_type",
    type: "select",
    options: fuelTypeFilters,
    placeholder: "Выбрать тип топлива",
    floatingLabel: true,
    label: "Топливо",
  },
  // {
  //   name: "capacityFrom",
  //   type: "range",
  //   floatingLabel: false,
  //   label: "Объем двигателя, л",
  //   children: [
  //     {
  //       name: "capacityFrom",
  //       type: "text",
  //       keyfilter: "pnum",
  //       placeholder: "от",
  //       floatingLabel: false,
  //     },
  //     {
  //       name: "capacityTo",
  //       type: "text",
  //       keyfilter: "pnum",
  //       placeholder: "до",
  //       floatingLabel: false,
  //     },
  //   ],
  // },
  {
    name: "steering_wheel_side",
    type: "select",
    options: steeringWheelSideFilters,
    placeholder: "Выбрать сторону руля",
    floatingLabel: true,
    label: "Руль",
  },
  // {
  //   name: "driveUnit",
  //   type: "select",
  //   options: driveUnitFilters,
  //   placeholder: "Выбрать привод",
  //   floatingLabel: true,
  //   label: "Привод",
  // },
  {
    name: "color",
    type: "select",
    options: colorFilters,
    placeholder: "Выбрать цвет",
    floatingLabel: true,
    label: "Цвет",
  },
];
