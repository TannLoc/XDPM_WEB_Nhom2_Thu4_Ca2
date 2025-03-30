'use client'
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { message } from "antd";

import { T_LOGIN_CUSTOMER } from "@/types";
import { authCustomer } from "@/services/authServices";
import { ERROR, GENERIC_PATH, INFO, SUCCESS, WARNING } from "@/constants";
import { useGlobalState } from "@/store";

const Login = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<T_LOGIN_CUSTOMER>();
  const [messageApi, contextHolder] = message.useMessage();
  const { getUser } = useGlobalState();

  const handleSubmitLogin: SubmitHandler<T_LOGIN_CUSTOMER> = async (data) => {
    if (data.phoneNumber === "" || data.password === "") {
      message.warning(WARNING.FIELD_IS_NOT_NULL);
      return;
    } else if (data.phoneNumber!.length > 10 || data.phoneNumber!.length < 10) {
      message.error(ERROR.PHONE_NUMBER);
      return;
    } else if (data.password!.length < 6) {
      message.error(ERROR.PASSWORD);
      return;
    }

    const res = await authCustomer.login(data);
    if (res) {
      messageApi
        .open({
          type: "success",
          content: SUCCESS.LOGIN,
          duration: 1,
        })
        .then(async () => {
          await getUser();
          message.loading(INFO.IS_REDIRECTING);
          router.push(GENERIC_PATH.HOME);
        });
    } else {
      message.error(ERROR.LOGIN);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="w-[360px]">
        <form onSubmit={handleSubmit(handleSubmitLogin)}>
          <div className="flex items-center border-b border-primary">
            <i className="inline-block px-2 text-3xl bi bi-person text-primary"></i>
            <input
              type="text"
              className="flex-1 p-2 text-lg bg-transparent border-l text-primary focus:outline-none border-primary"
              placeholder="Phone number"
              {...register("phoneNumber")}
            />
          </div>

          <div className="flex items-center mt-5 border-b border-primary">
            <i className="inline-block px-2 text-3xl bi bi-key text-primary"></i>
            <input
              type="password"
              className="flex-1 p-2 text-lg bg-transparent border-l text-primary focus:outline-none border-primary"
              placeholder="Password"
              {...register("password")}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full h-12 mt-10 text-xl text-white rounded-lg bg-primary"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
