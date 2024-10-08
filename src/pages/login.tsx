import InputErrorText from "@/components/shared/InputErrorText";
import { loginInputs } from "@/helpers/auth";
import {
  showErrorNotification,
  showSuccessNotification,
} from "@/helpers/notifications";
import { ILoginDTO } from "@/interfaces/auth/auth.dto";
import AuthPagesLayout from "@/layouts/AuthPagesLayout";
import { authLogin } from "@/services/api/modules/auth";
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
import { classNames } from "primereact/utils";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Head from "next/head";

const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Это поле обязательное")
    .regex(
      /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
      "Неправильный формат телефона"
    ),
  password: z.string().min(1, "Это поле обязательное"),
});

const LoginPage = () => {
  const router = useRouter();
  const [_, setToken] = useAtom(tokenStorage);
  const { next: nextPage } = router.query;

  const { mutate, isPending } = useMutation({
    mutationFn: authLogin,
    onSuccess: (res: AxiosResponse) => {
      let bearerToken: string = res.headers.authorization;
      setToken(bearerToken.replace("Bearer ", ""));
      showSuccessNotification();
      router.push((nextPage as string) || "/");
    },
    onError: (err: AxiosError) => {
      showErrorNotification(
        err.response?.data ? String(err.response?.data) : err.message
      );
      localStorage.removeItem("token");
    },
  });

  const defaultValues: ILoginDTO = {
    email: "",
    password: "",
  };
  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (formValues: ILoginDTO) => {
    mutate(formValues);
  };

  return (
    <AuthPagesLayout>
      <Head>
        <title>Dostar-auto - Логин</title>
      </Head>
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
                        {...field}
                        toggleMask
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        feedback={false}
                        placeholder={input.placeholder}
                        autoComplete="true"
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
            href={`/signup${nextPage ? `?next=${nextPage}` : ""}`}
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
