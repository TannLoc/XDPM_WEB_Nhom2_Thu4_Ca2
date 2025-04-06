import { message } from "antd";
import { useRouter } from "next/navigation";

import { authCustomer } from "@/services";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { ERROR, GENERIC_PATH, INFO, SUCCESS } from "@/constants";
import { useGlobalState } from "@/store";

const LoginGoogle = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { getUser } = useGlobalState();
  const router = useRouter();

  const handleLogin = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse && credentialResponse.credential) {
      const data = { credential: credentialResponse.credential };
      const res = await authCustomer.loginGoogle(data);
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
    }
  };

  return (
    <>
      {contextHolder}
      <GoogleLogin
        onSuccess={handleLogin}
        onError={() => {
          alert("Login failed");
        }}
      />
    </>
  );
};

export default LoginGoogle;
