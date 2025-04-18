import FilterBox from "components/FilterBox";
import HomeBanner from "components/HomeBanner";
import LicensePlate from "components/LicensePlate";
import { ILisencePlate } from "constants/interface";
import { useEffect, useState, type FC } from "react";
import { licensePlateService } from "services/license-plate";

const HomePage: FC = () => {
  const [data, setData] = useState<{
    vips: Array<ILisencePlate>;
    hanoi: Array<ILisencePlate>;
    hcm: Array<ILisencePlate>;
    other: Array<ILisencePlate>;
    sanhVip: Array<ILisencePlate>;
  }>({
    vips: [],
    hanoi: [],
    hcm: [],
    other: [],
    sanhVip: [],
  });
  const fetchData = async () => {
    try {
      const res = await licensePlateService.getListHome();
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="home-page">
      <HomeBanner />
      <div className="home-page-content">
        <FilterBox />
        <h2 className="title">Biển số VIP</h2>
        <div className="license-plates_container vip">
          {data.vips.map((item) => (
            <LicensePlate item={item} key={item.formattedPlate} />
          ))}
        </div>
        <h2 className="title">Biển số đẹp Hà Nội</h2>
        <div className="license-plates_container hanoi">
          {data.hanoi.map((item) => (
            <LicensePlate item={item} key={item.formattedPlate} />
          ))}
        </div>
        <h2 className="title">Biển số đẹp TP HCM</h2>
        <div className="license-plates_container hcm">
          {data.hcm.map((item) => (
            <LicensePlate item={item} key={item.formattedPlate} />
          ))}
        </div>
        <h2 className="title">Biển số đẹp các tỉnh</h2>
        <div className="license-plates_container other">
          {data.other.map((item) => (
            <LicensePlate item={item} key={item.formattedPlate} />
          ))}
        </div>
        <h2 className="title">Biển số sảnh VIP</h2>
        <div className="license-plates_container sanh_vip">
          {data.sanhVip.map((item) => (
            <LicensePlate item={item} key={item.formattedPlate} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
