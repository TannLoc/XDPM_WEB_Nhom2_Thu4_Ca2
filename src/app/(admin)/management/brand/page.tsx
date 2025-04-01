"use client";
import { Button } from "antd";
import { useEffect, useState } from "react";

import { BrandTable, BrandCreate, BrandDelete, BrandEdit } from "@/modules/brand";
import { T_BRAND_RESPONE } from "@/types";
import { brandAdminServices } from "@/services";
import { T_PAGINATION } from "@/types";


const BrandPage = () => {
  const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false);
  const [data, setData] = useState<T_BRAND_RESPONE[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [tableParams, setTableParams] = useState<T_PAGINATION>({
    page: 1,
    pageSize: 10,
  });
  const [idBrand, setIdBrand] = useState<number>(0);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);

  const openModalCreate = () => {
    setIsModalCreateOpen((prevState) => !prevState);
  };

  const fetchDataBrand = async (params?: T_PAGINATION) => {
    setLoading(true);
    try {
      const res = await brandAdminServices.getAll(params);
      if (res) {
        setTableParams(res.data.meta.pagination);
        setLoading(false);
        setData(res.data.response);
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchDataBrand();
  }, []);

  return (
    <section>
      <h1 className="my-5 text-5xl">Brand</h1>
      <div className="mb-5 text-end">
        <Button onClick={openModalCreate}>Create new brand</Button>
      </div>
      <BrandTable
        dataSource={data}
        loading={loading}
        tableParams={tableParams}
        setIdBrand={setIdBrand}
        setIsModalDeleteOpen={setIsModalDeleteOpen}
        setIsModalEditOpen={setIsModalEditOpen}
        fetchDataBrand={fetchDataBrand}
      />
      <BrandCreate
        isModalCreateOpen={isModalCreateOpen}
        setIsModalCreateOpen={setIsModalCreateOpen}
        fetchDataBrand={fetchDataBrand}
      />
      <BrandEdit
        idBrand={idBrand}
        isModalEditOpen={isModalEditOpen}
        setIsModalEditOpen={setIsModalEditOpen}
        setIdBrand={setIdBrand}
        fetchDataBrand={fetchDataBrand}
      />
      <BrandDelete
        isModalDeleteOpen={isModalDeleteOpen}
        setIsModalDeleteOpen={setIsModalDeleteOpen}
        idBrand={idBrand}
        fetchDataBrand={fetchDataBrand}
      />
    </section>
  );
};

export default BrandPage;
