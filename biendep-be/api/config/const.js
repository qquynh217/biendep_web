const kepPatternFunction = (digits) => {
  // Dạng XXYYZ
  const isXXYYZ =
    digits[0] === digits[1] &&
    digits[2] === digits[3] && // XX và YY
    digits[0] !== digits[2] && // X ≠ Y
    digits[4] !== digits[2]; // Z ≠ Y

  // Dạng ZYYXX
  const isZYYXX =
    digits[1] === digits[2] &&
    digits[3] === digits[4] && // YY và XX
    digits[2] !== digits[3] && // Y ≠ X
    digits[0] !== digits[2]; // Z ≠ Y

  return isXXYYZ || isZYYXX;
};

const haiPhimPatternFunction = (digits) => {
  const [a, b, c, d, e] = digits;

  const isAABAB = a === b && a === d && c === e && a !== c;
  const isABABA = a === c && a === e && b === d && a !== b;
  const isABBAB = b === c && a === d && b === e && a !== b;

  return isAABAB || isABABA || isABBAB;
};

module.exports = {
  LISENCE_PLATE: {
    TYPE: {
      ngu_quy: {
        point: 500,
        pattern: /^(\d)\1{4}$/,
        type: "quy",
      },
      tu_quy: {
        point: 400,
        pattern: /(\d)\1{3}/,
        type: "quy",
      },
      tam_hoa: {
        point: 300,
        pattern: /(\d)\1{2}/,
        type: "quy",
      },
      sanh_ngu: {
        point: 100,
        pattern: /(01235|12345|23456|34567|45678|56789)/,
        type: "sanh",
      },
      sanh_tu: {
        point: 80,
        pattern: /(0123|1234|2345|3456|4567|5678|6789)/,
        type: "sanh",
      },
      sanh_tam: {
        point: 60,
        pattern: /(012|123|234|345|456|567|678|789)/,
        type: "sanh",
      },
      kep: {
        point: 10,
        checkFunction: kepPatternFunction,
        type: "kep",
      },
      hai_phim: {
        point: 5,
        checkFunction: haiPhimPatternFunction,
        type: "phim",
      },
    },
  },
  PRICE_OPTION: {
    0: {
      min: 0,
    },
    1: {
      min: 50,
      max: 100,
    },
    2: {
      min: 100,
      max: 200,
    },
    3: {
      min: 200,
      max: 300,
    },
    4: {
      min: 300,
      max: 500,
    },
    5: {
      min: 500,
      max: 1000,
    },
    6: {
      min: 1000,
    },
  },
  HTTP_RESPONSE: {
    STATUS: {
      SUCCESS: 200,
      SERVER_ERROR: 500,
      INVALID_DATA: 400,
      NOT_FOUND: 404,
      CONFLICT: 409,
      UNAUTHORIZE: 403,
    },
    MESSAGE: {
      SERVER_ERROR:
        "Hệ thống đang gặp sự cố. Vui lòng liên hệ với quản trị viên để khắc phục.",
    },
  },
  JWT_EXPIRES: process.env.JWT_EXPIRES || "7d",
};
