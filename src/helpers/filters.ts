import { IDataInput } from "@/interfaces";

const sortingFilters = [
  { name: "По возрастанию цены", value: "price-asc" },
  { name: "По убыванию цены", value: "price-desc" },
  { name: "Сначала свежие объявления", value: "created_at-asc" },
  { name: "Сначала старые объявления", value: "created_at-desc" },
];

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
  { name: "Седан", value: "sedan" },
  { name: "Кабриолет", value: "cabriolet" },
  { name: "Фургон", value: "van" },
  { name: "Универсал", value: "universal" },
  { name: "Внедорожник", value: "suv" },
  { name: "Пикап", value: "pickup" },
  { name: "Хэтчбек", value: "hatchback" },
  { name: "Кроссовер", value: "cuv" },
  { name: "Тарга", value: "targa" },
  { name: "Лимузин", value: "limousine" },
  { name: "Минивэн", value: "minivan" },
  { name: "Фастбэк", value: "fastback" },
  { name: "Купе", value: "coupe" },
  { name: "Микровэн", value: "micro" },
  { name: "Лифтбэк", value: "liftback" },
  { name: "Родстер", value: "roadster" },
  { name: "Микроавтобус", value: "microbus" },
  { name: "Хардтоп", value: "hardtop" },
];

// [city shift suburban intercity tourist universal minibus other]

const vehiclePurposeFilters = [
  { name: "Город", value: "city" },
  { name: "Шифт", value: "shift" },
  { name: "Субурбан", value: "suburban" },
  { name: "Межгород", value: "intercity" },
  { name: "Турист", value: "tourist" },
  { name: "Универсал", value: "universal" },
  { name: "Минибус", value: "minibus" },
  { name: "Остальное", value: "other" },
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

export const carsInputs: IDataInput[] = [
  {
    name: "sort",
    type: "select",
    options: sortingFilters,
    placeholder: "Выбрать",
    floatingLabel: false,
    label: "Сортировать по",
  },
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

export const busesInput: IDataInput[] = [
  {
    name: "sort",
    type: "select",
    options: sortingFilters,
    placeholder: "Выбрать",
    floatingLabel: false,
    label: "Сортировать по",
  },
  {
    name: "key_words",
    type: "text",
    placeholder: "Ключевые слова",
    floatingLabel: false,
    label: "Что ищите?",
  },
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
    name: "vehicle_purpose",
    type: "select",
    options: vehiclePurposeFilters,
    placeholder: "Выбрать цель транспорта",
    floatingLabel: true,
    label: "Цель",
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
];
