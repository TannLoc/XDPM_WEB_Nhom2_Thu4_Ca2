import { message, Modal } from "antd";

import BrandForm from "./BrandForm";
import { T_BRAND_REQUEST } from "@/types";
import { brandAdminServices } from "@/services";
import { SUCCESS } from "@/constants";

type Props = {
  isModalCreateOpen: boolean;
  setIsModalCreateOpen: (value: boolean) => void;
  fetchDataBrand: () => void;
};

const BrandCreate = (props: Props) => {
  const { isModalCreateOpen, setIsModalCreateOpen, fetchDataBrand } = props;

  const handleCancel = () => {
    setIsModalCreateOpen(false);
  };

  const handleCreateBrand = async (data: T_BRAND_REQUEST) => {
    const res = await brandAdminServices.create(data);
    if (res) {
      message.success(SUCCESS.CREATE);
      handleCancel();
      fetchDataBrand();
    }
  };

  return (
    <Modal
      title="Create new brand"
      open={isModalCreateOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <BrandForm handleCreateBrand={handleCreateBrand} />
    </Modal>
  );
};

export default BrandCreate;
