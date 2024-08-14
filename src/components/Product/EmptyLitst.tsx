import { Button } from "primereact/button";

export const EmptyList = () => {
  return (
    <div className="min-h-screen flex flex-col gap-2 items-center justify-center -mt-4">
      <h1>Объявлений не найдено</h1>
      <p className="text-gray-500">Попробуйте изменить фильтры</p>
    </div>
  );
};
