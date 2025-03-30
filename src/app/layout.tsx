import "@/assets/style/globals.css";
import { Provider } from "@/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><Provider>{children}</Provider></body>
    </html>
  );
}
