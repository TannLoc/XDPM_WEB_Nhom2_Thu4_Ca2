import Image from "next/image";
import Link from "next/link";
import React from "react";

const ITEMS = [1, 1, 1, 1];
const Articles = () => {
  return (
    <section>
      <h2 className="text-center text-3xl mt-10">Articles</h2>
      <div className="flex gap-5 mt-10">
        <div className="relative">
          <Link href="">
            <Image
              src="/images/banner.png"
              alt="banner"
              width={600}
              height={340}
              className="rounded-lg"
            />
            <p className="absolute left-2 top-2 text-xl text-white">
              5 mẫu đồng hồ ấn tượng trong cùng mức giá
            </p>
            <p className="absolute bottom-2 right-2 text-light-gray">
              29/9/2024
            </p>
          </Link>
        </div>
        <div className="flex flex-col justify-between flex-1">
          {ITEMS.map((item, index) => (
            <div key={index}>
              <Link href="" className="flex gap-5">
                <Image
                  src="/images/banner.png"
                  alt="banner"
                  width={140}
                  height={80}
                  className="rounded-md"
                />
                <div className="relative">
                  <p className="text-sm font-bold">
                    5 mẫu đồng hồ ấn tượng trong cùng mức giá
                  </p>
                  <p className="absolute bottom-0 right-0 text-sm text-text-gray">
                    29/9/2024
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Articles;
