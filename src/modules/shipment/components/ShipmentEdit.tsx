import { message, Modal } from "antd";
import React, { useEffect, useState } from "react";

import { shipmentServices } from "@/services";
import { T_SHIPMENT_REQUEST, T_SHIPMENT_RESPONSE } from "@/types";
import ShipmentForm from "./ShipmentForm";
import { SUCCESS } from "@/constants";

type Props = {
  isModalEditOpen: boolean;
  setIsModalEditOpen: (value: boolean) => void;
  idShipment: number;
  setIdShipment: (value: number) => void;
  fetchDataShipment: () => void;
};

const ShipmentEdit = (props: Props) => {
  const {
    isModalEditOpen,
    setIsModalEditOpen,
    idShipment,
    setIdShipment,
    fetchDataShipment,
  } = props;

  const [dataGetOneShipment, setDataGetOneShipment] =
    useState<T_SHIPMENT_RESPONSE>();

  const handleCancel = () => {
    setIsModalEditOpen(false);
    setIdShipment(0);
  };

  const handleGetOneShipment = async (id: number) => {
    try {
      const res = await shipmentServices.getOne(id);
      if (res) {
        setDataGetOneShipment(res.data.response);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleEditOneShipment = async (data: T_SHIPMENT_REQUEST) => {
    const res = await shipmentServices.edit(idShipment, data);
    if (res) {
      message.success(SUCCESS.EDIT);
      handleCancel();
      fetchDataShipment();
    }
  };

  useEffect(() => {
    if (idShipment === 0) {
      return;
    } else {
      handleGetOneShipment(idShipment);
    }
  }, [idShipment]);

  return (
    <Modal
      title="Edit shipment"
      open={isModalEditOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <ShipmentForm
        dataGetOneShipment={dataGetOneShipment}
        handleEditOneShipment={handleEditOneShipment}
      />
    </Modal>
  );
};

export default ShipmentEdit;
