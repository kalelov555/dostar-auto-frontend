import LoadingScreen from "@/components/shared/LoadingScrenn";
import { showErrorNotification } from "@/helpers/notifications";
import { useAuth } from "@/hooks/useAuth";
import DefaultLayout from "@/layouts/DefaultLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
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
  const router = useRouter();

  useEffect(() => {
    if (isError) {
      showErrorNotification(error?.message as string);
      router.push("/login");
    }
  }, [isError]);

  return (
    <DefaultLayout>
      <div>
        <div className="h-10 bg-primary flex items-center justify-between text-white text-sm px-4 fixed top-[44px] max-w-[768px] w-full  z-[1500]">
          <p>Мой кабинет</p>
          <Link className="underline" href="/login">
            Выйти
          </Link>
        </div>
        {isLoading || isError ? (
          <LoadingScreen />
        ) : (
          <div className="min-h-screen flex flex-col gap-3 mt-10">
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

            <div className="bg-white p-3">
              <div className="flex flex-col">
                <label className="text-xs font-bold">Мои запросы</label>
                <Link href="/requests">
                  <div className="flex w-full justify-between items-center cursor-pointer">
                    <p>Посмотреть список</p>
                    <i className="pi pi-chevron-right text-xs"></i>
                  </div>
                </Link>
                <Button
                  className="mt-4 bg-primary hover:brightness-90"
                  label="Создать запрос"
                  onClick={() => {
                    router.push("/requests/create");
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default ProfilePage;
