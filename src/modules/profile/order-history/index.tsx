import { Table, TableProps } from "antd";

const OrderHistory = () => {
  const columns: TableProps<any>["columns"] = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      align: "center",
    },
    {
      title: "Quantity",
      dataIndex: "totalQuantity",
      key: "totalQuantity",
      align: "center",
    },
    {
      title: "Total",
      dataIndex: "totalBill",
      key: "totalBill",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "state",
      key: "state",
      align: "center",
    },
    {
      title: "Order date",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
    },
    {
      title: "Action",
      align: "center",
    },
  ];

  return (
    <>
      <Table columns={columns} />
    </>
  );
};

export default OrderHistory;
