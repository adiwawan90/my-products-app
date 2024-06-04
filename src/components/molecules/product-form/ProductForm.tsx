"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateProduct } from "@/utils/hook/useProducts";
import { useForm, useFieldArray } from "react-hook-form";
import Input from "@/components/atoms/input/Input";
import Select from "@/components/atoms/select/Select";
import { Button, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const ProductSchema = z.object({
  title: z.string().nonempty("Title is required"),
  price: z.number().positive("Price must be a positive number"),
  description: z.string().nonempty("Description is required"),
  categoryId: z.number().positive("Category ID must be a positive number"),
  images: z
    .array(z.string().url("Invalid URL"))
    .min(1, "At least one image is required"),
});

type ProductFormData = z.infer<typeof ProductSchema>;

const ProductForm: React.FC = () => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema, {}, { raw: true }),
    defaultValues: {
      title: "",
      price: 0,
      categoryId: undefined,
      description: "",
      images: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: control,
    // @ts-ignore
    name: "images", // eslint-disable-line
  });

  const { mutate: createProduct, error } = useCreateProduct();

  const onSubmit = async (data: ProductFormData) => {
    try {
      await createProduct(data);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="">
      <div className="my-5">
        <p className="text-lg font-bold">Create Product</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-3 lg:max-w-screen-lg border p-4 rounded-md"
      >
        <Input
          label="Title"
          {...register("title")}
          error={errors.title?.message}
          required
        />
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-3">
          <Select
            label="Category"
            options={[
              { label: "Furniture", value: 3 },
              { label: "Shoes", value: 2 },
            ]}
            // {...register("categoryId")}
            error={errors.categoryId?.message}
            onChange={(v) => setValue("categoryId", Number(v.target.value))}
            required
          />
          <Input
            label="Price"
            // {...register("price")}
            error={errors.price?.message}
            type="number"
            onChange={(v) => setValue("price", Number(v.target.value))}
            required
          />
        </div>
        <Input
          label="Image URL"
          {...register(`images.${0}` as const)}
          error={errors.images?.message}
          required
        />
        {fields?.map((field, index) => {
          return (
            index !== 0 && (
              <div
                key={field.id}
                style={{ display: "flex", marginBottom: 8 }}
                className="flex-row items-center w-full gap-3"
              >
                <Input
                  {...register(`images.${index}` as const)}
                  error={errors.images?.message}
                  className="flex-1"
                />
                <button
                  type="button"
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 dark:bg-red-600 dark:hover:bg-red-700 self-end w-11 h-11"
                  onClick={() => remove(index)}
                >
                  <DeleteOutlined />
                </button>
              </div>
            )
          );
        })}
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 me-2 dark:bg-red-600 dark:hover:bg-red-700"
          onClick={() => append("")}
        >
          <DeleteOutlined /> Add URL
        </button>

        <Input
          label="Description"
          {...register("description")}
          error={errors.description?.message}
          required
        />
        <button
          disabled={isValid && !isDirty}
          type="submit"
          className="col-span-full px-6 py-3 uppercase font-bold bg-green-500 hover:bg-green-400 rounded-sm transition-all shadow-md"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        {error && <p>Error creating product: {error.message}</p>}
      </form>
    </div>
  );
};

export default ProductForm;
