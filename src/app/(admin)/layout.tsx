import type { Metadata } from "next";
import "@/assets/style/globals.css";
import { HeaderAdmin, SidebarAdmin } from "@/modules/layout";

export const metadata: Metadata = {
  title: "Management",
};

export default function ManagementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderAdmin />
      <div className="flex bg-light-gray">
        <SidebarAdmin />
        <div className="flex-1 p-5 mt-[60px]">{children}</div>
      </div>
    </>
  );
}
