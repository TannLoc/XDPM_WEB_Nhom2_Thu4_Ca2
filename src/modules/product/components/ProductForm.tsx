import { Button, Form, Input, InputNumber, message, UploadFile } from "antd";
import React, { useEffect, useState } from "react";

import { UploadImage, SelectOption } from "@/modules/layout";
import { ERROR, INFO, PICKLIST } from "@/constants";
import {
  T_ONE_PRODUCT_RESPONSE,
  T_PICKLIST_OPTIONS_ADMIN,
  T_PRODUCT_REQUEST,
} from "@/types";
import { uploadImage } from "@/utils";

type Props = {
  handleCreateProduct?: (value: T_PRODUCT_REQUEST) => void;
  dataGetOneProduct?: T_ONE_PRODUCT_RESPONSE;
  handleEditOneProduct?: (value: T_PRODUCT_REQUEST) => void;
};

const ProductForm = (props: Props) => {
  const { handleCreateProduct, dataGetOneProduct, handleEditOneProduct } =
    props;
  const [messageApi, contextHolder] = message.useMessage();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [thumbnailFile, setThumbnailFile] = useState<UploadFile>();
  const [dataOptions, setDataOptions] = useState<T_PICKLIST_OPTIONS_ADMIN>();

  const [form] = Form.useForm();

  const handleClearData = () => {
    form.resetFields();
    setFileList([]);
    setThumbnailFile(undefined);
  };

  const onFinish = ({ values }: { values: T_PRODUCT_REQUEST }) => {
    messageApi
      .open({
        type: "loading",
        content: INFO.LOADING,
      })
      .then(async () => {
        const data = {
          name: values.name,
          code: values.code,
          price: values.price,
          salesPrice: values.salesPrice,
          featureIds: values.featureIds,
          movementId: values.movementId,
          brandId: values.brandId,
          marketSegmentId: values.marketSegmentId,
          sizeId: values.sizeId,
          genderId: values.genderId,
        };

        if (handleCreateProduct) {
          const newThumbnail = await uploadImage(
            thumbnailFile || fileList[0] || null
          );
          const newData = { ...data, imageId: newThumbnail?.id ?? null };
          handleCreateProduct(newData);
          handleClearData();
        }

        if (handleEditOneProduct) {
          if (!thumbnailFile) {
            message.error(ERROR.THUMBNAIL_IS_NULL);
            return;
          }

          const newThumbnail = await Promise.all(
            fileList
              .filter((item) => item.uid === thumbnailFile?.uid)
              .map(async (item) => {
                if (item.originFileObj) {
                  const newThumbnail = await uploadImage(thumbnailFile);
                  return newThumbnail;
                } else {
                  return item;
                }
              })
          );

          const newFileList = await Promise.all(
            fileList.map(async (item) => {
              if (item.uid !== thumbnailFile.uid) {
                if (item.originFileObj) {
                  const newImage = await uploadImage(item);
                  if (newImage) {
                    return {
                      uid: String(newImage.id),
                      name: "Image.png",
                      url: newImage.url,
                    };
                  }
                }
                return item;
              } else {
                return null;
              }
            })
          );
          const filteredFileList = newFileList.filter(Boolean);
          const imageIds = filteredFileList.map((item) => Number(item!.uid));
          const newData = {
            ...data,
            imageId: newThumbnail[0].id || Number(newThumbnail[0].uid),
            imageIds,
          };

          handleEditOneProduct(newData);
          handleClearData();
        }
      });
  };

  useEffect(() => {
    if (dataGetOneProduct) {
      const brandOptions = {
        id: dataGetOneProduct?.brand?.id,
        label: dataGetOneProduct?.brand?.name,
      };
      const genderOptions = {
        id: dataGetOneProduct?.gender?.id,
        label: dataGetOneProduct?.gender?.label,
      };
      const marketSegmentOptions = {
        id: dataGetOneProduct?.marketSegment?.id,
        label: dataGetOneProduct?.marketSegment?.label,
      };
      const movementOptions = {
        id: dataGetOneProduct?.movement?.id,
        label: dataGetOneProduct?.movement?.label,
      };
      const sizeOptions = {
        id: dataGetOneProduct?.size?.id,
        label: dataGetOneProduct?.size?.label,
      };
      const featureOptions = dataGetOneProduct.features.map((item) => {
        return { id: item.id, label: item.label };
      });

      setDataOptions({
        brandOptions,
        genderOptions,
        marketSegmentOptions,
        movementOptions,
        sizeOptions,
        featureOptions,
      });

      const featureIds: { id: number }[] = [];

      if (Array.isArray(dataGetOneProduct.features))
        dataGetOneProduct.features.map((item) => {
          featureIds.push({ id: item.id });
        });

      form.setFieldValue("code", dataGetOneProduct?.code);
      form.setFieldValue("name", dataGetOneProduct?.name);
      form.setFieldValue("price", dataGetOneProduct?.price);
      form.setFieldValue("salesPrice", dataGetOneProduct?.salesPrice);
      form.setFieldValue("genderId", genderOptions.id);
      form.setFieldValue("sizeId", sizeOptions.id);
      form.setFieldValue(
        "featureIds",
        featureOptions.map((item) => item.id)
      );
      form.setFieldValue("movementId", movementOptions.id);
      form.setFieldValue("brandId", brandOptions.id);
      form.setFieldValue("marketSegmentId", marketSegmentOptions.id);
      const { image, images } = dataGetOneProduct || {};

      if (image) {
        const oldThumbnail = {
          uid: String(image.id),
          name: "Image.png",
          url: image.url,
        };
        setThumbnailFile(oldThumbnail);
        setFileList([
          oldThumbnail,
          ...images
            ?.filter((item) => item.id !== image.id)
            .map((item) => ({
              uid: String(item.id),
              name: "Image.png",
              url: item.url,
            })),
        ]);
      } else if (images) {
        const newFiles = images.map((item) => ({
          uid: String(item.id),
          name: "Image.png",
          url: item.url,
        }));
        setFileList(newFiles);
      }
    }
  }, [dataGetOneProduct]);

  return (
    <>
      {contextHolder}
      <Form
        labelCol={{ span: 6 }}
        labelAlign="left"
        labelWrap={true}
        layout="horizontal"
        form={form}
        onFinish={(values) => onFinish({ values })}
      >
        <Form.Item
          label="Code"
          name="code"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input type="text" placeholder="Code" />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input type="text" placeholder="Name" />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <InputNumber placeholder="Price" min={0} style={{ width: 160 }} />
        </Form.Item>
        <Form.Item
          label="Sale price"
          name="salesPrice"
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || value <= getFieldValue("price")) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Sale price must be less than or equal price")
                );
              },
            }),
            { required: true, message: "This field is required" },
          ]}
        >
          <InputNumber
            placeholder="Sale price"
            min={0}
            style={{ width: 160 }}
          />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="genderId"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <SelectOption
            picklistType={PICKLIST.PRODUCT_GENDER}
            isAddItem={true}
            dataOptions={dataOptions?.genderOptions}
          />
        </Form.Item>
        <Form.Item
          label="Size"
          name="sizeId"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <SelectOption
            picklistType={PICKLIST.PRODUCT_SIZE}
            isAddItem={true}
            dataOptions={dataOptions?.sizeOptions}
          />
        </Form.Item>
        <Form.Item
          label="Feature"
          name="featureIds"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <SelectOption
            picklistType={PICKLIST.PRODUCT_FEATURE}
            mode="multiple"
            isAddItem={true}
            dataOptions={dataOptions?.featureOptions}
          />
        </Form.Item>
        <Form.Item
          label="Movement"
          name="movementId"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <SelectOption
            picklistType={PICKLIST.PRODUCT_MOVENMENT}
            isAddItem={true}
            dataOptions={dataOptions?.movementOptions}
          />
        </Form.Item>
        <Form.Item
          label="Brand"
          name="brandId"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <SelectOption
            isAddItem={false}
            picklistType={PICKLIST.BRAND}
            dataOptions={dataOptions?.brandOptions}
          />
        </Form.Item>
        <Form.Item
          label="Market segment"
          name="marketSegmentId"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <SelectOption
            picklistType={PICKLIST.PRODUCT_MARKET_SEGMENT}
            isAddItem={true}
            dataOptions={dataOptions?.marketSegmentOptions}
          />
        </Form.Item>
        <Form.Item label="Image" name="image">
          <UploadImage
            fileList={fileList}
            setFileList={setFileList}
            lenghtFileList={dataGetOneProduct && 5}
            setThumbnailFile={setThumbnailFile}
          />
        </Form.Item>

        <Form.Item className="text-end">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProductForm;
