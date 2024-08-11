import Link from "next/link";
import Image from "next/image";
import { ICar } from "@/interfaces/car";
import { IBus } from "@/interfaces/bus";
import { IProduct } from "@/interfaces";

type Props = {
  product: any;
  authorized: boolean;
};

const ProductCard = ({ product, authorized = false }: Props) => {
  return (
    <div className="bg-white shadow-sm p-4" key={product.id}>
      <div className="flex items-center justify-between">
        <Link
          className="text-lg font-semibold text-primary"
          href={`/products/cars/${product.id}`}
        >
          {product.manufacturer_name
            ? `${product.manufacturer_name} ${product.vehicle_model_name}`
            : `${product.model}`}
        </Link>
        {authorized && (
          <span>
            <i className="pi pi-heart"></i>
          </span>
        )}
      </div>
      <div className="flex gap-4 text-sm">
        <p>{product.price} T</p>
      </div>
      <div className="flex gap-4">
        <Image
          width={150}
          height={150}
          src="https://hips.hearstapps.com/hmg-prod/images/a218141-medium-1635867809.jpg?crop=0.723xw:0.811xh;0.133xw,0.127xh&resize=768:*"
          alt={product.vehicle_model_name || ""}
        />
        <div className="text-sm">
          <p className="h-16 text-ellipsis overflow-hidden ... w-full">
            {product.description ||
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
          </p>
          <p className="mt-3 text-gray-secondary">
            {product.manufacturer_name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
