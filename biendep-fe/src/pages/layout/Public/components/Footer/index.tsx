import { FC } from "react";
import { FaFacebook, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ROUTE_URL } from "routes";

const Footer: FC = () => {
  return (
    <div className="footer">
      <div className="footer__container">
        {/* Logo và thông tin công ty */}
        <div className="footer__brand">
          <Link to={ROUTE_URL.HOME} style={{ textDecoration: "none" }}>
            <h2 className="footer__logo">Biển Đẹp Vinh Oanh</h2>
          </Link>
          <p className="footer__slogan">
            Uy tín - Chất lượng - Giá tốt nhất thị trường
          </p>

          <div className="footer__social">
            <a
              href={import.meta.env.VITE_FB}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="social-icon" />
            </a>
            {/* <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="social-icon" />
            </a> */}
          </div>
        </div>

        {/* Menu điều hướng */}
        <div className="footer__menu">
          <h3 className="footer__title">Liên kết nhanh</h3>
          <ul className="footer__links">
            <li>
              <a href="/">Trang chủ</a>
            </li>
            <li>
              <a href="/bien-so-dep">Biển số đẹp</a>
            </li>
            {/* <li>
              <a href="/bang-gia">Bảng giá</a>
            </li> */}
          </ul>
        </div>

        {/* Thông tin liên hệ */}
        <div className="footer__contact">
          <h3 className="footer__title">Liên hệ</h3>
          <ul className="footer__info">
            <li>
              <FaMapMarkerAlt className="contact-icon" />
              <span>98b Đường Láng, Đống Đa, Hà Nội</span>
            </li>
            <li>
              <FaPhone className="contact-icon" />
              <span>0943.365.555 - 0833.666.888</span>
            </li>
            {/* <li>
              <FaEnvelope className="contact-icon" />
              <span>vinhoanh.biendep@gmail.com</span>
            </li> */}
          </ul>
        </div>
      </div>

      {/* Bản quyền */}
      <div className="footer__copyright">
        <p>© 2025 Biển Đẹp Vinh Oanh. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
