import { Carousel } from "antd";
import Image from "next/image";
import React from "react";

const quantityBanner = [1, 1, 1, 1];

const Banner = () => {
  const bannerStyle: React.CSSProperties = {
    width: "100%",
    height: "400px",
    objectFit: "cover",
  };

  return (
    <section className="flex justify-center mt-10">
      <div className="w-w-config rounded-xl overflow-hidden">
        <Carousel autoplay arrows infinite>
          {quantityBanner.map((item, index) => (
            <div key={index}>
              <Image
                src="/images/banner.png"
                alt="Banner"
                width={1200}
                height={400}
                style={bannerStyle}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Banner;
