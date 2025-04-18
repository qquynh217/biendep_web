import { Input } from "antd";
import { FC } from "react";
import location from "resources/icon/location-pin.png";
import phone from "resources/icon/phone-call.png";

const { Search } = Input;

const Header: FC = () => {
  return (
    <div className="public-header">
      <div className="public-header_top">
        <h2>Biển đẹp Vinh Oanh</h2>
      </div>
      <div className="public-header_content">
        <div className="content-inner">
          <div className="address">
            <img src={location} alt="" />
            <p>Địa chỉ: 918b Đường Láng</p>
          </div>
          <div className="search">
            <Search allowClear placeholder="Nhập biển số cần tìm" />
          </div>
          <div className="hotline">
            <img src={phone} alt="" />
            <p>Hotline: 0943365555</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
