import ExpandableText from "@/components/shared/ExpandableText";
import LoadingScreen from "@/components/shared/LoadingScrenn";
import { formatPrice } from "@/helpers/functions";
import { showErrorNotification } from "@/helpers/notifications";
import { useDeleteRequest, useRequests } from "@/hooks/useRequests";
import { IVehicleType } from "@/interfaces";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Divider } from "primereact/divider";
import { Tag } from "primereact/tag";
import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import Subheader from "@/components/Header/Subheader";

const carName = (type: IVehicleType) => {
  if (type === "car") return "Машина";
  else if (type === "bus") return "Автобус";
  else if (type === "moto") return "Мото";
  else if (type === "spectechnic") return "Спец. Техника";
  else if (type === "truck") return "Грузовик";
};

const RequestsPage = () => {
  const { data, isLoading, isError, refetch, error } = useRequests();
  const { mutateAsync, isPending, isError: isErrorDelete } = useDeleteRequest();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isError) {
      showErrorNotification(error.message);
    }
    if (auth.isError) {
      router.replace("/login");
    }
  }, [isLoading, isError, auth.isLoading]);

  const accept = async (id: number) => {
    await mutateAsync(id);
    refetch();
  };

  const confirm = (id: number) => {
    confirmDialog({
      message: "Вы точно хотите удалить этот запрос?",
      header: "Подтверждения удаления",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: () => accept(id),
    });
  };

  return (
    <DefaultLayout>
      <Head>
        <title>Мои запросы</title>
      </Head>
      <Subheader label="Мои запросы" />

      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="mt-16 flex flex-col gap-8">
          <ConfirmDialog acceptLabel="Да" rejectLabel="Нет" draggable={false} />
          {data?.data?.length === 0 && (
            <div className="min-h-[70vh] flex items-center justify-center">
              <div className="text-center">
                <h1>У вас нет активных запросов!</h1>
                <Button
                  onClick={() => router.push("/create")}
                  severity="info"
                  label="Создать запрос"
                />
              </div>
            </div>
          )}
          {data?.data.map((item) => (
            <div
              className="rounded-xl bg-white p-3 relative flex flex-col"
              key={item.id}
            >
              <Tag
                className="absolute right-4 -top-4"
                value={carName(item.vehicle_type)}
                severity="success"
              />
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold text-primary">
                  {!item.model
                    ? `${item.manufacturer_name || ""} ${
                        item.vehicle_model_name || ""
                      }`
                    : `${item.manufacturer_name || ""} ${item.model || ""}`}
                </p>
                {item.engine_capacity && (
                  <Tag value={`${item.engine_capacity} л.`} severity="info" />
                )}
              </div>
              <div>
                <p>{formatPrice(item.budget)}</p>
              </div>
              <div>
                <p className="underline text-sm text-gray-600">
                  {item.manufacture_year} года
                </p>
              </div>
              <Divider className="m-0 my-3" />
              {item.description && (
                <div>
                  <ExpandableText text={item.description} />
                </div>
              )}

              <Button
                className="h-8 p-0 gap-0 text-xs px-5 py-3 ml-auto mt-4"
                onClick={() => confirm(item.id)}
                // icon="pi pi-times text-xs m-0 pr-2"
                label="Удалить"
                severity="danger"
                size="small"
                text
                outlined
              ></Button>
            </div>
          ))}
        </div>
      )}
      <div></div>
    </DefaultLayout>
  );
};

export default RequestsPage;
