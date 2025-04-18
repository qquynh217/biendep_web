import axios from "axios";
import showMessage from "components/Message";
import { USER_STORAGE } from "constants";
import { ROUTE_URL, router } from "routes";

export const API_URL = import.meta.env.VITE_API;

const axiosInstance = axios.create({
  baseURL: API_URL, // Thay bằng URL API của bạn
  timeout: 10000,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Gắn token nếu có
    const token = localStorage.getItem(USER_STORAGE);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Xử lý lỗi (VD: hết hạn token)
    console.log(error.response);

    if (error.response && error.response.status === 403) {
      console.warn("Token hết hạn hoặc không hợp lệ");
      router.navigate(ROUTE_URL.ADMIN_LOGIN);
      localStorage.removeItem(USER_STORAGE);
      // Có thể chuyển hướng về trang login
      showMessage(
        "warning",
        "Phiên đăng nhập đã hết hạn. Xin hãy đăng nhập lại!"
      );
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
