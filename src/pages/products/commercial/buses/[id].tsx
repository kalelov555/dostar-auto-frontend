import ApplicationModal from "@/components/Applications/ApplicationModal";
import ProductDescriptionTable from "@/components/Product/ProductDescriptionTable";
import Gallery from "@/components/shared/Gallery";
import LoadingScreen from "@/components/shared/LoadingScrenn";
import { formatPrice } from "@/helpers/functions";
import { IBus } from "@/interfaces/bus";
import DefaultLayout from "@/layouts/DefaultLayout";
import api from "@/services/api/client";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProductCarPage = () => {
  const [data, setData] = useState<IBus>();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      setLoading(true);
      api
        .get(`/buses/${params.id}`)
        .then((res) => setData(res.data.data))
        .catch(() => router.replace("/404"))
        .finally(() => setLoading(false));
    }
  }, [params, router]);
  return (
    <DefaultLayout>
      {loading || !data ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="bg-white">
            <div className="w-full">
              <Gallery items={data?.image_urls as string[]} />
            </div>
            <div className="flex items-center justify-between py-3 px-2">
              <div className="flex flex-col">
                <p className="text-lg font-semibold text-primary">
                  {data?.manufacturer_name || ""} {data?.model || ""} -{" "}
                  {data?.manufacture_year} года
                </p>
                <h2 className="mt-1">{formatPrice(data?.price as number)}</h2>
              </div>
            </div>

            <div></div>
          </div>

          <div className="w-full border-y-[1px] border-gray-primary py-2 mt-4 bg-white">
            <ProductDescriptionTable product={data} />
          </div>

          <ApplicationModal id={Number(data?.id)} />
        </>
      )}
    </DefaultLayout>
  );
};

export default ProductCarPage;
