import { FloatButton } from "antd";
import type { FC } from "react";
import { FaFacebookF, FaPhone } from "react-icons/fa6";
import { SiZalo } from "react-icons/si";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

const PublicLayout: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <FloatButton.Group
        shape="circle"
        style={{ insetInlineEnd: 16, bottom: 70 }}
      >
        <FloatButton
          icon={<FaFacebookF />}
          href={import.meta.env.VITE_FB}
          target="_blank"
          className="app-float-btn fb_link"
        />
        <FloatButton
          icon={<SiZalo />}
          href={import.meta.env.VITE_ZALO}
          target="_blank"
          className="app-float-btn zalo_link"
        />
        <FloatButton
          icon={<FaPhone />}
          href={import.meta.env.VITE_PHONE}
          target="_blank"
          className="app-float-btn phone_link"
        />
        {/* <FloatButton.BackTop visibilityHeight={0} /> */}
      </FloatButton.Group>
    </>
  );
};
export default PublicLayout;
