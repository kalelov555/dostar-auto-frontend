import ProductPageFilters from "@/components/Product/ProductPageFilters";
import DefaultLayout from "@/layouts/DefaultLayout";

const ProductMotosPage = () => {
  return (
    <DefaultLayout>
      <ProductPageFilters dataInputs={[]} filtersLabel="Мото" />
    </DefaultLayout>
  );
};

export default ProductMotosPage;
