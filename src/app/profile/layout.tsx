import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "antd";

import "@/assets/style/globals.css";
import { Footer, HeaderClient } from "@/modules/layout";
import { GENERIC_PATH } from "@/constants";

export const metadata: Metadata = {
  title: "Profile",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderClient></HeaderClient>
      <div className="relative flex justify-center">
        <Link
          href={GENERIC_PATH.HOME}
          type="button"
          className="absolute top-5 left-5"
        >
          <Button icon={<i className="bi bi-caret-left"></i>}>
            Back to home
          </Button>
        </Link>
        <div className="w-w-config">{children}</div>
      </div>
    </>
  );
}
