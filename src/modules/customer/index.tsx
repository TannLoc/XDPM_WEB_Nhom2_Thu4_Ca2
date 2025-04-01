"use client";
import { Table, TableProps } from "antd";
import React, { useEffect, useState } from "react";

import { customerServices } from "@/services";
import { formatDate } from "@/utils";
import { T_PAGINATION, T_CUSTOMER_RESPONSE } from "@/types";

const CustomerTable = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [tableParams, setTableParams] = useState<T_PAGINATION>({
    page: 1,
    pageSize: 10,
  });
  const columns: TableProps<T_CUSTOMER_RESPONSE>["columns"] = [
    {
      title: "Full name",
      dataIndex: "fullName",
      key: "fullName",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
    },
    {
      title: "State",
      dataIndex: "isActive",
      key: "isActive",
      render(_, { isActive }) {
        if (isActive) return <p className="text-green">Active</p>;
        else return <p className="text-red">Not active</p>;
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
  ];

  const getDataCustomer = async (params?: T_PAGINATION) => {
    setLoading(true);
    try {
      const res = await customerServices.getOne(params);
      if (res) {
        setTableParams(res.data.meta.pagination);
        setData(res.data.response);
        setLoading(false);
      }
    } catch (error) {
      throw error;
    }
  };

  const handlePagination = (page: number, pageSize: number) => {
    const params = { page: page, pageSize: pageSize };
    getDataCustomer(params);
  };

  useEffect(() => {
    getDataCustomer();
  }, []);

  return (
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
  );
};

export default CustomerTable;
