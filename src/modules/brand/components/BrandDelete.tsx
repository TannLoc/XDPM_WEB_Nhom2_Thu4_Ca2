import { message, Modal } from "antd";

import { brandAdminServices } from "@/services";
import { INFO, SUCCESS } from "@/constants";

type Props = {
  isModalDeleteOpen: boolean;
  setIsModalDeleteOpen: (value: boolean) => void;
  idBrand: number;
  fetchDataBrand: () => void;
};

const BrandDelete = (props: Props) => {
  const { isModalDeleteOpen, setIsModalDeleteOpen, idBrand, fetchDataBrand } =
    props;
  const [messageApi, contextHolder] = message.useMessage();

  const handleCancel = () => {
    setIsModalDeleteOpen(false);
  };

  const handleOk = () => {
    messageApi
      .open({
        type: "loading",
        content: INFO.LOADING,
      })
      .then(async () => {
        const res = await brandAdminServices.delete(idBrand);
        if (res) {
          message.success(SUCCESS.DELETE);
          fetchDataBrand();
        }
      })
      .then(handleCancel);
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Delete brand"
        onCancel={handleCancel}
        onOk={handleOk}
        open={isModalDeleteOpen}
      >
        <p>Are you sure to delete this brand?</p>
      </Modal>
    </>
  );
};

export default BrandDelete;
