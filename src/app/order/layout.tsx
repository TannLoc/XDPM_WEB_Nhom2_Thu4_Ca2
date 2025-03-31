import type { Metadata } from "next";
import "@/assets/style/globals.css";
import { Footer, HeaderClient } from "@/modules/layout";

export const metadata: Metadata = {
  title: "Order",
};

export default function OrderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderClient></HeaderClient>
      <div className="flex justify-center mt-10">
        <div className="w-w-config">{children}</div>
      </div>
      <Footer></Footer>
    </>
  );
}
