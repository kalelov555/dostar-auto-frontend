import InputErrorText from "@/components/shared/InputErrorText";
import LoadingScreen from "@/components/shared/LoadingScrenn";
import {
  showErrorNotification,
  showSuccessNotification,
} from "@/helpers/notifications";
import { dataInputs, transformData } from "@/helpers/request";
import { useAuth } from "@/hooks/useAuth";
import { IMark } from "@/interfaces/marks";
import { IRequestData, IRequestDTO } from "@/interfaces/requests";
import DefaultLayout from "@/layouts/DefaultLayout";
import api from "@/services/api/client";
import { createRequest } from "@/services/api/modules/request";
import { tokenStorage } from "@/store/token";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { SelectButton } from "primereact/selectbutton";
import { useCallback, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const RequestSchema = z
  .object({
    first_name: z.string().min(1, "Это поле обязательное"),
    last_name: z.string().min(1, "Это поле обязательное"),
    phone: z
      .string({
        required_error: "Это поле обязательное",
        invalid_type_error: "Неправильный формат телефона",
      })
      .min(16, "Это поле обязательное")
      .regex(/^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/, "Неправильный формат телефона")
      .transform((value) => (value === null ? "" : value)),
    vehicle_type: z
      .string({
        required_error: "Это поле обязательное",
        invalid_type_error: "Это поле обязательное",
      })
      .min(1, "Это поле обязательное")
      .transform((value) => (value === null ? "" : value)),
    manufacturer_id: z.union([z.string(), z.number()]),
    vehicle_model_id: z.union([z.string(), z.number()]),
    model: z.string(),
    budget: z.string().min(1, "Это поле обязательное"),
    engine_capacity: z.string(),
    manufacture_year: z
      .string()
      .min(1, "Это поле обязательное")
      .regex(/^\d{4}$/, "Неправильный формат"),
    description: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.vehicle_type === "car" && !data.manufacturer_id) {
      ctx.addIssue({
        path: ["manufacturer_id"],
        message: "Марка обязательна при выборе машины",
        code: z.ZodIssueCode.custom,
      });
    }
    if (data.vehicle_type === "car" && !data.vehicle_model_id) {
      ctx.addIssue({
        path: ["vehicle_model_id"],
        message: "Модель обязательна при выборе машины",
        code: z.ZodIssueCode.custom,
      });
    }
  });

