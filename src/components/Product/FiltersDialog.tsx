import { dataInputs } from "@/services/filters/product";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Dispatch, SetStateAction, useState } from "react";
import { Controller, useForm } from "react-hook-form";

type Props = {
  filtersModalOpened: boolean;
  setFiltersModalOpened: Dispatch<SetStateAction<boolean>>;
};

export interface IFilter {
  name: string;
  mark: string;
  model: string;
  priceFrom: string;
  priceTo: string;
  releaseDateFrom: string;
  releaseDateTo: string;
  transmission: string; //коробка передач
  carcase: string; //кузов
  fuel: string;
  capacityFrom: string | null;
  capacityTo: string | null;
  wheelSide: "left" | "right" | ""; //left or right
  driveUnit: string; // привод
  color: string;
  paymentType: "credit" | "instllment" | "";
  crushState: "critical" | "notMoving" | "";
  descriptionText: "";
  sortBy: string;
}

type FilterObject = {
  name: string;
  value: string;
};

const FiltersDialog = ({
  filtersModalOpened,
  setFiltersModalOpened,
}: Props) => {
  const defaultValues: IFilter = {
    name: "",
    mark: "",
    model: "",
    priceFrom: "",
    priceTo: "",
    releaseDateFrom: "",
    releaseDateTo: "",
    transmission: "", //коробка передач
    carcase: "",
    fuel: "",
    capacityFrom: "",
    capacityTo: "",
    wheelSide: "", //left or right
    driveUnit: "", // привод
    color: "",
    paymentType: "",
    crushState: "",
    descriptionText: "",
    sortBy: "",
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFilter>({ defaultValues });

  const onSubmit = (data: IFilter) => {
    alert(JSON.stringify(data));
  };

  return (
    <Dialog
      className="bg-[#f1f1f1] overflow-scroll"
      id="filter"
      visible={filtersModalOpened}
      position={"center"}
      style={{ maxWidth: "768px", width: "100%", borderRadius: 0 }}
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

          <form
            className="px-2 pt-0 pb-20 flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            {dataInputs.map((input) => (
              <div
                key={input.name}
                className={`field ${input.floatingLabel ? "mt-8" : "mt-1"}`}
              >
                <span className={input.floatingLabel ? "p-float-label" : ""}>
                  {!input.floatingLabel && (
                    <label
                      className="text-[12px] text-[#6b7280] mx-[0.75rem]"
                      htmlFor={input.name}
                    >
                      {input.label}
                    </label>
                  )}
                  {input.type === "select" ? (
                    <Controller
                      name={input.name}
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          id={field.name}
                          value={field.value}
                          onChange={(e) => field.onChange(e.value)}
                          options={input.options}
                          optionLabel="name"
                          optionValue="value"
                          placeholder={input.placeholder}
                          className="w-full rounded-none"
                          checkmark={true}
                          name={input.name}
                        />
                      )}
                    />
                  ) : input.type === "range" ? (
                    <div className="flex w-full items-center">
                      {input.children?.map((child) => (
                        <Controller
                          key={child.name}
                          name={child.name}
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputText
                              id={field.name}
                              placeholder={child.placeholder}
                              keyfilter={child?.keyfilter}
                              className="w-full"
                              {...(field as any)}
                            />
                          )}
                        />
                      ))}
                    </div>
                  ) : (
                    <></>
                  )}
                  {input.floatingLabel && (
                    <label htmlFor={input.name}>{input.label}</label>
                  )}
                </span>
              </div>
            ))}

            <div className="fixed bottom-4 max-w-[600px] w-full mx-auto self-center">
              <Button
                severity="info"
                className="w-full h-12 shadow-[0_8px_25px_0_rgba(42,129,221,.6)]"
                label="Поиск..."
                type="submit"
              />
            </div>
          </form>
        </div>
      }
    />
  );
};

export default FiltersDialog;
