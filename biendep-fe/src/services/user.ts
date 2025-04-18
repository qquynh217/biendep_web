import axiosInstance from "./axios";

class UserService {
  baseUrl = "/user";
  login(params: { username: string; password: string }) {
    return axiosInstance.post(this.baseUrl + "/login", params);
  }
}

export const userSerive = new UserService();
