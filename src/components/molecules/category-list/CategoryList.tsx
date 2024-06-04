"use client";
import CategoryCard from "@/components/atoms/category-card/CategoryCard";
import { Category } from "@/interface/product";
import { useCategories } from "@/utils/hook/useCategories";
import React from "react";

const CategoryList = () => {
  const { data, isLoading } = useCategories();

  return (
    <div className="flex flex-row w-full overflow-x-scroll gap-4">
      {isLoading && <p>Loading...</p>}
      {data &&
        data?.map((category: Category, index: number) => (
          <CategoryCard key={index} item={category} />
        ))}
    </div>
  );
};

export default CategoryList;
