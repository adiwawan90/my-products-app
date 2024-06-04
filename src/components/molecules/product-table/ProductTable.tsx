"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Table } from "antd";
import { useProducts } from "@/utils/hook/useProducts";
import ProductTable from "../../atoms/table/ProductTable";
import { PlusOutlined } from "@ant-design/icons";
import Link from "next/link";

const ProductTables: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [offset, setOffset] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const limit = 5;
  // const offset = (page - 1) * limit;
  const { data, error, isLoading } = useProducts(
    offset,
    limit,
    debouncedSearch,
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  const handleSearch = () => setDebouncedSearch(search);

  useEffect(() => {
    setOffset((page - 1) * limit);
  }, [page]);

  if (error) {
    return <div>Error fetching products</div>;
  }

  return (
    <div className="flex flex-col ">
      <div className="flex mb-4 w-full justify-between">
        <div className="">
          <input
            type="text"
            placeholder="Search by title"
            value={search}
            onChange={onChange}
            className="border p-2 rounded mr-4"
          />
          <button
            onClick={handleSearch}
            className="border p-2 rounded bg-blue-500 text-white"
          >
            Search
          </button>
        </div>
        <div className="">
          <Link
            href={"/create-product"}
            className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2 gap-2"
          >
            {/* <button
            type="button"
          > */}
            <PlusOutlined />
            Create Product
            {/* </button> */}
          </Link>
        </div>
      </div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && <ProductTable data={data} />}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="border p-2 rounded bg-blue-500 text-white"
        >
          Previous
        </button>
        {/* <span>Page {page}</span> */}
        <button
          onClick={() =>
            setPage((prev) => (data?.length === limit ? prev + 1 : prev))
          }
          disabled={data?.length < limit}
          className="border p-2 rounded bg-blue-500 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductTables;
