import { SearchParams } from "constants/interface";

export function formatNumber(number: number | string) {
  if (!number) return number;
  return number.toLocaleString("vn-VN");
}

export function formatLicensePlate(value: string) {
  // Loại bỏ tất cả ký tự không phải chữ cái hoặc số
  const cleaned = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  const length = cleaned.length;
  // Kiểm tra độ dài hợp lệ (tối thiểu 5 ký tự)
  if (length != 8 && length != 9) {
    return value;
  }

  const part1 = cleaned.substring(0, length - 5);
  const part2 = cleaned.substring(length - 5);

  return part1 + "-" + part2.substring(0, 3) + "." + part2.substring(3);
}

export function formatQueryParams(params: SearchParams) {
  const queryParams = new URLSearchParams();

  Object.keys(params).forEach((key: string) => {
    const value = params[key as keyof SearchParams];

    if (params.hasOwnProperty(key) && value != undefined && value != null) {
      if (typeof value == "object") {
        queryParams.append(key, JSON.stringify(value));
      } else {
        queryParams.append(key, value.toString());
      }
    }
  });

  return queryParams.toString();
}

export function formatTimestamp(timestamp: number | string) {
  // Tạo đối tượng Date từ timestamp (tính bằng milliseconds)
  const date = new Date(timestamp); // Nhân 1000 nếu timestamp là seconds

  // Lấy các thành phần ngày tháng năm
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = date.getFullYear();
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  // Kết hợp thành chuỗi DD-MM-YYYY
  return `${day}/${month}/${year} ${hour}:${minute}`;
}
