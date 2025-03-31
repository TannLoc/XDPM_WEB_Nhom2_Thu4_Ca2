"use client";
import { GetProp, message, Upload, UploadFile, UploadProps, Modal } from "antd";
import ImgCrop from "antd-img-crop";
import Image from "next/image";
import { useState } from "react";

import { SUCCESS } from "@/constants";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

type Props = {
  listTypeCustom?: "picture-card" | "picture-circle";
  fileList: UploadFile[];
  setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  setThumbnailFile?: React.Dispatch<
    React.SetStateAction<UploadFile | undefined>
  >;
  lenghtFileList?: number;
};

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadImage = (props: Props) => {
  const {
    listTypeCustom,
    fileList,
    setFileList,
    setThumbnailFile,
    lenghtFileList,
  } = props;

  const [previewImage, setPreviewImage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [file, setFile] = useState<UploadFile>();

  const handlePreviewThumbnail = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setFile(file);
    setPreviewImage(file.url || (file.preview as string));
    setIsModalOpen(true);
  };

  const handleSetThumbnail = () => {
    if (file && setThumbnailFile) {
      message.success(SUCCESS.THUMBNAIL);
      setThumbnailFile(file);
      onCancel();
    }
  };

  const onCancel = () => {
    setIsModalOpen(false);
  };

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  return (
    <>
      <ImgCrop rotationSlider aspect={40 / 40}>
        <Upload
          fileList={fileList}
          listType={listTypeCustom || "picture-card"}
          onChange={onChange}
          beforeUpload={beforeUpload}
          itemRender={(originNode, file) => (
            <span
              onClick={() => handlePreviewThumbnail(file)}
              style={{ cursor: "pointer" }}
            >
              {originNode}
            </span>
          )}
        >
          {fileList.length < (lenghtFileList || 1) && "+ Upload"}
        </Upload>
      </ImgCrop>
      {setThumbnailFile && (
        <Modal
          title="Set as thumbnail"
          open={isModalOpen}
          onCancel={onCancel}
          onOk={() => handleSetThumbnail()}
        >
          <Image
            src={previewImage}
            alt="Image"
            width={200}
            height={200}
            className="w-full h-full"
          />
        </Modal>
      )}
    </>
  );
};

export default UploadImage;
