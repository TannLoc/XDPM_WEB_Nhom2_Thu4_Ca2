"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import { CUSTOMER_NAV_ITEMS } from "@/constants";

const Navigation = () => {
  const [pathName, setPathName] = useState<string>("");

  const path = usePathname();

  useEffect(() => {
    setPathName(path);
  }, [path]);

  return (
    <nav className="flex justify-center border-b border-primary">
      <div className="flex justify-evenly w-w-config">
        {CUSTOMER_NAV_ITEMS.map((item, index) => (
          <Link
            key={index}
            href={item.path}
            className={`flex justify-center items-center w-[120px] h-[60px] text-xl ${
              pathName === item.path
                ? "text-primary border-b-2 border-primary"
                : ""
            }`}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
