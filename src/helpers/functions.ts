import { IFavorite } from "@/interfaces/favorites";

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

export const isFavoriteVehicle = (
  productId: number,
  arr: IFavorite[] | undefined
) => {
  if (arr) return arr.map((fav) => fav.vehicle_id).includes(productId);
  else return false;
};
