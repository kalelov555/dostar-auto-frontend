import Link from "next/link";
import Image from "next/image";

type Props = {
  product: any;
};

const ProductCard = ({ product }: Props) => {
  return (
    <div className="bg-white shadow-sm p-4" key={product.id}>
      <div className="flex items-center justify-between">
        <Link className="text-lg font-semibold text-primary" href="/">
          {product.title}
        </Link>
        <span>
          <i className="pi pi-heart"></i>
        </span>
      </div>
      <div className="flex gap-4 text-sm">
        <p>{product.price} T</p>
        {/* <p>330 300 T/мес</p> */}
      </div>
      <div className="flex gap-4">
        <Image
          width={150}
          height={150}
          src={product.images[0]}
          alt={product.title}
        />
        <div className="text-sm">
          <p>{product.description}</p>
          <p className="mt-3 text-gray-secondary">{product.brand}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
