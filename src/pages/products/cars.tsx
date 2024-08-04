import ProductCard from "@/components/Product/ProductCard";
import ProductPageFilters from "@/components/Product/ProductPageFilters";
import ProductsSkeleton from "@/components/Product/ProductsSkeleton";
import Pagination from "@/components/shared/Pagination";
import { useAuth } from "@/hooks/useAuth";
import { ICar, ICarResponse } from "@/interfaces/car";
import DefaultLayout from "@/layouts/DefaultLayout";
import { fetchCarsByFilters } from "@/services/api/modules/cars";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProductCarPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const [carsResponse, setCarsResponse] = useState<ICarResponse | null>(null);

  useEffect(() => {
    setLoading(true);

    const fetch = async () => {
      try {
        const response = await fetchCarsByFilters({ ...router.query, page });
        setCarsResponse(response);
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
      <ProductPageFilters filtersLabel="Легковые" />
      <div className="mt-10 flex flex-col gap-3">
        {loading ? (
          <ProductsSkeleton />
        ) : (
          <>
            {carsResponse?.data.map((car) => (
              <ProductCard
                authorized={!!auth.user}
                product={car}
                key={car.id}
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
      </div>
    </DefaultLayout>
  );
};

export default ProductCarPage;
