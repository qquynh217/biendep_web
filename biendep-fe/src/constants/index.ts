import { ILisencePlate } from "./interface";

export const PROVINCE_STORAGE = "BienDepVO_PROVINCE";
export const USER_STORAGE = "BienDepVO_ME";

export const PRICE_OPTION = [
  { value: 0, label: "Tất cả" },
  { value: 1, label: "50tr - 100tr" },
  { value: 2, label: "100tr - 200tr" },
  { value: 3, label: "200tr - 300tr" },
  { value: 4, label: "300tr - 500tr" },
  { value: 5, label: "500tr - 1 Tỷ" },
  { value: 6, label: "Trên 1 Tỷ" },
];

export const LUCKYDIGIT_OPTION = [
  { value: null, label: "Tất cả" },
  { value: 0, label: "0" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
];

export const CHAR_OPTION = [
  { value: null, label: "Tất cả" },
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
  { value: "D", label: "D" },
  { value: "E", label: "E" },
  { value: "H", label: "H" },
  { value: "K", label: "K" },
  { value: "L", label: "L" },
  { value: "M", label: "M" },
  { value: "N", label: "N" },
];

export const TYPE_OPTION = [
  { value: null, label: "Tất cả" },
  { value: "ngu_quy", label: "Ngũ quý" }, // 5 số liên tiếp giống nhau
  { value: "tu_quy", label: "Tứ quý" }, // 4 số liên tiếp giống nhau
  { value: "tam_hoa", label: "Tam hoa" }, // 3 số liên tiếp giống nhau
  { value: "sanh_ngu", label: "Sảnh ngũ" }, // 5 số tiến liên tiếp
  { value: "sanh_tu", label: "Sảnh tứ" }, //
  { value: "sanh_tam", label: "Sảnh tam" },
  { value: "kep", label: "Kép" }, // 2 cặp số bên cạnh giống nhau
  { value: "hai_phim", label: "2 phím" }, // có 2 cặp số giống nhau
];

export const SORT_OPTION = [
  { value: null, label: "Mặc định" },
  { value: "asc", label: "Giá tăng ↑" },
  { value: "desc", label: "Giá giảm ↓" },
];

export const PLATE_PATTERN =
  /^([1-9][0-9]|0[1-9])(-[A-Z][0-9A-Z])(-[0-9]{3}\.[0-9]{2})$/;

export const initLicensePlate: ILisencePlate = {
  id: "",
  plateCode: "",
  formattedPlate: "",
  price: 0,
  createdAt: 0,
  updatedAt: 0,
  provinceCode: "",
  luckyDigit: 0,
  isVip: false,
  isHide: false,
  types: [],
  typePoint: 0,
  digitPoint: 0,
};
