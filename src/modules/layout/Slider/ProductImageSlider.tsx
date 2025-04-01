'use client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { T_IMAGE } from "@/types";

type Props = {
  images: T_IMAGE[];
};

function ProductImageSlider(props: Props) {
  const { images } = props;

  const [currentSlider, setCurrentSlider] = useState<number>(0);
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);
  const sliderRef1 = useRef<Slider | null>(null);
  const sliderRef2 = useRef<Slider | null>(null);

  const handlePrev = () => {
    if (sliderRef1.current) {
      sliderRef1.current.slickPrev();
    }
  };

  const handleNext = () => {
    if (sliderRef1.current) {
      sliderRef1.current.slickNext();
    }
  };

  useEffect(() => {
    setNav1(sliderRef1.current);
    setNav2(sliderRef2.current);
  }, []);

  return (
    <div className="w-full max-w-[460px]">
      {images.length === 1 ? (
        <div className="slider-custom w-[400px] h-[360px] ">
          <Image
            src={images[0].url}
            alt="product"
            width={400}
            height={360}
            className="object-cover rounded-xl"
          ></Image>
        </div>
      ) : (
        <>
          <div className="relative">
            <div className="absolute z-50 flex justify-between w-[90%] translate-y-[-50%] translate-x-[-50%] top-1/2 left-1/2">
              <button
                className="p-3 text-4xl text-light-gray hover:text-text-gray "
                onClick={handlePrev}
              >
                <i className="bi bi-chevron-compact-left"></i>
              </button>
              <button
                className="p-3 text-4xl text-light-gray hover:text-text-gray "
                onClick={handleNext}
              >
                <i className="bi bi-chevron-compact-right"></i>
              </button>
            </div>
            <Slider
              asNavFor={nav2!}
              ref={sliderRef1}
              arrows={false}
              afterChange={(current) => setCurrentSlider(current)}
            >
              {images.map((item, index) => (
                <div key={index} className="slider-custom w-[400px] h-[360px] ">
                  <Image
                    src={item.url}
                    alt="product"
                    width={400}
                    height={360}
                    className="object-cover rounded-xl"
                  ></Image>
                </div>
              ))}
            </Slider>
          </div>

          <Slider
            asNavFor={nav1!}
            ref={sliderRef2}
            slidesToShow={images.length < 4 ? images.length : 4}
            swipeToSlide={true}
            focusOnSelect={true}
            arrows={false}
            className="mt-5"
          >
            {images.map((item, index) => (
              <div
                key={index}
                className="slider-custom max-w-[100px] max-h-[100px] m-auto overflow-hidden rounded-xl"
              >
                <Image
                  src={item.url}
                  alt="product"
                  width={100}
                  height={100}
                  className={`object-cover cursor-pointer ${
                    index === currentSlider
                      ? ""
                      : "opacity-[0.6] hover:opacity-[1] hover:scale-[1.1] transition-all ease-in"
                  }`}
                ></Image>
              </div>
            ))}
          </Slider>
        </>
      )}
    </div>
  );
}

export default ProductImageSlider;
