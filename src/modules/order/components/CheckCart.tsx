"use client";
import { InputNumber, message, Space, Table, TableProps, Tooltip } from "antd";
import Image from "next/image";
import React, { SetStateAction, useEffect, useState } from "react";

import { INFO, SUCCESS, WARNING } from "@/constants";
import { T_CART_RESPONSE, T_PRODUCT_RESPONSE } from "@/types";
import { cartServices } from "@/services";
import { useDebounce } from "@/hooks";
import { useGlobalState } from "@/store";

type Props = {
  nextStep: () => void;
  setTotal: React.Dispatch<SetStateAction<number>>;
  setQuantityItems: React.Dispatch<SetStateAction<number>>;
  setItemsOrder: React.Dispatch<SetStateAction<T_CART_RESPONSE[]>>;
};

const CheckCart = (props: Props) => {
  const { setItemsOrder, nextStep, setTotal, setQuantityItems } = props;
  const { cart, getCart } = useGlobalState();
  const [messageApi, contextHolder] = message.useMessage();
  const [products, setProducts] = useState<T_PRODUCT_RESPONSE[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [quantityItem, setQuantityItem] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [selectedRows, setselectedRows] = useState<T_PRODUCT_RESPONSE[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const updateTotals = (
    rows: T_PRODUCT_RESPONSE[],
    updatedQuantities: { [key: number]: number }
  ) => {
    const newSubtotal = rows.reduce((acc, product) => {
      const quantity = updatedQuantities[product.id] || 1;
      return acc + product.salesPrice * quantity;
    }, 0);
    const newQuantityItem = rows.reduce((acc, product) => {
      const quantity = updatedQuantities[product.id] || 1;
      return acc + quantity;
    }, 0);
    setQuantityItem(newQuantityItem);
    setSubtotal(newSubtotal);
  };

  const updateQuantity = useDebounce(
    async (idCart: number, quantity: number) => {
      const data = { quantity: quantity };
      await cartServices.updateOne(idCart, data);
    },
    500
  );

  const handleQuantityChange = (
    idCart: number,
    idItem: number,
    quantity: number
  ) => {
    if (quantity > 0) updateQuantity(idCart, quantity);
    setQuantities((prevState) => {
      const updatedQuantities = {
        ...prevState,
        [idItem]: quantity,
      };
      // Cập nhật tổng số lượng và subtotal ngay lập tức nếu row đã được chọn
      updateTotals(selectedRows, updatedQuantities);

      return updatedQuantities;
    });
  };

  const handleConfirm = async () => {
    const data = products.map((product) => {
      const newItem = selectedRows.find((item) => item.key === product.key);
      if (newItem) {
        return {
          id: newItem.key,
          product: newItem,
          quantity: quantities[newItem.id] || 1,
        };
      }
      return null;
    });
    const filteredData = data.filter(
      (item): item is T_CART_RESPONSE => item !== null && item !== undefined
    );
    if (filteredData.length > 0) {
      await getCart();
      setItemsOrder(filteredData);
      setTotal(subtotal);
      setQuantityItems(quantityItem);
      nextStep();
    } else {
      message.warning(WARNING.ORDER_ITEM_IS_NULL);
    }
  };

  const handleRemoveProductInCart = (productId: number) => {
    messageApi
      .open({
        type: "loading",
        content: INFO.LOADING,
      })
      .then(async () => {
        setLoading(true);
        const cartItem = cart.find(
          (item: T_CART_RESPONSE) => item.product.id === productId
        );
        const res = await cartServices.deleteOne(cartItem.id);
        if (res) {
          message.success(SUCCESS.REMOVE);
          getCart();
          setLoading(false);
        }
      });
  };

  const columns: TableProps<T_PRODUCT_RESPONSE>["columns"] = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      align: "center",
    },
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (_, { image }) => (
        <Image src={image?.url || ""} alt="Product" width={80} height={80} />
      ),
    },
    {
      title: "Price",
      dataIndex: "salesPrice",
      key: "salesPrice",
      align: "center",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      render: (_, { key, id, stock }) =>
        cart.map((item: T_CART_RESPONSE) => {
          if (item.product.id === id) {
            return (
              <Space direction="vertical" key={id}>
                <InputNumber
                  defaultValue={item.quantity || 1}
                  min={1}
                  max={stock}
                  onChange={(value) => handleQuantityChange(key!, id, value!)}
                />
              </Space>
            );
          }
        }),
    },
    {
      title: "Subtotal",
      align: "center",
      render: (_, { id, salesPrice }) => {
        return <p>{salesPrice * (quantities[id] || 1)}</p>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, { id }) => (
        <Tooltip title={"Remove"}>
          <button onClick={() => handleRemoveProductInCart(id)}>
            <i className="text-red-400 bi bi-trash text-md"></i>
          </button>
        </Tooltip>
      ),
      align: "center",
    },
  ];

  useEffect(() => {
    if (cart) {
      setLoading(true);
      const newQuantities = cart.reduce(
        (acc: Record<number, number>, item: T_CART_RESPONSE) => {
          acc[item.product.id] = item.quantity;
          return acc;
        },
        {}
      );
      setQuantities(newQuantities);
      const newProduct = cart.map((item: T_CART_RESPONSE) => {
        return {
          key: item.id,
          id: item.product.id,
          code: item.product.code,
          name: item.product.name,
          image: item.product.image,
          salesPrice: item.product.salesPrice,
          price: item.product.price,
          stock: item.product.stock,
        };
      });
      setProducts(newProduct);
      setLoading(false);
    }
  }, [cart]);

  const rowSelection: TableProps<T_PRODUCT_RESPONSE>["rowSelection"] = {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: T_PRODUCT_RESPONSE[]
    ) => {
      setselectedRows(selectedRows);
      updateTotals(selectedRows, quantities);
    },
  };

  return (
    <>
      {contextHolder}
      <div className="flex gap-10 mt-10">
        <div className="flex-1">
          <Table
            rowSelection={{ type: "checkbox", ...rowSelection }}
            dataSource={products}
            columns={columns}
            loading={loading}
          ></Table>
        </div>
        <div className="w-[400px] bg-gray-50 p-4">
          <h2 className="text-xl font-semibold">Order summary</h2>
          <div className="py-4 mt-5 border-gray border-y">
            <div className="flex justify-between">
              <p>Items:</p>
              <p className="font-semibold">{quantityItem}</p>
            </div>
            <div className="flex justify-between">
              <p>Subtotal:</p>
              <p className="font-semibold">${subtotal}</p>
            </div>
          </div>
          <button
            className="w-full mt-4 py-2 text-lg text-center text-white bg-primary hover:opacity-[0.8] hover:text-white"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckCart;
