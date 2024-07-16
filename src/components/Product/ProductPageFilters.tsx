import { useState } from "react";
import FiltersDialog from "./FiltersDialog";
import TypesMenuDialog from "./TypesMenuDialog";

const ProductPageFilters = () => {
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
          <p>Легковые</p>
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
