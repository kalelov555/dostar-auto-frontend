import DefaultLayout from "@/layouts/DefaultLayout";
import { fetchActualCars } from "@/services/cars";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import ProductsSkeleton from "@/components/Product/ProductsSkeleton";
import ProductCard from "@/components/Product/ProductCard";
import HomePageMenu from "@/components/HomePageMenu/HomePageMenu";

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
      <HomePageMenu />
      <div className="mt-4 flex flex-col gap-3">
        {cars.map((car: any) => (
          <ProductCard key={car.id} product={car} />
        ))}
        {loading && <ProductsSkeleton />}
      </div>
    </DefaultLayout>
  );
}
// await api.get("/products?limit=5&skip=5");
