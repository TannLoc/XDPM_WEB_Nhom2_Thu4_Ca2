"use client";
import { message, Space, Table, TableProps } from "antd";
import React, { useEffect, useState } from "react";

import {
  INFO,
  ORDER_STATE,
  ORDER_STATE_GENERIC,
  SUCCESS,
} from "@/constants";
import { orderAdminServices } from "@/services";
import { T_ORDER_RESPONSE, T_PAGINATION } from "@/types";
import { formatDate } from "@/utils";
import  OrderEdit  from "./OrderEdit";

const OrderTable = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState<T_ORDER_RESPONSE[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [tableParams, setTableParams] = useState<T_PAGINATION>({
    page: 1,
    pageSize: 10,
  });
  const [idOrder, setIdOrder] = useState<number>(0);

  const handleGetDataOrder = async (params?: T_PAGINATION) => {
    setLoading(true);
    try {
      const res = await orderAdminServices.getAll(params);
      if (res) {
        setLoading(false);
        setTableParams(res.data.meta.pagination);
        setData(res.data.response);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleSetStateOrder = async (id: number, state: string) => {
    messageApi
      .open({
        type: "loading",
        content: INFO.LOADING,
      })
      .then(async () => {
        const data = { state: state };
        const res = await orderAdminServices.updateState(id, data);
        if (res) {
          handleGetDataOrder();
          message.success(SUCCESS.SET_STATE);
        }
      });
  };

  useEffect(() => {
    handleGetDataOrder();
  }, []);

  const handlePagination = (page: number, pageSize: number) => {
    const params = { page: page, pageSize: pageSize };
    handleGetDataOrder(params);
  };

  const columns: TableProps<T_ORDER_RESPONSE>["columns"] = [
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
      render: (text) => <p>${text}</p>,
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      align: "center",
      render: (_, { state }) => {
        const orderState = ORDER_STATE.map((item, index) => {
          if (state === item.state)
            return (
              <p key={index} className={`${item.color}`}>
                {item.title}
              </p>
            );
        });
        return orderState;
      },
    },
    {
      title: "Order date",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (createdAt: Date) => {
        const newDate = formatDate(createdAt, true, true);
        return <p>{newDate}</p>;
      },
    },
    {
      title: "Action",
      render: (_, { id, state }) => {
        if (state === ORDER_STATE_GENERIC.WAITING_CONFIRM) {
          return (
            <Space size="middle">
              <button
                className="text-green"
                onClick={() =>
                  handleSetStateOrder(id, ORDER_STATE_GENERIC.CONFIRMED)
                }
              >
                Confirm
              </button>
              <button
                className="text-blue"
                onClick={() => setIdOrder(id)}
              >
                Edit
              </button>
              <button
                className="text-red"
                onClick={() =>
                  handleSetStateOrder(id, ORDER_STATE_GENERIC.CANCELED)
                }
              >
                Cancel
              </button>
            </Space>
          );
        } else if (state === ORDER_STATE_GENERIC.CONFIRMED) {
          return (
            <Space size="middle">
              <button
                className="text-blue"
                onClick={() =>
                  handleSetStateOrder(id, ORDER_STATE_GENERIC.DELIVERING)
                }
              >
                Delivery
              </button>
            </Space>
          );
        }
      },
      align: "center",
    },
  ];

  return (
    <>
      {contextHolder}
      <Table
        dataSource={data}
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
      <OrderEdit
        idOrder={idOrder}
        setIdOrder={setIdOrder}
        handleGetDataOrderAdmin={handleGetDataOrder}
        role="admin"
      />
    </>
  );
};

export default OrderTable;
