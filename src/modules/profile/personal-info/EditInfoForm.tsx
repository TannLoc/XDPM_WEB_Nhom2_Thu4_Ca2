'use client'
import { Button, DatePicker, Form, Input, message, UploadFile } from "antd";
import React, { useState } from "react";

import { ERROR, SUCCESS } from "@/constants";
import { UploadImage } from "@/modules/layout";
import { userServices } from "@/services";
import { useGlobalState } from "@/store";
import { T_USER_REQUEST } from "@/types";
import { uploadImage } from "@/utils";

const EditInfoForm = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();
  const { getUser } = useGlobalState();

  const handleEditProfile = async (values: T_USER_REQUEST) => {
    const avatar = await uploadImage(fileList[0] || null);
    const data = {
      avatarId: avatar ? avatar.id : null,
      email: values?.email,
      fullName: values?.fullName,
      phoneNumber: values?.phoneNumber,
      birthday: new Date(values.birthday!),
    };
    try {
      const res = await userServices.editUser(data);
      if (res) {
        message.success(SUCCESS.EDIT);
        form.resetFields();
        setFileList([]);
        await getUser();
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="w-1/2">
      <Form
        form={form}
        labelAlign="left"
        labelCol={{ span: 5 }}
        layout="horizontal"
        style={{ maxWidth: 600, paddingLeft: 60 }}
        onFinish={(values) => handleEditProfile(values)}
      >
        <Form.Item>
          <UploadImage
            listTypeCustom="picture-circle"
            fileList={fileList}
            setFileList={setFileList}
          />
        </Form.Item>
        <Form.Item label="Name" name="fullName">
          <Input placeholder="Full name"></Input>
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ type: "email", message: ERROR.EMAIL }]}
        >
          <Input placeholder="Email"></Input>
        </Form.Item>
        <Form.Item
          label="Phone number"
          name="phoneNumber"
          rules={[{ max: 10, min: 10, message: ERROR.PHONE_NUMBER }]}
        >
          <Input placeholder="Phone number"></Input>
        </Form.Item>
        <Form.Item label="Birthday" name="birthday">
          <DatePicker />
        </Form.Item>
        <Form.Item className="text-end">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditInfoForm;
