import { IDataInput } from "@/interfaces";

const sortingFilters = [
  { name: "Сначала с большим пробегом", value: "mileage-desc" },
  { name: "Сначала с меньшим пробегом", value: "mileage-asc" },
  { name: "По возрастанию цены", value: "price-asc" },
  { name: "По убыванию цены", value: "price-desc" },
  { name: "Сначала свежие объявления", value: "created_at-asc" },
  { name: "Сначала старые объявления", value: "created_at-desc" },
];
export const transmissionFilters = [
  { name: "Автомат", value: "at" },
  { name: "Механика", value: "mt" },
  { name: "Робот", value: "amt" },
  { name: "Вариатор", value: "cvt" },
  { name: "Типтроник", value: "tiptronic" },
];

export const bodyFilters = [
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

export const vehiclePurposeFilters = [
  { name: "Городской", value: "city" },
  { name: "Вахтовый", value: "shift" },
  { name: "Пригородный", value: "suburban" },
  { name: "Междугородный", value: "intercity" },
  { name: "Туристический", value: "tourist" },
  { name: "Универсальный", value: "universal" },
  { name: "Микроавтобус", value: "minibus" },
  { name: "Другие", value: "other" },
];

export const fuelTypeFilters = [
  { name: "Бензин", value: "petrol" },
  { name: "Дизель", value: "diesel" },
  { name: "Газ-бензин", value: "gas_petrol" },
  { name: "Газ", value: "gas" },
  { name: "Гибрид", value: "hybrid" },
  { name: "Электричество", value: "electricity" },
];

export const steeringWheelSideFilters = [
  { name: "Справа", value: "right_hand_drive" },
  { name: "Слева", value: "left_hand_drive" },
];

export const driveUnitFilters = [
  { name: "Задний привод", value: "rear_wheel_drive" },
  { name: "Передний привод", value: "front_wheel_drive" },
  { name: "Полный привод", value: "four_wheel_drive" },
];

export const colorFilters = [
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

export const manufactureCountryFilters = [
  { name: "Казахстан", value: "kazakhstan" },
  { name: "Россия", value: "russia" },
  { name: "Беларусь", value: "belarus" },
  { name: "Англия", value: "england" },
  { name: "Австрия", value: "austria" },
  { name: "Германия", value: "germany" },
  { name: "Европа", value: "europe" },
  { name: "Индия", value: "india" },
  { name: "Испания", value: "spain" },
  { name: "Италия", value: "italy" },
  { name: "Канада", value: "canada" },
  { name: "Китай", value: "china" },
  { name: "Корея", value: "korea" },
  { name: "США", value: "usa" },
  { name: "Турция", value: "turkiye" },
  { name: "Украина", value: "ukraine" },
  { name: "Япония", value: "japan" },
  { name: "Другие", value: "other" },
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
    name: "mileage",
    type: "text",
    keyfilter: "pnum",
    placeholder: "Пробег не более, км",
    floatingLabel: false,
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
  {
    name: "drive_unit",
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
    name: "mileage",
    type: "text",
    keyfilter: "pnum",
    placeholder: "Пробег не более, км",
    floatingLabel: false,
  },
  {
    name: "drive_unit",
    type: "select",
    options: driveUnitFilters,
    placeholder: "Выбрать привод",
    floatingLabel: true,
    label: "Привод",
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
    placeholder: "Выбрать тип транспорта",
    floatingLabel: true,
    label: "Тип",
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

export const specTechInputs: IDataInput[] = [
  ...busesInput,
  {
    name: "manufacture_country",
    type: "select",
    options: manufactureCountryFilters,
    placeholder: "Выбрать",
    floatingLabel: true,
    label: "Страна производителя",
  },
];

export const popularMarks = [
  {
    name: "Toyota",
    logo: "/marks/toyota.svg",
  },
  {
    name: "Kia",
    logo: "/marks/kia.svg",
  },
  {
    name: "Hyundai",
    logo: "/marks/hyundai.svg",
  },
  {
    name: "Mercedes-Benz",
    logo: "/marks/mercedes.svg",
  },
  {
    name: "Volkswagen",
    logo: "/marks/volkswagen.svg",
  },
  {
    name: "Nissan",
    logo: "/marks/nissan.svg",
  },
  {
    name: "BMW",
    logo: "/marks/bmw.svg",
  },
];
