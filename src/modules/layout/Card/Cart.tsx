import React from 'react'
import Image from 'next/image';
import { message, Tooltip } from 'antd';

import { SUCCESS } from '@/constants';
import { cartServices } from '@/services/cartServices';
import { useGlobalState } from '@/store';
import { T_PRODUCT_RESPONSE } from '@/types';
import { T_CART_RESPONSE } from '@/types/cartType';

type Props = {
  product: T_PRODUCT_RESPONSE;
};

const CartItem = (props: Props) => {
  const { product } = props;
  const { cart, getDataCart } = useGlobalState();

  const handleRemoveProductInCart = async (productId: number) => {
    const cartItem = cart.find(
      (item: T_CART_RESPONSE) => item.product.id === productId
    );
    try {
      const res = await cartServices.deleteOne(cartItem.id);
      if (res) {
        message.success(SUCCESS.REMOVE);
        getDataCart();
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="relative flex gap-2 mb-5">
      <div className="absolute top-0 right-0">
        <Tooltip title="Remove">
          <button onClick={() => handleRemoveProductInCart(product.id)}>
            <i className="text-lg bi bi-x-square"></i>
          </button>
        </Tooltip>
      </div>
      <div className="w-[60px] h-[60px] overflow-hidden">
        <Image
          src={product.image?.url}
          alt="product"
          width={60}
          height={60}
          className="object-cover"
        />
      </div>
      <div>
        <p>{product.name}</p>
        <p className="text-lg font-semibold">${product.salesPrice}</p>
      </div>
    </div>
  );
}

export default CartItem