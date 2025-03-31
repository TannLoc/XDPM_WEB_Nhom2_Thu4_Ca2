"use client";
import { Form, FormInstance, Input, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import {
  T_CITY_RESPONSE,
  T_DISTRICT_RESPONSE,
  T_ITEMS_LOCATION,
  T_WARD_RESPONSE,
} from "@/types";
import { locationServices } from "@/services";
import TextArea from "antd/es/input/TextArea";

type Props = { form: FormInstance };

type T_OPTIONS = {
  value: string;
  label: string;
};
const OrderForm = (props: Props) => {
  const { form } = props;
  const [cityName, setCityName] = useState<string>("");
  const [districtName, setDistrictName] = useState<string>("");
  const [cities, setCities] = useState<T_ITEMS_LOCATION[]>();
  const [districts, setDistricts] = useState<T_ITEMS_LOCATION[]>();
  const [wards, setWards] = useState<T_ITEMS_LOCATION[]>();
  const [cityOptions, setCityOptions] = useState<Array<T_OPTIONS>>();
  const [districtOptions, setDistrictOptions] = useState<Array<T_OPTIONS>>();
  const [wardOptions, setWardOptions] = useState<Array<T_OPTIONS>>();
  const [loading, setLoading] = useState(false);

  const getDataCity = async () => {
    setLoading(true);
    try {
      const res = await locationServices.getCity();
      if (res) {
        const cityData = res.data.map((item: T_CITY_RESPONSE) => ({
          name: item.name,
          code: item.code,
        }));
        setCities(cityData);
        setLoading(false);
        return cityData;
      }
    } catch (error) {
      throw error;
    }
  };

  const getDataDistrict = async (code: number) => {
    try {
      const res = await locationServices.getDistrict(code);
      if (res) {
        const districtData = res.data.districts.map((item: T_DISTRICT_RESPONSE) => ({
          name: item.name,
          code: item.code,
        }));
        setDistricts(districtData);
        return districtData;
      }
    } catch (error) {
      throw error;
    }
  };

  const getDataWard = async (code: number) => {
    try {
      const res = await locationServices.getWard(code);
      if (res) {
        const wardData = res.data.wards.map((item: T_WARD_RESPONSE) => ({
          name: item.name,
          code: item.code,
        }));
        setWards(wardData);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleCityChange = (name: string) => {
    setCityName(name);
    form.setFieldValue("district", "");
    form.setFieldValue("ward", "");
  };

  const handleDistrictChange = (name: string) => {
    setDistrictName(name);
    form.setFieldValue("ward", "");
  };

  const handleClickDistrict = async () => {
    setLoading(true);
    let cityData;
    if (!cities) {
      cityData = await getDataCity();
    }
    const city = (cityData || cities).find(
      (item: T_ITEMS_LOCATION) => item.name === cityName
    );
    getDataDistrict(city.code);
    setLoading(false);
  };

  const handleClickWard = async () => {
    setLoading(true);
    let city;
    let districtData;
    if (!cities) {
      const cityData = await getDataCity();
      city = cityData?.find((item: T_ITEMS_LOCATION) => item.name === cityName);
      districtData = await getDataDistrict(city.code);
    } else if (!districts) {
      city = cities?.find((item: T_ITEMS_LOCATION) => item.name === cityName);
      districtData = await getDataDistrict(city!.code);
    }
    const district = (districtData || districts).find(
      (item: T_ITEMS_LOCATION) => item.name === districtName
    );
    getDataWard(district.code);
    setLoading(false);
  };

  // DATA OPTIONS
  useEffect(() => {
    if (cities) {
      const cityData = cities.map((item) => ({
        value: item.name,
        label: item.name,
      }));
      setCityOptions(cityData);
    }
  }, [cities]);

  useEffect(() => {
    if (districts) {
      const districtData = districts.map((item) => ({
        value: item.name,
        label: item.name,
      }));
      setDistrictOptions(districtData);
    }
  }, [districts]);

  useEffect(() => {
    if (wards) {
      const wardData = wards.map((item) => ({
        value: item.name,
        label: item.name,
      }));
      setWardOptions(wardData);
    }
  }, [wards]);

  useEffect(() => {
    if (form) {
      setCityName(form.getFieldValue("city"));
      setDistrictName(form.getFieldValue("district"));
    }
  }, [form]);

  return (
    <Form
      layout="horizontal"
      labelAlign="left"
      labelCol={{ span: 4 }}
      className="mt-5"
      form={form}
    >
      <Form.Item
        name="text"
        label="House number"
        rules={[{ required: true, message: "This field is required" }]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        name="city"
        label="City"
        rules={[{ required: true, message: "This field is required" }]}
      >
        <Select
          notFoundContent={loading ? <Spin size="small" /> : null}
          onClick={getDataCity}
          options={cityOptions}
          style={{ width: 200 }}
          onChange={(value) => handleCityChange(value)}
        ></Select>
      </Form.Item>
      <Form.Item
        name="district"
        label="District"
        rules={[{ required: true, message: "This field is required" }]}
      >
        <Select
          onClick={handleClickDistrict}
          notFoundContent={loading ? <Spin size="small" /> : null}
          options={districtOptions}
          style={{ width: 200 }}
          onChange={(value) => handleDistrictChange(value)}
        ></Select>
      </Form.Item>
      <Form.Item
        name="ward"
        label="Ward"
        rules={[{ required: true, message: "This field is required" }]}
      >
        <Select
          onClick={handleClickWard}
          notFoundContent={loading ? <Spin size="small" /> : null}
          options={wardOptions}
          style={{ width: 200 }}
        ></Select>
      </Form.Item>
      <Form.Item name="note" label="Note">
        <TextArea
          rows={4}
          placeholder="More information for us"
          data-gramm="false"
        />
      </Form.Item>
    </Form>
  );
};

export default OrderForm;
