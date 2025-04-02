import { message, Modal } from "antd";
import React, { useEffect, useState } from "react";

import { productAdminService } from "@/services";
import { T_ONE_PRODUCT_RESPONSE, T_PRODUCT_REQUEST } from "@/types";
import ProductForm from "./ProductForm";
import { SUCCESS } from "@/constants";

type Props = {
  isModalEditOpen: boolean;
  setIsModalEditOpen: (value: boolean) => void;
  idProduct: number;
  setIdProduct: (value: number) => void;
  fetchDataProduct: () => void;
};

const ProductEdit = (props: Props) => {
  const {
    isModalEditOpen,
    setIsModalEditOpen,
    idProduct,
    setIdProduct,
    fetchDataProduct,
  } = props;
  const [dataGetOneProduct, setDataGetOneProduct] =
    useState<T_ONE_PRODUCT_RESPONSE>();

  const handleCancel = () => {
    setIsModalEditOpen(false);
    setIdProduct(0);
  };

  const handleGetOneProduct = async (id: number) => {
    try {
      const res = await productAdminService.getOne(id);
      if (res) {
        setDataGetOneProduct(res.data.response);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleEditOneProduct = async (data: T_PRODUCT_REQUEST) => {
    const res = await productAdminService.edit(idProduct, data);
    if (res) {
      message.success(SUCCESS.EDIT);
      handleCancel();
      fetchDataProduct();
    }
  };

  useEffect(() => {
    if (idProduct === 0) {
      return;
    } else {
      handleGetOneProduct(idProduct);
    }
  }, [idProduct]);

  return (
    <Modal
      title="Edit product"
      open={isModalEditOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <ProductForm
        dataGetOneProduct={dataGetOneProduct}
        handleEditOneProduct={handleEditOneProduct}
      />
    </Modal>
  );
};

export default ProductEdit;
