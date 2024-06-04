import React from "react";
import { motion } from "framer-motion";
import { Category } from "@/interface/product";

type CategoryCardProps = {
  item: Category;
};
const CategoryCard: React.FC<CategoryCardProps> = (props) => {
  const { item } = props;
  const { id, creationAt, name, image, updatedAt } = item;
  return (
    <motion.div
      className="min-w-36 h-38 rounded-lg border p-2 shadow bg-white flex flex-col justify-between hover:z-50"
      whileHover={{
        scale: 1,
        textShadow: "0px 0px 2px gray",
        backgroundColor: "#00BCD4",
      }}
    >
      <div className="w-16 h-16 flex justify-center items-center mx-auto bg-gray-500 rounded-full overflow-hidden">
        {image && (
          <img
            src={image}
            alt={`category-${name}`}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-col items-center flex-grow p-2">
        <p className="text-black font-bold">{name}</p>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
