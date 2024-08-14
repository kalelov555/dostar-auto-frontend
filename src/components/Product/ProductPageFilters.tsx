import { useEffect, useMemo, useState } from "react";
import FiltersDialog from "./FiltersDialog";
import TypesMenuDialog, { TypeMenuItem } from "./TypesMenuDialog";
import { IDataInput } from "@/interfaces";
import { useRouter } from "next/router";
import { Badge } from "primereact/badge";

type Props = {
  filtersLabel: string;
  dataInputs: IDataInput[];
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

const ProductPageFilters = ({ filtersLabel, dataInputs }: Props) => {
  const [typeModalOpened, setTypeModalOpened] = useState(false);
  const [filtersModalOpened, setFiltersModalOpened] = useState(false);
  const [filtersLength, setFiltersLength] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      setFiltersLength(Object.entries(router.query).length);
    }
  }, [router.isReady, router.query]);
  return (
    <>
      <TypesMenuDialog
        typeModalOpened={typeModalOpened}
        setTypeModalOpened={setTypeModalOpened}
      />

      <FiltersDialog
        dataInputs={dataInputs}
        filtersModalOpened={filtersModalOpened}
        setFiltersModalOpened={setFiltersModalOpened}
      />
      <div className="h-10 bg-primary flex items-center justify-between text-white text-sm px-4 fixed top-[44px] max-w-[768px] w-full">
        <div
          onClick={() => setTypeModalOpened(true)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <p>{filtersLabel}</p>
          <i className="pi pi-angle-down"></i>
        </div>
        <div
          onClick={() => setFiltersModalOpened(true)}
          className="flex items-center gap-2 cursor-pointer relative"
        >
          {filtersLength > 0 && (
            <Badge
              className="absolute -top-3 -right-3 min-w-5 w-5 h-5 flex items-center justify-center"
              value={filtersLength}
              severity="danger"
              style={{ fontSize: "0.7rem" }}
            ></Badge>
          )}
          <p>Фильтр</p>
          <i className="pi pi-sliders-v"></i>
        </div>
      </div>
    </>
  );
};

export default ProductPageFilters;
