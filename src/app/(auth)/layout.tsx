import "@/assets/style/globals.css";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-light-gray">
      {children}
    </div>
  );
}
