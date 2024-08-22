import ProductCard from "@/components/Product/ProductCard";
import LoadingScreen from "@/components/shared/LoadingScrenn";
import { useGetFavorites } from "@/hooks/useFavorites";
import DefaultLayout from "@/layouts/DefaultLayout";
import { tokenStorage } from "@/store/token";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";

const FavoritesPage = () => {
  const [token, _] = useAtom(tokenStorage);
  const toast = useRef<Toast>(null);
  const router = useRouter();

  const type = (
    str: string
  ): "cars" | "buses" | "trucks" | "motos" | "spec_technics" => {
    if (str === "Truck") return "trucks";
    else if (str === "Bus") return "buses";
    else if (str === "Car") return "cars";
    else if (str === "Moto") return "motos";
    else return "spec_technics";
  };

  const { data, isLoading, isSuccess, error, isError, isRefetching } =
    useGetFavorites({
      params: { view: "with_vehicle" },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  useEffect(() => {
    if (isError) {
      toast.current?.show({ severity: "error", summary: error.message });
    }
  }, [isLoading, isError]);

  return (
    <DefaultLayout>
      <Toast ref={toast} />
      <div className="h-10 bg-primary flex items-center justify-between text-white text-sm px-4 fixed top-[44px] max-w-[768px] w-full">
        <p>Избранное</p>
      </div>

      <div className="mt-10">
        {isLoading || isRefetching ? (
          <LoadingScreen />
        ) : (
          <div className="flex flex-col gap-1">
            {data?.data.map((favorite) => (
              <ProductCard
                key={favorite.id}
                product={favorite.vehicle_data}
                type={type(favorite.vehicle_type)}
                authorized={isSuccess}
                isFavorite
              />
            ))}
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default FavoritesPage;
