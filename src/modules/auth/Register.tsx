"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { message } from "antd";

import { T_REGISTER_CUSTOMER } from "@/types";
import { authCustomer } from "@/services/authServices";
import { ERROR, GENERIC_PATH, INFO, SUCCESS, WARNING } from "@/constants";
import { useGlobalState } from "@/store";
import { isValidUsername, isValidEmail } from "@/utils";

const Register = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<T_REGISTER_CUSTOMER>();
  const [messageApi, contextHolder] = message.useMessage();
  const { getUser } = useGlobalState();

  const handleSubmitRegister: SubmitHandler<T_REGISTER_CUSTOMER> = async (
    data
  ) => {
    if (
      data.fullName === "" ||
      data.email === "" ||
      data.phoneNumber === "" ||
      data.password === "" ||
      data.passwordConfirmation === ""
    ) {
      message.warning(WARNING.FIELD_IS_NOT_NULL);
      return;
    } else if (isValidUsername(data.fullName)) {
      message.error(ERROR.NAME);
      return;
    } else if (!isValidEmail(data.email!)) {
      message.error(ERROR.EMAIL);
      return;
    } else if (data.phoneNumber!.length > 10 || data.phoneNumber!.length < 10) {
      message.error(ERROR.PHONE_NUMBER);
      return;
    } else if (data.password!.length < 6) {
      message.error(ERROR.PASSWORD);
      return;
    } else if (data.passwordConfirmation !== data.password) {
      message.error(ERROR.RE_ENTER_PASSWORD);
      return;
    }

    const newData = {
      email: data.email.trim(),
      fullName: data.fullName.trim(),
      password: data.password,
      phoneNumber: data.phoneNumber.trim(),
    };

    const res = await authCustomer.register(newData);
    if (res) {
      messageApi
        .open({
          type: "success",
          content: SUCCESS.REGISTER,
          duration: 1,
        })
        .then(async () => {
          await getUser();
          message.loading(INFO.IS_REDIRECTING);
          router.push(GENERIC_PATH.HOME);
        });
    } else {
      message.error(ERROR.REGISTER);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="w-[360px]">
        <form onSubmit={handleSubmit(handleSubmitRegister)}>
          <div className="flex items-center border-b border-primary">
            <i className="inline-block px-2 text-3xl bi bi-person text-primary"></i>
            <input
              type="text"
              placeholder="Full name"
              className="flex-1 p-2 text-lg bg-transparent border-l text-primary focus:outline-none border-primary"
              {...register("fullName")}
            />
          </div>

          <div className="flex items-center mt-5 border-b border-primary">
            <i className="inline-block px-2 text-3xl bi bi-person text-primary"></i>
            <input
              type="text"
              placeholder="Email"
              className="flex-1 p-2 text-lg bg-transparent border-l text-primary focus:outline-none border-primary"
              {...register("email")}
            />
          </div>

          <div className="flex items-center mt-5 border-b border-primary">
            <i className="inline-block px-2 text-3xl bi bi-telephone text-primary"></i>
            <input
              type="text"
              placeholder="Phone number"
              className="flex-1 p-2 text-lg bg-transparent border-l text-primary focus:outline-none border-primary"
              {...register("phoneNumber")}
            />
          </div>

          <div className="flex items-center mt-5 border-b border-primary">
            <i className="inline-block px-2 text-3xl bi bi-lock text-primary"></i>
            <input
              type="password"
              placeholder="Password"
              className="flex-1 p-2 text-lg bg-transparent border-l text-primary focus:outline-none border-primary"
              {...register("password")}
            />
          </div>

          <div className="flex items-center mt-5 border-b border-primary">
            <i className="inline-block px-2 text-3xl bi bi-lock text-primary"></i>
            <input
              type="password"
              placeholder="Password confirmation"
              className="flex-1 p-2 text-lg bg-transparent border-l text-primary focus:outline-none border-primary"
              {...register("passwordConfirmation")}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full h-12 mt-10 text-xl text-white rounded-lg bg-primary"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
