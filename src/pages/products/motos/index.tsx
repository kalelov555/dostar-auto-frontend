import { EmptyList } from "@/components/Product/EmptyLitst";
import ProductCard from "@/components/Product/ProductCard";
import ProductPageFilters from "@/components/Product/ProductPageFilters";
import ProductsSkeleton from "@/components/Product/ProductsSkeleton";
import Pagination from "@/components/shared/Pagination";
import { busesInput, motoInputs } from "@/helpers/filters";
import { isFavoriteVehicle } from "@/helpers/functions";
import { showErrorNotification } from "@/helpers/notifications";
import { useAuth } from "@/hooks/useAuth";
import { useGetFavorites } from "@/hooks/useFavorites";
import { ICarsResponse } from "@/interfaces/car";
import DefaultLayout from "@/layouts/DefaultLayout";
import { fetchMotosByFilters } from "@/services/api/modules/moto";
import { pageAtom } from "@/store/page";
import { tokenStorage } from "@/store/token";
import { AxiosError } from "axios";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const ProductMotosPage = () => {
  const router = useRouter();
  const [token, _] = useAtom(tokenStorage);
  const [page, setPage] = useAtom(pageAtom);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const [motosResponse, setMotosResponse] = useState<ICarsResponse | null>(
    null
  );

  const {
    data: favoritesData,
    isLoading: isLoadingFavorites,
    error,
    isError,
  } = useGetFavorites({
    params: { view: "with_vehicle", vehicle_type: "moto" },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const fetch = useCallback(async () => {
    try {
      const response = await fetchMotosByFilters({
        ...router.query,
        page,
      });
      setMotosResponse(response);
    } catch (err) {
      if (err instanceof AxiosError) showErrorNotification(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, router.query]);

  useEffect(() => {
    setLoading(true);
    if (router.isReady) fetch();
  }, [router.query, page, fetch, router.isReady, isLoadingFavorites]);
  return (
    <DefaultLayout>
      <ProductPageFilters dataInputs={motoInputs} filtersLabel="Мото" />
      <div className="mt-10 pb-10 flex flex-col gap-3">
        {loading || isLoadingFavorites ? (
          <ProductsSkeleton />
        ) : (
          <>
            {!motosResponse?.data.length ? (
              <EmptyList />
            ) : (
              <>
                {motosResponse?.data.map((truck) => (
                  <ProductCard
                    authorized={!!auth.user}
                    product={truck}
                    key={truck.id}
                    type="motos"
                    isFavorite={isFavoriteVehicle(
                      truck.id,
                      favoritesData?.data
                    )}
                  />
                ))}
                {motosResponse?.data.length && (
                  <Pagination
                    totalPages={motosResponse?.meta.total_pages}
                    page={page}
                    setPage={setPage}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </DefaultLayout>
  );
};

export default ProductMotosPage;
