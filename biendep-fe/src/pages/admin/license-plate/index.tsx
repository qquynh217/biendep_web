import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  TablePaginationConfig,
  TableProps,
} from "antd";
import { FilterValue } from "antd/es/table/interface";
import LicensePlate from "components/LicensePlate";
import showMessage from "components/Message";
import LicensePlateModal from "components/Modal";
import {
  CHAR_OPTION,
  LUCKYDIGIT_OPTION,
  PRICE_OPTION,
  PROVINCE_STORAGE,
  TYPE_OPTION,
  initLicensePlate,
} from "constants";
import { ILisencePlate, ModalType, SearchParams } from "constants/interface";
import { FC, useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { licensePlateService } from "services/license-plate";
import { formatNumber, formatTimestamp } from "utils";

const AdminLicensePlate: FC = () => {
  const [modal, contextHolder] = Modal.useModal();
  const [openModal, setOpenModal] = useState<ModalType<ILisencePlate>>({
    type: "",
    item: initLicensePlate,
  });
  const [isLoading, setIsLoading] = useState(false);
  // Lưu mã số tỉnh thành
  const [provinces, setProvinces] = useState<
    Array<{ value: string; label: string }>
  >([]);

  //   Lưu data trả về
  const [data, setData] = useState<{
    list: Array<ILisencePlate>;
    total: number;
  }>({
    list: [],
    total: 0,
  });

  //   Lưu các trường để search
  const [searchParams, setSearchParams] = useState<
    {
      page: number;
      limit: number;
      sortType?: string;
    } & SearchParams
  >({
    page: 1,
    limit: 10,
    sortType: "",
  });

  //   Lấy danh sách tỉnh thành
  useEffect(() => {
    const provinceData = JSON.parse(
      localStorage.getItem(PROVINCE_STORAGE) || "[]"
    );

    setProvinces([
      {
        label: "Tất cả",
        value: "",
      },
      ...provinceData,
    ]);
  }, []);

  //   Lấy data biển số
  const fetchData = async (params: SearchParams) => {
    setIsLoading(true);
    try {
      const res = await licensePlateService.getAll({ ...params });
      // Nếu tổng số bản ghi nhận được / limit < current page => chuyển sang page 1
      if (
        Math.ceil((res.data.total || 0) / searchParams.limit) <
          searchParams.page &&
        searchParams.page > 1
      ) {
        setSearchParams((prev) => ({
          ...prev,
          page: 1,
        }));
      } else {
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
      setData({
        list: [],
        total: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };
  // Hàm xử lý khi pagination, filter, sorter thay đổi
  const onTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: any
  ) => {
    const { current, pageSize } = pagination;
    const { order } = sorter;

    setSearchParams((prev: any) => ({
      ...prev,
      ...filters,
      page: current,
      limit: pageSize,
      sort: order ? (order == "descend" ? "desc" : "asc") : "",
    }));
  };
  // Submit form
  const handleSubmit = (value: SearchParams) => {
    setSearchParams((prev) => ({
      ...prev,
      ...value,
    }));
  };
  // Xóa bản ghi
  const handleRemoveRecord = (id: string) => async (close: any) => {
    if (id) {
      try {
        const res = await licensePlateService.delete(id);
        // const { error = true } = await faceAPI.deleteTargetFace(id, groupName);
        if (res.status == 200) {
          showMessage("success", "Xóa biển số thành công.");
          fetchData(searchParams);
        }
      } catch (error) {
        showMessage("error", "Xóa biển số không thành công.");
      } finally {
        close();
      }
    }
  };

  const confirm = (record: ILisencePlate) => () => {
    modal.confirm({
      title: "Xóa biển số",
      content: (
        <>
          <div className="subtitle">Bạn có chắc chắn xóa biển số sau không</div>
          <LicensePlate item={record} />
        </>
      ),
      okText: "Xác nhận",
      cancelText: "Hủy",
      closable: true,
      icon: null,
      className: "modal-delete",
      width: 480,
      maskClosable: true,
      okButtonProps: {
        danger: true,
        type: "default",
      },
      onOk: handleRemoveRecord(record.id),
    });
  };

  const columns: TableProps<ILisencePlate>["columns"] = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (_val, _rec, index) => (searchParams.page - 1) * 10 + index + 1,
    },
    {
      title: "Mã số biển",
      dataIndex: "formattedPlate",
      key: "formattedPlate",
      render: (val) => <b className="plate-code">{val}</b>,
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      key: "price",
      render: (val) => formatNumber(val),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Số nút",
      dataIndex: "luckyDigit",
      key: "luckyDigit",
    },
    {
      title: "Loại biển",
      dataIndex: "types",
      key: "types",
      render: (val: string[]) =>
        val
          .map((item) => TYPE_OPTION.find((type) => type.value == item)?.label)
          .join(", "),
    },
    {
      title: "Biển VIP",
      dataIndex: "isVip",
      key: "isVip",
      render: (val: boolean) => <Checkbox checked={val} />,
      filters: [
        { text: "VIP", value: true },
        { text: "Không VIP", value: false },
      ],
      // onFilter: (value, record) => record.isVip == value,
    },
    {
      title: "Tạm ẩn",
      dataIndex: "isHide",
      key: "isHide",
      render: (val: boolean) => <Checkbox checked={val} />,
      filters: [
        { text: "Ẩn", value: true },
        { text: "Hiện", value: false },
      ],
      onFilter: (value, record) => record.isVip == value,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val) => formatTimestamp(val),
    },
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      render: (_id: string, record: any) => (
        <>
          <Button
            icon={<FaEdit />}
            type="text"
            onClick={() => {
              setOpenModal({ type: "edit", item: record });
            }}
          />
          <Button
            icon={<FaTrash />}
            type="text"
            danger
            onClick={confirm(record)}
          />
        </>
      ),
    },
  ];

  useEffect(() => {
    fetchData(searchParams);
  }, [searchParams]);
  return (
    <div className="admin-license-plate">
      {contextHolder}
      <Form
        className="search-form"
        initialValues={{
          // province: "",
          price: 0,
          luckyDigit: null,
          char: null,
          type: null,
        }}
        onFinish={handleSubmit}
      >
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name="key">
              <Input placeholder="Nhập biển số" />
            </Form.Item>
          </Col>
          {/* <Col span={12} /> */}
          <Col span={12}>
            <div className="input-key">
              <Form.Item name="province">
                <Select options={provinces} placeholder="Tỉnh thành" />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Tìm kiếm
              </Button>
            </div>
          </Col>
          <Col span={6}>
            <Form.Item name="price" label="Mức giá">
              <Select options={PRICE_OPTION} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="luckyDigit" label="Số nút">
              <Select options={LUCKYDIGIT_OPTION} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="char" label="Chữ cái">
              <Select options={CHAR_OPTION} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="type" label="Loại biển">
              <Select options={TYPE_OPTION} />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <div className="table-header">
        <h4>Tổng biển số: {data.total}</h4>
        <Button
          type="primary"
          onClick={() => {
            setOpenModal({
              type: "create",
              item: initLicensePlate,
            });
          }}
        >
          Thêm mới +
        </Button>
      </div>
      <Table
        dataSource={data.list}
        pagination={{
          total: data.total,
          pageSizeOptions: [10, 20, 50],
          showLessItems: true,
          showSizeChanger: true,
          current: searchParams.page,
        }}
        onChange={onTableChange}
        columns={columns}
        loading={isLoading}
      />
      <LicensePlateModal
        open={openModal}
        setOpen={setOpenModal}
        fetchData={fetchData}
        searchParams={searchParams}
      />
    </div>
  );
};
export default AdminLicensePlate;
