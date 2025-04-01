'use client'
import React, { useRef } from "react";
import Slider from "react-slick";
import { T_PRODUCT_RESPONSE } from "@/types";
import ProductItem from "../Card/Product";

type Props = {
  products: T_PRODUCT_RESPONSE[];
};

const RelatedProductsSlider = (props: Props) => {
  const { products } = props;
  const sliderRef = useRef<Slider | null>(null);

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {products.length < 4 ? (
        <div className="flex">
          {products.map((item, index) => (
            <div key={index}>
              <ProductItem product={item} />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="absolute z-50 flex justify-between w-full translate-y-[-50%] translate-x-[-50%] top-1/2 left-1/2">
            <button
              className="p-3 text-4xl text-text-gray hover:text-black "
              onClick={handlePrev}
            >
              <i className="bi bi-chevron-compact-left"></i>
            </button>
            <button
              className="p-3 text-4xl text-text-gray hover:text-black "
              onClick={handleNext}
            >
              <i className="bi bi-chevron-compact-right"></i>
            </button>
          </div>
          <Slider
            slidesToShow={4}
            slidesToScroll={1}
            arrows={false}
            ref={sliderRef}
          >
            {products.map((item, index) => (
              <div key={index}>
                <ProductItem product={item} />
              </div>
            ))}
          </Slider>
        </>
      )}
    </div>
  );
};

export default RelatedProductsSlider;
