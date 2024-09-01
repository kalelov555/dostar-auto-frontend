import { EmptyList } from "@/components/Product/EmptyLitst";
import ProductCard from "@/components/Product/ProductCard";
import ProductPageFilters from "@/components/Product/ProductPageFilters";
import ProductsSkeleton from "@/components/Product/ProductsSkeleton";
import Pagination from "@/components/shared/Pagination";
import { specTechInputs } from "@/helpers/filters";
import { isFavoriteVehicle } from "@/helpers/functions";
import { showErrorNotification } from "@/helpers/notifications";
import { useAuth } from "@/hooks/useAuth";
import { useGetFavorites } from "@/hooks/useFavorites";
import { IBusesResponse } from "@/interfaces/bus";
import DefaultLayout from "@/layouts/DefaultLayout";
import { fetchSpecTechnicsByFilters } from "@/services/api/modules/spec-technics";
import { pageAtom } from "@/store/page";
import { tokenStorage } from "@/store/token";
import { AxiosError } from "axios";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const ProductSpecTechnicsPage = () => {
  const router = useRouter();
  const [token, _] = useAtom(tokenStorage);
  const [page, setPage] = useAtom(pageAtom);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const [specTechnicsResponse, setSpecTechnicsResponse] =
    useState<IBusesResponse | null>(null);

  const {
    data: favoritesData,
    isLoading: isLoadingFavorites,
    error,
    isError,
  } = useGetFavorites({
    params: { view: "with_vehicle", vehicle_type: "spectechnic" },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const fetch = useCallback(async () => {
    try {
      const response = await fetchSpecTechnicsByFilters({
        ...router.query,
        page,
      });
      setSpecTechnicsResponse(response);
    } catch (err) {
      if (err instanceof AxiosError) showErrorNotification(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, router.query]);

  useEffect(() => {
    setLoading(true);
    if (router.isReady) fetch();
    if (isError) {
      showErrorNotification(
        "something went wrong on favorites - spec technics"
      );
    }
  }, [router.query, page, fetch, router.isReady]);
  return (
    <DefaultLayout>
      <ProductPageFilters
        dataInputs={specTechInputs}
        filtersLabel="Спец. Техника"
      />
      <div className="mt-10 flex flex-col gap-3">
        {loading || isLoadingFavorites ? (
          <ProductsSkeleton />
        ) : (
          <>
            {!specTechnicsResponse?.data.length ? (
              <EmptyList />
            ) : (
              <>
                {specTechnicsResponse?.data.map((truck) => (
                  <ProductCard
                    authorized={!!auth.user}
                    product={truck}
                    key={truck.id}
                    type="spec_technics"
                    isFavorite={isFavoriteVehicle(
                      truck.id,
                      favoritesData?.data
                    )}
                  />
                ))}
                {specTechnicsResponse?.data.length && (
                  <Pagination
                    totalPages={specTechnicsResponse?.meta.total_pages}
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

export default ProductSpecTechnicsPage;
