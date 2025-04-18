/**
 * LicensePlate.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const logger = require("../config/logger")(__filename);
const {
  calculateLuckyDigit,
  analyzePlateType,
} = require("../services/licesePlate.service");

module.exports = {
  tableName: "license_plate",
  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    plateCode: {
      type: "string",
      required: true,
      unique: true,
    },
    formattedPlate: {
      type: "string",
      required: true,
    },
    provinceCode: {
      type: "string",
    },
    price: {
      type: "number",
      defaultsTo: 0,
    },
    luckyDigit: {
      type: "number",
      defaultsTo: 0,
    },
    isVip: {
      type: "boolean",
      defaultsTo: false,
    },
    isHide: {
      type: "boolean",
      defaultsTo: false,
    },
    types: {
      type: "json",
    },
    typePoint: {
      type: "number",
      defaultsTo: 0,
    },
    digitPoint: {
      type: "number",
      defaultsTo: 0,
    },
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
  },

  // Khi tạo mới -> tính luckyDigit từ method
  beforeCreate: function (valuesToSet, proceed) {
    const { types, typePoint, digitPoint } = analyzePlateType(
      valuesToSet.plateCode
    );
    logger.info(`Created license plate: ${valuesToSet.formattedPlate}`);
    valuesToSet.provinceCode = valuesToSet.plateCode.substring(0, 2);
    valuesToSet.luckyDigit = calculateLuckyDigit(valuesToSet.plateCode);
    valuesToSet.types = types;
    valuesToSet.typePoint = typePoint;
    valuesToSet.digitPoint = digitPoint;

    return proceed();
  },
};
