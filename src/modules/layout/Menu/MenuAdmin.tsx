"use client";
import Image from "next/image";
import type { MenuProps } from "antd";
import { useRouter } from "next/navigation";
import { Dropdown, message } from "antd";
import Cookies from "js-cookie";

import { authAdmin } from "@/services";
import { GENERIC_PATH } from "@/constants";

const MenuAdmin = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await authAdmin.logout();
      if (res) {
        Cookies.remove("customer");
        router.push(`${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.LOGIN}`);
      } else {
        message.error("Logout failed");
      }
    } catch (error) {
      throw error;
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <button onClick={handleLogout}>Log out</button>,
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <Image
        src={"/images/avatar_default.jpg"}
        alt="Logo"
        width={40}
        height={40}
      />
    </Dropdown>
  );
};

export default MenuAdmin;
