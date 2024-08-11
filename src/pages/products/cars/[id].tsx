import ProductDescriptionTable from "@/components/Product/ProductDescriptionTable";
import { formatPrice } from "@/helpers/functions";
import { ICar } from "@/interfaces/car";
import DefaultLayout from "@/layouts/DefaultLayout";
import api from "@/services/api/client";
import { GetServerSidePropsContext } from "next";

type ContextProps = {
  data: ICar;
};

const ProductCarPage = ({ data }: ContextProps) => {
  return (
    <DefaultLayout>
      <div className="bg-white">
        <div className="h-72 w-full bg-red-300"></div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
            <p>{data.manufacturer_name} - {data.vehicle_model_name} {data.manufacture_year} года</p>
            <h3>{formatPrice(data.price)}</h3>
          </div>
        </div>

        <div className="w-full border-y-[1px] border-gray-primary h-40 py-4 mt-4">
          <ProductDescriptionTable product={data} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query;
  const response = await api.get(`/cars/${id}`);
  console.log(response.data.data)
  return { props: { data: response.data.data } };
};

export default ProductCarPage;
