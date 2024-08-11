import ProductPageFilters from "@/components/Product/ProductPageFilters";
import DefaultLayout from "@/layouts/DefaultLayout";

const ProductMotoPage = () => {
  return (
    <DefaultLayout>
      <ProductPageFilters dataInputs={[]} filtersLabel="Мото" />
    </DefaultLayout>
  );
};

export default ProductMotoPage;
