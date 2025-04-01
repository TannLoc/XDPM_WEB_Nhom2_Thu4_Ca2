"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { GENERIC_PATH } from "@/constants";
import { dashboardServices } from "@/services";
import { T_DASHBOARD_RESPONSE } from "@/types";
import { useGlobalState } from "@/store";
import { usePathname, useRouter } from "next/navigation";


const ManagementPage = () => {
  const [data, setData] = useState<T_DASHBOARD_RESPONSE>();
  // const {currentUser} = useGlobalState();
  // const router = useRouter()
  // const path = usePathname();

  const getDataDashboard = async () => {
    const res = await dashboardServices.getAll();
    if (res) setData(res.data.response);
  };

  useEffect(() => {
    getDataDashboard();
  }, []);

  //  useEffect(() => {
  //    if (currentUser && path.includes(GENERIC_PATH.MANAGEMENT)) {
  //      router.push("/not-found");
  //    }
  //  }, [path]);

  return (
    <section>
      <h1 className="my-5 text-5xl">Dashboard</h1>
      <div className="flex flex-wrap gap-3 pb-5 mb-5 border-b border-gray">
        <div className="relative w-5/12 max-w-[246px] min-w-[220px] h-[160px] p-2 bg-ad-order rounded-lg">
          <div className="flex justify-between">
            <i className="text-3xl bi bi-receipt-cutoff text-ad-order-text"></i>
            <p className="text-2xl text-ad-order-text">
              {data?.totalOrderWaitingConfirm}
            </p>
          </div>
          <Link
            href={`${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.ORDER}`}
            className="absolute bottom-0 text-xl left-2 text-ad-order-text"
          >
            Orders awaiting confirmation
          </Link>
        </div>

        <div className="relative w-5/12 max-w-[246px] min-w-[220px] h-[160px] p-2 bg-ad-order rounded-lg">
          <div className="flex justify-between">
            <i className="text-3xl bi bi-receipt-cutoff text-ad-order-text"></i>
            <p className="text-2xl text-ad-order-text">
              {data?.totalOrderConfirmed}
            </p>
          </div>
          <Link
            href={`${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.ORDER}`}
            className="absolute bottom-0 text-xl left-2 text-ad-order-text"
          >
            Confirmed orders
          </Link>
        </div>

        <div className="relative w-5/12 max-w-[246px] min-w-[220px] h-[160px] p-2 bg-ad-order rounded-lg">
          <div className="flex justify-between">
            <i className="text-3xl bi bi-receipt-cutoff text-ad-order-text"></i>
            <p className="text-2xl text-ad-order-text">
              {data?.totalOrderDelivering}
            </p>
          </div>
          <Link
            href={`${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.ORDER}`}
            className="absolute bottom-0 text-xl left-2 text-ad-order-text"
          >
            Orders in transit
          </Link>
        </div>

        <div className="relative w-5/12 max-w-[246px] min-w-[220px] h-[160px] p-2 bg-ad-order rounded-lg">
          <div className="flex justify-between">
            <i className="text-3xl bi bi-receipt-cutoff text-ad-order-text"></i>
            <p className="text-2xl text-ad-order-text">
              {data?.totalOrderReceived}
            </p>
          </div>
          <Link
            href={`${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.ORDER}`}
            className="absolute bottom-0 text-xl left-2 text-ad-order-text"
          >
            Orders delivered
          </Link>
        </div>

        <div className="relative w-5/12 max-w-[246px] min-w-[220px] h-[160px] p-2 bg-ad-order rounded-lg">
          <div className="flex justify-between">
            <i className="text-3xl bi bi-receipt-cutoff text-ad-order-text"></i>
            <p className="text-2xl text-ad-order-text">
              {data?.totalOrderCancel}
            </p>
          </div>
          <Link
            href={`${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.ORDER}`}
            className="absolute bottom-0 text-xl left-2 text-ad-order-text"
          >
            Cancelled orders
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 pb-5 mb-5 border-b border-gray">
        <div className="relative w-4/12 max-w-[300px] min-w-[220px] h-[160px] p-2 bg-ad-revenue rounded-lg">
          <div className="flex justify-between">
            <i className="text-3xl bi bi-cash text-ad-revenue-text"></i>
            <p className="text-2xl text-ad-revenue-text">
              ${data?.totalRevenue}
            </p>
          </div>
          <p className="absolute bottom-0 text-xl left-2 text-ad-revenue-text">
            Total revenue
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 pb-5 mb-5 border-b border-gray">
        <div className="relative w-4/12 max-w-[300px] min-w-[220px] h-[160px] p-2 bg-ad-product rounded-lg">
          <div className="flex justify-between">
            <i className="text-3xl bi bi-boxes text-ad-product-text"></i>
            <p className="text-2xl text-ad-product-text">
              {data?.totalProduct}
            </p>
          </div>
          <Link
            href={`${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.PRODUCT}`}
            className="absolute bottom-0 text-xl left-2 text-ad-product-text"
          >
            Number of products
          </Link>
        </div>
        <div className="relative w-4/12 max-w-[300px] min-w-[220px] h-[160px] p-2 bg-ad-product rounded-lg">
          <div className="flex justify-between">
            <i className="text-3xl bi bi-boxes text-ad-product-text"></i>
            <p className="text-2xl text-ad-product-text">
              {data?.totalProductSold}
            </p>
          </div>
          <Link
            href={`${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.PRODUCT}`}
            className="absolute bottom-0 text-xl left-2 text-ad-product-text"
          >
            Number of products sold
          </Link>
        </div>
        <div className="relative w-4/12 max-w-[300px] min-w-[220px] h-[160px] p-2 bg-ad-product rounded-lg">
          <div className="flex justify-between">
            <i className="text-3xl bi bi-boxes text-ad-product-text"></i>
            <p className="text-2xl text-ad-product-text">
              {data?.totalProductStock}
            </p>
          </div>
          <Link
            href={`${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.PRODUCT}`}
            className="absolute bottom-0 text-xl left-2 text-ad-product-text"
          >
            Number of products in stock
          </Link>
        </div>
        <div className="relative w-4/12 max-w-[300px] min-w-[220px] h-[160px] p-2 bg-ad-product rounded-lg">
          <div className="flex justify-between">
            <i className="text-3xl bi bi-boxes text-ad-product-text"></i>
            <p className="text-2xl text-ad-product-text">
              {data?.totalProductImport}
            </p>
          </div>
          <Link
            href={`${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.PRODUCT}`}
            className="absolute bottom-0 text-xl left-2 text-ad-product-text"
          >
            Number of products imported
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <div className="relative w-4/12 max-w-[300px] min-w-[220px] h-[160px] p-2 bg-ad-customer rounded-lg">
          <div className="flex justify-between">
            <i className="text-3xl bi bi-cash text-ad-customer-text"></i>
            <p className="text-2xl text-ad-customer-text">
              {data?.totalCustomer}
            </p>
          </div>
          <Link
            href={`${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.CUSTOMER}`}
            className="absolute bottom-0 text-xl left-2 text-ad-customer-text"
          >
            Number of customers
          </Link>
        </div>
        <div className="relative w-4/12 max-w-[300px] min-w-[220px] h-[160px] p-2 bg-ad-customer rounded-lg">
          <div className="flex justify-between">
            <i className="text-3xl bi bi-cash text-ad-customer-text"></i>
            <p className="text-2xl text-ad-customer-text">
              {data?.totalBrand}
            </p>
          </div>
          <Link
            href={`${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.BRAND}`}
            className="absolute bottom-0 text-xl left-2 text-ad-customer-text"
          >
            Number of brands
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ManagementPage;
