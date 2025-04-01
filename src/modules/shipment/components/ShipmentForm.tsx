import { Button, DatePicker, Form, Input, InputNumber, message } from "antd";
import React, { useEffect } from "react";

import { SelectOption } from "@/modules/layout";
import { T_SHIPMENT_REQUEST, T_SHIPMENT_RESPONSE } from "@/types";
import { convertStringToDate } from "@/utils";
import { INFO, PICKLIST } from "@/constants";

type Props = {
  handleCreateShipment?: (data: T_SHIPMENT_REQUEST) => void;
  dataGetOneShipment?: T_SHIPMENT_RESPONSE;
  handleEditOneShipment?: (data: T_SHIPMENT_REQUEST) => void;
};

const ShipmentForm = (props: Props) => {
  const { handleCreateShipment, dataGetOneShipment, handleEditOneShipment } =
    props;
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const handleClearData = () => {
    form.resetFields();
  };

  const onFinish = ({ values }: { values: T_SHIPMENT_REQUEST }) => {
    messageApi
      .open({
        type: "loading",
        content: INFO.LOADING,
      })
      .then(async () => {
        const formatDate = new Date(values.importDate);
        const data = {
          productId: values.productId,
          quantity: values.quantity,
          importDate: formatDate,
        };
        if (handleCreateShipment) {
          handleCreateShipment(data);
        }
        if (handleEditOneShipment) {
          handleEditOneShipment(data);
        }
      })
      .then(handleClearData);
  };

  useEffect(() => {
    if (dataGetOneShipment) {
      const formatDate = convertStringToDate(dataGetOneShipment?.importDate);
      form.setFieldValue("productName", dataGetOneShipment?.product.name);
      form.setFieldValue("quantity", dataGetOneShipment?.quantity);
      form.setFieldValue("importDate", formatDate);
    }
  }, [dataGetOneShipment]);

  return (
    <>
      {contextHolder}
      <Form
        layout="vertical"
        form={form}
        onFinish={(values) => onFinish({ values })}
      >
        {dataGetOneShipment ? (
          <Form.Item
            label="Product"
            name="productName"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Input disabled />
          </Form.Item>
        ) : (
          <Form.Item
            label="Product"
            name="productId"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <SelectOption picklistType={PICKLIST.PRODUCT}></SelectOption>
          </Form.Item>
        )}

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <InputNumber placeholder="Quantity" min={0} />
        </Form.Item>
        <Form.Item
          label="Import time"
          name="importDate"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <DatePicker showTime />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ShipmentForm;
