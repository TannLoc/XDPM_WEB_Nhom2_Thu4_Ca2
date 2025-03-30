"use client";
import React, { useState } from "react";
import { Button, Dropdown, MenuProps } from "antd";
import { MenuItemType } from "antd/es/menu/interface";

import { useGlobalState } from "@/store";

const Sort = () => {
  const { productParams, setProductParams } = useGlobalState();
  const [label, setLabel] = useState<string>("Default");

  const items: MenuItemType[] = [
    {
      key: "ASC",
      label: "Price increase",
      icon: <i className="bi bi-arrow-up"></i>,
    },
    {
      key: "DESC",
      label: "Price decrease",
      icon: <i className="bi bi-arrow-down"></i>,
    },
  ];

  const onClick: MenuProps["onClick"] = ({ key }) => {
    const selectedItem = items.find((item) => item?.key === key);
    if (selectedItem) {
      setLabel(String(selectedItem.label));
    }
    setProductParams({
      ...productParams,
      orderBy: "salesPrice",
      sortOrder: key,
    });
  };

  return (
    <Dropdown menu={{ items, onClick }} trigger={["click"]}>
      <Button iconPosition="end" icon={<i className="bi bi-chevron-down"></i>}>
        Sort by: {label}
      </Button>
    </Dropdown>
  );
};

export default Sort;
