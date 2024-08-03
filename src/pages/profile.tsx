import { useAuth } from "@/hooks/useAuth";
import DefaultLayout from "@/layouts/DefaultLayout";
import { useRouter } from "next/router";
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";

const ProfilePage = () => {
  const { data, isLoading, isError, isSuccess, error } = useAuth();
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
      <div className="min-h-screen flex items-center justify-center">
        {/* {isSuccess && <h1>{JSON.stringify(data)}</h1>} */}
        {(isLoading || isError) && (
          <i
            className="pi pi-spin pi-spinner text-primary"
            style={{ fontSize: "4rem" }}
          ></i>
        )}
      </div>
      <Toast ref={toast} />
    </DefaultLayout>
  );
};

export default ProfilePage;
