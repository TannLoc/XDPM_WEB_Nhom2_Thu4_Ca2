"use client";
import { Button, Steps } from "antd";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Checkcart, Checkout, Complete } from "@/modules/order";
import { GENERIC_PATH } from "@/constants";
import { T_CART_RESPONSE } from "@/types";
import { formatDate } from "@/utils";

const steps = [
  {
    title: "Check cart",
  },
  {
    title: "Checkout",
  },
  {
    title: "Result",
  },
];

const OrderPageClient = () => {
  const [current, setCurrent] = useState(0);
  const [itemsOrder, setItemsOrder] = useState<T_CART_RESPONSE[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [quantityItems, setQuantityItems] = useState<number>(0);
  const [paymentInfo, setPaymentInfo] = useState({});
  const route = useRouter();
  const searchParams = useSearchParams();

  const nextStep = () => {
    setCurrent(current + 1);
  };

  const prevStep = () => {
    setCurrent(current - 1);
  };

  const handleOrderComplete = () => {
    route.push(GENERIC_PATH.HOME);
    setPaymentInfo({});
  };

  useEffect(() => {
    const orderCode = searchParams.get("orderCode");
    const payDate = searchParams.get("payDate");
    const amount = searchParams.get("amount");

    if (orderCode === null || payDate === null || amount === null) {
      return;
    } else {
      const year = parseInt(payDate!.slice(0, 4));
      const month = parseInt(payDate!.slice(4, 6)) - 1;
      const day = parseInt(payDate!.slice(6, 8));
      const hour = parseInt(payDate!.slice(8, 10));
      const minute = parseInt(payDate!.slice(10, 12));
      const second = parseInt(payDate!.slice(12, 14));
      const date = new Date(year, month, day, hour, minute, second);
      const dateFormatted = formatDate(date);

      setPaymentInfo((state) => ({
        ...state,
        orderCode,
        payDate: dateFormatted,
        amount,
      }));
      setCurrent(2);
    }
  }, []);

  return (
    <section>
      <Steps current={current} items={steps} />
      {current === 0 && (
        <Checkcart
          nextStep={nextStep}
          setItemsOrder={setItemsOrder}
          setTotal={setTotal}
          setQuantityItems={setQuantityItems}
        ></Checkcart>
      )}
      {current === 1 && (
        <Checkout
          nextStep={nextStep}
          itemsOrder={itemsOrder}
          total={total}
          quantityItems={quantityItems}
        ></Checkout>
      )}
      {current === 2 && <Complete paymentInfo={paymentInfo}></Complete>}
      <div className="flex justify-between mt-5">
        <Link href={GENERIC_PATH.HOME} type="button">
          <Button icon={<i className="bi bi-caret-left"></i>}>
            Back to home
          </Button>
        </Link>
        <div>
          {current > 0 && current < steps.length - 1 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prevStep()}>
              Previous
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={handleOrderComplete}>
              Done
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderPageClient;
