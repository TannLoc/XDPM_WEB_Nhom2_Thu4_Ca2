"use client";
import { Button, Drawer, Form, message } from "antd";
import React, { SetStateAction, useEffect, useState } from "react";

import {
  orderAdminServices,
  orderClientServices,
} from "@/services";
import { T_ONE_ORDER_RESPONSE } from "@/types";
import OrderForm from "./OrderForm";
import { INFO, SUCCESS } from "@/constants";

type Props = {
  idOrder: number;
  setIdOrder: React.Dispatch<SetStateAction<number>>;
  handleGetDataOrderAdmin?: () => void;
  handleGetDataOrderCustomer?: () => void;
  role: string;
};

const OrderEdit = (props: Props) => {
  const {
    idOrder,
    setIdOrder,
    handleGetDataOrderAdmin,
    handleGetDataOrderCustomer,
    role,
  } = props;
  const [messageApi, contextholder] = message.useMessage();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [data, setData] = useState<T_ONE_ORDER_RESPONSE>();

  const handleGetOneOrder = async (id: number) => {
    setOpen(true);
    setLoading(true);
    let res;
    if (role === "admin") res = await orderAdminServices.getOne(id);
    else if (role === "customer") res = await orderClientServices.getOne(id);
    if (res) {
      setData(res.data.response);
      setLoading(false);
    }
  };

  const onClose = () => {
    setOpen(false);
    setData(undefined);
    setIdOrder(0);
    form.resetFields();
  };

  const handleSubmit = () => {
    messageApi
      .open({
        type: "loading",
        content: INFO.LOADING,
      })
      .then(async () => {
        await form.validateFields();
        const text = form.getFieldValue("text");
        const city = form.getFieldValue("city");
        const district = form.getFieldValue("district");
        const ward = form.getFieldValue("ward");
        const note = form.getFieldValue("note");
        const data = { city, district, ward, text, note };
        let res;
        if (role === "admin") res = await orderAdminServices.editOne(idOrder, data);
        else if (role === "customer")
          res = await orderClientServices.editOne(idOrder, data);
        if (res) {
          if (handleGetDataOrderAdmin) handleGetDataOrderAdmin();
          if (handleGetDataOrderCustomer) handleGetDataOrderCustomer();
          message.success(SUCCESS.EDIT);
          onClose();
        }
      });
  };

  useEffect(() => {
    if (idOrder !== 0 && idOrder !== null) handleGetOneOrder(idOrder);
    else onClose();
  }, [idOrder]);

  useEffect(() => {
    if (data) {
      form.setFieldValue("text", data.delivery.text);
      form.setFieldValue("city", data.delivery.city);
      form.setFieldValue("district", data.delivery.district);
      form.setFieldValue("ward", data.delivery.ward);
      form.setFieldValue("note", data.delivery.note);
    }
  }, [data]);

  return (
    <>
      {contextholder}
      <Drawer
        title={`Edit order: ${data?.code}`}
        placement="right"
        onClose={onClose}
        open={open}
        loading={loading}
        size="large"
        extra={
          <Button onClick={handleSubmit} type="primary">
            Submit
          </Button>
        }
      >
        <OrderForm form={form} />
      </Drawer>
    </>
  );
};

export default OrderEdit;