const CreateRequestPage = () => {
  const router = useRouter();
  const { user, isLoading, isError, error } = useAuth();
  const [token, _] = useAtom(tokenStorage);
  const defaultValues: IRequestData = {
    first_name: "",
    last_name: "",
    phone: "",
    manufacturer_id: "",
    model: "",
    budget: "",
    manufacture_year: "",
    description: "",
    vehicle_model_id: "",
    vehicle_type: "car",
    engine_capacity: "",
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
  } = useForm<IRequestData>({
    defaultValues,
    resolver: zodResolver(RequestSchema),
  });

  const type = watch("vehicle_type");
  const manufacturer_id = watch("manufacturer_id");

  useEffect(() => {
    if (isError) {
      router.replace("/login");
    }

    if (user) {
      setValue("first_name", user.data.first_name);
      setValue("last_name", user.data.last_name);
      if (user.data.phone) setValue("phone", user.data.phone);
    }
  }, [isLoading]);

  useEffect(() => {
    setValue("vehicle_model_id", "");
    setValue("model", "");
    setValue("manufacturer_id", "");
  }, [type]);

  const fetchManufactures = useCallback(async () => {
    if (router.isReady && type) {
      try {
        const response = await api.get(`/manufacturers?vehicle_type=${type}`);
        return response.data;
      } catch (err) {
        if (err instanceof AxiosError) showErrorNotification(err.message);
        return err;
      }
    }
  }, [type]);

  const { data: manufacturesData, isLoading: isLoadingManufactures } = useQuery<
    { data: IMark[] },
    AxiosError
  >({
    queryKey: ["manufactures", type],
    queryFn: fetchManufactures,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const fetchModels = useCallback(async () => {
    if (router.isReady && manufacturer_id && type === "car") {
      try {
        const response = await api.get(
          `/manufacturers/${manufacturer_id}/vehicle_models`
        );
        return response.data;
      } catch (err) {
        if (err instanceof AxiosError) showErrorNotification(err.message);
        return err;
      }
    }
  }, [manufacturer_id]);

  const {
    status,
    isLoading: isLoadingModels,
    data: modelsData,
  } = useQuery({
    queryKey: ["models", manufacturer_id],
    queryFn: fetchModels,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!manufacturer_id,
  });

  const {
    mutate,
    isPending,
    error: submitError,
  } = useMutation({
    mutationFn: async (data: IRequestDTO) => {
      return createRequest({ ...data }, token);
    },
    onSuccess: (res: AxiosResponse) => {
      showSuccessNotification("Запрос создан успешно!");
      router.push("/requests");
    },
    onError: (err: AxiosError) => {
      showErrorNotification(
        err.response?.data ? String(err.response?.data) : err.message
      );
    },
  });

  const onSubmit = (data: IRequestData) => {
    const payload = transformData(data);
    mutate(payload as any);
  };

  return (
    <DefaultLayout>
      <div className="h-10 bg-primary flex items-center justify-between text-white text-sm px-4 fixed top-[44px] max-w-[768px] w-full  z-[1500]">
        <p>Форма для запроса</p>
      </div>
      {!(isLoading && isLoadingManufactures) ? (
        <div className="mt-8 py-2">
          <form
            className="bg-white rounded-xl p-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {dataInputs.map((input) => (
              <div
                key={input.name}
                className={`field ${input.floatingLabel ? "mt-8" : "mt-1"} ${
                  input.name === "model" && type === "car"
                    ? "hidden"
                    : input.name === "vehicle_model_id" && type !== "car"
                    ? "hidden"
                    : ""
                }`}
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
                      render={({ field, fieldState }) => (
                        <>
                          <Dropdown
                            id={field.name}
                            value={field.value}
                            onChange={(e) => field.onChange(e.value)}
                            options={
                              input.getOptions
                                ? input.name === "manufacturer_id"
                                  ? input.getOptions(manufacturesData?.data)
                                  : input.name === "vehicle_model_id"
                                  ? input.getOptions(modelsData?.data)
                                  : input.options
                                : []
                            }
                            optionLabel="name"
                            optionValue="value"
                            placeholder={input.placeholder}
                            className="w-full rounded-none"
                            checkmark={true}
                            name={input.name}
                            scrollHeight={"300px"}
                            loading={
                              (input.name === "manufacturer_id" &&
                                isLoadingManufactures) ||
                              (input.name === "vehicle_model_id" &&
                                isLoadingModels)
                            }
                            disabled={
                              isLoadingManufactures ||
                              isLoadingModels ||
                              (input.name === "vehicle_model_id" &&
                                !manufacturer_id)
                            }
                            filter
                            emptyFilterMessage="Ничего не найдено"
                            filterClearIcon
                            filterPlaceholder="Поиск..."
                          />
                          <InputErrorText
                            msg={fieldState.error?.message as string}
                          />
                        </>
                      )}
                    />
                  ) : input.type === "phone" ? (
                    <div className="w-full">
                      <Controller
                        key={input.name}
                        name={input.name}
                        control={control}
                        render={({ field, fieldState }) => (
                          <>
                            <InputMask
                              id={field.name}
                              placeholder={input.placeholder}
                              className={`w-full`}
                              mask="+7(999)-999-99-99"
                              autoClear={false}
                              name={input.name}
                              {...(field as any)}
                              value={user?.data.phone || ""}
                            />
                            <InputErrorText
                              msg={fieldState.error?.message as string}
                            />
                          </>
                        )}
                      />
                    </div>
                  ) : input.type === "selectDefault" ? (
                    <div className="w-full ">
                      <Controller
                        key={input.name}
                        name={input.name}
                        control={control}
                        render={({ field, fieldState }) => (
                          <>
                            <SelectButton
                              optionLabel="name"
                              optionValue="value"
                              options={input.options}
                              className={`w-full grid grid-cols-2 sm:grid-cols-5 gap-1 ${
                                fieldState.invalid && "p-invalid"
                              }`}
                              {...(field as any)}
                            />
                            <InputErrorText
                              msg={fieldState.error?.message as string}
                            />
                          </>
                        )}
                      />
                    </div>
                  ) : input.type === "textarea" ? (
                    <div className="w-full">
                      <Controller
                        key={input.name}
                        name={input.name}
                        control={control}
                        render={({ field, fieldState }) => (
                          <>
                            <InputTextarea
                              id={field.name}
                              placeholder={input.placeholder}
                              name={input.name}
                              className={`${
                                fieldState.invalid && "p-invalid"
                              } w-full`}
                              {...(field as any)}
                            />
                            <InputErrorText
                              msg={fieldState.error?.message as string}
                            />
                          </>
                        )}
                      />
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
                              name={input.name}
                              className={`${
                                fieldState.invalid && "p-invalid"
                              } w-full`}
                              {...(field as any)}
                            />
                            <InputErrorText
                              msg={fieldState.error?.message as string}
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

            <div className="mt-8 max-w-[600px] w-full mx-auto self-center">
              <Button
                severity="info"
                className="w-full h-12 shadow-[0_8px_25px_0_rgba(42,129,221,.6)]"
                label="Создать запрос"
                type="submit"
                loading={isPending}
              />
            </div>
          </form>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </DefaultLayout>
  );
};

export default CreateRequestPage;
