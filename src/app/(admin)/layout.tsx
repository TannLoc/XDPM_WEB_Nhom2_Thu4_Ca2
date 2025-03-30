import type { Metadata } from "next";
import "@/assets/style/globals.css";

export const metadata: Metadata = {
  title: "Management",
};

export default function ManagementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
