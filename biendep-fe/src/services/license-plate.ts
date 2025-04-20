import { SearchParams } from "constants/interface";
import axiosInstance from "./axios";
import { formatQueryParams } from "utils";

class LicensePlateService {
  baseUrl = "/license-plate";

  search(params: SearchParams) {
    const queryParams = formatQueryParams(params);
    return axiosInstance.get(this.baseUrl + `?${queryParams}`);
  }

  getAll(params: SearchParams) {
    const queryParams = formatQueryParams(params);
    return axiosInstance.get(this.baseUrl + `/all?${queryParams}`);
  }

  getListHome() {
    return axiosInstance.get(this.baseUrl + "/home");
  }

  create(params: { plateCode: string; isVip: boolean; price: number, isHide?:boolean }) {
    return axiosInstance.post(this.baseUrl, params);
  }

  delete(id: string) {
    return axiosInstance.delete(this.baseUrl + `/${id}`);
  }

  edit(params: {
    types?: Array<String>;
    price?: number;
    isVip?: boolean;
    isHide?: boolean;
    id: string;
  }) {
    return axiosInstance.patch(this.baseUrl + `/${params.id}`, params);
  }
}

export const licensePlateService = new LicensePlateService();
