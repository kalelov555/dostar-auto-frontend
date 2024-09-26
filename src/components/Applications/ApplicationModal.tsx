import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import InputErrorText from "../shared/InputErrorText";
import { InputMask } from "primereact/inputmask";
import { SelectButton } from "primereact/selectbutton";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import { dataInputs } from "@/helpers/applications";
import {
  IApplication,
  IApplicationData,
  IApplicationDto,
} from "@/interfaces/applications";
import { RadioButton } from "primereact/radiobutton";
import { useCreateApplication } from "@/hooks/useApplications";
import { IVehicleType } from "@/interfaces";
import { showErrorNotification } from "@/helpers/notifications";
import { AxiosError } from "axios";
import ApplicationConfirmationModal from "./ApplicationConfirmationModal";

const ApplicationSchema = z.object({
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
  application_type: z
    .string({
      required_error: "Это поле обязательное",
      invalid_type_error: "Это поле обязательное",
    })
    .min(1, "Это поле обязательное")
    .transform((value) => (value === null ? "" : value)),
  official_employee: z
    .string({
      required_error: "Это поле обязательное",
      invalid_type_error: "Это поле обязательное",
    })
    .min(1, "Это поле обязательное"),
  official_income: z
    .string({
      required_error: "Это поле обязательное",
      invalid_type_error: "Это поле обязательное",
    })
    .min(1, "Это поле обязательное"),
  unofficial_income: z
    .string({
      required_error: "Это поле обязательное",
      invalid_type_error: "Это поле обязательное",
    })
    .min(1, "Это поле обязательное"),
  current_credits_presence: z
    .string({
      required_error: "Это поле обязательное",
      invalid_type_error: "Это поле обязательное",
    })
    .min(1, "Это поле обязательное"),
  monthly_credit_payment: z
    .string({
      required_error: "Это поле обязательное",
      invalid_type_error: "Это поле обязательное",
    })
    .min(1, "Это поле обязательное"),
  overdue_credits_presence: z
    .string({
      required_error: "Это поле обязательное",
      invalid_type_error: "Это поле обязательное",
    })
    .min(1, "Это поле обязательное"),
  initial_fee: z
    .string({
      required_error: "Это поле обязательное",
      invalid_type_error: "Это поле обязательное",
    })
    .min(1, "Это поле обязательное"),
});

type Props = {
  id: number;
};

export default function ApplicationModal({ id }: Props) {
  const router = useRouter();
  const { user, isLoading, isError, error } = useAuth();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState<IVehicleType>("");
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const defaultValues: IApplicationData = {
    first_name: "",
    last_name: "",
    phone: "",
    official_employee: "",
    application_type: "lending",
    official_income: "",
    unofficial_income: "",
    current_credits_presence: "",
    monthly_credit_payment: "",
    overdue_credits_presence: "",
    initial_fee: 0,
  };

  const { control, handleSubmit, setValue, reset } = useForm<IApplicationData>({
    defaultValues,
    resolver: zodResolver(ApplicationSchema),
  });

  const {
    data: applicationData,
    mutateAsync,
    isPending,
  } = useCreateApplication();

  useEffect(() => {
    if (user) {
      setValue("first_name", user.data.first_name);
      setValue("last_name", user.data.last_name);
      if (user.data.phone) setValue("phone", user.data.phone);
    }
    if (router.isReady) {
      setType(
        router.pathname.includes("car")
          ? "car"
          : router.pathname.includes("truck")
          ? "truck"
          : router.pathname.includes("bus")
          ? "bus"
          : router.pathname.includes("spec_technic")
          ? "spectechnic"
          : router.pathname.includes("motos")
          ? "moto"
          : ""
      );
    }
  }, [isLoading, router, setValue, user, isPending]);

  const onSubmit = async (data: IApplicationData) => {
    const { phone, ...loan_application } = data;

    const payload: IApplicationDto = {
      loan_application,
      user: {
        phone,
      },
    };
    try {
      await mutateAsync({
        vehicle_type: type,
        id,
        body: payload,
      });
      setOpenConfirmModal(true);
      setVisible(false);
      reset();
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log("ERROR", err);
        showErrorNotification(
          err.response?.status === 422
            ? "Сумма оформления рассрочки должна быть больше 5 000 000 тг"
            : err.message
        );
      }
    }
  };

  function closeDialogs() {
    setOpenConfirmModal(false);
    setVisible(false);
  }

  return (
    <div className="bg-white py-4 text-center">
      <Button
        label="Подать заявку на кредит"
        icon="pi pi-credit-card"
        severity="info"
        onClick={() => setVisible(true)}
      />
      <ApplicationConfirmationModal
        open={openConfirmModal}
        setOpen={setOpenConfirmModal}
        application={applicationData?.data.data as IApplication}
        closeModals={closeDialogs}
      />
      <Dialog
        visible={visible}
        modal={true}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        className="overflow-scroll bg-white w-[90%] py-4 px-4 md:px-8 relative mt-8 max-w-[768px]"
        position="center"
        content={({ hide }) => (
          <div className="flex flex-col rounded-lg">
            <Button
              className="absolute right-2 top-2 w-4 h-4 z-[1500] p-4"
              icon="pi pi-times"
              outlined
              severity="danger"
              aria-label="Cancel"
              onClick={(e) => hide(e)}
            />
            <h1 className="text-center">Подать заявку на кредит</h1>
            <form
              className="flex flex-col gap-2 bg-white rounded-xl"
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
                        render={({ field, fieldState }) => (
                          <>
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
                              scrollHeight={"300px"}
                              loading={false}
                              disabled={false}
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
                    ) : input.type === "radio" ? (
                      <div className="w-full mt-1">
                        <Controller
                          key={input.name}
                          name={input.name}
                          control={control}
                          render={({ field, fieldState }) => (
                            <div className="flex flex-col">
                              <div className="flex flex-wrap gap-3">
                                {input.options?.map((option) => (
                                  <div
                                    key={option.value}
                                    className="flex align-items-center"
                                  >
                                    <RadioButton
                                      inputId={`${input.name}-${option.value}`}
                                      name={field.name}
                                      value={option.value}
                                      onChange={(e) => field.onChange(e.value)}
                                      checked={field.value === option.value}
                                      className={`${
                                        fieldState.invalid && "p-invalid"
                                      }`}
                                    />
                                    <label
                                      htmlFor={`${input.name}-${option.value}`}
                                      className="ml-2"
                                    >
                                      {option.name}
                                    </label>
                                  </div>
                                ))}
                              </div>
                              <InputErrorText
                                msg={fieldState.error?.message as string}
                              />
                            </div>
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
                  label="Подать заявку"
                  type="submit"
                  disabled={isPending}
                  loading={isPending}
                />
              </div>
            </form>
          </div>
        )}
      ></Dialog>
    </div>
  );
}
