import Image from "next/image";

import { AdminLoginForm } from "@/modules/auth";

const AdminLoginPage = () => {
  return (
    <section className="bg-primary rounded-3xl">
      <div className="w-[400px] h-[600px] flex justify-center items-center flex-col">
        <div className="flex justify-center items-center">
          <Image src="/images/logo.svg" alt="logo" width={100} height={100} />
        </div>
        <div className="mt-10 p-5">
          <AdminLoginForm />
        </div>
      </div>
    </section>
  );
};

export default AdminLoginPage;
