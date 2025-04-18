import axiosInstance from "./axios";

class ProvinceService {
  baseUrl = "/province";
  get() {
    return axiosInstance.get(this.baseUrl);
  }
}

export const provinceSerive = new ProvinceService();
