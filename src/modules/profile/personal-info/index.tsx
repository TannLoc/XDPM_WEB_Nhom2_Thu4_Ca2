"use client";
import { userServices } from "@/services";
import { T_USER_RESPONSE } from "@/types";
import { formatDate } from "@/utils";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import EditInfoForm from "./EditInfoForm";
import { useGlobalState } from "@/store";

const PersonalInformation = () => {
  const [isActiveForm, setIsActiveForm] = useState<boolean>(false);
  const { currentUser } = useGlobalState();

  const toggleActiveEditForm = () => {
    setIsActiveForm(prevState => !prevState);
  }

  return (
    <div>
      <div className="flex">
        <div className="w-1/2">
          <p className="text-lg text-text-gray-color">
            <span className="font-semibold">Full name: </span>
            {currentUser?.fullName}
          </p>
          <p className="mt-2 text-lg text-text-gray-color">
            <span className="font-semibold">Email: </span>
            {currentUser?.email}
          </p>
          <p className="mt-2 text-lg text-text-gray-color">
            <span className="font-semibold">Phone number: </span>
            {currentUser?.phoneNumber}
          </p>
          <p className="mt-2 text-lg text-text-gray-color">
            <span className="font-semibold">Birthday: </span>
            {currentUser?.birthday
              ? formatDate(currentUser?.birthday, false, false)
              : "Chưa có thông tin"}
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
        {isActiveForm && <EditInfoForm />}
      </div>
    </div>
  );
};

export default PersonalInformation;
