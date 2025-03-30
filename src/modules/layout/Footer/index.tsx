import { GENERIC_PATH } from "@/constants";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex justify-center mt-20 border-t border-primary">
      <div className="flex justify-between w-w-config py-[40px]">
        <div className="flex flex-col items-center">
          <Link
            href={GENERIC_PATH.ABOUT_US}
            className="pb-2 text-xl uppercase border-b border-text-gray text-text-gray"
          >
            ABOUT US
          </Link>
          <div className="flex flex-col items-center mt-2">
            <Link
              href={`${GENERIC_PATH.ABOUT_US}#${GENERIC_PATH.WARRANTY_POLICY}`}
              className="mt-2 text-text-gray"
            >
              Warranty policy
            </Link>
            <Link
              href={`${GENERIC_PATH.ABOUT_US}#${GENERIC_PATH.RETURN_POLICY}`}
              className="mt-2 text-text-gray"
            >
              Return policy
            </Link>
            <Link
              href={`${GENERIC_PATH.ABOUT_US}#${GENERIC_PATH.PAYMENT_AND_DELIVERY_METHODS}`}
              className="mt-2 text-text-gray"
            >
              Payment and delivery methods
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="pb-2 text-xl uppercase border-b border-text-gray text-text-gray">
            INFORMATION
          </h3>
          <div className="flex flex-col items-center mt-2">
            <p className="mt-2 text-text-gray">
              <span className="font-bold text-black">Email: </span>
              mstore@gmail.com
            </p>
            <p className="mt-2 text-text-gray">
              <span className="font-bold text-black">Address: </span>123/456
              ward 1 district 8 TP.HCM
            </p>
            <p className="mt-2 text-text-gray">
              <span className="font-bold text-black">Phone number: </span>
              0987654321
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="pb-2 text-xl uppercase border-b border-text-gray text-text-gray">
            FOLLOW US
          </h3>
          <div className="flex items-center gap-4 mt-2">
            <Link
              href=""
              className="flex items-center justify-center w-10 h-10 rounded-full bg-black"
            >
              <i className="text-2xl text-white bi bi-facebook"></i>
            </Link>
            <Link
              href=""
              className="flex items-center justify-center w-10 h-10 rounded-full bg-black"
            >
              <i className="text-2xl text-white bi bi-instagram"></i>
            </Link>
            <Link
              href=""
              className="flex items-center justify-center w-10 h-10 rounded-full bg-black"
            >
              <i className="text-2xl text-white bi bi-twitter-x"></i>
            </Link>
            <Link
              href=""
              className="flex items-center justify-center w-10 h-10 rounded-full bg-black"
            >
              <i className="text-2xl text-white bi bi-telephone"></i>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
