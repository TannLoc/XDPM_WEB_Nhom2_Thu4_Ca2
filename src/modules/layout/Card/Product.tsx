'use client'
import { message, Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import { GENERIC_PATH, INFO, SUCCESS, WARNING } from "@/constants";
import { cartServices } from "@/services/cartServices";
import { useGlobalState } from "@/store";
import { T_PRODUCT_RESPONSE } from "@/types/productType";

type Props = {
  product: T_PRODUCT_RESPONSE;
};

const ProductItem = (props: Props) => {
  const { product } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const { currentUser, getCart } = useGlobalState();
  const route = useRouter();

  const handleAddProductToCart = async (id: number) => {
    if (currentUser === null) {
      messageApi
        .open({
          type: "warning",
          content: WARNING.CUSTOMER_IS_NOT_lOGIN,
          duration: 1.5,
        })
        .then(() => message.loading(INFO.IS_REDIRECTING, 1.5))
        .then(() => route.push(GENERIC_PATH.AUTH));
      return;
    } else if (product!.stock === 0) {
      message.info(INFO.CAN_NOT_ADD_PRODUCT_TO_CART);
      return;
    } else {
      try {
        const data = { productId: id };
        const res = await cartServices.addProductToCartById(data);
        if (res) {
          message.success(SUCCESS.ADD_TO_CART);
          await getCart();
        }
      } catch (error) {
        throw error;
      }
    }
  };

  return (
    <>
      {contextHolder}
      <div className="px-12 mt-10 max-w-[320px]">
        <div className="min-w-[222px] border border-t-0 border-light-gray">
          <div className="flex justify-center">
            <Link href={`${GENERIC_PATH.PRODUCT}/${product.id}`}>
              <Image
                src={product.image?.url}
                alt="product"
                width={200}
                height={200}
              ></Image>
            </Link>
          </div>
          <div className="p-2">
            <div className="min-h-[100px]">
              <Link
                href={`${GENERIC_PATH.PRODUCT}/${product.id}`}
                className="inline-block text-base text-text-gray hover:text-primary "
              >
                <p className="line-clamp-1">{product.name}</p>
              </Link>
              <p className="h-5 text-sm line-through text-text-gray">
                {product.price === product.salesPrice
                  ? ""
                  : `$${product.price}`}
              </p>
              <p className="text-xl text-black">${product.salesPrice}</p>
              {product.stock > 0 ? (
                <p className="text-sm text-green">In stock</p>
              ) : (
                <p className="text-sm text-red">Out of stock</p>
              )}
            </div>
            <div className="text-end">
              <Tooltip title="Add to cart">
                <button onClick={() => handleAddProductToCart(product.id)}>
                  <i className="text-2xl bi bi-cart-plus text-text-gray hover:text-primary"></i>
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
