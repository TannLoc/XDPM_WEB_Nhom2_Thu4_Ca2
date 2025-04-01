"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import { ADMIN_NAV_ITEMS } from "@/constants";

const SidebarAdmin = () => {
  const [pathName, setPathName] = useState<string>("");

  const path = usePathname();

  useEffect(() => {
    setPathName(path);
  }, [path]);

  return (
    <aside className="sticky top-0 pt-[72px] flex flex-col items-center w-[200px] h-screen bg-white">
      {ADMIN_NAV_ITEMS.map((item, index) => (
        <Link
          key={index}
          href={item.path}
          className={`flex justify-center items-center w-[170px] h-[45px] mb-3 hover:bg-primary hover:text-white hover:rounded-lg
            ${
              pathName === item.path
                ? "bg-primary text-white rounded-lg"
                : "text-gray"
            }`}
        >
          <i className={`${item.icon} w-10 text-center text-xl`}></i>
          <p className="flex-1 text-lg font-semibold">{item.title}</p>
        </Link>
      ))}
    </aside>
  );
};

export default SidebarAdmin;
