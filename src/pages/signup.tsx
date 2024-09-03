import AuthPagesLayout from "@/layouts/AuthPagesLayout";
import Link from "next/link";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { InputMask } from "primereact/inputmask";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputErrorText from "@/components/shared/InputErrorText";
import { useMutation } from "@tanstack/react-query";
import api from "@/services/api/client";
import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import { tokenStorage } from "@/store/token";
import { IRegisterDTO } from "@/interfaces/auth/auth.dto";
import { registerInputs } from "@/helpers/auth";
import { useRouter } from "next/router";
import {
  showErrorNotification,
  showSuccessNotification,
} from "@/helpers/notifications";

const RegisterSchema = z.object({
  first_name: z.string().min(1, "Это поле обязательное"),
  last_name: z.string().min(1, "Это поле обязательное"),
  password: z.string().min(1, "Это поле обязательное"),
  email: z
    .string()
    .min(1, "Это поле обязательное")
    .regex(
      /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
      "Неправильный формат телефона"
    ),
});

const RegisterPage = () => {
  const [_, setToken] = useAtom(tokenStorage);
  const router = useRouter();
  const defaultValues: IRegisterDTO = {
    password: "",
    email: "",
    // tel: "",
    first_name: "",
    last_name: "",
  };

  const { control, reset, watch, handleSubmit } = useForm({
    defaultValues,
    resolver: zodResolver(RegisterSchema),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: (data: IRegisterDTO) => {
      return api.post("/signup", { user: data });
    },
    onSuccess: async (res: AxiosResponse) => {
      let bearerToken: string = res.headers.authorization;
      setToken(bearerToken.replace("Bearer ", ""));
      showSuccessNotification();
      router.push("/");
    },
    onError: (err: AxiosError) => {
      localStorage.removeItem("token");
      showErrorNotification(
        err.response?.data ? String(err.response?.data) : "Что то пошло не так!"
      );
    },
  });

  const onSubmit = (data: IRegisterDTO) => {
    mutate(data);
  };

  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );

  return (
    <AuthPagesLayout>
      <form
        className="flex flex-col max-w-sm w-full p-6 sm:p-5 gap-3 bg-white rounded-md shadow-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center">Зарегестрироваться</h1>
        {registerInputs.map((input) => (
          <div key={input.name} className="field w-full">
            {input.type === "text" ? (
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
            ) : input.type === "password" ? (
              <div className="w-full">
                <Controller
                  key={input.name}
                  name={input.name}
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <Password
                        id={field.name}
                        toggleMask
                        className={`${
                          fieldState.invalid && "p-invalid"
                        } w-full`}
                        {...(field as any)}
                        feedback={true}
                        placeholder={input.placeholder}
                        header={passwordHeader}
                        footer={passwordFooter}
                      />
                      <InputErrorText
                        msg={fieldState.error?.message as string}
                      />
                    </>
                  )}
                />
              </div>
            ) : input.type === "tel" ? (
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
                        className={`w-full `}
                        mask="+7(999)-999-99-99"
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
              <></>
            )}
          </div>
        ))}

        <div className="text-center">
          <Link
            className="text-xs text-primary hover:brightness-75"
            href="/login"
          >
            Есть аккаунт?
          </Link>
        </div>

        <div>
          <Button
            severity="info"
            className="w-full h-12"
            label="Регистрация"
            type="submit"
            loading={isPending}
          />
        </div>
      </form>
    </AuthPagesLayout>
  );
};

export default RegisterPage;
