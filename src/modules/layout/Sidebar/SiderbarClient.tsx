import { GENERIC_PATH } from "@/constants";
import { useGlobalState } from "@/store";
import { T_CART_RESPONSE } from "@/types/cartType";
import { Drawer } from "antd";
import Link from "next/link";
import CartItem from "../Card/Cart";

type Props = {
  isSidebarCartOpen: boolean;
  setIsSidebarCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarCart = (props: Props) => {
  const { isSidebarCartOpen, setIsSidebarCartOpen } = props;
  const { cart } = useGlobalState();
  const cartLength = cart.length > 0;

  return (
    <Drawer
      title="Your cart"
      onClose={() => setIsSidebarCartOpen(false)}
      open={isSidebarCartOpen}
    >
      {cartLength ? (
        cart.map((item: T_CART_RESPONSE, index: number) => {
          return (
            <CartItem
              key={index}
              product={item.product}
            ></CartItem>
          );
        })
      ) : (
        <p className="mb-10 text-lg font-semibold text-center">
          There are no products in the cart.
        </p>
      )}
      <Link
        href={GENERIC_PATH.ORDER}
        className={`block w-full py-2 text-lg text-center text-white bg-primary hover:opacity-[0.8] hover:text-white ${
          !cartLength ? "opacity-[0.8]" : ""
        }`}
      >
        ORDER
      </Link>
    </Drawer>
  );
};

export default SidebarCart;
