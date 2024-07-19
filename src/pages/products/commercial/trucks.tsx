import ProductPageFilters from "@/components/Product/ProductPageFilters";
import DefaultLayout from "@/layouts/DefaultLayout";

const ProductMotoPage = () => {
  return (
    <DefaultLayout>
      <ProductPageFilters filtersLabel="Грузовики" />
    </DefaultLayout>
  );
};

export default ProductMotoPage;
