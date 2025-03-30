"use client";
import Image from "next/image";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import Link from "next/link";

import { GENERIC_PATH } from "@/constants";
import { useGlobalState } from "@/store";

const Menu = () => {
  const { currentUser } = useGlobalState();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href={GENERIC_PATH.PROFILE}>Profile</Link>,
      icon: <i className="bi bi-person"></i>,
    },
    {
      key: "2",
      label: <button>Log out</button>,
      icon: <i className="bi bi-box-arrow-right"></i>,
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottom" arrow>
      <Image
        src={currentUser.avatar.url || "/images/avatar_default.jpg"}
        alt="Logo"
        width={32}
        height={32}
        className="rounded-full"
      />
    </Dropdown>
  );
};

export default Menu;
