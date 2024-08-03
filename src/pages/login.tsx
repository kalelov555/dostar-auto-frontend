import InputErrorText from "@/components/shared/InputErrorText";
import { loginInputs } from "@/helpers/auth";
import { ILoginDTO } from "@/interfaces/auth/auth.dto";
import AuthPagesLayout from "@/layouts/AuthPagesLayout";
import api from "@/services/api/client";
import { tokenStorage } from "@/store/token";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import React, { useCallback, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

const LoginPage = () => {
  const toast = useRef<Toast>(null);
  const router = useRouter();
  const [_, setToken] = useAtom(tokenStorage);

  const showSuccess = useCallback(() => {
    toast.current?.show({
      severity: "success",
      summary: "Успешно!",
      life: 3000,
    });
  }, []);
  const showError = useCallback((msg: string) => {
    toast.current?.show({
      severity: "error",
      summary: "Что-то пошло не так!",
      detail: msg,
      life: 3000,
    });
  }, []);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ILoginDTO) => {
      return api.post("/login", { user: data });
    },
    onSuccess: (res: AxiosResponse) => {
      let bearerToken: string = res.headers.authorization;
      setToken(bearerToken.replace("Bearer ", ""));
      showSuccess();
      router.push("/");
    },
    onError: (err: AxiosError) => {
      showError(
        err.response?.data
          ? String(err.response?.data)
          : "Перепроверьте данные!"
      );
    },
  });

  const defaultValues: ILoginDTO = {
    email: "",
    password: "",
  };
  const { control, reset, watch, handleSubmit } = useForm({
    defaultValues,
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (formValues: ILoginDTO) => {
    mutate(formValues);
  };

  return (
    <AuthPagesLayout>
      <Toast ref={toast} />
      <form
        className="flex flex-col max-w-sm w-full p-6 sm:p-5 gap-3 bg-white rounded-md shadow-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center">Войти</h1>
        {loginInputs.map((input) => (
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
                        required
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
                        required
                        id={field.name}
                        {...field}
                        toggleMask
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        feedback={false}
                        placeholder={input.placeholder}
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
            href="/signup"
          >
            Создайте аккаунт
          </Link>
        </div>

        <div>
          <Button
            severity="info"
            className="w-full h-12"
            label="Логин"
            type="submit"
            loading={isPending}
          />
        </div>
      </form>
    </AuthPagesLayout>
  );
};

export default LoginPage;
