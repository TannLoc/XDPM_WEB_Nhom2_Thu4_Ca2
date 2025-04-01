import { Space, Table, TableProps, Tooltip } from "antd";
import { SetStateAction } from "react";

import { T_PRODUCT_RESPONSE, T_PAGINATION } from "@/types";
import { T_SHIPMENT_RESPONSE } from "@/types/shipmentType";
import { formatDate } from "@/utils";

type Props = {
  dataSource: T_SHIPMENT_RESPONSE[];
  loading: boolean;
  tableParams: T_PAGINATION;
  setIdShipment: React.Dispatch<SetStateAction<number>>;
  setIsModalEditOpen: React.Dispatch<SetStateAction<boolean>>;
  setIsModalDeleteOpen: React.Dispatch<SetStateAction<boolean>>;
  fetchDataShipment: (params: T_PAGINATION) => void;
};

const ShipmentTable = (props: Props) => {
  const {
    dataSource,
    loading,
    tableParams,
    setIdShipment,
    setIsModalEditOpen,
    setIsModalDeleteOpen,
    fetchDataShipment,
  } = props;

  const handleOpenModalDelete = (id: number) => {
    setIsModalDeleteOpen(true);
    setIdShipment(id);
  };

  const handleOpenModalEdit = (id: number) => {
    setIsModalEditOpen(true);
    setIdShipment(id);
  };

  const handlePagination = (page: number, pageSize: number) => {
    const params = { page: page, pageSize: pageSize };
    fetchDataShipment(params);
  };

  const columns: TableProps<T_SHIPMENT_RESPONSE>["columns"] = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (product: T_PRODUCT_RESPONSE) => {
        return <p>{product.name}</p>;
      },

      align: "center",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      title: "Import time",
      dataIndex: "importDate",
      key: "importDate",
      render: (date: Date) => {
        const newDate = new Date(date).toLocaleString();
        return <p>{newDate}</p>;
      },
      align: "center",
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
      render: (_, { id, product, quantity }) => (
        <Space size="middle">
          <Tooltip placement="top" title={"Edit"}>
            <button onClick={() => handleOpenModalEdit(id)}>
              <i className="text-blue-400 bi bi-pencil text-md"></i>
            </button>
          </Tooltip>
          {product.stock > quantity && (
            <Tooltip placement="top" title={"Delete"}>
              <button onClick={() => handleOpenModalDelete(id)}>
                <i className="text-red-400 bi bi-trash text-md"></i>
              </button>
            </Tooltip>
          )}
        </Space>
      ),
      align: "center",
    },
  ];

  return (
    <Table<T_SHIPMENT_RESPONSE>
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
  );
};

export default ShipmentTable;
