import { Space, Table, TableProps, Tooltip } from "antd";
import React, { SetStateAction } from "react";

import { T_PAGINATION, T_PRODUCT_RESPONSE } from "@/types";
import { formatDate } from "@/utils";

type Props = {
  dataSource: T_PRODUCT_RESPONSE[];
  loading: boolean;
  tableParams: T_PAGINATION;
  setIdProduct: React.Dispatch<SetStateAction<number>>;
  setIsModalEditOpen: React.Dispatch<SetStateAction<boolean>>;
  fetchDataProduct: (params: T_PAGINATION) => void;
};

const ProductTable = (props: Props) => {
  const {
    dataSource,
    loading,
    tableParams,
    setIdProduct,
    setIsModalEditOpen,
    fetchDataProduct,
  } = props;

  const handleOpenModalEdit = (id: number) => {
    setIsModalEditOpen(true);
    setIdProduct(id);
  };

  const handlePagination = (page: number, pageSize: number) => {
    const params = { page: page, pageSize: pageSize };
    fetchDataProduct(params);
  };

  const columns: TableProps<T_PRODUCT_RESPONSE>["columns"] = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Import",
      dataIndex: "import",
      key: "import",
      align: "center",
    },
    {
      title: "Sold",
      dataIndex: "sold",
      key: "sold",
      align: "center",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      align: "center",
    },
    {
      title: "Status",
      align: "center",
      render: (_, { stock }) => {
        if (stock > 0) {
          return <p className="text-green">In stock</p>;
        } else {
          return <p className="text-red">Out of stock</p>;
        }
      },
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: Date) => {
        const newDate = formatDate(date, true, true);
        return <p>{newDate}</p>;
      },
      align: "center",
    },
    {
      title: "Last updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date: Date) => {
        const newDate = formatDate(date, true, true);
        return <p>{newDate}</p>;
      },
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (_, { id }) => (
        <Space size="middle">
          <Tooltip placement="top" title={"Edit"}>
            <button onClick={() => handleOpenModalEdit(id)}>
              <i className="text-blue-400 bi bi-pencil text-md"></i>
            </button>
          </Tooltip>
        </Space>
      ),
      align: "center",
    },
  ];

  return (
    <>
      <Table<T_PRODUCT_RESPONSE>
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        pagination={{
          current: tableParams.page ?? 1,
          defaultPageSize: tableParams.pageSize ?? 10,
          showSizeChanger: true,
          pageSizeOptions: [10, 25, 50],
          total: tableParams.total ?? 0,
          onChange: (page, pageSize) => {
            handlePagination(page, pageSize);
          },
          onShowSizeChange: (current, size) => {
            handlePagination(current, size);
          },
        }}
      />
    </>
  );
};

export default ProductTable;
