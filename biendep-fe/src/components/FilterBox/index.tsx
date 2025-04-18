import { Button, Col, Form, Input, Radio, Row, Select } from "antd";
import {
  CHAR_OPTION,
  LUCKYDIGIT_OPTION,
  PRICE_OPTION,
  PROVINCE_STORAGE,
  SORT_OPTION,
  TYPE_OPTION,
} from "constants";
import { SearchParams } from "constants/interface";
import { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTE_URL } from "routes";
import { provinceSerive } from "services/province";
import { formatQueryParams } from "utils";

const FilterBox: FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();

  const handleSubmit = (value: any, field: any) => {
    if (Object.keys(value)[0] != "key") {
      const queryParams = formatQueryParams(field);
      navigate(ROUTE_URL.SEARCH + `?${queryParams}`);
    }
  };

  const handleFinish = (value: SearchParams) => {
    const queryParams = formatQueryParams(value);
    navigate(ROUTE_URL.SEARCH + `?${queryParams}`);
  };
  const [provinces, setProvinces] = useState<
    Array<{ value: string; label: string }>
  >([]);

  useEffect(() => {
    const initData: { [key: string]: any } = {};
    searchParams.forEach((value, key: string) => {
      initData[key] = key == "price" || key == "luckyDigit" ? +value : value;
    });
    form.setFieldsValue(initData);
  }, []);

  const getProvince = async () => {
    try {
      const res = await provinceSerive.get();
      const data = res.data;
      setProvinces([
        {
          label: "Tất cả",
          value: "",
        },
        ...data,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const provinceData = JSON.parse(
      localStorage.getItem(PROVINCE_STORAGE) || "[]"
    );

    if (provinceData.length > 0) {
      setProvinces([
        {
          label: "Tất cả",
          value: "",
        },
        ...provinceData,
      ]);
    } else {
      getProvince();
    }
  }, []);

  return (
    <div className="filter-box">
      <h2>Tìm nhanh biển số đẹp</h2>
      <Form onValuesChange={handleSubmit} form={form} onFinish={handleFinish}>
        <div className="search-input">
          <Form.Item name="key">
            <Input
              placeholder="Nhập biển số cần tìm"
              bordered={false}
              size="large"
            />
          </Form.Item>
          <Button type="primary" size="large" htmlType="submit">
            Tìm kiếm
          </Button>
        </div>
        <Row gutter={30}>
          <Col span={24} md={10}>
            <Form.Item
              name="province"
              label="Tỉnh thành"
              className="filter-item"
            >
              <Select
                options={provinces}
                defaultValue={provinces[0]?.value}
                showSearch
                optionFilterProp="label"
              />
            </Form.Item>
          </Col>
          <Col span={24} md={14}>
            <Form.Item name="sort" label="Sắp xếp" className="filter-item">
              <Radio.Group
                block
                options={SORT_OPTION}
                optionType="button"
                defaultValue={SORT_OPTION[0].value}
                buttonStyle="solid"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="price" label="Mức giá" className="filter-item">
          <Radio.Group
            block
            options={PRICE_OPTION}
            optionType="button"
            defaultValue={PRICE_OPTION[0].value}
            buttonStyle="solid"
          />
        </Form.Item>

        <Form.Item name="luckyDigit" label="Số nút" className="filter-item">
          <Radio.Group
            block
            options={LUCKYDIGIT_OPTION}
            optionType="button"
            defaultValue={LUCKYDIGIT_OPTION[0].value}
            buttonStyle="solid"
          />
        </Form.Item>

        <Form.Item name="char" label="Chữ cái" className="filter-item">
          <Radio.Group
            block
            options={CHAR_OPTION}
            optionType="button"
            defaultValue={CHAR_OPTION[0].value}
            buttonStyle="solid"
          />
        </Form.Item>

        <Form.Item name="type" label="Loại biển" className="filter-item">
          <Radio.Group
            block
            options={TYPE_OPTION}
            optionType="button"
            defaultValue={TYPE_OPTION[0].value}
            buttonStyle="solid"
          />
        </Form.Item>
      </Form>
    </div>
  );
};
export default FilterBox;
