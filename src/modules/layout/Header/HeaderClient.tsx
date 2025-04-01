"use client";
import { Badge, Button, Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { GENERIC_PATH } from "@/constants";
import Menu from "../Menu/MenuClient";
import Search from "../Search";
import { useGlobalState } from "@/store";
import SidebarClient from "../Sidebar/SiderbarClient";

const Header = () => {
  const [isSidebarCartOpen, setIsSidebarCartOpen] = useState<boolean>(false);
  const { currentUser, cart } = useGlobalState();

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
          <Badge size="small" count={cart.length}>
            <Tooltip title="View cart">
              <button onClick={() => setIsSidebarCartOpen(true)}>
                <i className="text-2xl text-white bi bi-bag"></i>
              </button>
            </Tooltip>
          </Badge>
          {currentUser ? (
            <Menu></Menu>
          ) : (
            <Button>
              <Link href={GENERIC_PATH.AUTH} className="text-white">
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
