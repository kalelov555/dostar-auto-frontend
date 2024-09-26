import ApplicationModal from "@/components/Applications/ApplicationModal";
import ProductDescriptionTable from "@/components/Product/ProductDescriptionTable";
import { formatPrice } from "@/helpers/functions";
import { IBus } from "@/interfaces/bus";
import DefaultLayout from "@/layouts/DefaultLayout";
import api from "@/services/api/client";
import { GetServerSidePropsContext } from "next";

type ContextProps = {
  data: IBus;
};

const ProductCarPage = ({ data }: ContextProps) => {
  return (
    <DefaultLayout>
      <div className="bg-white">
        <div className="h-72 w-full bg-red-300"></div>
        <div className="flex items-center justify-between py-3 px-2">
          <div className="flex flex-col">
            <p>
              {data.model ? data.model : ""} - {data.manufacture_year} года
            </p>
            <h2 className="mt-1">{formatPrice(data.price)}</h2>
          </div>
        </div>

        <div></div>
      </div>

      <div className="w-full border-y-[1px] border-gray-primary py-2 mt-4 bg-white">
        <ProductDescriptionTable product={data} />
      </div>

      <ApplicationModal id={Number(data.id)} />
    </DefaultLayout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query;
  const response = await api.get(`/buses/${id}`);
  return { props: { data: response.data.data } };
};

export default ProductCarPage;
