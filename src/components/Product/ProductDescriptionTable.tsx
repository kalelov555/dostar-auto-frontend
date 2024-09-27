import { serializeCarData } from "@/helpers/serializers";
import { ICar } from "@/interfaces/car";

const ProductDescriptionTable = ({ product }: { product: any }) => {
  return (
    <div className="flex flex-col gap-2 px-2">
      {Object.entries(serializeCarData(product)).map(
        (item) =>
          item[1] && (
            <div
              key={item[0]}
              className="flex w-full justify-between items-center"
            >
              <p className="w-1/2 text-sm text-gray-400">{item[0]}</p>
              <p className="w-1/2 text-sm">{item[1]}</p>
            </div>
          )
      )}
    </div>
  );
};

export default ProductDescriptionTable;
