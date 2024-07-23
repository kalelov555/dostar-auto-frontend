import { useMemo, useState } from "react";
import FiltersDialog from "./FiltersDialog";
import TypesMenuDialog, { TypeMenuItem } from "./TypesMenuDialog";

type Props = {
  filtersLabel: string;
};

export const mainMenuItems = [
  {
    name: "cars",
    pathname: "/products/cars",
    label: "Лекговые",
    icon: "pi pi-car",
  },
  {
    name: "commercial",
    pathname: "/products/commercial",
    label: "Коммерческие",
    icon: "pi pi-truck",
    children: [
      {
        pathname: "/products/commercial/bus",
        label: "Автобусы",
        icon: "pi pi-car",
      },
      {
        pathname: "/products/commercial/trucks",
        label: "Грузовики",
        icon: "pi pi-truck",
      },
    ],
  },
  {
    name: "moto",
    pathname: "/products/moto",
    label: "Мото",
    icon: "pi pi-car",
  },
];

const ProductPageFilters = ({ filtersLabel }: Props) => {
  const [typeModalOpened, setTypeModalOpened] = useState(false);
  const [filtersModalOpened, setFiltersModalOpened] = useState(false);

  return (
    <>
      <TypesMenuDialog
        typeModalOpened={typeModalOpened}
        setTypeModalOpened={setTypeModalOpened}
      />

      <FiltersDialog
        filtersModalOpened={filtersModalOpened}
        setFiltersModalOpened={setFiltersModalOpened}
      />
      <div className="h-10 w-full bg-primary flex items-center justify-between text-white text-sm px-4 fixed top-[44px] max-w-[768px] w-full">
        <div
          onClick={() => setTypeModalOpened(true)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <p>{filtersLabel}</p>
          <i className="pi pi-angle-down"></i>
        </div>
        <div
          onClick={() => setFiltersModalOpened(true)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <p>Фильтр</p>
          <i className="pi pi-sliders-v"></i>
        </div>
      </div>
    </>
  );
};

export default ProductPageFilters;
