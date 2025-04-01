import "@/assets/style/globals.css";
import { Provider } from "@/store";
import ProtectedRoute from "@/utils/ProtectedRoute";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
           <ProtectedRoute>
          {children}
           </ProtectedRoute>
        </Provider>
      </body>
    </html>
  );
}
