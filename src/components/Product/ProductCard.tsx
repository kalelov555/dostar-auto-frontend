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
          src="https://source.unsplash.com/random"
          alt={product.vehicle_model_name}
        />
        <div className="text-sm">
          <p>{product.description}</p>
          <p className="mt-3 text-gray-secondary">
            {product.manufacturer_name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
