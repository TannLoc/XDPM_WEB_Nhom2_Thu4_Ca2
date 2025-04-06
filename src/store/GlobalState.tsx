"use client";
import { productClientService, userServices } from "@/services";
import { T_PAGINATION, T_PRODUCT_PARAMS, T_PRODUCT_RESPONSE, T_USER_RESPONSE } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { T_CART_RESPONSE } from "@/types/cartType";
import { cartServices } from "@/services/cartServices";
import { defaultProductParams } from "@/constants";

const GlobalStateContext = createContext<any>(null);

export const GlobalStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentUser, setCurrentUser] = useState<T_USER_RESPONSE | null>(null);
  const [cart, setCart] = useState<T_CART_RESPONSE[]>([]);
  const [products, setProducts] = useState<T_PRODUCT_RESPONSE[]>([]);
  const [productParams, setProductParams] = useState<T_PRODUCT_PARAMS>(defaultProductParams);
  const [paginationParams, setPaginationParams] = useState<T_PAGINATION>({
    page: 1,
    pageSize: 8,
  });

  const getUser = async () => {
    try {
      const res = await userServices.getInfo();
      if (res) {
        Cookies.set("customer", JSON.stringify(res.data.response), {
          secure: true,
          path: "/",
        });
        setCurrentUser(res.data.response);
      }
    } catch (error) {
      throw error;
    }
  };

  const getCart = async () => {
    const res = await cartServices.getAll();
    if (res) setCart(res.data.response);
  };

  const fetchDataProducts = async (params?: T_PRODUCT_PARAMS) => {
    const res = await productClientService.getAll(params);
    if (res) {
      setProducts(res.data.response);
      setPaginationParams(res.data.meta.pagination);
    }
  };

  useEffect(() => {
    const customer = Cookies.get("customer");
    if (customer) {
      const customerParse = JSON.parse(customer);
      setCurrentUser(customerParse || undefined);
    }
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.role === "CUSTOMER") {
      getCart();
    }
  }, [currentUser]);

  useEffect(() => {
    fetchDataProducts(productParams);
  }, [productParams]);

  const values = {
    currentUser,
    getUser,
    getCart,
    cart,
    products,
    productParams,
    setProductParams,
    paginationParams,
    fetchDataProducts,
  };

  return (
    <GlobalStateContext.Provider value={values}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
