"use client";
import { Button } from "antd";
import React, { useEffect, useState } from "react";

import { ProductTable, ProductCreate, ProductEdit } from "@/modules/product";
import { productAdminService } from "@/services";
import { T_PRODUCT_RESPONSE, T_PAGINATION } from "@/types";

const ProductPage = () => {
  const [data, setData] = useState<T_PRODUCT_RESPONSE[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [tableParams, setTableParams] = useState<T_PAGINATION>({
    page: 1,
    pageSize: 10,
  });
  const [idProduct, setIdProduct] = useState<number>(0);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);
  const openModalCreate = () => {
    setIsModalCreateOpen((prevState) => !prevState);
  };

  const fetchDataProduct = async (params?: T_PAGINATION) => {
    setLoading(true);
    try {
      const res = await productAdminService.getAll(params);
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
    fetchDataProduct();
  }, []);

  return (
    <section>
      <h1 className="my-5 text-5xl">Product</h1>
      <div className="mb-5 text-end">
        <Button onClick={openModalCreate}>Create new Product</Button>
      </div>
      <ProductTable
        dataSource={data}
        loading={loading}
        tableParams={tableParams}
        setIdProduct={setIdProduct}
        setIsModalEditOpen={setIsModalEditOpen}
        fetchDataProduct={fetchDataProduct}
      />
      <ProductCreate
        isModalCreateOpen={isModalCreateOpen}
        setIsModalCreateOpen={setIsModalCreateOpen}
        fetchDataProduct={fetchDataProduct}
      />
      <ProductEdit
        isModalEditOpen={isModalEditOpen}
        setIsModalEditOpen={setIsModalEditOpen}
        idProduct={idProduct}
        setIdProduct={setIdProduct}
        fetchDataProduct={fetchDataProduct}
      />
    </section>
  );
};

export default ProductPage;
