"use client";
import { Form, message, Radio } from "antd";

import { orderClientServices } from "@/services";
import { T_CART_RESPONSE } from "@/types";
import { SUCCESS } from "@/constants";
import { useGlobalState } from "@/store";
import OrderForm from "./OrderForm";

type Props = {
  nextStep: () => void;
  total: number;
  quantityItems: number;
  itemsOrder: T_CART_RESPONSE[];
};

const Checkout = (props: Props) => {
  const { nextStep, total, quantityItems, itemsOrder } = props;
  const { currentUser, getCart } = useGlobalState();
  const [form] = Form.useForm();

  const handleConfirm = async () => {
    await form.validateFields();
    const text = form.getFieldValue("text");
    const city = form.getFieldValue("city");
    const district = form.getFieldValue("district");
    const ward = form.getFieldValue("ward");
    const note = form.getFieldValue("note");
    const delivery = { city, district, ward, text , note };
    const cartIds = itemsOrder.map((item: T_CART_RESPONSE) =>
      item.id
 );
    const data = { cartIds, delivery };
    const res = await orderClientServices.create(data);
    if (res && res.data.response) {
      getCart();
      message.success(SUCCESS.ORDER_COMPLETE);
      form.resetFields();
      nextStep();
    }
  };

  return (
    <div className="flex gap-5 mt-5">
      <div className="flex-1 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold">Delivery information</h2>
        <div className="mt-5">
          <p className="text-lg text-text-gray-color">
            <span className="font-semibold">Full name:</span>{" "}
            {currentUser.fullName}
          </p>
          <p className="mt-2 text-lg text-text-gray-color">
            <span className="font-semibold">Email:</span> {currentUser.email}
          </p>
          <p className="mt-2 text-lg text-text-gray-color">
            <span className="font-semibold">Phone number:</span>{" "}
            {currentUser.phoneNumber}
          </p>
          <OrderForm form={form}></OrderForm>
        </div>
      </div>
      <div className="w-[400px] bg-gray-50 p-4">
        <h2 className="text-2xl font-semibold">Order summary</h2>
        <div className="py-4 mt-5 border-gray-color border-y">
          <div className="flex justify-between">
            <p>Items:</p>
            <p className="font-semibold">{quantityItems}</p>
          </div>
          {itemsOrder.map((item: T_CART_RESPONSE, index: number) => (
            <div className="flex justify-between gap-2" key={index}>
              <p>{item.product.name}</p>
              <p className="font-semibold">x{item.quantity || 1}</p>
            </div>
          ))}
          <div className="flex justify-between">
            <p>Total:</p>
            <p className="font-semibold">${total}</p>
          </div>
        </div>
        <div className="mt-5">
          <Radio checked>Cash on Delivery</Radio>
        </div>
        <button
          className="w-full mt-4 py-2 text-lg text-center text-white bg-primary hover:opacity-[0.8] hover:text-white"
          onClick={handleConfirm}
          type="submit"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Checkout;
