'use client'
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { message } from "antd";

import { T_LOGIN_ADMIN } from "@/types";
import { authAdmin } from "@/services/authServices";
import { ERROR, GENERIC_PATH, INFO, SUCCESS, WARNING } from "@/constants";
import { useGlobalState } from "@/store";

const Login = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<T_LOGIN_ADMIN>();
  const [messageApi, contextHolder] = message.useMessage();
  const { getUser } = useGlobalState();

  const handleSubmitLogin: SubmitHandler<T_LOGIN_ADMIN> = async (data) => {
    if (data.username === "" || data.password === "") {
      message.warning(WARNING.FIELD_IS_NOT_NULL);
      return;
    } else if (data.password!.length < 6) {
      message.error(ERROR.PASSWORD);
      return;
    }

    const res = await authAdmin.login(data);
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
          router.push(GENERIC_PATH.MANAGEMENT);
        });
    } else {
      message.error(ERROR.LOGIN);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitLogin)}>
      {contextHolder}
      <div className="flex items-center border-b-2 border-white">
        <i className="inline-block px-2 text-3xl text-white bi bi-person"></i>
        <input
          type="text"
          className="flex-1 p-2 text-lg text-white bg-transparent border-l-2 border-white focus:outline-none"
          placeholder="Username"
          {...register("username")}
        />
      </div>

      <div className="flex items-center mt-5 border-b-2 border-white">
        <i className="inline-block px-2 text-3xl text-white bi bi-key"></i>
        <input
          type="password"
          className="flex-1 p-2 text-lg text-white bg-transparent border-l-2 border-white focus:outline-none"
          placeholder="Password"
          {...register("password")}
        />
      </div>

      <div>
        <button type="submit" className="w-full h-12 mt-10 text-xl bg-white rounded-full">
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
