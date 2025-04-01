import { message, Modal } from "antd";
import React, { useEffect, useState } from "react";

import BrandForm from "./BrandForm";
import { brandAdminServices } from "@/services";
import { T_BRAND_RESPONE, T_BRAND_REQUEST } from "@/types";
import { SUCCESS } from "@/constants";

type Props = {
  isModalEditOpen: boolean;
  setIsModalEditOpen: (value: boolean) => void;
  idBrand: number;
  setIdBrand: (value: number) => void;
  fetchDataBrand: () => void;
};

const BrandEdit = (props: Props) => {
  const {
    isModalEditOpen,
    setIsModalEditOpen,
    idBrand,
    setIdBrand,
    fetchDataBrand,
  } = props;
  const [dataGetOneBrand, setDataGetOneBrand] = useState<T_BRAND_RESPONE>();

  const handleCancel = () => {
    setIsModalEditOpen(false);
    setIdBrand(0);
    setDataGetOneBrand(undefined);
  };

  const handleGetOneBrand = async (id: number) => {
    try {
      const res = await brandAdminServices.getOne(id);
      if (res) {
        setDataGetOneBrand(res.data.response);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleEditOneBrand = async (data: T_BRAND_REQUEST) => {
    const res = await brandAdminServices.edit(idBrand, data);
    if (res) {
      message.success(SUCCESS.EDIT);
      handleCancel();
      fetchDataBrand();
    }
  };

  useEffect(() => {
    if (idBrand === 0) {
      return;
    } else {
      handleGetOneBrand(idBrand);
    }
  }, [idBrand]);

  return (
    <Modal
      title="Edit brand"
      open={isModalEditOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <BrandForm
        dataGetOneBrand={dataGetOneBrand}
        handleEditOneBrand={handleEditOneBrand}
      />
    </Modal>
  );
};

export default BrandEdit;
