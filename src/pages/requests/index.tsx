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

  useEffect(() => {
    if (isError) {
      showErrorNotification(error.message);
    }
  }, [isLoading, isError]);

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
      <div className="h-10 bg-primary flex items-center justify-between text-white text-sm px-4 fixed top-[44px] max-w-[768px] w-full  z-[1500]">
        <p>Мои запросы</p>
      </div>

      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="mt-16 flex flex-col gap-8">
          <ConfirmDialog acceptLabel="Да" rejectLabel="Нет" draggable={false} />
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
