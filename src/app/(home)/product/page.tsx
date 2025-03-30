"use client";
import React, { useEffect, useState } from "react";
import { Button } from "antd";

import { ProductList } from "@/modules/product";
import { Filter, PaginationClient, Sort } from "@/modules/layout";
import { defaultProductParams } from "@/constants";
import { useGlobalState } from "@/store";

const ProductPage = () => {
  const { products, fetchDataProducts } = useGlobalState();
  const [filterProductOpen, setSilterProductOpen] = useState<boolean>(false);

  const showFilterProduct = () => {
    setSilterProductOpen(true);
  };

  const closeFilterProduct = () => {
    setSilterProductOpen(false);
  };

  useEffect(() => {
    fetchDataProducts(defaultProductParams);
  }, []);

  return (
    <>
      <div className="flex justify-between mt-10">
        <div className="flex items-center gap-2">
          <Button
            icon={<i className="bi bi-funnel"></i>}
            onClick={showFilterProduct}
          >
            Filter
          </Button>
          <Filter
            filterProductOpen={filterProductOpen}
            closeFilterProduct={closeFilterProduct}
          />
        </div>
        <Sort />
      </div>
      <ProductList products={products} />
      <PaginationClient />
    </>
  );
};

export default ProductPage;
