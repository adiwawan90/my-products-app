/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { Product } from "@/interface/product";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { Modal } from "antd";
import { cleanImgUrl } from "@/helpers";
import { useDeleteProduct } from "@/utils/hook/useProducts";
import FormModalUpdate from "@/components/molecules/form-modal-update/FormModalUpdate";

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
    }),
    columnHelper.accessor("price", {
      cell: (info: { getValue: () => any }) => `$${info.getValue()}`,
      header: "Price",
    }),
    columnHelper.accessor("description", {
      cell: (info: { getValue: () => any }) => info.getValue(),
      header: "Description",
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
    }),
    columnHelper.accessor("category.name", {
      cell: (info: { getValue: () => any }) => info.getValue(),
      header: "Category",
    }),
    columnHelper.accessor("creationAt", {
      cell: (info: { getValue: () => string | number | Date }) =>
        new Date(info.getValue()).toLocaleDateString(),
      header: "Created At",
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
