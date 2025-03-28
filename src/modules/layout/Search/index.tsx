import { Input } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const Search = () => {
  return (
    <div className="relative">
      <Input
        prefix={<i className="bi bi-search text-gray"></i>}
        placeholder="Search"
      />
      {/* <div className="absolute top-[100%] right-0 rounded-lg w-[360px] max-h-[420px] py-2 bg-white overflow-hidden shadow-xl">
        <div className="p-5 text-center">
          <SmileOutlined style={{ fontSize: 20 }} />
          <p>Data Not Found</p>
        </div>
      </div> */}
    </div>
  );
};

export default Search;
