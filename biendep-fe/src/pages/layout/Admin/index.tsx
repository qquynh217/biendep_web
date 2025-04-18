import { Button, Layout, Menu, theme } from "antd";
import { USER_STORAGE } from "constants";
import { useUser } from "context/UserContext";
import { FC, useEffect, useState } from "react";
import { BsTextIndentLeft, BsTextIndentRight } from "react-icons/bs";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ROUTE_URL, sidebarItems } from "routes";
import Footer from "../Public/components/Footer";

const { Header, Sider, Content } = Layout;

const AdminLayout: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, setUserData, logout } = useUser();
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    const storedToken = localStorage.getItem(USER_STORAGE);

    if (!storedToken) navigate(ROUTE_URL.ADMIN_LOGIN);
    else {
      setUserData(storedToken);
      navigate(
        location.pathname != ROUTE_URL.ADMIN
          ? location.pathname
          : ROUTE_URL.ADMIN_LICENSE_PLATE
      );
    }
  }, [token]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <Layout className="admin-layout">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ background: colorBgContainer }}
        >
          <div className="logo-vertical">
            <div className="logo-inner">{/* <img src={logo} alt="" /> */}</div>
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={sidebarItems}
            selectedKeys={location.pathname ? [location.pathname] : []}
          />
        </Sider>
        <Layout>
          <Header>
            <div className="header-left">
              <Button
                type="text"
                icon={collapsed ? <BsTextIndentRight /> : <BsTextIndentLeft />}
                onClick={() => setCollapsed(!collapsed)}
                className="collapsed-btn"
              />
              <Link to={ROUTE_URL.HOME}>
                <h2>Biển đẹp Vinh Oanh</h2>
              </Link>
            </div>

            <div className="logout-btn" onClick={logout}>
              <FaArrowRightFromBracket />
              <p>Đăng xuất</p>
            </div>
          </Header>
          <Content
            className="admin-layout-content"
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      <Footer />
    </>
  );
};
export default AdminLayout;
