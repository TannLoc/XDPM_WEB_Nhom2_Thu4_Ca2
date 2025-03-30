import { Image } from "antd";

const Avatar = () => {

  return (
    <section className="flex flex-col items-center gap-5 pt-10 pb-5 bg-white border-b border-primary-color">
      <Image
        src={"/images/avatar_default.jpg"}
        alt="Avatar"
        width={120}
        height={120}
        className="rounded-full"
      />
      <h2 className="text-2xl">David Beckham</h2>
    </section>
  );
};

export default Avatar;
