import DefaultLayout from "@/layouts/DefaultLayout";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ProductsSkeleton from "@/components/Product/ProductsSkeleton";
import ProductCard from "@/components/Product/ProductCard";
import HomePageMenu from "@/components/HomePageMenu/HomePageMenu";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Toast } from "primereact/toast";
import { useAuth } from "@/hooks/useAuth";
import { fetchAllCars } from "@/services/api/modules/cars";
import { useInView } from "react-intersection-observer";
import { useGetFavorites } from "@/hooks/useFavorites";
import { useAtom } from "jotai";
import { tokenStorage } from "@/store/token";
import { isFavoriteVehicle } from "@/helpers/functions";

export default function Home() {
  const router = useRouter();
  const auth = useAuth();
  const [token, _] = useAtom(tokenStorage);

  const toast = useRef<Toast>(null);

  const { ref, inView } = useInView();

  const { data, status, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["items"],
      queryFn: ({ pageParam }) =>
        fetchAllCars({
          pageParam,
          restParams: { ...router.query },
        }).catch((err) => {
          toast.current?.show({
            severity: "error",
            summary: err.response.message,
          });
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        const maxPages = lastPage?.totalPages || 1;
        const nextPage = allPages.length;
        return nextPage < maxPages ? nextPage : undefined;
      },
    });

  const {
    data: favoritesData,
    isLoading: isLoadingFavorites,
    error,
    isError,
  } = useGetFavorites({
    params: { view: "with_vehicle", vehicle_type: "Car" },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
    if (isError) {
      toast.current?.show({ severity: "error", detail: error.message });
    }
  }, [fetchNextPage, inView, isFetchingNextPage, isLoadingFavorites]);

  return (
    <DefaultLayout>
      <HomePageMenu />
      <Toast ref={toast} />
      <div>
        <div className="mt-4 flex flex-col gap-3">
          {data?.pages.map((pageItems) =>
            pageItems?.data.map((product) => (
              <ProductCard
                authorized={auth.user?.data}
                key={product.id}
                product={product}
                type="cars"
                isFavorite={isFavoriteVehicle(product.id, favoritesData?.data)}
              />
            ))
          )}
        </div>
      </div>
      {(isFetchingNextPage || status === "pending") && <ProductsSkeleton />}
      <div ref={ref}></div>
    </DefaultLayout>
  );
}
