import HomePageMenu from "@/components/HomePageMenu/HomePageMenu";
import ProductCard from "@/components/Product/ProductCard";
import ProductsSkeleton from "@/components/Product/ProductsSkeleton";
import { isFavoriteVehicle } from "@/helpers/functions";
import { showErrorNotification } from "@/helpers/notifications";
import { useAuth } from "@/hooks/useAuth";
import { useGetFavorites } from "@/hooks/useFavorites";
import DefaultLayout from "@/layouts/DefaultLayout";
import { fetchAllCars } from "@/services/api/modules/cars";
import { tokenStorage } from "@/store/token";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const router = useRouter();
  const auth = useAuth();
  const [token, _] = useAtom(tokenStorage);

  const { ref, inView } = useInView();

  const { data, status, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["items"],
      queryFn: ({ pageParam }) =>
        fetchAllCars({
          pageParam,
          restParams: { ...router.query },
        }).catch((err) => {
          showErrorNotification(err.response.message || err.message);
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
    params: { view: "with_vehicle", vehicle_type: "car" },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
    if (isError) {
      showErrorNotification(error.message);
    }
  }, [fetchNextPage, inView, isFetchingNextPage, isLoadingFavorites]);

  const loading = isFetchingNextPage || isLoading || isLoadingFavorites;

  return (
    <DefaultLayout>
      <HomePageMenu />
      {!(isLoading || isLoadingFavorites) && (
        <div>
          <div className="mt-4 flex flex-col gap-3">
            {data?.pages.map((pageItems) =>
              pageItems?.data.map((product) => (
                <ProductCard
                  authorized={auth.user?.data}
                  key={product.id}
                  product={product}
                  type="cars"
                  isFavorite={isFavoriteVehicle(
                    product.id,
                    favoritesData?.data
                  )}
                />
              ))
            )}
          </div>
        </div>
      )}
      {loading && <ProductsSkeleton />}
      <div ref={ref}></div>
    </DefaultLayout>
  );
}
