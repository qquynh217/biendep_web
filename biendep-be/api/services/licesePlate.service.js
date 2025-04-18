const { LISENCE_PLATE } = require("../config/const");

const formatPlateCode = (plateCode) => {
  // Loại bỏ tất cả ký tự không phải chữ cái hoặc số
  const cleaned = plateCode.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  const length = cleaned.length;
  // Kiểm tra độ dài hợp lệ
  if (length != 8 && length != 9) {
    return false;
  }
  const part1 = cleaned.substring(0, length - 5);
  const part2 = cleaned.substring(length - 5);

  return {
    formattedPlate:
      part1 + "-" + part2.substring(0, 3) + "." + part2.substring(3),
    cleanedPlate: cleaned,
  };
};

const calculateLuckyDigit = (plateCode) => {
  const digits = plateCode.match(/\d/g); // Lấy tất cả chữ số
  const last5 = digits.slice(-5);
  if (!last5) return 0;
  const total = last5.reduce((sum, d) => sum + parseInt(d, 10), 0);
  return total % 10; // Số nút = tổng các chữ số % 10
};

const analyzePlateType = (plateCode) => {
  const last5 = plateCode.slice(-5);
  const types = [];
  let typePoint = 0;
  let digitPoint = 0;

  for (const key of Object.keys(LISENCE_PLATE.TYPE)) {
    const type = LISENCE_PLATE.TYPE[key];
    if (types.length > 0) {
      const similarType = types.find(
        (item) => LISENCE_PLATE.TYPE[item].type == type.type
      );
      if (similarType) continue;
    }

    if (type.pattern) {
      if (type.pattern.test(last5)) {
        types.push(key);
        typePoint += type.point;
        digitPoint += +last5.match(type.pattern)[0];
      }
    }
    if (type.checkFunction) {
      const checkType = type.checkFunction(last5);
      if (checkType) {
        types.push(key);
        typePoint += type.point;
        digitPoint += +checkType;
      }
    }
  }
  return {
    types,
    typePoint,
    digitPoint,
  };
};

module.exports = {
  calculateLuckyDigit,
  analyzePlateType,
  formatPlateCode,
};
