import ProductCard from "@/components/Product/ProductCard";
import LoadingScreen from "@/components/shared/LoadingScrenn";
import { showErrorNotification } from "@/helpers/notifications";
import { useGetFavorites } from "@/hooks/useFavorites";
import DefaultLayout from "@/layouts/DefaultLayout";
import { tokenStorage } from "@/store/token";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

const FavoritesPage = () => {
  const [token, _] = useAtom(tokenStorage);
  const router = useRouter();

  const auth = useAuth();

  const type = (
    str: string
  ): "cars" | "buses" | "trucks" | "motos" | "spec_technics" => {
    if (str === "truck") return "trucks";
    else if (str === "bus") return "buses";
    else if (str === "car") return "cars";
    else if (str === "moto") return "motos";
    else return "spec_technics";
  };

  const { data, isLoading, isSuccess, error, isError, isRefetching } =
    useGetFavorites({
      params: { view: "with_vehicle" },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  return (
    <DefaultLayout>
      <Head>
        <title>Избранные модели</title>
      </Head>
      <div className="h-10 bg-primary flex items-center justify-between text-white text-sm px-4 fixed top-[44px] max-w-[768px] w-full">
        <p>Избранное</p>
      </div>

      <div className="mt-10">
        {isLoading || isRefetching || auth.isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            {auth.isError && (
              <div className="min-h-[70vh] flex items-center justify-center w-full">
                <h2 className="w-full text-center">
                  <Link className="text-primary underline" href="/login">
                    Авторизуйтесь
                  </Link>{" "}
                  для просмотра
                </h2>
              </div>
            )}
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
          </>
        )}
      </div>
    </DefaultLayout>
  );
};

export default FavoritesPage;
