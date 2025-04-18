import { Empty, Pagination } from "antd";
import FilterBox from "components/FilterBox";
import LicensePlate from "components/LicensePlate";
import { ILisencePlate, SearchParams } from "constants/interface";
import { useState, type FC, useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { Link, useSearchParams } from "react-router-dom";
import { ROUTE_URL } from "routes";
import { licensePlateService } from "services/license-plate";

const SearchPage: FC = () => {
  const [data, setData] = useState<{
    list: Array<ILisencePlate>;
    total: number;
  }>({
    list: [],
    total: 0,
  });
  const [searchParams] = useSearchParams();

  const [pageSize, setPageSize] = useState<{ page: number; limit: number }>({
    page: 1,
    limit: 10,
  });
  const handlePageChange = (page: number, pageSize: number) => {
    setPageSize({
      page: page,
      limit: pageSize,
    });
  };
  const fetchData = async (params: SearchParams) => {
    try {
      const res = await licensePlateService.search({ ...params, ...pageSize });

      if (setData) {
        if (
          Math.ceil((res.data.total || 0) / pageSize.limit) < pageSize.page &&
          pageSize.page > 1
        ) {
          setPageSize((prev) => ({
            ...prev,
            page: 1,
          }));
        } else {
          setData(res.data);
        }
      }
    } catch (error) {
      console.log(error);
      setData({
        list: [],
        total: 0,
      });
    }
  };

  useEffect(() => {
    const searchData: { [key: string]: any } = {};
    searchParams.forEach((value, key: string) => {
      searchData[key] = key == "price" || key == "luckyDigit" ? +value : value;
    });
    fetchData(searchData);
  }, [searchParams, pageSize]);

  return (
    <div className="search-result">
      <Link to={ROUTE_URL.HOME} className="back-home_btn">
        <FaChevronLeft />
        <h2>Trang chủ</h2>
      </Link>
      <FilterBox />
      <h3>Tìm được {data.total} kết quả</h3>
      <div className="result-wrapper">
        {data?.list?.length ? (
          data.list.map((item: ILisencePlate) => (
            <div className="result-item" key={item.id}>
              <LicensePlate item={item} />
            </div>
          ))
        ) : (
          <div className="empty-data">
            <Empty />
          </div>
        )}
      </div>
      <Pagination
        showSizeChanger
        pageSizeOptions={[10, 20, 50, 100]}
        total={data.total}
        defaultPageSize={10}
        onChange={handlePageChange}
        current={pageSize.page}
        showLessItems
        align="end"
      />
    </div>
  );
};

export default SearchPage;
