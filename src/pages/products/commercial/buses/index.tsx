import { EmptyList } from "@/components/Product/EmptyLitst";
import ProductCard from "@/components/Product/ProductCard";
import ProductPageFilters from "@/components/Product/ProductPageFilters";
import ProductsSkeleton from "@/components/Product/ProductsSkeleton";
import Pagination from "@/components/shared/Pagination";
import { busesInput } from "@/helpers/filters";
import { isFavoriteVehicle } from "@/helpers/functions";
import { useAuth } from "@/hooks/useAuth";
import { useGetFavorites } from "@/hooks/useFavorites";
import { IBusesResponse } from "@/interfaces/bus";
import DefaultLayout from "@/layouts/DefaultLayout";
import { fetchBusesByFilters } from "@/services/api/modules/buses";
import { pageAtom } from "@/store/page";
import { tokenStorage } from "@/store/token";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const ProductBusesPage = () => {
  const router = useRouter();
  const [token, _] = useAtom(tokenStorage);
  const [page, setPage] = useAtom(pageAtom);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const [busesResponse, setBusesResponse] = useState<IBusesResponse | null>(
    null
  );

  const {
    data: favoritesData,
    isLoading: isLoadingFavorites,
    error,
    isError,
  } = useGetFavorites({
    params: { view: "with_vehicle", vehicle_type: "bus" },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const fetch = useCallback(async () => {
    try {
      const response = await fetchBusesByFilters({
        ...router.query,
        page,
      });
      setBusesResponse(response);
    } catch (err) {
      alert(JSON.stringify(err));
    } finally {
      setLoading(false);
    }
  }, [page, router.query]);

  useEffect(() => {
    setLoading(true);
    if (router.isReady) fetch();
    if (isError) {
      alert("something went wrong on favorites - buses");
    }
  }, [router.query, page, fetch, router.isReady, isLoadingFavorites]);
  return (
    <DefaultLayout>
      <ProductPageFilters dataInputs={busesInput} filtersLabel="Автобусы" />
      <div className="mt-10 flex flex-col gap-3">
        {loading || isLoadingFavorites ? (
          <ProductsSkeleton />
        ) : (
          <>
            {!busesResponse?.data.length ? (
              <EmptyList />
            ) : (
              <>
                {busesResponse?.data.map((truck) => (
                  <ProductCard
                    authorized={!!auth.user}
                    product={truck}
                    key={truck.id}
                    type="buses"
                    isFavorite={isFavoriteVehicle(
                      truck.id,
                      favoritesData?.data
                    )}
                  />
                ))}
                {busesResponse?.data.length && (
                  <Pagination
                    totalPages={busesResponse?.meta.total_pages}
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

export default ProductBusesPage;
