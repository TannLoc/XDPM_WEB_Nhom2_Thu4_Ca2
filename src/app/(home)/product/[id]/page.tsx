"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Breadcrum,
  ProductImageSlider,
  RelatedProductsSlider,
} from "@/modules/layout";
import { T_IMAGE, T_ONE_PRODUCT_RESPONSE } from "@/types";
import { productClientService } from "@/services";
import { GENERIC_PATH, INFO, SUCCESS, WARNING } from "@/constants";
import { message } from "antd";
import { useGlobalState } from "@/store";
import { cartServices } from "@/services/cartServices";

type Props = {
  params: { id: string };
};

const ProductDetails = (props: Props) => {
  const [product, setProduct] = useState<T_ONE_PRODUCT_RESPONSE>();
  const [images, setImages] = useState<T_IMAGE[]>([]);
  const [similarProduct, setSimilarProduct] = useState<
    T_ONE_PRODUCT_RESPONSE[]
  >([]);
  const { currentUser, getCart } = useGlobalState();
  const route = useRouter();

  const { params } = props;
  const id = Number(params.id);

  const [messageApi, contextHolder] = message.useMessage();

  const getDataProductById = async (id: number) => {
    const res = await productClientService.getOne(id);
    if (res) {
      setProduct(res.data.response);
    }
  };

  const getDataProductByIdBrand = async (id: number) => {
    const res = await productClientService.getByIdBrand(id);
    if (res) {
      setSimilarProduct(res.data.response);
    }
  };

  const handleAddProductToCart = async () => {
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

  useEffect(() => {
    getDataProductById(id);
  }, [id]);

  useEffect(() => {
    if (product) {
      if (product.brand) getDataProductByIdBrand(product.brand.id);
      if (product.image && product.images) {
        setImages([
          product.image,
          ...product.images
            .filter((item) => item.id !== product.image.id)
            .map((item) => item),
        ]);
      }
    }
  }, [product]);

  return (
    <>
      {contextHolder}
      <section className="mt-10">
        <Breadcrum id={id}></Breadcrum>
        <div className="flex gap-5 mt-5">
          <div className="flex justify-center flex-1 max-w-[50%]">
            <ProductImageSlider images={images}></ProductImageSlider>
          </div>
          <div className="flex-1">
            <h1 className="mb-10 text-2xl font-semibold">{product?.name}</h1>
            <p>
              <span className="text-text-gray">Brand: </span>
              {product?.brand?.name}
            </p>
            <p>
              <span className="text-text-gray">Gender: </span>
              {product?.gender.label}
            </p>
            <p>
              <span className="text-text-gray">Size: </span>
              {product?.size.label}
            </p>
            <p>
              <span className="text-text-gray">Movement: </span>
              {product?.movement.label}
            </p>
            <p>
              <span className="text-text-gray">Market segment: </span>
              {product?.marketSegment.label}
            </p>
            <p>
              <span className="text-text-gray">Features: </span>
              <span className="flex gap-2">
                {product?.features.map((item, index) => (
                  <span key={index}>{item.label}</span>
                ))}
              </span>
            </p>
            {(product?.stock ?? 0) > 0 ? (
              <p className="text-xl text-green">In stock</p>
            ) : (
              <p className="text-xl text-red">Out of stock</p>
            )}
            <p className="mt-5 text-lg line-through text-text-gray">
              ${product?.price}
            </p>
            <p className="mb-5 text-2xl text-primary">${product?.salesPrice}</p>
            <button
              className="bg-primary text-lg text-white min-w-[200px] w-[360px] h-10 rounded-lg "
              onClick={() => handleAddProductToCart()}
            >
              ADD TO CART
            </button>
          </div>
        </div>

        <div>
          <h2 className="mt-10 text-2xl font-semibold">Similar product</h2>
          <RelatedProductsSlider
            products={similarProduct}
          ></RelatedProductsSlider>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
