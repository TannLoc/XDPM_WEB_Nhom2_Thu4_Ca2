import {ProductItem} from "@/modules/layout";
import { T_PRODUCT_RESPONSE } from "@/types/productType";
import React from "react";

type Props = {
  products: T_PRODUCT_RESPONSE[];
};

const ProductList = (props: Props) => {
  const { products } = props;

  return (
    <>
      {products && products.length > 0 ? (
        <div className="flex flex-wrap">
          {products.map((item, index) => (
            <ProductItem key={index} product={item} />
          ))}
        </div>
      ) : (
        <h2 className="text-xl font-semibold text-center">
          Oops! No products found. Please try adjusting your search criteria.
        </h2>
      )}
    </>
  );
};

export default ProductList;
