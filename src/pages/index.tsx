import HomePageFilters from "@/components/HomePageFilters";
import DefaultLayout from "@/layouts/DefaultLayout";
import { fetchActualCars } from "@/services/cars";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import ProductsSkeleton from "@/components/ProductsSkeleton";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchActualCars()
      .then((response) => {
        console.log(response);
        setCars(response.data.products);
      })
      .catch((err) => console.log("Error fetching cars", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {}, [page]);
  return (
    <DefaultLayout>
      <HomePageFilters />
      <div className="mt-4 flex flex-col gap-3">
        {loading ? (
          <ProductsSkeleton />
        ) : (
          cars.map((car: any) => <ProductCard key={car.id} product={car} />)
        )}
      </div>
    </DefaultLayout>
  );
}
// await api.get("/products?limit=5&skip=5");
