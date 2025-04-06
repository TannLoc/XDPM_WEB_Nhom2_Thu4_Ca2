"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { GENERIC_PATH } from "@/constants";
import { useGlobalState } from "@/store";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const path = usePathname();
  const { currentUser } = useGlobalState();

  useEffect(() => {
    if (
      currentUser !== null &&
      currentUser.role === 'CUSTOMER' &&
      path.includes(GENERIC_PATH.MANAGEMENT)
    ) {
      router.replace("/not-found");
    }
  }, [path, currentUser]);

  return <>{children}</>;
};

export default ProtectedRoute;
