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
import { fetchTrucksByFilters } from "@/services/api/modules/trucks";
import { pageAtom } from "@/store/page";
import { tokenStorage } from "@/store/token";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const ProductTrucksPage = () => {
  const router = useRouter();
  const [token, _] = useAtom(tokenStorage);
  const [page, setPage] = useAtom(pageAtom);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const [trucksResponse, setTrucksResponse] = useState<IBusesResponse | null>(
    null
  );

  const {
    data: favoritesData,
    isLoading: isLoadingFavorites,
    error,
    isError,
  } = useGetFavorites({
    params: { view: "with_vehicle", vehicle_type: "CommercialVehicle" },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const fetch = useCallback(async () => {
    try {
      const response = await fetchTrucksByFilters({
        ...router.query,
        page,
      });
      setTrucksResponse(response);
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
      alert("something went wrong on favorites - trucks");
    }
  }, [router.query, page, fetch, router.isReady, isLoadingFavorites]);
  return (
    <DefaultLayout>
      <ProductPageFilters dataInputs={busesInput} filtersLabel="Грузовики" />
      <div className="mt-10 flex flex-col gap-3">
        {loading ? (
          <ProductsSkeleton />
        ) : (
          <>
            {!trucksResponse?.data.length ? (
              <EmptyList />
            ) : (
              <>
                {trucksResponse?.data.map((truck) => (
                  <ProductCard
                    authorized={!!auth.user}
                    product={truck}
                    key={truck.id}
                    type="trucks"
                    isFavorite={isFavoriteVehicle(
                      truck.id,
                      favoritesData?.data
                    )}
                  />
                ))}
                {trucksResponse?.data.length && (
                  <Pagination
                    totalPages={trucksResponse?.meta.total_pages}
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

export default ProductTrucksPage;
