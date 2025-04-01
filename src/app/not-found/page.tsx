import { GENERIC_PATH } from "@/constants";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="max-w-[400px] p-5 shadow bg-white rounded-lg text-center">
      <h1 className="text-7xl text-[#d9534f]">404</h1>
      <p className="text-lg mt-2.5 mb-5">
        The page you are looking for does not exist.
      </p>
      <Link
        href={GENERIC_PATH.HOME}
        className="py-2.5 px-5 bg-[#007bff] hover:bg-[#0056b3] text-white rounded-sm"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
