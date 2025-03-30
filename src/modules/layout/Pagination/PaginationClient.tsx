"use client";
import { useGlobalState } from "@/store";
import { Pagination } from "antd";

const PaginationClient = () => {
  const { productParams, setProductParams, paginationParams } =
    useGlobalState();

  const handlePagination = (page: number, pageSize: number) => {
    setProductParams({
      ...productParams,
      page: page,
      pageSize: pageSize,
    });
  };

  return (
    <Pagination
      align="center"
      defaultCurrent={paginationParams?.page}
      total={paginationParams?.total}
      className="mt-20"
      onChange={(page, pageSize) => handlePagination(page, pageSize)}
    />
  );
};

export default PaginationClient;
