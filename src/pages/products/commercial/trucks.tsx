import ProductPageFilters from "@/components/Product/ProductPageFilters";
import DefaultLayout from "@/layouts/DefaultLayout";

const ProductMotoPage = () => {
  return (
    <DefaultLayout>
      <ProductPageFilters dataInputs={[]} filtersLabel="Грузовики" />
    </DefaultLayout>
  );
};

export default ProductMotoPage;
