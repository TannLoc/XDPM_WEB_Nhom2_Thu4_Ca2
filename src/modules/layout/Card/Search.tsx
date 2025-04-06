import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

import { GENERIC_PATH } from '@/constants';
import { T_PRODUCT_RESPONSE } from '@/types';

type Props = {
  product: T_PRODUCT_RESPONSE;
};

const SearchItem = (props: Props) => {
  const { product } = props;

  return (
    <Link
      href={`${GENERIC_PATH.PRODUCT}/${product.id}`}
      className="relative flex gap-2 items-center max-h-[92px] py-2 px-4 "
    >
      <div className="w-[40px] h-[40px] overflow-hidden">
        <Image
          src={product.image?.url}
          alt="product"
          width={40}
          height={40}
          className="object-cover"
        />
      </div>
      <div>
        <p className="line-clamp-2">{product.name}</p>
        <p className="text-lg font-semibold">{product.salesPrice} VND</p>
      </div>
      {product.stock > 0 ? (
        <p className="absolute text-sm bottom-2 right-4 text-green">
          In stock
        </p>
      ) : (
        <p className="absolute text-sm bottom-2 right-4 text-red">
          Out of stock
        </p>
      )}
    </Link>
  );
}

export default SearchItem