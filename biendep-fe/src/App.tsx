/* eslint-disable react-refresh/only-export-components */
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { withTranslation } from "react-i18next";
import { provinceSerive } from "services/province";
import { PROVINCE_STORAGE } from "constants";
import { useEffect } from "react";

function App() {
  const getProvince = async () => {
    try {
      const res = await provinceSerive.get();
      const data = res.data;

      localStorage.setItem(PROVINCE_STORAGE, JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProvince();
  }, []);
  return <RouterProvider router={router} />;
}

export default withTranslation()(App);
