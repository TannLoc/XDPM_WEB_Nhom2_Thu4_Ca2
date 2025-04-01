import { message, Modal } from "antd";

import ShipmentForm from "./ShipmentForm";
import { shipmentServices } from "@/services";
import { T_SHIPMENT_REQUEST } from "@/types";
import { SUCCESS } from "@/constants";

type Props = {
  isModalCreateOpen: boolean;
  setIsModalCreateOpen: (value: boolean) => void;
  fetchDataShipment: () => void;
};

const ShipmentCreate = (props: Props) => {
  const { isModalCreateOpen, setIsModalCreateOpen, fetchDataShipment } = props;

  const handleCancel = () => {
    setIsModalCreateOpen(false);
  };

  const handleCreateShipment = async (data: T_SHIPMENT_REQUEST) => {
    const res = await shipmentServices.create(data);
    if (res) {
      message.success(SUCCESS.CREATE);
      handleCancel();
      fetchDataShipment();
    }
  };

  return (
    <Modal
      title="Create new shipment"
      open={isModalCreateOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <ShipmentForm handleCreateShipment={handleCreateShipment} />
    </Modal>
  );
};

export default ShipmentCreate;
