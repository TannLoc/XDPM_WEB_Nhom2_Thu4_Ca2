import { GENERIC_PATH } from "@/constants";
import { Breadcrumb } from "antd";
import React from "react";

const Breadcrum = ({ id }: { id: number }) => {
  return (
    <Breadcrumb
      items={[
        {
          title: "HOME",
          href: GENERIC_PATH.HOME,
        },
        {
          title: "PRODUCT",
          href: GENERIC_PATH.PRODUCT,
        },
        {
          title: ":id",
        },
      ]}
      params={{ id: id }}
    />
  );
};

export default Breadcrum;
