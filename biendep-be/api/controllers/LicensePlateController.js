/**
 * LicensePlateController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const {
  HTTP_RESPONSE,
  PRICE_OPTION,
  LISENCE_PLATE,
} = require("../config/const");
const logger = require("../config/logger")(__filename);
const { formatPlateCode } = require("../services/licesePlate.service");

function formatObject(obj) {
  const formattedObj = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      // Kiểm tra nếu giá trị không phải null, undefined hoặc chuỗi rỗng
      if (value !== null && value !== undefined && value !== "") {
        formattedObj[key] = value;
      }
    }
  }

  return formattedObj;
}

module.exports = {
  create: async (req, res) => {
    const { plateCode, price, isVip, isHide } = req.body;
    logger.info(
      "Create lisence plate: " + JSON.stringify({ plateCode, price })
    );
    try {
      // Tạo format biến số theo chuẩn XXX-YYY.YY hoặc XXXX-YYY.YY
      const { formattedPlate, cleanedPlate } = formatPlateCode(plateCode);

      //   Kiểm tra giá trị
      if (!formattedPlate) {
        return res.status(HTTP_RESPONSE.STATUS.INVALID_DATA).send({
          msg: "Biển số không hợp lệ.",
        });
      }
      if (price < 0) {
        return res.status(HTTP_RESPONSE.STATUS.INVALID_DATA).send({
          msg: `Vui lòng xem lại giá biển`,
        });
      }

      //   Kiểm tra biển số đã xuất hiện trong db chưa
      const findPlate = await LicensePlate.findOne({ plateCode: cleanedPlate });
      if (findPlate) {
        return res.status(HTTP_RESPONSE.STATUS.CONFLICT).send({
          msg: "Biển số đã tồn tại.",
        });
      }

      //  Tạo biển số mới và lấy dữ liệu vừa tạo
      const newPlate = await LicensePlate.create({
        plateCode: cleanedPlate,
        price,
        formattedPlate,
        isVip: isVip ? true : false,
        isHide: isHide ? true : false,
      }).fetch();

      logger.info("New license plate: " + JSON.stringify(newPlate));

      return res.status(HTTP_RESPONSE.STATUS.SUCCESS).send(newPlate);
    } catch (error) {
      logger.error("Create lisence plate error: " + error.toString());
      return res.status(HTTP_RESPONSE.STATUS.SERVER_ERROR).send({
        msg: HTTP_RESPONSE.MESSAGE.SERVER_ERROR,
      });
    }
  },

  get: async (req, res) => {
    const { char, key, luckyDigit, price, province, sort, type } = req.query;
    let limit = +req.query.limit || 10;
    let page = +req.query.page || 1;

    const searchParam = {
      luckyDigit: luckyDigit ? +luckyDigit : null,
      provinceCode: province,
    };
    const formatParams = formatObject(searchParam);

    logger.info(
      "Get license plates: " +
        JSON.stringify({
          ...searchParam,
          char,
          key,
          price,
          sort,
          type,
        })
    );

    try {
      let query = {
        ...formatParams,
        isHide: false,
      };
      // Thêm điều kiện tìm kiếm theo plateCode
      if (key) {
        query.plateCode = { contains: key.toUpperCase() };
      }

      // Thêm điều kiện ký tự trong plateCode
      if (char) {
        query.formattedPlate = { contains: char.toUpperCase() };
      }

      // Thêm điều kiện khoảng giá
      if (PRICE_OPTION[price]) {
        const minPrice = PRICE_OPTION[price].min * 1_000_000;
        const maxPrice = PRICE_OPTION[price].max
          ? PRICE_OPTION[price].max * 1_000_000
          : undefined;
        query.price = {};
        if (minPrice !== undefined) {
          query.price[">="] = parseFloat(minPrice);
        }
        if (maxPrice !== undefined) {
          query.price["<="] = parseFloat(maxPrice);
        }
      }

      // Thêm điều kiện loại biển số
      if (LISENCE_PLATE.TYPE[type]) {
        query.types = [type];
      }

      // Xây dựng options sort
      let sortOptions = 0;
      if (sort == "asc") {
        sortOptions = "ASC";
      } else if (sort == "desc") {
        sortOptions = "DESC";
      }

      // Tính toán phân trang
      const skip = (page - 1) * limit;

      logger.info("Query: " + JSON.stringify(query));
      // Lấy tổng số bản ghi (cho pagination metadata)
      const totalItems = await LicensePlate.count({ where: query });
      // Thực hiện truy vấn với phân trang
      const plates = await LicensePlate.find({
        where: query,
        skip: skip,
        limit: limit,
        sort: sortOptions ? `price ${sortOptions}` : `createdAt desc`,
      });

      const data = {
        list: plates,
        total: totalItems,
        pagination: {
          page,
          limit,
        },
      };

      logger.info(
        `Got ${data.list.length}/${totalItems} license plates successful`
      );

      return res.status(HTTP_RESPONSE.STATUS.SUCCESS).send(data);
    } catch (error) {
      logger.error("Get lisence plate error: " + error.toString());
      return res.status(HTTP_RESPONSE.STATUS.SERVER_ERROR).send({
        msg: HTTP_RESPONSE.MESSAGE.SERVER_ERROR,
        data: [],
      });
    }
  },

  edit: async (req, res) => {
    const { types, price, isVip, isHide } = req.body;
    const id = req.params.id;
    try {
      logger.info(
        "Edit lisence plate: " +
          JSON.stringify({ id, types, price, isVip, isHide })
      );
      if (!id) {
        return res.status(HTTP_RESPONSE.STATUS.INVALID_DATA).send({
          msg: "Invalid Data",
        });
      }
      const errorMsg = "Dữ liệu không hợp lệ";
      const updateData = {};
      //   Kiểm tra types
      const isValid = true;
      if (types && types.length > 0) {
        for (let type of types) {
          if (!Object.keys(LISENCE_PLATE.TYPE).includes(type)) {
            isValid = false;
            errorMsg =
              "Loại biển không tồn tại. Vui lòng chọn loại biển có trong danh sách.";
          }
        }
        if (isValid) updateData.types = types;
      }

      //   Kiểm tra giá
      if (price != undefined && price != null) {
        if (price < 0) {
          isValid = false;
          errorMsg = "Giá biển không hợp lệ.";
        } else {
          updateData.price = price;
        }
      }
      // Kiểm tra isActive
      if (isHide == true || isHide == false) {
        updateData.isHide = isHide;
      }
      // Kiểm tra isVip
      if (isVip == true || isVip == false) {
        updateData.isVip = isVip;
      }

      //   Nếu data không hợp lệ báo lỗi
      if (!isValid) {
        return res.status(HTTP_RESPONSE.STATUS.INVALID_DATA).send({
          msg: errorMsg,
        });
      }

      //   Update vào mongo
      const updatedPlate = await LicensePlate.updateOne({
        id,
      }).set(updateData);

      if (!updatedPlate) {
        return res.status(HTTP_RESPONSE.STATUS.NOT_FOUND).send({
          msg: "Không tìm thấy biển số",
        });
      }

      return res.status(HTTP_RESPONSE.STATUS.SUCCESS).send({
        msg: "Sửa thông tin biển số thành công",
        data: updatedPlate,
      });
    } catch (error) {
      logger.error("Edit lisence plate error: " + error.toString());
      return res.status(HTTP_RESPONSE.STATUS.SERVER_ERROR).send({
        msg: HTTP_RESPONSE.MESSAGE.SERVER_ERROR,
        data: [],
      });
    }
  },

  getListHome: async (req, res) => {
    try {
      const listProvinceCodeHN = ["29", "30", "31", "32", "33", "40"];
      const listProvinceCodeHCM = [
        "41",
        "50",
        "51",
        "52",
        "53",
        "54",
        "55",
        "56",
        "57",
        "58",
        "59",
      ];
      // Biển số vips
      const vips = await LicensePlate.find({
        where: { isVip: true, isHide: false },
        limit: 20,
        sort: [{ price: "desc" }],
      });

      //   Biến số đẹp Hà Nội
      const hanoi = await LicensePlate.find({
        where: { provinceCode: listProvinceCodeHN, isHide: false, isVip: true },
        limit: 20,
        sort: [{ price: "desc" }],
      });

      //   Biến số đẹp Tp.Hồ Chí Minh
      const hcm = await LicensePlate.find({
        where: {
          provinceCode: listProvinceCodeHCM,
          isHide: false,isVip: true
        },
        limit: 20,
        sort: [{ price: "desc" }],
      });

      //   Biến số đẹp các tỉnh
      const other = await LicensePlate.find({
        where: {
          provinceCode: {
            "!=": [...listProvinceCodeHCM, ...listProvinceCodeHN],
          },
          isHide: false,
          isVip: true,
        },
        limit: 20,
        sort: [{ price: "desc" }],
      });

      //   Biến sảnh vip
      const sanhVip = await LicensePlate.find({
        where: {
          types: ["sanh_ngu", "sanh_tu", "sanh_tam"],
          isVip: true,
          isHide: false,
        },
        limit: 20,
        sort: [{ price: "desc" }],
      });

      const data = {
        vips,
        hanoi,
        hcm,
        sanhVip,
        other,
      };
      return res.status(HTTP_RESPONSE.STATUS.SUCCESS).send(data);
    } catch (error) {
      logger.error("Get lisence plate in home error: " + error.toString());
      return res.status(HTTP_RESPONSE.STATUS.SERVER_ERROR).send({
        msg: HTTP_RESPONSE.MESSAGE.SERVER_ERROR,
        data: [],
      });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      logger.info("Xóa biển số: " + id);
      const deletedItem = await LicensePlate.destroyOne({ id: id });
      if (!deletedItem) {
        return res
          .status(HTTP_RESPONSE.STATUS.NOT_FOUND)
          .send({ msg: "Biển số không tồn tại." });
      }
      return res
        .status(HTTP_RESPONSE.STATUS.SUCCESS)
        .send({ msg: "Xóa biển số thành công." });
    } catch (error) {
      logger.error("Delete lisence plate error: " + error.toString());
      return res.status(HTTP_RESPONSE.STATUS.SERVER_ERROR).send({
        msg: HTTP_RESPONSE.MESSAGE.SERVER_ERROR,
      });
    }
  },

  getAll: async (req, res) => {
    const {
      char,
      key,
      luckyDigit,
      price,
      province,
      sort,
      type,
      isVip,
      isHide,
    } = req.query;
    let limit = +req.query.limit || 10;
    let page = +req.query.page || 1;

    const searchParam = {
      luckyDigit: luckyDigit ? +luckyDigit : null,
      provinceCode: province,
    };
    const formatParams = formatObject(searchParam);

    logger.info(
      "Get license plates: " +
        JSON.stringify({
          ...searchParam,
          char,
          key,
          price,
          sort,
          type,
        })
    );
    try {
      let query = {
        ...formatParams,
      };
      // Thêm điều kiện tìm kiếm theo plateCode
      if (key) {
        query.plateCode = { contains: key.toUpperCase() };
      }

      // Thêm điều kiện ký tự trong plateCode
      if (char) {
        query.formattedPlate = { contains: char.toUpperCase() };
      }

      // Thêm điều kiện khoảng giá
      if (PRICE_OPTION[price]) {
        const minPrice = PRICE_OPTION[price].min * 1_000_000;
        const maxPrice = PRICE_OPTION[price].max
          ? PRICE_OPTION[price].max * 1_000_000
          : undefined;
        query.price = {};
        if (minPrice !== undefined) {
          query.price[">="] = parseFloat(minPrice);
        }
        if (maxPrice !== undefined) {
          query.price["<="] = parseFloat(maxPrice);
        }
      }

      // Thêm điều kiện loại biển số
      if (LISENCE_PLATE.TYPE[type]) {
        query.types = [type];
      }

      // Kiểm tra isVip
      if (isVip) {
        query.isVip = JSON.parse(isVip);
      }

      // Kiểm tra isHide
      if (isHide) {
        query.isHide = JSON.parse(isHide);
      }

      // Xây dựng options sort
      let sortOptions = 0;
      if (sort == "asc") {
        sortOptions = "ASC";
      } else if (sort == "desc") {
        sortOptions = "DESC";
      }

      // Tính toán phân trang
      const skip = (page - 1) * limit;

      logger.info("Query: " + JSON.stringify(query));
      // Lấy tổng số bản ghi (cho pagination metadata)
      const totalItems = await LicensePlate.count({ where: query });
      // Thực hiện truy vấn với phân trang
      const plates = await LicensePlate.find({
        where: query,
        skip: skip,
        limit: limit,
        sort: sortOptions ? `price ${sortOptions}` : `createdAt desc`,
      });

      const data = {
        list: plates,
        total: totalItems,
        pagination: {
          page,
          limit,
        },
      };

      logger.info(
        `Got ${data.list.length}/${totalItems} license plates successful`
      );

      return res.status(HTTP_RESPONSE.STATUS.SUCCESS).send(data);
    } catch (error) {
      logger.error("Get all lisence plate error: " + error.toString());
      return res.status(HTTP_RESPONSE.STATUS.SERVER_ERROR).send({
        msg: HTTP_RESPONSE.MESSAGE.SERVER_ERROR,
        data: [],
      });
    }
  },
};
