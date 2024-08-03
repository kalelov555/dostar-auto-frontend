import DefaultLayout from "@/layouts/DefaultLayout";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ProductsSkeleton from "@/components/Product/ProductsSkeleton";
import ProductCard from "@/components/Product/ProductCard";
import HomePageMenu from "@/components/HomePageMenu/HomePageMenu";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "@/services/api/client";
import { Toast } from "primereact/toast";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const auth = useAuth();

  const toast = useRef<Toast>(null);

  const fetchProjects = (page = 1) =>
    api.get("/cars?page=" + page).then((res) => res.data);

  const {
    isPending,
    isSuccess,
    data: cars,
  } = useQuery({
    queryKey: ["projects", page],
    queryFn: () => fetchProjects(page),
    placeholderData: keepPreviousData,
  });

  return (
    <DefaultLayout>
      <HomePageMenu />
      <Toast ref={toast} />
      <div className="mt-4 flex flex-col gap-3">
        {isPending && <ProductsSkeleton />}
        {isSuccess &&
          cars.data.map((car: any) => (
            <ProductCard
              authorized={auth.isSuccess}
              key={car.id}
              product={car}
            />
          ))}
      </div>
      {/* <div className="flex flex-col">


        <span>Current Page: {page + 1}</span>
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 0}
        >
          Previous Page
        </button>
        <button
          onClick={() => {
            if (!isPlaceholderData && data.hasMore) {
              setPage((old) => old + 1);
            }
          }}
          // Disable the Next Page button until we know a next page is available
          disabled={isPlaceholderData || !data?.hasMore}
        >
          Next Page
        </button>
        {isFetching ? <span> Loading...</span> : null}
      </div> */}
    </DefaultLayout>
  );
}
// await api.get("/products?limit=5&skip=5");
