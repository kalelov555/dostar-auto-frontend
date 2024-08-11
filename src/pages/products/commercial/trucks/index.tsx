import ProductCard from "@/components/Product/ProductCard";
import ProductPageFilters from "@/components/Product/ProductPageFilters";
import ProductsSkeleton from "@/components/Product/ProductsSkeleton";
import Pagination from "@/components/shared/Pagination";
import { busesInput } from "@/helpers/filters";
import { useAuth } from "@/hooks/useAuth";
import { IBusesResponse } from "@/interfaces/bus";
import DefaultLayout from "@/layouts/DefaultLayout";
import { fetchTrucksByFilters } from "@/services/api/modules/trucks";
import { pageAtom } from "@/store/page";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProductTrucksPage = () => {
  const router = useRouter();
  const [page, setPage] = useAtom(pageAtom);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const [trucksResponse, setTrucksResponse] = useState<IBusesResponse | null>(
    null
  );

  useEffect(() => {
    setLoading(true);

    const fetch = async () => {
      try {
        const response = await fetchTrucksByFilters({ ...router.query, page });
        setTrucksResponse(response);
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
      <ProductPageFilters dataInputs={busesInput} filtersLabel="Грузовики" />
      <div className="mt-10 flex flex-col gap-3">
        {loading ? (
          <ProductsSkeleton />
        ) : (
          <>
            {trucksResponse?.data.map((truck) => (
              <ProductCard
                authorized={!!auth.user}
                product={truck}
                key={truck.id}
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
      </div>
    </DefaultLayout>
  );
};

export default ProductTrucksPage;
