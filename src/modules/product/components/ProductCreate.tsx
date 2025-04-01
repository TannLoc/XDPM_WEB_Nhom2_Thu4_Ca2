import { message, Modal } from "antd";

import ProductForm from "./ProductForm";
import { T_PRODUCT_REQUEST } from "@/types";
import { productAdminService } from "@/services";
import { SUCCESS } from "@/constants";

type Props = {
  isModalCreateOpen: boolean;
  setIsModalCreateOpen: (value: boolean) => void;
  fetchDataProduct: () => void;
};

const ProductCreate = (props: Props) => {
  const { isModalCreateOpen, setIsModalCreateOpen, fetchDataProduct } = props;

  const handleCancel = () => {
    setIsModalCreateOpen(false);
  };

  const handleCreateProduct = async (data: T_PRODUCT_REQUEST) => {
    const res = await productAdminService.create(data);
    if (res) {
      message.success(SUCCESS.CREATE);
      handleCancel();
      fetchDataProduct();
    }
  };

  return (
    <Modal
      title="Create new product"
      open={isModalCreateOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <ProductForm handleCreateProduct={handleCreateProduct} />
    </Modal>
  );
};

export default ProductCreate;
