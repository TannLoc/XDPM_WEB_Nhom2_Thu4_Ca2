import { Drawer } from "antd";
import Link from "next/link";

type Props = {
  isSidebarCartOpen: boolean;
  setIsSidebarCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarCart = (props: Props) => {
  const { isSidebarCartOpen, setIsSidebarCartOpen } = props;

  return (
    <Drawer
      title="Your cart"
      onClose={() => setIsSidebarCartOpen(false)}
      open={isSidebarCartOpen}
    >
      <p className="mb-10 text-lg font-semibold text-center">
        There are no products in the cart.
      </p>
      <Link href={""}>ORDER</Link>
    </Drawer>
  );
};

export default SidebarCart;
