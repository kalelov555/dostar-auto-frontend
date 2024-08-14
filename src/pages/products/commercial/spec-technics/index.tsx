import ProductCard from "@/components/Product/ProductCard";
import ProductPageFilters from "@/components/Product/ProductPageFilters";
import ProductsSkeleton from "@/components/Product/ProductsSkeleton";
import Pagination from "@/components/shared/Pagination";
import { specTechInputs } from "@/helpers/filters";
import { useAuth } from "@/hooks/useAuth";
import { IBusesResponse } from "@/interfaces/bus";
import DefaultLayout from "@/layouts/DefaultLayout";
import { fetchSpecTechnicsByFilters } from "@/services/api/modules/spec-technics";
import { pageAtom } from "@/store/page";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const ProductSpecTechnicsPage = () => {
  const router = useRouter();
  const [page, setPage] = useAtom(pageAtom);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const [specTechnicsResponse, setSpecTechnicsResponse] =
    useState<IBusesResponse | null>(null);

  const fetch = useCallback(async () => {
    try {
      const response = await fetchSpecTechnicsByFilters({
        ...router.query,
        page,
      });
      setSpecTechnicsResponse(response);
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
      <ProductPageFilters
        dataInputs={specTechInputs}
        filtersLabel="Спец. Техника"
      />
      <div className="mt-10 flex flex-col gap-3">
        {loading ? (
          <ProductsSkeleton />
        ) : (
          <>
            {specTechnicsResponse?.data.map((specTechnic) => (
              <ProductCard
                authorized={!!auth.user}
                product={specTechnic}
                key={specTechnic.id}
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
      </div>
    </DefaultLayout>
  );
};

export default ProductSpecTechnicsPage;
