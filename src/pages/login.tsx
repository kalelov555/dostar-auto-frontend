import AuthPagesLayout from "@/layouts/AuthPagesLayout";
import api from "@/services/api/client";
import { loginInputs } from "@/services/auth/login/helpers";
import { ILoginData } from "@/services/auth/login/interface";
import { atom, useAtom } from "jotai";
import { atomWithMutation, atomWithQuery } from "jotai-tanstack-query";
import { loadable } from "jotai/utils";
import Link from "next/link";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const userAtom = atomWithMutation(() => ({
  mutationKey: ["auth"],
  mutationFn: async (data: ILoginData) => {
    try {
      const res = await api.post(`/auth/login`, { ...data, expiration: 1 });
      //   alert("SUCCESS");
      console.log(res.data);
      return res.data;
    } catch (err) {
      throw new Error("Error");
    }
  },
}));

const LoginPage = () => {
  const [{ data, isError, isPending, mutateAsync }] = useAtom(userAtom);
  const defaultValues: ILoginData = {
    username: "",
    password: "",
  };
  const { control, reset, watch, handleSubmit } = useForm({ defaultValues });

  const onSubmit = async (formValues: ILoginData) => {
    await mutateAsync(formValues);
  };

  return (
    <AuthPagesLayout>
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
                    <InputText
                      id={field.name}
                      placeholder={input.placeholder}
                      className="w-full"
                      {...(field as any)}
                    />
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
                    <Password
                      id={field.name}
                      {...field}
                      toggleMask
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                      feedback={false}
                      placeholder={input.placeholder}
                    />
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
            href="/register"
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
