import { POLICIES } from "@/constants";
import Image from "next/image";
import React from "react";

const AboutUsPage = () => {
  return (
    <section className="mt-10">
      <div>
        <p className="text-lg mb-5">
          <span className="font-semibold">M-Store</span> - specializing in
          premium watches, offering timeless style and quality you can trust.
        </p>
        <p className="text-lg mb-5">
          We currently have only one branch, where our dedicated team awaits to
          help you find the perfect watch. Visit us for a personalized
          experience and explore our exclusive collection!
        </p>
      </div>
      <div className="flex justify-center">
        <Image
          src="/images/banner.png"
          alt="Banner"
          width={800}
          height={340}
          className="rounded-lg"
        />
      </div>
      <div className="mt-10">
        {POLICIES.map((item, index) => (
          <ul key={index} id={item.href} className="mb-5">
            <li className="font-semibold uppercase text-lg">{item.title}</li>
            {item.datas.map((item, index) => (
              <li key={index}>{item.item}</li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
};

export default AboutUsPage;
