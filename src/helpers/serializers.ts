import { ICar } from "@/interfaces/car";
import {
  bodyFilters,
  driveUnitFilters,
  fuelTypeFilters,
  steeringWheelSideFilters,
  transmissionFilters,
  vehiclePurposeFilters,
} from "./filters";

const findInFiltersObjectAndReturnName = (
  array: Array<{ name: string; value: string }>,
  value: string
) => {
  const foundElem = array.find((item) => {
    return item.value === value;
  });
  return foundElem?.name || "";
};

export const serializeCarData = (response: ICar) => {
  return {
    "Тип кузова": findInFiltersObjectAndReturnName(bodyFilters, response.body),
    Цвет: response.color,
    Привод: findInFiltersObjectAndReturnName(
      driveUnitFilters,
      response.drive_unit
    ),
    "Объем двигателя": `${response.engine_capacity} L`,
    "Тип топлива": findInFiltersObjectAndReturnName(
      fuelTypeFilters,
      response.fuel_type
    ),
    "Год выпуска": response.manufacture_year,
    Пробег: `${response.mileage} km`,
    "Сторона руля": findInFiltersObjectAndReturnName(
      steeringWheelSideFilters,
      response.steering_wheel_side
    ),
    "Коробка передач": findInFiltersObjectAndReturnName(
      transmissionFilters,
      response?.transmission
    ),
    Тип: findInFiltersObjectAndReturnName(
      vehiclePurposeFilters,
      response.vehicle_purpose
    ),
  };
};

export const formatfromPhoneMask = (phone: string) => {};
