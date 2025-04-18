import { Button, Card, Form, Input, Modal, Typography } from "antd";
import { useUser } from "context/UserContext";
import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ROUTE_URL } from "routes";
import { userSerive } from "services/user";

const { Title, Text } = Typography;

const AdminLogin = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { setUserData } = useUser();
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = async (values: any) => {
    try {
      const res = await userSerive.login(values);
      setUserData(res.data.token);
      navigate(ROUTE_URL.ADMIN_LICENSE_PLATE);
    } catch (error) {
      console.log(error);
      alert("Tài khoản hoặc mật khẩu không chính xác.");
    }
  };

  return (
    <div className="admin-login">
      <Card className="login-card">
        <div className="login-header">
          <Title level={3} style={{ textAlign: "center", marginBottom: 10 }}>
            Biển đẹp Vinh Oanh
          </Title>
          <Text
            type="secondary"
            style={{ textAlign: "center", display: "block" }}
          >
            Vui lòng đăng nhập vào tài khoản quản lý
          </Text>
        </div>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập tên đăng nhập!" },
            ]}
          >
            <Input
              prefix={<FaUser className="site-form-item-icon" />}
              placeholder="Tên đăng nhập"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              prefix={<FaLock className="site-form-item-icon" />}
              placeholder="Mật khẩu"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
              block
            >
              Log in
            </Button>
          </Form.Item>
          <p className="login-form-forgot" onClick={showModal}>
            Quên mật khẩu?
          </p>
        </Form>
      </Card>
      <Modal
        title="Quên mật khẩu"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Đã hiểu
          </Button>,
        ]}
      >
        <p>Vui lòng liên hệ với quản trị viên hệ thống để được hỗ trợ.</p>
      </Modal>
    </div>
  );
};

export default AdminLogin;
