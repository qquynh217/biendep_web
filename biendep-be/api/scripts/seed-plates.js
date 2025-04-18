const { formatPlateCode } = require("../services/licesePlate.service");

// scripts/seed-plates.js
function getRandomDigit(excludeZero = false) {
  const digits = excludeZero ? "123456789" : "0123456789";
  return digits[Math.floor(Math.random() * digits.length)];
}
function getProvince(provinces) {
  return provinces[Math.floor(Math.random() * provinces.length)];
}
function getRandomUppercaseLetter() {
  const letters = "ABCDEFGHIJKLMN";
  return letters[Math.floor(Math.random() * letters.length)];
}
function generatePlateCode(provinces) {
  const formatType = Math.random() > 0.5 ? "XXY-XXXXX" : "XXYX-XXXXX";
  const provinceDigit = getProvince(provinces);
  const letter1 = getRandomUppercaseLetter();
  const thirdDigit = formatType === "XXYX-XXXXX" ? getRandomDigit(true) : "";
  const numberPart = Array.from({ length: 5 }, () => getRandomDigit()).join("");
  const isVip = Math.random() > 0.5 ? true : false;

  const plateCode = `${provinceDigit}${letter1}${thirdDigit}${numberPart}`;
  return {
    plateCode,
    formattedPlate: formatPlateCode(plateCode).formattedPlate,
    price: (Math.floor(Math.random() * 1_000) + 10) * 1_000_000,
    isVip: isVip,
  };
}
module.exports = async function seedPlates() {
  const count = 100;
  const data = await Province.find();
  const provinces = [];

  //   Lặp qua mảng của từng tỉnh thành
  for (let province of data) {
    for (let plate of province.plates) {
      provinces.push(plate);
    }
  }
  const plates = Array.from({ length: count }, () =>
    generatePlateCode(provinces)
  );

  try {
    const inserted = await LicensePlate.createEach(plates).fetch();
    console.log(`✅ Inserted ${inserted.length} plates`);
  } catch (err) {
    console.error("❌ Error seeding plates:", err);
  }
};
