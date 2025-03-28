"use client";
import { ERROR } from "@/constants";
import { Button, DatePicker, Form, Input } from "antd";
import React, { useState } from "react";

const PersonalInformation = () => {
  const [isActiveForm, setIsActiveForm] = useState<boolean>(false);
  const [form] = Form.useForm();

  const toggleActiveEditForm = () => {
    setIsActiveForm((prevState) => !prevState);
  };

  return (
    <div>
      <div className="flex">
        <div className="w-1/2">
          <p className="text-lg text-text-gray-color">
            <span className="font-semibold">Full name: </span>
          </p>
          <p className="mt-2 text-lg text-text-gray-color">
            <span className="font-semibold">Email: </span>
          </p>
          <p className="mt-2 text-lg text-text-gray-color">
            <span className="font-semibold">Phone number: </span>
          </p>
          <p className="mt-2 text-lg text-text-gray-color">
            <span className="font-semibold">Birthday: </span>
          </p>
          <div className="text-end">
            <Button
              type="primary"
              iconPosition="end"
              icon={<i className="bi bi-caret-right-fill"></i>}
              onClick={toggleActiveEditForm}
            >
              Edit
            </Button>
          </div>
        </div>
        {isActiveForm && (
          <div className="w-1/2">
            <Form
              form={form}
              labelAlign="left"
              labelCol={{ span: 5 }}
              layout="horizontal"
              style={{ maxWidth: 600, paddingLeft: 60 }}
            >
              <Form.Item></Form.Item>
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
        )}
      </div>
    </div>
  );
};

export default PersonalInformation;
