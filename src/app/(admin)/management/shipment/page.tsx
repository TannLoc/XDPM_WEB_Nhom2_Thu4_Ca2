"use client";
import { Button } from "antd";
import { useEffect, useState } from "react";

import { T_SHIPMENT_RESPONSE, T_PAGINATION } from "@/types";
import { shipmentServices } from "@/services";
import { ShipmentTable, ShipmentCreate, ShipmentDelete, ShipmentEdit } from "@/modules/shipment";

const ShipmentPage = () => {
  const [data, setData] = useState<T_SHIPMENT_RESPONSE[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [tableParams, setTableParams] = useState<T_PAGINATION>({
    page: 1,
    pageSize: 10,
  });
  const [idShipment, setIdShipment] = useState<number>(0);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false);

  const openModalCreate = () => {
    setIsModalCreateOpen((prevState) => !prevState);
  };

  const fetchDataShipment = async (params?: T_PAGINATION) => {
    setLoading(true);
    try {
      const res = await shipmentServices.getAll(params);
      if (res) {
        setLoading(false);
        setTableParams(res.data.meta.pagination);
        setData(res.data.response);
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchDataShipment();
  }, []);

  return (
    <section>
      <h1 className="my-5 text-5xl">Shipment</h1>
      <div className="mb-5 text-end">
        <Button onClick={openModalCreate}>Create new shipment</Button>
      </div>
      <ShipmentTable
        dataSource={data}
        loading={loading}
        tableParams={tableParams}
        setIdShipment={setIdShipment}
        setIsModalDeleteOpen={setIsModalDeleteOpen}
        setIsModalEditOpen={setIsModalEditOpen}
        fetchDataShipment={fetchDataShipment}
      />
      <ShipmentCreate
        isModalCreateOpen={isModalCreateOpen}
        setIsModalCreateOpen={setIsModalCreateOpen}
        fetchDataShipment={fetchDataShipment}
      />
      <ShipmentEdit
        isModalEditOpen={isModalEditOpen}
        setIsModalEditOpen={setIsModalEditOpen}
        idShipment={idShipment}
        setIdShipment={setIdShipment}
        fetchDataShipment={fetchDataShipment}
      />
      <ShipmentDelete
        isModalDeleteOpen={isModalDeleteOpen}
        setIsModalDeleteOpen={setIsModalDeleteOpen}
        idShipment={idShipment}
        fetchDataShipment={fetchDataShipment}
      />
    </section>
  );
};

export default ShipmentPage;
