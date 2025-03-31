import { imageServices } from "@/services";
import { UploadFile } from "antd";

export const uploadImage = async (file: UploadFile) => {
  if (file === null || file === undefined) {
    return;
  }
  const formData = new FormData();
  formData.append("file", file.originFileObj || (file as unknown as Blob));
  try {
    const res = await imageServices.upload(formData);
    if (res) {
      return res.data.response;
    }
  } catch (error) {
    throw error;
  }
};
