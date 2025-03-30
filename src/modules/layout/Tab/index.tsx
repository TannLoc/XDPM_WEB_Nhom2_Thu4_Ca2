"use client";
import { Tabs } from "antd";

import { TAB_ITEMS } from "@/constants";

const Tab = () => {
  const items = TAB_ITEMS.map((item) => ({
    label: item.label,
    key: item.key,
    children: <item.children />,
  }));

  return <Tabs items={items}></Tabs>;
};

export default Tab;
