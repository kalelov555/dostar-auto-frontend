import DefaultLayout from "@/layouts/DefaultLayout";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ProductsSkeleton from "@/components/Product/ProductsSkeleton";
import ProductCard from "@/components/Product/ProductCard";
import HomePageMenu from "@/components/HomePageMenu/HomePageMenu";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Toast } from "primereact/toast";
import { useAuth } from "@/hooks/useAuth";
import { fetchAllCars } from "@/services/api/modules/cars";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const router = useRouter();
  const auth = useAuth();

  const toast = useRef<Toast>(null);

  const { ref, inView } = useInView();

  const { data, status, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["items"],
      queryFn: ({ pageParam }) =>
        fetchAllCars({
          pageParam,
          restParams: { ...router.query },
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        const maxPages = lastPage.totalPages;
        const nextPage = allPages.length;
        return nextPage < maxPages ? nextPage : undefined;
      },
    });

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, isFetchingNextPage]);

  return (
    <DefaultLayout>
      <HomePageMenu />
      <Toast ref={toast} />
      <div>
        {status === "success" && (
          <div className="mt-4 flex flex-col gap-3">
            {data.pages.map((pageItems) =>
              pageItems.data.map((product) => (
                <ProductCard
                  authorized={auth.user?.data}
                  key={product.id}
                  product={product}
                />
              ))
            )}
          </div>
        )}
      </div>
      {(isFetchingNextPage || status === "pending") && <ProductsSkeleton />}
      <div ref={ref}></div>
    </DefaultLayout>
  );
}
