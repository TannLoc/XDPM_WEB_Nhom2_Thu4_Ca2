import { Input } from "antd";
import React, { ChangeEvent, useState } from "react";
import { SmileOutlined } from "@ant-design/icons";

import { T_PRODUCT_PARAMS, T_PRODUCT_RESPONSE } from "@/types";
import { productClientService } from "@/services";
import SearchItem from "../Card/Search";
import { useDebounce } from "@/hooks";

const Search = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const [products, setProducts] = useState<T_PRODUCT_RESPONSE[]>([]);

  const fetchDataProducts = async (params: T_PRODUCT_PARAMS) => {
    const res = await productClientService.getAll(params);
    setProducts(res.data.response);
  };

  const handleSearchProduct = useDebounce((keyword: string) => {
      fetchDataProducts({ keyword });
    }, 300)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newKeyword = e.target.value;
    setKeyword(newKeyword);
    if (newKeyword === "") {
      setProducts([]);
      return;
    }
    handleSearchProduct(newKeyword);
  };

  const handleCloseSearchBox = () => {
    setIsClicked(false);
    setKeyword("");
    setProducts([]);
  };

  return (
    <div
      className="relative"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsClicked(false);
        }
      }}
      tabIndex={-1}
    >
      <Input
        prefix={<i className="bi bi-search text-gray"></i>}
        placeholder="Search"
        value={keyword}
        onChange={handleInputChange}
        onClick={() => setIsClicked(true)}
      />
      {isClicked && (
        <div
          className="absolute top-[100%] right-0 rounded-lg w-[360px] max-h-[420px] py-2 bg-white overflow-hidden shadow-xl"
          onClick={handleCloseSearchBox}
        >
          {products.length > 0 ? (
            products.map((item) => {
              return <SearchItem key={item.id} product={item}></SearchItem>;
            })
          ) : (
            <div className="p-5 text-center">
              <SmileOutlined style={{ fontSize: 20 }} />
              <p>Data Not Found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
