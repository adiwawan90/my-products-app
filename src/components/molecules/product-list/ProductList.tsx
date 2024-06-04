"use client";
import ProductCardV1 from "@/components/atoms/product-card1/ProductCardV1";
import { Product } from "@/interface/product";
import { useAppDispatch } from "@/redux/lib/hooks";
import { addToCart } from "@/redux/slices/cartSlice";
import { useAllProducts } from "@/utils/hook/useProducts";
import React from "react";

const ProductList = () => {
  const { data, isLoading } = useAllProducts();
  const dispatch = useAppDispatch();

  return (
    <div className="flex justify-center flex-wrap w-full overflow-x-scroll gap-4">
      {isLoading && <p>Loading...</p>}
      {data &&
        data?.map((product: Product, index: number) => (
          <ProductCardV1
            key={index}
            item={product}
            onItemClick={(item) => dispatch(addToCart(product))}
          />
        ))}
    </div>
  );
};

export default ProductList;
