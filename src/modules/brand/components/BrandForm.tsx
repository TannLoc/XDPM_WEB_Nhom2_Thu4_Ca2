import { Button, Form, Input, message, UploadFile } from "antd";
import React, { useEffect, useState } from "react";

import { T_BRAND_RESPONE, T_BRAND_REQUEST } from "@/types";
import { UploadImage } from "@/modules/layout";
import { uploadImage } from "@/utils";
import { INFO } from "@/constants";

type Props = {
  handleCreateBrand?: (data: T_BRAND_REQUEST) => void;
  dataGetOneBrand?: T_BRAND_RESPONE;
  handleEditOneBrand?: (data: T_BRAND_REQUEST) => void;
};

const BrandForm = (props: Props) => {
  const { handleCreateBrand, dataGetOneBrand, handleEditOneBrand } = props;
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [logo, setLogo] = useState<UploadFile>();

  const handleClearData = () => {
    form.resetFields();
    setFileList([]);
  };

  const onFinish = ({ values }: { values: T_BRAND_REQUEST }) => {
    messageApi
      .open({
        type: "loading",
        content: INFO.LOADING,
      })
      .then(async () => {
        if (handleCreateBrand) {
          const image = await uploadImage(fileList[0] || null);
          const data = { name: values.name, imageId: image?.id };
          handleCreateBrand(data);
        }
        if (handleEditOneBrand) {
          let image;
          let data;
          if (fileList !== null && logo?.uid === fileList[0]?.uid) {
            data = { name: values.name };
          } else {
            console.log("nhay vo day");

            image = await uploadImage(fileList[0] || null);
            data = { name: values.name, imageId: image?.id };
          }
          handleEditOneBrand(data);
        }
      })
      .then(handleClearData);
  };

  useEffect(() => {
    if (dataGetOneBrand) {
      form.setFieldValue("name", dataGetOneBrand?.name);
      const { image } = dataGetOneBrand || {};
      if (image) {
        const file = {
          uid: String(image.id),
          name: "Thumbnail",
          url: image.url,
        };
        setLogo(file);
        setFileList([file]);
      }
    }
  }, [dataGetOneBrand]);

  return (
    <>
      {contextHolder}
      <Form
        layout="vertical"
        form={form}
        onFinish={(values) => onFinish({ values })}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input type="text" placeholder="Name" />
        </Form.Item>
        <Form.Item label="Image" name="image">
          <UploadImage fileList={fileList} setFileList={setFileList} />
        </Form.Item>
        <Form.Item className="text-end">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default BrandForm;
