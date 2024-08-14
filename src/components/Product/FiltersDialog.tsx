import { IDataInput } from "@/interfaces";
import { pageAtom } from "@/store/page";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Controller, useForm } from "react-hook-form";

type Props = {
  filtersModalOpened: boolean;
  setFiltersModalOpened: Dispatch<SetStateAction<boolean>>;
  dataInputs: IDataInput[];
};

export interface IFilter {
  // name: string;
  // mark: string;
  // model: string;
  price_from: string;
  price_to: string;
  manufacture_year_from: string;
  manufacture_year_to: string;
  manufacture_country: string;
  transmission: string;
  body: string;
  fuel_type: string;
  // capacityFrom: string | null;
  // capacityTo: string | null;
  mileage: string;
  steering_wheel_side: "left_hand_drive" | "right_hand_drive" | "";
  drive_unit: string;
  color: string;
  paymentType: "credit" | "instllment" | "";
  crushState: "critical" | "notMoving" | "";
  descriptionText: "";
  sort: string;
  vehicle_purpose: string;
  key_words: string;
}

type FilterObject = {
  name: string;
  value: string;
};

const FiltersDialog = ({
  filtersModalOpened,
  setFiltersModalOpened,
  dataInputs,
}: Props) => {
  const [page, setPage] = useAtom(pageAtom);
  const router = useRouter();
  const defaultValues: IFilter = {
    // name: "",
    // mark: "",
    // model: "",
    price_from: "",
    price_to: "",
    manufacture_year_from: "",
    manufacture_year_to: "",
    transmission: "", //коробка передач
    body: "",
    fuel_type: "",
    // capacityFrom: "",
    // capacityTo: "",
    mileage: "",
    steering_wheel_side: "", //left or right
    drive_unit: "", // привод
    color: "",
    paymentType: "",
    crushState: "",
    descriptionText: "",
    sort: "",
    vehicle_purpose: "",
    key_words: "",
    manufacture_country: "",
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    trigger,
  } = useForm<IFilter>({ defaultValues });

  useEffect(() => {
    if (router.isReady) {
      for (let key in router.query) {
        if (router.query[key] !== "") {
          setValue(key as keyof IFilter, router.query[key] as string);
        }
      }
    }
  }, [router.isReady, router.query, setValue]);

  const onSubmit = (data: IFilter) => {
    let query: Partial<IFilter> = {};
    for (let key in data) {
      let elem = data[key as keyof IFilter];
      if (elem !== "") {
        query = { ...query, [key]: elem };
      } else if (elem === "" && query[key as keyof IFilter]) {
        query[key as keyof IFilter] = "";
      }
    }
    const url = {
      pathname: router.pathname,
      query,
    };
    router.push(url, undefined);
    setFiltersModalOpened(false);
    setPage(1);
  };

  const onReset = useCallback(() => {
    reset();
  }, []);

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
                          scrollHeight={
                            input.name === "sort" ? "400px" : "200px"
                          }
                        />
                      )}
                    />
                  ) : input.type === "range" ? (
                    <div className="flex gap-2 w-full items-center">
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
                    <div className="w-full">
                      <Controller
                        key={input.name}
                        name={input.name}
                        control={control}
                        render={({ field, fieldState }) => (
                          <>
                            <InputText
                              id={field.name}
                              placeholder={input.placeholder}
                              keyfilter={input.keyfilter}
                              className={`${
                                fieldState.invalid && "p-invalid"
                              } w-full`}
                              {...(field as any)}
                            />
                          </>
                        )}
                      />
                    </div>
                  )}
                  {input.floatingLabel && (
                    <label htmlFor={input.name}>{input.label}</label>
                  )}
                </span>
              </div>
            ))}
            <div className="flex w-full justify-center mt-6">
              <div
                onClick={onReset}
                className="max-w-[300px] h-10 w-full flex items-center justify-center bg-red-600 rounded-md text-white cursor-pointer hover:bg-red-500"
              >
                Очистить фильтр
              </div>
            </div>

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
