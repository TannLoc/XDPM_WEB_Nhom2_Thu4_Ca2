"use client";
import { Badge, Button, Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { GENERIC_PATH } from "@/constants";
import Menu from "../Menu";
import { SidebarClient } from "../Sidebar";
import Search from "../Search";

const Header = () => {
  const [isSidebarCartOpen, setIsSidebarCartOpen] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-50 flex justify-center items-center h-[60px] bg-primary">
      <div className="flex items-center justify-between w-w-config">
        <div>
          <Link href={GENERIC_PATH.HOME}>
            <Image
              src="/images/logo-yellow.png"
              alt="logo"
              width={50}
              height={40}
            />
          </Link>
        </div>
        <div className="flex gap-4">
          <Search />
          <Badge size="small" count={0}>
            <Tooltip title="View cart">
              <button onClick={() => setIsSidebarCartOpen(true)}>
                <i className="text-2xl text-white bi bi-bag"></i>
              </button>
            </Tooltip>
          </Badge>
          {true ? (
            <Menu></Menu>
          ) : (
            <Button>
              <Link href={GENERIC_PATH.LOGIN} className="text-white">
                Login
              </Link>
            </Button>
          )}
        </div>
      </div>
      <SidebarClient
        isSidebarCartOpen={isSidebarCartOpen}
        setIsSidebarCartOpen={setIsSidebarCartOpen}
      ></SidebarClient>
    </header>
  );
};

export default Header;
