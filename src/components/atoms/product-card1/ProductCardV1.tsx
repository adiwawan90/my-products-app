/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Product } from "@/interface/product";
import { cleanImgUrl } from "@/helpers";

type ProductCardV1Props = {
  item: Product;
  onItemClick?: (item: Product | undefined) => void;
};

const ProductCardV1: React.FC<ProductCardV1Props> = ({ item, onItemClick }) => {
  const {
    id,
    creationAt,
    category,
    images = [],
    updatedAt,
    title,
    price,
    description,
  } = item;

  const ImageWithFallback = ({ images }: { images: string[] }) => {
    const handleImageError = (event: { target: { src: string } }) => {
      event.target.src = "https://via.placeholder.com/640x360"; // Fallback image URL
    };

    return (
      <img
        className="rounded-t-lg object-cover h-full w-full"
        src={
          images?.length > 0
            ? cleanImgUrl(images[0] || "")
            : "https://via.placeholder.com/640x360"
        }
        alt="sport foot wears"
        onError={handleImageError}
      />
    );
  };

  return (
    <div className="w-64 rounded-lg border border-gray-200 bg-white shadow">
      <div className="w-full h-36 relative">
        <ImageWithFallback images={images} />
      </div>
      <div className="p-5">
        <a href="#" className="flex items-center justify-between gap-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 overflow-hidden truncate">
            {title}
          </h5>
          <p className="font-semibold">
            $<span className="text-xl font-semibold">{price}</span>
          </p>
        </a>
        <p className="mb-3 font-normal text-gray-700 overflow-hidden truncate">
          {description}
        </p>
        <div className="flex items-center justify-end">
          <button
            className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            onClick={() => onItemClick && onItemClick(item)}
          >
            Add to cart
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="{1.5}"
              stroke="currentColor"
              className="ml-2 h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </button>
          {/* <a
            href="#"
            className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Add to cart
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="{1.5}"
              stroke="currentColor"
              className="ml-2 h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCardV1;
