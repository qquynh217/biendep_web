import { Carousel } from "antd";
import CustomArrow from "components/CustomArrow";
import { FC } from "react";
import banner from "resources/images/banner.webp";
import banner1 from "resources/images/banner1.jpg";

const HomeBanner: FC = () => {
  return (
    <div className="home-banner">
      <Carousel
        arrows
        infinite={true}
        autoplay
        autoplaySpeed={5000}
        nextArrow={<CustomArrow type="next" />}
        prevArrow={<CustomArrow type="prev" />}
      >
        <div className="banner-default banner-item">
          <img src={banner} alt="" />
          <div className="banner-content">
            <div className="banner-content_inner">
              <h2>Sở hữu biển số đẹp </h2>
              <h2>Khẳng định đẳng cấp chủ xe</h2>
              <ul>
                <li>Biển số VIP – Phong thủy – Tứ Quý – Lộc Phát – Độc Nhất</li>
                <li>Cam kết pháp lý rõ ràng – Giao dịch minh bạch</li>
                <li>Liên hệ ngay để được tư vấn miễn phí!</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="banner-item">
          <img src={banner1} alt="" />
        </div>
      </Carousel>
    </div>
  );
};
export default HomeBanner;
