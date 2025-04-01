import { message, Modal } from "antd";

import { shipmentServices } from "@/services";
import { INFO, SUCCESS } from "@/constants";

type Props = {
  isModalDeleteOpen: boolean;
  setIsModalDeleteOpen: (value: boolean) => void;
  idShipment: number;
  fetchDataShipment: () => void;
};

const ShipmentDelete = (props: Props) => {
  const {
    isModalDeleteOpen,
    setIsModalDeleteOpen,
    idShipment,
    fetchDataShipment,
  } = props;
  const [messageApi, contextHolder] = message.useMessage();

  const handleCancel = () => {
    setIsModalDeleteOpen(false);
  };

  const handleOk = async () => {
    messageApi
      .open({
        type: "loading",
        content: INFO.LOADING,
      })
      .then(async () => {
        const res = await shipmentServices.delete(idShipment);
        if (res) {
          message.success(SUCCESS.DELETE);
          fetchDataShipment();
        }
      })
      .then(handleCancel);
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Delete shipment"
        onCancel={handleCancel}
        onOk={handleOk}
        open={isModalDeleteOpen}
      >
        <p>Are you sure to delete this shipment?</p>
      </Modal>
    </>
  );
};

export default ShipmentDelete;
