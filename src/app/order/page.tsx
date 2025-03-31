"use client";
import { Button, Steps } from "antd";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Checkcart, Checkout, Complete } from "@/modules/order";
import { GENERIC_PATH } from "@/constants";
import { T_CART_RESPONSE } from "@/types";

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

const OrderPage = () => {
  const [current, setCurrent] = useState(0);
  const [itemsOrder, setItemsOrder] = useState<T_CART_RESPONSE[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [quantityItems, setQuantityItems] = useState<number>(0);

  const route = useRouter();

  const nextStep = () => {
    setCurrent(current + 1);
  };

  const prevStep = () => {
    setCurrent(current - 1);
  };

  const handleOrderComplete = () => {
    route.push(GENERIC_PATH.HOME);
  };

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
      {current === 2 && <Complete></Complete>}
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

export default OrderPage;
