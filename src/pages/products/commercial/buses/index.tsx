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
import { useEffect, useState } from "react";

const ProductMotoPage = () => {
  const router = useRouter();
  const [page, setPage] = useAtom(pageAtom);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const [busesResponse, setBusesResponse] = useState<IBusesResponse | null>(
    null
  );

  useEffect(() => {
    setLoading(true);

    const fetch = async () => {
      try {
        const response = await fetchBusesByFilters({ ...router.query, page });
        setBusesResponse(response);
      } catch (err) {
        alert(JSON.stringify(err));
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [router.query, page]);
  return (
    <DefaultLayout>
      <ProductPageFilters dataInputs={busesInput} filtersLabel="Автобусы" />
      <div className="mt-10 flex flex-col gap-3">
        {loading ? (
          <ProductsSkeleton />
        ) : (
          <>
            {busesResponse?.data.map((bus) => (
              <ProductCard
                authorized={!!auth.user}
                product={bus}
                key={bus.id}
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
      </div>
    </DefaultLayout>
  );
};

export default ProductMotoPage;
