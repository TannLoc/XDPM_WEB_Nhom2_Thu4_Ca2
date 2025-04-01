"use client";
import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Input, message, Select, Space } from "antd";
import type { InputRef } from "antd";

import {
  T_BRAND_RESPONE,
  T_PICKLIST_RESPONSE,
  T_PRODUCT_RESPONSE,
} from "@/types";
import { brandAdminServices, pickListServices, productAdminService } from "@/services";
import {
  ERROR,
  PICKLIST,
  SUCCESS,
  WARNING,
} from "@/constants";
import {
  handleGetFeature,
  handleGetGender,
  handleGetMarketSegment,
  handleGetMovement,
  handleGetSize,
} from "@/utils";


type Props = {
  value?: { value: string; label: React.ReactNode };
  onChange?: () => void;
  picklistType?: string;
  mode?: "multiple" | "tags" | undefined;
  isAddItem?: boolean;
  widthCustom?: number | string;
  dataOptions?: T_PICKLIST_RESPONSE | T_PICKLIST_RESPONSE[];
};

const SelectOption = (props: Props) => {
  const {
    value,
    onChange,
    picklistType,
    mode,
    isAddItem,
    widthCustom,
    dataOptions,
  } = props;

  const [items, setItems] = useState<T_PICKLIST_RESPONSE[]>([]);
  const [name, setName] = useState<string>("");
  const inputRef = useRef<InputRef>(null);

  const fetchData = async () => {
    let response;
    let temp
    const params = { pageSize: 100 };
    switch (picklistType) {
      case PICKLIST.PRODUCT:
        temp = await productAdminService.getAll(params);
        response = temp.data.response;
        break;
      case PICKLIST.PRODUCT_GENDER:
        response = await handleGetGender();
        break;
      case PICKLIST.PRODUCT_SIZE:
        response = await handleGetSize();
        break;
      case PICKLIST.PRODUCT_FEATURE:
        response = await handleGetFeature();
        break;
      case PICKLIST.PRODUCT_MOVENMENT:
        response = await handleGetMovement();
        break;
      case PICKLIST.BRAND:
        temp = await brandAdminServices.getAll(params);
        response = temp.data.response;
        break;
      case PICKLIST.PRODUCT_MARKET_SEGMENT:
        response = await handleGetMarketSegment();
        break;
    }

    return response;
  };

  const handleGetData = async () => {
    setItems([]);
    const data = await fetchData();
    
    const newDataOptions = (
      data as (T_PICKLIST_RESPONSE | T_PRODUCT_RESPONSE | T_BRAND_RESPONE)[]
    ).map((item) => {
      if ("name" in item)
        return {
          id: item.id,
          label: item.name,
        };
      else {
        return {
          id: item.id,
          label: item.label,
        };
      }
    });
    setItems(newDataOptions as T_PICKLIST_RESPONSE[]);
  };

  const handleCreateItemPicklist = async (name: string) => {
    const data = { label: name, type: picklistType };
    const res = await pickListServices.create(data);
    if (res) {
      handleGetData();
      message.success(SUCCESS.ADD_ITEM_PICKLIST);
    } else {
      message.error(ERROR.ADD_ITEM_PICKLIST);
    }
  };

  const onLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    let flag = true;
    if (name === "" || name === null) {
      message.warning(WARNING.FIELD_IS_NOT_NULL);
      flag = false;
    }

    if (items.some((item: T_PICKLIST_RESPONSE) => item.label === name)) {
      message.warning(WARNING.ITEM_ALREADY_EXISTS);
      flag = false;
    }

    if (flag) {
      handleCreateItemPicklist(name);
      setName("");
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    if (dataOptions) {
      if (Array.isArray(dataOptions)) {
        setItems((prevState) => [...prevState, ...dataOptions]);
      } else {
        const newItem = { id: dataOptions.id, label: dataOptions.label };
        setItems((prevState) => [...prevState, newItem]);
      }
    }
  }, [dataOptions]);

  return (
    <Select
      onClick={handleGetData}
      style={{ width: widthCustom || "100%" }}
      mode={mode}
      dropdownRender={
        isAddItem
          ? (menu) => (
              <>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Space style={{ padding: "0 8px 4px" }}>
                  <Input
                    placeholder="Please enter item"
                    ref={inputRef}
                    value={name}
                    onChange={onLabelChange}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                    Add item
                  </Button>
                </Space>
              </>
            )
          : undefined
      }
      options={items.map((item: T_PICKLIST_RESPONSE) => ({
        label: item.label,
        value: item.id,
      }))}
      onChange={onChange}
      value={value}
    />
  );
};

export default SelectOption;
