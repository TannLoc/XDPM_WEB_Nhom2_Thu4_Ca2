import Image from "next/image";
import MenuAdmin from "../Menu/MenuAdmin";

const HeaderAdmin = () => {
  return (
    <header className="flex justify-between items-center h-[60px] bg-primary fixed top-0 left-0 right-0 z-10">
      <div className="flex justify-center items-center w-[200px] h-full">
        <Image
          src={"/images/logo-yellow.png"}
          alt="Logo"
          width={50}
          height={30}
        />
      </div>
      <div className="mr-5 overflow-hidden rounded-full">
        <MenuAdmin></MenuAdmin>
      </div>
    </header>
  );
};

export default HeaderAdmin;
