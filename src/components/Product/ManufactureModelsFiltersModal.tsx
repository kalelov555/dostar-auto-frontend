import { Dialog } from "primereact/dialog";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { IFilter } from "./FiltersDialog";
import { IMark, IMarkModel } from "@/interfaces/marks";
import { useRouter } from "next/router";
import api from "@/services/api/client";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import LoadingScreen from "../shared/LoadingScrenn";
import { Button } from "primereact/button";
import { showErrorNotification } from "@/helpers/notifications";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setValue: UseFormSetValue<IFilter>;
  mark: IMark;
  closeModals: () => void;
  setManufactureModel: Dispatch<SetStateAction<string>>;
};

const ManufactureModelsFiltersModal = ({
  open,
  setOpen,
  setValue,
  mark,
  closeModals,
  setManufactureModel,
}: Props) => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const fetchModels = useCallback(async () => {
    if (router.isReady && open) {
      try {
        const response = await api.get(
          `/manufacturers/${mark.id}/vehicle_models`
        );
        return response.data;
      } catch (err) {
        if (err instanceof AxiosError) showErrorNotification(err.message);
      }
    }
  }, [router.pathname, open]);

  const { data, isLoading } = useQuery<{ data: IMarkModel[] }, AxiosError>({
    queryKey: ["manufactures/models", mark.name],
    queryFn: fetchModels,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnMount: false,
    gcTime: 10 * 60 * 1000,
  });

  const onClick = (model: IMarkModel) => {
    setManufactureModel((prev) => prev + " + " + model.name);
    setValue("vehicle_model_id", model.id);
    closeModals();
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
            style={{ padding: "0 1.5rem" }}
            className="h-12 w-full bg-primary text-white flex items-center gap-4 cursor-pointer"
          >
            <i className="pi pi-arrow-left pi-pw text-base"></i>
            <p className="text-base font-normal">{mark.name}</p>
          </div>

          {isLoading ? (
            <LoadingScreen />
          ) : (
            <>
              {!search && (
                <>
                  <div className="bg-white">
                    <p className="font-medium text-lg text-gray-secondary p-3 shadow-sm">
                      Все Модели
                    </p>
                    {data?.data.length && (
                      <div className="flex flex-col">
                        {data?.data?.map((item) => (
                          <Button
                            onClick={() => onClick(item)}
                            key={item.id}
                            label={item.name}
                            text
                            unstyled
                            className="border-t-[1px] border-gray-primary h-12 text-left px-3 relative"
                            icon="pi pi-chevron-right text-xs absolute right-4 top-[40%]"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      }
    />
  );
};

export default ManufactureModelsFiltersModal;
