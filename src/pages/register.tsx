import AuthPagesLayout from "@/layouts/AuthPagesLayout";
import { loginInputs } from "@/services/auth/login/helpers";
import { ILoginData } from "@/services/auth/login/interface";
import Link from "next/link";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { InputMask } from "primereact/inputmask";
import { registerInputs } from "@/services/auth/register/helpers";
import { IRegisterData } from "@/services/auth/register/interface";

const RegisterPage = () => {
  const defaultValues: IRegisterData = {
    password: "",
    username: "",
    tel: "",
    fullName: "",
    city: "",
  };

  const { control, reset, watch, handleSubmit } = useForm({ defaultValues });

  const onSubmit = (data: IRegisterData) => {
    alert(JSON.stringify(data));
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
                      feedback={true}
                      placeholder={input.placeholder}
                      header={passwordHeader}
                      footer={passwordFooter}
                    />
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
                    <InputMask
                      id={field.name}
                      placeholder={input.placeholder}
                      className="w-full"
                      mask="+7(999)-999-99-99"
                      {...(field as any)}
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
            href="/login"
          >
            Зайдите в систему
          </Link>
        </div>

        <div>
          <Button
            severity="info"
            className="w-full h-12"
            label="Регистрация"
            type="submit"
          />
        </div>
      </form>
    </AuthPagesLayout>
  );
};

export default RegisterPage;
