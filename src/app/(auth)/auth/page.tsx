"use client";
import { useState } from "react";
import Image from "next/image";

import { LoginForm, RegisterForm } from "@/modules/auth";

const AuthPage = () => {
  const [isClicked, setIsClicked] = useState<boolean>(true);

  const handleClick = () => {
    setIsClicked((prevState) => !prevState);
  };

  return (
    <div className="flex w-[1000px] h-[680px] bg-white rounded-[40px] overflow-hidden">
      <div className="w-fit h-[680px]">
        <Image
          src={"/images/auth_thumbnail.jpg"}
          alt={"Thumbnail Login"}
          width={500}
          height={500}
          className="rounded-tr-[80px] rounded-br-[100px] w-full h-full"
        />
      </div>
      <div className="flex flex-col items-center flex-1">
        <div className="mt-5">
          <button
            className={`w-[120px] h-[40px] text-lg rounded-tl-lg rounded-bl-lg ${
              isClicked
                ? "bg-primary text-white drop-shadow-lg"
                : "bg-light-gray text-gray"
            }`}
            onClick={handleClick}
          >
            Login
          </button>
          <button
            className={`w-[120px] h-[40px] text-lg rounded-tr-lg rounded-br-lg ${
              isClicked
                ? "bg-light-gray text-gray"
                : "bg-primary text-white drop-shadow-lg"
            }`}
            onClick={handleClick}
          >
            Register
          </button>
        </div>
        <div className="flex items-center justify-center my-10">
          <Image
            src="/images/logo-yellow.png"
            alt="logo"
            width={100}
            height={100}
          />
        </div>
        <div className={isClicked ? "block" : "hidden"}>
          <LoginForm />
        </div>
        <div className={isClicked ? "hidden" : "block"}>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
