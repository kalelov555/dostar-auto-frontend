import { Dialog } from "primereact/dialog";
import { useState } from "react";

const ProductPageFilters = () => {
  const [typeModalOpened, setTypeModalOpened] = useState(false);
  const [filtersModalOpened, setFiltersModalOpened] = useState(false);
  return (
    <>
      <Dialog
        id="type"
        header="Выберите Категорию"
        visible={typeModalOpened}
        position={"bottom"}
        style={{ maxWidth: "768px", width: "100%" }}
        onHide={() => {
          if (!typeModalOpened) return;
          setTypeModalOpened(false);
        }}
        draggable={false}
      >
        <p className="m-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Dialog>

      <Dialog
        headerStyle={{ padding: "0" }}
        id="filter"
        header={
          <div
            style={{ padding: "0 1.5rem" }}
            className="h-12 w-full bg-primary text-white flex items-center gap-4"
          >
            <i
              onClick={() => setFiltersModalOpened(false)}
              className="pi pi-plus pi-pw rotate-45 text-lg cursor-pointer"
            ></i>
            <p className="text-base font-normal">Фильтр</p>
          </div>
        }
        visible={filtersModalOpened}
        position={"center"}
        style={{ maxWidth: "768px", width: "100%" }}
        onHide={() => {
          if (!filtersModalOpened) return;
          setFiltersModalOpened(false);
        }}
        draggable={false}
        maximized
        closable={false}
      >
        <p className="m-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Dialog>
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
