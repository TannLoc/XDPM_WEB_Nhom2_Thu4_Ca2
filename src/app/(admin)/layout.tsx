'use client'
import "@/assets/style/globals.css";
import { HeaderAdmin, SidebarAdmin } from "@/modules/layout";
import { useGlobalState } from "@/store";

export default function ManagementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { currentUser } = useGlobalState();
  return (
    <>
      {currentUser !== null && currentUser.role === "ADMIN" ? (
        <>
          <HeaderAdmin />
          <div className="flex bg-light-gray">
            <SidebarAdmin />
            <div className="flex-1 p-5 mt-[60px]">{children}</div>
          </div>
        </>
      ) : null}
    </>
  );
}
