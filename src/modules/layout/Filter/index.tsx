"use client";
import {
  Button,
  Checkbox,
  Col,
  Drawer,
  Radio,
  RadioChangeEvent,
  Row,
  Space,
} from "antd";
import { useEffect, useState } from "react";

import { T_PICKLIST_OPTIONS_CLIENT, T_PRODUCT_PARAMS } from "@/types";
import { defaultProductParams } from "@/constants";
import { useGlobalState } from "@/store";
import { handleGetBrandCustomer, handleGetFeature, handleGetGender, handleGetMarketSegment, handleGetMovement, handleGetSize } from "@/utils";

type Props = {
  filterProductOpen: boolean;
  closeFilterProduct: () => void;
};

const Filter = (props: Props) => {
  const { filterProductOpen, closeFilterProduct } = props;
  const { productParams, setProductParams, fetchDataProducts } =
    useGlobalState();

  const [picklistOptions, setpicklistOptions] =
    useState<T_PICKLIST_OPTIONS_CLIENT>();

  const fetchDataPicklistOptions = async () => {
    const [brands, gender, marketSegment, movement, size, feature] =
      await Promise.all([
        handleGetBrandCustomer(),
        handleGetGender(),
        handleGetMarketSegment(),
        handleGetMovement(),
        handleGetSize(),
        handleGetFeature(),
      ]);
    setpicklistOptions({
      brandOptions: brands,
      genderOptions: gender,
      marketSegmentOptions: marketSegment,
      movementOptions: movement,
      sizeOptions: size,
      featureOptions: feature,
    });
  };

  useEffect(() => {
    fetchDataPicklistOptions();
  }, []);

  return (
    <Drawer
      title="Filter"
      onClose={closeFilterProduct}
      open={filterProductOpen}
      placement="left"
      extra={
        <Space>
          <Button
            icon={<i className="bi bi-x-lg"></i>}
            onClick={() => setProductParams(defaultProductParams)}
          >
            Clear
          </Button>
        </Space>
      }
    >
      {picklistOptions && (
        <>
          <div className="pb-5 border-b solid border-light-gray">
            <h2 className="mb-5 text-xl font-semibold">Brand</h2>
            <Radio.Group
              value={productParams.brandId}
              onChange={(e: RadioChangeEvent) =>
                setProductParams((prevState: T_PRODUCT_PARAMS) => ({
                  ...prevState,
                  brandId: e.target.value,
                }))
              }
            >
              <Row>
                {picklistOptions.brandOptions.map((item) => (
                  <Col span={8} key={item.id}>
                    <Radio value={item.id}>{item.name}</Radio>
                  </Col>
                ))}
              </Row>
            </Radio.Group>
          </div>
          <div className="pb-5 mt-5 border-b solid border-light-gray">
            <h2 className="mb-5 text-xl font-semibold">Gender</h2>
            <Radio.Group
              value={productParams.genderId}
              onChange={(e: RadioChangeEvent) =>
                setProductParams((prevState: T_PRODUCT_PARAMS) => ({
                  ...prevState,
                  genderId: e.target.value,
                }))
              }
            >
              <Row>
                {picklistOptions.genderOptions.map((item) => (
                  <Col span={10} key={item.id}>
                    <Radio value={item.id}>{item.label}</Radio>
                  </Col>
                ))}
              </Row>
            </Radio.Group>
          </div>
          <div className="pb-5 mt-5 border-b solid border-light-gray">
            <h2 className="mb-5 text-xl font-semibold">Market Segment</h2>
            <Radio.Group
              value={productParams.marketSegmentId}
              onChange={(e: RadioChangeEvent) =>
                setProductParams((prevState: T_PRODUCT_PARAMS) => ({
                  ...prevState,
                  marketSegmentId: e.target.value,
                }))
              }
            >
              <Row>
                {picklistOptions.marketSegmentOptions.map((item) => (
                  <Col span={12} key={item.id}>
                    <Radio value={item.id}>{item.label}</Radio>
                  </Col>
                ))}
              </Row>
            </Radio.Group>
          </div>
          <div className="pb-5 mt-5 border-b solid border-light-gray">
            <h2 className="mb-5 text-xl font-semibold">Movement</h2>
            <Radio.Group
              value={productParams.movementId}
              onChange={(e: RadioChangeEvent) =>
                setProductParams((prevState: T_PRODUCT_PARAMS) => ({
                  ...prevState,
                  movementId: e.target.value,
                }))
              }
            >
              <Row>
                {picklistOptions.movementOptions.map((item) => (
                  <Col span={10} key={item.id}>
                    <Radio value={item.id}>{item.label}</Radio>
                  </Col>
                ))}
              </Row>
            </Radio.Group>
          </div>
          <div className="pb-5 mt-5 border-b solid border-light-gray">
            <h2 className="mb-5 text-xl font-semibold">Size</h2>
            <Radio.Group
              value={productParams.sizeId}
              onChange={(e: RadioChangeEvent) =>
                setProductParams((prevState: T_PRODUCT_PARAMS) => ({
                  ...prevState,
                  sizeId: e.target.value,
                }))
              }
            >
              <Row>
                {picklistOptions.sizeOptions.map((item) => (
                  <Col span={12} key={item.id}>
                    <Radio value={item.id}>{item.label}</Radio>
                  </Col>
                ))}
              </Row>
            </Radio.Group>
          </div>
          <div className="pb-5 mt-5 border-b solid border-light-gray">
            <h2 className="mb-5 text-xl font-semibold">Feature</h2>
            <Checkbox.Group
              value={productParams.featureIds as number[]}
              onChange={(value: Array<number>) =>
                setProductParams((prevState: T_PRODUCT_PARAMS) => ({
                  ...prevState,
                  featureIds: value,
                }))
              }
            >
              <Row>
                {picklistOptions.featureOptions.map((item) => (
                  <Col span={12} key={item.id}>
                    <Checkbox value={item.id}>{item.label}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </div>
        </>
      )}
    </Drawer>
  );
};

export default Filter;
