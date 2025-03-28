import type { Metadata } from "next";
import "@/assets/style/globals.css";
import { Footer, HeaderClient, Navigation } from "@/modules/layout";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderClient></HeaderClient>
      <Navigation></Navigation>
      <div className="flex justify-center">
        <div className="w-w-config">{children}</div>
      </div>
      <Footer></Footer>
    </>
  );
}
