import { ILisencePlate } from "constants/interface";
import { FC } from "react";
import { formatNumber } from "utils";

const LicensePlate: FC<{ item: ILisencePlate }> = ({ item }) => {
  return (
    <div className="license-plate_wrapper">
      <div className="license-plate">
        <div className="value">{item.formattedPlate}</div>
        <div className="price">{formatNumber(item.price)} ₫</div>
      </div>
    </div>
  );
};

export default LicensePlate;
