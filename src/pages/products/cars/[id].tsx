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
      <div>
        <div className="h-72 w-full bg-red-300"></div>
      </div>
    </DefaultLayout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query;
  console.log("AAA", id);
  const response = await api.get(`/cars/${id}`);
  return { props: { data: response.data.data } };
};

export default ProductCarPage;
