/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { Product } from "@/interface/product";
import { Table } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Modal } from "antd";
import { cleanImgUrl } from "@/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "../input/Input";
import Select from "../select/Select";
import TextArea from "../textarea/TextareaInput";
import { useUpdateProduct, useDeleteProduct } from "@/utils/hook/useProducts";

const columnHelper = createColumnHelper<Product>();

const { confirm } = Modal;

const ProductTable = ({ data }: { data: any[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemSelected, setItemSelected] = useState<Product>({} as Product);

  const { mutate: deleteProduct } = useDeleteProduct();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    columnHelper.accessor("title", {
      cell: (info: { getValue: () => any }) => info.getValue(),
      header: "Title",
      // size: 240,
      // minSize: 200,
      // maxSize: 240,
    }),
    columnHelper.accessor("price", {
      cell: (info: { getValue: () => any }) => `$${info.getValue()}`,
      header: "Price",
      // size: 240,
      // minSize: 200,
      // maxSize: 240,
    }),
    columnHelper.accessor("description", {
      cell: (info: { getValue: () => any }) => info.getValue(),
      header: "Description",
      // size: 240,
      // minSize: 200,
      // maxSize: 240,
    }),
    columnHelper.accessor("images", {
      cell: (info: {
        getValue: () => (string | undefined)[];
        row: { original: { title: string | undefined } };
      }) => {
        return (
          <img
            src={cleanImgUrl(info.getValue()[0] || "")} // Display the first image
            alt={info.row.original.title}
            className="w-16 h-16"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/640x360";
            }}
            width={"36px"}
            height={"36px"}
          />
        );
      },
      header: "Image",
      // size: 240,
      // minSize: 200,
      // maxSize: 240,
    }),
    columnHelper.accessor("category.name", {
      cell: (info: { getValue: () => any }) => info.getValue(),
      header: "Category",
      // size: 240,
      // minSize: 200,
      // maxSize: 240,
    }),
    columnHelper.accessor("creationAt", {
      cell: (info: { getValue: () => string | number | Date }) =>
        new Date(info.getValue()).toLocaleDateString(),
      header: "Created At",
      // size: 240,
      // minSize: 200,
      // maxSize: 240,
    }),
    columnHelper.accessor("id", {
      cell: (info: { row: { original: any }; getValue: () => any }) => {
        return (
          <div className="flex flex-row items-center justify-center">
            <button
              type="button"
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 me-2 dark:bg-red-600 dark:hover:bg-red-700"
              onClick={() =>
                confirm({
                  title: "Are you sure delete this product?",
                  icon: <ExclamationCircleFilled />,
                  content: "It will removed permanently!",
                  okText: "Yes",
                  okType: "danger",
                  cancelText: "No",
                  onOk() {
                    deleteProduct(info?.getValue());
                  },
                  onCancel() {
                    console.log("Cancel");
                  },
                })
              }
            >
              <DeleteOutlined />
            </button>
            <button
              type="button"
              className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-2 py-2 me-2"
              onClick={() => {
                showModal();
                setItemSelected(info?.row.original);
              }}
            >
              <EditOutlined />
            </button>
          </div>
        );
      },
      header: "Action",
      // size: 240,
      // minSize: 200,
      // maxSize: 240,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="">
      <table className="shadow-lg bg-white border-collapse w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="bg-blue-100 border text-left px-8 py-4"
            >
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-4 py-2 min-w-32 max-w-48">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border ">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border px-4 py-4 min-w-32 max-w-52 overflow-auto"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
      <FormModalUpdate
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        item={itemSelected}
      />
    </div>
  );
};

export default ProductTable;

interface FormModalUpdateProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  item?: Product;
}
const FormModalUpdate: React.FC<FormModalUpdateProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  item,
}) => {
  const productSchema = z.object({
    title: z.string().nonempty("Title is required"),
    price: z.number().positive("Price must be a positive number"),
    description: z.string().nonempty("Description is required"),
    categoryId: z.number().positive("Category ID must be a positive number"),
  });

  type ProductFormData = z.infer<typeof productSchema>;
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema, {}, { raw: true }),
    defaultValues: {
      title: item?.title || undefined,
      price: item?.price || undefined,
      categoryId: item?.category?.id || undefined,
      description: item?.description || undefined,
    },
  });

  useEffect(() => {
    if (item) {
      setValue("title", item?.title);
      setValue("price", item?.price);
      setValue("categoryId", item?.category?.id);
      setValue("description", item?.description);
    }
  }, [item]);

  const { mutate: updateProduct, error } = useUpdateProduct();

  const onSubmit = async (data: ProductFormData) => {
    try {
      await updateProduct({ id: item?.id, ...data });
      handleOk(); // Close the modal on successful update
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <Modal
      title="Update Product"
      open={isModalOpen}
      onOk={handleSubmit(onSubmit)}
      onCancel={handleCancel}
    >
      <div className="">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-3 lg:max-w-screen-lg"
        >
          <Input
            label="Title"
            {...register("title")}
            error={errors.title?.message}
            name="title"
            required
          />
          <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-3">
            <Select
              label="Category"
              options={[
                { label: "Furniture", value: 3 },
                { label: "Shoes", value: 2 },
              ]}
              error={errors.categoryId?.message}
              onChange={(v) => setValue("categoryId", Number(v.target.value))}
              name="categoryId"
              required
            />
            <Input
              label="Price"
              {...register("price")}
              error={errors.price?.message}
              defaultValue={getValues().price}
              type="number"
              onChange={(v) => setValue("price", Number(v.target.value))}
              name="price"
              required
            />
          </div>
          <TextArea
            label="Description"
            {...register("description")}
            error={errors.description?.message}
            name="description"
            required
          />
        </form>
      </div>
    </Modal>
  );
};
