import Link from "next/link";
import Image from "next/image";
import BaseDivider from "../shared/BaseDivider";
import { dateFormatter, formatPrice } from "@/helpers/functions";
import { IUser } from "@/interfaces/auth";

type Props = {
  product: any;
  authorized: boolean | undefined | IUser;
};

const ProductCard = ({ product, authorized = false }: Props) => {
  const onClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    alert("saved");
  };
  return (
    <Link
      href={`/products/cars/${product.id}`}
      className="bg-white shadow-sm p-4"
      key={product.id}
    >
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold text-primary">
          {product.manufacturer_name
            ? `${product.manufacturer_name} ${product.vehicle_model_name}`
            : `${product.model}`}
        </p>
        {authorized && (
          <span onClick={onClick}>
            <i className="pi pi-heart"></i>
          </span>
        )}
      </div>
      <div className="flex gap-4 text-sm">
        {product?.discounted_price ? (
          <div>
            <p className="line-through">{formatPrice(product.price)}</p>
            <p>{formatPrice(product.discounted_price)}</p>
          </div>
        ) : (
          <div>
            <p>{formatPrice(product.price)}</p>
          </div>
        )}
      </div>
      <div className="flex gap-4 mt-4">
        <Image
          width={150}
          height={150}
          src="https://hips.hearstapps.com/hmg-prod/images/a218141-medium-1635867809.jpg?crop=0.723xw:0.811xh;0.133xw,0.127xh&resize=768:*"
          alt={product.vehicle_model_name || ""}
        />
        <div className="text-sm">
          <p className="h-16 text-ellipsis overflow-hidden ... w-full">
            {product.info ||
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
          </p>
          <p className="mt-3 text-gray-secondary">
            {product.manufacturer_name}
          </p>
        </div>
      </div>
      <div className="my-2">
        <BaseDivider />
      </div>
      <div className="flex gap-4 text-xs text-gray-400">
        <p>{dateFormatter.format(new Date(product.created_at))}</p>
        <div className="flex items-center gap-1">
          <i className="pi pi-eye text-[12px]"></i>
          <p>40</p>
        </div>
        <div className="flex items-center gap-1">
          <i className="pi pi-heart text-[12px]"></i>
          <p>100</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
