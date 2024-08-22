import ProductCard from "@/components/Product/ProductCard";
import ProductPageFilters from "@/components/Product/ProductPageFilters";
import ProductsSkeleton from "@/components/Product/ProductsSkeleton";
import Pagination from "@/components/shared/Pagination";
import { useAuth } from "@/hooks/useAuth";
import { ICarsResponse } from "@/interfaces/car";
import DefaultLayout from "@/layouts/DefaultLayout";
import { fetchCarsByFilters } from "@/services/api/modules/cars";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { carsInputs } from "@/helpers/filters";
import { useAtom } from "jotai";
import { pageAtom } from "@/store/page";
import { EmptyList } from "@/components/Product/EmptyLitst";
import { useGetFavorites } from "@/hooks/useFavorites";
import { tokenStorage } from "@/store/token";
import { isFavoriteVehicle } from "@/helpers/functions";

const ProductCarsPage = () => {
  const [token, _] = useAtom(tokenStorage);
  const router = useRouter();
  const [page, setPage] = useAtom(pageAtom);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const [carsResponse, setCarsResponse] = useState<ICarsResponse | null>(null);

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

  const fetch = useCallback(async () => {
    try {
      const response = await fetchCarsByFilters({ ...router.query, page });
      setCarsResponse(response);
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
      <ProductPageFilters dataInputs={carsInputs} filtersLabel="Легковые" />
      <div className="mt-10 flex flex-col gap-3">
        {loading ? (
          <ProductsSkeleton />
        ) : (
          <>
            {!carsResponse?.data.length ? (
              <EmptyList />
            ) : (
              <>
                {carsResponse?.data.map((car) => (
                  <ProductCard
                    authorized={!!auth.user}
                    product={car}
                    key={car.id}
                    type="cars"
                    isFavorite={isFavoriteVehicle(car.id, favoritesData?.data)}
                  />
                ))}
                {carsResponse?.data.length && (
                  <Pagination
                    totalPages={carsResponse?.meta.total_pages}
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

export default ProductCarsPage;
