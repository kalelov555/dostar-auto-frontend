import Link from "next/link";
import Image from "next/image";
import BaseDivider from "../shared/BaseDivider";
import { formatPrice, humanReadableDateFormat } from "@/helpers/functions";
import { IUser } from "@/interfaces/auth";
import { useAddFavorite, useDeleteFavorite } from "@/hooks/useFavorites";
import { useAtom } from "jotai";
import { tokenStorage } from "@/store/token";
import { useEffect, useState } from "react";
import { showErrorNotification } from "@/helpers/notifications";
import { IBus } from "@/interfaces/bus";
import { ICar } from "@/interfaces/car";
import { IMoto } from "@/interfaces/moto";
import { ITruck } from "@/interfaces/trucks";
import { ISpecTechnic } from "@/interfaces/spec-technics";

type Props = {
  product: ICar & IBus & IMoto & ITruck & ISpecTechnic;
  authorized: boolean | undefined | IUser;
  type: "cars" | "buses" | "trucks" | "motos" | "spec_technics";
  isFavorite: boolean;
};

const ProductCard = ({
  product,
  authorized = false,
  type = "cars",
  isFavorite,
}: Props) => {
  const {
    mutateAsync: addFavorite,
    isPending: isPendingAdd,
    isPaused: isPausedAdd,
  } = useAddFavorite();
  const {
    mutateAsync: deleteFavorite,
    isPending: isPendingDelete,
    isPaused: isPausedDelete,
  } = useDeleteFavorite();
  const [token, _] = useAtom(tokenStorage);
  const loading = isPendingAdd || isPendingDelete;
  const [favorite, setFavorite] = useState(isFavorite);

  useEffect(() => {
    if (isFavorite) setFavorite(true);
    else setFavorite(false);
  }, [isFavorite]);

  const onClick = async () => {
    if (!loading) {
      if (!favorite) {
        await addFavorite({
          id: product.id,
          type,
          token,
        })
          .then(() => setFavorite(!favorite))
          .catch((err) => {
            showErrorNotification(err.message || "");
          });
      } else {
        await deleteFavorite({
          id: product.id,
          type,
          token,
        })
          .then(() => setFavorite(!favorite))
          .catch((err) => {
            showErrorNotification(err.message || "");
          });
      }
    }
  };
  return (
    <Link
      href={`/products/${
        type === "cars" ? "" : type === "motos" ? "" : "commercial/"
      }${type}/${product?.id}`}
      className="bg-white shadow-sm p-4"
      key={product?.id}
    >
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold text-primary">
          {!product.model
            ? `${product.manufacturer_name || ""} ${
                product.vehicle_model_name || ""
              }`
            : `${product.manufacturer_name || ""} ${product.model || ""}`}
        </p>
        {authorized && (
          <span
            className="cursor-pointer w-8 h-8 flex items-center justify-center"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              !loading && onClick();
            }}
          >
            <i
              className={`pi ${
                favorite ? "text-red-600 pi-heart-fill" : "pi-heart"
              }`}
            ></i>
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
      <div className="flex gap-4 mt-4 ">
        <div className="w-1/3 sm:w-1/4 h-40 p-3 bg-slate-50">
          <img
            className="max-w-[100%] max-h-[100%] mx-auto"
            src={
              product.image_urls?.length
                ? product.image_urls[0]
                : "https://picsum.photos/200/300?random=1"
            }
          />
        </div>
        <div className="text-sm w-2/3 sm:w-3/4">
          <p
            style={{ overflowWrap: "break-word" }}
            className="h-16 text-ellipsis overflow-hidden ... w-full"
          >
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
        <p>{humanReadableDateFormat(new Date(product.created_at))}</p>
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
