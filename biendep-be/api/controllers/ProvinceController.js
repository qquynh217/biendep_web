/**
 * ProvinceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { HTTP_RESPONSE } = require("../config/const");
const logger = require("../config/logger")(__filename);

module.exports = {
  getAll: async (req, res) => {
    logger.info("Get all provinces");
    try {
      const data = await Province.find();
      const provinces = [];

      //   Lặp qua mảng của từng tỉnh thành
      for (let province of data) {
        for (let plate of province.plates) {
          provinces.push({
            label: `${plate} - ${province.province}`,
            value: plate,
          });
        }
      }

      return res.status(HTTP_RESPONSE.STATUS.SUCCESS).send(provinces);
    } catch (error) {
      logger.error("Get all provinces error: " + error.toString());
      return res.status(HTTP_RESPONSE.STATUS.SERVER_ERROR).send({
        msg: HTTP_RESPONSE.MESSAGE.SERVER_ERROR,
      });
    }
  },
};
