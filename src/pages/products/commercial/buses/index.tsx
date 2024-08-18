import { EmptyList } from "@/components/Product/EmptyLitst";
import ProductCard from "@/components/Product/ProductCard";
import ProductPageFilters from "@/components/Product/ProductPageFilters";
import ProductsSkeleton from "@/components/Product/ProductsSkeleton";
import Pagination from "@/components/shared/Pagination";
import { busesInput } from "@/helpers/filters";
import { useAuth } from "@/hooks/useAuth";
import { IBusesResponse } from "@/interfaces/bus";
import DefaultLayout from "@/layouts/DefaultLayout";
import { fetchBusesByFilters } from "@/services/api/modules/buses";
import { pageAtom } from "@/store/page";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const ProductMotoPage = () => {
  const router = useRouter();
  const [page, setPage] = useAtom(pageAtom);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const [busesResponse, setBusesResponse] = useState<IBusesResponse | null>(
    null
  );

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
  }, [router.query, page, fetch, router.isReady]);
  return (
    <DefaultLayout>
      <ProductPageFilters dataInputs={busesInput} filtersLabel="Автобусы" />
      <div className="mt-10 flex flex-col gap-3">
        {loading ? (
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

export default ProductMotoPage;
