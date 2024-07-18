import { IFilter } from "@/components/Product/FiltersDialog";
import { KeyFilterType } from "primereact/keyfilter";

const sortingFilters = [
  { name: "По возрастанию цены", value: "price-asc" },
  { name: "По убыванию цены", value: "price-desc" },
  { name: "Сначала свежие объявления", value: "date-asc" },
  { name: "Сначала старые объявления", value: "date-desc" },
];

const markFilters = [
  { name: "Toyota", value: "toyota" },
  { name: "Kia", value: "kia" },
  { name: "bmw", value: "bmw" },
];

const transmissionFilters = [
  { name: "Автомат", value: "automat" },
  { name: "Механика", value: "mechanic" },
];

const carcaseFilters = [
  { name: "Седан", value: "sedan" },
  { name: "Универсал", value: "universal" },
  { name: "Фургон", value: "furgon" },
  { name: "Пикап", value: "pickup" },
  { name: "Кабриолет", value: "cabriolet" },
  { name: "Внедорожник", value: "vnedorozhnik" },
  { name: "Минивэн", value: "minivan" },
];

const fuelFilters = [
  { name: "Бензин", value: "sedan" },
  { name: "Дизель", value: "universal" },
  { name: "Газ-бензин", value: "furgon" },
  { name: "Газ", value: "pickup" },
  { name: "Электричество", value: "cabriolet" },
];

const wheelSideFilters = [
  { name: "Справа", value: "right" },
  { name: "Слева", value: "left" },
];

const driveUnitFilters = [
  { name: "Задний привод", value: "back" },
  { name: "Передний привод", value: "front" },
  { name: "Полный привод", value: "full" },
];

const colorFilters = [
  { name: "Белый", value: "white" },
  { name: "Черный", value: "black" },
  { name: "Красный", value: "red" },
  { name: "Синий", value: "blue" },
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
  {
    name: "sortBy",
    type: "select",
    options: sortingFilters,
    placeholder: "Выбрать",
    floatingLabel: false,
    label: "Сортировать по",
  },
  {
    name: "mark",
    type: "select",
    options: markFilters,
    placeholder: "Выбрать марку",
    floatingLabel: false,
    label: "Выбрать марку",
  },
  {
    name: "priceFrom",
    type: "range",
    floatingLabel: false,
    label: "Цена, ₸",
    children: [
      {
        name: "priceFrom",
        type: "text",
        keyfilter: "pnum",
        placeholder: "от",
        floatingLabel: false,
      },
      {
        name: "priceTo",
        type: "text",
        keyfilter: "pnum",
        placeholder: "до",
        floatingLabel: false,
      },
    ],
  },
  {
    name: "releaseDateFrom",
    type: "range",
    floatingLabel: false,
    label: "Год выпуска",
    children: [
      {
        name: "releaseDateFrom",
        type: "text",
        keyfilter: "pnum",
        placeholder: "с",
        floatingLabel: false,
      },
      {
        name: "releaseDateTo",
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
    name: "carcase",
    type: "select",
    options: carcaseFilters,
    placeholder: "Выбрать кузов",
    floatingLabel: true,
    label: "Кузов",
  },
  {
    name: "fuel",
    type: "select",
    options: fuelFilters,
    placeholder: "Выбрать тип топлива",
    floatingLabel: true,
    label: "Топливо",
  },
  {
    name: "capacityFrom",
    type: "range",
    floatingLabel: false,
    label: "Объем двигателя, л",
    children: [
      {
        name: "capacityFrom",
        type: "text",
        keyfilter: "pnum",
        placeholder: "от",
        floatingLabel: false,
      },
      {
        name: "capacityTo",
        type: "text",
        keyfilter: "pnum",
        placeholder: "до",
        floatingLabel: false,
      },
    ],
  },
  {
    name: "wheelSide",
    type: "select",
    options: wheelSideFilters,
    placeholder: "Выбрать сторону руля",
    floatingLabel: true,
    label: "Руль",
  },
  {
    name: "driveUnit",
    type: "select",
    options: driveUnitFilters,
    placeholder: "Выбрать привод",
    floatingLabel: true,
    label: "Привод",
  },
  {
    name: "color",
    type: "select",
    options: colorFilters,
    placeholder: "Выбрать цвет",
    floatingLabel: true,
    label: "Цвет",
  },
];
