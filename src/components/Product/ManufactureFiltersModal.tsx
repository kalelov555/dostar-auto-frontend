import { popularMarks } from "@/helpers/filters";
import api from "@/services/api/client";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { IMark } from "@/interfaces/marks";
import { UseFormSetValue } from "react-hook-form";
import { IFilter } from "./FiltersDialog";
import ManufactureModelsFiltersModal from "./ManufactureModelsFiltersModal";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setValue: UseFormSetValue<IFilter>;
  setManufactureModel: Dispatch<SetStateAction<string>>;
  data: { data: IMark[] } | undefined;
  type: string;
};

const ManufactureFiltersModal = ({
  open,
  setOpen,
  setValue,
  setManufactureModel,
  data,
  type,
}: Props) => {
  const router = useRouter();
  // const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  const [modelsModalOpened, setModelsModalOpened] = useState(false);
  const [mark, setMark] = useState<IMark>({
    id: "",
    name: "",
    logo_url: "",
  });

  const [filteredManufactures, setFilteredManufatures] = useState(data);

  const popularMarksList: IMark[] =
    data?.data
      .filter((item) =>
        popularMarks.map((mark) => mark.name)?.includes(item.name)
      )
      .map((newItem) => {
        const logo = popularMarks.find(
          (mark) => mark.name === newItem.name
        )?.logo;
        return { ...newItem, logo };
      }) || [];

  const onClick = (mark: IMark) => {
    setMark(mark);
    setManufactureModel(mark.name);
    if (type === "car") {
      setModelsModalOpened(true);
    } else {
      setValue("manufacturer_id", mark.id);
      setOpen(false);
    }
  };

  const closeModals = () => {
    setModelsModalOpened(false);
    setOpen(false);
  };

  return (
    <Dialog
      className="bg-[#f1f1f1] overflow-scroll"
      id="filter"
      visible={open}
      position={"center"}
      style={{ maxWidth: "768px", width: "100%", borderRadius: 0 }}
      draggable={false}
      maximized
      onHide={() => {}}
      closable={false}
      content={
        <div className="border-0 min-h-screen">
          <div
            onClick={() => setOpen(false)}
            className="px-2 mt-[44px] h-12 w-full bg-primary text-white flex items-center gap-4 cursor-pointer"
          >
            <i className="pi pi-arrow-left pi-pw text-base"></i>
            <p className="text-base font-normal">Марка</p>
          </div>

          <div>
            <ManufactureModelsFiltersModal
              open={modelsModalOpened}
              setOpen={setModelsModalOpened}
              closeModals={closeModals}
              setValue={setValue}
              mark={mark}
              setManufactureModel={setManufactureModel}
            />
            {!search && (
              <div>
                <div className="bg-white">
                  <p className="font-medium text-lg text-gray-secondary p-3 shadow-sm">
                    Популярные Марки
                  </p>
                  {popularMarks.length && (
                    <div className="flex flex-col">
                      {popularMarksList?.map((item) => (
                        <Button
                          onClick={() => onClick(item)}
                          key={item.id}
                          text
                          unstyled
                          className="border-t-[1px] border-gray-primary h-12 text-left px-3 relative"
                          icon="pi pi-chevron-right text-xs absolute right-4 top-[40%]"
                        >
                          <div className="flex flex-row gap-2 items-center">
                            <Image
                              src={item.logo as string}
                              alt={item.name}
                              width={24}
                              height={24}
                            />
                            <label>{item.name}</label>
                          </div>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-white mt-4">
                  <p className="font-medium text-lg text-gray-secondary p-3 shadow-sm">
                    Все Марки
                  </p>
                  {data?.data.length && (
                    <div className="flex flex-col">
                      {data?.data?.map((item) => (
                        <Button
                          key={item.id}
                          label={item.name}
                          text
                          unstyled
                          className={`border-t-[1px] border-gray-primary h-12 text-left px-3 relative`}
                          icon="pi pi-chevron-right text-xs absolute right-4 top-[40%]"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      }
    />
  );
};

export default ManufactureFiltersModal;
