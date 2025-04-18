/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { HTTP_RESPONSE, JWT_EXPIRES } = require("../config/const");
const logger = require("../config/logger")(__filename);
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      logger.info("User login: " + JSON.stringify({ username, password }));
      const user = await User.findOne({ username: username });

      if (!user || user.password !== password) {
        return res.status(HTTP_RESPONSE.STATUS.UNAUTHORIZE).send({
          msg: "Tài khoản hoặc mật khẩu không đúng",
        });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: JWT_EXPIRES }
      );

      return res.status(HTTP_RESPONSE.STATUS.SUCCESS).send({
        token,
      });
    } catch (error) {
      logger.error("User login error: " + error.toString());
      return res.status(HTTP_RESPONSE.STATUS.SERVER_ERROR).send({
        msg: HTTP_RESPONSE.MESSAGE.SERVER_ERROR,
      });
    }
  },
};
