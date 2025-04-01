import { SetStateAction } from "react";
import { Image, Space, Table, TableProps, Tooltip } from "antd";

import { T_BRAND_RESPONE, T_PAGINATION } from "@/types";
import { formatDate } from "@/utils";

type Props = {
  dataSource: T_BRAND_RESPONE[];
  loading: boolean;
  tableParams: T_PAGINATION;
  setIdBrand: React.Dispatch<SetStateAction<number>>;
  setIsModalEditOpen: React.Dispatch<SetStateAction<boolean>>;
  setIsModalDeleteOpen: React.Dispatch<SetStateAction<boolean>>;
  fetchDataBrand: (params: T_PAGINATION) => void;
};

const BrandTable = (props: Props) => {
  const {
    dataSource,
    loading,
    tableParams,
    setIdBrand,
    setIsModalEditOpen,
    setIsModalDeleteOpen,
    fetchDataBrand,
  } = props;

  const handleOpenModalDelete = (id: number) => {
    setIsModalDeleteOpen(true);
    setIdBrand(id);
  };

  const handleOpenModalEdit = (id: number) => {
    setIsModalEditOpen(true);
    setIdBrand(id);
  };

  const handlePagination = (page: number, pageSize: number) => {
    const params = { page: page, pageSize: pageSize };
    fetchDataBrand(params);
  };

  const columns: TableProps<T_BRAND_RESPONE>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (_, { name, image }) => (
        <div className="flex items-center justify-center gap-2">
          <Image
            src={image?.url || "/images/no-image.png"}
            alt="Logo"
            width={60}
            height={60}
          />
          <p>{name}</p>
        </div>
      ),
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
          <Tooltip placement="top" title={"Delete"}>
            <button onClick={() => handleOpenModalDelete(id)}>
              <i className="text-red-400 bi bi-trash text-md"></i>
            </button>
          </Tooltip>
        </Space>
      ),
      align: "center",
    },
  ];

  return (
    <Table<T_BRAND_RESPONE>
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

export default BrandTable;
