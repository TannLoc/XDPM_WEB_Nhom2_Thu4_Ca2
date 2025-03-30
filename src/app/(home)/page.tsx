"use client";
import { defaultProductParams } from "@/constants";
import { Article, Banner } from "@/modules/layout";
import { ProductList } from "@/modules/product";
import { useGlobalState } from "@/store";
import { useEffect } from "react";

const HomePage = () => {
  const { products, fetchDataProducts } = useGlobalState();

  useEffect(() => {
    fetchDataProducts(defaultProductParams);
  }, []);

  return (
    <>
      <Banner />
      <ProductList products={products} />
      <Article />
    </>
  );
};

export default HomePage;
