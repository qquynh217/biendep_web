import { Input } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import location from "resources/icon/location-pin.png";
import phone from "resources/icon/phone-call.png";
import { ROUTE_URL } from "routes";

const { Search } = Input;

const Header: FC = () => {
  const navigate = useNavigate();
  const handleSubmit = (value: any) => {
    console.log(value);
    navigate(ROUTE_URL.SEARCH + `?key=${value}`);
  };
  return (
    <div className="public-header">
      <div className="public-header_top">
        <h2
          onClick={() => {
            navigate(ROUTE_URL.HOME);
          }}
        >
          Đấu giá biển số
        </h2>
      </div>
      <div className="public-header_content">
        <div className="content-inner">
          <div className="address">
            <img src={location} alt="" />
            <p>Địa chỉ: 918 Đường Láng</p>
          </div>
          <div className="search">
            <Search
              allowClear
              placeholder="Nhập biển số cần tìm"
              onSearch={handleSubmit}
              maxLength={11}
            />
          </div>
          <div className="hotline">
            <img src={phone} alt="" />
            <p>Hotline: 0833666888</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
