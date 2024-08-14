import { useAuth } from "@/hooks/useAuth";
import DefaultLayout from "@/layouts/DefaultLayout";
import { useRouter } from "next/router";
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";

const LabeledText = ({
  label,
  text,
}: {
  label: string;
  text: string | undefined;
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-xs font-bold">{label}</label>
      <p>{text}</p>
    </div>
  );
};

const ProfilePage = () => {
  const { user, isLoading, isError, isSuccess, error } = useAuth();
  const toast = useRef<Toast>(null);
  const router = useRouter();

  const showError = () => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: String(error?.response?.data),
      life: 3000,
    });
  };

  useEffect(() => {
    if (isError) {
      showError();
      router.push("/login");
    }
  }, [isError]);

  return (
    <DefaultLayout>
      <div className="min-h-screen">
        {(isLoading || isError) && (
          <div className="min-h-screen flex items-center justify-center">
            <i
              className="pi pi-spin pi-spinner text-primary"
              style={{ fontSize: "4rem" }}
            ></i>
          </div>
        )}
        <div className="flex flex-col gap-3">
          <h2 className="mt-2 px-3">Персональная информация</h2>
          <div className="bg-white p-3">
            <LabeledText label="Почта:" text={user?.data.email} />
          </div>
          <div className="bg-white p-3 flex flex-col gap-3">
            <div>
              <LabeledText
                label="Полное имя:"
                text={`${user?.data?.first_name} ${user?.data?.last_name}`}
              />
            </div>
            <div>
              <LabeledText label="Город:" text={user?.data.city_name} />
            </div>
            <div>
              <LabeledText label="Номер:" text={user?.data.phone as string} />
            </div>
          </div>
        </div>
      </div>
      <Toast ref={toast} />
    </DefaultLayout>
  );
};

export default ProfilePage;
