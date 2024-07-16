import { Dialog } from "primereact/dialog";
import { Dispatch, SetStateAction } from "react";

type Props = {
  filtersModalOpened: boolean;
  setFiltersModalOpened: Dispatch<SetStateAction<boolean>>;
};

const FiltersDialog = ({
  filtersModalOpened,
  setFiltersModalOpened,
}: Props) => {
  return (
    <Dialog
      className="bg-[#f1f1f1]"
      headerStyle={{ padding: "0" }}
      id="filter"
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
      content={
        <div className="border-0">
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
        </div>
      }
    />
  );
};

export default FiltersDialog;
