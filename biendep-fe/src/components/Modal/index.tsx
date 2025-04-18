import { Button, Checkbox, Col, Form, Input, Modal, Row } from "antd";
import showMessage from "components/Message";
import { TYPE_OPTION, initLicensePlate } from "constants";
import { ILisencePlate, ModalType, SearchParams } from "constants/interface";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { licensePlateService } from "services/license-plate";

const LicensePlateModal: FC<{
  open: ModalType<ILisencePlate>;
  setOpen: Dispatch<SetStateAction<ModalType<ILisencePlate>>>;
  fetchData: any;
  searchParams: SearchParams;
}> = ({ open, setOpen, fetchData, searchParams }) => {
  const [form] = Form.useForm();
  const handleClose = () => {
    setOpen({
      type: "",
      item: initLicensePlate,
    });
    form.resetFields();
  };

  const handleSubmit = async (values: any) => {
    try {
      console.log(values, open.type);
      values.isHide = values.isHide || false;

      values.price = values.price * 1_000_000;
      if (open.type == "create") {
        const res = await licensePlateService.create(values);
        console.log(res);
        showMessage("success", "Tạo biển số thành công.");
        await fetchData(searchParams);
        handleClose();
      } else if (open.type == "edit") {
        const res = await licensePlateService.edit({
          ...values,
          id: open.item.id,
        });
        console.log(res);
        showMessage("success", "Sửa biển số thành công.");
        await fetchData(searchParams);
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      ...open.item,
      price: open.item.price / 1_000_000,
    });
  }, [open.item]);
  return (
    <Modal
      className="app-modal"
      open={open.type != ""}
      onCancel={handleClose}
      footer={null}
      title={open.type == "create" ? "Thêm biển số" : "Sửa biển số"}
      destroyOnClose
    >
      <Form
        layout="vertical"
        initialValues={open.item}
        onFinish={handleSubmit}
        form={form}
      >
        <Form.Item
          name="plateCode"
          label="Biển số:"
          rules={[{ required: true, message: "Vui lòng nhập biển số." }]}
        >
          <Input placeholder="Nhập biển số" readOnly={open.type == "edit"} />
        </Form.Item>
        <Form.Item
          name="price"
          label="Giá tiền:"
          rules={[{ required: true, message: "Vui lòng nhập giá tiền." }]}
        >
          <Input
            type="number"
            placeholder="Nhập giá tiền"
            suffix=".000.000 đ"
          />
        </Form.Item>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name="isVip" valuePropName="checked">
              <Checkbox>Biển VIP</Checkbox>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="isHide" valuePropName="checked">
              <Checkbox>Ẩn biển</Checkbox>
            </Form.Item>
          </Col>
        </Row>
        {open.type == "edit" && (
          <Form.Item
            name="types"
            label="Loại biển (tự động tính)"
            className="type"
          >
            <Checkbox.Group options={TYPE_OPTION.slice(1)} />
          </Form.Item>
        )}
        <div className="form-btn">
          <Button type="primary" htmlType="submit">
            Lưu biển số
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default LicensePlateModal;
