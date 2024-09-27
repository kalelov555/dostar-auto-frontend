import { IFavorite } from "@/interfaces/favorites";
import moment from "moment";
import "moment/locale/ru"; // Import Russian locale

export function formatPrice(num: number): string {
  // Convert the number to a string and split it into an array of characters
  const numStr = num.toString();
  const len = numStr.length;

  // Array to hold parts of the formatted number
  let parts: string[] = [];

  // Loop through the string in reverse and insert spaces every 3 digits
  for (let i = len - 1; i >= 0; i--) {
    const pos = len - 1 - i; // Position from the right

    // Insert a space every 3 digits, but not at the end
    if (pos > 0 && pos % 3 === 0) {
      parts.push(" ");
    }
    parts.push(numStr[i]);
  }

  // Reverse the array to get the correct order and join into a single string
  return parts.reverse().join("") + " ₸";
}

export const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
});

export const humanReadableDateFormat = (date: Date) => {
  // Проверяем, прошло ли меньше 2 дней
  const diffInDays = moment().diff(date, "days");

  moment.locale("ru");

  const formattedDate =
    diffInDays < 2
      ? moment(date).fromNow() // Если меньше 2 дней, показываем "1 день назад"
      : moment(date).format("LL"); // Если больше 2 дней, показываем обычную дату

  return formattedDate;
};

export const isFavoriteVehicle = (
  productId: number,
  arr: IFavorite[] | undefined = []
) => {
  return arr.map((fav) => fav.vehicle_id).includes(productId);
};
